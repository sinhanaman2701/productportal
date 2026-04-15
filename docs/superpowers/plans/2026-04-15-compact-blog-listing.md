# Compact Blog Listing - UI Refinement Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce empty space and make the blog listing more compact by decreasing image size, reducing padding/margins, and tightening the overall layout.

**Design Direction:** Clean, editorial-style listing with efficient use of space. Think "Medium article list" - dense but breathable, every pixel serves a purpose.

---

## Current Issues

1. **Image too large** - `aspect-[16/9]` with full column width creates massive images
2. **Too much vertical padding** - `pb-12` and `gap-12` create excessive whitespace
3. **Typography spacing** - `mt-4`, `mt-6`, `mb-4` etc. add up to lots of empty space
4. **Grid gap** - `gap-6 md:gap-8 lg:gap-12` is too generous

---

## Target Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Tags]                                      ┌────────────  │
│ Title (compact, 1-2 lines)                  │  Image     │  │
│ Excerpt (2 lines max)                       │  (smaller) │  │
│ 👁 120  •  ❤ 85   Read more →               └────────────┘  │
├─────────────────────────────────────────────────────────────┤  ← separator
│ [Tags]                                      ┌────────────┐  │
│ ...                                                          │
```

---

## File to Modify

- `apps/web/src/components/ui/blog-listing.tsx`

---

## Implementation Steps

### Step 1: Reduce Image Size

Change from large landscape to smaller, more compact image:

**Current:**
```tsx
<div className="aspect-[16/9] ...">  // ~320x180px
```

**Change to:**
```tsx
<div className="aspect-[4/3] w-64 ...">  // ~256x192px, fixed width
```

Or use a constrained max-width:
```tsx
<div className="aspect-[16/9] max-w-[280px] ...">
```

### Step 2: Reduce Vertical Spacing

**Current → New:**
- Container gap: `gap-12` → `gap-8`
- Article padding-bottom: `pb-12` → `pb-8`
- Grid gap: `gap-6 md:gap-8 lg:gap-12` → `gap-4 md:gap-6 lg:gap-8`

### Step 3: Tighten Typography Spacing

**Current → New:**
- Tags margin-bottom: `mb-4 md:mb-6` → `mb-2 md:mb-3`
- Title margin-bottom: `mb-3` → `mb-2`
- Excerpt margin-top: `mt-4 md:mt-5` → `mt-2 md:mt-3`
- Excerpt margin-bottom: `mb-4` → `mb-3`
- Metadata margin-top: `mt-6 md:mt-8` → `mt-3 md:mt-4`
- Read more margin-top: `mt-6 md:mt-8` → `mt-3 md:mt-4`

### Step 4: Reduce Line Clamps

**Current → New:**
- Excerpt: `line-clamp-2` → keep at 2 lines (good)
- Title: `line-clamp-2` → keep at 2 lines (good)

### Step 5: Update Skeleton Loader

Match the new compact spacing in the loading state.

---

## Expected Visual Result

- **~40% less vertical space** between blog items
- **Image ~25% smaller** (width reduced from ~400px to ~280px)
- **Tighter, more scannable** list layout
- **More content visible** above the fold

---

## Execution

**Option 1: Subagent-Driven** - Dispatch subagent to implement all changes in one go

**Option 2: Inline** - Apply changes directly in this session

Which approach?
