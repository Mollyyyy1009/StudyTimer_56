// 基础的 JavaScript 文件
console.log('前端项目已加载！');

// 这里可以添加你的 JavaScript 代码
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已完全加载');
    
    // 添加计时逻辑
    let seconds = 0;
    let timerInterval;
    
    // 创建显示时间的元素
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.style.cssText = `
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
        background-color: #ecf0f1;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        margin: 20px 0;
        border: 2px solid #3498db;
    `;
    
    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'margin: 15px 0;';
    
    // 创建开始按钮
    const startButton = document.createElement('button');
    startButton.textContent = '开始计时';
    startButton.style.cssText = `
        padding: 10px 20px;
        margin: 0 10px;
        font-size: 16px;
        background-color: #2ecc71;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    // 创建暂停按钮
    const pauseButton = document.createElement('button');
    pauseButton.textContent = '暂停计时';
    pauseButton.style.cssText = `
        padding: 10px 20px;
        margin: 0 10px;
        font-size: 16px;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    // 创建重置按钮
    const resetButton = document.createElement('button');
    resetButton.textContent = '重置计时';
    resetButton.style.cssText = `
        padding: 10px 20px;
        margin: 0 10px;
        font-size: 16px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    // 更新时间显示
    function updateTimerDisplay() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        timerDisplay.textContent = 
            `计时器: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // 开始计时函数
    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                seconds++;
                updateTimerDisplay();
            }, 1000);
        }
    }
    
    // 暂停计时函数
    function pauseTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }
    
    // 重置计时函数
    function resetTimer() {
        pauseTimer();
        seconds = 0;
        updateTimerDisplay();
    }
    
    // 添加事件监听器
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    
    // 将元素添加到页面
    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(pauseButton);
    buttonContainer.appendChild(resetButton);
    
    // 找到页面中的第一个 p 元素，在其后插入计时器
    const firstParagraph = document.querySelector('p');
    firstParagraph.parentNode.insertBefore(timerDisplay, firstParagraph.nextSibling);
    firstParagraph.parentNode.insertBefore(buttonContainer, timerDisplay.nextSibling);
    
    // 初始显示
    updateTimerDisplay();
    
    console.log('计时器逻辑已加载！');
});