import MainLayout from "./layout/MainLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import DeveloperActivity from "./sections/DeveloperActivity";
import TechnologyStack from "./sections/TechnologyStack";
import Projects from "./sections/Projects";
import EngineeringPrinciples from "./sections/EngineeringPrinciples";
import Achievements from "./sections/Achievements";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";
import Footer from "./components/footer/Footer";
import "./styles/globals.css";
import "./styles/animations.css";

function App() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <DeveloperActivity />
      <TechnologyStack />
      <Projects />
      <EngineeringPrinciples />
      <Achievements />
      <Resume />
      <Contact />
      <Footer />
    </MainLayout>
  );
}

export default App;
