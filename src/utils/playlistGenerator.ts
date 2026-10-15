import { PlaylistResult, TrackItem, TreatmentMode } from '../types';
import { INITIAL_DEFAULT_PLAYLIST } from '../data/presets';

// Curated clean song library for dynamic local generation fallback
const FALLBACK_LIBRARY: Record<string, Partial<TrackItem>[]> = {
  metal_rock: [
    { title: 'Cambaz', artist: 'Mor ve Ötesi', album: 'Dünya Yalan Söylüyor', genre: 'Türkçe Rock', energy: 90, vibeBadge: 'Uyanış', reason: 'Kafandaki karmaşayı sarsarak netleştiren gitar rifi.' },
    { title: 'Faint', artist: 'Linkin Park', album: 'Meteora', genre: 'Nu-Metal', energy: 97, vibeBadge: 'Güçlü Deşarj', reason: 'Tıkanmış duyguları enerjik bir ritimle serbest bırakan vokal.' },
    { title: 'Chop Suey!', artist: 'System of a Down', album: 'Toxicity', genre: 'Alt-Metal', energy: 95, vibeBadge: 'Dinamizm', reason: 'Melodik geçişler ve dinamik riffler zihni canlandırır.' },
    { title: 'Bir Derdim Var', artist: 'Mor ve Ötesi', album: 'Dünya Yalan Söylüyor', genre: 'Türkçe Rock', energy: 86, vibeBadge: 'İç Dökme', reason: 'İçindeki derin duyguyu kabullenip müzikle paylaşma anı.' },
    { title: 'Helal Olsun', artist: 'Duman', album: 'Darmaduman', genre: 'Türkçe Rock', energy: 85, vibeBadge: 'Duruş', reason: 'Zorluklara karşı sakin ve vakur bir duruş sergiler.' },
    { title: 'Breathe', artist: 'The Prodigy', album: 'The Fat of the Land', genre: 'Elektronik', energy: 91, vibeBadge: 'Elektrik', reason: 'Yüksek tempo ile zihindeki ataleti dağıtır.' },
    { title: 'Fırtınam', artist: 'Hayko Cepkin', album: 'Sakin Olmam Lazım', genre: 'Alternatif Metal', energy: 88, vibeBadge: 'Fırtına', reason: 'Melodik yapı ve güçlü vokalin sarsıcı dengesi.' },
    { title: 'Öyle Dertli', artist: 'Duman', album: 'Duman II', genre: 'Türkçe Rock', energy: 82, vibeBadge: 'Denge', reason: 'Gitar solosuyla kafandaki düğümleri çözer.' },
    { title: 'Time', artist: 'Hans Zimmer', album: 'Inception OST', genre: 'Soundtrack', energy: 78, vibeBadge: 'Dingin Güç', reason: 'Yükselen yaylılarla zihne huzurlu bir derinlik katar.' }
  ],
  calm_ambient: [
    { title: 'Nuvole Bianche', artist: 'Ludovico Einaudi', album: 'Una Mattina', genre: 'Neo-Klasik', energy: 35, vibeBadge: 'Huzur', reason: 'Piyano tuşeleri kalp ritmini sakinleştirir.' },
    { title: 'Weightless', artist: 'Marconi Union', album: 'Ambient', genre: 'Ambient', energy: 20, vibeBadge: 'Dinginlik', reason: 'Nörolojik olarak kaygıyı yatıştırdığı bilinen ses tasarımı.' },
    { title: 'An Ending (Ascent)', artist: 'Brian Eno', album: 'Apollo', genre: 'Ambient', energy: 25, vibeBadge: 'Sonsuzluk', reason: 'Geniş ses uzayıyla zihne ferahlık verir.' },
    { title: 'Divenire', artist: 'Ludovico Einaudi', album: 'Divenire', genre: 'Klasik', energy: 45, vibeBadge: 'Yenilenme', reason: 'Kademeli yükselen yaylılar umut aşılar.' },
    { title: 'Avril 14th', artist: 'Aphex Twin', album: 'Drukqs', genre: 'Piyano Ambient', energy: 30, vibeBadge: 'Sessizlik', reason: 'Akustik piyanonun dinlendirici sadeliği.' },
    { title: 'Samskeyti', artist: 'Sigur Rós', album: '()', genre: 'Post-Rock Ambient', energy: 38, vibeBadge: 'Kuzey Rüzgarı', reason: 'İzlanda melodilerinin getirdiği serinletici dinginlik.' },
    { title: 'A Walk', artist: 'Tycho', album: 'Dive', genre: 'Chillwave', energy: 50, vibeBadge: 'Gün Batımı', reason: 'Yumuşak baslar ve sıcak analog tınılar.' },
    { title: 'Gözleri Aşka Gülen', artist: 'İncesaz', album: 'Eylül Şarkıları', genre: 'Enstrümantal', energy: 40, vibeBadge: 'Zarafet', reason: 'Geleneksel enstrümanların ruha serinlik veren zarafeti.' },
    { title: 'Says', artist: 'Nils Frahm', album: 'Spaces', genre: 'Modern Klasik', energy: 42, vibeBadge: 'Meditasyon', reason: 'Zihni yavaşlatan ve berraklaştıran poliritmik döngü.' }
  ],
  uplifting_positive: [
    { title: 'Here Comes the Sun', artist: 'The Beatles', album: 'Abbey Road', genre: 'Akustik Pop', energy: 75, vibeBadge: 'Güneş Açtı', reason: 'Karanlık kışın ardından gelen ilk bahar güneşi hissi.' },
    { title: 'Lovely Day', artist: 'Bill Withers', album: 'Menagerie', genre: 'Soul', energy: 78, vibeBadge: 'İç Açıcı', reason: 'Sabah kahvesiyle birlikte güne pozitif bir tebessüm bırakır.' },
    { title: 'Yaz Dostum (Sarı Çizmeli Mehmet Ağa)', artist: 'Barış Manço', album: 'Yeni Bir Gün', genre: 'Anadolu Rock', energy: 82, vibeBadge: 'Tebessüm', reason: 'Barış Manço\'nun naif bilgeliği ve hayat sevinci.' },
    { title: 'Feel Good Inc.', artist: 'Gorillaz', album: 'Demon Days', genre: 'Alt-Pop', energy: 84, vibeBadge: 'Keyifli Ritim', reason: 'Bas yürüyüşüyle anında ayakları harekete geçiren ritim.' },
    { title: 'Gülümse', artist: 'Sezen Aksu', album: 'Gülümse', genre: 'Türkçe Pop', energy: 70, vibeBadge: 'Umut Işığı', reason: '"Gülümse hadi gülümse, bulutlar gitsin..."' },
    { title: 'September', artist: 'Earth, Wind & Fire', album: 'The Best of EW&F', genre: 'Funk / Disco', energy: 90, vibeBadge: 'Kutlama', reason: 'Günün tüm ağırlığını dansla geride bırakma gücü.' }
  ],
  synth_focus: [
    { title: 'Resonance', artist: 'HOME', album: 'Odyssey', genre: 'Chillwave', energy: 65, vibeBadge: 'Akış Hali', reason: 'Zihni toplayan nostaljik ve hipnotik akış.' },
    { title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', genre: 'Synthwave', energy: 70, vibeBadge: 'Gece Yolu', reason: 'Gece sürüşü ve odaklanma için ideal bas temposu.' },
    { title: 'Time', artist: 'Hans Zimmer', album: 'Inception OST', genre: 'Soundtrack', energy: 80, vibeBadge: 'Odak Zirvesi', reason: 'Zaman kısıtını telaştan çıkarıp başarı motivasyonuna çevirir.' },
    { title: 'Turbo Killer', artist: 'Carpenter Brut', album: 'Trilogy', genre: 'Darksynth', energy: 92, vibeBadge: 'Maksimum Hız', reason: 'Yoğun iş temposunda dikkati tek bir noktaya kilitler.' },
    { title: 'Running in the Night', artist: 'FM-84 ft. Ollie Wride', album: 'Atlas', genre: 'Retrowave', energy: 75, vibeBadge: 'Neon Işıklar', reason: 'Zihne ferahlık veren 80\'ler synth tınıları.' },
    { title: 'Sunson', artist: 'Nils Frahm', album: 'All Melody', genre: 'Elektronik', energy: 74, vibeBadge: 'Üretkenlik', reason: 'Çalışırken ritmi ve dikkati diri tutar.' }
  ],
  hype_resilience: [
    { title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile', genre: 'Hip-Hop', energy: 95, vibeBadge: 'Kararlılık', reason: 'Zorlukların karşısında tek bir hedefe odaklanma gücü.' },
    { title: 'Till I Collapse', artist: 'Eminem ft. Nate Dogg', album: 'The Eminem Show', genre: 'Hip-Hop', energy: 96, vibeBadge: 'Direnç', reason: 'Yorulduğun anlarda bile devam etme iradesi aşılar.' },
    { title: 'Fark Var', artist: 'Ceza', album: 'Evin Delisi', genre: 'Türkçe Rap', energy: 90, vibeBadge: 'Hız & Özgüven', reason: 'Zihindeki engelleri yıkan hızlı ve etkili anlatım.' },
    { title: 'Believer', artist: 'Imagine Dragons', album: 'Evolve', genre: 'Alt-Rock', energy: 88, vibeBadge: 'Güçlenme', reason: 'Zorlukların insanı güçlendiren bir öğretmene dönüştüğü an.' },
    { title: 'Run Boy Run', artist: 'Woodkid', album: 'The Golden Age', genre: 'Epik Indie', energy: 92, vibeBadge: 'İleri Atıl', reason: 'Görkemli davullarla hedefe doğru koşma hissi.' },
    { title: 'Suspus', artist: 'Ceza', album: 'Suspus', genre: 'Türkçe Rap', energy: 86, vibeBadge: 'Kararlı Duruş', reason: 'Tüm olumsuzluklara rağmen vakur durabilme felsefesi.' }
  ],
  melancholy_indie: [
    { title: 'Creep (Acoustic)', artist: 'Radiohead', album: 'My Iron Lung EP', genre: 'Alt-Rock', energy: 60, vibeBadge: 'Yalınlık', reason: 'Yalnız olmadığını hissettiren içten bir itiraf.' },
    { title: 'Apocalypse', artist: 'Cigarettes After Sex', album: 'CAS', genre: 'Dream Pop', energy: 45, vibeBadge: 'Sakin Sığınak', reason: 'Kelimelerin sustuğu yerde buğulu bir kucaklama.' },
    { title: 'Dinle Beni Bi\'', artist: 'Yüzyüzeyken Konuşuruz', album: 'Akustikhane', genre: 'Indie Pop', energy: 55, vibeBadge: 'İçtenlik', reason: 'Duyguların zarif ve yalın paylaşımı.' },
    { title: 'Youth', artist: 'Daughter', album: 'If You Leave', genre: 'Indie Folk', energy: 65, vibeBadge: 'Derin Hisler', reason: 'Gitar arpejleri kalpteki gerginliği yumuşatır.' },
    { title: 'Belki Alışman Lazım', artist: 'Duman', album: 'Belki Alışman Lazım', genre: 'Türkçe Rock', energy: 62, vibeBadge: 'Kabulleniş', reason: 'Her fırtınanın bir gün durulacağını hatırlatır.' }
  ]
};

export async function requestPlaylistGeneration(
  prompt: string,
  treatmentMode: TreatmentMode = 'catharsis',
  genre: string = ''
): Promise<PlaylistResult> {
  try {
    const res = await fetch('/api/playlist/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, treatmentMode, genre }),
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.fallback && data.tracks && data.tracks.length > 0) {
        return data as PlaylistResult;
      }
    }
  } catch (err) {
    console.warn('API call failed or unavailable, using local smart curator:', err);
  }

  // Smart fallback synthesizer with polite language
  return generateSmartFallback(prompt, treatmentMode, genre);
}

function generateSmartFallback(prompt: string, treatmentMode: TreatmentMode, genre: string): PlaylistResult {
  const pLower = prompt.toLowerCase();

  // Uplifting / Morning / Dance
  if (treatmentMode === 'uplifting' || pLower.includes('sabah') || pLower.includes('güneş') || pLower.includes('dans') || pLower.includes('neşe') || pLower.includes('pozitif')) {
    return buildCustomPlaylist(
      '☀️ Pozitif Enerji & Neşeli Başlangıç',
      'Güne gülümseyerek başlatan, hayat enerjisini tazeleyen seçki',
      prompt,
      'uplifting',
      'Neşe & Pozitif Motivasyon',
      'Günün aydınlığını ve içindeki yaşam sevincini uyandırmak için hafif, ritmik ve sıcak melodiler bir araya getirildi.',
      'Güneş ışığını içeri al. Müziğin sesini aç ve adımlarının ritme eşlik etmesine izin ver.',
      82,
      '115 - 128 BPM',
      ['Pozitif', 'Güneşli Gün', 'İlham', 'Neşe'],
      'uplifting_positive'
    );
  }

  // Calm / Sleep / Coffee / Ambient
  if (treatmentMode === 'calm' || pLower.includes('sakin') || pLower.includes('uyku') || pLower.includes('kahve') || pLower.includes('nefes') || pLower.includes('panik')) {
    return buildCustomPlaylist(
      '🌊 Dinginlik Bahçesi: Zihni Sakinleştirme',
      'Nabzı düşüren, nefes aldıran huzurlu akustik ve neo-klasik tınılar',
      prompt,
      'calm',
      'Dinginlik & Zihinsel Huzur',
      'Zihnin dinlenmek, kalabalıktan ve ekrandan uzaklaşıp derin bir nefes almak istiyor. Müziği sakin bir liman gibi kullanabilirsin.',
      'Sırtını yasla, gözlerini dinlendir. Kulaklığı tak ve ses seviyesini orta düzeyde tutarak ritmin akışına bırak.',
      35,
      '60 - 85 BPM',
      ['Huzur', 'Dinginlik', 'Akustik', 'Nefes Al'],
      'calm_ambient'
    );
  }

  // Focus / Work / Coding
  if (treatmentMode === 'focus' || pLower.includes('çalış') || pLower.includes('odak') || pLower.includes('kod') || pLower.includes('ders') || pLower.includes('synth') || pLower.includes('sürüş')) {
    return buildCustomPlaylist(
      '⚡ Hipnotik Akış (Flow State) İstasyonu',
      'Sözsüz, kesintisiz, maksimum verimlilik ve odaklanma ritimleri',
      prompt,
      'focus',
      'Derin Odaklanma & Üretkenlik',
      'Önünde konsantrasyon gerektiren bir iş var. Dikkat dağınıklığını sıfırlayıp akış tüneline girmek için hipnotik ritimler hazırlandı.',
      'Bildirimleri sessize al. Tam ekran moduna geç ve ritimle birlikte sadece işine odaklan.',
      78,
      '118 - 132 BPM',
      ['Deep Focus', 'Synthwave', 'Flow State', 'Konsantrasyon'],
      'synth_focus'
    );
  }

  // Hype / Workout / Resilience
  if (treatmentMode === 'hype' || pLower.includes('spor') || pLower.includes('antrenman') || pLower.includes('güç') || pLower.includes('pes etme')) {
    return buildCustomPlaylist(
      '🥊 Kararlılık Zırhı: Gücünü Hatırla',
      'Zorlukların üzerinden geçmeni sağlayan özgüven ve motivasyon marşları',
      prompt,
      'hype',
      'Özgüven & Kararlılık',
      'Yere düştüğünde seni ayağa kaldıran şey içindeki iradedir. Bu parçalar kandaki dopamini tetikleyip kararlılığını pekiştirecek.',
      'Sesi yükselt. Hedefine odaklan ve kararlılıkla adım at.',
      92,
      '130 - 165 BPM',
      ['Güç', 'Kararlılık', 'Motivasyon', 'Direnç'],
      'hype_resilience'
    );
  }

  // Melancholy / Healing
  if (treatmentMode === 'melancholy' || pLower.includes('üzgün') || pLower.includes('özlem') || pLower.includes('hüzün') || pLower.includes('kırgın')) {
    return buildCustomPlaylist(
      '🌧️ Duygusal Arınma & Melankoli Sığınağı',
      'Bastırılmamış hisler, dokunaklı melodiler ve içsel kabulleniş',
      prompt,
      'melancholy',
      'Duygusal Arınma & Kabulleniş',
      'Her zaman güçlü görünmek zorunda değilsin. Bazen duyguları sonuna kadar yaşamak en sağlıklı yenilenmedir.',
      'Duygularını bastırma. Müziğin dokunaklı tınılarının sana eşlik etmesine izin ver.',
      48,
      '70 - 100 BPM',
      ['İçsel Yolculuk', 'Indie', 'Post-Rock', 'Kabulleniş'],
      'melancholy_indie'
    );
  }

  // Default catharsis / stress relief
  if (pLower.includes('bunal') || pLower.includes('stres') || pLower.includes('gergin') || pLower.includes('kriz')) {
    return INITIAL_DEFAULT_PLAYLIST;
  }

  // General tailored playlist
  return buildCustomPlaylist(
    `🎵 Özel Müzik Seçkisi: "${genre || prompt.slice(0, 30)}"`,
    'Ruh haline ve tercihlerine özel dengeli ses yolculuğu',
    prompt,
    treatmentMode,
    'Duygusal Denge',
    `"${prompt}" talebine göre ruhuna en iyi gelecek parçalar bir araya getirildi. Müzik zihnin en zarif dengeleyicisidir.`,
    'Kulaklığını tak ve sırayla dinle. Parçaların seni ferahlatmasına izin ver.',
    80,
    '120 - 145 BPM',
    ['Kişisel Seçki', 'Melodi', 'Kürasyon'],
    'metal_rock'
  );
}

function buildCustomPlaylist(
  title: string,
  subtitle: string,
  prompt: string,
  treatmentMode: TreatmentMode,
  targetEmotion: string,
  diagnosis: string,
  prescription: string,
  energyLevel: number,
  bpmRange: string,
  moodTags: string[],
  libraryKey: keyof typeof FALLBACK_LIBRARY
): PlaylistResult {
  const baseTracks = FALLBACK_LIBRARY[libraryKey] || FALLBACK_LIBRARY.metal_rock;
  const tracks: TrackItem[] = baseTracks.map((t, idx) => {
    const q = encodeURIComponent(`${t.artist} ${t.title}`);
    return {
      id: `fb-${Date.now()}-${idx}`,
      title: t.title || 'Parça',
      artist: t.artist || 'Sanatçı',
      album: t.album || 'Seçki',
      year: '2024',
      duration: '3:30',
      reason: t.reason || 'Ruh haline tam uyan tınılar.',
      energy: t.energy || 70,
      vibeBadge: t.vibeBadge || 'Özel Seçim',
      genre: t.genre || 'Alternatif',
      spotifySearchUrl: `https://open.spotify.com/search/${q}`,
      youtubeSearchUrl: `https://www.youtube.com/results?search_query=${q}`,
      appleMusicSearchUrl: `https://music.apple.com/us/search?term=${q}`
    };
  });

  return {
    id: `pl-local-${Date.now()}`,
    title,
    subtitle,
    prompt,
    treatmentMode,
    targetEmotion,
    diagnosis,
    prescription,
    energyLevel,
    bpmRange,
    moodTags,
    tracks,
    createdAt: new Date().toISOString()
  };
}
