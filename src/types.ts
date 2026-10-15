export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: string;
  duration?: string;
  reason: string;
  energy: number; // 1-100
  vibeBadge?: string;
  spotifySearchUrl: string;
  youtubeSearchUrl: string;
  appleMusicSearchUrl: string;
  genre?: string;
}

export type TreatmentMode =
  | 'catharsis'
  | 'calm'
  | 'hype'
  | 'melancholy'
  | 'focus'
  | 'uplifting'
  | 'romance'
  | 'nostalgia';

export type MoodCategory =
  | 'all'
  | 'stress_relief'
  | 'energy_uplift'
  | 'peace_chill'
  | 'focus_flow'
  | 'night_vibe';

export interface PlaylistResult {
  id: string;
  title: string;
  subtitle: string;
  prompt: string;
  treatmentMode: TreatmentMode;
  targetEmotion: string;
  diagnosis: string;
  prescription: string;
  energyLevel: number; // 1-100
  bpmRange: string;
  moodTags: string[];
  tracks: TrackItem[];
  colorTheme?: string;
  createdAt: string;
}

export interface PresetMood {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  category: MoodCategory;
  treatmentMode: TreatmentMode;
  prompt: string;
  badge: string;
  description: string;
  gradient: string;
}
