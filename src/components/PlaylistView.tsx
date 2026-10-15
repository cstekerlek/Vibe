import React, { useState } from 'react';
import {
  Play,
  Square,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Share2,
  Sparkles,
  Zap,
  Activity,
  Flame,
  Music2,
  Filter,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { PlaylistResult, TrackItem } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { AudioVisualizer } from './AudioVisualizer';

interface Props {
  playlist: PlaylistResult;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const PlaylistView: React.FC<Props> = ({
  playlist,
  isFavorite,
  onToggleFavorite,
}) => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [filter, setFilter] = useState<'all' | 'high_energy' | 'turkish'>('all');

  const handlePlayPreview = (track: TrackItem) => {
    if (playingTrackId === track.id) {
      audioEngine.stopTrackPreview();
      setPlayingTrackId(null);
    } else {
      audioEngine.playTrackPreview(track.id, track.energy, () => {
        setPlayingTrackId(null);
      });
      setPlayingTrackId(track.id);
    }
  };

  const handleCopyPlaylist = () => {
    const text = `🎧 ${playlist.title} - ${playlist.subtitle}
🎯 Duygu: ${playlist.targetEmotion} | BPM: ${playlist.bpmRange}
💊 Reçete: ${playlist.prescription}

Parça Listesi:
${playlist.tracks.map((t, idx) => `${idx + 1}. ${t.artist} - ${t.title} (${t.reason})`).join('\n')}

VibeRescue ile oluşturuldu.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  // Filter tracks
  const filteredTracks = playlist.tracks.filter((t) => {
    if (filter === 'high_energy') return t.energy >= 80;
    if (filter === 'turkish') {
      const g = (t.genre || '').toLowerCase();
      const a = (t.artist || '').toLowerCase();
      return g.includes('türk') || a.includes('ötesi') || a.includes('duman') || a.includes('ceza') || a.includes('hayko') || a.includes('manga') || a.includes('aksu') || a.includes('tarkan');
    }
    return true;
  });

  const getEnergyColor = (val: number) => {
    if (val >= 85) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (val >= 65) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-teal-400 bg-teal-500/10 border-teal-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Playlist Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 shadow-2xl backdrop-blur-md">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Top badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                {playlist.targetEmotion}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                <Activity className="w-3 h-3 text-emerald-400" />
                {playlist.bpmRange}
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${getEnergyColor(playlist.energyLevel)}`}>
                <Zap className="w-3 h-3" />
                Enerji: %{playlist.energyLevel}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {playlist.title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-medium">
              {playlist.subtitle}
            </p>

            {/* Mood Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {playlist.moodTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-750"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex lg:flex-col items-center lg:items-end gap-2 flex-shrink-0">
            <button
              onClick={onToggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-zinc-800/80 hover:bg-zinc-800 border-zinc-700 text-zinc-300'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'Favorilerde' : 'Favoriye Ekle'}</span>
            </button>

            <button
              onClick={handleCopyPlaylist}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Listeyi Kopyala'}</span>
            </button>

            <button
              onClick={handleShareLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-all cursor-pointer"
              title="Bağlantıyı Kopyala"
            >
              {shareCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{shareCopied ? 'Paylaşıldı!' : 'Paylaş'}</span>
            </button>
          </div>
        </div>

        {/* Diagnosis & Prescription Callouts */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Teşhis */}
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
              <Activity className="w-3.5 h-3.5" />
              Ruh Hali & Teşhis
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {playlist.diagnosis}
            </p>
          </div>

          {/* Reçete */}
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wide">
              <Flame className="w-3.5 h-3.5" />
              Müzik Reçetesi & Kullanım Talimatı
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {playlist.prescription}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Tracklist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <Music2 className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">
            Çalma Listesi ({filteredTracks.length} Parça)
          </h3>
          <span className="text-xs text-zinc-500">
            • Önizlemek için oynata bas veya Spotify/YouTube'a git
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter('high_energy')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'high_energy'
                ? 'bg-zinc-800 text-rose-300 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Yüksek Enerji (%80+)
          </button>
          <button
            onClick={() => setFilter('turkish')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'turkish'
                ? 'bg-zinc-800 text-indigo-300 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Türkçe Parçalar
          </button>
        </div>
      </div>

      {/* Track Cards List */}
      <div className="space-y-2.5">
        {filteredTracks.map((track, index) => {
          const isPlaying = playingTrackId === track.id;
          return (
            <div
              key={track.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 p-4 ${
                isPlaying
                  ? 'bg-zinc-900 border-indigo-500/80 shadow-[0_0_30px_rgba(99,102,241,0.2)] ring-1 ring-indigo-500/50'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Play button + Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  {/* Play / Stop Button */}
                  <button
                    onClick={() => handlePlayPreview(track)}
                    className={`relative flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse'
                        : 'bg-zinc-800/90 hover:bg-indigo-600 hover:text-white text-zinc-300 group-hover:scale-105'
                    }`}
                    title={isPlaying ? 'Durdur' : 'Sentezleyici Önizlemeyi Çal'}
                  >
                    {isPlaying ? (
                      <Square className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Index */}
                  <span className="text-xs font-mono font-bold text-zinc-500 w-5 hidden sm:block">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>

                  {/* Title & Artist & Reason */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
                        {track.title}
                      </h4>
                      <span className="text-sm font-medium text-zinc-400">
                        • {track.artist}
                      </span>
                      {track.vibeBadge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-750">
                          {track.vibeBadge}
                        </span>
                      )}
                      {track.genre && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-950/80 text-zinc-400 border border-zinc-800">
                          {track.genre}
                        </span>
                      )}
                    </div>

                    {/* Psychological cure / reason */}
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      💡 <span className="text-zinc-300 italic font-medium">{track.reason}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Audio Visualizer (if playing) + Energy + External Links */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                  {isPlaying && (
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-950/60 border border-indigo-500/30">
                      <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      <AudioVisualizer isPlaying={true} color="#818cf8" barsCount={12} />
                    </div>
                  )}

                  {/* Energy Meter Bar */}
                  <div className="hidden lg:flex flex-col items-end w-20">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                      <span>Enerji</span>
                      <span className="font-bold text-zinc-200">%{track.energy}</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 via-indigo-500 to-rose-500 h-full rounded-full"
                        style={{ width: `${track.energy}%` }}
                      />
                    </div>
                  </div>

                  {/* 1-Click Platform Buttons */}
                  <div className="flex items-center gap-1.5">
                    {/* Spotify */}
                    <a
                      href={track.spotifySearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-xs font-semibold transition-all hover:scale-105"
                      title="Spotify'da Dinle"
                    >
                      <span className="font-bold">Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    {/* YouTube */}
                    <a
                      href={track.youtubeSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 text-xs font-semibold transition-all hover:scale-105"
                      title="YouTube Music'te Dinle"
                    >
                      <span className="font-bold">YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
