import React, { Component } from 'react'
import { User, UserRole, UserStatus } from './user.model';
import { AppStateListener, UserListener } from './App'
import './registrationForm.css'
import { AppState } from './shared-types';
import { UsersAPI } from './rest-api-client';

interface UserInputProps {
    onRegistrationUser: AppStateListener;
    onSuccessfulLogin: AppStateListener;
}

interface UserLoginState {
    username: string;
    password: string;
    lastModificationTimespan: string;
    appState: AppState;
}

export default class RegistrationForm extends Component<UserInputProps, UserLoginState> {
    state: Readonly<UserLoginState> = {
        username: '',
        password: '',
        lastModificationTimespan: new Date().toDateString(),
        appState: AppState.Login,
    }

    handleUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); //if none - it will reload the page
    const allUsers = await UsersAPI.findAll();
    const currentUser = allUsers.find(us => (us.username === this.state.username && us.password === this.state.password));
    if(currentUser){
    console.log(currentUser);
    console.log(this.state.username);
    console.log(this.state.password);
    console.log("Changing State");
    this.props.onSuccessfulLogin(AppState.InApp);
    } else {
        console.log("Wrong username or password.");
        this.props.onSuccessfulLogin(AppState.Login);
    }
    }

    handleUserRegistration = (event: React.FormEvent) => {
        event.preventDefault(); //if none - it will reload the page
        this.setState({appState: AppState.Registration})
        console.log("Changing State");
        this.props.onRegistrationUser(AppState.Registration);
        }

  handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof UserLoginState;
    const newStateUpdate = {[fieldName]: event.target.value} as unknown as UserLoginState;
    this.setState(newStateUpdate)
  }

    handleUserReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({ username: '', password: ''})
    }

  render() {
    return (
      <form className='UserInput-form' >
        <label htmlFor="username"><br></br><b>Username</b><br></br></label>
        <input type="text" id="TodoInput-todo-username" name="username" value={this.state.username}
            onChange={this.handleTextChanged} />
        <label htmlFor="password"><br></br><b>Password</b><br></br></label>
        <input type="password" id="TodoInput-todo-password" name="password" value={this.state.password}
            onChange={this.handleTextChanged} />
            <button className="button button5" type="submit" onClick={this.handleUserSubmit}>Sign In</button>
            <button className="button button2" type="button" onClick={this.handleUserRegistration}>Register</button>
            <button className="button button3" type="reset" onClick={this.handleUserReset}>Reset</button>
        </form>
    )
  }
}