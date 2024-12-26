# GitHub 工作流程指南

本文档描述了我们的 GitHub 工作流程，包括从创建议题到合并代码的完整过程。

## 环境准备 (Windows)

1. **安装 Git**
   - 访问 https://git-scm.com/download/win 下载 Git for Windows
   - 运行安装程序，使用默认设置即可
   - 安装完成后，打开 PowerShell 验证安装：
     ```bash
     git --version
     ```

2. **安装 GitHub CLI**
   - 使用 winget 安装：
     ```bash
     winget install GitHub.cli
     ```
   - 或访问 https://cli.github.com/ 下载安装程序
   - 安装完成后，在 PowerShell 中登录：
     ```bash
     gh auth login
     ```
   - 按照提示完成认证过程

## 工作流程概述

1. 创建议题
2. 创建功能分支
3. 开发和提交代码
4. 创建 Pull Request
5. 代码评审
6. 合并代码

## 详细步骤

### 1. 创建议题

使用 GitHub CLI 创建议题：

```bash
# 创建功能议题（Windows PowerShell）
gh issue create -t "feat: 添加新功能" -b "功能描述：`n`n- 功能点1`n- 功能点2"

# 创建文档议题
gh issue create -t "docs: 更新文档" -b "文档更新内容：`n`n- 更新点1`n- 更新点2"
```

### 2. 创建功能分支

基于议题创建功能分支：

```bash
# 功能分支示例（议题 #1）
git checkout -b feature/1-new-feature

# 文档分支示例（议题 #4）
git checkout -b docs/4-update-docs
```

### 3. 开发和提交代码

提交代码时关联议题：

```bash
# 功能开发示例
git add .
git commit -m "feat: add new feature - Closes #1"

# 文档更新示例
git commit -m "docs: update documentation - Closes #4"
```

提交类型：
- feat: 新功能
- fix: 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

### 4. 创建 Pull Request

推送分支并创建 PR：

```bash
# 推送功能分支
git push -u origin feature/1-new-feature

# 创建 PR（Windows PowerShell）
gh pr create -t "feat: add new feature" -b "功能说明。Closes #1"

# 如果命令行创建遇到问题，可以使用网页界面
gh pr create --web
```

### 5. 代码评审

添加评审评论：

```bash
# 评审示例
gh pr review <PR编号> --comment -b "评审意见"

# 批准 PR
gh pr review <PR编号> --approve -b "代码已审核，同意合并"
```

评审重点：
- 功能完整性
- 代码质量
- 测试覆盖
- 性能考虑
- 安全性

### 6. 合并代码

合并 PR 并删除分支：

```bash
# 合并 PR
gh pr merge <PR编号> --merge --delete-branch
```

## 常见问题

1. **PowerShell 中的换行符**
   - 在 PowerShell 中使用 `` `n `` 作为换行符
   - 例如：`"第一行`n第二行"`

2. **命令行显示问题**
   - 如果命令行显示有问题，可以使用 `--web` 参数在浏览器中操作
   - 例如：`gh pr create --web`

3. **认证问题**
   - 如果遇到认证问题，重新运行：`gh auth login`
   - 确保有足够的权限范围（repo, read:org 等）

## 最佳实践

1. **分支命名**
   - 功能分支：feature/1-new-feature
   - 修复分支：fix/2-bug-fix
   - 文档分支：docs/4-update-docs
   - 总是包含议题编号

2. **提交信息**
   - 使用约定式提交规范
   - 关联相关议题
   - 清晰描述更改内容

3. **代码评审**
   - 详细的评审评论
   - 关注代码质量和测试
   - 提供建设性的改进建议

## 快速参考

```bash
# 创建议题
gh issue create -t "标题" -b "内容"

# 创建分支
git checkout -b branch-name

# 提交代码
git add .
git commit -m "type: message - Closes #1"

# 推送分支
git push -u origin branch-name

# 创建 PR
gh pr create -t "标题" -b "内容"

# 评审 PR
gh pr review <PR编号> --comment -b "评审意见"

# 合并 PR
gh pr merge <PR编号> --merge --delete-branch
``` 