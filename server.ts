import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeRouter } from './server/routes/analyze.ts';
import { chatRouter } from './server/routes/chat.ts';
import { feedbackRouter } from './server/routes/feedback.ts';
import { healthRouter } from './server/routes/health.ts';
import { suggestRouter } from './server/routes/suggest.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.set('trust proxy', 1);

  // Security headers
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Strict request body size limit (handles up to 4 MB base64 images safely)
  app.use(express.json({ limit: '6mb' }));

  app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err && typeof err === 'object' && 'type' in err && err.type === 'entity.too.large') {
      res.status(413).json({ error: 'Screenshot or message payload is too large (max 4 MB).' });
      return;
    }
    if (err instanceof SyntaxError) {
      res.status(400).json({ error: 'Invalid JSON request body.' });
      return;
    }
    next(err);
  });

  // API Routes
  app.use('/api', healthRouter);
  app.use('/api', analyzeRouter);
  app.use('/api', feedbackRouter);
  app.use('/api', chatRouter);
  app.use('/api', suggestRouter);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.info(`ScamShield server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start ScamShield server:', err instanceof Error ? err.message : 'UNKNOWN');
  process.exit(1);
});
