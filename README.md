# Cookie小铺 — 技术文档网站

基于 Next.js 14 + TypeScript + Tailwind CSS + Framer Motion 构建的技术文档网站。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **搜索**: Fuse.js (本地模糊搜索)
- **暗黑模式**: next-themes
- **图标**: Lucide React

## 功能特性

- 全屏渐变 Hero 区域，带动态粒子背景
- 打字机效果标题
- 毛玻璃导航栏，滚动进度条
- 可折叠侧边栏目录树
- macOS 风格代码块（带复制按钮、行号）
- 本地 Fuse.js 搜索（Cmd+K 快捷键）
- 平滑滚动锚点导航
- 暗黑/亮色模式切换
- 回到顶部按钮
- 响应式设计（移动端抽屉式侧边栏）
- 页面切换动画

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态站点
npm run build

# 构建输出在 dist/ 目录
```

## 项目结构

```
cookie-docs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   ├── template.tsx       # 页面过渡动画
│   └── globals.css        # 全局样式
├── components/            # 组件
│   ├── Hero.tsx           # 首屏 Hero
│   ├── Navbar.tsx         # 导航栏
│   ├── Sidebar.tsx        # 侧边栏
│   ├── SearchDialog.tsx   # 搜索对话框
│   ├── MarkdownContent.tsx # Markdown 渲染
│   ├── CodeBlock.tsx      # 代码块
│   ├── ParticleBackground.tsx # 粒子背景
│   ├── TypewriterText.tsx # 打字机效果
│   ├── BackToTop.tsx      # 回到顶部
│   ├── theme-provider.tsx # 主题提供者
│   └── theme-toggle.tsx   # 主题切换
├── lib/
│   ├── content.ts         # 文档数据
│   └── utils.ts           # 工具函数
└── types/
    └── index.ts           # TypeScript 类型
```

## 文档数据来源

文档内容来自 `lib/content.ts`，由原始 Markdown 文件解析生成。

## 许可证

MIT
