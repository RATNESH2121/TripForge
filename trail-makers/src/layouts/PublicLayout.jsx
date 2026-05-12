import { Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 });
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position:'fixed', top:0, left:0, right:0, height:'3px',
          background:'linear-gradient(90deg, var(--accent-gold), var(--accent-amber), var(--accent-pink), var(--accent-gold))',
          backgroundSize:'200% 100%',
          transformOrigin:'0%',
          zIndex:9999,
        }}
      />

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity:0, y:15 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-15 }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          style={{ minHeight:'100vh', paddingTop: location.pathname !== '/' ? '84px' : '0' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
