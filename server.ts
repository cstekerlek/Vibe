import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini SDK on server only
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

// Playlist generation endpoint
app.post('/api/playlist/generate', async (req: Request, res: Response) => {
  try {
    const { prompt, treatmentMode = 'catharsis', genre = '' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    if (!ai) {
      console.warn('GEMINI_API_KEY is not set. Falling back to local smart synthesizer.');
      res.status(200).json({
        fallback: true,
        message: 'API Key not provided, handled gracefully',
      });
      return;
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
Hedeflenen Tedavi / Mod: "${treatmentMode}" (seçenekler: catharsis (öfke/bağırarak deşarj), calm (sakinleşme/nabız düşürme), hype (savaş modu/güç toplama), melancholy (ağlama/bastırmadan yaşama), focus (akış hali/panikte iş bitirme))
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
            title: {
              type: Type.STRING,
              description: 'Çalma listesinin yaratıcı, çarpıcı ve duruma özel başlığı',
            },
            subtitle: {
              type: Type.STRING,
              description: 'Kısa alt başlık (örneğin: "Sinir Krizini Müziğe Çevirme Reçetesi")',
            },
            targetEmotion: {
              type: Type.STRING,
              description: 'Hedeflenen duygu durumu',
            },
            diagnosis: {
              type: Type.STRING,
              description: 'Kullanıcının içinde bulunduğu durumu anlayan, samimi, esprili ve empatik psikolojik teşhis',
            },
            prescription: {
              type: Type.STRING,
              description: 'Dinleme talimatı ve müzik reçetesi (örn. kulaklık, ses seviyesi, ilk 3 şarkı)',
            },
            energyLevel: {
              type: Type.INTEGER,
              description: 'Çalma listesi enerji seviyesi 1 ile 100 arasında',
            },
            bpmRange: {
              type: Type.STRING,
              description: 'BPM aralığı, örn: "120 - 150 BPM"',
            },
            moodTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-5 adet etiket',
            },
            tracks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: 'Şarkı adı' },
                  artist: { type: Type.STRING, description: 'Sanatçı / Grup' },
                  album: { type: Type.STRING, description: 'Albüm veya Yıl' },
                  year: { type: Type.STRING, description: 'Çıkış yılı' },
                  duration: { type: Type.STRING, description: 'Örn: 3:45' },
                  reason: { type: Type.STRING, description: 'Neden bu şarkı? Bu ruha nasıl iyi gelecek?' },
                  energy: { type: Type.INTEGER, description: '1-100 arası enerji' },
                  vibeBadge: { type: Type.STRING, description: 'Kısa rozet: "Patlama", "Nefes", "İsyan", "Direnç"' },
                  genre: { type: Type.STRING, description: 'Müzik türü' },
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
    if (!text) {
      throw new Error('Empty response from model');
    }

    const parsedData = JSON.parse(text);

    // Enrich with direct search URLs for Spotify, YouTube, Apple Music
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

    const result = {
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
    };

    res.json(result);
  } catch (error: any) {
    console.warn('AI model transient error or busy, signaling fallback gracefully:', error?.message);
    res.status(200).json({
      fallback: true,
      message: error?.message || 'Temporary model unavailability, falling back to local curator',
    });
  }
});

// Vite middleware in dev or static files in production
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  if (isProduction) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
