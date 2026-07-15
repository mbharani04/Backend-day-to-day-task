import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const directionVariants = {
    up:    { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down:  { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left:  { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    scale: { hidden: { scale: 0.92, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
    fade:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  const variant = directionVariants[direction] ?? directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variant}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
