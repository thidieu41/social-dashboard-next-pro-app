# Monorepo Setup & Project Guide

> Hướng dẫn thực hành: setup monorepo từ đầu và tài liệu cấu trúc dự án này.  
> Xem giải thích khái niệm tại [monorepo.md](./monorepo.md).

---

## 1. Setup từ đầu (Step-by-step)

### Yêu cầu

```bash
# Cài pnpm nếu chưa có
npm install -g pnpm

# Kiểm tra phiên bản
pnpm -v   # >= 9
node -v   # >= 18
```

### Bước 1: Khởi tạo repo

```bash
mkdir my-monorepo && cd my-monorepo
git init
pnpm init
```

Sửa `package.json` root:

```json
{
  "name": "my-monorepo",
  "private": true,
  "packageManager": "pnpm@10.21.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.9.6"
  }
}
```

> `"private": true` bắt buộc — ngăn root package bị publish lên npm.

### Bước 2: Tạo `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Bước 3: Tạo `turbo.json`

```json
{
  "tasks": {
    "dev": { "cache": false },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {},
    "test": {
      "outputs": ["coverage/**"]
    }
  }
}
```

### Bước 4: Tạo các apps

```bash
mkdir -p apps/web apps/api packages
```

Mỗi app cần có `package.json` riêng với **`name` duy nhất**:

**`apps/api/package.json`**
```json
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node-dev src/index.ts"
  }
}
```

**`apps/web/package.json`**
```json
{
  "name": "web",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 8080"
  }
}
```

> ⚠️ Trường `name` trong `package.json` là ID để `--filter` và `dependsOn` nhận diện. Phải **khớp chính xác**.

### Bước 5: Cài Turborepo vào root

```bash
pnpm add -D turbo -w   # -w = workspace root
```

### Bước 6: Cài dependencies cho từng app

```bash
# Cài vào app cụ thể
pnpm add express --filter api
pnpm add next react react-dom --filter web

# Hoặc cd vào app rồi cài bình thường
cd apps/api && pnpm add jsonwebtoken cors
```

### Bước 7: Cài tất cả và chạy

```bash
# Từ root
pnpm install

# Chạy tất cả apps song song
pnpm dev

# Chạy một app cụ thể
pnpm --filter api dev
```

---

## 2. Shared Packages (tùy chọn)

Nếu muốn chia sẻ code giữa các app (ví dụ: shared types), tạo package trong `packages/`:

```bash
mkdir -p packages/shared
```

**`packages/shared/package.json`**
```json
{
  "name": "@repo/shared",
  "version": "0.0.1",
  "main": "./src/index.ts"
}
```

Thêm vào app cần dùng:

```bash
pnpm add @repo/shared --filter web
```

```ts
// apps/web/src/something.ts
import { SomeType } from '@repo/shared';
```

Turborepo sẽ tự động build `@repo/shared` trước khi build `web` nhờ `dependsOn: ["^build"]`.

---

## 3. Cấu trúc dự án này

```
mono-next-apps-full-stack/
├── package.json              ← root: scripts dùng turbo run
├── pnpm-workspace.yaml       ← khai báo apps/* và packages/*
├── turbo.json                ← pipeline config
├── pnpm-lock.yaml            ← lockfile chung (commit vào git)
├── .docs/
│   ├── monorepo.md           ← khái niệm monorepo, pnpm, turbo
│   └── setup.md              ← tài liệu này
└── apps/
    ├── web/                  ← Next.js 16, port 8080
    │   ├── package.json      ← name: "social-dashboard-next-pro"
    │   ├── next.config.ts
    │   └── src/
    │       ├── app/          ← App Router pages & layouts
    │       ├── actions/      ← Server Actions (gọi API)
    │       ├── components/   ← UI components
    │       ├── middleware.ts  ← auth guard
    │       └── types/
    └── api/                  ← Express 5, port 5000
        ├── package.json      ← name: "api"
        ├── tsconfig.json
        └── src/
            ├── index.ts      ← entry point, CORS, middleware
            ├── routes/
            │   └── auth.ts   ← POST /api/login, POST /api/register
            └── mock/
                └── user.ts   ← in-memory user data
```

---

## 4. Environment Variables

### `apps/api/.env`

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
WEB_ORIGIN=http://localhost:8080
```

### `apps/web/.env.local`

```env
API_URL=http://localhost:5000
```

> Next.js đọc `.env.local` tự động. Biến dùng trong Server Actions không cần prefix `NEXT_PUBLIC_`.

Copy từ file mẫu:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

---

## 5. API Endpoints (`apps/api`)

| Method | Path | Mô tả |
|--------|------|-------|
| `GET` | `/` | Health check |
| `POST` | `/api/login` | Đăng nhập, trả về JWT |
| `POST` | `/api/register` | Đăng ký tài khoản mới |

---

## 6. Data Flow

```
Browser (8080)
  │
  └─► Next.js Server Action
        │   apps/web/src/actions/auth-action.ts
        │   fetch(`${process.env.API_URL}/api/login`)
        │
        └─► Express API (5000)
              │   apps/api/src/routes/auth.ts
              │
              ├── Validate credentials vs mock/user.ts
              └── Sign JWT → return { token, user }
```

---

## 7. Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-------------|-----------|
| `turbo: command not found` | turbo chưa được cài | `pnpm add -D turbo -w` |
| Package không tìm thấy nhau | `name` trong `package.json` sai | Kiểm tra `name` field khớp với `--filter` |
| CORS error từ web → api | `WEB_ORIGIN` sai | Đặt `WEB_ORIGIN=http://localhost:8080` trong `apps/api/.env` |
| `JWT_SECRET is not set` | Thiếu `.env` | Copy `.env.example` → `.env` trong `apps/api` |
| pnpm install chậm | Lần đầu tải packages | Lần sau sẽ dùng cache từ pnpm store |
| App không chạy song song | `dev` bị cache | Đảm bảo `"cache": false` trong `turbo.json` cho task `dev` |

---

## 8. Changelog

### 2026-04-23 — Tách BE ra khỏi Next.js

**Vấn đề:** Logic backend (auth routes) nằm trong Next.js Route Handlers ở `apps/web/src/app/api/`, gắn chặt FE và BE trong cùng một app.

**`apps/api` — thêm mới:**

- `src/mock/user.ts` — In-memory user list (di chuyển từ `apps/web`)
- `src/routes/auth.ts` — `POST /api/login`, `POST /api/register`
- `tsconfig.json` — TypeScript config (`commonjs`, `outDir: dist`)
- `.env.example`
- Dependencies: `jsonwebtoken`, `cors`, `@types/jsonwebtoken`, `@types/cors`

**`apps/web` — dọn dẹp:**

- Xoá `src/app/api/login/route.ts` và `src/app/api/register/route.ts`
- Xoá dependency `jsonwebtoken`, `@types/jsonwebtoken`
- `src/actions/auth-action.ts` — đổi fetch URL sang `${process.env.API_URL}/api/*`
