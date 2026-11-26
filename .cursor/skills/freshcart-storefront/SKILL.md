---
name: freshcart-storefront
description: Build and maintain the FreshCart e-commerce storefront. Use when adding or changing storefront routes, product and category data, server-rendered UI, Swiper interactions, loading states, SEO metadata, or Tailwind styling in this repository.
---

# FreshCart Storefront

Use this skill for changes to the FreshCart Next.js application in this repository.

## Project structure

- `src/app/` contains App Router routes. Current routes include `/`, `/shop`, `/categories`, `/brands`, `/cart`, `/wishlist`, and the `(auth)` route group for login and sign-in.
- `src/app/layout.tsx` owns the shared page shell, including `Navbar` and `Footer`, Geist fonts, and global CSS. Do not render the shared navbar or footer again inside route pages.
- `src/app/_components/<Feature>/` contains feature UI. Keep a component's TSX and related pure logic in separate sibling files, such as `Product/product-card.tsx` and `Product/product-card.logic.ts`.
- `src/app/_types/product.ts` and `src/app/_types/category.ts` define the API-facing product and category types.
- `src/lib/` and `src/components/ui/` hold shared utilities and generic UI components. Reuse these where appropriate.
- The `@/*` TypeScript alias points to `src/*`.

## Rendering and routing

- Keep pages and components as Server Components by default. Add `"use client"` only for state, event handlers, browser APIs, or a library that needs client-side interaction. The hero carousel is a Client Component because it uses Swiper.
- Keep route pages in their route folders as `page.tsx` files. Export route-specific `Metadata` from these Server Components.
- In this Next.js version, route `searchParams` are promises. Pass them to an async child when they need to resolve inside a Suspense boundary.
- The project prefers explicit `<Suspense>` boundaries around async Server Components that fetch data. Use the shared `SuspenseFallback` component from `src/app/_components/suspense-fallback.tsx`.
- Put the boundary around the async component or function that actually suspends. Do not wrap synchronous components such as `ProductCard` or `Categories` and expect their fallback to appear. Do not add a route-level `loading.tsx` unless the user asks for one.
- Avoid adding `"use client"` to a page just to use Suspense; React Suspense and async Server Components work in the server-rendered route tree.

## Store data

- Products and categories come from `https://ecommerce.routemisr.com/api/v1`.
- The current fetch helpers live in `src/app/_components/Home/home-data.logic.ts`. Reuse them instead of duplicating endpoint and response handling.
- API responses expose records in a `data` array. The current helpers revalidate for 300 seconds and return an empty array for failed requests; preserve graceful empty states when adding UI.
- `getProducts()` currently requests `products?limit=40`; categories use `categories`.
- Use the shared `Product` and `Category` types. Keep price, rating, discount, filtering, and fallback transformations out of presentation JSX when they belong in a `.logic.ts` file.

## UI conventions

- Use Tailwind utility classes in TSX for page and component styling. `src/app/globals.css` imports Tailwind with `@import "tailwindcss";`; Tailwind is v4.
- Keep layouts responsive with mobile-first utilities and breakpoint variants. Match the existing FreshCart palette: green accents, slate text, white cards, and rounded borders.
- Use `react-icons/fa6` for icons, `react-loader-spinner` for spinners, and the installed Swiper package for carousel behavior. Keep Swiper-specific client code and CSS imports in the hero component.
- Use `next/link` for internal navigation and `next/image` for product/category/brand imagery. Existing API-host images use `unoptimized`; if enabling optimization for a new host, configure it in `next.config.ts` first.
- Give meaningful images descriptive alt text; use empty alt text only for decorative images. Give icon-only controls accessible labels.
- Keep async, API, and transformation logic in the relevant feature's `.logic.ts` file; keep its `.tsx` focused on rendering and props.

## Next.js-specific changes

This repository uses Next.js 16.4.6 with Cache Components and React Compiler enabled. Before changing Next.js conventions or APIs, read the relevant guide shipped in `node_modules/next/dist/docs/`. Do not assume older Next.js APIs or file conventions apply.

## Verification

- Run `npm run lint` after code changes.
- Run `npx tsc --noEmit --incremental false` to check TypeScript without leaving an incremental build file.
- Run `npm run build` when a production build check is requested or needed to validate a Next.js routing/rendering change.
- `package.json` does not currently define a test script.
