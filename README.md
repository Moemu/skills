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
| `chinese-tech-writing` | 简体中文技术文档写作规范：以 Less is More（最小化写作）为核心，覆盖语法（排版、标点、数字、术语）、风格、结构、特殊文档类型（README 与发行说明、UI 文案、简明英语思想），附审校清单 | 用于 README、发行说明、文档站与中文文档审校；按读者完成任务的过程组织内容，写行为与结果。 |
| `dafeiyu-persona`      | 蓝色大肥鱼（DeepSeek 娘）人格补充：外观、称呼、完整台词库、梗图直链、来历与出处，附本机素材位置 | 好玩 |

## AGENTS.md

| 名称                                 | 说明                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| [AGENTS.codex.md](./AGENTS.codex.md) | 为 GPT 6 Codex 系列模型特调的 AGENTS.md，包含绝大多数编码约束（如最小侵入原则、复杂度审查规范等等），也适用于其他 Harness |
| [AGENTS.dsh.md](./AGENTS.dsh.md)     | 为 DeepSeek Harness 特调的**角色扮演型** AGENTS.md，在保留前者编码约束核心的情况下，加入了大肥鱼的设定 |

## Third-party Skills

| 技能                                                         | 说明                                                         | 对我工作流的作用                                             |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 大名鼎鼎的防过度工程 SKILL                                   | 在编写代码之后进行冗余审查。审查效果受限于模型性能，以删除重复类/无效引用为主，对整体影响有限。建议在编写代码前让模型加载此 SKILL 以获取其核心思想。 |
| [pstack](https://github.com/cursor/plugins/tree/main/pstack) | [poteto](https://x.com/poteto) 的 SKILL 列表，包含了很多的 SKILL | 由于这个 SKILL 的内容非常多，我还没来得及研究每个 SKILL 的作用，以及技能的影响面。我只是把它的核心思想融入到了 [AGENTS.dsh.md](./AGENTS.dsh.md) 。未来我可能做一个消融测试来评估这个 SKILL 集 |
| [test-audit](https://github.com/openclaw/openclaw/tree/main/.agents/skills/test-audit) | 测试审查 SKILL                                               | 我定时执行这个 SKILL 用来审计项目的测试，用来删除那些垃圾、脆弱的单元测试。如果可能，让你的代理以端到端、按用户实际使用路径为主的系统测试代替脆弱的单元测试。 |

## 🚧 Benchmarks

根据我过往三个月的会话记录设计的消融测试，用于评估每个技能的作用

_Work In Progress_

## License

本仓库代码与文档使用 MIT 许可，见 [LICENSE](LICENSE)。`skills/chinese-tech-writing/references/sources/` 下的第三方资料不适用 MIT，沿用各自许可：

- 阮一峰《中文技术文档的写作规范》：公共领域。
- Microsoft Writing Style Guide：CC BY 4.0，以源仓库 LICENSE 为准。
- Microsoft Chinese (Simplified) Localization Style Guide（`MS-zho-chn-StyleGuide.md`）：按[微软语言门户](https://www.microsoft.com/en-us/language/StyleGuides)的使用条款处理，本仓库保存的是本地转换稿。
- ASD-STE100 不在 `sources/` 下；`references/asd-ste100-core.md` 只是提炼转述，原标准为 ASD 版权所有，本仓库不含原文。

## 另请阅读

[杂谈·能和我写一辈子代码吗？ - 雪萌天文台](https://blog.snowy.moe/posts/21190/)
