# GG Peitas — Futebol, Estilo e Presença

Site premium de camisetas de futebol importadas.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (estado global)
- **Framer Motion** (animações)
- **Lucide React** (ícones)

## Estrutura

```
ggpeitas/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CartSidebar.tsx
│   │   └── ProductModal.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── Ticker.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── DestaqueSection.tsx
│   │   ├── InstagramSection.tsx
│   │   ├── WhySection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       └── Toast.tsx
├── lib/
│   ├── products.ts
│   └── store.ts
├── types/
│   └── index.ts
└── public/
    └── logo.png
```

## Instalação

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Push para o GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Deploy automático em cada push

## Adicionando produtos

Edite `lib/products.ts` e adicione um novo objeto seguindo o tipo `Product`.

## Conectando domínio

No painel da Vercel:
**Settings → Domains → Add Domain**

## Próximos passos

- [ ] Integração com Mercado Pago / Stripe
- [ ] Página individual de produto (`/produto/[slug]`)
- [ ] Checkout completo
- [ ] Painel admin para gerenciar produtos
- [ ] Imagens reais das camisetas
