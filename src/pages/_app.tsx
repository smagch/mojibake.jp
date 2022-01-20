import * as React from "react";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { Workbox, WorkboxLifecycleWaitingEvent } from "workbox-window";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes
    const wb = new Workbox("/sw.js");

    function showSkipWaitingPrompt(event: WorkboxLifecycleWaitingEvent) {
      const accepted = window.confirm(
        "新しいバージョンがあります。更新しますか？"
      );
      if (accepted) {
        wb.addEventListener("controlling", () => {
          window.location.reload();
        });
        wb.messageSkipWaiting();
      }
    }

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", showSkipWaitingPrompt);
    wb.register();
  }, []);

  return <Component {...pageProps} />;
}

const AppWithToast = (props: AppProps) => (
  <>
    <MyApp {...props} />
    <Toaster />
  </>
);

export default AppWithToast;
