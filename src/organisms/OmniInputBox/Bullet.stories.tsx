import * as React from "react";
import Bullet from "./Bullet";

export const Demo1 = () => <Bullet size={5} index={0} />;
export const Demo2 = () => <Bullet size={5} index={1} />;
export const Demo3 = () => <Bullet size={5} index={2} />;
export const Demo4 = () => <Bullet size={5} index={3} />;
export const Demo5 = () => <Bullet size={5} index={4} />;
export const DemoOverflow = () => <Bullet size={5} index={5} />;

export default {
  title: "organisms/OmniInputBox/Bullet",
  component: Bullet,
};
