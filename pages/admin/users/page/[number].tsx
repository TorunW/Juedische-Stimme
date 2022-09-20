import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { selectUsers } from 'lib/queries/users'
import { useDispatch } from 'store/hooks'
import { setUsers } from 'store/users/usersSlice'
import { LayoutPage } from 'types/LayoutPage.type'
import { LayoutPageProps } from 'types/LayoutPageProps.type'
import Users from 'components/admin/users/Users'

const AdminUsersPage: LayoutPage = (props:LayoutPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUsers(JSON.parse(props.users)))
  },[props.users])
  return (
    <section className={styles.container}>
        <h2>Users</h2>
        <Users/>        
    </section>
  )
}

AdminUsersPage.layout = "admin"

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

export default AdminUsersPage