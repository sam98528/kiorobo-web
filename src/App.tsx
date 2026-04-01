import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { gsap } from './styles/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import EcosystemSection from './components/ecosystem/EcosystemSection';
import SolutionSection from './components/solution/SolutionSection';
import HardwareSection from './components/hardware/HardwareSection';
import PortfolioSection from './components/portfolio/PortfolioSection';
import ContactSection from './components/contact/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Nav />
      <main>
        <HeroSection />
        <EcosystemSection />
        <SolutionSection />
        <HardwareSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
