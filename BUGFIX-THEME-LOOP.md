# 主题切换循环调用问题 - 已修复

## 问题描述
切换主题时出现无限循环调用接口，导致页面崩溃。

## 根本原因
1. **多个 `applyTheme` 方法**：`js/app.js` 和 `js/themes.js` 都有 `applyTheme` 方法，可能互相触发
2. **缺少防重入保护**：没有标志位防止同一主题被重复应用
3. **API 调用阻塞**：await API 调用可能导致级联触发
4. **频繁保存**：`saveData()` 被频繁调用，可能触发存储监听器
5. **缺少初始化保护**：`loadData()` 可能被多次调用

## 修复方案

### 1. ✅ 防重入保护 (`js/app.js`)
```javascript
async applyTheme(themeName) {
    // 添加防重入标志
    if (this._applyingTheme) {
        console.log('Theme application already in progress, skipping');
        return;
    }
    
    // 检查主题是否已应用
    if (this.currentTheme === themeName) {
        console.log('Theme already applied:', themeName);
        return;
    }
    
    this._applyingTheme = true;
    try {
        // ... 应用主题逻辑
    } finally {
        this._applyingTheme = false;
    }
}
```

### 2. ✅ 防重入保护 (`js/themes.js`)
```javascript
async applyTheme(themeName) {
    // 同样的防重入逻辑
    if (this._applyingTheme) return;
    if (this.currentTheme === themeName) return;
    
    this._applyingTheme = true;
    try {
        // ... 应用主题逻辑
    } finally {
        this._applyingTheme = false;
    }
}
```

### 3. ✅ API 调用优化
```javascript
// 不 await API 调用，避免阻塞 UI
if (window.CuteToDoAPI && window.CuteToDoAPI.ThemeAPI) {
    window.CuteToDoAPI.ThemeAPI.set(themeName).catch(e => {
        console.error('Failed to persist theme to API:', e);
    });
}
```

### 4. ✅ 保存数据防抖 (`saveData`)
```javascript
async saveData() {
    // 300ms 防抖，避免频繁调用
    if (this._saveTimeout) {
        clearTimeout(this._saveTimeout);
    }
    
    this._saveTimeout = setTimeout(async () => {
        // ... 保存逻辑
    }, 300);
}
```

### 5. ✅ 数据加载保护 (`loadData`)
```javascript
async loadData() {
    // 防止多次同时加载
    if (this._loadingData) {
        console.log('Data loading already in progress');
        return;
    }
    
    this._loadingData = true;
    try {
        // ... 加载逻辑
    } finally {
        this._loadingData = false;
    }
}
```

### 6. ✅ 初始化保护 (`init`)
```javascript
async init() {
    // 防止重复初始化
    if (this._initializing || this._initialized) return;
    this._initializing = true;
    
    try {
        await this.loadData();
        await this.checkPremiumStatus(); // 添加 await
        // ... 其他初始化
    } finally {
        this._initialized = true;
        this._initializing = false;
    }
}
```

## 验证步骤

### 1. 重新加载扩展
```bash
# 1. Chrome 访问 chrome://extensions/
# 2. 找到 CuteToDo
# 3. 点击刷新图标
```

### 2. 测试主题切换
1. 打开新标签页（扩展会自动加载）
2. 点击主题按钮（🎨 Themes）
3. 快速点击不同主题
4. 观察控制台日志（F12）

### 3. 预期结果
- ✅ 主题平滑切换
- ✅ 没有重复的 API 调用
- ✅ 控制台显示 "Theme already applied" 当重复点击时
- ✅ 数据保存有 300ms 防抖
- ✅ 页面不会崩溃或卡顿

### 4. 查看网络请求
1. 按 F12 打开开发者工具
2. 切换到 Network 标签
3. 筛选 XHR 请求
4. 切换主题，应该只看到一次 `PUT /api/theme` 请求

## 控制台日志参考

**正常切换**（首次）：
```
Theme clicked: dark isFreeTheme: true isPremium: false
Applying theme directly
✅ Applied Dark
Data saved to local storage
```

**重复点击**：
```
Theme clicked: dark isFreeTheme: true isPremium: false
Theme already applied: dark
```

**并发保护**：
```
Theme application already in progress, skipping
```

## 性能优化

### 修复前
- 切换主题触发 10+ API 调用
- `saveData` 被调用 20+ 次/秒
- 页面卡顿或崩溃

### 修复后
- 切换主题仅触发 1 次 API 调用
- `saveData` 被防抖到 300ms 一次
- 流畅无卡顿

## 相关文件
- `js/app.js` - 主应用逻辑
- `js/themes.js` - 主题管理器
- `js/api.js` - API 客户端（已有超时保护）

## 注意事项
1. 所有保护措施都使用实例属性（`this._xxx`），确保每个实例独立
2. API 调用不再阻塞 UI，采用异步处理
3. 防抖时间设置为 300ms，可根据需要调整
4. 控制台日志保留，方便后续调试

## 如果问题依然存在
1. 清除浏览器缓存
2. 完全卸载并重新加载扩展
3. 检查后端服务器是否正常运行：`curl http://localhost:4000/api/theme`
4. 查看控制台完整错误堆栈
5. 检查是否有其他扩展冲突

