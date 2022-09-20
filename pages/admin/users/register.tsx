import UserForm from '@/components/admin/users/UserForm';
import styles from 'styles/Home.module.css'

function Register() {
  return (
    <section className={styles.container}>
      <UserForm />
    </section>
  );
}

Register.layout = 'admin';

export default Register;
