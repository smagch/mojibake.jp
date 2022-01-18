import * as React from "react";
import HeroSection from "./HeroSection";
import { Provider as DndProvider } from "hooks/userDndState";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const AppTemplate = ({ children }: Props) => {
  return (
    <DndProvider>
      <HeroSection />
      {children}
      <Footer />
    </DndProvider>
  );
};

export default AppTemplate;
