import React, { useState, useEffect } from 'react';
import { CloudRain, Disc, Radio, Waves, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const AmbientPlayer: React.FC = () => {
  const [activeType, setActiveType] = useState<'rain' | 'vinyl' | 'drone' | 'waves' | null>(null);
  const [volume, setVolume] = useState<number>(0.3);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSound = (type: 'rain' | 'vinyl' | 'drone' | 'waves') => {
    if (activeType === type) {
      audioEngine.stopAmbient();
      setActiveType(null);
    } else {
      audioEngine.playAmbient(type, volume);
      setActiveType(type);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setAmbientVolume(val);
  };

  useEffect(() => {
    return () => {
      audioEngine.stopAmbient();
    };
  }, []);

  const ambientOptions = [
    { id: 'rain', label: 'Yağmur', icon: CloudRain, color: 'text-cyan-400', desc: 'Camdaki yağmur damlaları' },
    { id: 'vinyl', label: 'Vinil Çıtırtısı', icon: Disc, color: 'text-amber-400', desc: 'Sıcak analog plak çıtırtısı' },
    { id: 'drone', label: '432 Hz Drone', icon: Sparkles, color: 'text-purple-400', desc: 'Sinir sistemini yatıştıran frekans' },
    { id: 'waves', label: 'Deniz Dalgaları', icon: Waves, color: 'text-emerald-400', desc: 'Kıyıya vuran serin sular' },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          activeType
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
            : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 border border-zinc-700/60'
        }`}
        title="Rahatlatıcı Ortam Sesi Katmanı"
      >
        <Radio className={`w-3.5 h-3.5 ${activeType ? 'animate-pulse text-emerald-400' : 'text-zinc-400'}`} />
        <span>
          {activeType
            ? `${ambientOptions.find(o => o.id === activeType)?.label} Açık`
            : 'Ambiyans Sesi'}
        </span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/70 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
            <div>
              <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" />
                Rahatlatıcı Ortam Sesleri
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Müziğin altında çalan yatıştırıcı ses katmanı
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {ambientOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = activeType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleSound(opt.id as any)}
                  className={`flex flex-col items-start p-2.5 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-zinc-800 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                      : 'bg-zinc-800/40 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Icon className={`w-4 h-4 ${opt.color}`} />
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <span className="text-xs font-semibold">{opt.label}</span>
                  <span className="text-[10px] text-zinc-400 line-clamp-1">{opt.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Volume slider */}
          <div className="pt-2 border-t border-zinc-800/80 flex items-center gap-2">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            ) : (
              <Volume2 className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-emerald-500 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-zinc-400 font-mono w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
