import React from "react";
import { User, UserStatus } from "./user.model";
import { UserListener } from "./App";
import './UserItem.css'
import { UsersAPI } from "./rest-api-client";

interface UserItemProps {
    user: User;
    onUpdate: UserListener;
    onDelete : UserListener;
    onCancel: UserListener;
}

const UserItem = ({user, onUpdate, onDelete, onCancel}: UserItemProps) => {

function handleUserDeactivation(event: React.MouseEvent){
    onUpdate({...user, status: UserStatus.DEACTIVATED})
    updateUserStatus(user, UserStatus.DEACTIVATED)
}

function handleUserSuspension(event: React.MouseEvent){
    onUpdate({...user, status: UserStatus.SUSPENDED})
    updateUserStatus(user, UserStatus.SUSPENDED);
}

function updateUserStatus(user:User, status: UserStatus){
    user.status = status;
    UsersAPI.update(user);
}

    return (
        <div className="UserItem">
            <span className="UserItem-text">
            <span className="UserItem-Id">{user.id} </span>
            {user.username} - {user.firstName + ' ' + user.lastName}
            </span>
            <span className="image"><img src={user.userPicture} alt='User appearance'></img></span>
            <span className="UserItem-right">
                <span className="UserItem-status">
                    {UserStatus[user.status]}</span>
                    {
                    user.status === UserStatus.ACTIVE ? 
                    <span>
                    <span className="UserItem-button fas fa-check-circle"
                    onClick={handleUserDeactivation}></span>
                    <span className="UserItem-button fas fa-circle-dot"
                    onClick={handleUserSuspension}></span> 
                    </span> : user.status === UserStatus.SUSPENDED ?
                    <span className="UserItem-button fas fa-trash-can danger"
                    onClick={() => onDelete(user)}></span> : <span className="UserItem-button fas fa-trash danger"
                    onClick={() => onCancel(user)}></span>
                    }
            </span>
        </div>
    )
}

export default UserItem;