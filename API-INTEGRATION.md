# CuteToDo - API Integration Guide

## 架构说明

项目已完成前后端分离改造：
- **前端**：Chrome 扩展（`index.html` + `js/` 目录）
- **后端**：Node.js Express API（`server/` 目录）
- **数据持久化**：JSON 文件（`server/data/`）

## 启动步骤

### 1. 启动后端服务器

```bash
cd server
npm install
npm start
```

服务器默认运行在 `http://localhost:4000`

### 2. 加载 Chrome 扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目根目录 `D:\project\谷歌插件\CuteToDo`

### 3. 测试 API

打开浏览器访问：`file:///D:/project/谷歌插件/CuteToDo/test-api.html`

或者在新标签页打开扩展后，按 F12 打开控制台查看网络请求。

## API 端点

### Tasks API
- `GET /api/tasks` - 获取所有任务
- `POST /api/tasks` - 创建新任务
  ```json
  {
    "title": "任务标题",
    "notes": "备注（可选）",
    "priority": "normal|high|low",
    "completed": false
  }
  ```
- `PUT /api/tasks/:id` - 更新任务
- `DELETE /api/tasks/:id` - 删除任务

### Theme API
- `GET /api/theme` - 获取当前主题
- `PUT /api/theme` - 设置主题
  ```json
  { "theme": "light|dark" }
  ```

### Premium API
- `GET /api/premium` - 获取会员状态
- `POST /api/premium/checkout` - 购买会员（模拟）

## 前端改动

### 1. `js/api.js`
新增 API 客户端，封装所有后端调用：
- `window.CuteToDoAPI.TasksAPI.*` - 任务操作
- `window.CuteToDoAPI.ThemeAPI.*` - 主题操作
- `window.CuteToDoAPI.PremiumAPI.*` - 会员操作

### 2. `js/app.js`
- `loadData()` - 从 API 加载任务、主题、会员状态
- `addTask()` - 调用 `TasksAPI.create()`
- `editTask()` - 调用 `TasksAPI.update()`
- `deleteTask()` - 调用 `TasksAPI.remove()`
- `toggleTask()` - 调用 `TasksAPI.update()` 更新完成状态
- `applyTheme()` - 调用 `ThemeAPI.set()`
- `checkPremiumStatus()` - 调用 `PremiumAPI.status()`

### 3. `js/themes.js`
- `applyTheme()` - 增加调用 `ThemeAPI.set()` 持久化

### 4. `js/premium.js`
- `purchaseMembership()` - 调用 `PremiumAPI.checkout()`

## 错误处理

- API 超时时间：5 秒
- 失败时自动降级到本地 `chrome.storage`
- 所有 API 调用都有 try-catch 保护
- 控制台会记录详细错误日志

## 调试技巧

### 查看网络请求
1. 打开扩展页面
2. 按 F12 打开开发者工具
3. 切换到 Network 标签
4. 筛选 XHR 请求

### 查看后端日志
```bash
# 在 server 目录下运行
npm start
# 会看到类似输出：
# CuteToDo API listening on http://localhost:4000
```

### 测试单个 API
使用 `curl` 或 Postman：
```bash
# 获取任务列表
curl http://localhost:4000/api/tasks

# 创建任务
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"测试任务","priority":"normal","completed":false}'
```

## 数据存储位置

- 后端数据：`server/data/tasks.json` 和 `server/data/config.json`
- 前端缓存：Chrome 扩展的 `chrome.storage.local`

## 常见问题

### Q: 页面崩溃或无限加载？
A: 
1. 确认后端服务器已启动：`curl http://localhost:4000/api/tasks`
2. 检查控制台错误日志
3. 清除浏览器缓存并重新加载扩展

### Q: 请求超时？
A: 
- 检查防火墙是否阻止 `localhost:4000`
- 确认 `manifest.json` 中 `host_permissions` 包含 `http://localhost:4000/*`

### Q: 数据丢失？
A: 数据存储在两处：
- API 服务器的 JSON 文件（持久化）
- 本地 Chrome 存储（缓存）
- 如果服务器重启，数据不会丢失

## 部署建议

### 本地开发
当前配置即可，无需修改。

### 生产环境
1. 将后端部署到云服务器（如 Heroku、AWS、阿里云）
2. 修改 `index.html` 中的 `CUTE_TODO_API_BASE`：
   ```html
   <script>window.CUTE_TODO_API_BASE = 'https://your-api.com';</script>
   ```
3. 更新 `manifest.json` 的 `host_permissions`：
   ```json
   "host_permissions": ["https://your-api.com/*"]
   ```

## 升级到数据库

当前使用 JSON 文件存储。如需升级：
- SQLite：轻量，适合单用户，无需额外服务
- PostgreSQL/MySQL：适合多用户、高并发场景

需要升级时告知，我可以帮您迁移代码。

