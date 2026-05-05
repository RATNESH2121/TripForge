import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './Discover.css';

const continents = [
  { id: 'na', label: 'North America', cx: 14, cy: 28, path: 'M30,10 L80,5 L100,30 L90,80 L60,110 L20,100 L0,70 L10,30 Z' },
  { id: 'sa', label: 'South America', cx: 22, cy: 52, path: 'M20,0 L50,5 L65,40 L60,90 L40,130 L10,120 L0,70 L5,30 Z' },
  { id: 'eu', label: 'Europe',        cx: 45, cy: 22, path: 'M20,0 L55,5 L60,35 L50,60 L25,65 L5,45 L0,20 Z' },
  { id: 'as', label: 'Asia',          cx: 62, cy: 20, path: 'M40,0 L100,10 L130,50 L110,100 L70,120 L30,110 L0,70 L10,30 Z' },
  { id: 'au', label: 'Australia',     cx: 83, cy: 48, path: 'M20,0 L80,5 L100,40 L80,80 L40,90 L5,60 L0,25 Z' },
];

export default function Discover() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const planeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [0, 1, 1, 1, 1]);

  return (
    <section className="discover" id="discover" ref={containerRef}>
      <div className="discover-inner">
        <FadeIn>
          <p className="section-tag centered">DISCOVER</p>
          <h2 className="discover-title">
            Discover the world through<br />our eyes
          </h2>
        </FadeIn>

        {/* SVG World Map */}
        <div className="world-map">
          <svg viewBox="0 0 1000 380" className="map-svg" xmlns="http://www.w3.org/2000/svg">
            {/* Dashed flight path animated */}
            <motion.path
              d="M90,210 Q200,85 350,180 Q500,270 650,150 Q800,70 920,190"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.5"
              strokeDasharray="9,7"
              fill="none"
              style={{ pathLength }}
            />
            
            {/* Airplanes */}
            {[
              { x: 72,  y: 200, rot: -25, delay: 0.1 },
              { x: 305, y: 168, rot: -12, delay: 0.3 },
              { x: 525, y: 248, rot:  12, delay: 0.5 },
              { x: 765, y: 112, rot: -28, delay: 0.7 },
            ].map((p, i) => (
              <motion.text
                key={i}
                x={p.x} y={p.y}
                fontSize="18"
                fill="white"
                opacity={planeOpacity}
                transform={`rotate(${p.rot}, ${p.x + 9}, ${p.y - 4})`}
              >✈</motion.text>
            ))}

            {/* Continents */}
            <g transform="translate(60, 60)" className="continent-group">
              <path d="M30,10 L80,5 L100,30 L90,80 L60,110 L20,100 L0,70 L10,30 Z" fill="white" opacity="0.65"/>
              <text x="50" y="130" fontSize="13" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="Inter, sans-serif">North America</text>
            </g>
            <g transform="translate(195, 155)" className="continent-group">
              <path d="M20,0 L50,5 L65,40 L60,90 L40,130 L10,120 L0,70 L5,30 Z" fill="white" opacity="0.65"/>
              <text x="30" y="152" fontSize="13" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="Inter, sans-serif">South America</text>
            </g>
            <g transform="translate(435, 75)" className="continent-group">
              <path d="M20,0 L55,5 L60,35 L50,60 L25,65 L5,45 L0,20 Z" fill="white" opacity="0.65"/>
              <text x="28" y="84" fontSize="13" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="Inter, sans-serif">Europe</text>
            </g>
            <g transform="translate(590, 55)" className="continent-group">
              <path d="M40,0 L100,10 L130,50 L110,100 L70,120 L30,110 L0,70 L10,30 Z" fill="white" opacity="0.65"/>
              <text x="65" y="142" fontSize="13" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="Inter, sans-serif">Asia</text>
            </g>
            <g transform="translate(795, 135)" className="continent-group">
              <path d="M20,0 L80,5 L100,40 L80,80 L40,90 L5,60 L0,25 Z" fill="white" opacity="0.65"/>
              <text x="50" y="108" fontSize="13" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="Inter, sans-serif">Australia</text>
            </g>
          </svg>
        </div>

        <FadeIn delay={0.4}>
          <motion.a 
            href="#packages" 
            className="btn-book"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.a>
        </FadeIn>
      </div>
    </section>
  );
}
