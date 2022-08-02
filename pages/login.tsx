import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import LoginForm from '@/components/auth/Login';

const Login: LayoutPage = (props: LayoutPageProps) => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

Login.layout = 'auth';

export default Login;
