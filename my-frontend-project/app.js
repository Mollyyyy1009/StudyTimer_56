// 基础的 JavaScript 文件
console.log('前端项目已加载！');

// 记忆曲线回顾功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已完全加载');
    
    // 初始化记忆曲线数据
    let reviewDates = JSON.parse(localStorage.getItem('memoryCurveReviews')) || [];
    
    // 创建记忆曲线界面
    const memoryCurveSection = document.createElement('div');
    memoryCurveSection.id = 'memory-curve';
    memoryCurveSection.style.cssText = `
        margin: 30px 0;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 10px;
        border: 2px solid #6c757d;
    `;
    
    // 标题
    const title = document.createElement('h2');
    title.textContent = '记忆曲线回顾';
    title.style.cssText = 'color: #495057; margin-bottom: 20px;';
    
    // 添加回顾日期按钮
    const addReviewBtn = document.createElement('button');
    addReviewBtn.textContent = '添加今日回顾';
    addReviewBtn.style.cssText = `
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
    `;
    
    // 清空记录按钮
    const clearReviewsBtn = document.createElement('button');
    clearReviewsBtn.textContent = '清空所有记录';
    clearReviewsBtn.style.cssText = `
        padding: 10px 20px;
        font-size: 16px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
        margin-bottom: 20px;
    `;
    
    // 回顾日期列表
    const reviewList = document.createElement('div');
    reviewList.id = 'review-list';
    
    // 统计信息
    const stats = document.createElement('div');
    stats.id = 'review-stats';
    stats.style.cssText = 'margin-top: 15px; font-weight: bold; color: #28a745;';
    
    // 添加元素到记忆曲线区域
    memoryCurveSection.appendChild(title);
    memoryCurveSection.appendChild(addReviewBtn);
    memoryCurveSection.appendChild(clearReviewsBtn);
    memoryCurveSection.appendChild(reviewList);
    memoryCurveSection.appendChild(stats);
    
    // 更新回顾列表显示
    function updateReviewList() {
        reviewList.innerHTML = '';
        
        if (reviewDates.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.textContent = '暂无回顾记录，点击"添加今日回顾"开始记录';
            emptyMsg.style.color = '#6c757d';
            reviewList.appendChild(emptyMsg);
            return;
        }
        
        // 按日期排序（最新的在前）
        const sortedDates = [...reviewDates].sort((a, b) => new Date(b) - new Date(a));
        
        sortedDates.forEach((dateString, index) => {
            const dateItem = document.createElement('div');
            dateItem.style.cssText = `
                padding: 10px;
                margin: 5px 0;
                background-color: white;
                border-radius: 5px;
                border-left: 4px solid #007bff;
            `;
            
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short'
            });
            
            dateItem.textContent = `${index + 1}. ${formattedDate}`;
            reviewList.appendChild(dateItem);
        });
    }
    
    // 更新统计信息
    function updateStats() {
        const totalReviews = reviewDates.length;
        const lastReview = totalReviews > 0 ? new Date(reviewDates[reviewDates.length - 1]) : null;
        
        let statsText = `总回顾次数: ${totalReviews}`;
        
        if (lastReview) {
            const today = new Date();
            const daysSinceLastReview = Math.floor((today - lastReview) / (1000 * 60 * 60 * 24));
            statsText += ` | 距离上次回顾: ${daysSinceLastReview} 天`;
            
            // 根据记忆曲线建议下次回顾
            let nextReviewDays;
            if (totalReviews === 1) nextReviewDays = 1;
            else if (totalReviews === 2) nextReviewDays = 2;
            else if (totalReviews === 3) nextReviewDays = 4;
            else if (totalReviews === 4) nextReviewDays = 7;
            else nextReviewDays = 15;
            
            const nextReviewDate = new Date(lastReview);
            nextReviewDate.setDate(nextReviewDate.getDate() + nextReviewDays);
            
            statsText += ` | 建议下次回顾: ${nextReviewDate.toLocaleDateString('zh-CN')}`;
        }
        
        stats.textContent = statsText;
    }
    
    // 添加今日回顾
    addReviewBtn.addEventListener('click', function() {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD格式
        
        // 避免重复添加同一天的记录
        if (!reviewDates.includes(today)) {
            reviewDates.push(today);
            localStorage.setItem('memoryCurveReviews', JSON.stringify(reviewDates));
            updateReviewList();
            updateStats();
            
            // 显示成功消息
            showMessage('今日回顾已记录！', 'success');
        } else {
            showMessage('今天已经记录过回顾了！', 'warning');
        }
    });
    
    // 清空所有记录
    clearReviewsBtn.addEventListener('click', function() {
        if (confirm('确定要清空所有回顾记录吗？此操作不可撤销！')) {
            reviewDates = [];
            localStorage.removeItem('memoryCurveReviews');
            updateReviewList();
            updateStats();
            showMessage('所有记录已清空！', 'info');
        }
    });
    
    // 显示消息函数
    function showMessage(message, type) {
        // 移除已存在的消息
        const existingMsg = document.querySelector('.review-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = 'review-message';
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            transition: opacity 0.3s;
        `;
        
        // 根据类型设置背景色
        if (type === 'success') messageDiv.style.backgroundColor = '#28a745';
        else if (type === 'warning') messageDiv.style.backgroundColor = '#ffc107';
        else if (type === 'info') messageDiv.style.backgroundColor = '#17a2b8';
        else messageDiv.style.backgroundColor = '#007bff';
        
        document.body.appendChild(messageDiv);
        
        // 3秒后自动消失
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
    
    // 将记忆曲线区域添加到页面
    const timerSection = document.getElementById('timer');
    if (timerSection) {
        timerSection.parentNode.insertBefore(memoryCurveSection, timerSection);
    } else {
        document.body.appendChild(memoryCurveSection);
    }
    
    // 初始更新显示
    updateReviewList();
    updateStats();
    
    console.log('记忆曲线回顾功能已加载！');
    console.log('当前回顾日期:', reviewDates);
});

// 原有的计时器逻辑保持不变
// ... (这里保留你之前添加的计时器代码)