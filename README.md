# Muika Skills

我自己的 Agent Skills 集合。仓库根目录就是一个 [Agent Plugins 1.0.0](https://agent-plugins.org/) 插件，同时可作为 [Claude Code](https://code.claude.com/docs/en/plugins) 插件市场使用。市场与插件同名：`muika-skills`。

## 安装

### Claude Code

在会话里依次执行：

```text
/plugin marketplace add Moemu/skills
/plugin install muika-skills@muika-skills
```

本地开发时，把 `Moemu/skills` 换成仓库路径：

```text
/plugin marketplace add D:\skills
```

也可以在终端执行同样两步：

```bash
claude plugin marketplace add Moemu/skills
claude plugin install muika-skills@muika-skills
```

### 其他支持 Agent Plugins 的客户端

克隆仓库并初始化子模块：

```bash
git clone --recurse-submodules https://github.com/Moemu/skills.git
```

仓库根目录就是插件根，直接交给客户端加载；也可以只把 `skills/<技能名>/` 复制到客户端的 skills 目录。

不初始化子模块也能用：技能正文、精简参考和 MS 中文指南转换稿都在仓库里。未初始化时只有 `skills/chinese-tech-writing/references/sources/` 下两个 submodule 目录为空（阮一峰规范、Microsoft Writing Style Guide）。从 GitHub 安装时客户端不会自动初始化子模块；需要完整原文就手动执行 `git submodule update --init --recursive`。

### 复制单个技能

```bash
git clone --depth 1 https://github.com/Moemu/skills.git muika-skills
cp -r muika-skills/skills/chinese-tech-writing ~/.claude/skills/
```

其他客户端把目标换成自己的 skills 目录即可，例如 `~/.dsh/skills/`。

## 技能列表

| 技能 | 说明 | 版本 |
|---|---|---|
| `chinese-tech-writing` | 简体中文技术文档写作规范：排版硬规则、语气与用词、标题结构、UI 文案、ASD-STE100 受控英语，附审校清单 | `0.1.0` |

插件 `muika-skills` 目前只包含这一个技能，以后新增技能直接放进 `skills/`。

## 仓库结构

```text
.
├── plugin.json                                 # Agent Plugins 清单（仓库根即插件根）
├── .claude-plugin/
│   ├── plugin.json                             # Claude Code 插件清单
│   └── marketplace.json                        # Claude Code 市场清单（source: "./"）
├── .github/workflows/
│   └── validate-plugins.yml                    # CI 校验
├── skills/
│   └── chinese-tech-writing/
│       ├── SKILL.md
│       ├── README.md
│       └── references/
│           ├── quick-check.md
│           ├── asd-ste100-core.md
│           └── sources/                        # 三份规范原文备份（其中两份为 git submodule）
├── scripts/
│   └── validate-plugins.mjs                    # 市场与插件校验
├── LICENSE
└── README.md
```

## 开发

### 新增技能

1. 新建 `skills/<技能名>/SKILL.md`，frontmatter 写 `name` 与 `description`；`name` 必须与目录名一致。
2. 技能的参考文件放在同一目录，引用路径相对 `SKILL.md`。
3. 按需更新根 `plugin.json`、`.claude-plugin/plugin.json` 和 `.claude-plugin/marketplace.json` 的 description、keywords。
4. 跑校验：

```bash
node scripts/validate-plugins.mjs
```

### 校验

校验脚本检查市场清单、两个插件清单、`skills/` 目录结构、`SKILL.md` frontmatter 和技能内的本地引用，不依赖第三方包。CI 在每次 push 与 pull request 时运行同一脚本。

装了 Claude Code 时，还可以用官方命令校验清单：

```bash
claude plugin validate . --strict
claude plugin validate .claude-plugin/plugin.json --strict
```

### 更新原文备份

`skills/chinese-tech-writing/references/sources/` 下有两个 git submodule（阮一峰规范、Microsoft Writing Style Guide），另外 `MS-zho-chn-StyleGuide.md` 与 `sources/README.md` 是普通文件：

```bash
git submodule update --remote --merge
```

## 许可

本仓库代码与文档使用 MIT 许可，见 [LICENSE](LICENSE)。`skills/chinese-tech-writing/references/sources/` 下的第三方资料不适用 MIT，沿用各自许可：

- 阮一峰《中文技术文档的写作规范》：公共领域。
- Microsoft Writing Style Guide：CC BY 4.0，以源仓库 LICENSE 为准。
- Microsoft Chinese (Simplified) Localization Style Guide（`MS-zho-chn-StyleGuide.md`）：按[微软语言门户](https://www.microsoft.com/en-us/language/StyleGuides)的使用条款处理，本仓库保存的是本地转换稿。
- ASD-STE100 不在 `sources/` 下；`references/asd-ste100-core.md` 只是提炼转述，原标准为 ASD 版权所有，本仓库不含原文。
