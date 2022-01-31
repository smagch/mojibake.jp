import Document, { Html, Head, Main, NextScript } from "next/document";

const tagManager = () => ({
  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
});

const initializeDataLayer = () => ({
  __html: "window.dataLayer = window.dataLayer || [];",
});

const getDescription = (): string =>
  "Mojibake は、文字化けしたテキストファイルの修復ができる変換ツールです。" +
  "文字化けの原因を自動的に特定し、正しい日本語に元通り復元します。";

const getRichResult = () => ({
  __html: `
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mojibake",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0"
      }
    }
  `,
});

class MyDocument extends Document {
  render() {
    const description = getDescription();
    return (
      <Html lang="ja">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={initializeDataLayer()} />
          <script dangerouslySetInnerHTML={tagManager()} />
          <meta name="application-name" content="Mojibake" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Mojibake" />
          <meta name="description" content={description} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#e4fcf6" />

          <link rel="apple-touch-icon" href="/images/touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://www.mojibake.jp" />
          <meta name="twitter:title" content="Mojibake" />
          <meta name="twitter:description" content={description} />
          <meta
            name="twitter:image"
            content="https://www.mojibake.jp/images/social-image-home.jpg"
          />
          <meta name="twitter:creator" content="@smagch" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Mojibake" />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="Mojibake" />
          <meta property="og:url" content="https://www.mojibake.jp" />
          <meta
            property="og:image"
            content="https://www.mojibake.jp/images/social-image-home.jpg"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={getRichResult()}
          />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
