import HeroSection from "./HeroSection";

export const Demo = () => {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "8px 0" }}>
      <HeroSection />
    </div>
  );
};

export default {
  title: "templates/HeroSection",
  component: HeroSection,
};
