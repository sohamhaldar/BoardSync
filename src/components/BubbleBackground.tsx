'use client'

import React, { useRef, useEffect } from 'react';
import { useWindowSize } from 'react-use';

const BubbleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let bubbles: Bubble[] = [];

    class Bubble {
      x: number;
      y: number;
      radius: number;
      speed: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1 + 1; // Smaller radius range
        this.speed = Math.random() * 1 + 0.2; // Slower speed range
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y -= this.speed;
        if (this.y < -this.radius) {
          this.y = height + this.radius;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
          ctx.fill();
        }
      }
    }

    function init() {
      bubbles = [];
      for (let i = 0; i < 100; i++) {
        bubbles.push(new Bubble());
      }
    }

    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        bubbles.forEach(bubble => {
          bubble.update();
          bubble.draw();
        });
        requestAnimationFrame(animate);
      }
    }

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      init();
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [width, height]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default BubbleBackground;
