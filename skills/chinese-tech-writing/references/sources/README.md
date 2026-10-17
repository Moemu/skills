# 资料完整备份说明

本目录保存三份写作规范的 Markdown 备份，采集于 2026-09-26。其中 `document-style-guide/` 与 `microsoft-style-guide-en/` 是 git submodule，`MS-zho-chn-StyleGuide.md` 与这份说明是普通文件；未初始化子模块时两个 submodule 目录为空，普通文件仍可正常使用。

## 1. 阮一峰《中文技术文档的写作规范》

- 目录：`document-style-guide/`
- 来源：https://github.com/ruanyf/document-style-guide （git clone，master 分支）
- 内容：`README.md` + `docs/` 六章（title 标题、text 文本、paragraph 段落、number 数值、marks 标点符号、structure 文档体系）+ reference 参考链接
- 许可：公共领域（public domain）

## 2. 微软《Chinese (Simplified) Localization Style Guide》

- 文件：`MS-zho-chn-StyleGuide.md`（由本地 PDF `zho-chn-StyleGuide.pdf` 经 pymupdf4llm 转换，仅清理了每页页脚 "Page X of Y"，内容未删改）
- 原文获取：Microsoft 语言门户（Microsoft Locale Style Guides），58 页
- 内容：Microsoft voice（2）、包容性语言（3）、语言专项规范——缩写/首字母缩略词/形容词/连词/口语俚语/修饰语/数字/介词/代词/标点/句子片段/动词（4.1）、本地化考虑——无障碍/产品名/错误消息/快捷键/键名/语音视频（5）
- 注意：该指南原文为英文说明 + 中英对照示例表
- 许可：按微软语言门户（Microsoft Language Portal）条款使用；本仓库保存的是本地转换稿，不替代官方发行版

## 3. 微软《Microsoft Writing Style Guide》

- 目录：`microsoft-style-guide-en/`
- 来源：https://github.com/MicrosoftDocs/microsoft-style-guide （git clone，main 分支，950 篇 Markdown 源文件）
- 内容：品牌声音、Top 10 tips、A–Z 词汇表与术语集、清单、标点、大写、数字、语法、无障碍、全球沟通、UI 文案、聊天机器人等全部章节
- 重要说明：learn.microsoft.com/zh-cn/style-guide 的中文站点**并无实际中文翻译**——已验证页面正文（welcome、top-10-tips、brand-voice、punctuation、word-choice 等）在 `/zh-cn` 下全部回退显示英文原文（页面中文仅为导航框架 UI，canonical 指向 en-us）。因此本仓库的英文源文件即是用户在 zh-cn 站点上看到的内容，为该 URL 的完整有效备份。
- 许可：见仓库内 `LICENSE`（CC BY 4.0 类，以 LICENSE 文件为准）

## 三份资料的分工

| 资料 | 强项 |
|---|---|
| 阮一峰 | 中文排版硬规则：标点、空格、数字、标题层级、文档结构 |
| 微软中文指南 | 简体中文本地化：语气（你/您）、翻译腔、软件 vs 文档两套标点、术语、UI 与错误消息 |
| 微软英文指南 | 写作理念与全局决策：voice 三原则、扫读优先、大写/清单/主题句等写作方法 |
| ASD-STE100（见 `../asd-ste100-core.md`） | 受控写作：一词一义、句长量化、步骤祈使化、安全提示三段式 |

## 4. ASD-STE100 简明技术英语（只提炼，未备份原文）

- 提炼文件：`../asd-ste100-core.md`（核心规则体系与理念，约 3000 词）
- 原文：ASD-STE100 Issue 9（2025-01-15，ASD STEMG，433 页，本地 PDF）
- **原文未做备份**：该标准为 ASD 版权所有的付费规范，按用户要求只提炼核心思想（不多于 10,000 tokens），提炼文件为释义转述，不替代权威条文；需逐条引用规则原文时以官方发行版为准。
