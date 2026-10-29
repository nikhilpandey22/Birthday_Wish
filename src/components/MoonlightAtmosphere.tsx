import React, { useEffect, useRef } from 'react';

interface MoonlightAtmosphereProps {
  intensity?: 'normal' | 'dreamy' | 'subtle';
  showButterflies?: boolean;
}

export const MoonlightAtmosphere: React.FC<MoonlightAtmosphereProps> = ({
  intensity = 'normal',
  showButterflies = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Rose Petals simulation
    const petalCount = intensity === 'dreamy' ? 36 : intensity === 'subtle' ? 14 : 24;
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      swayOffset: number;
      color: string;
    }

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 9 + Math.random() * 11,
        speedY: 0.5 + Math.random() * 0.9,
        speedX: -0.3 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.35 + Math.random() * 0.45,
        swayOffset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.3 ? 'rgba(255, 255, 255,' : 'rgba(247, 243, 235,',
      });
    }

    // Twinkling Stars
    const starCount = 45;
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      blinkSpeed: number;
      phase: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.8 + Math.random() * 1.5,
        baseAlpha: 0.2 + Math.random() * 0.6,
        blinkSpeed: 0.015 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      for (const s of stars) {
        const alpha = s.baseAlpha + Math.sin(time * s.blinkSpeed * 60 + s.phase) * 0.25;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Falling White Rose Petals
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.swayOffset) * 0.45;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.7, p.size * 0.8, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.8, -p.size * 0.8, -p.size * 0.5, 0, -p.size);

        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();

        // Subtle petal vein
        ctx.strokeStyle = `rgba(220, 215, 205, ${p.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep midnight ambient radial gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030611] via-[#060b1e] to-[#040612]" />

      {/* Soft Moon Orb in top right / center */}
      <div
        className="absolute -top-24 right-1/2 translate-x-1/2 md:translate-x-0 md:right-16 w-80 h-80 rounded-full animate-moonlight"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(220, 230, 255, 0.06) 45%, rgba(0, 0, 0, 0) 75%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Gentle Champagne Gold Stardust Glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Canvas for falling petals & twinkling stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Delicate floating butterflies */}
      {showButterflies && (
        <>
          <div className="absolute top-[22%] left-[12%] animate-butterfly opacity-60 pointer-events-none hidden sm:block">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <path
                d="M14 12C12 7 6 5 2 8C-1 11 1 18 8 18C12 18 13.5 14 14 12Z"
                fill="url(#butterflyGrad1)"
                fillOpacity="0.85"
              />
              <path
                d="M14 12C16 7 22 5 26 8C29 11 27 18 20 18C16 18 14.5 14 14 12Z"
                fill="url(#butterflyGrad1)"
                fillOpacity="0.85"
              />
              <path
                d="M14 12C13 16 8 18 4 19C1 20 2 23 7 23C11 23 13 16 14 12Z"
                fill="rgba(255, 255, 255, 0.5)"
              />
              <path
                d="M14 12C15 16 20 18 24 19C27 20 26 23 21 23C17 23 15 16 14 12Z"
                fill="rgba(255, 255, 255, 0.5)"
              />
              <circle cx="14" cy="12" r="1.2" fill="#FFFFFF" />
              <defs>
                <linearGradient id="butterflyGrad1" x1="0" y1="0" x2="28" y2="24">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div
            className="absolute top-[68%] right-[15%] animate-butterfly opacity-50 pointer-events-none"
            style={{ animationDuration: '12s', animationDelay: '3s' }}
          >
            <svg width="22" height="19" viewBox="0 0 28 24" fill="none">
              <path
                d="M14 12C12 7 6 5 2 8C-1 11 1 18 8 18C12 18 13.5 14 14 12Z"
                fill="#FAF8F5"
                fillOpacity="0.8"
              />
              <path
                d="M14 12C16 7 22 5 26 8C29 11 27 18 20 18C16 18 14.5 14 14 12Z"
                fill="#FAF8F5"
                fillOpacity="0.8"
              />
              <circle cx="14" cy="12" r="1" fill="#FFFFFF" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};
