// Premium Manager

class PremiumManager {
    constructor() {
        this.isPremium = false;
        this.membershipType = 'free'; // free, premium
        this.membershipExpiry = null; // Membership expiry time
        
        // Membership pricing
        this.membershipPlans = {
            lifetime: {
                name: 'Lifetime Membership',
                price: 9.9,
                duration: null, // Permanent
                icon: '👑',
                badge: 'One-time purchase, lifetime access'
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
        // Premium upgrade button
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.showMembershipModal());
        }
        
        // Header premium button
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

    // Check membership status
    checkMembershipExpiry() {
        // Lifetime membership doesn't need expiry check
        if (this.isPremium && this.membershipType === 'lifetime') {
            return;
        }
        
        if (this.isPremium && this.membershipExpiry) {
            const now = new Date().getTime();
            if (now > this.membershipExpiry) {
                // Membership expired (theoretically won't happen since only lifetime membership exists)
                this.isPremium = false;
                this.membershipType = 'free';
        this.savePremiumData();
        this.updatePremiumUI();
                this.showMessage('Your membership has expired, please renew to continue using all themes', 'warning');
            }
        }
    }

    // Check if user is premium member
    isPremiumMember() {
        this.checkMembershipExpiry();
        return this.isPremium;
    }

    // Show membership upgrade modal
    showMembershipModal() {
        // If already premium, show membership info
        if (this.isPremium) {
            this.showMembershipInfo();
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal premium-modal active';
        modal.innerHTML = `
            <div class="modal-content premium-modal-content">
                <div class="modal-header">
                    <h3>👑 Activate Lifetime Membership</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="membership-content">
                        <div class="membership-info">
                            <h4>✨ Lifetime Benefits</h4>
                        <ul class="benefits-list">
                                <li>🎨 Unlock all themes (50+ beautiful themes)</li>
                                <li>🎁 All future themes free forever</li>
                                <li>👑 Exclusive member badge</li>
                                <li>💎 One-time purchase, lifetime access</li>
                        </ul>
                        </div>
                        
                        <div class="membership-plans">
                            ${this.renderMembershipPlans()}
                        </div>
                    </div>
                    
                    <div class="membership-notice">
                        <p>💡 Upgrade Note: After purchasing lifetime membership, all themes are permanently unlocked with no recurring fees</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add purchase button events
        modal.querySelectorAll('.buy-membership-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const planType = e.target.dataset.plan;
                this.purchaseMembership(planType);
            });
        });
    }

    // Render membership plans
    renderMembershipPlans() {
        return Object.entries(this.membershipPlans).map(([type, plan]) => `
            <div class="membership-plan ${type === 'lifetime' ? 'recommended' : ''}">
                ${plan.badge ? `<div class="plan-badge">${plan.badge}</div>` : ''}
                <div class="plan-icon">${plan.icon}</div>
                <h4>${plan.name}</h4>
                <div class="plan-price">
                    <span class="price">$${plan.price}</span>
                    ${plan.duration ? `<span class="duration">/ ${plan.duration} days</span>` : '<span class="duration">Lifetime</span>'}
                </div>
                <button class="buy-membership-btn" data-plan="${type}">
                    ${this.membershipType === type && this.isPremium ? 'Current Plan' : 'Purchase Now'}
                </button>
            </div>
        `).join('');
    }

    // Purchase membership
    purchaseMembership(planType) {
        const plan = this.membershipPlans[planType];
        if (!plan) return;

        if (confirm(`Confirm purchase ${plan.name} ($${plan.price})?\n\nThis is a demo version. Click OK to automatically activate membership.`)) {
            // Set membership status
            this.isPremium = true;
            this.membershipType = planType;
            
            // Set expiry time
            if (plan.duration) {
                const now = new Date();
                this.membershipExpiry = now.getTime() + (plan.duration * 24 * 60 * 60 * 1000);
            } else {
                this.membershipExpiry = null; // Lifetime membership
            }
            
            this.savePremiumData();
            this.updatePremiumUI();
            
            // Close modal
            document.querySelectorAll('.premium-modal').forEach(m => m.remove());
            
            this.showMessage(`🎉 Congratulations! ${plan.name} activated, all themes unlocked`, 'success');
            
            // Trigger upgrade event
            this.dispatchUpgradeEvent();
            
            // Refresh theme card status
            if (window.app) {
                // Update premium status in app.js
                window.app.isPremium = this.isPremium;
                window.app.updateThemeCards();
                // If theme modal is open, re-render theme grids
                const shopModal = document.getElementById('shopModal');
                if (shopModal && shopModal.classList.contains('active')) {
                    window.app.renderThemeGrids();
                }
            }
        }
    }

    // Update premium UI
    updatePremiumUI() {
        // Update premium button status
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            if (this.isPremium) {
                upgradeBtn.innerHTML = `
                    <span class="btn-icon">👑</span>
                    <span class="premium-text">Lifetime Member</span>
                `;
                upgradeBtn.classList.add('is-premium');
                upgradeBtn.title = 'Lifetime Membership Activated';
            } else {
                upgradeBtn.innerHTML = `
                    <span class="btn-icon">👑</span>
                    <span class="premium-text">Upgrade</span>
                `;
                upgradeBtn.classList.remove('is-premium');
                upgradeBtn.title = 'Upgrade to Lifetime Membership, unlock all themes';
            }
        }
        
        // Update theme button
        const premiumBtn = document.getElementById('premiumBtn');
        if (premiumBtn) {
            premiumBtn.innerHTML = '<span class="btn-icon">🎨</span><span class="premium-text">Themes</span>';
        }
    }

    // Get membership name
    getMembershipName() {
        if (!this.isPremium) return 'Free User';
        
        return 'Lifetime Member';
    }
    
    // Get remaining membership days (lifetime returns null)
    getRemainingDays() {
        // Lifetime membership has no expiry
        if (this.isPremium && this.membershipType === 'lifetime') {
            return null;
        }
        
        if (!this.isPremium || !this.membershipExpiry) return null;
        
        const now = new Date().getTime();
        const remaining = this.membershipExpiry - now;
        return Math.ceil(remaining / (24 * 60 * 60 * 1000));
    }

    // Save premium data
    savePremiumData() {
        const data = {
            isPremium: this.isPremium,
            membershipType: this.membershipType,
            membershipExpiry: this.membershipExpiry
        };
        
        try {
            chrome.storage.local.set({ premiumData: data });
        } catch (error) {
            // If not in browser extension environment, use localStorage
            localStorage.setItem('premiumData', JSON.stringify(data));
        }
    }

    // Load premium data
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
            // If not in browser extension environment, use localStorage
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

    // Trigger upgrade event
    dispatchUpgradeEvent() {
        const event = new CustomEvent('premiumUpgraded', {
            detail: { 
                isPremium: this.isPremium,
                membershipType: this.membershipType
            }
        });
        document.dispatchEvent(event);
    }
    
    // For testing: activate premium
    activatePremiumForTesting() {
        this.isPremium = true;
        this.membershipType = 'lifetime';
        this.membershipExpiry = null;
        this.savePremiumData();
        this.updatePremiumUI();
        this.showMessage('✅ Premium activated (test mode)', 'success');
    }
    
    // For testing: deactivate premium
    deactivatePremiumForTesting() {
        this.isPremium = false;
        this.membershipType = 'free';
        this.membershipExpiry = null;
        this.savePremiumData();
        this.updatePremiumUI();
        this.showMessage('❌ Premium deactivated (test mode)', 'info');
        
        // Refresh theme card status
        if (window.app && window.app.updateThemeCards) {
            window.app.updateThemeCards();
        }
    }
    
    // Show membership info (when already premium)
    showMembershipInfo() {
        const modal = document.createElement('div');
        modal.className = 'modal premium-modal active';
        modal.innerHTML = `
            <div class="modal-content premium-modal-content">
                <div class="modal-header">
                    <h3>👑 Lifetime Membership</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="membership-status">
                        <div class="status-icon">👑</div>
                        <h4>You are a Lifetime Member</h4>
                        <p class="status-desc">Thank you for your support! You have permanent access to all theme features</p>
                    </div>
                    <div class="membership-info">
                        <h5>✨ Your Exclusive Benefits</h5>
                        <ul class="benefits-list">
                            <li>🎨 Unlock all themes (50+ beautiful themes)</li>
                            <li>🐰 Cute theme pack (8 adorable themes)</li>
                            <li>🔥 Dark theme pack (12 cool themes)</li>
                            <li>⭐ Star theme pack (12 star themes)</li>
                            <li>🎁 All future themes free forever</li>
                            <li>👑 Exclusive member badge</li>
                            <li>💎 Lifetime access, no renewal needed</li>
                        </ul>
                    </div>
                    <button class="membership-ok-btn" onclick="this.closest('.modal').remove()">
                        Got it
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Show message
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

    // Show terms of service
    showTerms() {
        alert('Terms of service page under development...');
    }

    // Show privacy policy
    showPrivacy() {
        alert('Privacy policy page under development...');
    }
}

// Create global premium manager instance
const premiumManager = new PremiumManager();

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    // Premium manager already initialized in constructor
});

// Export for use by other modules
window.premiumManager = premiumManager;
