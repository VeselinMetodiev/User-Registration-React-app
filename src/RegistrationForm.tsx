import React, { Component } from 'react'
import { User, UserRole, UserStatus } from './user.model';
import { AppStateListener, UserListener } from './App'
import './registrationForm.css'
import { AppState } from './shared-types';

interface UserInputProps {
    onCreateUser: UserListener
    onLoginUser: AppStateListener
}

interface UserInputState {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    userRole: UserRole;
    gender: string;
    pictureUrl: string;
    description: string;
    userStatus: UserStatus;
    registrationTimespan: string;
    lastModificationTimespan: string;
}

export default class RegistrationForm extends Component<UserInputProps, UserInputState> {
    state: Readonly<UserInputState> = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        gender: '',
        userRole: UserRole.USER,
        pictureUrl: '',
        description: '',
        userStatus: UserStatus.ACTIVE,
        registrationTimespan: new Date().toDateString(),
        lastModificationTimespan: new Date().toDateString()
    }

    handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault(); //if none - it will reload the page
    this.props.onCreateUser(new User(
        this.state.firstName,
        this.state.lastName,
        this.state.username,
        this.state.password,
        this.state.gender,
        this.state.userRole,
        this.state.pictureUrl,
        this.state.description,
        this.state.userStatus,
        this.state.registrationTimespan,
        this.state.lastModificationTimespan));
        this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
  }

  handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof UserInputState;
    const newStateUpdate = {[fieldName]: event.target.value} as unknown as UserInputState;
    this.setState(newStateUpdate)
  }

    handleUserReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
    }

    handleUserLogin = (event: React.FormEvent) => {
        event.preventDefault(); //if none - it will reload the page
        console.log("Changing State");
        this.props.onLoginUser(AppState.Login);
        }

  render() {
    return (
      <form className='UserInput-form' onSubmit={this.handleUserSubmit}>
        <label htmlFor="firstName"><b>First Name</b><br></br></label>
        <input type="text" id="UserInput-User-firstName" name="firstName" value={this.state.firstName}
            onChange={this.handleTextChanged} />
        <label htmlFor="lastName"><br></br><b>Last Name</b><br></br></label>
        <input type="text" id="UserInput-User-lastName" name="lastName" value={this.state.lastName}
            onChange={this.handleTextChanged} />
        <label htmlFor="username"><br></br><b>Username</b><br></br></label>
        <input type="text" id="UserInput-User-username" name="username" value={this.state.username}
            onChange={this.handleTextChanged} />
        <label htmlFor="password"><br></br><b>Password</b><br></br></label>
        <input type="password" id="UserInput-User-password" name="password" value={this.state.password}
            onChange={this.handleTextChanged} />
             <label htmlFor='m'><br></br>Gender<br></br></label>
    <input type="text" id="UserInput-User-gender" name="gender" value={this.state.gender}
            onChange={this.handleTextChanged} />
        <label htmlFor="pictureURL"><br></br><b>Picture URL</b><br></br></label>
        <input type="text" id="UserInput-User-pictureURL" name="pictureUrl" value={this.state.pictureUrl}
            onChange={this.handleTextChanged} />
        <label htmlFor="description"><br></br><b>Description</b><br></br></label>
        <input type="text" id="UserInput-User-descripotion" name="description" value={this.state.description}
            onChange={this.handleTextChanged} />

            <button className="button button5" type="submit">Register</button>
            <button className="button button5" type="button" onClick={this.handleUserLogin}>Sign In</button>
            <button className="button button3" type="reset" onClick={this.handleUserReset}>Reset</button>
        </form>
    )
  }
}