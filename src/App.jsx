import MainLayout from "./layout/MainLayout";
import Hero from "./sections/Hero";
import DeveloperActivity from "./sections/DeveloperActivity";
import TechnologyStack from "./sections/TechnologyStack";
import Projects from "./sections/Projects";
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
      <DeveloperActivity />
      <TechnologyStack />
      <Projects />
      <Achievements />
      <Resume />
      <Contact />
      <Footer />
    </MainLayout>
  );
}

export default App;
