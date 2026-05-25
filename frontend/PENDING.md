# Pendências do frontend

Última atualização: 2026-05-25 (pós-rodada de polish: lint, módulos, SEO, skeletons)

## Aberto
1. **Submit real do `/quote`** — hoje é mock (toast após 1s). Trocar por `POST {API}/quotes` quando backend tiver o endpoint.
2. **Admin `/users` e `/orders`** — usam mock hardcoded (10 itens). Substituir por `GET` paginado quando backend listar (`?pagina=&limite=`). Pagination component já está pronto.
3. **`JWT_SECRET` duplicado** entre backend e `.env.local` do frontend (necessário pro `jose` no edge). Em produção, migrar para RS256 ou remover role-check do middleware.
4. **`/preferences` validação end-to-end** — handlers chamam `useAuth().updateProfile` que bate em `PUT /auth/perfil`. Conferir manualmente fluxo de troca de senha (backend espera `senhaAtual` + `novaSenha`).
5. **Comentários TODO no código** — `quote-form.jsx`, `users-content.jsx` e `orders-content.jsx` marcam onde a integração real entra.

## O que foi fechado nesta rodada
- ESLint v9 + `next/core-web-vitals` + Prettier configurados (`eslint.config.mjs`).
- Inline styles migrados para `page.module.css` em todas as pages (login, register, contact, preferences, dashboard, my-orders, admin/users, admin/orders).
- Tokens usados consistentemente (`var(--color-yellow)`, `--color-dark`, etc).
- SEO `metadata` exportado em todas as pages; pages que precisavam `'use client'` viraram Server + sub-componente Client (`login-form`, `register-form`, `quote-form`, `preferences-content`, `dashboard-content`, `my-orders-content`, `users-content`, `orders-content`).
- `/quote` implementado com `react-hook-form + zod` (campos completos: nome, e-mail, telefone, CEP, consumo médio, tipo, mensagem).
- Admin `/users` e `/orders` com tabela Bootstrap + componente `<Pagination />` reutilizável em `components/shared/pagination/`.
- `next/image` em todas as imagens internas (`/painelsolar.jpg`, `/logo-semEscrita.png`, `/logo-luminar-removebg-preview.png`).
- `<PageSkeleton />` em `components/shared/skeleton/` substitui spinners/null nos layouts protegidos.

## O que NÃO está pendente (cobrimos no histórico)
- Rotas em inglês, route groups `(public)/(auth)/(protected)/(admin)/(customer)`
- Auth via cookie httpOnly setado pelo backend + CORS credentials
- Middleware com `jose` + role check
- Refresh automático
- `useAuth` cobre tudo (login/register/logout/refresh/updateProfile) com toast+router acoplados
- Camada de dados sem `services/`
- Tokens centralizados em `globals.css`
- Helpers `Intl` pt-BR em `utils/format.js`
- Dashboard customer criado e funcional
