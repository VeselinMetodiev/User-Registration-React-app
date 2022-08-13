import { User } from "./user.model";
import { FilterType, UserListener } from "./App";
import UserItem from "./UserItem";
import './userList.css'

interface Props {
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete : UserListener;
    onCancel : UserListener;
}

export default function UserList({users, filter, ...rest} : Props) {
    return (<div className="UserList">
        {users
        .filter(user => !filter ? true: user.status === filter)
        .map(user => (<UserItem user={user} key={user.id} {...rest} />))
        }
    </div>)
}