import * as React from "react";
import { Details, Summary } from "atoms/Details";
import clsx from "clsx";
import styles from "./FAQSection.module.scss";

type Props = {
  className?: string;
};

const FAQSection = ({ className }: Props) => {
  return (
    <section className={clsx(styles.section, className)}>
      <header className={styles.header}>
        <h3>FAQ</h3>
        <p>よくあるご質問</p>
      </header>
      <div className={styles.list}>
        <Details>
          <Summary>mojibake.jp は安全ですか？</Summary>
          <p>
            Mojibake
            では、ファイルをサーバーにアップロードすることなく、ウェブブラウザ内部の機能でテキストの解析・変換をしています。
            そのため通信による情報漏えいのリスクを負うことなく、安心してご利用いただけます。
          </p>
        </Details>
        <Details>
          <Summary>正常に動作しません</Summary>
          <p>
            <a href="https://browsehappy.com/">最新のブラウザ</a>
            をインストールされていることをご確認ください。
          </p>
          <p>
            文字化けの変換に最新の Web
            ブラウザの機能を使っているため、古いブラウザでは正しく動作しない可能性があります。
            それでも解決しない場合は、こちらのフォームより不具合をご報告いただけますと幸いです。
          </p>
        </Details>
        <Details>
          <Summary>文字化けの解析の仕組みを教えてください</Summary>
          [文字コード]が UTF-8 っぽかったら、Shift JIS に変換します。Shift JIS
          っぽいファイルなら、UTF-8 に変換します。
        </Details>
        <Details>
          <Summary>文字化けを解読できませんでした</Summary>
          ご不便をおかけして申し訳ありません。 Mojibake
          は常にサービスの質の向上に努めております。
          差し支えなければ、[こちらのフォーム]より不具合をご報告いただけますと幸いです。
        </Details>
      </div>
    </section>
  );
};

export default FAQSection;
