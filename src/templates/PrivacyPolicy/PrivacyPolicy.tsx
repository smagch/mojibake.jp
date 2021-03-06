import * as React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <article>
      <Head>
        <title>プライバリーポリシー</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_ORIGIN}/privacy-policy`}
        />
      </Head>
      <h1>プライバシーポリシー（個人情報取扱方針/個人情報保護方針）</h1>
      <p>
        Mojibake（以下「当社」といいます）は、当社が取得した個人情報の取扱いに関し、個人情報の保護に関する法律、個人情報保護に関するガイドライン等の指針、その他個人情報保護に関する関係法令を遵守します。
      </p>
      <h2>１．取得する情報およびその取得方法、利用目的</h2>
      <p>
        当社が取得するユーザー情報は、取得方法に応じて以下のとおりとなります。
      </p>
      <h3>（１）ユーザーから直接取得する情報と取得方法</h3>
      <p>
        当社は、当社が提供するインターネットサイト（以下「本サイト」といいます）の運営に必要な範囲で、本サイトの利用者（以下「ユーザー」といいます）から、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人時期別情報）（以下「個人情報」といいます）を取得することがあります。
      </p>
      <h3>（２）情報の利用目的</h3>
      <p>当社は、取得した個人情報を以下に定める目的のために使用します。</p>
      <ul>
        <li>
          Google Analytics
          で統計を取る目的でファイルの拡張子、およびファイルサイズを利用
        </li>
      </ul>
      <h2>2. 個人情報の管理</h2>
      <p>
        当社は、ユーザーから取得した個人情報の管理について、以下を徹底します。
      </p>
      <h3>（1）情報の正確性の確保</h3>
      <p>
        取得した個人情報については、常に正確かつ最新の情報となるよう努めます。
      </p>
      <h3>（2）安全管理措置</h3>
      <p>
        当社は、組織的な個人情報の管理については、社内規定による厳重な取扱方法を規定し、規定に基づいた取扱いと厳格な運用を徹底しています。
      </p>
      <h3>（3）個人情報管理の委託先の監督</h3>
      <p>
        個人情報の管理を外部委託する場合には、当社の規程に基づく委託先にのみ委託し適切に管理します。
      </p>
      <h3>（4）個人情報の保存期間と廃棄</h3>
      <p>取得した個人情報は、保存期間を設定し、保存期間終了後は廃棄します。</p>
      <h2>3．個人情報の第三者への提供</h2>
      <p>
        当社は、取得した個人情報を、第三者に提供することはありません。また、今後、第三者提供を行う場合は、提供する情報と目的を提示し、ユーザーの同意を得た場合のみ行います。
      </p>
      <h2>4．個人情報の共同利用</h2>
      <p>当社は、ユーザーの個人情報に関して、以下のとおり共同利用します。</p>
      <ul>
        <li>Google Analytics</li>
        <li>Google TagManager</li>
      </ul>
      <h2>5．個人情報の開示・訂正・利用停止</h2>
      <p>
        個人情報について、開示、訂正、利用停止等のお申し出があった場合には、本人の申し出であることを確認の上、当社所定の方法に基づき対応致します。具体的な方法は、個別にご案内しますので、下記受付窓口までお問い合わせください。
      </p>
      <h2>６．お問い合わせ先</h2>
      <p>
        本サービス、個人情報の取扱いについては、以下の窓口にご連絡ください。
      </p>
      <ul>
        <li>
          <a href="mailto:&#x73;&#x6d;&#97;&#x67;&#x63;&#104;&#64;&#x67;&#109;&#97;&#x69;&#x6c;&#46;&#x63;&#x6f;&#x6d;">
            &#x73;&#x6d;&#97;&#x67;&#x63;&#104;&#64;&#x67;&#109;&#97;&#x69;&#x6c;&#46;&#x63;&#x6f;&#x6d;
          </a>
        </li>
      </ul>
      <h2>7．制定日、改定日</h2>
      <p>制定日　2022年2月3日</p>
    </article>
  );
};

export default PrivacyPolicy;
