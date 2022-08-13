import React, { Component } from 'react';
import './App.css';
import { User, UserStatus } from './user.model';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';
import UserFilter from './UserFilter';
import { UsersAPI } from './rest-api-client';
import { AppState } from './shared-types';
import LoginForm from './LoginForm';

interface UsersAppState {
  users: User[];
  filter: FilterType;
  errors: string | undefined;
  appState: AppState;
}

export interface UserListener {
  (user: User): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

export interface AppStateListener {
  (st: AppState) : void;
}

export type FilterType = UserStatus | undefined;

class App extends Component<{}, UsersAppState> {
  state: Readonly<UsersAppState> = {
    users: [],
    filter: undefined,
    errors: undefined,
    appState: AppState.Login,
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

handleChangeAppState = (st: AppState) => {
  this.setState({appState : st })
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
        {
        this.state.appState === AppState.Registration ?
        <div className='registration-form'>
        <RegistrationForm onLoginUser={() => this.handleChangeAppState(AppState.Login)} onCreateUser={this.handleCreateUser}/>
        </div>
        :  this.state.appState === AppState.Login ?
        < LoginForm onSuccessfulLogin={() => this.handleChangeAppState(AppState.InApp)} onRegistrationUser={() => this.handleChangeAppState(AppState.Registration)}/> :
        <div className='inApp'>
        <UserFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <UserList 
        users={this.state.users} filter={this.state.filter}
        onUpdate={this.handleUpdateUser}
        onDelete={this.handleDeleteUser}
        />
        <button className="button button5" type="button" onClick={() => this.handleChangeAppState(AppState.Login)}>Sign Out</button>
        </div>
        
  }
      </header>
    </div>
  );
}
}
export default App;
