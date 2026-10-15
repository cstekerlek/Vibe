import { GoogleGenAI, Type } from '@google/genai';

const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, treatmentMode = 'catharsis', genre = '' } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'API Key not provided, handled gracefully',
      });
    }

    const systemInstruction = `
Sen profesyonel, empatik ve zarif bir müzik küratörü, müzik psikoloğu ve DJ'sin.
Kullanıcı sana hissettiği ruh halini (örneğin yoğun stres, tükenmişlik, panik, neşe, sabah motivasyonu, spor enerjisi, gece sürüşü, nostalji, derin odaklanma, romantizm) veya sevdiği müzik türlerini/sanatçıları belirtiyor.

ÖNEMLİ DİL KURALLARI:
1. KESİNLİKLE küfür, kaba söz, hakaret veya kaba argo KULLANMA.
2. Dilin her zaman temiz, saygılı, yapıcı, sıcak, samimi ve empatik olmalıdır.
3. Kullanıcının ruh haline doğrudan hitap eden, psikolojik olarak destekleyici, zarif bir "Müzik Reçetesi" (Sound Prescription) ve durum teşhisi (Diagnosis) yaz.
4. 10 ile 12 arasında nokta atışı şarkı seç. Seçilen şarkılarda da kaba/küfürlü içerik yerine sanatsal ve müzikal değeri yüksek parçaları tercih et.
5. Her şarkı için o şarkının neden o anki ruh haline iyi geleceğini açıklayan estetik bir cümle (reason) yaz.
6. Çıktıyı kesinlikle belirtilen JSON şemasında döndür.
`;

    const userPrompt = `
Kullanıcı Talebi / Ruh Hali: "${prompt}"
Hedeflenen Tedavi / Mod: "${treatmentMode}" (seçenekler: catharsis, calm, hype, melancholy, focus, uplifting, romance, nostalgia)
Varsa Tercih Edilen Tür / Sanatçı: "${genre || 'Otomatik Belirle'}"

Lütfen bu durum için özel 10-12 parçalık benzersiz bir çalma listesi hazırla.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Çalma listesinin başlığı' },
            subtitle: { type: Type.STRING, description: 'Kısa alt başlık' },
            targetEmotion: { type: Type.STRING, description: 'Hedeflenen duygu durumu' },
            diagnosis: { type: Type.STRING, description: 'Empatik psikolojik durum analizi' },
            prescription: { type: Type.STRING, description: 'Dinleme tavsiyesi ve müzik reçetesi' },
            energyLevel: { type: Type.INTEGER, description: '1-100 arası enerji' },
            bpmRange: { type: Type.STRING, description: 'BPM aralığı' },
            moodTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            tracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  artist: { type: Type.STRING },
                  album: { type: Type.STRING },
                  year: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  energy: { type: Type.INTEGER },
                  vibeBadge: { type: Type.STRING },
                  genre: { type: Type.STRING },
                },
                required: ['title', 'artist', 'reason', 'energy'],
              },
            },
          },
          required: ['title', 'subtitle', 'diagnosis', 'prescription', 'energyLevel', 'bpmRange', 'moodTags', 'tracks'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from model');

    const parsedData = JSON.parse(text);

    const tracksWithUrls = (parsedData.tracks || []).map((t: any, idx: number) => {
      const q = encodeURIComponent(`${t.artist} ${t.title}`);
      return {
        id: `gen-${Date.now()}-${idx}`,
        title: t.title,
        artist: t.artist,
        album: t.album || '',
        year: t.year || '',
        duration: t.duration || '3:30',
        reason: t.reason,
        energy: t.energy || 75,
        vibeBadge: t.vibeBadge || 'Öne Çıkan',
        genre: t.genre || 'Alternatif',
        spotifySearchUrl: `https://open.spotify.com/search/${q}`,
        youtubeSearchUrl: `https://www.youtube.com/results?search_query=${q}`,
        appleMusicSearchUrl: `https://music.apple.com/us/search?term=${q}`,
      };
    });

    res.json({
      id: `pl-${Date.now()}`,
      title: parsedData.title,
      subtitle: parsedData.subtitle,
      prompt,
      treatmentMode,
      targetEmotion: parsedData.targetEmotion || 'Duygu Dönüşümü',
      diagnosis: parsedData.diagnosis,
      prescription: parsedData.prescription,
      energyLevel: parsedData.energyLevel || 80,
      bpmRange: parsedData.bpmRange || '120 - 150 BPM',
      moodTags: parsedData.moodTags || ['Müzik Reçetesi'],
      tracks: tracksWithUrls,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.warn('Vercel serverless AI transient error, falling back:', error?.message);
    res.status(200).json({
      fallback: true,
      message: error?.message || 'Temporary fallback',
    });
  }
}
