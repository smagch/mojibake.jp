import HeroSection from "./HeroSection";
import { Provider } from "hooks/userDndState";

export const Demo = () => {
  return (
    <Provider>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "8px 0" }}>
        <HeroSection />
      </div>
    </Provider>
  );
};

export default {
  title: "templates/AppTemplate/HeroSection",
  component: HeroSection,
};
