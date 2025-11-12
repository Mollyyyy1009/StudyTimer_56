// 基础的 JavaScript 文件
console.log('前端项目已加载！');

// 日程规划功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 已完全加载');
    
    // 初始化日程数据
    let schedules = JSON.parse(localStorage.getItem('dailySchedules')) || [];
    
    // 创建日程规划界面
    const scheduleSection = document.createElement('div');
    scheduleSection.id = 'schedule-planner';
    scheduleSection.style.cssText = `
        margin: 30px 0;
        padding: 20px;
        background-color: #f0f8ff;
        border-radius: 10px;
        border: 2px solid #4682b4;
    `;
    
    // 标题
const title = document.createElement('h2');
title.textContent = 'FEATURE-智能日程规划';
title.style.color = '#3498db'; // 添加蓝色样式
    
    // 添加日程表单
    const scheduleForm = document.createElement('div');
    scheduleForm.style.cssText = 'margin-bottom: 20px;';
    
    // 时间输入
    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.id = 'schedule-time';
    timeInput.style.cssText = `
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    `;
    
    // 内容输入
    const contentInput = document.createElement('input');
    contentInput.type = 'text';
    contentInput.id = 'schedule-content';
    contentInput.placeholder = '输入日程内容...';
    contentInput.style.cssText = `
        padding: 8px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
    `;
    
    // 添加按钮
    const addButton = document.createElement('button');
    addButton.textContent = '添加日程';
    addButton.style.cssText = `
        padding: 8px 16px;
        background-color: #4682b4;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    
    // 日程列表容器
    const scheduleList = document.createElement('div');
    scheduleList.id = 'schedule-list';
    scheduleList.style.cssText = 'margin-top: 20px;';
    
    // 组装表单
    scheduleForm.appendChild(timeInput);
    scheduleForm.appendChild(contentInput);
    scheduleForm.appendChild(addButton);
    
    // 添加到主区域
    scheduleSection.appendChild(title);
    scheduleSection.appendChild(scheduleForm);
    scheduleSection.appendChild(scheduleList);
    
    // 创建日程块函数
    function createScheduleBlock(schedule, index) {
        const scheduleBlock = document.createElement('div');
        scheduleBlock.className = 'schedule-block';
        scheduleBlock.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: transform 0.2s;
        `;
        
        scheduleBlock.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        scheduleBlock.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // 日程信息
        const scheduleInfo = document.createElement('div');
        
        const timeDisplay = document.createElement('div');
        timeDisplay.style.cssText = 'font-weight: bold; font-size: 18px;';
        timeDisplay.textContent = schedule.time;
        
        const contentDisplay = document.createElement('div');
        contentDisplay.style.cssText = 'margin-top: 5px;';
        contentDisplay.textContent = schedule.content;
        
        scheduleInfo.appendChild(timeDisplay);
        scheduleInfo.appendChild(contentDisplay);
        
        // 删除按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.style.cssText = `
            padding: 5px 10px;
            background-color: rgba(255,255,255,0.3);
            color: white;
            border: 1px solid white;
            border-radius: 4px;
            cursor: pointer;
        `;
        
        deleteButton.addEventListener('click', function() {
            if (confirm('确定要删除这个日程吗？')) {
                schedules.splice(index, 1);
                localStorage.setItem('dailySchedules', JSON.stringify(schedules));
                renderScheduleList();
                showMessage('日程已删除！', 'info');
            }
        });
        
        scheduleBlock.appendChild(scheduleInfo);
        scheduleBlock.appendChild(deleteButton);
        
        return scheduleBlock;
    }
    
    // 渲染日程列表
    function renderScheduleList() {
        scheduleList.innerHTML = '';
        
        if (schedules.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = '暂无日程安排，添加第一个日程吧！';
            emptyMsg.style.cssText = 'text-align: center; color: #666; padding: 20px;';
            scheduleList.appendChild(emptyMsg);
            return;
        }
        
        // 按时间排序
        const sortedSchedules = [...schedules].sort((a, b) => a.time.localeCompare(b.time));
        
        sortedSchedules.forEach((schedule, index) => {
            const originalIndex = schedules.findIndex(s => 
                s.time === schedule.time && s.content === schedule.content
            );
            const scheduleBlock = createScheduleBlock(schedule, originalIndex);
            scheduleList.appendChild(scheduleBlock);
        });
    }
    
    // 添加日程事件
    addButton.addEventListener('click', function() {
        const time = timeInput.value;
        const content = contentInput.value.trim();
        
        if (!time) {
            showMessage('请选择时间！', 'warning');
            return;
        }
        
        if (!content) {
            showMessage('请输入日程内容！', 'warning');
            return;
        }
        
        const newSchedule = {
            time: time,
            content: content,
            id: Date.now() // 简单ID生成
        };
        
        schedules.push(newSchedule);
        localStorage.setItem('dailySchedules', JSON.stringify(schedules));
        
        // 清空输入框
        timeInput.value = '';
        contentInput.value = '';
        
        renderScheduleList();
        showMessage('日程添加成功！', 'success');
    });
    
    // 支持按回车键添加
    contentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
    
    // 显示消息函数
    function showMessage(message, type) {
        const existingMsg = document.querySelector('.schedule-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = 'schedule-message';
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
        
        if (type === 'success') messageDiv.style.backgroundColor = '#28a745';
        else if (type === 'warning') messageDiv.style.backgroundColor = '#ffc107';
        else if (type === 'info') messageDiv.style.backgroundColor = '#17a2b8';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
    
    // 将日程规划区域添加到页面
    const existingSections = document.querySelectorAll('div[id]');
    if (existingSections.length > 0) {
        existingSections[0].parentNode.insertBefore(scheduleSection, existingSections[0]);
    } else {
        document.body.appendChild(scheduleSection);
    }
    
    // 初始渲染
    renderScheduleList();
    
    console.log('日程规划功能已加载！');
    console.log('当前日程:', schedules);
});
