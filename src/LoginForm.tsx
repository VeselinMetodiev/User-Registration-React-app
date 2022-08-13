import React, { Component } from 'react'
import { User, UserRole, UserStatus } from './user.model';
import { UserListener } from './App'
import './registrationForm.css'

interface UserInputProps {
    onCreateTodo: UserListener
}

interface UserLoginState {
    username: string;
    password: string;
    lastModificationTimespan: string;
}

export default class RegistrationForm extends Component<UserInputProps, UserLoginState> {
    state: Readonly<UserLoginState> = {
        username: '',
        password: '',
        lastModificationTimespan: new Date().toDateString()
    }

    handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault(); //if none - it will reload the page
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
      <form className='UserInput-form' onSubmit={this.handleUserSubmit}>
        <label htmlFor="username"><br></br><b>Username</b><br></br></label>
        <input type="text" id="TodoInput-todo-username" name="username" value={this.state.username}
            onChange={this.handleTextChanged} />
        <label htmlFor="password"><br></br><b>Password</b><br></br></label>
        <input type="password" id="TodoInput-todo-password" name="password" value={this.state.password}
            onChange={this.handleTextChanged} />
            <button className="button button5" type="submit">Sign In</button>
            <button className="button button2" type="submit">Register</button>
            <button className="button button3" type="reset" onClick={this.handleUserReset}>Reset</button>
        </form>
    )
  }
}