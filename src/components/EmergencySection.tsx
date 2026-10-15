import React, { useState } from 'react';
import {
  Flame,
  Waves,
  ShieldAlert,
  CloudRain,
  Sun,
  Dumbbell,
  PartyPopper,
  Lightbulb,
  Coffee,
  Trees,
  Moon,
  Terminal,
  Hourglass,
  Car,
  CassetteTape,
  Heart,
  Building2,
  Sparkles,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { PRESET_MOODS, MOOD_CATEGORIES } from '../data/presets';
import { PresetMood, MoodCategory } from '../types';

interface Props {
  onSelectMood: (preset: PresetMood) => void;
  selectedMoodId?: string;
}

export const EmergencySection: React.FC<Props> = ({
  onSelectMood,
  selectedMoodId,
}) => {
  const [activeCategory, setActiveCategory] = useState<MoodCategory>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-teal-300" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'CloudRain':
        return <CloudRain className="w-5 h-5 text-indigo-300" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-rose-400" />;
      case 'PartyPopper':
        return <PartyPopper className="w-5 h-5 text-pink-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-cyan-400" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-blue-400" />;
      case 'Hourglass':
        return <Hourglass className="w-5 h-5 text-purple-400" />;
      case 'Car':
        return <Car className="w-5 h-5 text-violet-400" />;
      case 'CassetteTape':
        return <CassetteTape className="w-5 h-5 text-orange-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-zinc-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  const filteredMoods = PRESET_MOODS.filter(
    (m) => activeCategory === 'all' || m.category === activeCategory
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 via-zinc-950 to-zinc-950 p-6 md:p-8 shadow-2xl">
      {/* Background ambient decorative glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header callout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Geniş Ruh Hali Koleksiyonu
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Şu Anki Ruh Halini Seç,{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Müzik Reçeten Hazır
              </span>
            </h1>

            <p className="mt-1.5 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Yoğun stres, tükenmişlik, derin huzur, sabah enerjisi veya gece sürüşü...
              Nörolojik durumuna ve hislerine en uygun frekansı tek tıkla başlat:
            </p>
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80 mb-5">
          {MOOD_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid of Preset Moods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredMoods.map((preset) => {
            const isSelected = selectedMoodId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectMood(preset)}
                className={`group relative flex flex-col justify-between p-4 rounded-2xl border text-left transition-all duration-300 transform active:scale-98 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.3)] ring-2 ring-indigo-500/50'
                    : 'bg-zinc-900/70 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700 hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-750 group-hover:scale-110 transition-transform">
                      {getIcon(preset.icon)}
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
                      {preset.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-100 group-hover:text-white leading-snug">
                    {preset.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 group-hover:text-zinc-300 line-clamp-2 leading-relaxed">
                    {preset.tagline}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Reçeteyi Gör</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
