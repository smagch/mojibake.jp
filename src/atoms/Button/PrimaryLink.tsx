import * as React from "react";
import clsx from "clsx";
import styles from "./PrimaryButton.module.scss";

type Props = JSX.IntrinsicElements["a"] & {
  modifier?: "iconRight";
  size?: "large";
};

export const PrimaryLink = React.forwardRef<HTMLAnchorElement, Props>(
  (props: Props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { className, modifier, size, ...otherProps } = props;
    return (
      <a
        ref={ref}
        className={clsx(
          styles.button,
          modifier && styles[modifier],
          size && styles.large,
          className
        )}
        {...otherProps}
      />
    );
  }
);

PrimaryLink.displayName = "PrimaryLink";

export default PrimaryLink;
