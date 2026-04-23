# Monorepo & Turborepo — Khái niệm

> Tài liệu này giải thích các khái niệm cốt lõi của monorepo, pnpm workspaces và Turborepo.  
> Xem hướng dẫn thực hành tại [setup.md](./setup.md).

---

## 1. Monorepo là gì?

**Monorepo** (monolithic repository) là cách tổ chức nhiều project/app trong **cùng một Git repository**, thay vì mỗi project một repo riêng lẻ.

```
❌ Polyrepo (nhiều repo)          ✅ Monorepo (một repo)
─────────────────────────         ─────────────────────────
repo: my-web-app                  repo: my-company
repo: my-api                        ├── apps/
repo: my-shared-utils               │   ├── web/
                                    │   └── api/
                                    └── packages/
                                        └── shared-utils/
```

### Lợi ích
- Chia sẻ code (types, utils, components) giữa các app mà không cần publish lên npm
- Một lần `git clone` có toàn bộ codebase
- Refactoring xuyên suốt nhiều app cùng lúc
- Quản lý phiên bản dependencies nhất quán

### Nhược điểm
- Repo lớn hơn theo thời gian
- Cần tooling (pnpm workspaces + Turborepo) để quản lý hiệu quả

---

## 2. pnpm Workspaces

**pnpm** là package manager hỗ trợ **workspaces** — cơ chế cho phép nhiều package trong cùng một repo dùng chung `node_modules`.

### Khai báo workspace

File `pnpm-workspace.yaml` ở **root**:

```yaml
packages:
  - "apps/*"      # mọi folder trong apps/ đều là một workspace package
  - "packages/*"  # shared libraries
```

### Cấu trúc node_modules với pnpm

pnpm dùng **symlinks + content-addressable store**: mỗi package chỉ được download/lưu một lần trên máy, các workspace package symlink đến store đó → tiết kiệm disk và cài nhanh hơn npm/yarn.

```
root/
  node_modules/     ← dependencies dùng chung (hoisted)
  apps/
    web/
      node_modules/ ← symlinks đến root hoặc deps riêng của web
    api/
      node_modules/ ← symlinks đến root hoặc deps riêng của api
```

### Cài dependencies

```bash
# Cài vào một workspace cụ thể
pnpm add express --filter api
pnpm add react --filter web

# Cài devDependency vào root
pnpm add -D turbo -w

# Cài tất cả packages (giống npm install)
pnpm install
```

### `--filter` flag

```bash
pnpm --filter api dev       # chạy script "dev" của package tên "api"
pnpm --filter web build     # chạy script "build" của package tên "web"
```

> Tên dùng trong `--filter` là trường **`name`** trong `package.json` của từng app.

---

## 3. Turborepo

**Turborepo** là build system tối ưu cho monorepo: chạy các tasks song song, cache kết quả, và hiểu dependency graph giữa các packages.

### `turbo.json` — cấu hình pipeline

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],   // build dependencies trước khi build package này
      "outputs": [".next/**", "dist/**"]  // cache những folder này
    },
    "dev": {
      "cache": false             // không cache task dev (luôn chạy mới)
    },
    "lint": {},
    "test": {
      "outputs": ["coverage/**"]
    }
  }
}
```

### Cách Turborepo hoạt động

```
turbo run build
  ├── Đọc dependency graph từ package.json
  ├── Xác định thứ tự chạy (topological sort)
  ├── Kiểm tra cache (hash của source files + env vars)
  │     └── Cache hit → replay output, bỏ qua build
  │     └── Cache miss → chạy task thật sự
  └── Chạy các tasks độc lập SONG SONG
```

### `dependsOn: ["^build"]`

Ký hiệu `^` có nghĩa: **chạy `build` của tất cả dependencies trước**.  
Ví dụ: nếu `web` phụ thuộc `packages/ui`, Turborepo sẽ build `ui` trước rồi mới build `web`.

### So sánh có/không có Turborepo

| | Không có Turbo | Có Turborepo |
|---|---|---|
| Chạy tasks | Tuần tự, thủ công | Song song, tự động theo graph |
| Cache | Không có | Hash-based, replay output |
| Biết package nào thay đổi | Không | Có — chỉ rebuild những gì cần |

---

> Xem hướng dẫn setup thực tế tại [setup.md](./setup.md).
