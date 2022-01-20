import * as React from "react";
import Icon, { IconName } from "./Icon";
import clsx from "clsx";
import styles from "./IconButton.module.scss";

type Props = JSX.IntrinsicElements["button"] & {
  name: IconName;
  title?: string;
  size?: number;
};

const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    const { name, title, className, size, ...buttonProps } = props;
    return (
      <button
        ref={ref}
        className={clsx(styles.button, className)}
        {...buttonProps}
      >
        <Icon name={name} title={title} width={size ?? 20} />
      </button>
    );
  }
);

IconButton.displayName = "forwarded(IconButton)";

export default IconButton;
