# 待办清单

一个简洁的待办事项管理应用，支持中英文切换和明暗主题。基于 React + TypeScript + Vite 构建。

## 功能

- **添加 / 勾选 / 删除** 待办事项，即时反馈
- **筛选** 全部 / 进行中 / 已完成
- **暗色 & 亮色主题** — 跟随系统偏好，手动切换后持久化
- **中英文切换** — 语言选择持久化到本地
- **LocalStorage 持久化** — 刷新页面不丢失数据
- **响应式设计** — 桌面端和移动端均可使用
- **GitHub Pages 自动部署** — CI/CD 集成

## 技术栈

| 层 | 技术 |
|-------|-----------|
| 框架 | [React 19](https://react.dev/) |
| 语言 | [TypeScript 6](https://www.typescriptlang.org/) |
| 构建 | [Vite 8](https://vite.dev/) |
| 代码检查 | [ESLint 10](https://eslint.org/) |
| 部署 | GitHub Actions → GitHub Pages |

## 快速开始

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

## 可用命令

| 命令 | 说明 |
|---------|-------------|
| `npm run dev` | 启动开发服务器（热更新） |
| `npm run build` | 类型检查并构建生产版本 |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | 代码检查 |

## 项目结构

```
src/
├── main.tsx                  # 入口文件
├── App.tsx                   # 根组件（状态管理、业务逻辑）
├── App.css                   # 全局样式（亮色/暗色变量）
├── i18n.tsx                  # 国际化上下文（中/英文）
├── types.ts                  # TypeScript 类型定义
└── components/
    ├── TodoInput.tsx         # 添加待办输入框
    ├── TodoList.tsx          # 待办列表（含空状态）
    ├── TodoItem.tsx          # 单个待办项
    ├── TodoFilters.tsx       # 筛选栏（全部/进行中/已完成）
    ├── TodoStats.tsx         # 统计信息 + 清除已完成按钮
    ├── ThemeToggle.tsx       # 主题切换按钮
    └── LangToggle.tsx        # 语言切换按钮
```

## 部署

推送代码到 `main` 分支会触发 GitHub Actions 自动构建并部署到 GitHub Pages。也可以在 Actions 页面手动触发部署。
