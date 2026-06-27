# Deploy Soluções Digitais

Site institucional para empresa de soluções digitais — sites, landing pages e plataformas SaaS.

## Páginas

- `/` — Home (hero, diferenciais, soluções em destaque, depoimentos, formulário)
- `/solucoes` — Catálogo de soluções com filtros
- `/solucao/[id]` — Detalhe da solução
- `/sobre` — Sobre a empresa
- `/contato` — Contato via WhatsApp

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Personalizar

1. **Textos e contato** — edite `src/lib/mock-data.ts` (`mockSiteConfig`)
2. **Soluções** — edite `src/lib/mock-data.ts` (`mockSolucoes`)
3. **Cores e estilo** — edite `src/app/globals.css`
4. **Logo** — substitua `public/deploy-logo.png`

## Deploy

Compatível com Vercel, Netlify ou qualquer host que suporte Next.js.

```bash
npm run build
npm start
```
