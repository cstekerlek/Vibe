import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  isPlaying: boolean;
  color?: string;
  barsCount?: number;
}

export const AudioVisualizer: React.FC<Props> = ({
  isPlaying,
  color = '#ec4899',
  barsCount = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = audioEngine.getAnalyser();
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
      }

      const barWidth = canvas.width / barsCount;
      const gap = 2;
      const effectiveWidth = Math.max(1, barWidth - gap);

      for (let i = 0; i < barsCount; i++) {
        let height = 4;
        if (isPlaying) {
          if (dataArray && dataArray.length > 0) {
            const index = Math.floor((i / barsCount) * (dataArray.length / 2));
            const val = dataArray[index] || 0;
            height = Math.max(4, (val / 255) * (canvas.height - 4));
          } else {
            // Algorithmic wave if no audio node input
            height = 6 + Math.sin(waveOffset + i * 0.4) * 8 + Math.cos(waveOffset * 1.5 + i * 0.2) * 6;
          }
        } else {
          height = 3;
        }

        const x = i * barWidth;
        const y = canvas.height - height;

        // Gradient bar
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, effectiveWidth, height, [2, 2, 0, 0]);
        ctx.fill();
      }

      waveOffset += 0.08;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isPlaying, color, barsCount]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={32}
      className="rounded opacity-90 transition-opacity"
    />
  );
};
