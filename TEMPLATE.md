# 📋 Template de Documentação de Features

Template padrão para documentar novas features da plataforma Detail Lab. O foco é **produto e casos de uso** — o que a feature faz e como é usada, não como é implementada.

---

## 🎯 Estrutura

```
docs/docs/features/{feature-name}/
├── intro.md         # Descrição do produto + status (começar aqui)
├── overview.md      # Visão geral / comparações / matriz
├── use-cases.md     # Casos de uso reais, passo a passo
└── {detalhes}.md    # Páginas específicas conforme necessário
```

> **Não** documentamos ADRs nem schemas de banco aqui. O foco é produto.

---

## 🚦 Status da Feature (Obrigatório)

Toda feature **precisa** declarar seu status no topo do `intro.md`, usando um admonition:

```markdown
:::note Status
🟡 **Em andamento** — feature em desenvolvimento ativo.
:::
```

### Status disponíveis

| Badge | Status | Quando usar |
|-------|--------|-------------|
| 💡 | **Ideação** | Em concepção, ainda sendo idealizada |
| ⚪ | **Planejado** | Definido, mas ainda não iniciado |
| 🟡 | **Em andamento** | Em desenvolvimento ativo |
| 🟢 | **Concluído** | Disponível em produção |

E adicione a feature na tabela do [catálogo de features](docs/features/index.md) com o status correspondente.

---

## 📝 Conteúdo de Cada Arquivo

### 1. `intro.md` — Descrição do Produto

```markdown
---
sidebar_position: 1
---

# Nome da Feature

:::note Status
🟡 **Em andamento** — em desenvolvimento ativo.
:::

## O Que É
O que a feature resolve, em 1-2 parágrafos de negócio.

## Para Quem É
Que perfil de usuário se beneficia.

## Comece Por Aqui
- [Visão Geral](./overview.md)
- [Casos de Uso](./use-cases.md)

## Status de Desenvolvimento
- [x] Definição de produto
- [ ] Implementação
- [ ] Lançamento
```

---

### 2. `overview.md` — Visão Geral

- Explicação do funcionamento (linguagem de produto)
- Tabelas comparativas / matriz de funcionalidades
- Diagrama da jornada do usuário (Mermaid)
- **Sem** detalhes técnicos de implementação

---

### 3. `use-cases.md` — Casos de Uso

O coração da documentação. Cada caso descreve uma **situação real**:

```markdown
## Caso N: Título da situação

**Contexto:** quem é o usuário e o que ele quer.

**O que acontece:**
1. Passo a passo do ponto de vista do usuário
2. ...

**Resultado:** o que o usuário obtém no final.
```

Inclua pelo menos 3-5 casos cobrindo os fluxos principais.

---

## 🎨 Estilo

- ✅ Português (pt-BR)
- ✅ Linguagem de **produto**, não técnica
- ✅ Foco em o que o usuário vê e faz
- ✅ Emojis para clareza (🟡 ⚠️ 🔒 ✅ ❌)
- ✅ Diagramas Mermaid para jornadas
- ❌ Sem código de implementação, endpoints, schemas ou ADRs

---

## 📋 Checklist para Nova Feature

- [ ] `intro.md` com **descrição do produto** e **status**
- [ ] `overview.md` com visão geral / matriz
- [ ] `use-cases.md` com 3-5 casos de uso reais
- [ ] Feature adicionada ao catálogo em `docs/features/index.md` com status
- [ ] Todos os arquivos têm `sidebar_position`
- [ ] `sidebars.js` atualizado
- [ ] Links internos funcionando (use `./arquivo.md`)
- [ ] `npm run build` passa sem erros

---

## 🚀 Criando uma Nova Feature

```bash
# 1. Estrutura
mkdir -p docs/docs/features/{nova-feature}

# 2. Arquivos
touch docs/docs/features/{nova-feature}/intro.md
touch docs/docs/features/{nova-feature}/overview.md
touch docs/docs/features/{nova-feature}/use-cases.md

# 3. Atualizar sidebars.js e docs/features/index.md

# 4. Testar
npm run build && npm start

# 5. Publicar
git add . && git commit -m "docs: documentar {nova-feature}" && git push
```

---

## 📖 Exemplo de Referência

A feature **[Planos de Assinatura](docs/features/subscription-plans/intro.md)** segue este template:

- ✅ `intro.md` — descrição + status 🟡 Em andamento
- ✅ `overview.md` — matriz Free vs Paid
- ✅ `use-cases.md` — 6 casos de uso
- ✅ `free-plan.md` / `paid-plan.md` — detalhes de cada plano

---

**Última atualização:** 25 de junho de 2026
