// 会员管理器

class PremiumManager {
    constructor() {
        this.isPremium = false;
        this.membershipType = 'free'; // free, premium
        this.membershipExpiry = null; // 会员到期时间
        
        // 会员价格
        this.membershipPlans = {
            lifetime: {
                name: '终身会员',
                price: 9.9,
                duration: null, // 永久
                icon: '👑',
                badge: '一次购买 永久使用'
            }
        };
        
        this.init();
    }

    init() {
        this.loadPremiumData();
        this.setupEventListeners();
        this.updatePremiumUI();
        this.checkMembershipExpiry();
    }

    setupEventListeners() {
        // 会员升级按钮
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.showMembershipModal());
        }
        
        // 头部会员按钮
        const premiumBtn = document.getElementById('premiumBtn');
        if (premiumBtn) {
            premiumBtn.addEventListener('click', () => {
                const shopModal = document.getElementById('shopModal');
                if (shopModal) {
                    shopModal.classList.add('active');
                }
            });
        }
    }

    // 检查会员状态
    checkMembershipExpiry() {
        // 终身会员无需检查到期
        if (this.isPremium && this.membershipType === 'lifetime') {
            return;
        }
        
        if (this.isPremium && this.membershipExpiry) {
            const now = new Date().getTime();
            if (now > this.membershipExpiry) {
                // 会员已过期（理论上不会发生，因为只有终身会员）
                this.isPremium = false;
                this.membershipType = 'free';
        this.savePremiumData();
        this.updatePremiumUI();
                this.showMessage('您的会员已到期，请续费以继续使用所有主题', 'warning');
            }
        }
    }

    // 检查是否为会员
    isPremiumMember() {
        this.checkMembershipExpiry();
        return this.isPremium;
    }

    // 显示会员升级弹窗
    showMembershipModal() {
        // 如果已经是会员，显示会员信息
        if (this.isPremium) {
            this.showMembershipInfo();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal premium-modal active';
        modal.innerHTML = `
            <div class="modal-content premium-modal-content">
                <div class="modal-header">
                    <h3>👑 开通终身会员</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="membership-content">
                        <div class="membership-info">
                            <h4>✨ 终身会员特权</h4>
                        <ul class="benefits-list">
                                <li>🎨 解锁所有主题（50+精美主题）</li>
                                <li>🐰 可爱版主题包（8款萌系主题）</li>
                                <li>🔥 暗黑版主题包（12款炫酷主题）</li>
                                <li>⭐ 明星版主题包（12款明星主题）</li>
                                <li>🎁 后续新主题永久免费</li>
                                <li>👑 专属会员标识</li>
                                <li>💎 一次购买，永久使用</li>
                        </ul>
                        </div>
                        
                        <div class="membership-plans">
                            ${this.renderMembershipPlans()}
                        </div>
                    </div>
                    
                    <div class="membership-notice">
                        <p>💡 升级说明：购买终身会员后，所有主题永久解锁，无需续费</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加购买按钮事件
        modal.querySelectorAll('.buy-membership-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const planType = e.target.dataset.plan;
                this.purchaseMembership(planType);
            });
        });
    }

    // 渲染会员套餐
    renderMembershipPlans() {
        return Object.entries(this.membershipPlans).map(([type, plan]) => `
            <div class="membership-plan ${type === 'lifetime' ? 'recommended' : ''}">
                ${plan.badge ? `<div class="plan-badge">${plan.badge}</div>` : ''}
                <div class="plan-icon">${plan.icon}</div>
                <h4>${plan.name}</h4>
                <div class="plan-price">
                    <span class="price">$${plan.price}</span>
                    ${plan.duration ? `<span class="duration">/ ${plan.duration}天</span>` : '<span class="duration">永久有效</span>'}
                </div>
                <button class="buy-membership-btn" data-plan="${type}">
                    ${this.membershipType === type && this.isPremium ? '当前套餐' : '立即购买'}
                </button>
            </div>
        `).join('');
    }

    // 购买会员
    purchaseMembership(planType) {
        const plan = this.membershipPlans[planType];
        if (!plan) return;

        if (confirm(`确认购买 ${plan.name} ($${plan.price})？\n\n这是演示版本，点击确认后将自动激活会员。`)) {
            // 设置会员状态
            this.isPremium = true;
            this.membershipType = planType;
            
            // 设置到期时间
            if (plan.duration) {
                const now = new Date();
                this.membershipExpiry = now.getTime() + (plan.duration * 24 * 60 * 60 * 1000);
            } else {
                this.membershipExpiry = null; // 终身会员
            }
            
            this.savePremiumData();
            this.updatePremiumUI();
            
            // 关闭弹窗
            document.querySelectorAll('.premium-modal').forEach(m => m.remove());
            
            this.showMessage(`🎉 恭喜！${plan.name}已激活，所有主题已解锁`, 'success');
            
            // 触发升级事件
            this.dispatchUpgradeEvent();
            
            // 刷新主题卡片状态
            if (window.app && window.app.updateThemeCards) {
                window.app.updateThemeCards();
            }
        }
    }

    // 更新会员UI
    updatePremiumUI() {
        // 更新会员按钮状态
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            if (this.isPremium) {
                upgradeBtn.innerHTML = `
                    <span class="btn-icon">👑</span>
                    <span class="premium-text">终身会员</span>
                `;
                upgradeBtn.classList.add('is-premium');
                upgradeBtn.title = '已开通终身会员';
            } else {
                upgradeBtn.innerHTML = `
                    <span class="btn-icon">👑</span>
                    <span class="premium-text">升级会员</span>
                `;
                upgradeBtn.classList.remove('is-premium');
                upgradeBtn.title = '升级至终身会员，解锁所有主题';
            }
        }
        
        // 更新主题按钮
        const premiumBtn = document.getElementById('premiumBtn');
        if (premiumBtn) {
            premiumBtn.innerHTML = '<span class="btn-icon">🎨</span><span class="premium-text">主题</span>';
        }
    }

    // 获取会员名称
    getMembershipName() {
        if (!this.isPremium) return '免费用户';
        
        return '终身会员';
    }
    
    // 获取会员剩余天数（终身会员返回null）
    getRemainingDays() {
        // 终身会员无到期时间
        if (this.isPremium && this.membershipType === 'lifetime') {
            return null;
        }
        
        if (!this.isPremium || !this.membershipExpiry) return null;
        
        const now = new Date().getTime();
        const remaining = this.membershipExpiry - now;
        return Math.ceil(remaining / (24 * 60 * 60 * 1000));
    }

    // 保存会员数据
    savePremiumData() {
        const data = {
            isPremium: this.isPremium,
            membershipType: this.membershipType,
            membershipExpiry: this.membershipExpiry
        };
        
        try {
            chrome.storage.local.set({ premiumData: data });
        } catch (error) {
            // 如果不是浏览器扩展环境，使用 localStorage
            localStorage.setItem('premiumData', JSON.stringify(data));
        }
    }

    // 加载会员数据
    loadPremiumData() {
        try {
            chrome.storage.local.get(['premiumData'], (result) => {
                if (result.premiumData) {
                    const data = result.premiumData;
                    this.isPremium = data.isPremium || false;
                    this.membershipType = data.membershipType || 'free';
                    this.membershipExpiry = data.membershipExpiry || null;
                    this.updatePremiumUI();
                }
            });
        } catch (error) {
            // 如果不是浏览器扩展环境，使用 localStorage
            const data = localStorage.getItem('premiumData');
            if (data) {
                const parsed = JSON.parse(data);
                this.isPremium = parsed.isPremium || false;
                this.membershipType = parsed.membershipType || 'free';
                this.membershipExpiry = parsed.membershipExpiry || null;
                this.updatePremiumUI();
            }
        }
    }

    // 触发升级事件
    dispatchUpgradeEvent() {
        const event = new CustomEvent('premiumUpgraded', {
            detail: { 
                isPremium: this.isPremium,
                membershipType: this.membershipType
            }
        });
        document.dispatchEvent(event);
    }
    
    // 测试用：激活会员
    activatePremiumForTesting() {
        this.isPremium = true;
        this.membershipType = 'lifetime';
        this.membershipExpiry = null;
        this.savePremiumData();
        this.updatePremiumUI();
        this.showMessage('✅ 会员已激活（测试模式）', 'success');
    }
    
    // 测试用：取消会员
    deactivatePremiumForTesting() {
        this.isPremium = false;
        this.membershipType = 'free';
        this.membershipExpiry = null;
        this.savePremiumData();
        this.updatePremiumUI();
        this.showMessage('❌ 会员已取消（测试模式）', 'info');
        
        // 刷新主题卡片状态
        if (window.app && window.app.updateThemeCards) {
            window.app.updateThemeCards();
        }
    }
    
    // 显示会员信息（已开通会员时）
    showMembershipInfo() {
        const modal = document.createElement('div');
        modal.className = 'modal premium-modal active';
        modal.innerHTML = `
            <div class="modal-content premium-modal-content">
                <div class="modal-header">
                    <h3>👑 终身会员</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="membership-status">
                        <div class="status-icon">👑</div>
                        <h4>您已是终身会员</h4>
                        <p class="status-desc">感谢您的支持！您可以永久使用所有主题功能</p>
                    </div>
                    <div class="membership-info">
                        <h5>✨ 您的专属特权</h5>
                        <ul class="benefits-list">
                            <li>🎨 解锁所有主题（50+精美主题）</li>
                            <li>🐰 可爱版主题包（8款萌系主题）</li>
                            <li>🔥 暗黑版主题包（12款炫酷主题）</li>
                            <li>⭐ 明星版主题包（12款明星主题）</li>
                            <li>🎁 后续新主题永久免费</li>
                            <li>👑 专属会员标识</li>
                            <li>💎 永久有效，无需续费</li>
                        </ul>
                    </div>
                    <button class="membership-ok-btn" onclick="this.closest('.modal').remove()">
                        知道了
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
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
