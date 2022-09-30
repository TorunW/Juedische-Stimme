import { LayoutAppProps } from 'types/LayoutAppProps.type';
import Layout from 'components/Layout';
import AdminLayout from 'components/admin/Layout';
import AuthLayout from 'components/auth/Layout';
import ResultLayout from 'components/result/Layout';
import { store } from 'store/store';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import 'styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../config/theme';

const layouts = {
  main: Layout,
  admin: AdminLayout,
  auth: AuthLayout,
  result: ResultLayout,
};

function MyApp({
  Component,
  pageProps,
}: // clientSideEmotionCache: emotionCache,
LayoutAppProps) {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      {/* </GoogleReCaptchaProvider> */}
    </Provider>
  );
}

export default MyApp;
