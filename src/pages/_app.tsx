import * as React from "react";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Use the window load event to keep the page load performant
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js");
      });
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
