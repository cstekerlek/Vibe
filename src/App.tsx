import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { EmergencySection } from './components/EmergencySection';
import { SearchAndPresets } from './components/SearchAndPresets';
import { PlaylistView } from './components/PlaylistView';
import { FavoritesModal } from './components/FavoritesModal';
import { INITIAL_DEFAULT_PLAYLIST } from './data/presets';
import { PlaylistResult, PresetMood, TreatmentMode } from './types';
import { requestPlaylistGeneration } from './utils/playlistGenerator';
import { Sparkles, HeartHandshake, Disc3 } from 'lucide-react';

const LOADING_MESSAGES = [
  'Ruh halinize ve hislerinize en uygun frekanslar taranıyor...',
  'Zihinsel dengeyi sağlayacak riffler ve akorlar filtreleniyor...',
  'Sizi en iyi hissettirecek parçalar özenle sıralanıyor...',
  'Spotify ve YouTube dinleme bağlantıları oluşturuluyor...',
  'Kişiselleştirilmiş müzik reçeteniz hazırlanıyor...',
];

export default function App() {
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistResult>(INITIAL_DEFAULT_PLAYLIST);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [selectedMoodId, setSelectedMoodId] = useState<string>('overwhelm-catharsis');
  const [favorites, setFavorites] = useState<PlaylistResult[]>(() => {
    try {
      const saved = localStorage.getItem('viberescue_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const playlistSectionRef = useRef<HTMLDivElement | null>(null);
  const moodsSectionRef = useRef<HTMLDivElement | null>(null);

  // Rotating loading messages
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      timer = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem('viberescue_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const handleSelectMood = async (preset: PresetMood) => {
    setSelectedMoodId(preset.id);
    setIsLoading(true);

    try {
      const generated = await requestPlaylistGeneration(preset.prompt, preset.treatmentMode);
      setCurrentPlaylist(generated);

      // Smooth scroll to playlist
      setTimeout(() => {
        playlistSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Error handling preset mood:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomGenerate = async (prompt: string, mode: TreatmentMode, genre?: string) => {
    setSelectedMoodId('');
    setIsLoading(true);

    try {
      const generated = await requestPlaylistGeneration(prompt, mode, genre);
      setCurrentPlaylist(generated);

      setTimeout(() => {
        playlistSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Error generating playlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    const isFav = favorites.some((f) => f.id === currentPlaylist.id);
    if (isFav) {
      setFavorites(favorites.filter((f) => f.id !== currentPlaylist.id));
    } else {
      setFavorites([currentPlaylist, ...favorites]);
    }
  };

  const handleDeleteFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const scrollToMoods = () => {
    moodsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isCurrentFavorite = favorites.some((f) => f.id === currentPlaylist.id);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Global Header */}
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onEmergencyClick={scrollToMoods}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
        {/* Section 1: Extended Moods Collection */}
        <div ref={moodsSectionRef}>
          <EmergencySection
            onSelectMood={handleSelectMood}
            selectedMoodId={selectedMoodId}
          />
        </div>

        {/* Section 2: Search by genre, custom prompt or feeling */}
        <SearchAndPresets
          onGenerate={handleCustomGenerate}
          isLoading={isLoading}
        />

        {/* Loading Overlay or Spinner Indicator */}
        {isLoading && (
          <div className="p-10 rounded-3xl bg-zinc-900/80 border border-indigo-500/30 flex flex-col items-center justify-center text-center animate-pulse shadow-2xl">
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 mb-4">
              <Disc3 className="w-8 h-8 animate-spin" />
              <Sparkles className="w-4 h-4 text-pink-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Müzik Reçeteniz Hazırlanıyor...
            </h3>
            <p className="text-sm text-indigo-300 font-medium">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
          </div>
        )}

        {/* Section 3: The Curated Playlist Presentation */}
        <div ref={playlistSectionRef}>
          <PlaylistView
            playlist={currentPlaylist}
            isFavorite={isCurrentFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>

      {/* Favorites Drawer Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onSelectPlaylist={(pl) => setCurrentPlaylist(pl)}
        onDeleteFavorite={handleDeleteFavorite}
      />

      {/* Supportive Footer */}
      <footer className="mt-16 border-t border-zinc-900 bg-zinc-950 py-8 px-4 text-center text-xs text-zinc-500 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-zinc-400 font-medium">
          <HeartHandshake className="w-4 h-4 text-indigo-400" />
          <span>Müzik, zihnin en güçlü ve zarif ilacıdır.</span>
        </div>
        <p>
          VibeRescue • Yoğun stres, dinginlik, motivasyon ve sevdiğin tüm müzik türlerinde yapay zeka destekli müzik küratörü.
        </p>
      </footer>
    </div>
  );
}
