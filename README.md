# Documentação Detail Lab

Bem-vindo à documentação técnica da plataforma Detail Lab.

## 📚 Estrutura

```
docs/
├── docs/                                    # Conteúdo do Docusaurus
│   └── features/
│       └── subscription-plans/              # Feature: Planos de Assinatura
│           ├── intro.md                     # Início rápido
│           ├── overview.md                  # Visão geral dos planos
│           ├── free-plan.md                 # Especificação do Free
│           ├── paid-plan.md                 # Especificação do Paid
│           ├── decisions/                   # ADRs (Architecture Decision Records)
│           │   ├── 001-feature-flags.md
│           │   ├── 002-ui-blocking-patterns.md
│           │   └── 003-error-messages.md
│           └── schemas/                     # Schemas de banco de dados
│               ├── subscription.md
│               └── usage-tracking.md
├── docusaurus.config.js                    # Configuração do Docusaurus
├── sidebars.js                             # Navegação lateral
└── README.md                               # Este arquivo
```

---

## 🚀 Rodando Localmente

### Instalação

```bash
cd docs/
npm install
```

### Dev Server

```bash
npm start
```

A documentação estará disponível em `http://localhost:3000`.

### Build Estático

```bash
npm run build
```

Gera arquivos HTML estáticos em `docs/build/`.

---

## 📖 Navegação

### Features

#### Planos de Assinatura
- [Início Rápido](./docs/features/subscription-plans/intro.md)
- [Visão Geral](./docs/features/subscription-plans/overview.md)
- [Plano Free](./docs/features/subscription-plans/free-plan.md)
- [Plano Paid](./docs/features/subscription-plans/paid-plan.md)

#### Architecture Decisions Records (ADRs)
- [ADR 001: Feature Flags](./docs/features/subscription-plans/decisions/001-feature-flags.md)
- [ADR 002: UI Blocking Patterns](./docs/features/subscription-plans/decisions/002-ui-blocking-patterns.md)
- [ADR 003: Error Messages](./docs/features/subscription-plans/decisions/003-error-messages.md)

#### Database Schemas
- [Subscription Schema](./docs/features/subscription-plans/schemas/subscription.md)
- [Usage Tracking Schema](./docs/features/subscription-plans/schemas/usage-tracking.md)

---

## 📝 Criando Nova Documentação

### 1. Estrutura de Arquivo

```markdown
---
sidebar_position: 1
---

# Título da Página

Conteúdo aqui...
```

### 2. Frontmatter

- `sidebar_position`: Ordem de exibição no menu (número)
- Sempre adicione para páginas novas

### 3. Localização

Coloque arquivos em:
- Features específicas: `docs/features/{feature-name}/`
- ADRs: `docs/features/{feature-name}/decisions/`
- Schemas: `docs/features/{feature-name}/schemas/`

### 4. Links

Use caminhos relativos:
```markdown
[Link](./overview.md)
[Link com âncora](./free-plan.md#upgrade)
[ADR](../decisions/001-feature-flags.md)
```

---

## 🌐 Idiomas

A documentação suporta **português (pt-BR)** e **inglês (en)** conforme configurado em `docusaurus.config.js`.

---

## 📦 Deploy

A documentação é hospedada e deployada automaticamente via GitHub Pages/Vercel (a ser configurado).

---

## ⚙️ Tecnologia

- **Docusaurus 3.x** - Static site generator para documentação
- **Markdown** - Formato de conteúdo
- **Mermaid** - Diagramas (suportado nativamente)

---

## 💡 Dicas

### Mermaid Diagrams

```markdown
\`\`\`mermaid
graph TD
    A[Usuário] --> B{Verifica Plano}
    B -->|Free| C[Mostra Upgrade]
    B -->|Paid| D[Acesso Liberado]
\`\`\`
```

### Info Boxes

```markdown
:::info
Informação importante
:::

:::warning
Aviso!
:::

:::danger
Erro crítico
:::
```

### Code Highlights

```typescript title="Exemplo"
export function useFeatureAccess(feature: Feature) {
  // ... código
}
```

---

## 🔗 Referências Externas

- [Docusaurus Docs](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org)
- [Mermaid Diagrams](https://mermaid.js.org)

---

**Última atualização:** 25 de junho de 2026
