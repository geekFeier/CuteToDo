import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Task from './models/Task.js';
import Config from './models/Config.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cutetodo';

app.use(cors());
app.use(express.json());

// Serve static files from the parent directory
app.use(express.static('../'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../' });
});

// MongoDB 连接
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// 中间件：获取用户ID（目前使用默认值，后续可扩展为真实的用户认证）
function getUserId(req) {
  // 从 header 中获取 userId，如果没有则使用默认值
  return req.headers['x-user-id'] || 'default';
}

// Tasks API
app.get('/api/tasks', async (req, res) => {
  try {
    const userId = getUserId(req);
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, notes, dueAt, priority, completed } = req.body || {};
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title required' });
    }

    const userId = getUserId(req);
    const now = Date.now();
    
    const task = new Task({
      id: uuidv4(),
      userId,
      title,
      notes: notes || '',
      dueAt: typeof dueAt === 'number' ? dueAt : null,
      priority: priority || 'normal',
      completed: Boolean(completed),
      createdAt: now,
      updatedAt: now
    });

    await task.save();
    res.status(201).json(task.toObject());
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);
    
    const task = await Task.findOne({ id, userId });
    if (!task) {
      return res.status(404).json({ error: 'not found' });
    }

    // 更新允许的字段
    const allowedUpdates = ['title', 'notes', 'dueAt', 'priority', 'completed'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });
    task.updatedAt = Date.now();

    await task.save();
    res.json(task.toObject());
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);
    
    const result = await Task.deleteOne({ id, userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// History Tasks API - 精简字段
app.get('/api/tasks/history', async (req, res) => {
  try {
    const userId = getUserId(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const showCompleted = req.query.showCompleted === 'true';
    
    // 构建查询条件
    let query = { 
      userId,
      createdAt: { $lt: today.getTime() }
    };
    
    // 如果不显示已完成任务，添加过滤条件
    if (!showCompleted) {
      query.completed = false;
    }
    
    // 获取今天之前创建的任务，只返回必要字段
    const historyTasks = await Task.find(query)
    .select('id title completed createdAt priority') // 只选择必要字段
    .sort({ createdAt: -1 })
    .lean();
    
    res.json(historyTasks);
  } catch (error) {
    console.error('Error fetching history tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Today's Tasks API - 完整字段
app.get('/api/tasks/today', async (req, res) => {
  try {
    const userId = getUserId(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 获取今天创建的任务，返回完整字段
    const todayTasks = await Task.find({ 
      userId,
      createdAt: { $gte: today.getTime() }
    })
    .sort({ createdAt: -1 })
    .lean();
    
    res.json(todayTasks);
  } catch (error) {
    console.error('Error fetching today tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Theme API
app.get('/api/theme', async (req, res) => {
  try {
    const userId = getUserId(req);
    let config = await Config.findOne({ userId });
    
    if (!config) {
      // 如果配置不存在，创建默认配置
      config = new Config({ userId, theme: 'light', premium: false });
      await config.save();
    }

    res.json({ theme: config.theme || 'light' });
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/theme', async (req, res) => {
  try {
    const { theme } = req.body || {};
    if (!['light', 'dark'].includes(theme)) {
      return res.status(400).json({ error: 'invalid theme' });
    }

    const userId = getUserId(req);
    let config = await Config.findOne({ userId });
    
    if (!config) {
      config = new Config({ userId });
    }
    
    config.theme = theme;
    config.updatedAt = Date.now();
    await config.save();

    res.json(config.toObject());
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Premium API
app.get('/api/premium', async (req, res) => {
  try {
    const userId = getUserId(req);
    let config = await Config.findOne({ userId });
    
    if (!config) {
      config = new Config({ userId, premium: false });
      await config.save();
    }

    res.json({ premium: Boolean(config.premium) });
  } catch (error) {
    console.error('Error fetching premium status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/premium/checkout', async (req, res) => {
  try {
    const userId = getUserId(req);
    let config = await Config.findOne({ userId });
    
    if (!config) {
      config = new Config({ userId });
    }
    
    config.premium = true;
    config.premiumActivatedAt = Date.now();
    config.updatedAt = Date.now();
    await config.save();

    res.json({ success: true, premium: true });
  } catch (error) {
    console.error('Error activating premium:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: Date.now()
  });
});

// 启动服务器
await connectDB();
app.listen(PORT, () => {
  console.log(`🚀 CuteToDo API listening on http://localhost:${PORT}`);
  console.log(`📊 MongoDB URI: ${MONGODB_URI}`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('\n⏳ Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});
