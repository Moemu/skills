# chinese-tech-writing

按阮一峰《中文技术文档的写作规范》、微软《Chinese (Simplified) Localization Style Guide》与《Microsoft Writing Style Guide》撰写和审校简体中文技术文档，并可用 ASD-STE100 简明技术英语约束英文技术写作。

## 什么时候用

写或改 README、教程、API 文档、发布说明、博客、产品与 UI 文案、错误提示；把英文技术内容翻译成中文；讨论中文标点、中英文混排空格、数字用法、标题层级、文档结构、语气风格；要求简化英语或安全关键文档时。

## 文件

| 文件 | 用途 |
|---|---|
| `SKILL.md` | 主规范：触发描述、硬性规则、冲突裁决、审校流程 |
| `references/quick-check.md` | 正误对照自检清单 |
| `references/asd-ste100-core.md` | ASD-STE100 核心规则提炼 |
| `references/sources/` | 三份规范原文备份（其中两份为 git submodule，可选） |

## 安装

Claude Code：

```text
/plugin marketplace add Moemu/skills
/plugin install muika-skills@muika-skills
```

其他客户端：把本目录（`skills/chinese-tech-writing/`）复制到客户端的 skills 目录，`references/` 保持相对位置即可。

完整原文备份需要初始化两个 submodule（阮一峰规范、Microsoft Writing Style Guide）：

```bash
git submodule update --init --recursive
```

不初始化也能正常使用技能：`MS-zho-chn-StyleGuide.md` 与 `sources/README.md` 仍在，只有两个 submodule 目录为空。

## 来源与许可

- 阮一峰《中文技术文档的写作规范》：公共领域。
- Microsoft Writing Style Guide：CC BY 4.0。
- Microsoft Chinese (Simplified) Localization Style Guide：按微软语言门户条款使用，仓库内为本地转换备份。
- ASD-STE100：ASD 版权所有，仓库内仅有提炼转述，不含原文。

本技能自身代码与文档使用 MIT 许可，第三方资料沿用各自许可，见仓库根目录 [LICENSE](../../LICENSE)。
