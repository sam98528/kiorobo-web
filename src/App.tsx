import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { gsap } from './styles/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import HeroSection from './components/hero/HeroSection';
import EcosystemSection from './components/ecosystem/EcosystemSection';
import SolutionSection from './components/solution/SolutionSection';
import HardwareSection from './components/hardware/HardwareSection';
import PortfolioSection from './components/portfolio/PortfolioSection';
import ContactSection from './components/contact/ContactSection';

gsap.registerPlugin(ScrollTrigger);

type PageName = 'home' | 'sface' | 'solution' | 'hardware' | 'portfolio' | 'contact';

export default function App() {
  const [activePage, setActivePage] = useState<PageName>('home');

  const handleNavigate = useCallback((page: string) => {
    if (page === activePage) return;
    setActivePage(page as PageName);
  }, [activePage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  // Lock body scroll on home page
  useEffect(() => {
    if (activePage === 'home') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePage]);

  // Refresh ScrollTrigger after page change
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
    return () => clearTimeout(timeout);
  }, [activePage]);

  const renderPage = () => {
    if (activePage === 'home') {
      return <HeroSection onNavigate={handleNavigate} />;
    }

    const pageContent: Record<Exclude<PageName, 'home'>, React.ReactNode> = {
      sface: <><EcosystemSection /><Footer onNavigate={handleNavigate} /></>,
      solution: <><SolutionSection /><Footer onNavigate={handleNavigate} /></>,
      hardware: <><HardwareSection /><Footer onNavigate={handleNavigate} /></>,
      portfolio: <><PortfolioSection /><Footer onNavigate={handleNavigate} /></>,
      contact: <><ContactSection /><Footer onNavigate={handleNavigate} /></>,
    };

    return (
      <PageTransition pageKey={activePage}>
        {pageContent[activePage as Exclude<PageName, 'home'>]}
      </PageTransition>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Nav activePage={activePage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
    </ThemeProvider>
  );
}
