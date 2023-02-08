import { useState } from 'react';
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core";
// import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App(props: AppProps | any) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: typeof Component) => page);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));



  return (
    <>
      
      {/* <UserProvider> */}
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
          
            {/* <AuthProvider> */}
              {getLayout(<Component {...pageProps} />)}
            {/* </AuthProvider> */}
        </MantineProvider>
        </ColorSchemeProvider>
        {/* </UserProvider> */}
    </>
  );
}
