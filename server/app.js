import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const tasksFile = path.join(dataDir, 'tasks.json');
const configFile = path.join(dataDir, 'config.json');

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try { await fs.access(tasksFile); } catch { await fs.writeFile(tasksFile, '[]', 'utf-8'); }
  try { await fs.access(configFile); } catch { await fs.writeFile(configFile, JSON.stringify({ theme: 'light', premium: false }, null, 2), 'utf-8'); }
}

function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

// Tasks API
app.get('/api/tasks', async (req, res) => {
  const text = await fs.readFile(tasksFile, 'utf-8');
  const tasks = safeParse(text, []);
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { title, notes, dueAt, priority, completed } = req.body || {};
  if (!title || typeof title !== 'string') return res.status(400).json({ error: 'title required' });
  const text = await fs.readFile(tasksFile, 'utf-8');
  const tasks = safeParse(text, []);
  const now = Date.now();
  const task = {
    id: uuidv4(),
    title,
    notes: notes || '',
    dueAt: typeof dueAt === 'number' ? dueAt : null,
    priority: priority || 'normal',
    completed: Boolean(completed),
    createdAt: now,
    updatedAt: now
  };
  tasks.push(task);
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), 'utf-8');
  res.status(201).json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const text = await fs.readFile(tasksFile, 'utf-8');
  const tasks = safeParse(text, []);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'not found' });
  const current = tasks[index];
  const updated = { ...current, ...req.body, id: current.id, updatedAt: Date.now() };
  tasks[index] = updated;
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), 'utf-8');
  res.json(updated);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const text = await fs.readFile(tasksFile, 'utf-8');
  const tasks = safeParse(text, []);
  const next = tasks.filter(t => t.id !== id);
  if (next.length === tasks.length) return res.status(404).json({ error: 'not found' });
  await fs.writeFile(tasksFile, JSON.stringify(next, null, 2), 'utf-8');
  res.status(204).end();
});

// Theme API
app.get('/api/theme', async (req, res) => {
  const text = await fs.readFile(configFile, 'utf-8');
  const config = safeParse(text, { theme: 'light' });
  res.json({ theme: config.theme || 'light' });
});

app.put('/api/theme', async (req, res) => {
  const { theme } = req.body || {};
  if (!['light', 'dark'].includes(theme)) return res.status(400).json({ error: 'invalid theme' });
  const text = await fs.readFile(configFile, 'utf-8');
  const config = safeParse(text, { theme: 'light', premium: false });
  const next = { ...config, theme };
  await fs.writeFile(configFile, JSON.stringify(next, null, 2), 'utf-8');
  res.json(next);
});

// Premium API (mock)
app.get('/api/premium', async (req, res) => {
  const text = await fs.readFile(configFile, 'utf-8');
  const config = safeParse(text, { premium: false });
  res.json({ premium: Boolean(config.premium) });
});

app.post('/api/premium/checkout', async (req, res) => {
  // Mock: immediately set premium true
  const text = await fs.readFile(configFile, 'utf-8');
  const config = safeParse(text, { theme: 'light', premium: false });
  const next = { ...config, premium: true, premiumActivatedAt: Date.now() };
  await fs.writeFile(configFile, JSON.stringify(next, null, 2), 'utf-8');
  res.json({ success: true, premium: true });
});

await ensureDataFiles();
app.listen(PORT, () => {
  console.log(`CuteToDo API listening on http://localhost:${PORT}`);
});


