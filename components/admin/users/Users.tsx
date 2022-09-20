import React, { ReactElement } from 'react'
import { useSelector } from 'store/hooks'

const Users = () => {
    const { users } = useSelector(state => state.users)

    let usersDisplay: ReactElement[];
    if (users){
        usersDisplay = users.map((user,index) => (
            <li key={user.ID}>
                <a href={`/admin/users/${user.ID}`}>
                    {user.display_name}
                </a>
            </li>
        ))
    }

    return (
        <ul>{usersDisplay}</ul>
    )
}

export default Users