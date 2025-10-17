// 弹窗页面逻辑 - 简化版

document.addEventListener('DOMContentLoaded', () => {
    // 打开新标签页按钮
    const openTabBtn = document.getElementById('openNewTab');
    if (openTabBtn) {
        openTabBtn.addEventListener('click', () => {
            chrome.tabs.create({
                url: chrome.runtime.getURL('index.html')
            });
            window.close();
        });
    }
});
