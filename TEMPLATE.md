# 📋 Template de Documentação para Novas Features

Este é o template padrão que deve ser seguido ao documentar novas features na plataforma DH.

---

## 🎯 Estrutura Recomendada

Toda feature documentada deve seguir esta estrutura:

```
docs/docs/features/{feature-name}/
├── intro.md                          # Início rápido (começar aqui)
├── overview.md                       # Visão geral com diagramas
├── {detalhes}.md                     # Páginas específicas conforme necessário
├── decisions/                        # Architecture Decision Records (ADRs)
│   ├── 001-{decisão1}.md
│   ├── 002-{decisão2}.md
│   └── 003-{decisão3}.md
└── schemas/                          # Database schemas (se aplicável)
    ├── {tabela1}.md
    └── {tabela2}.md
```

---

## 📝 Cada Arquivo Deve Ter

### Frontmatter YAML

Todo arquivo markdown deve começar com:

```markdown
---
sidebar_position: 1
---

# Título da Página
```

**sidebar_position:** Define a ordem de exibição (1, 2, 3...)

---

## 📚 Conteúdo Padrão

### 1. Intro (`intro.md`)

**Propósito:** Começar aqui - overview rápido (2-3 min de leitura)

**Seções:**
- Bem-vindo 👋
- O que é a feature (1 parágrafo)
- Começar por aqui (links para próximas páginas)
- Status da feature (checklist)

**Exemplo:**
```markdown
---
sidebar_position: 1
---

# Planos de Assinatura

## Bem-vindo 👋

Documentação completa de Planos de Assinatura.

## O que é?

Sistema que oferece dois tiers: **Free** e **Paid**.

## Começar Por Aqui

👉 [Visão Geral](./overview.md) - Matriz de funcionalidades
👉 [ADRs](./decisions/001-feature-flags.md) - Decisões técnicas

## Status

- [x] Definição de requisitos
- [x] Documentação
- [ ] Implementação
- [ ] Testes
```

---

### 2. Overview (`overview.md`)

**Propósito:** Visão geral completa com diagramas

**Seções:**
- O que é
- Diagrama (Mermaid)
- Matriz de funcionalidades (tabela)
- Fluxos principais (diagramas)
- Casos de uso
- Próximos passos

**Exemplo:**
```markdown
---
sidebar_position: 2
---

# Overview

## O que São Planos de Assinatura?

Explicação com diagramas Mermaid...

## Matriz de Funcionalidades

| Feature | Free | Paid |
|---------|------|------|
| ... | ... | ... |

## Fluxos

\`\`\`mermaid
graph LR
    A[Free] --> B[Paid]
\`\`\`
```

---

### 3. Páginas Específicas

**Exemplo para Planos de Assinatura:**
- `free-plan.md` - Detalhes do Free
- `paid-plan.md` - Detalhes do Paid

**Ordem de sidebar_position:** 3, 4, 5...

---

### 4. ADRs (Architecture Decision Records)

**Pasta:** `decisions/`

**Padrão:** `{número}-{título-kebab-case}.md`

**Exemplos:**
- `001-feature-flags.md`
- `002-ui-blocking-patterns.md`
- `003-error-messages.md`

**Seções Obrigatórias:**

```markdown
---
sidebar_position: 1
---

# ADR 001: {Título}

## Status
✅ Accepted / ⏳ Pending / ❌ Rejected

## Contexto
Por que essa decisão foi necessária?

## Decisão
Qual foi a decisão?

## Implementação
Como implementar?

## Alternativas Consideradas
Quais outras opções foram exploradas?

## Vantagens
✅ Benefício 1
✅ Benefício 2

## Desvantagens
❌ Limitação 1
❌ Limitação 2

## Relacionado
[[outro-adr.md|Link para outro ADR]]
[[../schema/tabela.md|Link para schema]]
```

---

### 5. Database Schemas

**Pasta:** `schemas/`

**Padrão:** `{tabela-ou-modulo}.md`

**Seções:**

```markdown
---
sidebar_position: 1
---

# {Nome} Schema

## Tabela: \`{tabela}\`

\`\`\`sql
CREATE TABLE {tabela} (
  id BIGINT PRIMARY KEY,
  -- campos
);
\`\`\`

## Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|

## Queries Úteis

\`\`\`sql
SELECT ... FROM ...
\`\`\`

## Migrações

\`\`\`sql
-- up
CREATE TABLE ...

-- down
DROP TABLE ...
\`\`\`
```

---

## 🔗 Links Entre Documentos

Use sempre caminhos relativos com wiki-style links:

```markdown
[[outro-arquivo.md|Descrição]]
[[../decisions/001-feature.md|ADR 001]]
[[../../features/outro-feature/intro.md|Outra Feature]]
```

---

## 📊 Diagramas

Use Mermaid para diagramas:

```markdown
\`\`\`mermaid
graph TD
    A[Início] --> B{Decisão}
    B -->|Sim| C[Ação 1]
    B -->|Não| D[Ação 2]
\`\`\`
```

---

## 🎨 Estilo e Tom

- ✅ Português (pt-BR) como padrão
- ✅ Tom técnico mas acessível
- ✅ Use emojis para visual clarity (⚠️ ⚙️ 📚 🔒)
- ✅ Exemplos de código quando aplicável
- ✅ Links para seções relacionadas
- ❌ Evite jargão sem explicar
- ❌ Não seja genérico
- ❌ Não repita informações

---

## 📋 Checklist para Nova Feature

Ao documentar uma feature, verifique:

- [ ] Arquivo `intro.md` criado com overview
- [ ] Arquivo `overview.md` com diagramas
- [ ] 2-3 páginas específicas (conforme necessário)
- [ ] 3+ ADRs em `decisions/`
- [ ] Schemas em `schemas/` (se aplicável)
- [ ] Todos os arquivos têm `sidebar_position`
- [ ] `sidebars.js` atualizado com referências corretas
- [ ] Links internos funcionando
- [ ] Diagramas Mermaid renderizando
- [ ] Nenhuma quebra de linha estranha
- [ ] Tom consistente com resto da documentação

---

## 🚀 Adicionando Nova Feature

### 1. Criar Pasta
```bash
mkdir -p docs/docs/features/{novo-feature}/decisions
mkdir -p docs/docs/features/{novo-feature}/schemas
```

### 2. Criar Arquivos Básicos
```bash
touch docs/docs/features/{novo-feature}/intro.md
touch docs/docs/features/{novo-feature}/overview.md
touch docs/docs/features/{novo-feature}/decisions/001-{decisão}.md
touch docs/docs/features/{novo-feature}/schemas/{tabela}.md
```

### 3. Atualizar sidebars.js
```javascript
{
  type: 'category',
  label: 'Nova Feature',
  items: [
    'features/{novo-feature}/intro',
    'features/{novo-feature}/overview',
    // ... mais itens
  ],
}
```

### 4. Testar
```bash
npm start
# Acessar http://localhost:3000
```

### 5. Commit
```bash
git add docs/docs/features/{novo-feature}
git commit -m "docs: adicionar documentação de {nova-feature}"
git push
```

---

## 📖 Exemplo Completo: Planos de Assinatura

Veja a pasta `docs/docs/features/subscription-plans/` como exemplo de implementação completa deste template:

- ✅ `intro.md` - Início
- ✅ `overview.md` - Visão geral
- ✅ `free-plan.md` - Detalhes Free
- ✅ `paid-plan.md` - Detalhes Paid
- ✅ `decisions/` - 3 ADRs
- ✅ `schemas/` - 2 schemas

---

## 💾 Processo de Documentação

1. **Planejamento** - Definir seções e ADRs
2. **Escrita** - Criar arquivos conforme template
3. **Revisão** - Verificar links e formatação
4. **Teste** - `npm start` e validar no browser
5. **Commit** - Git commit e push
6. **Atualização** - Manter atualizado conforme código muda

---

## 🔄 Manutenção

- Revisar documentação quando feature mudar
- Atualizar ADRs se decisões mudarem
- Manter links funcionando
- Adicionar novos ADRs conforme necessário

---

**Última atualização:** 25 de junho de 2026
