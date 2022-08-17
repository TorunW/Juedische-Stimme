import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import LoginForm from '@/components/auth/Login';

const Login: LayoutPage = (props: LayoutPageProps) => {
  return (
    <main id="login-page">
      <section>
      <LoginForm />
      </section>
    </main>
  );
};

Login.layout = 'auth';

export default Login;
