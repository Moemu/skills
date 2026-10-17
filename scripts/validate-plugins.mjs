#!/usr/bin/env node
// 校验市场清单、插件清单与技能目录结构。不依赖第三方包。
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const AGENT_PLUGIN_SCHEMA = 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json';
const NAME_PATTERN = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
const SKILL_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const PLUGIN_KEYS = new Set([
  '$schema',
  'name',
  'version',
  'description',
  'author',
  'homepage',
  'repository',
  'license',
  'keywords',
  'extensions',
]);
const SKILL_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);

const errors = [];
let pluginCount = 0;
let skillCount = 0;

function report(message) {
  errors.push(message);
}

function shortPath(filePath) {
  return relative(root, filePath).split('\\').join('/');
}

function readJson(filePath, label) {
  if (!existsSync(filePath)) {
    report(`${label} 不存在：${shortPath(filePath)}`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (error) {
    report(`${label} 不是合法 JSON：${shortPath(filePath)}（${error.message}）`);
    return null;
  }
}

function requireString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    report(`${label} 必须是非空字符串`);
    return false;
  }
  return true;
}

function checkPluginName(name, label) {
  if (!requireString(name, label)) return;
  if (name.length > 64) report(`${label} 超过 64 个字符：${name}`);
  if (!NAME_PATTERN.test(name) || name.includes('--') || name.includes('..')) {
    report(`${label} 不符合命名规则：${name}`);
  }
}

function checkSkillName(name, label) {
  if (!requireString(name, label)) return;
  if (name.length > 64) report(`${label} 超过 64 个字符：${name}`);
  if (!SKILL_NAME_PATTERN.test(name)) report(`${label} 只能使用小写字母、数字和连字符：${name}`);
}

function resolveSource(source) {
  if (!requireString(source, '市场清单的 source')) return null;
  // 本仓库的市场只登记仓库内的插件，远程 source 由客户端另行解析。
  if (/^https?:\/\//.test(source)) {
    report(`本地市场的 source 必须是仓库内相对路径：${source}`);
    return null;
  }
  const fullPath = resolve(root, source);
  const rel = relative(root, fullPath);
  if (rel.startsWith('..') || isAbsolute(rel)) {
    report(`source 越出仓库目录：${source}`);
    return null;
  }
  if (!existsSync(fullPath) || !statSync(fullPath).isDirectory()) {
    report(`source 目录不存在：${source}`);
    return null;
  }
  return fullPath;
}

function extractFrontmatter(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  if (lines[0] !== '---') return null;
  const end = lines.indexOf('---', 1);
  return end === -1 ? null : lines.slice(1, end).join('\n');
}

function parseScalarFrontmatter(source) {
  const values = {};
  const lines = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim() === '' || line.startsWith('#')) continue;
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    if (/^[|>][+-]?$/.test(value)) {
      const folded = value.startsWith('>');
      const block = [];
      while (index + 1 < lines.length && (/^\s/.test(lines[index + 1]) || lines[index + 1].trim() === '')) {
        index += 1;
        block.push(lines[index].trim());
      }
      value = block.join(folded ? ' ' : '\n').trim();
    }
    values[match[1]] = value.replace(/^(['"])(.*)\1$/, '$2').trim();
  }
  return values;
}

function validateLocalReferences(text, skillDir, label) {
  const targets = new Set();
  for (const match of text.matchAll(/`((?:\.\.?\/)?(?:references|scripts|assets)\/[^`\s]+)`/g)) {
    targets.add(match[1].replace(/[),.;:]+$/, ''));
  }
  for (const match of text.matchAll(/\]\((?!https?:|mailto:|#)([^)#\s]+)(?:#[^)]*)?\)/g)) {
    targets.add(match[1]);
  }
  for (const target of targets) {
    if (target.startsWith('/') || target.includes('://')) continue;
    const targetPath = resolve(skillDir, target);
    const rel = relative(skillDir, targetPath);
    if (rel.startsWith('..') || isAbsolute(rel)) {
      report(`${label}: 引用路径越出技能目录 ${target}`);
    } else if (!existsSync(targetPath)) {
      report(`${label}: 引用路径不存在 ${target}`);
    }
  }
}

function validateSkill(filePath, skillName, label) {
  const text = readFileSync(filePath, 'utf8');
  const frontmatter = extractFrontmatter(text);
  if (frontmatter === null) {
    report(`${label}: SKILL.md 开头缺少 --- frontmatter`);
    return;
  }
  const meta = parseScalarFrontmatter(frontmatter);
  for (const key of Object.keys(meta)) {
    if (!SKILL_KEYS.has(key)) report(`${label}: frontmatter 含 Agent Skills 未定义的字段 ${key}`);
  }
  if (!meta.name) {
    report(`${label}: frontmatter 缺少 name`);
  } else if (meta.name !== skillName) {
    report(`${label}: frontmatter name 与目录名不一致（${meta.name}）`);
  } else {
    checkSkillName(meta.name, `${label}: name`);
  }
  if (!meta.description) {
    report(`${label}: frontmatter 缺少 description`);
  } else if (meta.description.length > 1024) {
    report(`${label}: description 超过 1024 个字符`);
  }
  validateLocalReferences(text, dirname(filePath), label);
}

function validateSkills(pluginDir, pluginName) {
  const skillsDir = join(pluginDir, 'skills');
  if (!existsSync(skillsDir) || !statSync(skillsDir).isDirectory()) {
    report(`${pluginName}: 缺少 skills/ 目录`);
    return;
  }
  const skillDirs = readdirSync(skillsDir).filter((name) => statSync(join(skillsDir, name)).isDirectory());
  if (skillDirs.length === 0) {
    report(`${pluginName}: skills/ 下没有技能目录`);
    return;
  }
  for (const skillName of skillDirs) {
    const skillFile = join(skillsDir, skillName, 'SKILL.md');
    if (!existsSync(skillFile)) {
      report(`${pluginName}/${skillName}: 缺少 SKILL.md`);
      continue;
    }
    skillCount += 1;
    validateSkill(skillFile, skillName, `${pluginName}/${skillName}`);
  }
}

function validateAgentManifest(pluginDir, entryName) {
  const manifest = readJson(join(pluginDir, 'plugin.json'), `${entryName}: plugin.json`);
  if (!manifest) return null;
  if (manifest.$schema !== AGENT_PLUGIN_SCHEMA) {
    report(`${entryName}: plugin.json 的 $schema 必须是 ${AGENT_PLUGIN_SCHEMA}`);
  }
  for (const key of Object.keys(manifest)) {
    if (!PLUGIN_KEYS.has(key)) report(`${entryName}: plugin.json 含 Agent Plugins 未定义的顶层字段 ${key}`);
  }
  checkPluginName(manifest.name, `${entryName}: plugin.json name`);
  if (manifest.name !== undefined && manifest.name !== entryName) {
    report(`${entryName}: plugin.json name 与市场清单不一致（${manifest.name}）`);
  }
  for (const key of ['version', 'description', 'homepage', 'repository', 'license']) {
    if (manifest[key] !== undefined && typeof manifest[key] !== 'string') {
      report(`${entryName}: plugin.json ${key} 必须是字符串`);
    }
  }
  if (manifest.author !== undefined && (typeof manifest.author !== 'object' || manifest.author === null)) {
    report(`${entryName}: plugin.json author 必须是对象`);
  }
  if (manifest.keywords !== undefined && !Array.isArray(manifest.keywords)) {
    report(`${entryName}: plugin.json keywords 必须是数组`);
  }
  if (manifest.extensions !== undefined && (typeof manifest.extensions !== 'object' || manifest.extensions === null)) {
    report(`${entryName}: plugin.json extensions 必须是对象`);
  }
  return manifest;
}

function validateClaudeManifest(pluginDir, entryName, agentManifest) {
  const manifest = readJson(join(pluginDir, '.claude-plugin', 'plugin.json'), `${entryName}: .claude-plugin/plugin.json`);
  if (!manifest) return;
  checkPluginName(manifest.name, `${entryName}: Claude Code 清单 name`);
  if (manifest.name !== undefined && manifest.name !== entryName) {
    report(`${entryName}: Claude Code 清单 name 与市场清单不一致（${manifest.name}）`);
  }
  if (agentManifest?.version && manifest.version && agentManifest.version !== manifest.version) {
    report(`${entryName}: 两个清单的 version 不一致（${agentManifest.version} / ${manifest.version}）`);
  }
}

const marketplace = readJson(join(root, '.claude-plugin', 'marketplace.json'), '市场清单');

if (marketplace) {
  requireString(marketplace.name, '市场清单 name');
  if (typeof marketplace.owner !== 'object' || marketplace.owner === null) {
    report('市场清单缺少 owner 对象');
  } else {
    requireString(marketplace.owner.name, '市场清单 owner.name');
  }
  if (!Array.isArray(marketplace.plugins) || marketplace.plugins.length === 0) {
    report('市场清单 plugins 必须是非空数组');
  } else {
    const seen = new Set();
    for (const [index, entry] of marketplace.plugins.entries()) {
      const label = `市场清单 plugins[${index}]`;
      if (typeof entry !== 'object' || entry === null) {
        report(`${label} 必须是对象`);
        continue;
      }
      checkPluginName(entry.name, `${label}.name`);
      requireString(entry.description, `${label}.description`);
      if (seen.has(entry.name)) report(`${label}.name 重复：${entry.name}`);
      seen.add(entry.name);
      const pluginDir = resolveSource(entry.source);
      if (!pluginDir) continue;
      pluginCount += 1;
      const agentManifest = validateAgentManifest(pluginDir, entry.name);
      validateClaudeManifest(pluginDir, entry.name, agentManifest);
      if (entry.version && agentManifest?.version && entry.version !== agentManifest.version) {
        report(`${entry.name}: 市场清单 version 与 plugin.json 不一致（${entry.version} / ${agentManifest.version}）`);
      }
      validateSkills(pluginDir, entry.name);
    }
  }
}

if (errors.length > 0) {
  console.error(`校验失败，共 ${errors.length} 项：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`校验通过：${pluginCount} 个插件，${skillCount} 个技能。`);
}
