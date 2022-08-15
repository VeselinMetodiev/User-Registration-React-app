import React, { Component } from 'react';
import './App.css';
import { User, UserStatus } from './user.model';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';
import UserFilter from './UserFilter';
import { UsersAPI } from './rest-api-client';
import { AppState, Optional } from './shared-types';
import LoginForm from './LoginForm';
import Child from './Child';

interface UsersAppState {
  users: User[];
  filter: FilterType;
  errors: string | undefined;
  appState: AppState;
  editedUser: Optional<User>
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
    editedUser: undefined
  }

  handleEditUser = (user: User) => {
    this.setState({ editedUser: user });
  }

  constructor(props: {}) {
    super(props)
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  pull_data = (data: string) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
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
  try{
  const deletedUser = await UsersAPI.deleteById(user.id);
  this.setState(({users}) => ({
    users: users.filter(u => u.id !== user.id)
  }))
}catch(err){
  this.setState({errors: err as string})
}
}

handleFilterChange = (status: FilterType) => {
this.setState({filter: status})
}

handleCreateUser = async (user:User) => {
  try {
    if (user.id) { //edit user
      const updated = await UsersAPI.update(user);
      this.setState(({ users }) => ({
        users: users.map(u => u.id === updated.id ? updated : u),
        errors: undefined,
        editedUser: undefined
      }))
    } else { // create todo
      const created = await UsersAPI.create(user);
      this.setState(({ users }) => ({
        users: users.concat(created),
        errors: undefined
      }));
    }
  } catch (err) {
    this.setState({ errors: err as string })
  }
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>User System</h1>
        <div className='App'>
      <Child
        func={this.pull_data}
      />
    </div>
        {/* {this.state.errors && <div className="errors">{this.state.errors}</div>} */}
        {
        this.state.appState === AppState.Registration ?
        <div className='registration-form'>
        <RegistrationForm key={this.state.editedUser?.id} user={this.state.editedUser} onLoginUser={() => this.handleChangeAppState(AppState.Login)} onCreateUser={this.handleCreateUser}/>
        </div>
        :  this.state.appState === AppState.Login ?
        < LoginForm onSuccessfulLogin={() => this.handleChangeAppState(AppState.InApp)} onRegistrationUser={() => this.handleChangeAppState(AppState.Registration)}/> :
        this.state.editedUser ?
        <div className='inApp'>
          <div className='registration-form'>
        <RegistrationForm key={this.state.editedUser?.id} user={this.state.editedUser} onLoginUser={() => this.handleChangeAppState(AppState.Login)} onCreateUser={this.handleCreateUser}/>
        </div>
        <UserFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <UserList 
                  users={this.state.users} filter={this.state.filter}
                  onUpdate={this.handleUpdateUser}
                  onDelete={this.handleDeleteUser} onEdit={this.handleEditUser}        />
        <button className="button button5" type="button" onClick={() => this.handleChangeAppState(AppState.Login)}>Sign Out</button>
        </div>
        :
        <div className='inApp'>
        <UserFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <UserList 
                  users={this.state.users} filter={this.state.filter}
                  onUpdate={this.handleUpdateUser}
                  onDelete={this.handleDeleteUser} onEdit={this.handleEditUser}        />
        <button className="button button5" type="button" onClick={() => this.handleChangeAppState(AppState.Login)}>Sign Out</button>
        </div>
  }
      </header>
    </div>
  );
}
}
export default App;
