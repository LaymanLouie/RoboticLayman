import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/layout/PageWrapper";
import usePageTitle from "@/hooks/usePageTitle";

const PARTICLE_COUNT = 75;

interface ParticleState {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface ParticleConfig {
  angle: number;
  distance: number;
  size: number;
  baseScale: number;
  duration: number;
  phaseOffset: number;
}

const NotFound = () => {
  usePageTitle("Page Not Found");
  const location = useLocation();
  const [, forceRender] = useState(0);

  const configsRef = useRef<ParticleConfig[]>(
    [...Array(PARTICLE_COUNT)].map((_, i) => ({
      angle: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
      distance: 0.6 + Math.random() * 0.5,
      size: Math.random() * 8 + 6,
      baseScale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 6 + 8,
      phaseOffset: Math.random(),
    })),
  );

  const particlesRef = useRef<ParticleState[]>([]);
  const rafRef = useRef<number>();

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 400;

  const getPosition = useCallback(
    (configIndex: number, progress: number): ParticleState => {
      const config = configsRef.current[configIndex];
      const outerX = centerX + Math.cos(config.angle) * centerX * config.distance;
      const outerY = centerY + Math.sin(config.angle) * centerY * config.distance;
      const innerX = centerX + Math.cos(config.angle) * centerX * 0.2;
      const innerY = centerY + Math.sin(config.angle) * centerY * 0.2;

      const t = (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2;

      return {
        x: outerX + (innerX - outerX) * t,
        y: outerY + (innerY - outerY) * t,
        opacity: 0.5 - t * 0.35,
        scale: config.baseScale * (1 - t * 0.3),
      };
    },
    [centerX, centerY],
  );

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() / 1000;
      particlesRef.current = configsRef.current.map((config, i) => {
        const progress = (elapsed / config.duration + config.phaseOffset) % 1;
        return getPosition(i, progress);
      });
      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getPosition]);

  return (
    <PageWrapper>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[calc(100vh-200px)]">
        <div className="absolute inset-0 overflow-hidden">
          {configsRef.current.map((config, i) => {
            const pos = particlesRef.current[i] || getPosition(i, config.phaseOffset);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-primary will-change-transform"
                style={{
                  width: config.size,
                  height: config.size,
                  transform: `translate(${pos.x - config.size / 2}px, ${pos.y - config.size / 2}px) scale(${pos.scale})`,
                  opacity: pos.opacity,
                }}
              />
            );
          })}
        </div>

        <div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute w-64 h-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative z-10 text-center px-6">
          <motion.div className="relative mb-8" style={{ perspective: 1000 }}>
            <motion.h1
              className="text-[12rem] md:text-[16rem] font-black leading-none gradient-text select-none"
              initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ textShadow: "0 0 100px hsl(var(--primary) / 0.3)" }}
            >
              404
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Lost in Layman's Mind</h2>
            <p className="text-muted-foreground text-lg mb-2">This is not the page you're looking for.</p>
            <p className="text-muted-foreground/60 text-sm mb-8 font-mono">
              Attempted path: <span className="text-primary">{location.pathname}</span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link to="/">
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </span>
              </Link>
            </Button>

            <Button variant="outline" size="lg" onClick={() => window.history.back()} className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
