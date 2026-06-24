# YanLab 网站部署指南 / Deployment Guide

## 文件结构 / File Structure

```
yanlab/
├── index.html          ← 首页 / Homepage
├── css/
│   └── style.css       ← 全局样式 / Global styles
├── js/
│   ├── main.js         ← 语言切换 + 动画 / Lang switch + animations
│   └── nav-footer.js   ← 导航栏 + 页脚 / Navbar + footer
├── pages/
│   ├── pi.html         ← 关于闫老师 / About PI
│   ├── research.html   ← 研究方向 / Research
│   ├── team.html       ← 团队成员 / Team
│   ├── publications.html ← 学术成果 / Publications
│   ├── news.html       ← 新闻动态 / News
│   ├── lablife.html    ← 实验室生活 / Lab Life
│   ├── joinus.html     ← 加入我们 / Join Us
│   └── contact.html    ← 联系我们 / Contact
└── assets/
    └── images/         ← 放照片这里 / Put photos here
```

---

## GitHub Pages 部署步骤 / Deployment Steps

### 1. 创建 GitHub 账号和仓库

1. 去 https://github.com 注册账号（如没有）
2. 点击右上角 "+" → "New repository"
3. 仓库名建议：`yanlab` 或 `yanliying-lab`
4. 选择 **Public**（免费方案必须公开）
5. 点击 "Create repository"

### 2. 上传文件

**方法A — 网页直接上传（最简单）：**
1. 进入仓库页面，点击 "uploading an existing file"
2. 把整个 yanlab 文件夹拖进去
3. 点击 "Commit changes"

**方法B — 用 Git（推荐，方便以后更新）：**
```bash
git init
git add .
git commit -m "初始版本 / Initial commit"
git remote add origin https://github.com/你的用户名/yanlab.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 进入仓库 → 点击 "Settings"
2. 左侧找到 "Pages"
3. Source 选 "Deploy from a branch"
4. Branch 选 "main"，文件夹选 "/ (root)"
5. 点击 "Save"

几分钟后，网站地址会显示：
`https://你的用户名.github.io/yanlab/`

---

## 国内加速部署（可选）/ CDN for China (Optional)

国内用户访问 GitHub Pages 可能偏慢，可选择以下方案：

### 方案一：Gitee Pages（免费）
1. 去 https://gitee.com 注册
2. 把代码同步到 Gitee
3. 开启 Gitee Pages（在仓库设置中）
4. 国内用户访问 Gitee 地址，海外用户访问 GitHub 地址

### 方案二：阿里云/腾讯云 OSS（约10元/月）
1. 开通对象存储 OSS
2. 上传所有网站文件
3. 开启静态网站托管
4. 可绑定自定义域名（需备案）

**推荐：** 先用 GitHub Pages，等网站内容完善后再考虑国内加速。

---

## 如何替换照片 / How to Replace Photos

### 1. 首页 Hero 照片（闫老师写真）
在 `index.html` 找到 `id="hero-photo"` 的元素，
在 `<div class="hero-photo-inner">` 内添加：
```html
<img src="assets/images/prof-yan.jpg" alt="闫丽盈教授">
```
图片建议：正方形，至少 600×600 px。

### 2. 手绘元素
把手绘图片拍照保存为 PNG（背景透明最佳），放入 `assets/images/`，
然后在 Hero 区域将 `.handdrawn-frame` div 替换为：
```html
<img src="assets/images/handdrawn-deco.png" 
     alt="" 
     style="position:absolute;inset:-40px;width:calc(100%+80px);pointer-events:none;">
```

### 3. 团队成员头像
在 `pages/team.html` 找到对应成员卡片，
将 `.member-avatar` 内的首字母文字替换为：
```html
<img src="../assets/images/member-name.jpg" alt="成员姓名">
```

### 4. Lab Life 照片墙
在 `pages/lablife.html` 的每个 `.polaroid-img` 中添加：
```html
<img src="../assets/images/lablife-01.jpg" alt="活动描述">
```

---

## 中英文切换说明 / Bilingual System

每个文字块用 `data-zh` 或 `data-en` 属性标记：
```html
<span data-zh>中文内容</span>
<span data-en>English content</span>
```

网站会根据用户浏览器语言自动选择，用户也可点击右上角按钮手动切换。
偏好设置保存在浏览器本地，下次访问自动记忆。

---

## 内容填写指南 / Content Guide for Lab Members

| 页面 | 需要填写的内容 |
|------|--------------|
| team.html | 所有成员的名字、头像、研究方向 |
| publications.html | 完整论文列表（至少近5年） |
| news.html | 实验室大事记、获奖、活动 |
| pi.html | 闫老师的完整经历、一句寄语 |
| lablife.html | 团建、聚餐、毕业等照片 |
| contact.html | 确认联系方式是否正确 |

---

有任何问题，联系网站建设者即可！
