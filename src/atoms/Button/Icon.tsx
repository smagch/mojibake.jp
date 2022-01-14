import * as React from "react";
import type { SVGProps } from "react";
import { ReactComponent as Add } from "../../svg/add.svg";
import { ReactComponent as Remove } from "../../svg/remove.svg";
import { ReactComponent as Edit } from "../../svg/edit.svg";
import { ReactComponent as PostAdd } from "../../svg/post-add.svg";
import { ReactComponent as ArrowBack } from "../../svg/arrow_back.svg";
import { ReactComponent as Article } from "../../svg/article.svg";
import { ReactComponent as CheckCircle } from "../../svg/check_circle.svg";
import { ReactComponent as ContentCopy } from "../../svg/content_copy.svg";
import { ReactComponent as Download } from "../../svg/download.svg";
import { ReactComponent as ErrorIcon } from "../../svg/error.svg";
import { ReactComponent as Spinner } from "../../svg/spinner.svg";
import { ReactComponent as Loop } from "../../svg/loop.svg";

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
  | "loop";

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
