# API文档说明

# 1️⃣ 记忆曲线回顾接口

## 📌 接口说明

根据艾宾浩斯记忆曲线计算下一次复习的推荐时间。

## 📍 请求方式

```
GET /api/review/next
```

## 📮 请求参数

| 参数名      | 类型   | 必填 | 说明                       |
| ----------- | ------ | ---- | -------------------------- |
| topic       | string | 是   | 学习主题，如 "数据结构"    |
| last_review | string | 是   | 上次复习时间（YYYY-MM-DD） |

示例：
 `/api/review/next?topic=算法&last_review=2025-01-05`

## 📤 返回示例

```
{
  "status": "success",
  "topic": "算法",
  "next_review": "2025-01-10",
  "model": "Ebbinghaus Memory Curve"
}
```

------

# 2️⃣ 记忆曲线回顾接口

## 📌 接口说明

根据艾宾浩斯记忆曲线计算下一次复习的推荐时间。

## 📍 请求方式

```
GET /api/review/next
```

## 📮 请求参数

| 参数名      | 类型   | 必填 | 说明                       |
| ----------- | ------ | ---- | -------------------------- |
| topic       | string | 是   | 学习主题，如 "数据结构"    |
| last_review | string | 是   | 上次复习时间（YYYY-MM-DD） |

示例：
 `/api/review/next?topic=算法&last_review=2025-01-05`

## 📤 返回示例

```
{
  "status": "success",
  "topic": "算法",
  "next_review": "2025-01-10",
  "model": "Ebbinghaus Memory Curve"
}
```

------

# 3️⃣ 学习日程规划接口

## 📌 接口说明

根据用户提供的任务内容和规划天数生成学习日程表。

## 📍 请求方式

```
POST /api/schedule/generate
```

## 📮 请求 Body（JSON）

| 字段名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| task   | string | 是   | 学习任务，如 "复习区块链" |
| days   | int    | 是   | 规划天数                  |

## 📤 请求示例

```
{
  "task": "复习数据结构",
  "days": 5
}
```

## 📤 返回示例

```
{
  "status": "success",
  "schedule": [
    "Day1: 线性表",
    "Day2: 栈与队列",
    "Day3: 树结构",
    "Day4: 查找与排序基础",
    "Day5: 综合复习与练习"
  ]
}
```