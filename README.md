# Skills

我自己在各大 Harness 用的 Skills/Plugins 列表

## Install as a Plugin

本仓库目前作为单插件 Marketplace 进行分发，安装本插件将一次性获得所有 skills 插件
（视未来 skills 规模我们可能会更改此行为）

### Claude Code

```bash
claude plugin marketplace add Moemu/skills
claude plugin install muika-skills@muika-skills
```

### Codex

```bash
codex plugin marketplace add Moemu/skills
codex plugin add muika-skills@muika-skills
```

### Update References(Optional)

`skills/chinese-tech-writing/references/sources/` 下有两个 git submodule（阮一峰规范、Microsoft Writing Style Guide）作为参考资料引用，部分 Harness 可能无法处理此引用，请视情况手动执行子模块的拉取/更新：

```bash
git submodule init
```

```bash
git submodule update --remote --merge
```

## SKILLS

| 技能                   | 说明                                                         | 对我工作流的影响 |
| ---------------------- | ------------------------------------------------------------ | ---------------- |
| `chinese-tech-writing` | 🚧简体中文技术文档写作规范：排版硬规则、语气与用词、标题结构、UI 文案、ASD-STE100 受控英语，附审校清单 | 目前没有显著影响 |
| `dafeiyu-persona`      | 🚧蓝色大肥鱼（DeepSeek 娘）人格补充：外观、称呼、完整台词库、梗图直链、来历与出处，附本机素材位置 | 目前没有显著表现 |

## AGENTS.md

| 名称                                 | 说明                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| [AGENTS.codex.md](./AGENTS.codex.md) | 🚧为 GPT 6 Codex 系列模型特调的 AGENTS.md，包含绝大多数编码约束（如最小侵入原则、复杂度审查规范等等），也适用于其他 Harness |
| [AGENTS.dsh.md](./AGENTS.dsh.md)     | 🚧为 DeepSeek 特调的**角色扮演型** AGENTS.md，在保留前者编码约束核心的情况下，加入了大肥鱼的设定 |

## License

本仓库代码与文档使用 MIT 许可，见 [LICENSE](LICENSE)。`skills/chinese-tech-writing/references/sources/` 下的第三方资料不适用 MIT，沿用各自许可：

- 阮一峰《中文技术文档的写作规范》：公共领域。
- Microsoft Writing Style Guide：CC BY 4.0，以源仓库 LICENSE 为准。
- Microsoft Chinese (Simplified) Localization Style Guide（`MS-zho-chn-StyleGuide.md`）：按[微软语言门户](https://www.microsoft.com/en-us/language/StyleGuides)的使用条款处理，本仓库保存的是本地转换稿。
- ASD-STE100 不在 `sources/` 下；`references/asd-ste100-core.md` 只是提炼转述，原标准为 ASD 版权所有，本仓库不含原文。

## 🚧Appendix·AI 写不出好项目吗？

_Work In Progress_