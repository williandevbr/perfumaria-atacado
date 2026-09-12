# BA Perfums — Catálogo de Perfumes no Atacado

**Catálogo digital com cerca de 2 mil produtos, carrinho de pedidos e finalização direto no WhatsApp da loja.**

## O problema

Vender perfume no atacado por conversa de WhatsApp é lento: cliente pergunta preço, espera resposta, desiste. Este catálogo deixa o cliente montar o pedido sozinho — e o vendedor recebe tudo pronto numa mensagem.

## Funcionalidades

- **Catálogo com paginação** — grade de produtos com botão "carregar mais", sem travar o navegador
- **Busca instantânea** — por nome, código ou inspiração
- **Filtros por categoria** — carrossel de categorias e menu lateral
- **Página do produto** — foto, categoria, volume, preço de atacado e controle de quantidade
- **Carrinho persistente** — salvo no navegador, não perde ao recarregar
- **Pedido via WhatsApp** — mensagem montada automaticamente (itens, quantidades e total) aberta no `wa.me`
- **Modo escuro** — alternância claro/escuro salva no navegador
- **Responsivo** — busca e carrinho adaptados ao celular

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · Motion · lucide-react

Sem backend: catálogo embutido no código, carrinho em `localStorage`.

## Como rodar

Pré-requisito: Node.js 20+.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera dist/
npm run lint    # type-check (tsc --noEmit)
```

## Estrutura

```
src/
  components/  → Header, ProductCard, ProductModal, CartDrawer...
  data/        → catálogo e configurações da loja (WhatsApp, nome)
  utils/       → formatação de moeda
  App.tsx      → tela principal
  types.ts     → tipos
public/
  imagens/     → fotos dos produtos e categorias
  logo.png
```

## Configuração

WhatsApp, nome e demais dados da loja ficam em `src/data/products.ts` (`STORE_SETTINGS`). Troque lá e publique de novo. Existe um `.env.example` para variáveis opcionais; catálogo e pedido funcionam sem nenhuma chave.
