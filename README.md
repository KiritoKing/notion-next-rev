## Tech Stack

This project uses Typescript and NextJS 14 with React Server Components!

- Base: Node-v20 + pnpm-v9 (It's strongly recommended to use `nvm` and `corepack` to automatically manage your node version and package manager according to the corresponding configurations.)
- Framework: [NextJS 14](https://nextjs.org) + App Router (RSC)
- Notion Solution: [react-notion-x](https://github.com/NotionX/react-notion-x?tab=readme-ov-file)

## Getting Started

First, run the development server:

```bash

pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The following approaches are supported due to the wide support for NextJS by community:

- Vercel (Recommended, the easiest!)
- Netify
- Cloudflare Pages
- AWS Serverless Framework
- Render

Check out official [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Inspirations

This project is largely inspired by the following project in terms of styling, tech stack solution...

- [NotionNext](https://github.com/tangly1024/NotionNext): 这是一个非常好的项目，是我最初的启发，但为了RSC和Typescript，我启动了这个项目
- [hexo-theme-redefine](https://github.com/EvanNotFound/hexo-theme-redefine): 之前使用Hexo博客时最喜欢的主题，很多设计都借鉴于此
