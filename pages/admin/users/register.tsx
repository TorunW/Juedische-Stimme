import UserForm from "@/components/admin/users/UserForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import styles from "styles/Home.module.css";

function Register() {
  return (
    <section>
      <AdminTopBar title="Register new User" />
      <UserForm />
    </section>
  );
}

Register.layout = "admin";

export default Register;
