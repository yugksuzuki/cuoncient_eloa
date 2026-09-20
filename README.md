# Eloá — Landing page

Página de lista de espera do app Eloá, publicada em https://eloa.cuoncient.com.

© 2026 Cuoncient (cuoncient.com). Código e design proprietários. Repositório privado; reprodução, cópia ou redistribuição proibidas.

## Estrutura
- `index.html` — página (HTML + CSS, tokens do Eloá Design System)
- `app.js` — formulário da lista de espera (envio para o Formspree)
- `build.js` — build de produção: minifica o HTML e ofusca o JS em `dist/`
- `vercel.json` — build na Vercel + headers de segurança (CSP, HSTS, X-Frame-Options etc.)
- `robots.txt`, `sitemap.xml` — SEO

## Deploy
Cada push na branch `main` gera um deploy de produção na Vercel (projeto `eloa`).
