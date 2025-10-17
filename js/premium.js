// 高级功能管理器

class PremiumManager {
    constructor() {
        this.isPremium = false;
        this.subscriptionStatus = 'free';
        this.premiumFeatures = {
            themeSwitch: true  // 主题切换功能免费提供给所有用户
        };
        
        this.pricingPlans = {}; // 移除订阅计划
        this.virtualGoods = {}; // 移除虚拟商品
        
        this.init();
    }

    init() {
        this.loadPremiumData();
        this.setupEventListeners();
        this.updatePremiumUI();
    }

    setupEventListeners() {
        // 主题相关事件监听可以在这里添加
    }

    // 检查高级功能权限
    hasFeature(feature) {
        if (!this.premiumFeatures.hasOwnProperty(feature)) {
            console.warn(`Unknown premium feature: ${feature}`);
            return false;
        }
        
        return this.premiumFeatures[feature] || this.isPremium;
    }

    // 启用高级功能
    enableFeature(feature) {
        this.premiumFeatures[feature] = true;
        this.savePremiumData();
        this.updatePremiumUI();
        this.dispatchFeatureChangeEvent(feature, true);
    }

    // 禁用高级功能
    disableFeature(feature) {
        this.premiumFeatures[feature] = false;
        this.savePremiumData();
        this.updatePremiumUI();
        this.dispatchFeatureChangeEvent(feature, false);
    }

    // 显示主题切换说明
    showThemeInfo() {
        const modal = document.createElement('div');
        modal.className = 'modal premium-modal active';
        modal.innerHTML = `
            <div class="modal-content premium-modal-content">
                <div class="modal-header">
                    <h3>🎨 主题切换</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="theme-info">
                        <h4>主题切换功能：</h4>
                        <p>使用右上角的主题切换按钮，可以在浅色和深色主题之间切换。</p>
                        <ul class="benefits-list">
                            <li>🌞 浅色主题 - 适合白天使用</li>
                            <li>🌙 深色主题 - 保护夜间视力</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // 更新高级功能UI
    updatePremiumUI() {
        // 更新按钮状态
        const premiumBtn = document.getElementById('premiumBtn');
        if (premiumBtn) {
            premiumBtn.innerHTML = '<span class="btn-icon">🎨</span><span class="premium-text">主题</span>';
        }
    }

    // 保存高级功能数据
    savePremiumData() {
        const data = {
            isPremium: this.isPremium,
            subscriptionStatus: this.subscriptionStatus,
            premiumFeatures: this.premiumFeatures,
            selectedPlan: this.selectedPlan
        };
        
        try {
            chrome.storage.local.set({ premiumData: data });
        } catch (error) {
            console.error('Failed to save premium data:', error);
        }
    }

    // 加载高级功能数据
    loadPremiumData() {
        try {
            chrome.storage.local.get(['premiumData'], (result) => {
                if (result.premiumData) {
                    const data = result.premiumData;
                    this.isPremium = data.isPremium || false;
                    this.subscriptionStatus = data.subscriptionStatus || 'free';
                    this.premiumFeatures = { ...this.premiumFeatures, ...data.premiumFeatures };
                    this.selectedPlan = data.selectedPlan;
                }
            });
        } catch (error) {
            console.error('Failed to load premium data:', error);
        }
    }

    // 触发功能变化事件
    dispatchFeatureChangeEvent(feature, enabled) {
        const event = new CustomEvent('premiumFeatureChanged', {
            detail: { feature, enabled }
        });
        document.dispatchEvent(event);
    }

    // 触发升级事件
    dispatchUpgradeEvent() {
        const event = new CustomEvent('premiumUpgraded', {
            detail: { isPremium: this.isPremium }
        });
        document.dispatchEvent(event);
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
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
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

    // 显示服务条款
    showTerms() {
        alert('服务条款页面开发中...');
    }

    // 显示隐私政策
    showPrivacy() {
        alert('隐私政策页面开发中...');
    }
}

// 创建全局高级功能管理器实例
const premiumManager = new PremiumManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 高级功能管理器已经在构造函数中初始化
});

// 导出供其他模块使用
window.premiumManager = premiumManager;
