import 'styles/globals.css';
import { useEffect } from 'react';
import { LayoutAppProps } from 'types/LayoutAppProps.type';
import Layout from 'components/Layout';
import AdminLayout from 'components/admin/Layout';
import AuthLayout from 'components/auth/Layout';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

const layouts = {
  main: Layout,
  admin: AdminLayout,
  auth: AuthLayout,
};

function MyApp({ Component, pageProps }: LayoutAppProps) {
  let router = useRouter();
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

  useEffect(() => {
    let token = sessionStorage.getItem('Token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
