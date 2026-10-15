import React from 'react';
import { X, Heart, Trash2, ArrowRight, Music, Clock } from 'lucide-react';
import { PlaylistResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  favorites: PlaylistResult[];
  onSelectPlaylist: (playlist: PlaylistResult) => void;
  onDeleteFavorite: (id: string) => void;
}

export const FavoritesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  favorites,
  onSelectPlaylist,
  onDeleteFavorite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500/40" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Kaydedilen Çalma Listeleri</h3>
              <p className="text-xs text-zinc-400">
                Daha önce oluşturduğun ve favoriye aldığın müzik reçeteleri
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto flex-1 py-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center mx-auto text-zinc-500 mb-3">
                <Music className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-300">Henüz kaydedilmiş liste yok</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                Beğendiğin bir playlist olduğunda "Favoriye Ekle" butonuna basarak buraya kaydedebilirsin.
              </p>
            </div>
          ) : (
            favorites.map((pl) => (
              <div
                key={pl.id}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-850 transition-all"
              >
                <div
                  onClick={() => {
                    onSelectPlaylist(pl);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer pr-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                      {pl.targetEmotion}
                    </span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {pl.tracks.length} Parça
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {pl.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {pl.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectPlaylist(pl);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-indigo-600 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    title="Listeyi Aç"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteFavorite(pl.id)}
                    className="p-2 rounded-xl hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
