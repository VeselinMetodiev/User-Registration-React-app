import React, { Component } from 'react';
import './App.css';
import { User, UserStatus } from './user.model';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';
import UserFilter from './UserFilter';
import { UsersAPI } from './rest-api-client';

interface UsersAppState {
  users: User[];
  filter: FilterType;
  errors: string | undefined;
}

export interface UserListener {
  (user: User): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

export type FilterType = UserStatus | undefined;

class App extends Component<{}, UsersAppState> {
  state: Readonly<UsersAppState> = {
    users: [],
    filter: undefined,
    errors: undefined,
  }

  constructor(props: {}) {
    super(props)
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  //Callback method
  async componentDidMount() {
    try {
    const allUsers = await UsersAPI.findAll();
    this.setState({users: allUsers})
    this.setState({errors: undefined})
    } catch(err ) {
      this.setState({errors :err as string})
    }
  }

handleUpdateUser(user:User) {
  this.setState(({users}) => ({
    users: users.map(u => u.id === user.id ? user : u)
  }))
}

handleDeleteUser = async (user:User) => {
  const deletedUser = await UsersAPI.deleteById(user.id);
  this.setState(({users}) => ({
    users: users.filter(u => u.id !== user.id)
  }))
}

handleFilterChange = (status: FilterType) => {
this.setState({filter: status})
}

handleCreateUser = async (user:User) => {
  try{
    const createdUser = await UsersAPI.create(user);
    this.setState(({users}) => ({
      users: users.concat(createdUser)
    }))
  } catch(err){
    this.setState({errors :err as string})
  }
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>User System</h1>
        {/* {this.state.errors && <div className="errors">{this.state.errors}</div>} */}
        <RegistrationForm onCreateTodo={this.handleCreateUser}/>
        <UserFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <UserList 
        users={this.state.users} filter={this.state.filter}
        onUpdate={this.handleUpdateUser}
        onDelete={this.handleDeleteUser}
        />
      </header>
    </div>
  );
}
}
export default App;
