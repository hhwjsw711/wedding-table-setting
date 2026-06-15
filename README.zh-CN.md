# Wedding Table Planner · 婚礼桌位规划器

**一个优雅的拖拽式婚礼桌位规划工具。创建方案，分配宾客到桌位，一键分享链接。**

[![English](https://img.shields.io/badge/README-English-blue)](README.md) [![Italiano](https://img.shields.io/badge/README-Italiano-green)](README.it.md)

---

![婚礼桌位规划器](public/og-image.png)

---

## 功能

- **拖拽排座** — 从侧边栏拖拽宾客到桌位
- **圆桌 & 矩形桌** — 混合桌形，自定义每边座位数
- **CSV 导入** — 批量导入宾客，自动识别列头
- **饮食标签** — 自动识别素食、纯素、无麸质、坚果过敏、清真、犹太洁食等
- **按组自动落座** — 一键将同组成员分配到同一桌
- **多方案管理** — 一个账户管理多个婚礼方案
- **链接分享** — 生成只读分享链接，发送给新人、场地经理或宾客查看
- **多语言** — English、简体中文、Italiano

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + React Router v7 |
| 语言 | TypeScript（strict 模式） |
| 构建 | Vite 7 |
| 后端 | Convex（实时数据库） |
| 认证 | Convex Auth（邮箱 + 密码） |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 图标 | Lucide React |
| 包管理 | pnpm |

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动 Convex 开发部署（生成类型、创建云部署）
npx convex dev

# 启动前端开发服务器（另一个终端）
pnpm dev

# 生产构建
pnpm build
```

浏览器打开 `http://127.0.0.1:5173`。

需要注册免费的 [Convex](https://convex.dev) 账号作为后端。

---

## 架构

规划器使用 [Convex](https://convex.dev) 进行持久化存储、认证和实时数据同步。方案、桌位、宾客和座位分配存储在 Convex 文档中，通过响应式查询自动同步到 UI。

| 操作 | 数据流 |
|------|--------|
| 登录 / 注册 | Convex Auth（邮箱 + 密码） |
| 创建 / 管理方案 | Convex mutations → 实时查询 |
| 增删改桌位和宾客 | Convex mutations → 响应式 UI |
| 拖拽分配座位 | 乐观更新 → Convex mutation → 自动同步 |
| 分享 | 生成唯一令牌 → `/view/:token`（公开） |

---

## 许可

MIT
