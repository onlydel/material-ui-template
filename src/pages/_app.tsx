/* eslint-disable react/jsx-props-no-spreading */

/**
 * 커스텀 App 설정
 * - https://nextjs.org/docs#custom-app
 */
import React from 'react';
import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '~/themes';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;