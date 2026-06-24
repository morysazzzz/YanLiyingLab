# YanLab 内容管理指南 — Google Sheets

## 第一步：创建 Google Sheet

1. 打开 https://sheets.google.com 新建一个表格
2. 命名为 "YanLab Content"
3. 在底部创建以下 5 个 Tab（Sheet）：
   - **Members**（团队成员）
   - **Publications**（论文）
   - **News**（新闻动态）
   - **LabLife**（实验室生活）
   - **PI**（闫老师介绍）

---

## 第二步：每个 Tab 的列结构

### Members Tab（团队成员）
| 列名 | 说明 | 示例 |
|------|------|------|
| Name_ZH | 中文姓名 | 张三 |
| Name_EN | 英文姓名 | San Zhang |
| Role | 角色（必须是以下之一） | PhD |
| Focus_ZH | 研究方向（中文） | 胚胎发育表观遗传 |
| Focus_EN | 研究方向（英文） | Epigenetics of embryo development |
| Photo | 头像图片链接（可留空） | https://... |
| Email | 邮箱（可留空） | zhangsan@bjmu.edu.cn |
| Joined | 入组年份 | 2022 |

Role 必须是：PI / Postdoc / PhD / Master / Undergrad / Staff

### Publications Tab（论文）
| 列名 | 说明 | 示例 |
|------|------|------|
| Title | 论文标题 | Concurrent Preimplantation... |
| Authors | 作者列表 | Wang Y, Li Y, **Yan L*** |
| Journal | 期刊名 | Advanced Science |
| Year | 年份 | 2024 |
| DOI | DOI链接 | https://doi.org/... |
| Cover | 封面论文？ | TRUE 或留空 |
| HighlyCited | 高被引？ | TRUE 或留空 |
| TopAdvance | 中国科学十大进展？ | TRUE 或留空 |

### News Tab（新闻动态）
| 列名 | 说明 | 示例 |
|------|------|------|
| Date | 日期 | 2024-06-20 |
| Title_ZH | 标题（中文） | 团队在Advanced Science发表新成果 |
| Title_EN | 标题（英文） | Team publishes in Advanced Science |
| Desc_ZH | 简介（中文） | 基于RNA转录组... |
| Desc_EN | 简介（英文） | Using RNA-seq... |
| Tag_ZH | 标签（中文） | 论文发表 |
| Tag_EN | 标签（英文） | Publication |

### LabLife Tab（实验室生活）
| 列名 | 说明 | 示例 |
|------|------|------|
| URL | 照片链接 | https://drive.google.com/... |
| Caption_ZH | 说明（中文） | 2023年度团建 |
| Caption_EN | 说明（英文） | Annual retreat 2023 |
| Category | 分类 | 团建 / 聚餐 / 毕业 / 日常 |

---

## 第三步：发布表格

1. 点 **文件（File）** → **共享（Share）** → **发布到网络（Publish to web）**
2. 选择 **整个文档**，格式选 **CSV**
3. 点击 **发布**
4. 复制弹出的链接，从中找到你的 **Sheet ID**

Sheet ID 是链接中 `/d/` 和 `/pub` 之间的那串字母数字，例如：
`https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`**`/pub?...`

---

## 第四步：填入网站

打开 `js/sheets.js`，找到第一行：
```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
```
把 `YOUR_SHEET_ID_HERE` 替换成你的 Sheet ID，保存并上传到 GitHub。

---

## 上传照片到 Google Drive 获取链接

1. 把照片上传到 Google Drive
2. 右键照片 → **共享** → 改成"任何人都可以查看"
3. 右键 → **获取链接**，复制
4. 把链接格式从：
   `https://drive.google.com/file/d/FILE_ID/view`
   改成：
   `https://drive.google.com/uc?id=FILE_ID`
5. 把这个新链接填入表格的 Photo 或 URL 列

---

## 更新内容

以后更新内容只需要：
1. 打开 Google Sheet
2. 修改或添加一行
3. 刷新网站即可（不需要改代码！）
