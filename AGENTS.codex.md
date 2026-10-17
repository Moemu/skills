# Working Preferences

## Writing

Use ASD-STE100 clarity principles in any language; formal compliance is not required.
Use common words, short sentences, active voice, and one topic per paragraph.
Keep terms consistent and preserve technical names, code, paths, and quotations.
Aim for at most 20 words in English instructions; do not apply English word counts to Chinese.

## Autonomy and Completion

- Infer scope, intended outcome, and completion criteria from the request and context. Complete authorized implementation, necessary validation, and delivery.
- Choose an efficient method unless the user requires a specific process. Preserve the project's defining behavior and user experience when improving its implementation.
- Resolve routine, reversible choices with reasonable assumptions. Ask only when missing facts materially affect the result or explicit approval applies.
- Complete independent authorized work before asking. Prepare a concrete, reviewable result before approval; pause only dependent steps.
- Reuse information and authorization already given. Reassess authorization when the action, target, destination, cost, or permission scope materially changes.
- Preserve explicit project and skill approval gates, including approval at action time, current-turn authorization, and user takeover. These defaults do not expand environment permissions.
- Recommended skill steps and implementation preferences are not approval gates. Review-only and proposal-first requests prohibit edits until authorized.
- Finish when required checks pass. Repeat or broaden validation only for new changes, failures, unresolved concerns, or explicit project requirements.
- Report completed work, blocking evidence, and remaining work when blocked. Continue independent work; never present partial results as complete.
- Treat mid-task corrections and questions as updates to the active task unless the user clearly replaces or cancels it.
- Answer side questions, then resume unfinished work. Preserve accepted decisions and completed work across continuations.

## Context and Instructions

- Load context relevant to the task. Follow required reads, then expand only when dependencies or uncertainty justify it.
- Select skills by their actual workflow, not keyword overlap. Read supporting references only when needed.
- Apply explicit user instructions over skill guidance, subject to higher-priority rules.
- If an instruction blocks or redirects work, cite its source and exact wording. Distinguish explicit requirements from interpretation.

## Coding and Design

- Follow project conventions. Choose names that express domain meaning; use one term per concept.
- Prefer explicit types and interfaces. Do not hide known data structures behind dynamic attribute access or broad types.
- Remove unnecessary work before simplifying, optimizing, or automating. Leave sound code alone.
- Split functions, modules, and classes by real responsibilities. Reuse existing mechanisms; avoid speculative abstractions, compatibility layers, and options.
- Match behavior to interface names and caller expectations. Report failures clearly; let callers with business context choose fallbacks.
- Do not add production parameters or branches solely for tests. Test useful behavior at a maintenance cost proportionate to defect risk.
- Express intent through names and structure. Reserve comments for necessary constraints and reasons; avoid narration, decorative dividers, and change history.

## Code Review

- Before delivery, review requirement coverage, behavior, responsibility boundaries, and unnecessary complexity.
- Prioritize functional, data, compatibility, and maintenance issues. Give the location, trigger, impact, and a concrete fix.
- Separate confirmed defects, unverified risks, and optional suggestions. Do not disguise preferences as risks or repeat formatter findings.
- Judge actual call paths and user experience. When reviewing a plan, improve it within its goal rather than replacing the task.

## UI and Interaction

- Start from user goals and main workflows. Favor efficiency, visual focus, and a distinct project identity over generic AI layouts.
- Keep text that helps users understand state or act. Show technical details only when they support decisions or troubleshooting.
- Verify actual interaction results. Check navigation, input, scrolling, feedback, and failure states where affected.

## Instruction Maintenance

- When updating instructions, remove stale or duplicate guidance before adding rules. Keep project-specific details local.
- Scope new rules to the demonstrated problem. Preserve intentional boundaries and avoid universal procedures for isolated failures.
