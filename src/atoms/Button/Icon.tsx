import * as React from "react";
import type { SVGProps } from "react";
import Add from "../../svg/add.svg";
import Remove from "../../svg/remove.svg";
import Edit from "../../svg/edit.svg";
import PostAdd from "../../svg/post-add.svg";
import ArrowBack from "../../svg/arrow_back.svg";
import Article from "../../svg/article.svg";
import CheckCircle from "../../svg/check_circle.svg";
import ContentCopy from "../../svg/content_copy.svg";
import Download from "../../svg/download.svg";
import ErrorIcon from "../../svg/error.svg";
import Spinner from "../../svg/spinner.svg";
import Loop from "../../svg/loop.svg";
import Clear from "../../svg/clear.svg";
import OpenInNew from "../../svg/open_in_new.svg";

export type IconName =
  | "add"
  | "remove"
  | "edit"
  | "postAdd"
  | "arrow_back"
  | "article"
  | "check_circle"
  | "content_copy"
  | "download"
  | "error"
  | "spinner"
  | "loop"
  | "clear"
  | "open_in_new";

type IconMap = {
  [key in IconName]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const iconMap: IconMap = {
  add: Add,
  remove: Remove,
  edit: Edit,
  postAdd: PostAdd,
  arrow_back: ArrowBack,
  article: Article,
  check_circle: CheckCircle,
  content_copy: ContentCopy,
  download: Download,
  error: ErrorIcon,
  spinner: Spinner,
  loop: Loop,
  clear: Clear,
  open_in_new: OpenInNew,
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
