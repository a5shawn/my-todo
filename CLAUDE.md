# CLAUDE.md

本文件用于指导 Claude Code（claude.ai/code）在此仓库中工作。

## 常用命令

- `npm run dev` — 启动开发服务器（HMR），默认 localhost:5173
- `npm run build` — `tsc -b && vite build`（类型检查 + 生产构建）
- `npm run preview` — 本地预览生产构建
- `npm run lint` — 运行 ESLint 检查所有文件

## 架构

### 数据流

所有状态集中在 `App.tsx`（单一数据源），不使用外部状态管理库：

```
App（状态持有者）
 ├─ TodoInput   → 调用 onAdd(text)
 ├─ TodoFilters → 调用 onFilterChange(filter)
 ├─ TodoList    → 接收 filteredTodos，调用 onToggle/onDelete
 │   └─ TodoItem (每行)
 └─ TodoStats   → 接收 activeCount，调用 onClearCompleted
```

组件通过 props 接收数据和回调。唯一例外是 `useLanguage()` hook，各组件可直接消费 i18n context。

### 持久化策略

所有状态通过 `useEffect` 同步到 `localStorage`：

| 键 | 内容 | 同步时机 |
|-----|---------|-------------|
| `todos` | `Todo[]` JSON | todos 每次变化时 |
| `theme` | `"light"` / `"dark"` | 主题每次切换时 |
| `lang` | `"zh"` / `"en"` | 通过 `setLang` 设置 |

初始值通过 `useState(() => ...)` 惰性读取，直接同步读 localStorage。

### 主题

- CSS 自定义属性定义在 `:root` / `[data-theme="dark"]`（`App.css`）
- `App.tsx` 在主题变化时设置 `document.documentElement.dataset.theme`
- 初始主题优先读取 localStorage，其次 `prefers-color-scheme`

### 国际化 (i18n)

- 自定义 React Context（`i18n.tsx`），`LanguageProvider` 在 `main.tsx` 中包裹应用
- `useLanguage()` 返回 `{ lang, setLang, t }`，所有组件通过 `t(key)` 获取字符串
- 消息映射为静态 `Record<Lang, Record<string, string>>`，支持 `{n}` 插值
- 新增语言：在 `messages` 中添加条目，扩展 `Lang` 类型，`LangToggle` 会循环切换所有语言

### 关键类型

- `Todo` — `{ id: number, text: string, completed: boolean }`
- `Filter` — `'all' | 'active' | 'completed'`

### 组件约定

- 组件通过 props 接收数据和回调（除 `useLanguage` 外，不直接在组件中消费 context）
- 空状态在 `TodoList` 中处理（渲染 `<p className="empty-msg">`）
- 无 CSS-in-JS，所有样式在 `App.css` 中通过 class name 控制
- 无路由，单页应用

## 部署

推送 `main` 分支 → GitHub Actions 自动构建并部署到 GitHub Pages（vite.config.ts 中 `base: '/my-todo/'`）。也可在 Actions 页面手动触发。
