import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}
