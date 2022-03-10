import styled, { keyframes } from "styled-components";

import Head from "next/head";

import Navbar from "components/Navbar";
import Background from "components/Background";

function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Roboto-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Bungee-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Volkhov-Bold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Poppins-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/BungeeInline-Regular.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Navbar />
      <Background />
      <main>{children}</main>
    </>
  );
}

export default Layout;
