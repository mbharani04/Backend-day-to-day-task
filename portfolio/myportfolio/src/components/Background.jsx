import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles setup
    const particles = [];
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`; // Purple particles
        ctx.fill();
      });

      // Draw subtle lines connecting nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 120) * 0.08})`; // Fade blue lines
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-20 bg-bg-dark overflow-hidden bg-grid-pattern">
      {/* Glow blobs in the background */}
      <div 
        className="glow-blob bg-brand-primary w-[40vw] h-[40vw] -left-[10vw] -top-[10vw]"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="glow-blob bg-brand-secondary w-[45vw] h-[45vw] -right-[10vw] bottom-[10vw]"
        style={{ animationDelay: '-5s' }}
      />
      <div 
        className="glow-blob bg-brand-accent w-[30vw] h-[30vw] left-[20vw] top-[40vw]"
        style={{ animationDelay: '-10s' }}
      />

      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
      />
    </div>
  );
}
