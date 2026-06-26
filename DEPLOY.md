# 🚀 Deploy Automático - GitHub Pages

A documentação é deployed automaticamente no GitHub Pages sempre que há um push na branch `main`.

---

## 📍 URL de Produção

**Acesso:** https://mycarpass.github.io/dh-platform-docs

---

## 🔄 Como Funciona

### Trigger Automático
Sempre que você faz push na branch `main`:

```bash
git push origin main
```

O GitHub Actions:
1. ✅ Faz checkout do código
2. ✅ Instala dependências (`npm install`)
3. ✅ Faz build (`npm run build`)
4. ✅ Deploy na branch `gh-pages`
5. ✅ Atualiza o site em ~2-3 minutos

### Acompanhar Deploy

1. Vá em: https://github.com/mycarpass/dh-platform-docs
2. Clique em **Actions** no menu superior
3. Veja o workflow **Deploy to GitHub Pages**
4. Espere completar (verde ✅)

---

## 📦 Workflow

**Arquivo:** `.github/workflows/deploy.yml`

```yaml
on:
  push:
    branches:
      - main

jobs:
  build:
    # Instala, testa e faz build
    
  deploy:
    # Deploy na branch gh-pages
```

---

## ⚙️ Configurações

### docusaurus.config.js

```javascript
url: 'https://mycarpass.github.io',
baseUrl: '/dh-platform-docs/',
organizationName: 'mycarpass',
projectName: 'dh-platform-docs',
deploymentBranch: 'gh-pages',
```

### GitHub Settings

**Automaticamente configurado:**
- ✅ Branch: `gh-pages`
- ✅ Source: GitHub Actions
- ✅ HTTPS: Habilitado

---

## 🛠️ Build Local

Antes de fazer push, teste localmente:

```bash
npm run build
npm run serve
```

Acesso: http://localhost:3000

---

## 📝 Workflow do Dia-a-Dia

### 1. Editar documentação
```bash
# Fazer mudanças nos arquivos .md
vim docs/docs/features/subscription-plans/overview.md
```

### 2. Testar localmente
```bash
npm start
# Verificar em http://localhost:3000
```

### 3. Commit e Push
```bash
git add docs/docs/features/...
git commit -m "docs: atualizar overview"
git push origin main
```

### 4. Deploy automático
- Aguarde ~2-3 minutos
- GitHub Actions fará build e deploy
- Verificar em: https://mycarpass.github.io/dh-platform-docs

---

## ✅ Checklist

Antes de fazer push:

- [ ] Documentação escrita conforme TEMPLATE.md
- [ ] `npm start` funciona localmente
- [ ] Links internos estão corretos
- [ ] Diagramas Mermaid renderizam
- [ ] Sem erros de TypeScript
- [ ] Frontmatter YAML correto em cada arquivo
- [ ] `sidebars.js` atualizado

---

## 🆘 Troubleshooting

### Build falhou no GitHub Actions

1. Vá em **Actions** → último workflow
2. Clique em **Build Docusaurus**
3. Veja a aba **Logs** para detalhes do erro
4. Corrija o erro localmente e faça push novamente

### Site não atualiza

- Aguarde 2-3 minutos após push
- Limpe cache do browser (Cmd+Shift+R no Mac)
- Verifique se workflow completou com ✅

### Erro de permissões

GitHub Pages precisam estar habilitadas nas settings:
1. Repo → Settings → Pages
2. Verify: Source = "GitHub Actions"
3. Domain: `mycarpass.github.io/dh-platform-docs`

---

## 📚 Referências

- [Docusaurus Deployment](https://docusaurus.io/docs/deployment)
- [GitHub Pages with Actions](https://github.com/marketplace/actions/deploy-pages)
- [Repository Settings](https://github.com/mycarpass/dh-platform-docs/settings/pages)

---

## 💰 Custo

**100% GRATUITO** ✅

- ✅ Repositório GitHub (public/private)
- ✅ GitHub Actions (até 2000 min/mês)
- ✅ GitHub Pages (ilimitado)
- ✅ SSL/HTTPS (automático)
- ✅ Domínio customizado (opcional)

---

**Último update:** 25 de junho de 2026
