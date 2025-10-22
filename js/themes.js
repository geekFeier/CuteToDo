// 主题管理器

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.availableThemes = {
            light: {
                name: '经典版',
                description: '清爽简洁的默认主题',
                preview: '#f8fafc',
                free: true
            },
            dark: {
                name: '暗夜版',
                description: '护眼的深色主题',
                preview: '#0f172a',
                free: true
            },
            cute: {
                name: '可爱版',
                description: '萌萌的粉色系主题，少女心满满',
                preview: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
                premium: true,
                price: 19.9
            },
            star: {
                name: '明星版',
                description: '璀璨的金色系主题，奢华大气',
                preview: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                premium: true,
                price: 29.9
            },
            cool: {
                name: '酷酷版',
                description: '炫酷的霓虹主题，科技感十足',
                preview: 'linear-gradient(135deg, #00ff88, #0088ff)',
                premium: true,
                price: 24.9
            }
        };
        
        this.userThemes = {}; // 用户自定义主题
        this.purchasedThemes = new Set(['light', 'dark']); // 默认拥有的主题
        this.init();
    }

    init() {
        this.loadThemeData();
        this.setupEventListeners();
        this.applyCurrentTheme();
    }

    setupEventListeners() {
        // 主题切换按钮
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleLightDark();
            });
        }

        // 商店主题购买
        document.addEventListener('click', (e) => {
            if (e.target.closest('.shop-item')) {
                const shopItem = e.target.closest('.shop-item');
                const themeName = this.getThemeNameFromShopItem(shopItem);
                if (themeName) {
                    this.purchaseTheme(themeName);
                }
            }
        });
    }

    // 切换浅色/暗色主题
    toggleLightDark() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveThemeData();
        
        // 播放切换音效
        this.playThemeSwitchSound();
        
        // 动画效果
        if (window.animationManager) {
            window.animationManager.animateThemeTransition();
        }
    }

    // 应用指定主题
    async applyTheme(themeName) {
        // Prevent recursive calls
        if (this._applyingTheme) {
            console.log('ThemeManager: Theme application already in progress, skipping');
            return;
        }
        
        if (!this.availableThemes[themeName] && !this.userThemes[themeName]) {
            console.warn(`Theme ${themeName} not found`);
            return;
        }

        // If theme is already applied, skip
        if (this.currentTheme === themeName) {
            console.log('ThemeManager: Theme already applied:', themeName);
            return;
        }

        this._applyingTheme = true;
        try {
            this.currentTheme = themeName;
            
            // 移除所有主题类
            document.body.className = document.body.className.replace(/theme-\w+/g, '');
            
            // 添加新主题类
            document.body.classList.add(`theme-${themeName}`);
            
            // 更新主题切换器状态
            this.updateThemeToggle();
            
            // 保存主题数据
            this.saveThemeData();
            
            // Persist to API (don't await to avoid blocking)
            if (window.CuteToDoAPI && window.CuteToDoAPI.ThemeAPI) {
                window.CuteToDoAPI.ThemeAPI.set(themeName).catch(e => {
                    console.error('Failed to persist theme via API:', e);
                });
            }
            
            // 触发主题变化事件
            this.dispatchThemeChangeEvent(themeName);
        } finally {
            this._applyingTheme = false;
        }
    }

    // 应用当前主题
    applyCurrentTheme() {
        this.applyTheme(this.currentTheme);
    }

    // 更新主题切换器显示
    updateThemeToggle() {
        const toggleSlider = document.querySelector('.toggle-slider');
        if (toggleSlider) {
            if (this.currentTheme === 'dark') {
                toggleSlider.style.transform = 'translateX(30px)';
                toggleSlider.style.background = 'var(--accent-secondary)';
            } else {
                toggleSlider.style.transform = 'translateX(0)';
                toggleSlider.style.background = 'var(--accent-primary)';
            }
        }
    }

    // 购买主题
    purchaseTheme(themeName) {
        if (!this.availableThemes[themeName]) {
            console.warn(`Theme ${themeName} not found`);
            return;
        }

        const theme = this.availableThemes[themeName];
        
        // 检查是否已经拥有
        if (this.purchasedThemes.has(themeName)) {
            this.showMessage(`您已经拥有 ${theme.name}`, 'info');
            return;
        }

        // 检查是否为高级主题
        if (theme.premium && !this.isPremiumUser()) {
            this.showPremiumRequired();
            return;
        }

        // 模拟购买流程
        this.showPurchaseDialog(themeName, theme);
    }

    // 显示购买对话框
    showPurchaseDialog(themeName, theme) {
        const price = this.getThemePrice(themeName);
        
        if (confirm(`确定要购买 ${theme.name} 吗？\n价格：${price}`)) {
            this.completePurchase(themeName);
        }
    }

    // 完成购买
    completePurchase(themeName) {
        this.purchasedThemes.add(themeName);
        this.saveThemeData();
        
        // 显示购买成功消息
        this.showMessage(`🎉 恭喜！您已成功购买 ${this.availableThemes[themeName].name}`, 'success');
        
        // 自动应用新主题
        this.applyTheme(themeName);
        
        // 更新商店显示
        this.updateShopDisplay();
    }

    // 获取主题价格
    getThemePrice(themeName) {
        const prices = {
            neon: '💰 100 钻石',
            gradient: '💰 75 钻石',
            ocean: '💰 80 钻石',
            forest: '💰 70 钻石',
            sunset: '💰 90 钻石',
            space: '💰 120 钻石',
            cherry: '💰 85 钻石',
            gaming: '💰 110 钻石'
        };
        
        return prices[themeName] || '💰 50 钻石';
    }

    // 检查是否为高级用户
    isPremiumUser() {
        // 这里应该检查实际的用户状态
        return window.app ? window.app.isPremium : false;
    }

    // 显示高级功能提示
    showPremiumRequired() {
        if (window.app) {
            window.app.showPremiumFeatures();
        } else {
            alert('此主题需要升级到高级版才能使用！');
        }
    }

    // 创建自定义主题
    createCustomTheme(name, colors) {
        const themeId = `custom_${Date.now()}`;
        
        this.userThemes[themeId] = {
            name: name,
            description: '自定义主题',
            preview: colors.primary,
            custom: true,
            colors: colors
        };
        
        this.saveThemeData();
        return themeId;
    }

    // 删除自定义主题
    deleteCustomTheme(themeId) {
        if (this.userThemes[themeId]) {
            delete this.userThemes[themeId];
            this.saveThemeData();
            
            // 如果当前使用的是被删除的主题，切换到默认主题
            if (this.currentTheme === themeId) {
                this.applyTheme('light');
            }
        }
    }

    // 获取所有可用主题
    getAllThemes() {
        return { ...this.availableThemes, ...this.userThemes };
    }

    // 获取已购买的主题
    getPurchasedThemes() {
        return Array.from(this.purchasedThemes);
    }

    // 更新商店显示
    updateShopDisplay() {
        const shopItems = document.querySelectorAll('.shop-item');
        shopItems.forEach(item => {
            const themeName = this.getThemeNameFromShopItem(item);
            if (themeName) {
                const isPurchased = this.purchasedThemes.has(themeName);
                const priceElement = item.querySelector('.item-price');
                
                if (isPurchased) {
                    priceElement.textContent = '✅ 已拥有';
                    priceElement.style.color = 'var(--accent-success)';
                    item.style.opacity = '0.7';
                } else {
                    priceElement.textContent = this.getThemePrice(themeName);
                    priceElement.style.color = 'var(--accent-primary)';
                    item.style.opacity = '1';
                }
            }
        });
    }

    // 从商店项目获取主题名称
    getThemeNameFromShopItem(shopItem) {
        const title = shopItem.querySelector('h4');
        if (!title) return null;
        
        const titleText = title.textContent.toLowerCase();
        
        // 映射标题到主题名称
        const titleMap = {
            '暗黑主题': 'dark',
            '霓虹主题': 'neon',
            '渐变主题': 'gradient',
            '海洋主题': 'ocean',
            '森林主题': 'forest',
            '日落主题': 'sunset',
            '太空主题': 'space',
            '樱花主题': 'cherry',
            '游戏主题': 'gaming'
        };
        
        return titleMap[titleText] || null;
    }

    // 预览主题
    previewTheme(themeName) {
        const preview = document.createElement('div');
        preview.className = 'theme-preview-overlay';
        preview.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        
        const previewContent = document.createElement('div');
        previewContent.className = 'theme-preview-content';
        previewContent.style.cssText = `
            background: var(--bg-secondary);
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            max-height: 400px;
            overflow: auto;
            border: 2px solid var(--accent-primary);
        `;
        
        previewContent.innerHTML = `
            <h3>${this.availableThemes[themeName]?.name || themeName}</h3>
            <p>${this.availableThemes[themeName]?.description || ''}</p>
            <div style="margin: 20px 0;">
                <button onclick="themeManager.applyTheme('${themeName}')" 
                        style="background: var(--accent-primary); color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-right: 10px;">
                    应用主题
                </button>
                <button onclick="themeManager.closePreview()" 
                        style="background: var(--bg-tertiary); color: var(--text-primary); border: 1px solid var(--border-color); padding: 10px 20px; border-radius: 8px;">
                    关闭预览
                </button>
            </div>
        `;
        
        // 临时应用主题进行预览
        const originalTheme = this.currentTheme;
        this.applyTheme(themeName);
        
        preview.appendChild(previewContent);
        document.body.appendChild(preview);
        
        preview.addEventListener('click', (e) => {
            if (e.target === preview) {
                this.closePreview();
                this.applyTheme(originalTheme);
            }
        });
        
        this.currentPreview = preview;
    }

    // 关闭预览
    closePreview() {
        if (this.currentPreview) {
            this.currentPreview.remove();
            this.currentPreview = null;
        }
    }

    // 保存主题数据
    saveThemeData() {
        const data = {
            currentTheme: this.currentTheme,
            purchasedThemes: Array.from(this.purchasedThemes),
            userThemes: this.userThemes
        };
        
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ themeData: data });
            } else {
                // Fallback to localStorage for web browser environment
                localStorage.setItem('themeData', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Failed to save theme data:', error);
        }
    }

    // 加载主题数据
    loadThemeData() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(['themeData'], (result) => {
                    if (result.themeData) {
                        const data = result.themeData;
                        this.currentTheme = data.currentTheme || 'light';
                        this.purchasedThemes = new Set(data.purchasedThemes || ['light', 'dark']);
                        this.userThemes = data.userThemes || {};
                    }
                });
            } else {
                // Fallback to localStorage for web browser environment
                const storedData = localStorage.getItem('themeData');
                if (storedData) {
                    const data = JSON.parse(storedData);
                    this.currentTheme = data.currentTheme || 'light';
                    this.purchasedThemes = new Set(data.purchasedThemes || ['light', 'dark']);
                    this.userThemes = data.userThemes || {};
                }
            }
        } catch (error) {
            console.error('Failed to load theme data:', error);
        }
    }

    // 触发主题变化事件
    dispatchThemeChangeEvent(themeName) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                themeName: themeName,
                theme: this.availableThemes[themeName] || this.userThemes[themeName]
            }
        });
        document.dispatchEvent(event);
    }

    // 播放主题切换音效
    playThemeSwitchSound() {
        // 这里可以添加音效播放逻辑
        console.log('Theme switch sound');
    }

    // 显示消息
    showMessage(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // 导出主题配置
    exportTheme(themeName) {
        const theme = this.userThemes[themeName] || this.availableThemes[themeName];
        if (!theme) return null;
        
        const config = {
            name: theme.name,
            description: theme.description,
            colors: theme.colors,
            custom: theme.custom || false
        };
        
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${theme.name}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // 导入主题配置
    importTheme(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const config = JSON.parse(e.target.result);
                const themeId = this.createCustomTheme(config.name, config.colors);
                this.showMessage(`主题 "${config.name}" 导入成功！`, 'success');
            } catch (error) {
                this.showMessage('主题文件格式错误', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// 创建全局主题管理器实例
const themeManager = new ThemeManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 主题管理器已经在构造函数中初始化
});

// 导出供其他模块使用
window.themeManager = themeManager;
