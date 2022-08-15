import { User } from "./user.model";
import { FilterType, UserListener } from "./App";
import UserItem from "./UserItem";
import './userList.css'
import { useMemo } from "react";

interface Props {
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete : UserListener;
    onEdit: UserListener;
}

export default function UserList({users, filter, ...rest} : Props) {
    const visibleUsers = (users: User[], filter: FilterType) => users.filter(user => !filter ? true : user.status === filter);
    const memizedVisibleTodos = useMemo(() => visibleUsers(users, filter), [users, filter]);
    return (<div className="TodoList">
        {
            memizedVisibleTodos.map(user =>
                <UserItem key={user.id} user={user} {...rest} />)
        }
    </div>)
}