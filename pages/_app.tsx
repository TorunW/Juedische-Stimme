import { LayoutAppProps } from 'types/LayoutAppProps.type';
import Layout from 'components/Layout';
import AdminLayout from 'components/admin/Layout';
import AuthLayout from 'components/auth/Layout';
import ResultLayout from 'components/result/Layout';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import 'styles/globals.css';

const layouts = {
  main: Layout,
  admin: AdminLayout,
  auth: AuthLayout,
  result: ResultLayout,
};

function MyApp({ Component, pageProps }: LayoutAppProps) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <Provider store={store}>
      {/* <GoogleReCaptchaProvider
        reCaptchaKey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      > */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </GoogleReCaptchaProvider> */}
    </Provider>
  );
}

export default MyApp;
