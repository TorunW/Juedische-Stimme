import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { selectUsers } from 'lib/queries'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from 'store/users/usersSlice'

export default function AdminUserPage(props) {
    
  const dispatch = useDispatch();
  const {users} = useSelector(state => state.users)

  useEffect(() => {
    dispatch(setUsers(JSON.parse(props.users)))
  },[props.users])

  let usersDisplay;
  if (users){
      usersDisplay = users.map((user,index) => (
          <li key={Date.now()}>{user.user_login}</li>
      ))
  }

  return (
    <div className={styles.container}>
        <h2>Users</h2>
        <hr/>
        <ul>
            {usersDisplay}
        </ul>
    </div>
  )
}

AdminUserPage.layout = "admin"

export const getServerSideProps = async (context) => {
    const usersResponse = await excuteQuery({
      query:selectUsers(10,context.query.number)
    });
    const users = JSON.stringify(usersResponse);
    return {
      props:{
        users:users
      }
    }
  }