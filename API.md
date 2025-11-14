
Learn Timer API 文档

本文件描述 Learn Timer 的 API 接口格式。

/api/ai/advice
POST

说明： 根据用户输入生成学习建议。

请求：

{
  "goal": "想学习区块链"
}


返回：

{
  "advice": "从 Solidity 基础开始…"
}

/api/review/next
GET

说明： 返回下一次复习时间。

返回：

{
  "nextReview": "2025-01-12 10:00"
}

/api/schedule/generate
POST

生成一份学习日程。

/api/timer/start
POST

启动计时器。

