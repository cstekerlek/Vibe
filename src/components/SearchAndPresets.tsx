import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Shuffle,
  Compass,
  SlidersHorizontal,
  Flame,
  Waves,
  Zap,
  Terminal,
  CloudRain,
  Sun,
  Heart,
  CassetteTape
} from 'lucide-react';
import { GENRE_SHORTCUTS } from '../data/presets';
import { TreatmentMode } from '../types';

interface Props {
  onGenerate: (prompt: string, mode: TreatmentMode, genre?: string) => void;
  isLoading: boolean;
}

export const SearchAndPresets: React.FC<Props> = ({
  onGenerate,
  isLoading,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [selectedMode, setSelectedMode] = useState<TreatmentMode>('catharsis');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onGenerate(inputVal.trim(), selectedMode);
  };

  const handleGenreClick = (genre: typeof GENRE_SHORTCUTS[0]) => {
    setInputVal(genre.prompt);
    onGenerate(genre.prompt, selectedMode, genre.name);
  };

  const handleSurpriseMe = () => {
    const randomGenre = GENRE_SHORTCUTS[Math.floor(Math.random() * GENRE_SHORTCUTS.length)];
    const modes: TreatmentMode[] = ['catharsis', 'calm', 'hype', 'focus', 'melancholy', 'uplifting', 'romance', 'nostalgia'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];

    setInputVal(randomGenre.prompt);
    setSelectedMode(randomMode);
    onGenerate(randomGenre.prompt, randomMode, randomGenre.name);
  };

  const modeOptions: { id: TreatmentMode; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'catharsis', label: 'Katarsis & Deşarj', icon: Flame, color: 'text-rose-400', desc: 'Gerilim boşaltımı' },
    { id: 'calm', label: 'Sakinleştirici', icon: Waves, color: 'text-teal-400', desc: 'Nabzı düşür & dinlen' },
    { id: 'uplifting', label: 'Pozitif & Neşe', icon: Sun, color: 'text-yellow-400', desc: 'Güneşli ve neşeli' },
    { id: 'hype', label: 'Kararlılık & Güç', icon: Zap, color: 'text-amber-400', desc: 'Yüksek tempo ve spor' },
    { id: 'focus', label: 'Derin Odaklanma', icon: Terminal, color: 'text-blue-400', desc: 'Akış (flow) hali' },
    { id: 'melancholy', label: 'Duygusal Arınma', icon: CloudRain, color: 'text-indigo-400', desc: 'Hisleri kabullenme' },
    { id: 'romance', label: 'Romantizm', icon: Heart, color: 'text-pink-400', desc: 'Zarif duygular' },
    { id: 'nostalgia', label: 'Nostalji', icon: CassetteTape, color: 'text-orange-400', desc: 'Geçmişin samimiyeti' },
  ];

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            Özel Bir Ruh Hali veya Sevdiğin Türü Yaz
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            İstediğin sanatçıyı, müzik türünü veya o anki hissini yaz; yapay zeka senin için kusursuz çalma listesini hazırlasın.
          </p>
        </div>

        <button
          onClick={handleSurpriseMe}
          type="button"
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all self-start md:self-auto cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Rastgele Keşfet (Sürpriz)
        </button>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Örn: 'Türkçe Anadolu Rock', 'Güneşli sabah kahvesi', '90lar Pop', 'Gece kodlama synthwave'..."
            className="w-full pl-12 pr-36 py-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm md:text-base focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
          />

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="absolute right-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Hazırlanıyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Playlist Oluştur</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Mode / Treatment Selection */}
      <div className="mt-4 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            Hedeflenen Duygu & Enerji Reçetesi:
          </span>
          <span className="text-[11px] text-zinc-500">
            Müziğin seni ulaştırmasını istediğin his
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {modeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedMode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedMode(opt.id)}
                className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                    : 'bg-zinc-950/50 border-zinc-800/80 hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-4 h-4 ${opt.color}`} />
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                </div>
                <div className="text-xs font-bold leading-tight truncate">{opt.label}</div>
                <div className="text-[10px] text-zinc-500 leading-tight mt-0.5 truncate">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorite Music Genre Badges */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-400">
            Popüler Müzik Türleri & Kısayollar (Tek tıkla dinle):
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {GENRE_SHORTCUTS.map((genre) => (
            <button
              key={genre.name}
              type="button"
              disabled={isLoading}
              onClick={() => handleGenreClick(genre)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-950/70 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all group cursor-pointer"
            >
              <span className="text-sm group-hover:scale-110 transition-transform">{genre.icon}</span>
              <span>{genre.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
