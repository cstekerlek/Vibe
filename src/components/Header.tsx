import React from 'react';
import { Headphones, Heart, Sparkles, Music } from 'lucide-react';
import { AmbientPlayer } from './AmbientPlayer';

interface Props {
  onOpenFavorites: () => void;
  favoritesCount: number;
  onEmergencyClick: () => void;
}

export const Header: React.FC<Props> = ({
  onOpenFavorites,
  favoritesCount,
  onEmergencyClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(244,63,94,0.35)]">
            <Headphones className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                VibeRescue
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Music className="w-2.5 h-2.5" />
                Müzik Reçetesi
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium hidden sm:block">
              Ruh haline, krize veya sevdiğin türe göre nokta atışı playlist
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Mood Button in Header */}
          <button
            onClick={onEmergencyClick}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)] transition-all transform active:scale-95 cursor-pointer"
            title="Hızlı Ruh Hali & Reçete Seçimi"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-bold">Ruh Halleri</span>
          </button>

          {/* Ambient Sound Layer */}
          <AmbientPlayer />

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-all"
            title="Kaydedilen Çalma Listeleri"
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'text-rose-400 fill-rose-400' : 'text-zinc-400'}`} />
            <span className="hidden md:inline">Kaydedilenler</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/30 text-rose-300 text-[10px] font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
