import * as React from "react";
import OutboundLink from "./OutboundLink";

export const Demo = () => {
  return (
    <p style={{ lineHeight: 1.6 }}>
      これはテキストです。
      <OutboundLink href="https://example.com">
        Example.comへのリンクです。
      </OutboundLink>
      <span>テキストです。</span>
    </p>
  );
};

export default {
  title: "atoms/Button/OutboundLink",
  component: OutboundLink,
};
