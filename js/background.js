// CuteToDo - 后台服务脚本

class BackgroundService {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeData();
        this.startPeriodicTasks();
    }

    setupEventListeners() {
        // 扩展程序安装/更新
        chrome.runtime.onInstalled.addListener((details) => {
            this.handleInstall(details);
        });

        // 扩展程序启动
        chrome.runtime.onStartup.addListener(() => {
            this.handleStartup();
        });

        // 来自内容脚本或弹出页面的消息
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.handleMessage(message, sender, sendResponse);
            return true; // 保持消息通道开放
        });

        // 标签页更新
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            this.handleTabUpdate(tabId, changeInfo, tab);
        });

        // 存储变化
        chrome.storage.onChanged.addListener((changes, namespace) => {
            this.handleStorageChange(changes, namespace);
        });
    }

    handleInstall(details) {
        if (details.reason === 'install') {
            // 首次安装
            this.firstInstall();
        } else if (details.reason === 'update') {
            // 更新
            this.handleUpdate(details.previousVersion);
        }
    }

    firstInstall() {
        console.log('CuteToDo 首次安装');
        
        // 初始化默认数据
        this.initializeDefaultData();
        
        // 设置欢迎通知
        this.scheduleNotification('欢迎使用 CuteToDo！', '开始管理您的任务，提高工作效率！');
        
        // 打开欢迎页面
        chrome.tabs.create({
            url: chrome.runtime.getURL('index.html')
        });
    }

    handleUpdate(previousVersion) {
        console.log(`CuteToDo 从版本 ${previousVersion} 更新`);
        
        // 执行数据迁移
        this.migrateData(previousVersion);
        
        // 显示更新通知
        this.scheduleNotification('CuteToDo 已更新！', '新功能已准备就绪！');
    }

    handleStartup() {
        console.log('CuteToDo 启动');
        
        // 恢复后台任务
        this.resumePeriodicTasks();
        
        // 检查数据同步
        this.checkDataSync();
    }

    async handleMessage(message, sender, sendResponse) {
        try {
            switch (message.action) {
                case 'saveData':
                    await this.saveUserData(message.data);
                    sendResponse({ success: true });
                    break;
                    
                case 'loadData':
                    const data = await this.loadUserData();
                    sendResponse({ success: true, data });
                    break;
                    
                case 'syncData':
                    await this.syncUserData();
                    sendResponse({ success: true });
                    break;
                    
                case 'checkPremium':
                    const isPremium = await this.checkPremiumStatus();
                    sendResponse({ success: true, isPremium });
                    break;
                    
                case 'scheduleReminder':
                    await this.scheduleTaskReminder(message.taskId, message.reminderTime);
                    sendResponse({ success: true });
                    break;
                    
                case 'cancelReminder':
                    await this.cancelTaskReminder(message.taskId);
                    sendResponse({ success: true });
                    break;
                    
                case 'getWeather':
                    const weather = await this.getWeatherData();
                    sendResponse({ success: true, weather });
                    break;
                    
                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('Background message handler error:', error);
            sendResponse({ success: false, error: error.message });
        }
    }

    handleTabUpdate(tabId, changeInfo, tab) {
        // 如果用户访问新标签页，可以在这里添加逻辑
        if (changeInfo.status === 'complete' && tab.url === 'chrome://newtab/') {
            // 可以在这里注入内容脚本或执行其他操作
        }
    }

    handleStorageChange(changes, namespace) {
        if (namespace === 'local') {
            // 处理本地存储变化
            if (changes.taskflowData) {
                this.handleDataChange(changes.taskflowData);
            }
            
            if (changes.premiumData) {
                this.handlePremiumChange(changes.premiumData);
            }
        }
    }

    // 数据管理
    async initializeDefaultData() {
        const defaultData = {
            tasks: [],
            currentTheme: 'light',
            userStats: {
                crystals: 0,
                energy: 100,
                streak: 0,
                completedToday: 0
            },
            isPremium: false,
            settings: {
                autoSave: true,
                taskReminder: true,
                animations: true,
                soundEffects: false
            }
        };

        try {
            await chrome.storage.local.set({ taskflowData: defaultData });
            console.log('Default data initialized');
        } catch (error) {
            console.error('Failed to initialize default data:', error);
        }
    }

    async saveUserData(data) {
        try {
            await chrome.storage.local.set({ taskflowData: data });
            
            // 如果启用了云同步，同步到云端
            if (data.settings?.cloudSync) {
                await this.syncToCloud(data);
            }
        } catch (error) {
            console.error('Failed to save user data:', error);
            throw error;
        }
    }

    async loadUserData() {
        try {
            const result = await chrome.storage.local.get(['taskflowData']);
            return result.taskflowData || null;
        } catch (error) {
            console.error('Failed to load user data:', error);
            return null;
        }
    }

    async syncUserData() {
        try {
            // 从云端同步数据
            const cloudData = await this.syncFromCloud();
            if (cloudData) {
                await chrome.storage.local.set({ taskflowData: cloudData });
            }
            
            // 同步到云端
            const localData = await this.loadUserData();
            if (localData) {
                await this.syncToCloud(localData);
            }
            
            console.log('Data sync completed');
        } catch (error) {
            console.error('Data sync failed:', error);
            throw error;
        }
    }

    async syncToCloud(data) {
        // 模拟云同步
        console.log('Syncing to cloud:', data);
        
        // 这里应该实现真实的云同步逻辑
        // 例如：发送到服务器、使用 Google Drive API 等
        
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Cloud sync completed');
                resolve(true);
            }, 1000);
        });
    }

    async syncFromCloud() {
        // 模拟从云端同步
        console.log('Syncing from cloud');
        
        // 这里应该实现真实的云同步逻辑
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, 1000);
        });
    }

    // 高级功能管理
    async checkPremiumStatus() {
        try {
            const result = await chrome.storage.local.get(['premiumData']);
            const premiumData = result.premiumData;
            return premiumData?.isPremium || false;
        } catch (error) {
            console.error('Failed to check premium status:', error);
            return false;
        }
    }

    // 提醒功能
    async scheduleTaskReminder(taskId, reminderTime) {
        const alarmName = `task_reminder_${taskId}`;
        
        try {
            await chrome.alarms.create(alarmName, {
                when: reminderTime,
                message: `任务提醒：${taskId}`
            });
            
            console.log(`Task reminder scheduled for ${new Date(reminderTime)}`);
        } catch (error) {
            console.error('Failed to schedule reminder:', error);
            throw error;
        }
    }

    async cancelTaskReminder(taskId) {
        const alarmName = `task_reminder_${taskId}`;
        
        try {
            await chrome.alarms.clear(alarmName);
            console.log(`Task reminder cancelled for ${taskId}`);
        } catch (error) {
            console.error('Failed to cancel reminder:', error);
            throw error;
        }
    }

    // 天气数据
    async getWeatherData() {
        // 模拟天气数据获取
        const weatherData = {
            temperature: Math.floor(Math.random() * 15) + 15,
            condition: ['sunny', 'cloudy', 'rainy', 'snowy'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5
        };
        
        return weatherData;
    }

    // 通知功能
    scheduleNotification(title, message) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'img/icon-48.png',
            title: title,
            message: message
        });
    }

    // 周期性任务
    startPeriodicTasks() {
        // 每日重置任务
        chrome.alarms.create('dailyReset', {
            when: this.getNextMidnight(),
            periodInMinutes: 24 * 60
        });

        // 数据备份
        chrome.alarms.create('dataBackup', {
            when: Date.now() + 60 * 60 * 1000, // 1小时后
            periodInMinutes: 24 * 60 // 每24小时
        });

        // 监听闹钟
        chrome.alarms.onAlarm.addListener((alarm) => {
            this.handleAlarm(alarm);
        });
    }

    resumePeriodicTasks() {
        // 恢复周期性任务（如果需要）
        console.log('Resuming periodic tasks');
    }

    handleAlarm(alarm) {
        switch (alarm.name) {
            case 'dailyReset':
                this.performDailyReset();
                break;
            case 'dataBackup':
                this.performDataBackup();
                break;
            default:
                if (alarm.name.startsWith('task_reminder_')) {
                    this.handleTaskReminder(alarm);
                }
        }
    }

    async performDailyReset() {
        try {
            const data = await this.loadUserData();
            if (data) {
                // 重置每日统计
                data.userStats.completedToday = 0;
                data.userStats.energy = Math.min(100, data.userStats.energy + 20);
                
                // 更新连续天数
                if (data.userStats.completedToday > 0) {
                    data.userStats.streak++;
                } else {
                    data.userStats.streak = 0;
                }
                
                await this.saveUserData(data);
                
                // 发送通知
                this.scheduleNotification('新的一天开始了！', '继续保持高效工作！');
            }
        } catch (error) {
            console.error('Daily reset failed:', error);
        }
    }

    async performDataBackup() {
        try {
            const data = await this.loadUserData();
            if (data) {
                // 创建备份
                const backupKey = `backup_${Date.now()}`;
                await chrome.storage.local.set({ [backupKey]: data });
                
                console.log('Data backup completed');
            }
        } catch (error) {
            console.error('Data backup failed:', error);
        }
    }

    handleTaskReminder(alarm) {
        const taskId = alarm.name.replace('task_reminder_', '');
        
        // 显示提醒通知
        this.scheduleNotification('任务提醒', `您有一个任务需要完成！`);
        
        // 播放提示音（如果启用）
        // 这里可以添加音效播放逻辑
    }

    // 工具方法
    getNextMidnight() {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime();
    }

    checkDataSync() {
        // 检查是否需要数据同步
        console.log('Checking data sync status');
    }

    handleDataChange(changes) {
        console.log('Data changed:', changes);
    }

    handlePremiumChange(changes) {
        console.log('Premium status changed:', changes);
    }

    migrateData(previousVersion) {
        console.log(`Migrating data from version ${previousVersion}`);
        
        // 这里可以实现版本间的数据迁移逻辑
        // 例如：转换旧格式到新格式、添加新的默认值等
    }
}

// 初始化后台服务
const backgroundService = new BackgroundService();
