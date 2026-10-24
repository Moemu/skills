# Working Preferences

## Writing

- Use ASD-STE100 clarity principles in any language; formal compliance is not required.
- Use common words, short sentences, active voice, and one topic per paragraph. Keep terms consistent and preserve technical names, code, paths, and quotations.
- Keep English instructions at or below 20 words. Do not apply English word counts to Chinese.

## Documentation

- Write for a reader who meets the project for the first time. Give the conclusion and the next step before the background.
- Structure as overview, quickstart, then depth. Do not skip heading levels; keep one topic per section.
- State one action per step. Put conditions first, then the command.
- For Chinese text, use a space between Chinese and Latin text, full-width punctuation, and half-width digits. Address the reader as 你.
- Avoid defensive phrasing; explain a boundary only when a common misconception requires it.
- Before keeping a sentence, remove it and check whether the reader can still finish the task. If yes, delete it.

## Autonomy and Completion

- Infer scope, intended outcome, and completion criteria from the request and context. Complete authorized implementation, validation, and delivery.
- Choose an efficient method unless the user requires a specific process. Preserve the project's defining behavior and user experience.
- Resolve routine, reversible choices with reasonable assumptions. Ask only when missing facts materially affect the result or where approval is required.
- Complete independent authorized work before asking. Pause only dependent steps.
- Preserve project and skill approval gates, including approval at action time and current-turn authorization. These defaults do not expand environment permissions.
- Recommended skill steps and implementation preferences are not approval gates. Review-only and proposal-first requests prohibit edits until authorized.
- Treat mid-task corrections and questions as updates unless the user clearly replaces or cancels the task. Answer side questions, then resume unfinished work.
- Report completed work, blocking evidence, and remaining work when blocked. Never present partial results as complete.

## Planning

- For nontrivial work and plan mode, list artifacts before capabilities: each new class, module, and top-level function with its second caller; each deleted artifact; the net count; and what is deliberately not done.
- Give measurable acceptance conditions. "Cleaner" and "more maintainable" are not conditions.
- Keep the plan as the boundary: do not add tools, parameters, sub-features, or configuration keys outside it.

## Context and Instructions

- Load context relevant to the task. Follow required reads, then expand only when dependencies or uncertainty justify it.
- Select skills by their actual workflow, not keyword overlap. Apply explicit user instructions over skill guidance.
- If an instruction blocks or redirects work, cite its source and exact wording. Keep explicit requirements separate from interpretation.

## Coding and Design

- Follow project conventions. Choose names that express domain meaning; use one term per concept.
- Prefer explicit types and interfaces. Do not hide known data structures behind dynamic attribute access or broad types.
- Remove unnecessary work before simplifying, optimizing, or automating. Leave sound code alone.
- Keep logic in one function unless reuse or a real named concept requires the split. Reuse existing mechanisms; avoid speculative abstractions, compatibility layers, and options.
- Validate unknown input once at the boundary that owns it. Pass typed values inward instead of repeating `typeof` or property-existence checks; do not revalidate what a schema, constructor, or internal type already guarantees.
- Do not extract a single-use helper preemptively. Inline at the call site unless the helper is reused, hides a genuinely complex boundary, or names a real concept that clarifies the caller.
- Never add complexity for a speculative race, security, or robustness edge case without stating the concrete failure mode, its likelihood, and the complexity it costs, then getting the user's agreement. Do not expand scope silently.
- Inline values used once. Prefer fewer variables, ternaries, and early returns over reassignment.
- Avoid `try`/`catch` unless this location must handle the error.
- Match behavior to interface names and caller expectations. Report failures clearly; let callers with business context choose fallbacks.
- Do not add production parameters or branches solely for tests. Test useful behavior at a maintenance cost proportionate to defect risk.
- Express intent through names and structure. Reserve comments for necessary constraints and reasons; avoid narration, decorative dividers, and change history.

## Code Review

- Before delivery, review requirement coverage, behavior, responsibility boundaries, and unnecessary complexity.
- Run a separate complexity review with a delete list. Self-review finds defects; complexity review finds bloat. Report "none found" instead of skipping it.
- Prioritize functional, data, compatibility, and maintenance issues. Give the location, trigger, impact, and a concrete fix.
- Mark each finding fixed, filed, or rejected with a reason. Separate confirmed defects, unverified risks, and optional suggestions. Do not disguise preferences as risks or repeat formatter findings.
- Judge actual call paths and user experience. When reviewing a plan, improve it within its goal rather than replacing the task.
- A shared execution path, a permission boundary, or a new top-level package needs a second review from a different model. Record the reviewer; two passes by one model are one pass.
- When you admit a defect class, sweep for the same pattern and name every site, or write "swept, no others found".

## Validation

- Prove completion with the real artifact: run the flow, read the actual value, inspect the diff. Build success, self-report, and mock logs are not evidence.
- Explain where a measured number comes from and what limits it before drawing a conclusion.
- Test behavior users can observe. Keep maintenance cost proportional to defect risk; do not mirror implementation details.
- Before delivery, check the diff against these five: a single-use helper, a value validated twice, a branch for a state nothing produces, an unnecessary `try`/`catch`, and a change the user did not request.
- Run the required checks. Do not weaken hooks, assertions, type checks, or tests to pass. Report a skipped check with its reason, never as passed.
- Pure documentation edits need no unrelated code tests.

## Delivery

- State each change as `path:line` with one sentence on why it exists.
- Map every plan item to its location and mark it done, partial, or not done.
- Give the verification command with its actual result. A completion claim without a location is not a claim.
- Defer work only with its cause. Fix a failure the user names where it occurs, or file it with its cause.

## UI and Interaction

- Start from user goals and main workflows. Favor efficiency, visual focus, and a distinct project identity over generic AI layouts.
- Keep text that helps users understand state or act. Show technical details only when they support decisions or troubleshooting.
- Verify actual interaction results. Check navigation, input, scrolling, feedback, and failure states where affected.

## Instruction Maintenance

- When updating instructions, remove stale or duplicate guidance before adding rules. Keep project-specific details local.
- Give each project its own root AGENTS.md for commands, known failure modes, validation entry points, and architectural invariants. Keep those facts out of global preferences.
- Scope new rules to the demonstrated problem. Preserve intentional boundaries and avoid universal procedures for isolated failures.
