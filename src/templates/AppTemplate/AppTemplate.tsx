import * as React from "react";
import HeroSection from "./HeroSection";
import { Provider as DndProvider } from "hooks/userDndState";

type Props = {
  children: React.ReactNode;
};

const AppTemplate = ({ children }: Props) => {
  return (
    <DndProvider>
      <HeroSection />
      {children}
    </DndProvider>
  );
};

export default AppTemplate;
