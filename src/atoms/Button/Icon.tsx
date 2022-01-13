import * as React from "react";
import type { SVGProps } from "react";
import { ReactComponent as Add } from "../../svg/add.svg";
import { ReactComponent as Remove } from "../../svg/remove.svg";
import { ReactComponent as Edit } from "../../svg/edit.svg";

export type IconName = "add" | "remove" | "edit";

type IconMap = {
  [key in IconName]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const iconMap: IconMap = {
  add: Add,
  remove: Remove,
  edit: Edit,
};

export type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  title?: string;
};

const Icon: React.FC<Props> = ({ name, ...props }) => {
  const Component = iconMap[name];
  return <Component {...props} />;
};

export default Icon;
