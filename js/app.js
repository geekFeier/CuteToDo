// CuteToDo - 主要应用程序逻辑

class TaskFlowApp {
    constructor() {
        this.tasks = [];
        this.currentTheme = 'light';
        // 调试模式：解锁所有主题
        this.purchasedThemes = this.getAllThemeNames();
        this.userStats = {
            completedToday: 0
        };
        this.isPremium = false;
        this.settings = {
            autoSave: true,
            animations: true
        };
        
        // 主题数据
        this.themesData = this.initThemesData();
        
        this.init();
    }
    
    getAllThemeNames() {
        return ['light', 'dark', 
                'cat', 'dog', 'rabbit', 'fox', 'panda', 'parrot', 'kangaroo', 'sunflower',
                'tiger', 'lion',
                'fish', 'shrimp', 'dolphin', 'turtle',
                'liying', 'taylor', 'beauty1', 'beauty2', 'beauty3', 'anime1', 'anime2', 'muscleman',
                'kobe', 'messi', 'musk', 'jobs',
                'tech', 'galaxy', 'wukong', 'cyberpunk', 'matrix', 'dragon', 'vampire', 'ghost', 'reaper', 'demon', 'ninja', 'zombie'];
    }
    
    initThemesData() {
        return {
            cute: [
                // 小动物
                { id: 'cat', name: '猫咪', price: 9.9 },
                { id: 'dog', name: '小狗', price: 9.9 },
                { id: 'rabbit', name: '兔子', price: 9.9 },
                { id: 'fox', name: '狐狸', price: 9.9 },
                { id: 'panda', name: '熊猫', price: 9.9 },
                { id: 'parrot', name: '鹦鹉', price: 9.9 },
                { id: 'kangaroo', name: '袋鼠', price: 9.9 },
                // 猛兽
                { id: 'tiger', name: '老虎', price: 9.9 },
                { id: 'lion', name: '狮子', price: 9.9 },
                // 水生动物
                { id: 'fish', name: '小鱼', price: 9.9 },
                { id: 'shrimp', name: '小虾', price: 9.9 },
                { id: 'dolphin', name: '海豚', price: 9.9 },
                { id: 'turtle', name: '乌龟', price: 9.9 },
                // 植物
                { id: 'sunflower', name: '向日葵', price: 9.9 }
            ],
            star: [
                // 明星
                { id: 'liying', name: '赵丽颖', price: 12.9 },
                { id: 'taylor', name: 'Taylor', price: 12.9 },
                // 美女
                { id: 'beauty1', name: '甜美少女', price: 12.9 },
                { id: 'beauty2', name: '性感御姐', price: 12.9 },
                { id: 'beauty3', name: '爆乳女神', price: 12.9 },
                // 动漫
                { id: 'anime1', name: '樱花少女', price: 12.9 },
                { id: 'anime2', name: '元气妹子', price: 12.9 },
                // 猛男和名人
                { id: 'muscleman', name: '肌肉猛男', price: 12.9 },
                { id: 'kobe', name: '科比', price: 12.9 },
                { id: 'messi', name: '梅西', price: 12.9 },
                { id: 'musk', name: '马斯克', price: 12.9 },
                { id: 'jobs', name: '乔布斯', price: 12.9 }
            ],
            dark: [
                { id: 'tech', name: '科技', price: 9.9 },
                { id: 'galaxy', name: '星空', price: 9.9 },
                { id: 'wukong', name: '悟空', price: 9.9 },
                { id: 'cyberpunk', name: '赛博朋克', price: 9.9 },
                { id: 'matrix', name: '黑客帝国', price: 9.9 },
                { id: 'dragon', name: '龙', price: 9.9 },
                { id: 'vampire', name: '血族', price: 9.9 },
                { id: 'ghost', name: '幽灵', price: 9.9 },
                { id: 'reaper', name: '死神', price: 9.9 },
                { id: 'demon', name: '恶魔', price: 9.9 },
                { id: 'ninja', name: '忍者', price: 9.9 },
                { id: 'zombie', name: '僵尸', price: 9.9 }
            ]
        };
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.updateUI();
        this.updateDate();
        this.startIdleAnimations();
        this.renderThemeGrids();
        
        // 显示欢迎消息
        this.showWelcomeMessage();
    }
    
    renderThemeGrids() {
        // 渲染可爱版主题
        this.renderCuteThemes();
        // 渲染明星版主题
        this.renderStarThemes();
        // 渲染暗黑版主题
        this.renderDarkThemes();
    }
    
    renderCuteThemes() {
        const grid = document.getElementById('cuteThemesGrid');
        if (!grid) return;
        
        grid.innerHTML = this.themesData.cute.map(theme => `
            <div class="theme-card premium" data-theme="${theme.id}">
                <div class="theme-preview ${theme.id}-preview">
                    ${this.getCuteThemeSVG(theme.id)}
                </div>
                <h4>${theme.name}</h4>
                <button class="theme-btn buy-btn" onclick="app.purchaseTheme('${theme.id}', ${theme.price})">购买</button>
            </div>
        `).join('');
    }
    
    renderStarThemes() {
        const grid = document.getElementById('starThemesGrid');
        if (!grid) return;
        
        grid.innerHTML = this.themesData.star.map(theme => `
            <div class="theme-card premium" data-theme="${theme.id}">
                <div class="theme-preview ${theme.id}-preview">
                    ${this.getStarThemeSVG(theme.id)}
                </div>
                <h4>${theme.name}</h4>
                <button class="theme-btn buy-btn" onclick="app.purchaseTheme('${theme.id}', ${theme.price})">购买</button>
            </div>
        `).join('');
    }
    
    renderDarkThemes() {
        const grid = document.getElementById('darkThemesGrid');
        if (!grid) return;
        
        grid.innerHTML = this.themesData.dark.map(theme => `
            <div class="theme-card premium" data-theme="${theme.id}">
                <div class="theme-preview ${theme.id}-preview">
                    ${this.getDarkThemeSVG(theme.id)}
                </div>
                <h4>${theme.name}</h4>
                <button class="theme-btn buy-btn" onclick="app.purchaseTheme('${theme.id}', ${theme.price})">购买</button>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // 任务相关
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.addTask();
        });

        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // 主题设置按钮
        document.getElementById('premiumBtn').addEventListener('click', () => {
            this.openModal('shopModal');
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openModal('settingsModal');
        });

        // 关闭模态框
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal').id);
            });
        });

        // 设置
        document.getElementById('autoSave').addEventListener('change', (e) => {
            this.settings.autoSave = e.target.checked;
            this.saveData();
        });

        document.getElementById('animations').addEventListener('change', (e) => {
            this.settings.animations = e.target.checked;
            this.saveData();
        });

        // 点击模态框背景关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    applyTheme(themeName) {
        // 检查是否为免费主题
        const isFreeTheme = themeName === 'light' || themeName === 'dark';
        
        // 如果不是免费主题，检查会员状态
        if (!isFreeTheme) {
            if (!window.premiumManager || !window.premiumManager.isPremiumMember()) {
                this.showToast('❌ 请先升级会员以使用此主题');
                // 显示会员升级弹窗
                if (window.premiumManager) {
                    window.premiumManager.showMembershipModal();
                }
            return;
            }
        }
        
        this.currentTheme = themeName;
        document.body.className = `theme-${themeName}`;
        this.saveData();
        this.playSound('theme-switch');
        this.showToast(`✅ 已应用 ${this.getThemeName(themeName)}`);
        
        // 更新侧边栏吉祥物
        this.updateMascot(themeName);
        
        // 更新主题卡片的选中状态
        this.updateThemeCards();
    }
    
    updateMascot(themeName) {
        const mascotBody = document.querySelector('.mascot-body');
        if (!mascotBody) return;
        
        // 获取对应主题的SVG
        let svg = '';
        if (themeName === 'cat' || themeName === 'dog' || themeName === 'rabbit' || 
            themeName === 'panda' || themeName === 'fox' || themeName === 'parrot' || 
            themeName === 'kangaroo' || themeName === 'sunflower' ||
            themeName === 'tiger' || themeName === 'lion' ||
            themeName === 'fish' || themeName === 'shrimp' || themeName === 'dolphin' || themeName === 'turtle') {
            svg = this.getCuteThemeSVG(themeName);
        } else if (themeName === 'liying' || themeName === 'taylor' || themeName === 'beauty1' || 
                   themeName === 'beauty2' || themeName === 'beauty3' || themeName === 'anime1' || 
                   themeName === 'anime2' || themeName === 'muscleman' ||
                   themeName === 'kobe' || themeName === 'messi' || themeName === 'musk' || themeName === 'jobs') {
            svg = this.getStarThemeSVG(themeName);
        } else if (themeName === 'tech' || themeName === 'galaxy' || themeName === 'wukong' || 
                   themeName === 'cyberpunk' || themeName === 'matrix' || themeName === 'dragon' ||
                   themeName === 'vampire' || themeName === 'ghost' || themeName === 'reaper' ||
                   themeName === 'demon' || themeName === 'ninja' || themeName === 'zombie') {
            svg = this.getDarkThemeSVG(themeName);
        } else if (themeName === 'dark') {
            // 深色主题使用骷髅头SVG
            svg = this.getSkullSVG();
        } else {
            // 默认使用兔子
            svg = this.getCuteThemeSVG('rabbit');
        }
        
        mascotBody.innerHTML = svg;
    }
    
    purchaseTheme(themeName, price) {
        // 免费主题直接应用
        const isFreeTheme = themeName === 'light' || themeName === 'dark';
        if (isFreeTheme) {
            this.applyTheme(themeName);
            return;
        }
        
        // 检查会员状态
        if (window.premiumManager && window.premiumManager.isPremiumMember()) {
            this.applyTheme(themeName);
        } else {
            // 显示会员升级提示
            this.showMembershipPrompt(themeName);
        }
    }
    
    showMembershipPrompt(themeName) {
        const modal = document.createElement('div');
        modal.className = 'modal membership-prompt-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>👑 会员专享主题</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="prompt-info">
                        <div class="prompt-icon">🎨</div>
                        <h4>${this.getThemeName(themeName)}</h4>
                        <p class="prompt-desc">这是会员专享主题，升级会员即可解锁所有主题</p>
                    </div>
                    <div class="prompt-benefits">
                        <h5>✨ 终身会员特权</h5>
                        <ul>
                            <li>🎨 解锁所有主题（50+精美主题）</li>
                            <li>🎁 后续新主题永久免费</li>
                            <li>👑 专属会员标识</li>
                            <li>💎 一次购买，永久使用</li>
                        </ul>
                    </div>
                    <button class="upgrade-now-btn" onclick="app.openMembershipModal()">
                        立即开通终身会员 $9.9
                            </button>
                    <button class="later-btn" onclick="this.closest('.modal').remove()">
                        稍后再说
                            </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    openMembershipModal() {
        // 关闭提示弹窗
        document.querySelectorAll('.membership-prompt-modal').forEach(modal => modal.remove());
        
        // 打开会员升级弹窗
        if (window.premiumManager) {
            window.premiumManager.showMembershipModal();
        }
    }
    
    updateThemeCards() {
        // 更新所有主题卡片的状态
        const isPremium = window.premiumManager && window.premiumManager.isPremiumMember();
        
        document.querySelectorAll('.theme-card').forEach(card => {
            const themeName = card.dataset.theme;
            const btn = card.querySelector('.theme-btn');
            const isFreeTheme = themeName === 'light' || themeName === 'dark';
            
            // 更新当前应用的主题
            if (themeName === this.currentTheme) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
            
            // 更新按钮状态
            if (card.classList.contains('premium')) {
                if (isPremium) {
                    // 已开通会员
                    btn.textContent = '应用';
                    btn.className = 'theme-btn apply-btn';
                    btn.setAttribute('onclick', `app.applyTheme('${themeName}')`);
                    card.classList.remove('locked');
                } else {
                    // 需要会员
                    btn.textContent = '会员专享';
                    btn.className = 'theme-btn buy-btn';
                    card.classList.add('locked');
                }
            }
        });
    }
    
    getThemeName(themeName) {
        const themeNames = {
            'light': '浅色', 'dark': '深色',
            'cat': '猫咪', 'dog': '小狗', 'rabbit': '兔子', 
            'panda': '熊猫', 'fox': '狐狸', 'parrot': '鹦鹉', 
            'kangaroo': '袋鼠', 'sunflower': '向日葵',
            'tiger': '老虎', 'lion': '狮子',
            'fish': '小鱼', 'shrimp': '小虾', 'dolphin': '海豚', 'turtle': '乌龟',
            'liying': '赵丽颖', 'taylor': 'Taylor Swift',
            'beauty1': '甜美少女', 'beauty2': '性感御姐', 'beauty3': '爆乳女神',
            'anime1': '樱花少女', 'anime2': '元气妹子',
            'muscleman': '肌肉猛男',
            'kobe': '科比', 'messi': '梅西', 'musk': '马斯克', 'jobs': '乔布斯',
            'tech': '科技', 'galaxy': '星空', 'wukong': '悟空',
            'cyberpunk': '赛博朋克', 'matrix': '黑客帝国', 'dragon': '龙',
            'vampire': '血族', 'ghost': '幽灵', 'reaper': '死神',
            'demon': '恶魔', 'ninja': '忍者', 'zombie': '僵尸'
        };
        return themeNames[themeName] || themeName;
    }
    
    // ===== 可爱版SVG =====
    getCuteThemeSVG(themeId) {
        const svgs = {
            cat: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 橘猫大头 -->
                <circle cx="50" cy="38" r="28" fill="#FF9955"/>
                <!-- 橘猫条纹 -->
                <path d="M 30 28 Q 32 30 30 32" stroke="#E67722" stroke-width="2.5" fill="none"/>
                <path d="M 70 28 Q 68 30 70 32" stroke="#E67722" stroke-width="2.5" fill="none"/>
                <path d="M 35 22 Q 36 24 35 26" stroke="#E67722" stroke-width="2" fill="none"/>
                <path d="M 65 22 Q 64 24 65 26" stroke="#E67722" stroke-width="2" fill="none"/>
                <path d="M 40 18 Q 41 20 40 22" stroke="#E67722" stroke-width="1.5" fill="none"/>
                <path d="M 60 18 Q 59 20 60 22" stroke="#E67722" stroke-width="1.5" fill="none"/>
                <!-- 额头M字纹 -->
                <path d="M 42 24 L 46 28 L 50 24 L 54 28 L 58 24" stroke="#E67722" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 三角猫耳朵 -->
                <polygon points="26,14 20,28 32,26" fill="#FF9955" class="ear-wiggle-left"/>
                <polygon points="74,14 80,28 68,26" fill="#FF9955" class="ear-wiggle-right"/>
                <polygon points="28,18 24,24 30,24" fill="#FFB380"/>
                <polygon points="72,18 76,24 70,24" fill="#FFB380"/>
                <!-- 脸部白色区域 -->
                <ellipse cx="50" cy="44" rx="18" ry="14" fill="#FFF" opacity="0.9"/>
                <!-- 超大圆眼睛 -->
                <circle cx="38" cy="38" r="8" fill="#FFD700" opacity="0.8"/>
                <circle cx="38" cy="38" r="7" fill="#88DD00"/>
                <circle cx="38" cy="38" r="5" fill="#000" class="eye-blink"/>
                <circle cx="39" cy="35" r="3" fill="#FFF"/>
                <circle cx="40" cy="34" r="1.5" fill="#FFF"/>
                <circle cx="62" cy="38" r="8" fill="#FFD700" opacity="0.8"/>
                <circle cx="62" cy="38" r="7" fill="#88DD00"/>
                <circle cx="62" cy="38" r="5" fill="#000" class="eye-blink"/>
                <circle cx="63" cy="35" r="3" fill="#FFF"/>
                <circle cx="64" cy="34" r="1.5" fill="#FFF"/>
                <!-- 大腮红 -->
                <circle cx="26" cy="46" r="8" fill="#FFB380" opacity="0.7"/>
                <circle cx="74" cy="46" r="8" fill="#FFB380" opacity="0.7"/>
                <!-- 粉色鼻子 -->
                <ellipse cx="50" cy="48" rx="4" ry="4" fill="#FFB6C1"/>
                <circle cx="49" cy="47" r="1.5" fill="#FFF" opacity="0.6"/>
                <!-- W型猫嘴 -->
                <path d="M 50 48 L 50 50" stroke="#2C2C2C" stroke-width="1.5"/>
                <path d="M 50 50 Q 44 53 42 51" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 50 50 Q 56 53 58 51" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 长胡须 -->
                <line x1="22" y1="44" x2="8" y2="40" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="22" y1="48" x2="8" y2="52" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="78" y1="44" x2="92" y2="40" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="78" y1="48" x2="92" y2="52" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 小身体（橘色） -->
                <ellipse cx="50" cy="74" rx="17" ry="21" fill="#FF9955"/>
                <!-- 白肚子 -->
                <ellipse cx="50" cy="75" rx="12" ry="16" fill="#FFF" opacity="0.95"/>
                <!-- 身体条纹 -->
                <path d="M 40 68 Q 42 70 40 72" stroke="#E67722" stroke-width="2" fill="none"/>
                <path d="M 60 68 Q 58 70 60 72" stroke="#E67722" stroke-width="2" fill="none"/>
                <path d="M 42 80 Q 44 82 42 84" stroke="#E67722" stroke-width="1.5" fill="none"/>
                <path d="M 58 80 Q 56 82 58 84" stroke="#E67722" stroke-width="1.5" fill="none"/>
                <!-- 手（橘色） -->
                <ellipse cx="35" cy="71" rx="6" ry="11" fill="#FF9955"/>
                <ellipse cx="65" cy="71" rx="6" ry="11" fill="#FF9955"/>
                <!-- 白色手掌 -->
                <circle cx="35" cy="80" r="3.5" fill="#FFF" opacity="0.9"/>
                <circle cx="65" cy="80" r="3.5" fill="#FFF" opacity="0.9"/>
                <!-- 脚（橘色） -->
                <ellipse cx="42" cy="93" rx="8" ry="6" fill="#FF9955"/>
                <ellipse cx="58" cy="93" rx="8" ry="6" fill="#FF9955"/>
                <!-- 白色脚掌 -->
                <ellipse cx="42" cy="95" rx="5" ry="3" fill="#FFF" opacity="0.9"/>
                <ellipse cx="58" cy="95" rx="5" ry="3" fill="#FFF" opacity="0.9"/>
                <!-- 尾巴 -->
                <circle cx="50" cy="60" r="2" fill="#E67722" opacity="0.6"/>
            </svg>`,
            
            dog: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 金毛大头 -->
                <ellipse cx="50" cy="40" rx="28" ry="26" fill="#F4D03F"/>
                <!-- 额头毛发 -->
                <ellipse cx="50" cy="22" rx="24" ry="12" fill="#E8B92F"/>
                <path d="M 35 22 Q 38 18 41 22" stroke="#E8B92F" stroke-width="2.5" fill="none"/>
                <path d="M 45 22 Q 48 18 51 22" stroke="#E8B92F" stroke-width="2.5" fill="none"/>
                <path d="M 55 22 Q 58 18 61 22" stroke="#E8B92F" stroke-width="2.5" fill="none"/>
                <!-- 大耳朵（垂下来的） -->
                <ellipse cx="22" cy="38" rx="12" ry="22" fill="#E8B92F" class="ear-flap"/>
                <ellipse cx="78" cy="38" rx="12" ry="22" fill="#E8B92F" class="ear-flap"/>
                <ellipse cx="22" cy="42" rx="7" ry="16" fill="#F4D03F"/>
                <ellipse cx="78" cy="42" rx="7" ry="16" fill="#F4D03F"/>
                <!-- 脸部白色区域 -->
                <ellipse cx="50" cy="46" rx="20" ry="16" fill="#FFF" opacity="0.85"/>
                <!-- 超大圆眼睛 -->
                <circle cx="38" cy="38" r="8" fill="#4A3428" opacity="0.3"/>
                <circle cx="38" cy="38" r="7" fill="#000" class="eye-blink"/>
                <circle cx="39" cy="35" r="4" fill="#FFF"/>
                <circle cx="40" cy="33" r="2" fill="#FFF"/>
                <circle cx="62" cy="38" r="8" fill="#4A3428" opacity="0.3"/>
                <circle cx="62" cy="38" r="7" fill="#000" class="eye-blink"/>
                <circle cx="63" cy="35" r="4" fill="#FFF"/>
                <circle cx="64" cy="33" r="2" fill="#FFF"/>
                <!-- 大腮红 -->
                <circle cx="26" cy="48" r="8" fill="#FFD4A3" opacity="0.8"/>
                <circle cx="74" cy="48" r="8" fill="#FFD4A3" opacity="0.8"/>
                <!-- 大黑鼻子 -->
                <ellipse cx="50" cy="50" rx="7" ry="6" fill="#2C2C2C"/>
                <circle cx="47" cy="48" r="2.5" fill="#FFF" opacity="0.6"/>
                <circle cx="52" cy="49" r="1.5" fill="#FFF" opacity="0.4"/>
                <!-- 鼻子到嘴的线 -->
                <path d="M 50 50 L 50 54" stroke="#2C2C2C" stroke-width="2"/>
                <!-- 超开心大笑 -->
                <path d="M 38 54 Q 50 62 62 54" stroke="#4A3428" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- 大舌头 -->
                <ellipse cx="50" cy="58" rx="7" ry="5" fill="#FF6B9D"/>
                <ellipse cx="50" cy="57" rx="5" ry="3" fill="#FF8FB3" opacity="0.8"/>
                <ellipse cx="50" cy="56" rx="3" ry="2" fill="#FFB3C7" opacity="0.6"/>
                <!-- 小身体（金毛色） -->
                <ellipse cx="50" cy="76" rx="19" ry="19" fill="#F4D03F"/>
                <!-- 白肚子 -->
                <ellipse cx="50" cy="77" rx="13" ry="14" fill="#FFF" opacity="0.85"/>
                <!-- 毛发纹理 -->
                <path d="M 36 70 Q 38 72 36 74" stroke="#E8B92F" stroke-width="1.5" fill="none"/>
                <path d="M 64 70 Q 62 72 64 74" stroke="#E8B92F" stroke-width="1.5" fill="none"/>
                <!-- 手（金毛色） -->
                <ellipse cx="34" cy="73" rx="7" ry="13" fill="#F4D03F"/>
                <ellipse cx="66" cy="73" rx="7" ry="13" fill="#F4D03F"/>
                <!-- 白色爪子 -->
                <ellipse cx="34" cy="83" rx="4" ry="4" fill="#FFF" opacity="0.9"/>
                <ellipse cx="66" cy="83" rx="4" ry="4" fill="#FFF" opacity="0.9"/>
                <!-- 脚（金毛色） -->
                <ellipse cx="42" cy="93" rx="8" ry="7" fill="#F4D03F"/>
                <ellipse cx="58" cy="93" rx="8" ry="7" fill="#F4D03F"/>
                <!-- 白色脚掌 -->
                <ellipse cx="42" cy="96" rx="5" ry="4" fill="#FFF" opacity="0.9"/>
                <ellipse cx="58" cy="96" rx="5" ry="4" fill="#FFF" opacity="0.9"/>
                <!-- 肉垫 -->
                <circle cx="42" cy="96" r="2" fill="#FFB6C1" opacity="0.7"/>
                <circle cx="58" cy="96" r="2" fill="#FFB6C1" opacity="0.7"/>
                <!-- 小尾巴摇摆暗示 -->
                <circle cx="50" cy="62" r="2" fill="#E8B92F" opacity="0.5"/>
            </svg>`,
            
            rabbit: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 超长兔耳朵 -->
                <ellipse cx="35" cy="22" rx="9" ry="28" fill="#FFE4E1" class="ear-wiggle-left"/>
                <ellipse cx="65" cy="22" rx="9" ry="28" fill="#FFE4E1" class="ear-wiggle-right"/>
                <ellipse cx="35" cy="26" rx="5" ry="20" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="65" cy="26" rx="5" ry="20" fill="#FFB6C1" opacity="0.6"/>
                <!-- 大头 -->
                <circle cx="50" cy="40" r="28" fill="#FFF"/>
                <ellipse cx="50" cy="40" rx="26" ry="28" fill="#FFEFF5"/>
                <!-- 超大萌眼 -->
                <ellipse cx="38" cy="38" rx="8" ry="11" fill="#000" class="eye-blink"/>
                <circle cx="38" cy="34" r="5" fill="#FFF"/>
                <circle cx="39" cy="32" r="2.5" fill="#FFF"/>
                <circle cx="36" cy="36" r="1.5" fill="#FFF" opacity="0.7"/>
                <ellipse cx="62" cy="38" rx="8" ry="11" fill="#000" class="eye-blink"/>
                <circle cx="62" cy="34" r="5" fill="#FFF"/>
                <circle cx="63" cy="32" r="2.5" fill="#FFF"/>
                <circle cx="60" cy="36" r="1.5" fill="#FFF" opacity="0.7"/>
                <!-- 大腮红 -->
                <circle cx="26" cy="46" r="8" fill="#FFB6C1" opacity="0.8"/>
                <circle cx="74" cy="46" r="8" fill="#FFB6C1" opacity="0.8"/>
                <circle cx="24" cy="44" r="4" fill="#FF9AA2" opacity="0.6"/>
                <circle cx="76" cy="44" r="4" fill="#FF9AA2" opacity="0.6"/>
                <!-- 小鼻子 -->
                <ellipse cx="50" cy="50" rx="3" ry="4" fill="#FFB6C1"/>
                <circle cx="50" cy="49" r="1" fill="#FFF" opacity="0.6"/>
                <!-- 嘴巴 -->
                <path d="M 50 50 Q 44 54 42 53" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 50 50 Q 56 54 58 53" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="75" rx="17" ry="20" fill="#FFF"/>
                <ellipse cx="50" cy="75" rx="13" ry="16" fill="#FFE4E1"/>
                <!-- 手 -->
                <ellipse cx="36" cy="72" rx="6" ry="11" fill="#FFF"/>
                <ellipse cx="64" cy="72" rx="6" ry="11" fill="#FFF"/>
                <!-- 脚 -->
                <ellipse cx="42" cy="93" rx="8" ry="6" fill="#FFF"/>
                <ellipse cx="58" cy="93" rx="8" ry="6" fill="#FFF"/>
                <!-- 小尾巴 -->
                <circle cx="50" cy="90" r="4" fill="#FFF"/>
                <circle cx="50" cy="90" r="3" fill="#FFE4E1"/>
            </svg>`,
            
            sunflower: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 花瓣（每片独立动画） -->
                <ellipse cx="50" cy="22" rx="9" ry="14" fill="#FFD700" class="petal"/>
                <ellipse cx="73" cy="32" rx="13" ry="9" fill="#FFC700" class="petal"/>
                <ellipse cx="78" cy="50" rx="9" ry="13" fill="#FFD700" class="petal"/>
                <ellipse cx="73" cy="68" rx="13" ry="9" fill="#FFC700" class="petal"/>
                <ellipse cx="50" cy="78" rx="9" ry="14" fill="#FFD700" class="petal"/>
                <ellipse cx="27" cy="68" rx="13" ry="9" fill="#FFC700" class="petal"/>
                <ellipse cx="22" cy="50" rx="9" ry="13" fill="#FFD700" class="petal"/>
                <ellipse cx="27" cy="32" rx="13" ry="9" fill="#FFC700" class="petal"/>
                <!-- 花心 -->
                <circle cx="50" cy="50" r="16" fill="#8B4513"/>
                <circle cx="50" cy="50" r="13" fill="#654321"/>
                <!-- 花心纹理 -->
                <circle cx="46" cy="46" r="2" fill="#4A3018" opacity="0.6"/>
                <circle cx="54" cy="46" r="2" fill="#4A3018" opacity="0.6"/>
                <circle cx="46" cy="54" r="2" fill="#4A3018" opacity="0.6"/>
                <circle cx="54" cy="54" r="2" fill="#4A3018" opacity="0.6"/>
                <!-- 超大可爱眼睛 -->
                <ellipse cx="44" cy="48" rx="4" ry="6" fill="#000" class="eye-blink"/>
                <circle cx="44" cy="46" r="2" fill="#FFF"/>
                <ellipse cx="56" cy="48" rx="4" ry="6" fill="#000" class="eye-blink"/>
                <circle cx="56" cy="46" r="2" fill="#FFF"/>
                <!-- 可爱微笑 -->
                <path d="M 45 56 Q 50 59 55 56" stroke="#654321" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- 腮红 -->
                <circle cx="40" cy="52" r="3" fill="#FF9955" opacity="0.5"/>
                <circle cx="60" cy="52" r="3" fill="#FF9955" opacity="0.5"/>
            </svg>`,
            
            panda: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <circle cx="50" cy="38" r="28" fill="#F8F8F8"/>
                <!-- 熊猫耳朵（毛茸茸的） -->
                <circle cx="28" cy="20" r="11" fill="#2C2C2C"/>
                <circle cx="72" cy="20" r="11" fill="#2C2C2C"/>
                <circle cx="28" cy="22" r="8" fill="#1A1A1A"/>
                <circle cx="72" cy="22" r="8" fill="#1A1A1A"/>
                <!-- 超大黑眼圈 -->
                <ellipse cx="36" cy="36" rx="11" ry="13" fill="#2C2C2C"/>
                <ellipse cx="64" cy="36" rx="11" ry="13" fill="#2C2C2C"/>
                <!-- 眼白和眼珠 -->
                <ellipse cx="36" cy="36" rx="7" ry="8" fill="#FFF"/>
                <circle cx="36" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="37" cy="34" r="2.5" fill="#FFF"/>
                <circle cx="38" cy="33" r="1.5" fill="#FFF"/>
                <ellipse cx="64" cy="36" rx="7" ry="8" fill="#FFF"/>
                <circle cx="64" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="65" cy="34" r="2.5" fill="#FFF"/>
                <circle cx="66" cy="33" r="1.5" fill="#FFF"/>
                <!-- 腮红 -->
                <circle cx="26" cy="46" r="6" fill="#FFB6C1" opacity="0.6"/>
                <circle cx="74" cy="46" r="6" fill="#FFB6C1" opacity="0.6"/>
                <!-- 大鼻子 -->
                <ellipse cx="50" cy="50" rx="5" ry="6" fill="#2C2C2C"/>
                <circle cx="48" cy="49" r="2" fill="#FFF" opacity="0.5"/>
                <!-- 嘴巴 -->
                <path d="M 50 50 L 50 54" stroke="#2C2C2C" stroke-width="2"/>
                <path d="M 42 54 Q 50 58 58 54" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="75" rx="18" ry="20" fill="#F8F8F8"/>
                <!-- 肚子 -->
                <ellipse cx="50" cy="76" rx="13" ry="16" fill="#FFF"/>
                <!-- 肚脐 -->
                <circle cx="50" cy="78" r="1.5" fill="#E0E0E0"/>
                <!-- 手（黑色毛茸茸） -->
                <ellipse cx="34" cy="72" rx="7" ry="13" fill="#2C2C2C"/>
                <ellipse cx="66" cy="72" rx="7" ry="13" fill="#2C2C2C"/>
                <!-- 手掌 -->
                <ellipse cx="34" cy="82" rx="5" ry="4" fill="#1A1A1A"/>
                <ellipse cx="66" cy="82" rx="5" ry="4" fill="#1A1A1A"/>
                <!-- 脚（黑色毛茸茸） -->
                <ellipse cx="42" cy="93" rx="8" ry="6" fill="#2C2C2C"/>
                <ellipse cx="58" cy="93" rx="8" ry="6" fill="#2C2C2C"/>
                <!-- 脚掌 -->
                <ellipse cx="42" cy="95" rx="5" ry="4" fill="#1A1A1A"/>
                <ellipse cx="58" cy="95" rx="5" ry="4" fill="#1A1A1A"/>
            </svg>`,
            
            fox: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <circle cx="50" cy="40" r="26" fill="#FF8C5A"/>
                <!-- 狐狸尖耳朵 -->
                <polygon points="26,12 18,30 32,30" fill="#FF8C5A" class="ear-wiggle-left"/>
                <polygon points="74,12 82,30 68,30" fill="#FF8C5A" class="ear-wiggle-right"/>
                <polygon points="28,16 24,24 30,26" fill="#FFF"/>
                <polygon points="72,16 76,24 70,26" fill="#FFF"/>
                <!-- 脸部白色区域 -->
                <ellipse cx="50" cy="46" rx="16" ry="18" fill="#FFF"/>
                <ellipse cx="50" cy="34" rx="12" ry="10" fill="#FFF" opacity="0.8"/>
                <!-- 超大萌眼 -->
                <ellipse cx="40" cy="38" rx="6" ry="9" fill="#000" class="eye-blink"/>
                <circle cx="40" cy="35" r="3" fill="#FFF"/>
                <circle cx="41" cy="33" r="1.5" fill="#FFF"/>
                <ellipse cx="60" cy="38" rx="6" ry="9" fill="#000" class="eye-blink"/>
                <circle cx="60" cy="35" r="3" fill="#FFF"/>
                <circle cx="61" cy="33" r="1.5" fill="#FFF"/>
                <!-- 大腮红 -->
                <circle cx="28" cy="46" r="7" fill="#FFB6C1" opacity="0.7"/>
                <circle cx="72" cy="46" r="7" fill="#FFB6C1" opacity="0.7"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="50" rx="4" ry="4" fill="#2C2C2C"/>
                <circle cx="49" cy="49" r="1.5" fill="#FFF" opacity="0.5"/>
                <!-- 嘴巴 -->
                <path d="M 50 50 Q 44 54 42 53" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 50 50 Q 56 54 58 53" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="75" rx="17" ry="20" fill="#FF8C5A"/>
                <ellipse cx="50" cy="76" rx="12" ry="16" fill="#FFF"/>
                <!-- 尾巴尖 -->
                <circle cx="50" cy="60" r="2" fill="#FFF" opacity="0.6"/>
                <!-- 手（白色爪子） -->
                <ellipse cx="35" cy="72" rx="6" ry="12" fill="#FF8C5A"/>
                <ellipse cx="65" cy="72" rx="6" ry="12" fill="#FF8C5A"/>
                <circle cx="35" cy="80" r="3" fill="#FFF" opacity="0.8"/>
                <circle cx="65" cy="80" r="3" fill="#FFF" opacity="0.8"/>
                <!-- 脚（黑色） -->
                <ellipse cx="42" cy="93" rx="7" ry="6" fill="#2C2C2C"/>
                <ellipse cx="58" cy="93" rx="7" ry="6" fill="#2C2C2C"/>
                <circle cx="42" cy="95" r="2.5" fill="#FFF" opacity="0.7"/>
                <circle cx="58" cy="95" r="2.5" fill="#FFF" opacity="0.7"/>
            </svg>`,
            
            fish: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="48" cy="38" rx="28" ry="26" fill="#87CEEB"/>
                <ellipse cx="48" cy="42" rx="24" ry="22" fill="#B0E0E6"/>
                <!-- 顶部鱼鳍 -->
                <path d="M 48 12 L 42 20 L 54 20 Z" fill="#6BA8C8" opacity="0.8"/>
                <!-- 侧鱼鳍装饰 -->
                <path d="M 20 35 Q 12 38 20 42" fill="#87CEEB" opacity="0.8"/>
                <!-- 超大萌眼 -->
                <circle cx="36" cy="34" r="8" fill="#FFF"/>
                <circle cx="36" cy="34" r="6" fill="#000" class="eye-blink"/>
                <circle cx="37" cy="31" r="3" fill="#FFF"/>
                <circle cx="38" cy="30" r="1.5" fill="#FFF"/>
                <circle cx="60" cy="34" r="8" fill="#FFF"/>
                <circle cx="60" cy="34" r="6" fill="#000" class="eye-blink"/>
                <circle cx="61" cy="31" r="3" fill="#FFF"/>
                <circle cx="62" cy="30" r="1.5" fill="#FFF"/>
                <!-- 大腮红 -->
                <circle cx="26" cy="44" r="7" fill="#FFC0CB" opacity="0.7"/>
                <circle cx="70" cy="44" r="7" fill="#FFC0CB" opacity="0.7"/>
                <circle cx="24" cy="42" r="3" fill="#FF9AA2" opacity="0.5"/>
                <circle cx="72" cy="42" r="3" fill="#FF9AA2" opacity="0.5"/>
                <!-- 小嘴巴 -->
                <ellipse cx="48" cy="50" rx="5" ry="4" fill="#FF9AA2" opacity="0.8"/>
                <path d="M 42 50 Q 48 54 54 50" stroke="#6BA8C8" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="48" cy="75" rx="17" ry="19" fill="#87CEEB"/>
                <ellipse cx="48" cy="76" rx="13" ry="15" fill="#B0E0E6"/>
                <!-- 鳍（手） -->
                <ellipse cx="32" cy="70" rx="9" ry="11" fill="#87CEEB" opacity="0.8" class="wing-flap"/>
                <ellipse cx="64" cy="70" rx="9" ry="11" fill="#87CEEB" opacity="0.8" class="wing-flap"/>
                <!-- 鱼鳞装饰 -->
                <circle cx="44" cy="68" r="2.5" fill="#6BA8C8" opacity="0.4"/>
                <circle cx="52" cy="68" r="2.5" fill="#6BA8C8" opacity="0.4"/>
                <circle cx="40" cy="74" r="2" fill="#6BA8C8" opacity="0.3"/>
                <circle cx="48" cy="75" r="2" fill="#6BA8C8" opacity="0.3"/>
                <circle cx="56" cy="74" r="2" fill="#6BA8C8" opacity="0.3"/>
                <circle cx="44" cy="80" r="2" fill="#6BA8C8" opacity="0.3"/>
                <circle cx="52" cy="80" r="2" fill="#6BA8C8" opacity="0.3"/>
                <!-- 尾巴 -->
                <path d="M 40 90 L 34 96 L 40 94 L 46 100 L 46 94 L 52 98 L 48 92" fill="#87CEEB"/>
                <path d="M 38 92 L 42 96 L 46 92" fill="#B0E0E6" opacity="0.6"/>
            </svg>`,
            
            tiger: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="38" rx="28" ry="26" fill="#FFA849"/>
                <!-- 老虎耳朵 -->
                <polygon points="24,16 18,28 30,26" fill="#FFA849" class="ear-wiggle-left"/>
                <polygon points="76,16 82,28 70,26" fill="#FFA849" class="ear-wiggle-right"/>
                <polygon points="26,18 23,24 28,24" fill="#FFB6C1"/>
                <polygon points="74,18 77,24 72,24" fill="#FFB6C1"/>
                <!-- 额头王字条纹 -->
                <path d="M 38 26 L 46 26" stroke="#2C2C2C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M 54 26 L 62 26" stroke="#2C2C2C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M 42 22 L 50 22 L 58 22" stroke="#2C2C2C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- 脸部条纹 -->
                <path d="M 28 32 Q 30 34 28 36" stroke="#2C2C2C" stroke-width="2.5" fill="none"/>
                <path d="M 72 32 Q 70 34 72 36" stroke="#2C2C2C" stroke-width="2.5" fill="none"/>
                <path d="M 33 28 Q 34 30 33 32" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <path d="M 67 28 Q 66 30 67 32" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <!-- 威武大眼 -->
                <ellipse cx="38" cy="38" rx="6" ry="8" fill="#FFD700"/>
                <ellipse cx="38" cy="38" rx="5" ry="6" fill="#000" class="eye-blink"/>
                <circle cx="39" cy="36" r="2.5" fill="#FFF"/>
                <ellipse cx="62" cy="38" rx="6" ry="8" fill="#FFD700"/>
                <ellipse cx="62" cy="38" rx="5" ry="6" fill="#000" class="eye-blink"/>
                <circle cx="63" cy="36" r="2.5" fill="#FFF"/>
                <!-- 脸颊白色 -->
                <ellipse cx="28" cy="46" rx="8" ry="7" fill="#FFF" opacity="0.9"/>
                <ellipse cx="72" cy="46" rx="8" ry="7" fill="#FFF" opacity="0.9"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="50" rx="5" ry="5" fill="#2C2C2C"/>
                <circle cx="48" cy="49" r="2" fill="#FFF" opacity="0.5"/>
                <!-- 嘴巴 -->
                <path d="M 50 50 L 50 54" stroke="#2C2C2C" stroke-width="2"/>
                <path d="M 42 54 Q 50 58 58 54" stroke="#2C2C2C" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 长胡须 -->
                <line x1="24" y1="44" x2="10" y2="42" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="24" y1="48" x2="10" y2="50" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="76" y1="44" x2="90" y2="42" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="76" y1="48" x2="90" y2="50" stroke="#2C2C2C" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="75" rx="18" ry="20" fill="#FFA849"/>
                <!-- 肚子条纹 -->
                <ellipse cx="50" cy="76" rx="13" ry="16" fill="#FFD4A3" opacity="0.7"/>
                <path d="M 40 68 Q 42 70 40 72" stroke="#2C2C2C" stroke-width="2.5" fill="none"/>
                <path d="M 60 68 Q 58 70 60 72" stroke="#2C2C2C" stroke-width="2.5" fill="none"/>
                <path d="M 42 78 Q 44 80 42 82" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <path d="M 58 78 Q 56 80 58 82" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <path d="M 45 86 Q 47 88 45 90" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <path d="M 55 86 Q 53 88 55 90" stroke="#2C2C2C" stroke-width="2" fill="none"/>
                <!-- 手 -->
                <ellipse cx="34" cy="72" rx="7" ry="13" fill="#FFA849"/>
                <ellipse cx="66" cy="72" rx="7" ry="13" fill="#FFA849"/>
                <!-- 脚 -->
                <ellipse cx="42" cy="93" rx="7" ry="6" fill="#2C2C2C"/>
                <ellipse cx="58" cy="93" rx="7" ry="6" fill="#2C2C2C"/>
                <circle cx="42" cy="95" r="2.5" fill="#FFF" opacity="0.4"/>
                <circle cx="58" cy="95" r="2.5" fill="#FFF" opacity="0.4"/>
            </svg>`,
            
            lion: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 蓬松鬃毛（多层） -->
                <circle cx="50" cy="38" r="35" fill="#E8A75C" opacity="0.5"/>
                <circle cx="32" cy="22" r="11" fill="#E8A75C" opacity="0.7"/>
                <circle cx="68" cy="22" r="11" fill="#E8A75C" opacity="0.7"/>
                <circle cx="22" cy="32" r="10" fill="#D4935C" opacity="0.7"/>
                <circle cx="78" cy="32" r="10" fill="#D4935C" opacity="0.7"/>
                <circle cx="24" cy="44" r="11" fill="#E8A75C" opacity="0.7"/>
                <circle cx="76" cy="44" r="11" fill="#E8A75C" opacity="0.7"/>
                <circle cx="28" cy="54" r="9" fill="#D4935C" opacity="0.6"/>
                <circle cx="72" cy="54" r="9" fill="#D4935C" opacity="0.6"/>
                <circle cx="38" cy="60" r="7" fill="#E8A75C" opacity="0.5"/>
                <circle cx="62" cy="60" r="7" fill="#E8A75C" opacity="0.5"/>
                <!-- 大头 -->
                <circle cx="50" cy="38" r="26" fill="#FFB957"/>
                <!-- 耳朵（藏在鬃毛里） -->
                <circle cx="30" cy="22" r="9" fill="#FFB957"/>
                <circle cx="70" cy="22" r="9" fill="#FFB957"/>
                <circle cx="30" cy="24" r="6" fill="#FFA07A"/>
                <circle cx="70" cy="24" r="6" fill="#FFA07A"/>
                <!-- 威严大眼 -->
                <circle cx="38" cy="36" r="6" fill="#FFD700" opacity="0.8"/>
                <circle cx="38" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="39" cy="34" r="2.5" fill="#FFF"/>
                <circle cx="40" cy="33" r="1.5" fill="#FFF"/>
                <circle cx="62" cy="36" r="6" fill="#FFD700" opacity="0.8"/>
                <circle cx="62" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="63" cy="34" r="2.5" fill="#FFF"/>
                <circle cx="64" cy="33" r="1.5" fill="#FFF"/>
                <!-- 脸颊 -->
                <ellipse cx="30" cy="46" rx="8" ry="6" fill="#FFD4A3" opacity="0.9"/>
                <ellipse cx="70" cy="46" rx="8" ry="6" fill="#FFD4A3" opacity="0.9"/>
                <!-- 大鼻子 -->
                <ellipse cx="50" cy="50" rx="6" ry="5" fill="#4A3428"/>
                <circle cx="48" cy="49" r="2" fill="#FFF" opacity="0.5"/>
                <!-- 嘴巴 -->
                <path d="M 50 50 L 50 54" stroke="#4A3428" stroke-width="2"/>
                <path d="M 42 54 Q 50 58 58 54" stroke="#4A3428" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 长胡须 -->
                <line x1="24" y1="44" x2="10" y2="42" stroke="#4A3428" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="24" y1="48" x2="10" y2="50" stroke="#4A3428" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="76" y1="44" x2="90" y2="42" stroke="#4A3428" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="76" y1="48" x2="90" y2="50" stroke="#4A3428" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="75" rx="18" ry="20" fill="#FFB957"/>
                <ellipse cx="50" cy="76" rx="13" ry="16" fill="#FFD4A3"/>
                <!-- 手 -->
                <ellipse cx="34" cy="72" rx="7" ry="13" fill="#FFB957"/>
                <ellipse cx="66" cy="72" rx="7" ry="13" fill="#FFB957"/>
                <!-- 爪子 -->
                <ellipse cx="34" cy="82" rx="5" ry="4" fill="#FFD4A3"/>
                <ellipse cx="66" cy="82" rx="5" ry="4" fill="#FFD4A3"/>
                <!-- 脚 -->
                <ellipse cx="42" cy="93" rx="8" ry="6" fill="#4A3428"/>
                <ellipse cx="58" cy="93" rx="8" ry="6" fill="#4A3428"/>
                <circle cx="42" cy="95" r="2.5" fill="#FFD4A3" opacity="0.7"/>
                <circle cx="58" cy="95" r="2.5" fill="#FFD4A3" opacity="0.7"/>
            </svg>`,
            
            parrot: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="38" rx="26" ry="28" fill="#00D4A8"/>
                <!-- 羽冠 -->
                <path d="M 45 14 Q 48 8 50 12 Q 52 8 55 14" fill="#FF6B9D" class="ear-wiggle"/>
                <ellipse cx="50" cy="18" rx="22" ry="14" fill="#00D4A8"/>
                <!-- 眼睛周围白色 -->
                <circle cx="40" cy="36" r="8" fill="#FFF"/>
                <circle cx="60" cy="36" r="8" fill="#FFF"/>
                <!-- 眼睛 -->
                <circle cx="40" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="41" cy="34" r="2" fill="#FFF"/>
                <circle cx="60" cy="36" r="5" fill="#000" class="eye-blink"/>
                <circle cx="61" cy="34" r="2" fill="#FFF"/>
                <!-- 腮红 -->
                <circle cx="28" cy="42" r="5" fill="#FF9AA2" opacity="0.6"/>
                <circle cx="72" cy="42" r="5" fill="#FF9AA2" opacity="0.6"/>
                <!-- 大嘴 -->
                <ellipse cx="50" cy="50" rx="8" ry="6" fill="#FFD700"/>
                <path d="M 50 44 Q 45 48 42 46" stroke="#FFA500" stroke-width="1.5" fill="none"/>
                <path d="M 50 44 Q 55 48 58 46" stroke="#FFA500" stroke-width="1.5" fill="none"/>
                <!-- 小身体（彩色羽毛） -->
                <ellipse cx="50" cy="75" rx="18" ry="20" fill="#FF6B9D"/>
                <ellipse cx="45" cy="72" rx="12" ry="15" fill="#FFD700" opacity="0.7"/>
                <ellipse cx="55" cy="72" rx="12" ry="15" fill="#00D4FF" opacity="0.7"/>
                <!-- 翅膀 -->
                <ellipse cx="32" cy="72" rx="8" ry="14" fill="#00D4A8" class="wing-flap"/>
                <ellipse cx="68" cy="72" rx="8" ry="14" fill="#00D4A8" class="wing-flap"/>
                <!-- 脚 -->
                <line x1="44" y1="92" x2="40" y2="98" stroke="#FFA500" stroke-width="3"/>
                <line x1="44" y1="92" x2="48" y2="98" stroke="#FFA500" stroke-width="3"/>
                <line x1="56" y1="92" x2="52" y2="98" stroke="#FFA500" stroke-width="3"/>
                <line x1="56" y1="92" x2="60" y2="98" stroke="#FFA500" stroke-width="3"/>
            </svg>`,
            
            kangaroo: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="36" rx="24" ry="26" fill="#D4A574"/>
                <!-- 超大长耳朵（袋鼠特征） -->
                <ellipse cx="32" cy="20" rx="11" ry="28" fill="#D4A574" class="ear-wiggle-left"/>
                <ellipse cx="68" cy="20" rx="11" ry="28" fill="#D4A574" class="ear-wiggle-right"/>
                <ellipse cx="32" cy="24" rx="6" ry="22" fill="#E8C5A0"/>
                <ellipse cx="68" cy="24" rx="6" ry="22" fill="#E8C5A0"/>
                <!-- 耳朵尖 -->
                <ellipse cx="32" cy="8" rx="6" ry="8" fill="#D4A574" class="ear-wiggle-left"/>
                <ellipse cx="68" cy="8" rx="6" ry="8" fill="#D4A574" class="ear-wiggle-right"/>
                <!-- 大眼睛 -->
                <circle cx="40" cy="36" r="6" fill="#000" class="eye-blink"/>
                <circle cx="40" cy="33" r="3" fill="#FFF"/>
                <circle cx="41" cy="32" r="1.5" fill="#FFF"/>
                <circle cx="60" cy="36" r="6" fill="#000" class="eye-blink"/>
                <circle cx="60" cy="33" r="3" fill="#FFF"/>
                <circle cx="61" cy="32" r="1.5" fill="#FFF"/>
                <!-- 腮红 -->
                <circle cx="30" cy="44" r="6" fill="#FFB380" opacity="0.6"/>
                <circle cx="70" cy="44" r="6" fill="#FFB380" opacity="0.6"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="48" rx="4" ry="4" fill="#8B6B4A"/>
                <circle cx="49" cy="47" r="1.5" fill="#FFF" opacity="0.5"/>
                <!-- 嘴巴 -->
                <path d="M 50 48 L 50 52" stroke="#8B6B4A" stroke-width="2"/>
                <path d="M 42 52 Q 50 56 58 52" stroke="#8B6B4A" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="73" rx="17" ry="19" fill="#D4A574"/>
                <!-- 育儿袋（会动） -->
                <path d="M 38 68 Q 38 77 50 82 Q 62 77 62 68" stroke="#8B6B4A" stroke-width="2" fill="none"/>
                <ellipse cx="50" cy="74" rx="9" ry="7" fill="#E8C5A0"/>
                <!-- 小宝宝探头（会眨眼） -->
                <circle cx="50" cy="73" r="5" fill="#D4A574"/>
                <circle cx="48" cy="72" r="1.5" fill="#000" class="eye-blink"/>
                <circle cx="52" cy="72" r="1.5" fill="#000" class="eye-blink"/>
                <path d="M 48 75 Q 50 76 52 75" stroke="#8B6B4A" stroke-width="1" fill="none"/>
                <!-- 手 -->
                <ellipse cx="35" cy="71" rx="6" ry="11" fill="#D4A574"/>
                <ellipse cx="65" cy="71" rx="6" ry="11" fill="#D4A574"/>
                <!-- 大脚（跳跃动画） -->
                <ellipse cx="44" cy="94" rx="9" ry="6" fill="#8B6B4A"/>
                <ellipse cx="56" cy="94" rx="9" ry="6" fill="#8B6B4A"/>
            </svg>`,
            
            shrimp: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="48" cy="38" rx="26" ry="24" fill="#FF8C6B"/>
                <!-- 触须 -->
                <path d="M 35 20 Q 30 10 28 8" stroke="#FF6B4A" stroke-width="2" fill="none" stroke-linecap="round" class="ear-wiggle-left"/>
                <path d="M 40 20 Q 38 10 36 8" stroke="#FF6B4A" stroke-width="2" fill="none" stroke-linecap="round" class="ear-wiggle-right"/>
                <circle cx="28" cy="8" r="2" fill="#FF6B4A"/>
                <circle cx="36" cy="8" r="2" fill="#FF6B4A"/>
                <!-- 眼睛 -->
                <circle cx="38" cy="34" r="6" fill="#000"/>
                <circle cx="38" cy="32" r="3" fill="#FFF"/>
                <circle cx="58" cy="34" r="6" fill="#000"/>
                <circle cx="58" cy="32" r="3" fill="#FFF"/>
                <!-- 嘴部 -->
                <path d="M 42 46 Q 48 50 54 46" stroke="#FF6B4A" stroke-width="1.5" fill="none"/>
                <!-- 虾壳纹理 -->
                <path d="M 35 30 Q 40 32 45 30" stroke="#FF6B4A" stroke-width="1" fill="none" opacity="0.5"/>
                <path d="M 35 36 Q 40 38 45 36" stroke="#FF6B4A" stroke-width="1" fill="none" opacity="0.5"/>
                <path d="M 35 42 Q 40 44 45 42" stroke="#FF6B4A" stroke-width="1" fill="none" opacity="0.5"/>
                <!-- 弯曲的身体 -->
                <ellipse cx="46" cy="68" rx="14" ry="16" fill="#FF8C6B"/>
                <path d="M 38 60 Q 42 64 46 68" stroke="#FF6B4A" stroke-width="1" fill="none"/>
                <path d="M 38 66 Q 42 70 46 74" stroke="#FF6B4A" stroke-width="1" fill="none"/>
                <ellipse cx="42" cy="84" rx="12" ry="12" fill="#FF8C6B"/>
                <path d="M 36 78 Q 40 82 44 86" stroke="#FF6B4A" stroke-width="1" fill="none"/>
                <!-- 小腿 -->
                <line x1="34" y1="68" x2="28" y2="70" stroke="#FF6B4A" stroke-width="2"/>
                <line x1="36" y1="72" x2="30" y2="76" stroke="#FF6B4A" stroke-width="2"/>
                <line x1="58" y1="68" x2="64" y2="70" stroke="#FF6B4A" stroke-width="2"/>
                <line x1="56" y1="72" x2="62" y2="76" stroke="#FF6B4A" stroke-width="2"/>
                <!-- 尾巴 -->
                <path d="M 38 90 L 32 96 L 38 94 L 44 100 L 44 94 L 50 98 L 46 92" fill="#FF8C6B" opacity="0.9"/>
            </svg>`,
            
            dolphin: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="38" rx="28" ry="26" fill="#87CEEB"/>
                <!-- 嘴巴 -->
                <ellipse cx="38" cy="50" rx="10" ry="6" fill="#87CEEB"/>
                <path d="M 28 50 Q 32 52 36 50" stroke="#6BA8C8" stroke-width="1.5" fill="none"/>
                <!-- 眼睛 -->
                <circle cx="50" cy="32" r="6" fill="#FFF"/>
                <circle cx="50" cy="32" r="4" fill="#000" class="eye-blink"/>
                <circle cx="51" cy="30" r="2" fill="#FFF"/>
                <circle cx="68" cy="32" r="6" fill="#FFF"/>
                <circle cx="68" cy="32" r="4" fill="#000" class="eye-blink"/>
                <circle cx="69" cy="30" r="2" fill="#FFF"/>
                <!-- 微笑 -->
                <path d="M 32 52 Q 36 56 40 54" stroke="#6BA8C8" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 肚子 -->
                <ellipse cx="50" cy="42" rx="18" ry="16" fill="#B0E0E6"/>
                <!-- 背鳍 -->
                <path d="M 60 20 Q 68 16 70 22" fill="#87CEEB"/>
                <!-- 流线型身体 -->
                <ellipse cx="48" cy="75" rx="18" ry="20" fill="#87CEEB"/>
                <ellipse cx="48" cy="75" rx="14" ry="16" fill="#B0E0E6"/>
                <!-- 鳍 -->
                <ellipse cx="32" cy="72" rx="10" ry="8" fill="#87CEEB" class="wing-flap"/>
                <ellipse cx="64" cy="72" rx="10" ry="8" fill="#87CEEB" class="wing-flap"/>
                <!-- 尾巴 -->
                <path d="M 38 90 L 30 92 L 36 94 L 32 98 L 40 96 L 38 100 L 48 96 L 46 92 L 56 96 L 54 92" fill="#87CEEB"/>
            </svg>`,
            
            turtle: `<svg viewBox="0 0 100 100" class="theme-svg cute-svg">
                <!-- 龟壳（带动画） -->
                <ellipse cx="50" cy="56" rx="31" ry="27" fill="#8B7355"/>
                <ellipse cx="50" cy="56" rx="27" ry="23" fill="#A89968"/>
                <!-- 壳纹（带脉冲） -->
                <circle cx="50" cy="51" r="9" fill="#8B7355" opacity="0.6"/>
                <circle cx="37" cy="59" r="7" fill="#8B7355" opacity="0.5" class="pulse-glow"/>
                <circle cx="63" cy="59" r="7" fill="#8B7355" opacity="0.5" class="pulse-glow"/>
                <circle cx="43" cy="67" r="6" fill="#8B7355" opacity="0.5"/>
                <circle cx="57" cy="67" r="6" fill="#8B7355" opacity="0.5"/>
                <!-- 壳边缘装饰 -->
                <ellipse cx="50" cy="56" rx="29" ry="25" fill="none" stroke="#6B5335" stroke-width="1.5" opacity="0.5"/>
                <!-- 大头从壳里探出（会缩回） -->
                <ellipse cx="50" cy="24" rx="19" ry="22" fill="#9ACD32" class="turtle-head"/>
                <ellipse cx="50" cy="26" rx="16" ry="18" fill="#B8E65C"/>
                <!-- 大眼睛 -->
                <circle cx="42" cy="22" r="5" fill="#000" class="eye-blink"/>
                <circle cx="42" cy="20" r="2.5" fill="#FFF"/>
                <circle cx="43" cy="19" r="1.5" fill="#FFF"/>
                <circle cx="58" cy="22" r="5" fill="#000" class="eye-blink"/>
                <circle cx="58" cy="20" r="2.5" fill="#FFF"/>
                <circle cx="59" cy="19" r="1.5" fill="#FFF"/>
                <!-- 腮红 -->
                <circle cx="36" cy="28" r="4" fill="#8B9B4B" opacity="0.5"/>
                <circle cx="64" cy="28" r="4" fill="#8B9B4B" opacity="0.5"/>
                <!-- 微笑 -->
                <path d="M 42 32 Q 50 36 58 32" stroke="#6B8E23" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- 前腿（会动） -->
                <ellipse cx="26" cy="61" rx="9" ry="13" fill="#9ACD32" class="turtle-leg"/>
                <ellipse cx="74" cy="61" rx="9" ry="13" fill="#9ACD32" class="turtle-leg"/>
                <!-- 爪子 -->
                <ellipse cx="26" cy="72" rx="6" ry="4" fill="#8B9B4B"/>
                <ellipse cx="74" cy="72" rx="6" ry="4" fill="#8B9B4B"/>
                <!-- 后腿 -->
                <ellipse cx="31" cy="77" rx="8" ry="11" fill="#9ACD32"/>
                <ellipse cx="69" cy="77" rx="8" ry="11" fill="#9ACD32"/>
                <!-- 小尾巴 -->
                <ellipse cx="50" cy="82" rx="5" ry="7" fill="#9ACD32"/>
            </svg>`
        };
        return svgs[themeId] || '';
    }
    
    // ===== 明星版SVG =====
    getStarThemeSVG(themeId) {
        const svgs = {
            liying: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 大头（真实比例） -->
                <ellipse cx="50" cy="35" rx="22" ry="24" fill="#FFE4C4"/>
                <!-- 脸部高光 -->
                <ellipse cx="44" cy="32" rx="8" ry="10" fill="#FFF" opacity="0.4"/>
                <ellipse cx="56" cy="32" rx="8" ry="10" fill="#FFF" opacity="0.4"/>
                <!-- 真实长发（会飘动） -->
                <ellipse cx="28" cy="34" rx="13" ry="32" fill="#2C1810" class="hair-sway-left"/>
                <ellipse cx="72" cy="34" rx="13" ry="32" fill="#2C1810" class="hair-sway-right"/>
                <ellipse cx="50" cy="20" rx="24" ry="14" fill="#2C1810" class="hair-wave"/>
                <!-- 发丝细节 -->
                <path d="M 16 32 Q 18 40 20 48" stroke="#1A0C08" stroke-width="1.5" fill="none"/>
                <path d="M 20 30 Q 22 38 24 46" stroke="#1A0C08" stroke-width="1.5" fill="none"/>
                <path d="M 84 32 Q 82 40 80 48" stroke="#1A0C08" stroke-width="1.5" fill="none"/>
                <path d="M 80 30 Q 78 38 76 46" stroke="#1A0C08" stroke-width="1.5" fill="none"/>
                <!-- 刘海层次 -->
                <path d="M 30 20 Q 34 16 38 20" stroke="#2C1810" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M 40 20 Q 44 16 48 20" stroke="#2C1810" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M 50 20 Q 54 16 58 20" stroke="#2C1810" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <path d="M 60 20 Q 64 16 68 20" stroke="#2C1810" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <!-- 真实眉毛 -->
                <path d="M 36 28 Q 41 27 45 28" stroke="#4A3428" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 55 28 Q 59 27 64 28" stroke="#4A3428" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 眼睛（真实风格） -->
                <ellipse cx="40" cy="34" rx="5" ry="6" fill="#2C1810"/>
                <ellipse cx="40" cy="33" rx="3" ry="4" fill="#4A3428"/>
                <circle cx="40" cy="32" r="2" fill="#FFF"/>
                <circle cx="41" cy="31" r="1" fill="#FFF"/>
                <ellipse cx="60" cy="34" rx="5" ry="6" fill="#2C1810"/>
                <ellipse cx="60" cy="33" rx="3" ry="4" fill="#4A3428"/>
                <circle cx="60" cy="32" r="2" fill="#FFF"/>
                <circle cx="61" cy="31" r="1" fill="#FFF"/>
                <!-- 上眼线 -->
                <path d="M 35 31 Q 40 30 45 31" stroke="#2C1810" stroke-width="1.5" fill="none"/>
                <path d="M 55 31 Q 60 30 65 31" stroke="#2C1810" stroke-width="1.5" fill="none"/>
                <!-- 睫毛 -->
                <line x1="36" y1="31" x2="33" y2="28" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="44" y1="31" x2="47" y2="28" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="56" y1="31" x2="53" y2="28" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="64" y1="31" x2="67" y2="28" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 腮红（更自然） -->
                <ellipse cx="32" cy="42" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
                <ellipse cx="68" cy="42" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
                <!-- 鼻子（立体感） -->
                <ellipse cx="50" cy="42" rx="2" ry="3" fill="#E8B098" opacity="0.4"/>
                <line x1="50" y1="39" x2="50" y2="43" stroke="#D4A89A" stroke-width="0.5" opacity="0.3"/>
                <!-- 嘴巴（更立体） -->
                <ellipse cx="50" cy="48" rx="5" ry="3" fill="#FF69B4" opacity="0.3"/>
                <path d="M 45 48 Q 50 51 55 48" stroke="#FF69B4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <!-- 下唇高光 -->
                <ellipse cx="50" cy="49" rx="3" ry="1" fill="#FFF" opacity="0.4"/>
                <!-- 小身体（真实衣服） -->
                <ellipse cx="50" cy="75" rx="19" ry="22" fill="#FFB6D9"/>
                <!-- 衣服阴影 -->
                <ellipse cx="50" cy="80" rx="16" ry="18" fill="#E91E63" opacity="0.2"/>
                <!-- 领口 -->
                <ellipse cx="50" cy="62" rx="10" ry="3" fill="#FFF" opacity="0.8"/>
                <!-- 裙子褶皱 -->
                <path d="M 35 70 Q 38 75 35 80" stroke="#E91E63" stroke-width="1" fill="none" opacity="0.3"/>
                <path d="M 44 70 Q 47 75 44 80" stroke="#E91E63" stroke-width="1" fill="none" opacity="0.3"/>
                <path d="M 56 70 Q 53 75 56 80" stroke="#E91E63" stroke-width="1" fill="none" opacity="0.3"/>
                <path d="M 65 70 Q 62 75 65 80" stroke="#E91E63" stroke-width="1" fill="none" opacity="0.3"/>
                <!-- 手（真实肤色） -->
                <ellipse cx="34" cy="74" rx="6" ry="13" fill="#FFE4C4"/>
                <ellipse cx="66" cy="74" rx="6" ry="13" fill="#FFE4C4"/>
                <!-- 手指暗示 -->
                <ellipse cx="34" cy="84" rx="4" ry="3" fill="#FFDAB9"/>
                <ellipse cx="66" cy="84" rx="4" ry="3" fill="#FFDAB9"/>
                <!-- 脚 -->
                <ellipse cx="44" cy="95" rx="6" ry="4" fill="#FFB6D9"/>
                <ellipse cx="56" cy="95" rx="6" ry="4" fill="#FFB6D9"/>
            </svg>`,
            
            kobe: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <circle cx="50" cy="40" r="22" fill="#8B4513"/>
                <ellipse cx="50" cy="28" rx="24" ry="15" fill="#000"/>
                <circle cx="44" cy="38" r="3" fill="#000"/>
                <circle cx="56" cy="38" r="3" fill="#000"/>
                <path d="M 40 48 Q 50 50 60 48" stroke="#654321" stroke-width="2" fill="none"/>
                <ellipse cx="50" cy="70" rx="18" ry="25" fill="#FDB827"/>
                <text x="50" y="72" font-size="20" text-anchor="middle" fill="#552583" font-weight="bold">24</text>
                <text x="50" y="92" font-size="7" text-anchor="middle" fill="#000" font-weight="bold">KOBE</text>
            </svg>`,
            
            taylor: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 大头（真实比例） -->
                <ellipse cx="50" cy="35" rx="22" ry="24" fill="#FFE4C4"/>
                <!-- 脸部高光 -->
                <ellipse cx="45" cy="30" rx="9" ry="12" fill="#FFF" opacity="0.3"/>
                <!-- 金色波浪卷发（会飘动） -->
                <ellipse cx="30" cy="32" rx="15" ry="30" fill="#FFD700" class="hair-sway-left"/>
                <ellipse cx="70" cy="32" rx="15" ry="30" fill="#FFD700" class="hair-sway-right"/>
                <ellipse cx="50" cy="18" rx="26" ry="13" fill="#FFD700" class="hair-wave"/>
                <!-- 卷发层次（会弹跳） -->
                <circle cx="25" cy="25" r="6" fill="#FFC700" class="accessory-bounce"/>
                <circle cx="75" cy="25" r="6" fill="#FFC700" class="accessory-bounce"/>
                <circle cx="32" cy="40" r="5" fill="#FFC700" class="accessory-bounce"/>
                <circle cx="68" cy="40" r="5" fill="#FFC700" class="accessory-bounce"/>
                <circle cx="28" cy="48" r="5" fill="#FFB700" class="accessory-bounce"/>
                <circle cx="72" cy="48" r="5" fill="#FFB700" class="accessory-bounce"/>
                <!-- 发丝 -->
                <path d="M 18 35 Q 20 42 22 50" stroke="#E8B800" stroke-width="1.5" fill="none"/>
                <path d="M 82 35 Q 80 42 78 50" stroke="#E8B800" stroke-width="1.5" fill="none"/>
                <!-- 精致眉毛 -->
                <path d="M 36 28 Q 41 27 46 28" stroke="#8B7355" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 54 28 Q 59 27 64 28" stroke="#8B7355" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 美丽的蓝眼睛 -->
                <ellipse cx="40" cy="34" rx="5" ry="7" fill="#4169E1"/>
                <ellipse cx="40" cy="33" rx="3" ry="5" fill="#5F89ED"/>
                <circle cx="40" cy="31" r="2.5" fill="#FFF" class="sparkle"/>
                <circle cx="41" cy="30" r="1.5" fill="#FFF"/>
                <ellipse cx="60" cy="34" rx="5" ry="7" fill="#4169E1"/>
                <ellipse cx="60" cy="33" rx="3" ry="5" fill="#5F89ED"/>
                <circle cx="60" cy="31" r="2.5" fill="#FFF" class="sparkle"/>
                <circle cx="61" cy="30" r="1.5" fill="#FFF"/>
                <!-- 眼线 -->
                <path d="M 35 32 Q 40 31 45 32" stroke="#2C1810" stroke-width="1.5" fill="none"/>
                <path d="M 55 32 Q 60 31 65 32" stroke="#2C1810" stroke-width="1.5" fill="none"/>
                <!-- 长睫毛 -->
                <line x1="36" y1="31" x2="33" y2="27" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="44" y1="31" x2="47" y2="27" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="56" y1="31" x2="53" y2="27" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="64" y1="31" x2="67" y2="27" stroke="#2C1810" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 自然腮红 -->
                <ellipse cx="32" cy="42" rx="7" ry="5" fill="#FFC0CB" opacity="0.5"/>
                <ellipse cx="68" cy="42" rx="7" ry="5" fill="#FFC0CB" opacity="0.5"/>
                <!-- 鼻子（立体） -->
                <ellipse cx="50" cy="42" rx="2" ry="3" fill="#E8B098" opacity="0.4"/>
                <line x1="50" y1="39" x2="50" y2="43" stroke="#D4A89A" stroke-width="0.5" opacity="0.3"/>
                <!-- 红唇 -->
                <ellipse cx="50" cy="49" rx="6" ry="3.5" fill="#DC143C" opacity="0.8"/>
                <path d="M 44 49 Q 50 52 56 49" stroke="#DC143C" stroke-width="3" fill="none" stroke-linecap="round"/>
                <ellipse cx="50" cy="50" rx="4" ry="1.5" fill="#FFF" opacity="0.3"/>
                <!-- 小身体（演出服） -->
                <ellipse cx="50" cy="75" rx="19" ry="22" fill="#FF69B4"/>
                <!-- 亮片装饰（更多） -->
                <circle cx="42" cy="66" r="2" fill="#FFD700" opacity="0.9" class="sparkle"/>
                <circle cx="48" cy="67" r="2" fill="#FFD700" opacity="0.9" class="sparkle"/>
                <circle cx="52" cy="67" r="2" fill="#FFD700" opacity="0.9" class="sparkle"/>
                <circle cx="58" cy="66" r="2" fill="#FFD700" opacity="0.9" class="sparkle"/>
                <circle cx="45" cy="72" r="1.5" fill="#FFD700" opacity="0.8" class="sparkle"/>
                <circle cx="55" cy="72" r="1.5" fill="#FFD700" opacity="0.8" class="sparkle"/>
                <circle cx="40" cy="78" r="1.5" fill="#FFD700" opacity="0.7" class="sparkle"/>
                <circle cx="60" cy="78" r="1.5" fill="#FFD700" opacity="0.7" class="sparkle"/>
                <!-- 手 -->
                <ellipse cx="34" cy="74" rx="6" ry="13" fill="#FFE4C4"/>
                <ellipse cx="66" cy="74" rx="6" ry="13" fill="#FFE4C4"/>
                <!-- 手部细节 -->
                <ellipse cx="34" cy="84" rx="4" ry="3" fill="#FFDAB9"/>
                <ellipse cx="66" cy="84" rx="4" ry="3" fill="#FFDAB9"/>
                <!-- 脚（高跟鞋） -->
                <ellipse cx="44" cy="95" rx="6" ry="5" fill="#DC143C"/>
                <ellipse cx="56" cy="95" rx="6" ry="5" fill="#DC143C"/>
                <rect x="41" y="93" width="6" height="2" fill="#A00" opacity="0.6"/>
                <rect x="53" y="93" width="6" height="2" fill="#A00" opacity="0.6"/>
            </svg>`,
            
            messi: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <circle cx="50" cy="38" r="20" fill="#FFE4C4"/>
                <ellipse cx="50" cy="25" rx="22" ry="15" fill="#4B0082"/>
                <rect x="42" y="24" width="16" height="4" fill="#000"/>
                <circle cx="44" cy="36" r="2" fill="#000"/>
                <circle cx="56" cy="36" r="2" fill="#000"/>
                <path d="M 42 46 Q 50 48 58 46" stroke="#000" stroke-width="1.5" fill="none"/>
                <ellipse cx="50" cy="72" rx="18" ry="26" fill="#75AADB"/>
                <rect x="44" y="65" width="12" height="3" fill="#FFF"/>
                <text x="50" y="74" font-size="14" text-anchor="middle" fill="#FFF" font-weight="bold">10</text>
                <text x="50" y="95" font-size="7" text-anchor="middle" fill="#000" font-weight="bold">MESSI</text>
            </svg>`,
            
            musk: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <circle cx="50" cy="40" r="22" fill="#FFE4C4"/>
                <ellipse cx="50" cy="28" rx="20" ry="12" fill="#4B0082"/>
                <rect x="40" y="26" width="20" height="3" fill="#000"/>
                <circle cx="44" cy="38" r="3" fill="#000"/>
                <circle cx="56" cy="38" r="3" fill="#000"/>
                <path d="M 40 48 Q 50 50 60 48" stroke="#000" stroke-width="1.5" fill="none"/>
                <ellipse cx="50" cy="72" rx="18" ry="24" fill="#000"/>
                <circle cx="45" cy="68" r="2" fill="#00D4FF" class="sparkle"/>
                <circle cx="55" cy="70" r="2" fill="#00D4FF" class="sparkle"/>
                <text x="50" y="94" font-size="6" text-anchor="middle" fill="#000" font-weight="bold">TESLA</text>
            </svg>`,
            
            jobs: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <circle cx="50" cy="40" r="22" fill="#FFE4C4"/>
                <ellipse cx="50" cy="28" rx="22" ry="12" fill="#000"/>
                <rect x="35" y="35" width="12" height="3" fill="#000" rx="2"/>
                <rect x="53" y="35" width="12" height="3" fill="#000" rx="2"/>
                <circle cx="44" cy="42" r="3" fill="#000"/>
                <circle cx="56" cy="42" r="3" fill="#000"/>
                <rect x="40" y="50" width="20" height="2" fill="#999"/>
                <ellipse cx="50" cy="72" rx="18" ry="24" fill="#000"/>
                <rect x="40" cy="68" width="20" height="2" fill="#FFF"/>
                <circle cx="50" cy="75" r="3" fill="#FFF" class="sparkle"/>
                <text x="50" y="96" font-size="6" text-anchor="middle" fill="#666" font-weight="bold">APPLE</text>
            </svg>`,
            
            beauty1: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 甜美少女 -->
                <!-- 大头（真实比例） -->
                <ellipse cx="50" cy="34" rx="23" ry="26" fill="#FFDFD3"/>
                <!-- 脸部高光 -->
                <ellipse cx="44" cy="30" rx="10" ry="12" fill="#FFF" opacity="0.35"/>
                <!-- 双马尾（蓬松会摇摆） -->
                <ellipse cx="20" cy="32" rx="11" ry="26" fill="#4A2810" class="hair-sway-left"/>
                <ellipse cx="80" cy="32" rx="11" ry="26" fill="#4A2810" class="hair-sway-right"/>
                <circle cx="20" cy="44" r="9" fill="#4A2810" class="accessory-bounce"/>
                <circle cx="80" cy="44" r="9" fill="#4A2810" class="accessory-bounce"/>
                <circle cx="18" cy="50" r="7" fill="#5A3820" class="accessory-bounce"/>
                <circle cx="82" cy="50" r="7" fill="#5A3820" class="accessory-bounce"/>
                <!-- 可爱发饰蝴蝶结（会弹跳） -->
                <circle cx="20" cy="18" r="6" fill="#FF69B4" class="accessory-bounce"/>
                <circle cx="80" cy="18" r="6" fill="#FF69B4" class="accessory-bounce"/>
                <circle cx="22" cy="16" r="2.5" fill="#FFB6D9" class="sparkle"/>
                <circle cx="78" cy="16" r="2.5" fill="#FFB6D9" class="sparkle"/>
                <ellipse cx="20" cy="18" rx="3" ry="2" fill="#FFF" opacity="0.6" class="sparkle"/>
                <ellipse cx="80" cy="18" rx="3" ry="2" fill="#FFF" opacity="0.6" class="sparkle"/>
                <!-- 齐刘海 -->
                <ellipse cx="50" cy="16" rx="25" ry="10" fill="#4A2810"/>
                <path d="M 30 16 Q 34 12 38 16" stroke="#4A2810" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 42 16 Q 46 12 50 16" stroke="#4A2810" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 54 16 Q 58 12 62 16" stroke="#4A2810" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 66 16 Q 70 12 74 16" stroke="#4A2810" stroke-width="3" fill="none" stroke-linecap="round"/>
                <!-- 细眉毛 -->
                <path d="M 36 26 Q 41 25 46 26" stroke="#8B4513" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 54 26 Q 59 25 64 26" stroke="#8B4513" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- 超大动漫眼 -->
                <ellipse cx="40" cy="32" rx="6" ry="9" fill="#000"/>
                <ellipse cx="40" cy="31" rx="4" ry="6" fill="#5A3428"/>
                <circle cx="40" cy="29" r="3.5" fill="#FFF" class="sparkle"/>
                <circle cx="41" cy="28" r="2" fill="#FFF"/>
                <circle cx="38" cy="32" r="1.5" fill="#FFF" opacity="0.7"/>
                <ellipse cx="60" cy="32" rx="6" ry="9" fill="#000"/>
                <ellipse cx="60" cy="31" rx="4" ry="6" fill="#5A3428"/>
                <circle cx="60" cy="29" r="3.5" fill="#FFF" class="sparkle"/>
                <circle cx="61" cy="28" r="2" fill="#FFF"/>
                <circle cx="58" cy="32" r="1.5" fill="#FFF" opacity="0.7"/>
                <!-- 长睫毛 -->
                <line x1="35" y1="29" x2="31" y2="26" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="45" y1="29" x2="49" y2="26" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="55" y1="29" x2="51" y2="26" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="65" y1="29" x2="69" y2="26" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 大腮红 -->
                <ellipse cx="28" cy="42" rx="8" ry="6" fill="#FFB6C1" opacity="0.8"/>
                <ellipse cx="72" cy="42" rx="8" ry="6" fill="#FFB6C1" opacity="0.8"/>
                <circle cx="26" cy="40" r="3" fill="#FF9AA2" opacity="0.6"/>
                <circle cx="74" cy="40" r="3" fill="#FF9AA2" opacity="0.6"/>
                <!-- 小鼻子 -->
                <ellipse cx="50" cy="42" rx="2" ry="3" fill="#E8B098" opacity="0.5"/>
                <!-- 甜美微笑 -->
                <ellipse cx="50" cy="48" rx="5" ry="3" fill="#FF69B4" opacity="0.7"/>
                <path d="M 44 48 Q 50 52 56 48" stroke="#FF69B4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <ellipse cx="50" cy="49" rx="3" ry="1.5" fill="#FFF" opacity="0.4"/>
                <!-- 小身体（连衣裙） -->
                <ellipse cx="50" cy="76" rx="20" ry="22" fill="#FFB6D9"/>
                <!-- 裙子蝴蝶结 -->
                <circle cx="46" cy="64" r="3" fill="#FF69B4"/>
                <circle cx="54" cy="64" r="3" fill="#FF69B4"/>
                <circle cx="50" cy="64" r="2" fill="#FFD700"/>
                <!-- 爱心图案 -->
                <path d="M 50 70 Q 48 68 46 70 Q 44 72 46 74 Q 48 76 50 78 Q 52 76 54 74 Q 56 72 54 70 Q 52 68 50 70" fill="#FF69B4" opacity="0.6"/>
                <!-- 花边装饰 -->
                <circle cx="38" cy="80" r="1.5" fill="#FFF" opacity="0.7"/>
                <circle cx="44" cy="82" r="1.5" fill="#FFF" opacity="0.7"/>
                <circle cx="56" cy="82" r="1.5" fill="#FFF" opacity="0.7"/>
                <circle cx="62" cy="80" r="1.5" fill="#FFF" opacity="0.7"/>
                <!-- 手 -->
                <ellipse cx="33" cy="76" rx="6" ry="14" fill="#FFDFD3"/>
                <ellipse cx="67" cy="76" rx="6" ry="14" fill="#FFDFD3"/>
                <!-- 手指 -->
                <ellipse cx="33" cy="87" rx="4" ry="3" fill="#FFCFC3"/>
                <ellipse cx="67" cy="87" rx="4" ry="3" fill="#FFCFC3"/>
                <!-- 脚（可爱小鞋） -->
                <ellipse cx="44" cy="96" rx="7" ry="5" fill="#FFB6D9"/>
                <ellipse cx="56" cy="96" rx="7" ry="5" fill="#FFB6D9"/>
                <ellipse cx="44" cy="94" rx="5" ry="2" fill="#FFF" opacity="0.6"/>
                <ellipse cx="56" cy="94" rx="5" ry="2" fill="#FFF" opacity="0.6"/>
            </svg>`,
            
            beauty2: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 性感御姐 -->
                <!-- 大头 -->
                <ellipse cx="50" cy="38" rx="24" ry="26" fill="#F5D5C8"/>
                <!-- 长发（会飘动） -->
                <ellipse cx="28" cy="38" rx="14" ry="34" fill="#2C1810" class="hair-sway-left"/>
                <ellipse cx="72" cy="38" rx="14" ry="34" fill="#2C1810" class="hair-sway-right"/>
                <ellipse cx="50" cy="20" rx="26" ry="12" fill="#2C1810" class="hair-wave"/>
                <!-- 侧边卷发（会摆动） -->
                <ellipse cx="24" cy="50" rx="8" ry="12" fill="#4A2810" class="accessory-bounce"/>
                <ellipse cx="76" cy="50" rx="8" ry="12" fill="#4A2810" class="accessory-bounce"/>
                <!-- 眉毛（较细） -->
                <path d="M 36 30 Q 42 29 47 30" stroke="#2C1810" stroke-width="1.8" fill="none"/>
                <path d="M 53 30 Q 58 29 64 30" stroke="#2C1810" stroke-width="1.8" fill="none"/>
                <!-- 眼睛 -->
                <ellipse cx="40" cy="36" rx="4" ry="6" fill="#4A2810"/>
                <circle cx="40" cy="34" r="2" fill="#FFF"/>
                <ellipse cx="60" cy="36" rx="4" ry="6" fill="#4A2810"/>
                <circle cx="60" cy="34" r="2" fill="#FFF"/>
                <!-- 长睫毛 -->
                <line x1="37" y1="32" x2="34" y2="29" stroke="#000" stroke-width="1.5"/>
                <line x1="43" y1="32" x2="46" y2="29" stroke="#000" stroke-width="1.5"/>
                <line x1="57" y1="32" x2="54" y2="29" stroke="#000" stroke-width="1.5"/>
                <line x1="63" y1="32" x2="66" y2="29" stroke="#000" stroke-width="1.5"/>
                <!-- 腮红 -->
                <circle cx="32" cy="44" r="5" fill="#E8A0A0" opacity="0.6"/>
                <circle cx="68" cy="44" r="5" fill="#E8A0A0" opacity="0.6"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="46" rx="2" ry="3" fill="#D4A89A" opacity="0.7"/>
                <!-- 性感嘴唇 -->
                <ellipse cx="50" cy="52" rx="6" ry="3" fill="#DC143C"/>
                <path d="M 44 52 Q 50 56 56 52" stroke="#B91836" stroke-width="1" fill="none"/>
                <!-- 丰满身体 -->
                <ellipse cx="50" cy="78" rx="22" ry="20" fill="#E91E63"/>
                <!-- 胸部曲线 -->
                <ellipse cx="42" cy="70" rx="10" ry="8" fill="#E91E63" opacity="0.8"/>
                <ellipse cx="58" cy="70" rx="10" ry="8" fill="#E91E63" opacity="0.8"/>
                <path d="M 35 70 Q 42 66 50 68 Q 58 66 65 70" stroke="#C2185B" stroke-width="1.5" fill="none"/>
                <!-- 装饰 -->
                <ellipse cx="50" cy="66" rx="3" ry="4" fill="#FFD700" opacity="0.9"/>
                <!-- 手 -->
                <ellipse cx="32" cy="78" rx="7" ry="14" fill="#F5D5C8"/>
                <ellipse cx="68" cy="78" rx="7" ry="14" fill="#F5D5C8"/>
                <!-- 脚 -->
                <ellipse cx="44" cy="96" rx="6" ry="4" fill="#C2185B"/>
                <ellipse cx="56" cy="96" rx="6" ry="4" fill="#C2185B"/>
            </svg>`,
            
            anime1: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 樱花少女 -->
                <!-- 大头 -->
                <ellipse cx="50" cy="36" rx="26" ry="28" fill="#FFE6E6"/>
                <!-- 樱花粉发（会飘动） -->
                <ellipse cx="30" cy="32" rx="16" ry="32" fill="#FFB6D9" class="hair-sway-left"/>
                <ellipse cx="70" cy="32" rx="16" ry="32" fill="#FFB6D9" class="hair-sway-right"/>
                <ellipse cx="50" cy="18" rx="28" ry="14" fill="#FFB6D9" class="hair-wave"/>
                <!-- 呆毛（会摇摆） -->
                <path d="M 50 10 Q 48 2 50 0" stroke="#FFB6D9" stroke-width="3" fill="none" stroke-linecap="round" class="ear-wiggle"/>
                <!-- 樱花装饰（会转动） -->
                <circle cx="30" cy="22" r="4" fill="#FF69B4" class="sparkle"/>
                <circle cx="70" cy="22" r="4" fill="#FF69B4" class="sparkle"/>
                <circle cx="28" cy="20" r="1.5" fill="#FFF" class="sparkle"/>
                <circle cx="72" cy="20" r="1.5" fill="#FFF" class="sparkle"/>
                <!-- 动漫大眼 -->
                <ellipse cx="40" cy="34" rx="6" ry="10" fill="#000"/>
                <ellipse cx="40" cy="32" rx="4" ry="6" fill="#FF69B4"/>
                <circle cx="41" cy="30" r="3" fill="#FFF"/>
                <ellipse cx="60" cy="34" rx="6" ry="10" fill="#000"/>
                <ellipse cx="60" cy="32" rx="4" ry="6" fill="#FF69B4"/>
                <circle cx="61" cy="30" r="3" fill="#FFF"/>
                <!-- 眉毛 -->
                <path d="M 34 26 Q 40 24 46 26" stroke="#FF69B4" stroke-width="2" fill="none"/>
                <path d="M 54 26 Q 60 24 66 26" stroke="#FF69B4" stroke-width="2" fill="none"/>
                <!-- 腮红 -->
                <circle cx="28" cy="42" r="7" fill="#FFB6C1" opacity="0.8"/>
                <circle cx="72" cy="42" r="7" fill="#FFB6C1" opacity="0.8"/>
                <!-- 可爱小嘴 -->
                <ellipse cx="50" cy="48" rx="3" ry="4" fill="#FF69B4"/>
                <path d="M 46 50 Q 50 52 54 50" stroke="#FF1493" stroke-width="1.5" fill="none"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="76" rx="20" ry="22" fill="#FFD6E8"/>
                <!-- 樱花图案 -->
                <path d="M 50 70 L 52 72 L 50 74 L 48 72 Z" fill="#FF69B4"/>
                <circle cx="50" cy="72" r="2" fill="#FFF" opacity="0.8"/>
                <!-- 手 -->
                <ellipse cx="34" cy="76" rx="6" ry="14" fill="#FFE6E6"/>
                <ellipse cx="66" cy="76" rx="6" ry="14" fill="#FFE6E6"/>
                <!-- 脚 -->
                <ellipse cx="44" cy="96" rx="6" ry="4" fill="#FFB6D9"/>
                <ellipse cx="56" cy="96" rx="6" ry="4" fill="#FFB6D9"/>
            </svg>`,
            
            anime2: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 元气妹子 -->
                <!-- 大头 -->
                <ellipse cx="50" cy="36" rx="26" ry="28" fill="#FFE4D0"/>
                <!-- 活力短发（会弹跳） -->
                <ellipse cx="50" cy="22" rx="28" ry="16" fill="#FF8C69" class="accessory-bounce"/>
                <path d="M 28 24 L 24 28 L 28 28 Z" fill="#FF8C69" class="hair-sway-left"/>
                <path d="M 72 24 L 76 28 L 72 28 Z" fill="#FF8C69" class="hair-sway-right"/>
                <!-- 刘海 -->
                <path d="M 30 22 Q 34 16 38 22" stroke="#FF8C69" stroke-width="3" fill="none"/>
                <path d="M 42 22 Q 46 16 50 22" stroke="#FF8C69" stroke-width="3" fill="none"/>
                <path d="M 54 22 Q 58 16 62 22" stroke="#FF8C69" stroke-width="3" fill="none"/>
                <path d="M 66 22 Q 70 16 74 22" stroke="#FF8C69" stroke-width="3" fill="none"/>
                <!-- 发卡（会闪烁） -->
                <rect x="66" y="20" width="8" height="4" rx="2" fill="#FFD700" class="sparkle"/>
                <circle cx="70" cy="22" r="1.5" fill="#FF69B4" class="pulse-glow"/>
                <!-- 粗眉毛 -->
                <path d="M 34 28 Q 40 27 46 28" stroke="#8B4513" stroke-width="2.5" fill="none"/>
                <path d="M 54 28 Q 60 27 66 28" stroke="#8B4513" stroke-width="2.5" fill="none"/>
                <!-- 元气大眼 -->
                <ellipse cx="40" cy="34" rx="6" ry="9" fill="#000"/>
                <ellipse cx="40" cy="32" rx="4" ry="6" fill="#FF8C42"/>
                <circle cx="41" cy="30" r="3" fill="#FFF"/>
                <ellipse cx="60" cy="34" rx="6" ry="9" fill="#000"/>
                <ellipse cx="60" cy="32" rx="4" ry="6" fill="#FF8C42"/>
                <circle cx="61" cy="30" r="3" fill="#FFF"/>
                <!-- 星星眼 -->
                <path d="M 38 36 L 39 38 L 37 38 Z" fill="#FFF"/>
                <path d="M 58 36 L 59 38 L 57 38 Z" fill="#FFF"/>
                <!-- 腮红 -->
                <circle cx="28" cy="42" r="6" fill="#FF8C69" opacity="0.6"/>
                <circle cx="72" cy="42" r="6" fill="#FF8C69" opacity="0.6"/>
                <!-- 活力笑容 -->
                <ellipse cx="50" cy="48" rx="2" ry="3" fill="#FF6347" opacity="0.7"/>
                <path d="M 42 50 Q 50 56 58 50" stroke="#FF6347" stroke-width="2.5" fill="none"/>
                <!-- 小身体 -->
                <ellipse cx="50" cy="76" rx="20" ry="22" fill="#FFB347"/>
                <!-- 运动服装饰 -->
                <rect x="42" y="66" width="16" height="3" rx="1.5" fill="#FFF"/>
                <circle cx="48" cy="75" r="2" fill="#FFF" opacity="0.8"/>
                <circle cx="52" cy="75" r="2" fill="#FFF" opacity="0.8"/>
                <!-- 手 -->
                <ellipse cx="34" cy="76" rx="6" ry="14" fill="#FFE4D0"/>
                <ellipse cx="66" cy="76" rx="6" ry="14" fill="#FFE4D0"/>
                <!-- 脚（运动鞋） -->
                <ellipse cx="44" cy="96" rx="7" ry="5" fill="#FF6347"/>
                <rect x="38" y="94" width="12" height="2" rx="1" fill="#FFF"/>
                <ellipse cx="56" cy="96" rx="7" ry="5" fill="#FF6347"/>
                <rect x="50" y="94" width="12" height="2" rx="1" fill="#FFF"/>
            </svg>`,
            
            beauty3: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 爆乳女神 -->
                <!-- 大头 -->
                <ellipse cx="50" cy="34" rx="22" ry="24" fill="#FFE4D6"/>
                <!-- 性感长发（会飘动） -->
                <ellipse cx="26" cy="36" rx="14" ry="38" fill="#4A2810" class="hair-sway-left"/>
                <ellipse cx="74" cy="36" rx="14" ry="38" fill="#4A2810" class="hair-sway-right"/>
                <ellipse cx="50" cy="18" rx="24" ry="12" fill="#4A2810" class="hair-wave"/>
                <!-- 侧发（会摆动） -->
                <ellipse cx="22" cy="48" rx="10" ry="16" fill="#6A3820" class="accessory-bounce"/>
                <ellipse cx="78" cy="48" rx="10" ry="16" fill="#6A3820" class="accessory-bounce"/>
                <!-- 眉毛 -->
                <path d="M 38 26 Q 44 25 48 26" stroke="#4A2810" stroke-width="2" fill="none"/>
                <path d="M 52 26 Q 56 25 62 26" stroke="#4A2810" stroke-width="2" fill="none"/>
                <!-- 眼睛 -->
                <ellipse cx="42" cy="32" rx="4" ry="6" fill="#4A2810"/>
                <circle cx="42" cy="30" r="2" fill="#FFF"/>
                <ellipse cx="58" cy="32" rx="4" ry="6" fill="#4A2810"/>
                <circle cx="58" cy="30" r="2" fill="#FFF"/>
                <!-- 长睫毛 -->
                <line x1="39" y1="29" x2="36" y2="26" stroke="#000" stroke-width="1.5"/>
                <line x1="45" y1="29" x2="48" y2="26" stroke="#000" stroke-width="1.5"/>
                <line x1="55" y1="29" x2="52" y2="26" stroke="#000" stroke-width="1.5"/>
                <line x1="61" y1="29" x2="64" y2="26" stroke="#000" stroke-width="1.5"/>
                <!-- 腮红 -->
                <circle cx="32" cy="38" r="5" fill="#FF9AA2" opacity="0.7"/>
                <circle cx="68" cy="38" r="5" fill="#FF9AA2" opacity="0.7"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="40" rx="2" ry="3" fill="#FFB6C1" opacity="0.6"/>
                <!-- 性感嘴唇 -->
                <ellipse cx="50" cy="46" rx="7" ry="4" fill="#DC143C"/>
                <path d="M 43 46 Q 50 50 57 46" stroke="#B91836" stroke-width="1.5" fill="none"/>
                <!-- 丰满身体 -->
                <ellipse cx="50" cy="78" rx="24" ry="20" fill="#FF1493"/>
                <!-- 超大胸部 -->
                <ellipse cx="40" cy="66" rx="14" ry="12" fill="#FF1493"/>
                <ellipse cx="60" cy="66" rx="14" ry="12" fill="#FF1493"/>
                <!-- 胸部高光 -->
                <ellipse cx="38" cy="62" rx="6" ry="5" fill="#FF69B4" opacity="0.6"/>
                <ellipse cx="58" cy="62" rx="6" ry="5" fill="#FF69B4" opacity="0.6"/>
                <!-- 深V领口 -->
                <path d="M 32 60 L 50 72 L 68 60" stroke="#C2185B" stroke-width="2" fill="none"/>
                <!-- 装饰 -->
                <circle cx="50" cy="70" r="2" fill="#FFD700"/>
                <!-- 纤细腰 -->
                <ellipse cx="50" cy="82" rx="14" ry="10" fill="#FF1493"/>
                <!-- 手 -->
                <ellipse cx="30" cy="78" rx="7" ry="14" fill="#FFE4D6"/>
                <ellipse cx="70" cy="78" rx="7" ry="14" fill="#FFE4D6"/>
                <!-- 脚（高跟鞋） -->
                <ellipse cx="44" cy="96" rx="6" ry="5" fill="#000"/>
                <rect x="41" y="94" width="6" height="3" fill="#000"/>
                <ellipse cx="56" cy="96" rx="6" ry="5" fill="#000"/>
                <rect x="53" y="94" width="6" height="3" fill="#000"/>
            </svg>`,
            
            muscleman: `<svg viewBox="0 0 100 100" class="theme-svg star-svg">
                <!-- 肌肉猛男 -->
                <!-- 大头 -->
                <ellipse cx="50" cy="32" rx="20" ry="22" fill="#E8B098"/>
                <!-- 短发 -->
                <ellipse cx="50" cy="18" rx="22" ry="12" fill="#2C1810"/>
                <!-- 眉毛（粗） -->
                <rect x="38" y="26" width="10" height="3" rx="1.5" fill="#2C1810"/>
                <rect x="52" y="26" width="10" height="3" rx="1.5" fill="#2C1810"/>
                <!-- 眼睛 -->
                <ellipse cx="42" cy="32" rx="3" ry="4" fill="#2C1810"/>
                <circle cx="42" cy="31" r="1" fill="#FFF"/>
                <ellipse cx="58" cy="32" rx="3" ry="4" fill="#2C1810"/>
                <circle cx="58" cy="31" r="1" fill="#FFF"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="40" rx="3" ry="4" fill="#D4A89A"/>
                <!-- 嘴巴（严肃） -->
                <rect x="44" y="46" width="12" height="2" rx="1" fill="#8B4513"/>
                <!-- 粗脖子 -->
                <rect x="42" y="52" width="16" height="8" rx="2" fill="#E8B098"/>
                <!-- 超大胸肌 -->
                <ellipse cx="38" cy="68" rx="16" ry="14" fill="#D4A89A"/>
                <ellipse cx="62" cy="68" rx="16" ry="14" fill="#D4A89A"/>
                <!-- 胸肌分界线 -->
                <path d="M 50 60 L 50 76" stroke="#B8947A" stroke-width="2"/>
                <!-- 胸肌轮廓 -->
                <path d="M 26 68 Q 38 62 50 62 Q 62 62 74 68" stroke="#B8947A" stroke-width="2" fill="none"/>
                <!-- 腹肌 -->
                <ellipse cx="50" cy="82" rx="18" ry="12" fill="#D4A89A"/>
                <line x1="50" y1="76" x2="50" y2="88" stroke="#B8947A" stroke-width="1.5"/>
                <line x1="44" y1="79" x2="56" y2="79" stroke="#B8947A" stroke-width="1"/>
                <line x1="44" y1="85" x2="56" y2="85" stroke="#B8947A" stroke-width="1"/>
                <!-- 粗壮手臂 -->
                <ellipse cx="24" cy="70" rx="10" ry="16" fill="#D4A89A"/>
                <ellipse cx="76" cy="70" rx="10" ry="16" fill="#D4A89A"/>
                <!-- 肱二头肌 -->
                <ellipse cx="24" cy="66" rx="8" ry="10" fill="#C8947A"/>
                <ellipse cx="76" cy="66" rx="8" ry="10" fill="#C8947A"/>
                <!-- 短裤 -->
                <rect x="36" y="92" width="28" height="8" rx="2" fill="#000"/>
                <!-- 腿 -->
                <rect x="40" y="88" width="8" height="12" rx="2" fill="#D4A89A"/>
                <rect x="52" y="88" width="8" height="12" rx="2" fill="#D4A89A"/>
            </svg>`
        };
        return svgs[themeId] || '';
    }
    
    // ===== 骷髅头SVG =====
    getSkullSVG() {
        return `<svg viewBox="0 0 100 100" class="theme-svg skull-svg">
            <!-- 骷髅头主体 -->
            <ellipse cx="50" cy="35" rx="25" ry="20" fill="#2D2D2D" stroke="#DC143C" stroke-width="2"/>
            <!-- 眼眶 -->
            <ellipse cx="42" cy="30" rx="6" ry="8" fill="#000000"/>
            <ellipse cx="58" cy="30" rx="6" ry="8" fill="#000000"/>
            <!-- 眼珠 -->
            <circle cx="42" cy="30" r="2" fill="#DC143C" class="skull-glow"/>
            <circle cx="58" cy="30" r="2" fill="#DC143C" class="skull-glow"/>
            <!-- 鼻骨 -->
            <path d="M50 35 L48 40 L52 40 Z" fill="#1A1A1A"/>
            <!-- 嘴部 -->
            <path d="M40 42 Q50 50 60 42" stroke="#DC143C" stroke-width="2" fill="none"/>
            <!-- 牙齿 -->
            <rect x="47" y="42" width="2" height="6" fill="#FFFFFF"/>
            <rect x="51" y="42" width="2" height="6" fill="#FFFFFF"/>
            <!-- 下颌 -->
            <ellipse cx="50" cy="60" rx="20" ry="12" fill="#2D2D2D" stroke="#DC143C" stroke-width="2"/>
            <!-- 下颌牙齿 -->
            <rect x="45" y="60" width="2" height="4" fill="#FFFFFF"/>
            <rect x="49" y="60" width="2" height="4" fill="#FFFFFF"/>
            <rect x="53" y="60" width="2" height="4" fill="#FFFFFF"/>
            <!-- 装饰性光芒 -->
            <circle cx="50" cy="50" r="35" fill="none" stroke="#DC143C" stroke-width="1" opacity="0.3" class="skull-aura"/>
        </svg>`;
    }
    
    // ===== 暗黑版SVG =====
    getDarkThemeSVG(themeId) {
        const svgs = {
            tech: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <rect x="20" y="20" width="60" height="45" rx="3" fill="#1a1a1a" stroke="#00D4FF" stroke-width="2"/>
                <circle cx="50" cy="42" r="12" fill="#00D4FF" opacity="0.3" class="pulse-glow"/>
                <circle cx="50" cy="42" r="8" fill="#00D4FF"/>
                <line x1="35" y1="42" x2="43" y2="42" stroke="#00D4FF" stroke-width="2"/>
                <line x1="57" y1="42" x2="65" y2="42" stroke="#00D4FF" stroke-width="2"/>
                <rect x="30" y="70" width="40" height="3" rx="1.5" fill="#333"/>
                <circle cx="30" cy="78" r="2" fill="#00D4FF" class="sparkle"/>
                <circle cx="50" cy="80" r="2" fill="#00D4FF" class="sparkle"/>
                <circle cx="70" cy="78" r="2" fill="#00D4FF" class="sparkle"/>
            </svg>`,
            
            galaxy: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <circle cx="50" cy="50" r="40" fill="url(#galaxyGradient)"/>
                <defs>
                    <radialGradient id="galaxyGradient">
                        <stop offset="0%" stop-color="#4B0082"/>
                        <stop offset="100%" stop-color="#000"/>
                    </radialGradient>
                </defs>
                <circle cx="30" cy="30" r="2" fill="#FFF" class="star-twinkle"/>
                <circle cx="70" cy="35" r="1.5" fill="#FFF" class="star-twinkle"/>
                <circle cx="60" cy="65" r="2" fill="#FFF" class="star-twinkle"/>
                <circle cx="40" cy="70" r="1" fill="#FFF" class="star-twinkle"/>
                <circle cx="55" cy="45" r="1.5" fill="#FFD700" class="star-twinkle"/>
                <circle cx="45" cy="55" r="1" fill="#FFD700" class="star-twinkle"/>
                <ellipse cx="50" cy="50" rx="15" ry="25" fill="#8A2BE2" opacity="0.3" class="rotate-slow"/>
            </svg>`,
            
            wukong: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <ellipse cx="50" cy="45" rx="25" ry="22" fill="#D4AF37"/>
                <circle cx="35" cy="30" rx="8" fill="#FFD700"/>
                <circle cx="65" cy="30" rx="8" fill="#FFD700"/>
                <circle cx="42" cy="42" r="4" fill="#8B0000" class="eye-glow"/>
                <circle cx="58" cy="42" r="4" fill="#8B0000" class="eye-glow"/>
                <path d="M 40 52 Q 50 56 60 52" stroke="#8B4513" stroke-width="2" fill="none"/>
                <rect x="35" y="30" width="8" height="15" fill="#8B4513"/>
                <rect x="57" y="30" width="8" height="15" fill="#8B4513"/>
                <ellipse cx="50" cy="75" rx="20" ry="20" fill="#8B0000"/>
                <rect x="45" y="70" width="10" height="3" fill="#FFD700"/>
            </svg>`,
            
            cyberpunk: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <rect x="20" y="20" width="60" height="60" rx="5" fill="#0a0a0a" stroke="#FF00FF" stroke-width="2"/>
                <line x1="30" y1="35" x2="50" y2="35" stroke="#00FFFF" stroke-width="3"/>
                <line x1="50" y1="35" x2="70" y2="35" stroke="#FF00FF" stroke-width="3"/>
                <rect x="35" y="45" width="10" height="12" fill="#00FFFF" opacity="0.8" class="pulse-glow"/>
                <rect x="55" y="45" width="10" height="12" fill="#FF00FF" opacity="0.8" class="pulse-glow"/>
                <line x1="30" y1="65" x2="70" y2="65" stroke="#00FFFF" stroke-width="2"/>
                <circle cx="30" cy="30" r="1.5" fill="#00FFFF" class="sparkle"/>
                <circle cx="70" cy="30" r="1.5" fill="#FF00FF" class="sparkle"/>
                <circle cx="50" cy="75" r="1.5" fill="#00FFFF" class="sparkle"/>
            </svg>`,
            
            matrix: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <rect width="100" height="100" fill="#000"/>
                <text x="20" y="20" font-size="8" fill="#00FF00" opacity="0.8" class="matrix-text">1010</text>
                <text x="50" y="30" font-size="8" fill="#00FF00" opacity="0.6" class="matrix-text">0101</text>
                <text x="70" y="40" font-size="8" fill="#00FF00" opacity="0.9" class="matrix-text">1100</text>
                <text x="30" y="50" font-size="12" fill="#00FF00" font-weight="bold">M</text>
                <text x="60" y="65" font-size="8" fill="#00FF00" opacity="0.7" class="matrix-text">0011</text>
                <text x="40" y="75" font-size="8" fill="#00FF00" opacity="0.8" class="matrix-text">1001</text>
                <circle cx="50" cy="50" r="3" fill="#00FF00" class="pulse-glow"/>
            </svg>`,
            
            dragon: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <ellipse cx="50" cy="55" rx="28" ry="20" fill="#8B0000"/>
                <ellipse cx="30" cy="45" rx="15" ry="20" fill="#DC143C" class="wing-flap"/>
                <ellipse cx="70" cy="45" rx="15" ry="20" fill="#DC143C" class="wing-flap"/>
                <circle cx="50" cy="45" r="18" fill="#8B0000"/>
                <circle cx="44" cy="42" r="5" fill="#FFD700" class="eye-glow"/>
                <circle cx="56" cy="42" r="5" fill="#FFD700" class="eye-glow"/>
                <polygon points="50,30 45,25 55,25" fill="#8B0000"/>
                <path d="M 65 55 Q 75 60 80 65" stroke="#DC143C" stroke-width="4" fill="none" stroke-linecap="round"/>
                <circle cx="75" cy="63" r="2" fill="#FF4500" class="fire-pulse"/>
                <circle cx="78" cy="66" r="1.5" fill="#FFD700" class="fire-pulse"/>
            </svg>`,
            
            vampire: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="36" rx="24" ry="26" fill="#E8D5D0"/>
                <!-- 吸血鬼发型 -->
                <ellipse cx="50" cy="18" rx="26" ry="14" fill="#1A0A0A"/>
                <path d="M 30 18 Q 35 12 40 18" stroke="#1A0A0A" stroke-width="3" fill="none"/>
                <path d="M 46 18 Q 50 14 54 18" stroke="#1A0A0A" stroke-width="3" fill="none"/>
                <path d="M 60 18 Q 65 12 70 18" stroke="#1A0A0A" stroke-width="3" fill="none"/>
                <!-- 红眼睛 -->
                <ellipse cx="40" cy="34" rx="5" ry="7" fill="#8B0000" class="eye-glow"/>
                <circle cx="40" cy="32" r="2" fill="#FF0000" class="pulse-glow"/>
                <ellipse cx="60" cy="34" rx="5" ry="7" fill="#8B0000" class="eye-glow"/>
                <circle cx="60" cy="32" r="2" fill="#FF0000" class="pulse-glow"/>
                <!-- 尖牙嘴巴 -->
                <path d="M 44 46 Q 50 49 56 46" stroke="#8B0000" stroke-width="2" fill="none"/>
                <polygon points="42,48 44,54 46,48" fill="#FFF"/>
                <polygon points="54,48 56,54 58,48" fill="#FFF"/>
                <!-- 披风 -->
                <ellipse cx="50" cy="75" rx="22" ry="22" fill="#1A0A0A"/>
                <ellipse cx="50" cy="75" rx="18" ry="18" fill="#8B0000" opacity="0.8"/>
                <!-- 手 -->
                <ellipse cx="32" cy="74" rx="6" ry="14" fill="#E8D5D0"/>
                <ellipse cx="68" cy="74" rx="6" ry="14" fill="#E8D5D0"/>
                <!-- 蝙蝠装饰 -->
                <path d="M 45 68 L 40 72 L 45 70 Z" fill="#1A0A0A"/>
                <path d="M 55 68 L 60 72 L 55 70 Z" fill="#1A0A0A"/>
            </svg>`,
            
            ghost: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 幽灵身体 -->
                <ellipse cx="50" cy="50" rx="28" ry="35" fill="#E8E8F0" opacity="0.9"/>
                <ellipse cx="50" cy="48" rx="26" ry="32" fill="#F5F5FF" opacity="0.8"/>
                <!-- 大头 -->
                <circle cx="50" cy="35" r="26" fill="#F5F5FF" opacity="0.9"/>
                <!-- 飘逸效果 -->
                <circle cx="30" cy="32" r="8" fill="#E8E8F0" opacity="0.7"/>
                <circle cx="70" cy="32" r="8" fill="#E8E8F0" opacity="0.7"/>
                <!-- 大眼睛 -->
                <ellipse cx="38" cy="32" rx="7" ry="10" fill="#000"/>
                <circle cx="38" cy="29" r="3" fill="#00FFFF" class="pulse-glow"/>
                <ellipse cx="62" cy="32" rx="7" ry="10" fill="#000"/>
                <circle cx="62" cy="29" r="3" fill="#00FFFF" class="pulse-glow"/>
                <!-- O型嘴 -->
                <ellipse cx="50" cy="46" rx="6" ry="8" fill="#000"/>
                <!-- 飘带身体 -->
                <path d="M 28 75 Q 30 85 35 95" fill="#E8E8F0" opacity="0.8"/>
                <path d="M 42 75 Q 44 88 48 98" fill="#F5F5FF" opacity="0.7"/>
                <path d="M 58 75 Q 56 88 52 98" fill="#F5F5FF" opacity="0.7"/>
                <path d="M 72 75 Q 70 85 65 95" fill="#E8E8F0" opacity="0.8"/>
                <!-- 手 -->
                <ellipse cx="28" cy="60" rx="8" ry="12" fill="#F5F5FF" opacity="0.8"/>
                <ellipse cx="72" cy="60" rx="8" ry="12" fill="#F5F5FF" opacity="0.8"/>
            </svg>`,
            
            reaper: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 兜帽 -->
                <ellipse cx="50" cy="30" rx="30" ry="25" fill="#000"/>
                <ellipse cx="50" cy="32" rx="28" ry="22" fill="#1A1A1A"/>
                <!-- 大头（骷髅） -->
                <ellipse cx="50" cy="40" rx="22" ry="24" fill="#E8E8D0"/>
                <!-- 眼窝 -->
                <ellipse cx="40" cy="38" rx="6" ry="8" fill="#000"/>
                <circle cx="40" cy="38" r="3" fill="#00FF00" class="eye-glow"/>
                <ellipse cx="60" cy="38" rx="6" ry="8" fill="#000"/>
                <circle cx="60" cy="38" r="3" fill="#00FF00" class="eye-glow"/>
                <!-- 鼻孔 -->
                <ellipse cx="48" cy="46" rx="2" ry="3" fill="#000"/>
                <ellipse cx="52" cy="46" rx="2" ry="3" fill="#000"/>
                <!-- 骷髅牙齿 -->
                <rect x="42" y="52" width="4" height="5" fill="#FFF"/>
                <rect x="47" y="52" width="3" height="5" fill="#FFF"/>
                <rect x="51" y="52" width="3" height="5" fill="#FFF"/>
                <rect x="55" y="52" width="4" height="5" fill="#FFF"/>
                <!-- 黑袍身体 -->
                <ellipse cx="50" cy="78" rx="24" ry="20" fill="#000"/>
                <ellipse cx="50" cy="78" rx="20" ry="16" fill="#1A1A1A"/>
                <!-- 骷髅手 -->
                <ellipse cx="30" cy="76" rx="6" ry="14" fill="#E8E8D0"/>
                <ellipse cx="70" cy="76" rx="6" ry="14" fill="#E8E8D0"/>
                <!-- 镰刀暗示 -->
                <path d="M 72 68 Q 80 65 85 70" stroke="#888" stroke-width="3" fill="none"/>
            </svg>`,
            
            demon: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="38" rx="26" ry="24" fill="#8B0000"/>
                <!-- 恶魔角 -->
                <path d="M 28 20 Q 25 12 22 18 L 28 24" fill="#4A0000"/>
                <path d="M 72 20 Q 75 12 78 18 L 72 24" fill="#4A0000"/>
                <!-- 眼睛（邪恶红光） -->
                <ellipse cx="38" cy="36" rx="7" ry="6" fill="#FF0000" class="eye-glow"/>
                <ellipse cx="38" cy="36" rx="4" ry="3" fill="#FFD700" class="pulse-glow"/>
                <ellipse cx="62" cy="36" rx="7" ry="6" fill="#FF0000" class="eye-glow"/>
                <ellipse cx="62" cy="36" rx="4" ry="3" fill="#FFD700" class="pulse-glow"/>
                <!-- 邪恶笑容 -->
                <path d="M 38 48 Q 50 54 62 48" stroke="#FF4500" stroke-width="2.5" fill="none"/>
                <polygon points="42,48 44,52 46,48" fill="#FFF"/>
                <polygon points="54,48 56,52 58,48" fill="#FFF"/>
                <!-- 身体 -->
                <ellipse cx="50" cy="75" rx="20" ry="22" fill="#8B0000"/>
                <ellipse cx="50" cy="75" rx="16" ry="18" fill="#A00000"/>
                <!-- 火焰装饰 -->
                <circle cx="40" cy="68" r="3" fill="#FF4500" class="fire-pulse"/>
                <circle cx="60" cy="68" r="3" fill="#FF4500" class="fire-pulse"/>
                <!-- 手 -->
                <ellipse cx="32" cy="74" rx="7" ry="14" fill="#6A0000"/>
                <ellipse cx="68" cy="74" rx="7" ry="14" fill="#6A0000"/>
                <!-- 尾巴 -->
                <path d="M 50 92 Q 60 95 65 88" stroke="#4A0000" stroke-width="4" fill="none" stroke-linecap="round"/>
            </svg>`,
            
            ninja: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 大头 -->
                <ellipse cx="50" cy="36" rx="24" ry="26" fill="#E8C8A8"/>
                <!-- 头巾 -->
                <ellipse cx="50" cy="20" rx="26" ry="16" fill="#1A1A2E"/>
                <rect x="24" y="26" width="52" height="8" fill="#1A1A2E"/>
                <!-- 蒙面布 -->
                <rect x="28" y="40" width="44" height="16" fill="#1A1A2E"/>
                <!-- 露出的眼睛 -->
                <ellipse cx="38" cy="34" rx="5" ry="6" fill="#FFF"/>
                <ellipse cx="38" cy="34" rx="4" ry="5" fill="#2C2C2C" class="eye-blink"/>
                <circle cx="38" cy="32" r="2" fill="#FFF"/>
                <ellipse cx="62" cy="34" rx="5" ry="6" fill="#FFF"/>
                <ellipse cx="62" cy="34" rx="4" ry="5" fill="#2C2C2C" class="eye-blink"/>
                <circle cx="62" cy="32" r="2" fill="#FFF"/>
                <!-- 忍者服 -->
                <ellipse cx="50" cy="76" rx="20" ry="22" fill="#1A1A2E"/>
                <!-- 腰带 -->
                <rect x="32" y="64" width="36" height="4" fill="#8B0000"/>
                <!-- 手里剑暗示 -->
                <circle cx="28" cy="72" r="3" fill="#888"/>
                <circle cx="72" cy="72" r="3" fill="#888"/>
                <!-- 手 -->
                <ellipse cx="32" cy="74" rx="6" ry="14" fill="#E8C8A8"/>
                <ellipse cx="68" cy="74" rx="6" ry="14" fill="#E8C8A8"/>
                <!-- 脚 -->
                <rect x="40" y="92" width="8" height="8" fill="#1A1A2E"/>
                <rect x="52" y="92" width="8" height="8" fill="#1A1A2E"/>
            </svg>`,
            
            zombie: `<svg viewBox="0 0 100 100" class="theme-svg dark-svg">
                <!-- 大头（腐烂） -->
                <ellipse cx="50" cy="38" rx="25" ry="26" fill="#8B9B6B"/>
                <!-- 头发稀疏 -->
                <path d="M 30 18 L 28 24" stroke="#3A3A2A" stroke-width="2"/>
                <path d="M 40 16 L 38 22" stroke="#3A3A2A" stroke-width="2"/>
                <path d="M 50 15 L 50 21" stroke="#3A3A2A" stroke-width="2"/>
                <path d="M 60 16 L 62 22" stroke="#3A3A2A" stroke-width="2"/>
                <path d="M 70 18 L 72 24" stroke="#3A3A2A" stroke-width="2"/>
                <!-- 死鱼眼 -->
                <ellipse cx="38" cy="34" rx="6" ry="8" fill="#E8E8D0"/>
                <circle cx="38" cy="34" r="4" fill="#8B9B6B" class="eye-blink"/>
                <circle cx="39" cy="32" r="1.5" fill="#FFF" opacity="0.5"/>
                <ellipse cx="62" cy="34" rx="6" ry="8" fill="#E8E8D0"/>
                <circle cx="62" cy="34" r="4" fill="#8B9B6B" class="eye-blink"/>
                <circle cx="63" cy="32" r="1.5" fill="#FFF" opacity="0.5"/>
                <!-- 缝合线 -->
                <line x1="32" y1="28" x2="42" y2="28" stroke="#4A4A3A" stroke-width="1.5"/>
                <line x1="34" y1="28" x2="34" y2="30" stroke="#4A4A3A" stroke-width="1"/>
                <line x1="38" y1="28" x2="38" y2="30" stroke="#4A4A3A" stroke-width="1"/>
                <!-- 张开的嘴 -->
                <ellipse cx="50" cy="50" rx="8" ry="6" fill="#4A4A3A"/>
                <rect x="44" y="48" width="3" height="4" fill="#E8E8D0"/>
                <rect x="53" y="48" width="3" height="4" fill="#E8E8D0"/>
                <!-- 破烂衣服 -->
                <ellipse cx="50" cy="76" rx="20" ry="22" fill="#5A5A4A"/>
                <path d="M 32 70 L 30 75 L 32 80" fill="#4A4A3A"/>
                <path d="M 68 70 L 70 75 L 68 80" fill="#4A4A3A"/>
                <!-- 手 -->
                <ellipse cx="32" cy="76" rx="6" ry="14" fill="#8B9B6B"/>
                <ellipse cx="68" cy="76" rx="6" ry="14" fill="#8B9B6B"/>
                <!-- 破鞋 -->
                <rect x="38" y="92" width="12" height="8" fill="#3A3A2A"/>
                <rect x="50" y="92" width="12" height="8" fill="#3A3A2A"/>
            </svg>`
        };
        return svgs[themeId] || '';
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            priority: 'normal',
            category: 'general'
        };

        this.tasks.push(task);
        input.value = '';
        
        this.updateUI();
        this.saveData();
        this.playSound('task-add');
        this.animateTaskAddition();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        task.completed = !task.completed;
        
        if (task.completed) {
            this.userStats.completedToday++;
            this.playSound('task-complete');
            this.animateTaskCompletion(id);
        } else {
            this.userStats.completedToday = Math.max(0, this.userStats.completedToday - 1);
            this.playSound('task-undo');
        }

        this.updateUI();
        this.updateProgress();
        this.saveData();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.updateUI();
        this.saveData();
        this.playSound('task-delete');
    }

    editTask(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            this.updateUI();
            this.saveData();
        }
    }

    updateUI() {
        this.renderTasks();
        this.updateStats();
        this.updateProgress();
    }

    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        
        if (this.tasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>还没有任务</h3>
                    <p>添加你的第一个任务开始使用吧！</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = this.tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                     onclick="app.toggleTask(${task.id})"></div>
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span>${this.formatDate(task.createdAt)}</span>
                        <span>•</span>
                        <span>${task.priority}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn" onclick="app.editTaskPrompt(${task.id})" title="编辑">
                        ✏️
                    </button>
                    <button class="task-action-btn" onclick="app.deleteTask(${task.id})" title="删除">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    editTaskPrompt(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const newText = prompt('编辑任务:', task.text);
        if (newText && newText.trim() !== task.text) {
            this.editTask(id, newText.trim());
        }
    }

    updateStats() {
        const completed = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('totalCount').textContent = total;
    }

    updateProgress() {
        const completed = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        const progress = total > 0 ? (completed / total) * 100 : 0;
        
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${progress}%`;
        
        // 更新进度条颜色
        if (progress === 100) {
            progressFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        } else if (progress >= 75) {
            progressFill.style.background = 'linear-gradient(90deg, #3b82f6, #60a5fa)';
        } else if (progress >= 50) {
            progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        }
    }

    updateDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const dateStr = now.toLocaleDateString('zh-CN', options);
        document.getElementById('currentDate').textContent = dateStr;
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (modalId === 'shopModal') {
            this.loadShopContent();
            // 延迟更新以确保DOM已渲染
            setTimeout(() => {
                this.updateThemeCards();
            }, 100);
        }
        
        this.playSound('modal-open');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        this.playSound('modal-close');
    }

    loadShopContent() {
        // 重新渲染所有主题网格
        this.renderThemeGrids();
    }

    startIdleAnimations() {
        // 吉祥物空闲动画
        setInterval(() => {
            const mascot = document.querySelector('.mascot-body');
            if (mascot && !mascot.classList.contains('celebrate')) {
                mascot.classList.add('idle');
                setTimeout(() => {
                    mascot.classList.remove('idle');
                }, 3000);
            }
        }, 10000);

        // 随机鼓励消息
        setInterval(() => {
            this.updateMascotMessage();
        }, 30000);
    }

    updateMascotMessage() {
        const messages = [
            '加油完成任务！',
            '你今天很棒！',
            '保持专注！',
            '一步一步来！',
            '相信自己！',
            '坚持下去！'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageEl = document.getElementById('mascotMessage');
        
        if (messageEl) {
            messageEl.textContent = randomMessage;
            messageEl.classList.add('fade-in-out');
            setTimeout(() => {
                messageEl.classList.remove('fade-in-out');
            }, 2000);
        }
    }

    animateTaskAddition() {
        const taskInput = document.getElementById('taskInput');
        taskInput.classList.add('pulse');
        setTimeout(() => {
            taskInput.classList.remove('pulse');
        }, 1000);
    }

    animateTaskCompletion(id) {
        const taskItem = document.querySelector(`[data-id="${id}"]`);
        if (taskItem) {
            taskItem.classList.add('completed');
            
            // 吉祥物庆祝动画
            const mascot = document.querySelector('.mascot-body');
            if (mascot) {
                mascot.classList.add('celebrate');
                setTimeout(() => {
                    mascot.classList.remove('celebrate');
                }, 800);
            }
            
            // 粒子效果
            this.createParticleEffect(taskItem);
        }
    }

    createParticleEffect(element) {
        if (!this.settings.animations) return;
        
        const rect = element.getBoundingClientRect();
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.showToast('🎉 欢迎使用 CuteToDo！');
        }, 1000);
    }

    playSound(soundName) {
        if (!this.settings.soundEffects) return;
        
        // 这里可以添加音效播放逻辑
        console.log(`Playing sound: ${soundName}`);
    }

    async saveData() {
        if (!this.settings.autoSave) return;
        
        const data = {
            tasks: this.tasks,
            currentTheme: this.currentTheme,
            purchasedThemes: this.purchasedThemes,
            userStats: this.userStats,
            isPremium: this.isPremium,
            settings: this.settings
        };
        
        try {
            await chrome.storage.local.set({ taskflowData: data });
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    async loadData() {
        try {
            const result = await chrome.storage.local.get(['taskflowData']);
            if (result.taskflowData) {
                const data = result.taskflowData;
                this.tasks = data.tasks || [];
                this.currentTheme = data.currentTheme || 'light';
                this.purchasedThemes = data.purchasedThemes || ['light', 'dark'];
                this.userStats = data.userStats || this.userStats;
                this.isPremium = data.isPremium || false;
                this.settings = { ...this.settings, ...data.settings };
                
                // 应用主题
                document.body.className = `theme-${this.currentTheme}`;
                
                // 应用设置
                document.getElementById('autoSave').checked = this.settings.autoSave;
                document.getElementById('animations').checked = this.settings.animations;
            }
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) { // 1分钟内
            return '刚刚';
        } else if (diff < 3600000) { // 1小时内
            return `${Math.floor(diff / 60000)}分钟前`;
        } else if (diff < 86400000) { // 1天内
            return `${Math.floor(diff / 3600000)}小时前`;
        } else {
            return date.toLocaleDateString('zh-CN');
        }
    }
}

// 全局应用实例
let app;

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    app = new TaskFlowApp();
});

// 页面卸载前保存数据
window.addEventListener('beforeunload', () => {
    if (app) {
        app.saveData();
    }
});
