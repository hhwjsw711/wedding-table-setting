# Wedding Table Planner · 婚礼桌位规划器

**一个优雅的拖拽式婚礼桌位规划工具，完全在浏览器中运行。无需注册 — 一个链接即可分享方案。**

[![English](https://img.shields.io/badge/README-English-blue)](README.md) [![Italiano](https://img.shields.io/badge/README-Italiano-green)](README.it.md)

---

![婚礼桌位规划器](public/og-image.png)

---

## 功能

- **拖拽操作** — 从侧边栏拖拽宾客到座位上
- **圆形/矩形桌** — 混合使用不同桌型，自由调整每边座位数
- **CSV 导入** — 批量导入宾客，自动识别表头
- **饮食标注** — 自动识别素食、全素、无麸质、坚果过敏、清真、犹太洁食等
- **按组自动分配** — 一键将同组宾客安排到同一桌
- **一键分享** — 整体方案编码在 URL 中，粘贴链接即可分享
- **多语言** — English、简体中文、Italiano

---

## 在线体验

打开 [weddingtable.cn](https://weddingtable.cn)，开始规划吧。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 |
| 语言 | TypeScript（strict 模式） |
| 构建 | Vite 7 |
| 样式 | Tailwind CSS v4 + shadcn/ui |
| 图标 | Lucide React |
| 包管理 | pnpm |

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build
```

浏览器打开 `http://127.0.0.1:5173`。

---

## 工作原理

没有后端，没有数据库。整个规划状态 — 桌位、宾客、座位分配 — 被序列化为 JSON，经 base64 编码后存储在 URL 的 `?state=` 查询参数中。语言偏好存储在 `?lang=` 中。

| 操作 | 数据流 |
|------|--------|
| 创建/编辑桌位 | React 状态 → URL |
| 添加/导入宾客 | React 状态 → URL |
| 拖拽宾客到座位 | React 状态 → URL |
| 分享 | 复制 URL → 粘贴到任何地方 |

---

## 项目结构

```
src/
├── main.tsx                 # 入口
├── App.tsx                  # 主规划器 — 所有状态集中管理
├── i18n.tsx                 # 国际化 (en / zh / it)
├── styles.css               # 全局样式与 CSS 自定义属性
├── components/
│   ├── table-view.tsx       # 桌位可视化（圆形与矩形布局）
│   ├── table-editor.tsx     # 侧边栏桌位配置面板
│   ├── guest-chip.tsx       # 可拖拽宾客卡片
│   ├── seat-button.tsx      # 单个座位按钮
│   ├── guest-edit-modal.tsx # 宾客编辑弹窗
│   ├── seat-assignment-modal.tsx # 座位分配弹窗
│   ├── dietary-badges.tsx   # 饮食限制彩色标签
│   ├── stat.tsx             # 统计卡片
│   └── ui/                  # shadcn/ui 基础组件（13个）
├── hooks/
│   └── use-mobile.ts        # 移动端断点 Hook
├── lib/
│   └── utils.ts             # Tailwind class 合并工具
└── planner/
    ├── types.ts             # 核心类型定义
    ├── constants.ts         # 饮食标签定义、初始状态
    └── utils.ts             # 座位生成、CSV 解析、URL 编解码、分组算法
```

---

## License

MIT
