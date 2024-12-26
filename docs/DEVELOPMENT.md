# 开发指南

本文档提供了项目的详细开发指南，帮助开发者快速上手和理解项目结构。

## 目录

- [开发环境设置](#开发环境设置)
- [项目结构](#项目结构)
- [开发规范](#开发规范)
- [调试技巧](#调试技巧)
- [性能优化](#性能优化)
- [常见问题](#常见问题)

## 开发环境设置

### 必需工具

- Node.js >= 16
- npm >= 8
- Git
- VS Code（推荐）

### VS Code 插件推荐

- ESLint
- Prettier
- TypeScript + JavaScript
- SCSS IntelliSense
- GitLens
- Error Lens

### 环境变量配置

在项目根目录创建 `.env` 文件：

```bash
# API 配置
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=5000

# 应用配置
VITE_APP_TITLE=古诗词网
VITE_APP_DESCRIPTION=品味传统文化之美，感受诗词之韵
```

## 项目结构

```
src/
  ├── components/     # 可复用组件
  │   ├── Poem/      # 诗词相关组件
  │   └── common/    # 通用组件
  ├── pages/         # 页面组件
  │   ├── Home/      # 首页
  │   ├── PoemDetail/# 诗词详情页
  │   └── Favorites/ # 收藏页
  ├── services/      # API 服务
  ├── store/         # Redux store
  │   ├── slices/    # Redux slices
  │   └── index.ts   # Store 配置
  ├── styles/        # 全局样式
  ├── types/         # TypeScript 类型定义
  └── utils/         # 工具函数
```

## 开发规范

### 代码风格

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 使用 SCSS Modules 进行样式隔离

### 命名规范

- 组件文件：PascalCase（如 `PoemCard.tsx`）
- 样式文件：与组件同名（如 `PoemCard.module.scss`）
- 工具函数：camelCase（如 `formatDate.ts`）
- 常量：UPPER_SNAKE_CASE（如 `MAX_PAGE_SIZE`）

### Git 提交规范

```bash
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

## 调试技巧

### Redux DevTools

使用 Redux DevTools 浏览器扩展来调试 Redux 状态：

1. 安装 Redux DevTools 浏览器扩展
2. 在开发环境中自动启用
3. 可以查看状态变化历史和时间旅行调试

### React Developer Tools

使用 React Developer Tools 调试组件：

1. 安装 React Developer Tools 浏览器扩展
2. 查看组件树和 props
3. 分析组件重渲染

## 性能优化

### 代码分割

- 使用 React.lazy 和 Suspense 进行代码分割
- 路由级别的组件懒加载
- 大型第三方库的动态导入

### 性能监控

- 使用 React Profiler 分析组件性能
- 监控不必要的重渲染
- 使用 useMemo 和 useCallback 优化性能

### 图片优化

- 使用适当的图片格式（WebP）
- 实现懒加载
- 使用响应式图片

## 常见问题

### 1. 开发环境启动失败

**问题**：运行 `npm run dev` 时报错

**解决方案**：
1. 检查 Node.js 版本是否符合要求
2. 删除 `node_modules` 并重新安装依赖
3. 检查端口是否被占用

### 2. TypeScript 类型错误

**问题**：遇到类型定义相关的错误

**解决方案**：
1. 检查 `tsconfig.json` 配置
2. 确保所有必要的类型定义包已安装
3. 使用 VS Code 的类型提示

### 3. 样式冲突

**问题**：组件样式相互影响

**解决方案**：
1. 确保使用 CSS Modules
2. 避免使用全局样式
3. 使用特定的类名前缀 