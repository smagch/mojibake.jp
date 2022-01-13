import * as React from "react";
import clsx from "clsx";
import styles from "./PrimaryButton.module.scss";

type Props = JSX.IntrinsicElements["button"] & {
  modifier?: "iconRight";
  size?: "large";
};

export const PrimaryButton = React.forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    // eslint-disable-next-line react/prop-types
    const { className, modifier, size, ...otherProps } = props;
    return (
      <button
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

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
