import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import './Discount.css';

export default function Discount() {
  return (
    <section className="discount-section">
      <div className="discount-inner">
        <FadeIn className="discount-text">
          <p className="section-tag">Limited Time Offer</p>
          <h2 className="discount-heading">
            Get <span className="gold">30% off</span><br />your first trek
          </h2>
          <p className="discount-body">
            Book any expedition before the end of this season and receive an exclusive
            30% discount. Limited spots available — the mountains won't wait.
          </p>
          <ul className="discount-perks">
            <li>✓ Free gear consultation</li>
            <li>✓ No booking fees</li>
            <li>✓ Full refund within 48 hrs</li>
          </ul>
          <div className="discount-cta">
            <motion.a
              href="#packages"
              className="btn-discount-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Claim Discount
            </motion.a>
            <a href="#contact" className="btn-discount-ghost">Talk to an expert</a>
          </div>
        </FadeIn>

        <motion.div
          className="discount-visual"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/assets/discount_camping.png" alt="Camping at sunset" className="discount-img" />
          <div className="discount-badge">
            <span className="badge-pct">30%</span>
            <span className="badge-off">OFF</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
