# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# CareSure — Permanent Production Coding Rules

These rules apply automatically to every current and future step, screen, component, and feature in this project unless explicitly overridden in a specific request.

## 1. Production quality

Write production-level, clean, simple, reusable, maintainable, and strongly typed React Native / TypeScript code.

Prefer straightforward implementations over clever or over-engineered solutions.

The code should be understandable by another developer without needing an AI explanation.

## 2. Comments

Add simple, useful comments only where required, especially for:
- non-obvious logic
- important business rules
- platform-specific behavior
- SDK/native constraints
- intentional workarounds
- performance decisions
- code that future developers could accidentally break

Comments must explain WHY something exists, not repeat WHAT obvious code does.

Keep comments: short, professional, developer-friendly, useful.

Do not over-comment simple/self-explanatory code.

## 3. Styling

Avoid inline styles.

For components/screens, keep styles in a separate file:

```
ComponentName.tsx
ComponentName.styles.ts
```

Examples: `HomeHeader.tsx`/`HomeHeader.styles.ts`, `ProductCard.tsx`/`ProductCard.styles.ts`, `HomeScreen.tsx`/`HomeScreen.styles.ts`.

Reuse the centralized `src/theme/` design system for: colors, typography, font weights, spacing, radius, shadows, icon sizes, control sizes, opacity, borders, layout values.

Do not duplicate design values. Do not introduce unexplained magic numbers.

Runtime-dependent inline styles are allowed only when the value genuinely depends on props/state/runtime measurements and extracting it would make the implementation less clear.

## 4. File structure

Keep each file focused on one clear responsibility.

Avoid giant screens/components.

Separate when appropriate: UI, styles, hooks, types, business logic, API access, utilities, constants.

But do not over-engineer by splitting simple code into unnecessary tiny files.

## 5. Reusability

Before creating new code, check whether an existing component, hook, utility, helper, type, constant, theme token, API function, or service can be reused.

Avoid duplicate implementations.

Create shared abstractions only when they provide genuine reuse or make responsibilities clearer.

## 6. TypeScript

Keep everything strongly typed.

Avoid: `any`, unsafe casts, unnecessary non-null assertions, duplicate types/interfaces.

Use clear domain-specific types where they improve readability and safety.

## 7. React

Avoid unnecessary: `useEffect`, local state, Context, wrappers, custom hooks, `useMemo`, `useCallback`, `memo`, abstraction layers.

Do not duplicate React Query/server state into component state without a genuine reason.

Keep state as close as practical to where it belongs.

## 8. Performance

Treat Android performance as important.

Avoid: unnecessary rerenders, expensive calculations during render, unnecessary JS-thread animation, unnecessary nested ScrollViews, inefficient large lists, repeated network requests, repeated image loading, excessive listeners/subscriptions, unnecessary component mounting.

Use appropriate performant list/image/animation solutions when the feature genuinely requires them.

Do not prematurely optimize simple code.

## 9. Error handling

Do not silently swallow meaningful errors.

Keep technical errors, logging, business errors, and user-facing messages appropriately separated.

Do not leave temporary `console.log`/debugging code in production implementation.

## 10. Accessibility

Preserve appropriate: accessibility labels, roles, selected states, disabled states, touch target sizes, safe-area handling, readable typography.

Accessibility improvements must not unnecessarily redesign the approved CareSure UI.

## 11. Visual fidelity — very important

The existing old CareSure mobile app and Figma-approved design are the PRIMARY visual source of truth.

Preserve as closely as practical: layout, colors, typography, fonts, spacing, icons, original assets, dimensions, shapes, borders, shadows, positioning, visual hierarchy, interactions, animation behavior.

DO NOT redesign the UI. DO NOT make subjective visual improvements without explicit approval.

When the original CareSure/Figma asset exists, prefer reusing the original asset rather than replacing it with a visually different generic icon.

## 12. Old mobile reference

Use the old CareSure mobile project (`E:\Mobile\Caresure\Care-sure_Customer`) as the primary reference for: UI, navigation, behavior, business logic, API usage, state flows, animations, cart, checkout, prescription, orders, payment behavior, other mobile functionality.

Do not blindly copy complex legacy implementation. Understand what it does first, then implement the same required behavior cleanly for Expo SDK 57.

## 13. Web reference

Use the CareSure web project (`E:\Web\customer-website`) as a secondary reference when relevant for: current business functionality, API behavior, newer features, content, naming, current product behavior.

Do not blindly copy React web code into React Native.

## 14. SDK 57

The new SDK 57 project is the implementation target.

Do not blindly migrate old: native configuration, navigation configuration, Expo APIs, permissions, notification setup, Metro/Babel configuration, native plugins, animation infrastructure.

Verify compatibility with the current Expo SDK 57 / React Native stack first.

## 15. Screen implementation

Build screens step-by-step. Do not rebuild multiple major screens in one uncontrolled pass.

For each screen:
1. Inspect the old mobile implementation.
2. Inspect web implementation when relevant.
3. Inspect existing SDK 57 foundation/reusable code.
4. Identify behavior/UI that must be preserved.
5. Identify reusable existing code.
6. Plan target files.
7. Implement only that screen/feature.
8. Validate it.
9. Stop for review before moving to the next major screen.

## 16. Animations

Preserve approved CareSure/Figma animation behavior where required, but implement it cleanly.

Centralize reusable: durations, easings, springs, transition behavior.

Avoid random animation timings inside components.

Prefer native/Reanimated animations where appropriate. Avoid unnecessary JS-thread animation work.

Keep animations smooth on real mid-range Android devices.

## 17. Responsive layout

Do not design for only one screenshot/device width.

Prefer: Flexbox, responsive dimensions, safe-area-aware layout, `useWindowDimensions` when genuinely required, appropriate min/max sizing.

Avoid unnecessary global scaling systems and device-specific positioning hacks.

Visual fidelity must still be preserved.

## 18. Scope control

Modify only files required for the current task.

Do not: refactor unrelated features, migrate unrelated screens, install unnecessary dependencies, introduce speculative infrastructure, silently change business behavior, silently change approved UI.

If an unrelated issue is discovered, report it under WARNINGS / FOLLOW-UP instead of automatically changing it.

## 19. Cleanup

Before completing every task, check for: unused imports, dead code, duplicate styles, duplicate constants, temporary code, debug logs, obsolete code, unnecessary comments, unused dependencies introduced by the change.

Remove them when they are part of the current task's scope.

## 20. Validation

After implementation, run the appropriate checks. Normally include:

```
npx tsc --noEmit
npx expo-doctor
```

Run web/Android/iOS/build validation when relevant to the change.

Never claim Android/iOS/device behavior was tested if it was not actually tested.

## 21. Reporting

For major implementation steps, report:

```
REFERENCE FILES INSPECTED:

FILES CREATED:

FILES MODIFIED:

REUSABLE CODE USED/CREATED:

VISUAL/BEHAVIOR PRESERVED:

IMPORTANT IMPLEMENTATION DECISIONS:

COMMENTS ADDED FOR NON-OBVIOUS LOGIC:

TYPESCRIPT:
PASS / FAIL

EXPO DOCTOR:
PASS / FAIL

PLATFORM TESTING:
ANDROID:
IOS:
WEB:

WARNINGS / FOLLOW-UP:

STATUS:
PASS / NEEDS FIX
```

## 22a. Approved folder architecture (baseline)

This tree describes **ownership rules**, not folders that must exist immediately. Never scaffold an empty folder — create one only when its first real file is implemented.

```
src/
  app/          # thin Expo Router routes only — compose/export a feature screen, no business logic
  features/     # one folder per business domain (home, categories, prescription, product, search,
                # cart, checkout, orders, profile, auth, ...)
  components/   # genuinely app-wide reusable UI (Button, AppHeader, EmptyState, ErrorState, LoadingState)
  hooks/        # genuinely app-wide reusable hooks (useAppState, useDebounce)
  store/        # Zustand — client/session/global UI state only, one file per store
  services/     # cross-cutting orchestration only (analytics, push, sqlite) — never a second API layer
  api/          # shared Axios/HTTP infrastructure only (client, config, errors, generic types)
  lib/          # third-party library configuration (React Query client, etc.)
  navigation/   # shared navigation/tab/transition infrastructure — app-wide chrome, not a feature
  theme/        # design system / tokens
  types/        # genuinely cross-domain types only
  utils/        # generic, domain-agnostic pure utilities only
  constants/    # genuine app-wide constants not already covered by theme/
```

**Feature internal structure** — grows only as needed, stays shallow:
```
src/features/home/
  HomeScreen.tsx
  HomeScreen.styles.ts
  components/   # only when the feature has more than one internal reusable piece
  hooks/        # only when genuinely needed
  api/          # only when the feature calls endpoints
  types.ts      # only when feature-specific types exist
```
A single-screen feature does NOT get a `screens/` folder — the screen file(s) sit directly in the feature root. Only introduce `src/features/<feature>/screens/` once that feature genuinely has multiple screens (e.g. `product/screens/{ProductDetailsScreen,SubstituteScreen}.tsx`).

**Global vs feature-local:**
- Default to feature-local. Code moves to `src/components/`/`src/hooks/` only when it has clearly app-wide responsibility (a generic UI primitive, a generic hook with no domain knowledge) OR has proven cross-feature reuse — not "might be reused someday."
- `src/services/` must never become a parallel API layer — feature endpoints belong in `features/<feature>/api/`; `src/api/` is shared HTTP infra only.

**State ownership:** React Query owns server/API state. Zustand owns only justified client/session/global UI state. Local React state owns screen/component-local transient state. Never duplicate React Query data into Zustand without a concrete reason.

**Migration:** no reorganization of Steps 1–8 output is required — `src/api/`, `src/theme/`, `src/navigation/`, `src/lib/react-query/`, `src/app/` are already correctly placed and stay as-is.

## 22b. Permanent implementation workflow

For every feature/step: (1) analyze the requirement, (2) inspect current SDK 57 implementation, (3) inspect old CareSure mobile as the primary behavioral/business/UI reference, (4) inspect CareSure web where it adds current business/API/domain information, (5) decide what existing code can be reused, (6) design the smallest feature-specific file structure, (7) briefly explain each proposed file and why it's needed, (8) only then create/edit files, (9) validate, (10) stop for approval before the next major step.

**Reuse before rewrite:** reuse/copy proven old CareSure code (clean, correct, SDK57-compatible, performant, maintainable) with only necessary changes. Rewrite only for a concrete reason (incompatibility, unnecessary legacy complexity, duplicated responsibility, unsafe behavior, poor maintainability, performance problem, incorrect architecture) — never to make code look different. For important files report briefly: `WHY REUSED/COPIED:` / `WHY CHANGED:` / `WHY REWRITTEN:`.

## 22c. Extended reporting fields

For major implementation steps, also include when giving the ## 21 report — `SYSTEM DESIGN:` (smallest structure needed) and `WHY REUSED / WHY CHANGED / WHY REWRITTEN` per important file — alongside the existing report fields.

## 22d. State ownership (approved, Step 9 design)

- **React Query** = server/API state. **Zustand** = only justified cross-screen client/session/UI state. **Local React state** = transient component/screen state. **Reanimated shared values** (not Zustand) = per-frame/per-scroll animation state (matches the old app's own proven reasoning for `tabBarVisibility.ts`/`feedScrolling.ts`).
- Never mirror a React Query response into Zustand (no stored `cart`/`profile`/`orders`/`notifications`-list objects). No giant `appStore`/`uiStore` grab-bag — split by actual ownership instead.
- Narrow selectors only (`useStore(s => s.field)`, never the whole store). Persist selectively (`partialize`) only when the product genuinely needs the value to survive a restart. SecureStore for sensitive credentials (tokens); AsyncStorage only for non-sensitive persisted state (guest cart, checkout draft, selected address).
- The following stores are **approved candidates only, not mandatory files** — do not create any of them speculatively. When that store's owning feature is implemented: re-inspect the real flow, confirm cross-screen/global state is actually required, prefer local state or React Query when sufficient, and create the store only if the concrete implementation requires it:
  - `authStore` — session flags only (`isAuthenticated`, `isGuest`, `isLoaded`, `token`); profile data stays in React Query, not duplicated here.
  - `features/checkout/checkoutDraftStore` — consolidates old app's checkoutStore + checkoutDraftStore + couponStore; bill breakdown itself stays a React Query result, not stored state.
  - `features/cart/cartStore` — guest-local cart only; authenticated cart contents stay in React Query (+ socket, when built).
  - `features/prescription/prescriptionDraftStore` (+ possibly a separate order-draft store, or consolidated — decide at implementation time).
  - `features/orders/returnDraftStore` — only if the multi-screen return flow genuinely requires it.
  - `store/toastStore` — only once global toast infrastructure is actually built.
  - `store/alertStore` — only once a genuine global alert-dialog system is actually built.

## 23. Final principle

Preserve CareSure's approved UI and behavior while improving the underlying engineering.

| Aspect | Rule |
|---|---|
| Old/Figma UI | PRESERVE |
| Business behavior | PRESERVE |
| Original assets | REUSE where appropriate |
| SDK implementation | MODERNIZE |
| Code structure | CLEAN |
| Styles | SEPARATE `*.styles.ts` |
| Reusability | IMPROVE |
| Type safety | STRONG |
| Comments | ONLY USEFUL WHY-comments |
| Performance | PRODUCTION-READY |
| Unnecessary complexity | AVOID |
| Unapproved redesign | NEVER |
