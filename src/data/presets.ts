import { PlaylistResult, PresetMood, MoodCategory } from '../types';

export const MOOD_CATEGORIES: { id: MoodCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tüm Ruh Halleri', icon: 'Sparkles' },
  { id: 'stress_relief', label: 'Stres & Deşarj', icon: 'Flame' },
  { id: 'energy_uplift', label: 'Enerji & Motivasyon', icon: 'Zap' },
  { id: 'peace_chill', label: 'Huzur & Dinginlik', icon: 'Waves' },
  { id: 'focus_flow', label: 'Odaklanma & Akış', icon: 'Terminal' },
  { id: 'night_vibe', label: 'Gece & Nostalji', icon: 'Moon' },
];

export const PRESET_MOODS: PresetMood[] = [
  // STRESS & RELIEF
  {
    id: 'overwhelm-catharsis',
    title: 'Aşırı Bunalım & Deşarj',
    tagline: 'İçindeki gerilimi ve baskıyı yüksek sesle boşalt',
    icon: 'Flame',
    category: 'stress_relief',
    treatmentMode: 'catharsis',
    prompt: 'Şu anda aşırı bunaldım, her şey üst üste geldi. İçimdeki gerilimi ve baskıyı dağıtacak, güçlü rock ve alternatif katarsis playlisti hazırla.',
    badge: '💥 Güçlü Deşarj',
    description: 'Baskı tavan yaptığında bastırmak yerine müziğin gücüyle topraklan.',
    gradient: 'from-rose-600 via-red-600 to-amber-600'
  },
  {
    id: 'anxiety-relief',
    title: 'Zihni Susturma & Panik Dindirici',
    tagline: 'Nabzını yavaşlat, zihnine dinginlik serp',
    icon: 'Waves',
    category: 'peace_chill',
    treatmentMode: 'calm',
    prompt: 'Aşırı stresli ve kaygılı hissediyorum. Kalp atışlarımı yavaşlatacak, zihnimi sakinleştirecek ambient, neo-klasik ve lo-fi yatıştırıcı parçalar ver.',
    badge: '🌊 Dinginlik Kalkanı',
    description: 'Düşünce girdabını durdur. Zihnini saracak huzurlu frekanslar.',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-700'
  },
  {
    id: 'resilience-hype',
    title: 'Yeniden Diriliş & Savaşçı Ruhu',
    tagline: 'Zorluklara inat ayağa kalk ve gücünü hatırla',
    icon: 'ShieldAlert',
    category: 'energy_uplift',
    treatmentMode: 'hype',
    prompt: 'Zor durumdayım ama pes etmeyeceğim. Beni ayağa kaldıracak, saf özgüven ve güç aşılayan tempolu rock, phonk ve kararlı hip-hop parçaları ver.',
    badge: '🥊 Kararlılık & Güç',
    description: 'Yere düştüysen tozunu silkele. Saf motivasyon ve kararlılık enerjisi.',
    gradient: 'from-amber-500 via-orange-600 to-red-600'
  },
  {
    id: 'melancholy-release',
    title: 'Duygusal Arınma & Melankoli',
    tagline: 'Yoruldun ve kırıldın; bastırma, bırak çözülsün',
    icon: 'CloudRain',
    category: 'stress_relief',
    treatmentMode: 'melancholy',
    prompt: 'Ruhum yorgun, içsel bir hesaplaşma içindeyim. Bastırılmış duyguları serbest bırakan dokunaklı post-rock, indie ve melankolik parçalar ver.',
    badge: '🌧️ Duygusal Arınma',
    description: 'Bazen iyileşmek için hisleri kabullenmek gerekir. Dürüst ve derin tınılar.',
    gradient: 'from-slate-700 via-indigo-900 to-slate-900'
  },

  // ENERGY & UPLIFT
  {
    id: 'morning-sunshine',
    title: 'Güneşli Sabah & Pozitif Uyanış',
    tagline: 'Güne gülümseyerek, taptaze bir enerjiyle başla',
    icon: 'Sun',
    category: 'energy_uplift',
    treatmentMode: 'uplifting',
    prompt: 'Sabah uyandım ve güne harika, pozitif, neşeli ve enerjik bir başlangıç yapmak istiyorum. İç açıcı indie pop, akustik ve neşeli tınılar ver.',
    badge: '☀️ Pozitif Sabah',
    description: 'Kahvenin yanına eşlik eden, hayat enerjisini yükselten neşeli ritimler.',
    gradient: 'from-amber-400 via-orange-500 to-rose-400'
  },
  {
    id: 'workout-beast',
    title: 'Antrenman & Dopamin Patlaması',
    tagline: 'Sınırları zorla, tempoyu zirveye taşı',
    icon: 'Dumbbell',
    category: 'energy_uplift',
    treatmentMode: 'hype',
    prompt: 'Spordayım, antrenman yapıyorum. Maksimum odaklanma, nabız yükselten yüksek BPM elektronik, trap ve sert ritimler ver.',
    badge: '⚡ Yüksek Tempo',
    description: 'Ağırlık kaldırırken veya koşarken limitlerini aşmanı sağlayan adrenalin kaynağı.',
    gradient: 'from-red-600 via-rose-600 to-violet-700'
  },
  {
    id: 'feel-good-dance',
    title: 'Kafa Dağıtma & Dans',
    tagline: 'Dertleri geride bırak, ritme teslim ol',
    icon: 'PartyPopper',
    category: 'energy_uplift',
    treatmentMode: 'uplifting',
    prompt: 'Tüm günün yorgunluğunu unutup sadece dans etmek, neşelenmek ve kafa dağıtmak istiyorum. Nu-disco, indie dance ve funk tınıları ver.',
    badge: '🕺 Saf Neşe',
    description: 'Düşünmeyi bırakıp bedenini müziğin salınımına bıraktığın hafiflik anı.',
    gradient: 'from-fuchsia-500 via-pink-600 to-purple-600'
  },
  {
    id: 'creative-spark',
    title: 'Yaratıcı Kıvılcım & İlham',
    tagline: 'Hayal gücünü canlandır, zihnine yeni kapılar aç',
    icon: 'Lightbulb',
    category: 'focus_flow',
    treatmentMode: 'focus',
    prompt: 'Tasarım veya yazarlık yapıyorum, yaratıcı ilhama ihtiyacım var. Sıra dışı, renkli, atmosferik art-pop, ambient ve enstrümantal füzyon parçalar ver.',
    badge: '💡 İlham Kaynağı',
    description: 'Beynin sağ lobunu harekete geçiren, ilham perilerini çağıran ses manzaraları.',
    gradient: 'from-violet-500 via-indigo-600 to-cyan-500'
  },

  // PEACE & CHILL
  {
    id: 'rainy-coffee',
    title: 'Yağmurlu Gün & Kahve Köşesi',
    tagline: 'Pencere kenarı, sıcak kupa ve huzurlu tınılar',
    icon: 'Coffee',
    category: 'peace_chill',
    treatmentMode: 'calm',
    prompt: 'Dışarıda yağmur yağıyor, elimde sıcak kahvemle cam kenarında oturuyorum. Sakin akustik gitarlar, lo-fi piyano ve yumuşak caz parçaları ver.',
    badge: '☕ Kahve & Yağmur',
    description: 'Sıcak battaniye hissi veren, zamanı yavaşlatan huzur melodileri.',
    gradient: 'from-amber-700 via-yellow-800 to-stone-800'
  },
  {
    id: 'nature-zen',
    title: 'Orman Dinginliği & Doğa Sığınağı',
    tagline: 'Şehrin gürültüsünden kaç, doğanın nefesini duy',
    icon: 'Trees',
    category: 'peace_chill',
    treatmentMode: 'calm',
    prompt: 'Zihnimi tazelemek istiyorum. Kuş sesleri, yaprak hışırtıları ve doğa temalı enstrümantal akustik parçalar içeren zen bir liste hazırla.',
    badge: '🌲 Doğa Sığınağı',
    description: 'Köklenmek ve zihnindeki statik elektriği topraklamak için organik sesler.',
    gradient: 'from-emerald-600 via-teal-700 to-green-900'
  },
  {
    id: 'deep-sleep',
    title: 'Derin Gece & Uykuya Geçiş',
    tagline: 'Düşünceleri bırak, rüyalar âlemine süzül',
    icon: 'Moon',
    category: 'peace_chill',
    treatmentMode: 'calm',
    prompt: 'Uyumakta zorlanıyorum, beynimi sakinleştirip uykuya dalmama yardımcı olacak 432hz, derin ambient ve yumuşak piyano ninni tonları ver.',
    badge: '🌙 Uyku Frekansı',
    description: 'Göz kapaklarını ağırlaştıran, uyku dalgalarını tetikleyen kadife sesler.',
    gradient: 'from-indigo-950 via-slate-900 to-black'
  },

  // FOCUS & FLOW
  {
    id: 'deep-focus-synth',
    title: 'Derin Odaklanma & Flow State',
    tagline: 'Sözsüz, kesintisiz, maksimum zihinsel netlik',
    icon: 'Terminal',
    category: 'focus_flow',
    treatmentMode: 'focus',
    prompt: 'Ders çalışırken ve kod yazarken dikkatimi dağıtmayacak, hipnotik dark synthwave, minimalist elektronik ve akış (flow) parçaları ver.',
    badge: '⚡ Derin Odak',
    description: 'Zaman algısını unutturan, odak tüneline sokan ritmik akış.',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-600'
  },
  {
    id: 'deadline-rush',
    title: 'Son Dakika Teslim Hızı',
    tagline: 'Zaman daralıyor, panikle değil ritimle bitir',
    icon: 'Hourglass',
    category: 'focus_flow',
    treatmentMode: 'focus',
    prompt: 'Teslim tarihi yaklaşıyor, acil iş bitirmem lazım. Beni panikten kurtarıp ritmik bir hızla klavyeye odaklayacak enerjik synth ve soundtrack parçaları ver.',
    badge: '⏳ Zaman Yarışı',
    description: 'Zaman kısıtını krize değil, yüksek verimli bir odaklanma maratonuna çevir.',
    gradient: 'from-purple-700 via-pink-700 to-rose-700'
  },

  // NIGHT & NOSTALGIA
  {
    id: 'night-drive',
    title: 'Gece Sürüşü & Yalnız Yolculuk',
    tagline: 'Boş caddeler, neon ışıklar ve içsel yolculuk',
    icon: 'Car',
    category: 'night_vibe',
    treatmentMode: 'focus',
    prompt: 'Gece arabayla boş yollarda sürüyorum. Neon ışıklar altında hissettiren synthwave, dream pop ve hipnotik bas hatları ver.',
    badge: '🌌 Gece Sürüşü',
    description: 'Kafayı boşaltmak ve geceye karışmak için kusursuz yol müziği.',
    gradient: 'from-purple-900 via-indigo-950 to-blue-900'
  },
  {
    id: 'nostalgia-90s',
    title: '90\'lar Altın Çağ & Sıcak Anılar',
    tagline: 'Çocukluğun, kasetlerin ve samimiyetin tınıları',
    icon: 'CassetteTape',
    category: 'night_vibe',
    treatmentMode: 'nostalgia',
    prompt: 'Eski günleri özledim. 90lar ve 2000ler başı samimi Türkçe pop ve alternatif nostalji şarkıları ver.',
    badge: '📼 Nostalji Rüzgarı',
    description: 'İçini ısıtan tanıdık nakaratlar ve geçmişin naif samimiyeti.',
    gradient: 'from-amber-600 via-rose-700 to-indigo-800'
  },
  {
    id: 'romantic-evening',
    title: 'Romantik Akşam & Kalp Bağı',
    tagline: 'Mum ışığı, derin bakışlar ve zarif melodiler',
    icon: 'Heart',
    category: 'night_vibe',
    treatmentMode: 'romance',
    prompt: 'Sevdiğim kişiyle sakin, romantik bir akşam geçiriyorum. Akustik, neo-soul ve zarif aşk şarkıları ver.',
    badge: '🕯️ Romantizm',
    description: 'Kalp atışlarını senkronize eden samimi ve zarif melodiler.',
    gradient: 'from-rose-700 via-pink-800 to-purple-900'
  },
  {
    id: 'post-punk-doomer',
    title: 'Gri Şehir & Post-Punk',
    tagline: 'Soğuk bas hatları, puslu sokaklar ve derinlik',
    icon: 'Building2',
    category: 'night_vibe',
    treatmentMode: 'melancholy',
    prompt: 'Molchat Doma, She Past Away, Joy Division tarzı soğuk post-punk, darkwave ve gri şehir atmosferi parçaları ver.',
    badge: '🏢 Gri Şehir',
    description: 'Karanlık bas riffleriyle zihnin kuytu köşelerinde dolaşan estetik.',
    gradient: 'from-zinc-700 via-stone-800 to-zinc-900'
  }
];

export const GENRE_SHORTCUTS = [
  { name: 'Türkçe Rock & Alternatif', icon: '🎸', prompt: 'Türkçe alternatif rock, Mor ve Ötesi, Duman, Manga, Adamlar tarzı derin ve enerjik parçalar' },
  { name: 'Anadolu Rock & Psychedelic', icon: '🌿', prompt: 'Erkin Koray, Barış Manço, Moğollar, Altın Gün tarzı Anadolu rock ve psychedelic füzyon' },
  { name: 'Midwest Emo & Shoegaze', icon: '🌌', prompt: 'American Football, Slowdive, Whirr, Modern Baseball tarzı melankolik gitar duvarları' },
  { name: 'Dark Synthwave & Retrowave', icon: '🌆', prompt: 'Carpenter Brut, Kavinsky, Perturbator, Gunship tarzı gece sürüşü ve neon retro elektronik' },
  { name: 'Melodic Techno & Afterlife', icon: '🎧', prompt: 'Tale of Us, Anyma, Stephan Bodzin, ARTBAT tarzı hipnotik ve duygusal tekno' },
  { name: '90\'lar Türkçe Pop & Nostalji', icon: '📼', prompt: 'Tarkan, Sezen Aksu, Levent Yüksel, Sertab Erener 90lar altın çağ Türkçe pop' },
  { name: 'Klasik & Neo-Klasik Piyano', icon: '🎹', prompt: 'Ludovico Einaudi, Yann Tiersen, Chopin, Yiruma dinlendirici piyano şaheserleri' },
  { name: 'Lo-Fi Chill & Coffee House', icon: '☕', prompt: 'Yumuşak piyano, yağmur sesli lo-fi beats, ders çalışma ve kafa dinleme tonları' },
  { name: 'Akustik & Yalın Vokaller', icon: '🍃', prompt: 'Sakin akustik gitarlar, yalın vokaller, orman ve kahve kokulu dinlendirici şarkılar' },
  { name: 'R&B / Soul & Neo-Soul', icon: '✨', prompt: 'Leon Bridges, Jorja Smith, Frank Ocean tarzı sıcak baslar ve kadife vokaller' }
];

export const INITIAL_DEFAULT_PLAYLIST: PlaylistResult = {
  id: 'crisis-first-aid',
  title: '🚨 Acil Durum Protokolü: Aşırı Stres ve Gerilimden Çıkış',
  subtitle: 'Zihinsel aşırı yüklenme anında sinir sistemini dengeleme ve sağlıklı deşarj reçetesi',
  prompt: 'Şu anda aşırı bunaldım ve gerginim, ne dinleyeceğim?',
  treatmentMode: 'catharsis',
  targetEmotion: 'Aşırı Gerilim & Sağlıklı Deşarj',
  diagnosis: 'Baskı ve yorgunluk üst seviyeye ulaşmış durumda. Zihnindeki düşünceler yoğun bir uğultu yaratıyor. Şu an ihtiyacın olan şey duygularını bastırmak değil; onları güçlü, ritmik ve sanatsal bir ses duvarıyla topraklayarak içindeki gerilimi boşaltmaktır.',
  prescription: 'Kulaklıklarını tak. Sesi dengeli bir seviyede aç. İlk parçalarda birikmiş gerilimi müzikle birlikte serbest bırak; ilerleyen parçalarda ritmin seni yeniden berrak bir zihne taşımasına izin ver.',
  energyLevel: 88,
  bpmRange: '125 - 165 BPM',
  moodTags: ['Deşarj', 'Gerilim Tahliyesi', 'Direnç', 'Rock', 'Odak'],
  tracks: [
    {
      id: 't-1',
      title: 'Cambaz',
      artist: 'Mor ve Ötesi',
      album: 'Dünya Yalan Söylüyor (2004)',
      year: '2004',
      duration: '3:38',
      reason: 'Açılış rifi kafandaki karmaşayı hemen hizaya sokarak düşüncelerini odaklar.',
      energy: 92,
      vibeBadge: 'İçsel Uyanış',
      spotifySearchUrl: 'https://open.spotify.com/search/Mor%20ve%20Ötesi%20Cambaz',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Mor+ve+Ötesi+Cambaz',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Mor+ve+Ötesi+Cambaz',
      genre: 'Türkçe Rock'
    },
    {
      id: 't-2',
      title: 'Faint',
      artist: 'Linkin Park',
      album: 'Meteora (2003)',
      year: '2003',
      duration: '2:42',
      reason: 'Chester Bennington\'ın samimi vokali içindeki birikmiş tıkanıklığı müzikal bir güçle çözer.',
      energy: 96,
      vibeBadge: 'Güçlü Deşarj',
      spotifySearchUrl: 'https://open.spotify.com/search/Linkin%20Park%20Faint',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Linkin+Park+Faint',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Linkin+Park+Faint',
      genre: 'Nu-Metal'
    },
    {
      id: 't-3',
      title: 'Helal Olsun',
      artist: 'Duman',
      album: 'Darmaduman (2013)',
      year: '2013',
      duration: '4:21',
      reason: 'Günün tüm ağırlığına karşı sakin ama kararlı bir kabulleniş ve duruş sergiler.',
      energy: 84,
      vibeBadge: 'Dingin Kararlılık',
      spotifySearchUrl: 'https://open.spotify.com/search/Duman%20Helal%20Olsun',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Duman+Helal+Olsun',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Duman+Helal+Olsun',
      genre: 'Türkçe Rock'
    },
    {
      id: 't-4',
      title: 'Breathe',
      artist: 'The Prodigy',
      album: 'The Fat of the Land (1997)',
      year: '1997',
      duration: '5:35',
      reason: 'Gerginliği ritmik bir kontrole ve dinamik bir hareket enerjisine dönüştürür.',
      energy: 90,
      vibeBadge: 'Elektronik Ritim',
      spotifySearchUrl: 'https://open.spotify.com/search/The%20Prodigy%20Breathe',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=The+Prodigy+Breathe',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=The+Prodigy+Breathe',
      genre: 'Elektronik / Breakbeat'
    },
    {
      id: 't-5',
      title: 'Fark Var',
      artist: 'Ceza',
      album: 'Evin Delisi (2007)',
      year: '2007',
      duration: '4:06',
      reason: 'Akıcı lirik temposu zihindeki vesveseleri bastırıp odaklanma gücünü artırır.',
      energy: 89,
      vibeBadge: 'Direnç Marşı',
      spotifySearchUrl: 'https://open.spotify.com/search/Ceza%20Fark%20Var',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Ceza+Fark+Var',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Ceza+Fark+Var',
      genre: 'Türkçe Rap'
    },
    {
      id: 't-6',
      title: 'Change (In the House of Flies)',
      artist: 'Deftones',
      album: 'White Pony (2000)',
      year: '2000',
      duration: '5:00',
      reason: 'Gerilimin yerini hipnotik, olgun ve derin bir atmosferik rahatlamaya bırakmasını sağlar.',
      energy: 78,
      vibeBadge: 'Hipnotik Denge',
      spotifySearchUrl: 'https://open.spotify.com/search/Deftones%20Change',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Deftones+Change',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Deftones+Change',
      genre: 'Alternatif Metal'
    },
    {
      id: 't-7',
      title: 'Fırtınam',
      artist: 'Hayko Cepkin',
      album: 'Sakin Olmam Lazım (2005)',
      year: '2005',
      duration: '4:15',
      reason: 'İçindeki fırtınanın ortasında dengede kalmayı öğreten güçlü vokal ve melodik yapı.',
      energy: 87,
      vibeBadge: 'Fırtına Dengesi',
      spotifySearchUrl: 'https://open.spotify.com/search/Hayko%20Cepkin%20Fırtınam',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Hayko+Cepkin+Fırtınam',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Hayko+Cepkin+Fırtınam',
      genre: 'Alternatif Metal'
    },
    {
      id: 't-8',
      title: 'Time',
      artist: 'Hans Zimmer',
      album: 'Inception OST (2010)',
      year: '2010',
      duration: '4:35',
      reason: 'Yavaşça yükselen yaylılar ve piyano, zihindeki kaosun yerini dingin bir bilgeliğe bırakmasını sağlar.',
      energy: 75,
      vibeBadge: 'Dingin Zirve',
      spotifySearchUrl: 'https://open.spotify.com/search/Hans%20Zimmer%20Time',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Hans+Zimmer+Time',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Hans+Zimmer+Time',
      genre: 'Soundtrack'
    },
    {
      id: 't-9',
      title: 'Zor',
      artist: 'Mor ve Ötesi',
      album: 'Gül Kendine (2001)',
      year: '2001',
      duration: '3:30',
      reason: '"Zor, çok zor ama imkansız değil..." Hayatın zorluklarına karşı dingin bir umut fısıldar.',
      energy: 80,
      vibeBadge: 'Umut & Güç',
      spotifySearchUrl: 'https://open.spotify.com/search/Mor%20ve%20Ötesi%20Zor',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Mor+ve+Ötesi+Zor',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Mor+ve+Ötesi+Zor',
      genre: 'Türkçe Rock'
    },
    {
      id: 't-10',
      title: 'Nuvole Bianche',
      artist: 'Ludovico Einaudi',
      album: 'Una Mattina (2004)',
      year: '2004',
      duration: '5:57',
      reason: 'Fırtına dindikten sonra zihne düşen ilk serin yağmur damlaları gibi huzur verir.',
      energy: 40,
      vibeBadge: 'Huzurlu Kapanış',
      spotifySearchUrl: 'https://open.spotify.com/search/Ludovico%20Einaudi%20Nuvole%20Bianche',
      youtubeSearchUrl: 'https://www.youtube.com/results?search_query=Ludovico+Einaudi+Nuvole+Bianche',
      appleMusicSearchUrl: 'https://music.apple.com/us/search?term=Ludovico+Einaudi+Nuvole+Bianche',
      genre: 'Neo-Klasik'
    }
  ],
  createdAt: new Date().toISOString()
};
