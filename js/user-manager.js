// CuteToDo - 用户ID管理器（简化版）

class UserManager {
    constructor() {
        this.currentUserId = null;
        this.userName = null;
        this.init();
    }

    async init() {
        try {
            // 尝试从存储中获取用户ID
            await this.loadUserInfo();
            
            // 如果没有用户ID，生成一个新的
            if (!this.currentUserId) {
                await this.generateNewUser();
            }
            
            console.log('User ID initialized:', this.currentUserId);
        } catch (error) {
            console.error('Failed to initialize user:', error);
            // 生成一个临时用户ID作为后备
            this.currentUserId = this.generateUserId();
            this.userName = 'User ' + this.currentUserId.substring(0, 8);
        }
    }

    async loadUserInfo() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                const result = await chrome.storage.local.get(['cuteToDoUserId', 'cuteToDoUserName']);
                this.currentUserId = result.cuteToDoUserId;
                this.userName = result.cuteToDoUserName;
            } else {
                // Fallback to localStorage for web browser environment
                this.currentUserId = localStorage.getItem('cuteToDoUserId');
                this.userName = localStorage.getItem('cuteToDoUserName');
            }
        } catch (error) {
            console.error('Failed to load user info:', error);
        }
    }

    async saveUserInfo() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                await chrome.storage.local.set({
                    cuteToDoUserId: this.currentUserId,
                    cuteToDoUserName: this.userName
                });
            } else {
                // Fallback to localStorage for web browser environment
                localStorage.setItem('cuteToDoUserId', this.currentUserId);
                localStorage.setItem('cuteToDoUserName', this.userName);
            }
        } catch (error) {
            console.error('Failed to save user info:', error);
        }
    }

    async generateNewUser() {
        this.currentUserId = this.generateUserId();
        this.userName = this.generateUserName();
        await this.saveUserInfo();
        console.log('Generated new user:', this.currentUserId, this.userName);
    }

    generateUserId() {
        // 生成一个基于时间戳和随机数的唯一ID
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 15);
        return `user_${timestamp}_${random}`;
    }

    generateUserName() {
        const adjectives = ['Happy', 'Smart', 'Creative', 'Bright', 'Swift', 'Clever', 'Wise', 'Kind'];
        const nouns = ['User', 'Helper', 'Friend', 'Buddy', 'Pal', 'Mate', 'Star', 'Hero'];
        
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const number = Math.floor(Math.random() * 999) + 1;
        
        return `${adjective} ${noun} ${number}`;
    }

    getUserId() {
        return this.currentUserId;
    }

    getUserName() {
        return this.userName;
    }

    // 获取认证头部信息
    getAuthHeaders() {
        return {
            'x-user-id': this.getUserId(),
            'x-user-name': this.getUserName()
        };
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.UserManager = new UserManager();
}
