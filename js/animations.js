// 动画效果管理器

class AnimationManager {
    constructor() {
        this.animationsEnabled = true;
        this.animationQueue = [];
        this.isAnimating = false;
    }

    // 页面进入动画 - 已禁用
    initPageAnimations() {
        // 禁用首次进入动画
        return;
    }

    // 任务项进入动画
    animateTaskIn(taskElement, index = 0) {
        if (!this.animationsEnabled) return;

        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            taskElement.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            taskElement.style.opacity = '1';
            taskElement.style.transform = 'translateX(0)';
        }, index * 100);
    }

    // 任务完成动画
    animateTaskComplete(taskElement) {
        if (!this.animationsEnabled) return;

        // 添加完成类
        taskElement.classList.add('completed');
        
        // 创建爆炸效果
        this.createExplosionEffect(taskElement);
        
        // 吉祥物庆祝
        this.animateMascotCelebration();
        
        // 能量条动画
        this.animateEnergyBar();
    }

    // 爆炸效果
    createExplosionEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 创建多个粒子
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 随机颜色
            const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // 随机大小
            const size = Math.random() * 8 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // 随机位置和方向
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = Math.random() * 100 + 50;
            const deltaX = Math.cos(angle) * velocity;
            const deltaY = Math.sin(angle) * velocity;
            
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            
            // 动画
            particle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            particle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0)`;
            particle.style.opacity = '1';
            
            document.body.appendChild(particle);
            
            // 清理
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    // 吉祥物庆祝动画
    animateMascotCelebration() {
        const mascot = document.querySelector('.mascot-body');
        if (!mascot) return;

        mascot.classList.add('celebrate');
        
        // 随机消息
        const messages = [
            '🎉 太棒了！',
            '💪 继续加油！',
            '✨ 做得很好！',
            '🌟 你真厉害！',
            '🚀 保持这个节奏！'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showMascotMessage(randomMessage);
        
        setTimeout(() => {
            mascot.classList.remove('celebrate');
        }, 800);
    }

    // 显示吉祥物消息
    showMascotMessage(message) {
        const messageEl = document.getElementById('mascotMessage');
        if (!messageEl) return;

        messageEl.textContent = message;
        messageEl.classList.add('typewriter');
        
        setTimeout(() => {
            messageEl.classList.remove('typewriter');
        }, 2000);
    }

    // 能量条动画
    animateEnergyBar() {
        const energyCount = document.getElementById('energyCount');
        if (!energyCount) return;

        energyCount.classList.add('pulse');
        setTimeout(() => {
            energyCount.classList.remove('pulse');
        }, 1000);
    }

    // 进度条动画
    animateProgressBar(targetProgress) {
        const progressFill = document.getElementById('progressFill');
        if (!progressFill) return;

        progressFill.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
        progressFill.style.width = targetProgress + '%';
        
        // 颜色变化
        setTimeout(() => {
            if (targetProgress === 100) {
                progressFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
                this.createSuccessParticles();
            } else if (targetProgress >= 75) {
                progressFill.style.background = 'linear-gradient(90deg, #3b82f6, #60a5fa)';
            } else if (targetProgress >= 50) {
                progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
            } else {
                progressFill.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
            }
        }, 500);
    }

    // 成功粒子效果
    createSuccessParticles() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = '#10b981';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + 'px';
            particle.style.animation = 'particle 1.5s ease-out forwards';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // 模态框动画
    animateModalOpen(modal) {
        if (!this.animationsEnabled) return;

        const backdrop = modal.querySelector('.modal');
        const content = modal.querySelector('.modal-content');
        
        backdrop.style.opacity = '0';
        content.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            backdrop.style.transition = 'opacity 0.3s ease';
            backdrop.style.opacity = '1';
            
            content.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            content.style.transform = 'translateY(0) scale(1)';
        }, 10);
    }

    // 模态框关闭动画
    animateModalClose(modal) {
        if (!this.animationsEnabled) return;

        const backdrop = modal.querySelector('.modal');
        const content = modal.querySelector('.modal-content');
        
        backdrop.style.transition = 'opacity 0.3s ease';
        backdrop.style.opacity = '0';
        
        content.style.transition = 'transform 0.3s ease';
        content.style.transform = 'translateY(50px) scale(0.9)';
    }

    // 按钮点击动画
    animateButtonClick(button) {
        if (!this.animationsEnabled) return;

        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // 输入框焦点动画
    animateInputFocus(input) {
        if (!this.animationsEnabled) return;

        input.style.transform = 'scale(1.02)';
        input.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
    }

    // 输入框失焦动画
    animateInputBlur(input) {
        if (!this.animationsEnabled) return;

        input.style.transform = 'scale(1)';
        input.style.boxShadow = 'none';
    }

    // 主题切换动画
    animateThemeTransition() {
        if (!this.animationsEnabled) return;

        document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // 创建过渡遮罩
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
            pointer-events: none;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }, 100);
    }

    // 加载动画
    showLoading(element, text = '加载中...') {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'loading-overlay';
        loadingEl.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">${text}</div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(loadingEl);
        
        return () => {
            loadingEl.remove();
        };
    }

    // 打字机效果
    typewriter(element, text, speed = 50) {
        if (!this.animationsEnabled) {
            element.textContent = text;
            return Promise.resolve();
        }

        element.textContent = '';
        let i = 0;
        
        return new Promise(resolve => {
            const timer = setInterval(() => {
                element.textContent += text[i];
                i++;
                
                if (i >= text.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    // 数字计数动画
    animateCounter(element, start, end, duration = 1000) {
        if (!this.animationsEnabled) {
            element.textContent = end;
            return;
        }

        const startTime = performance.now();
        const difference = end - start;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.round(start + difference * this.easeOutCubic(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    // 缓动函数
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // 摇摆动画
    wobble(element) {
        if (!this.animationsEnabled) return;

        element.classList.add('wobble');
        setTimeout(() => {
            element.classList.remove('wobble');
        }, 1000);
    }

    // 脉冲动画
    pulse(element) {
        if (!this.animationsEnabled) return;

        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 2000);
    }

    // 发光动画
    glow(element) {
        if (!this.animationsEnabled) return;

        element.classList.add('glow');
        setTimeout(() => {
            element.classList.remove('glow');
        }, 2000);
    }

    // 旋转动画
    rotate(element, degrees = 360) {
        if (!this.animationsEnabled) return;

        element.style.transition = 'transform 0.6s ease';
        element.style.transform = `rotate(${degrees}deg)`;
        
        setTimeout(() => {
            element.style.transition = '';
            element.style.transform = '';
        }, 600);
    }

    // 弹跳动画
    bounce(element) {
        if (!this.animationsEnabled) return;

        element.classList.add('bounce-ball');
        setTimeout(() => {
            element.classList.remove('bounce-ball');
        }, 1000);
    }

    // 波浪动画
    wave(element) {
        if (!this.animationsEnabled) return;

        element.classList.add('wave');
        setTimeout(() => {
            element.classList.remove('wave');
        }, 2000);
    }

    // 禁用/启用动画
    setAnimationsEnabled(enabled) {
        this.animationsEnabled = enabled;
        
        if (!enabled) {
            // 移除所有动画类
            document.querySelectorAll('[class*="animate-"]').forEach(el => {
                el.classList.remove('animate-in', 'animate-out', 'animate-bounce');
            });
        }
    }

    // 预加载动画资源
    preloadAnimations() {
        // 预加载关键帧动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(0);
                }
            }
            
            @keyframes loading-spinner {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                animation: loading-spinner 1s linear infinite;
                margin-bottom: 10px;
            }
            
            .loading-text {
                color: #666;
                font-size: 14px;
            }
        `;
        
        document.head.appendChild(style);
    }

    // 初始化动画系统
    init() {
        this.preloadAnimations();
        // 禁用首次进入动画
        // this.initPageAnimations();
        
        // 监听设置变化
        document.addEventListener('animationSettingsChanged', (e) => {
            this.setAnimationsEnabled(e.detail.enabled);
        });
    }
}

// 创建全局动画管理器实例
const animationManager = new AnimationManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    animationManager.init();
});

// 导出供其他模块使用
window.animationManager = animationManager;
