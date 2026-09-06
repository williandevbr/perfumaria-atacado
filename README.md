# BA Perfums — Catálogo de Perfumes no Atacado

Catálogo digital exclusivo para venda de perfumes no atacado: visual preto, branco e dourado, com mais de 1000 itens, carrinho de pedidos e finalização direto no WhatsApp da loja.

## O que o site faz

- **Catálogo com 1000+ perfumes** organizados por categoria (árabe, brand, decants, splash, tubetes...)
- **Busca instantânea** por nome
- **Carrinho de pedidos** salvo no navegador (não perde ao recarregar)
- **Finalização pelo WhatsApp** — o pedido montado vai pronto em mensagem
- **Layout premium** preto/branco/dourado, rápido no celular e no computador

## Como rodar

**Pré-requisito:** Node.js 20+

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Configuração (opcional)

Copie `.env.example` para `.env.local` e preencha se for usar os recursos de IA:

```bash
GEMINI_API_KEY="sua-chave-aqui"
```

O catálogo e o pedido via WhatsApp funcionam sem nenhuma chave.

## Publicar (build)

```bash
npm run build
```

Gera a pasta `dist/` pronta para hospedar em qualquer hospedagem estática (Vercel, Netlify, etc.).

## Estrutura

```
├── src/
│   ├── components/   → Header, ProductCard, ProductModal, CartDrawer...
│   ├── data/         → catálogo e configurações da loja (WhatsApp, nome)
│   ├── utils/        → formatação
│   ├── App.tsx       → tela principal
│   └── types.ts      → tipos
├── public/
│   ├── imagens/      → fotos dos produtos
│   ├── dados/        → dados auxiliares
│   └── logo.png
└── index.html
```

## Trocar os dados da loja

WhatsApp, nome e demais dados ficam em `src/data/products.ts` (`STORE_SETTINGS`). Troque lá e publique de novo.
