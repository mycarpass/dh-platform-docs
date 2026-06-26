---
sidebar_position: 3
---

# Free Plan

## Visão Geral

O plano **Free** é gratuito e oferece acesso limitado a funcionalidades essenciais da plataforma.

- 💰 **Custo:** Gratuito
- ⏱️ **Duração:** Indefinida (até upgrade)
- 🔄 **Reset:** Não aplicável

---

## Limitações

### 1. Agendamento

**Tipo:** Bloqueio por Quantidade (Renovável)

**Limite:** 30 agendamentos por mês

**Comportamento:**
- Counter visível: "25/30 agendamentos"
- Warning em 80%: Toast com mensagem
- Bloqueio em 100%: Botão desabilitado + modal

**Reset:**
- Automático todo dia 1º do mês
- Histórico mantido (não deletado)

**UI/UX:**
```
├─ Usar: Mostrar usage bar
│  └─ Progress visual
│  └─ Números 25/30
├─ Aviso (80%): Toast
│  └─ "Você atingiu 80% do limite"
└─ Erro (100%): Modal
   └─ "Limite atingido. Upgrade para continuar"
```

**Exemplo de Mensagem:**
> ⚠️ Você atingiu 80% do limite de agendamentos (24/30). Upgrade para continuar.

---

### 2. Clientes

**Tipo:** Bloqueio por Quantidade (Não-Renovável)

**Limite:** 30 clientes máximo

**Comportamento:**
- Counter visível: "25/30 clientes"
- Warning em 80%: Alert destacado
- Bloqueio em 100%: Não consegue criar novo cliente

**Reset:**
- ❌ Nunca (limite permanente)
- ✅ Apenas com upgrade para Paid

**UI/UX:**
```
├─ Usar: Mostrar progress bar
│  └─ 25/30 clientes
├─ Aviso (80%): Alert amarelo
│  └─ "Você está próximo do limite"
└─ Erro (100%): Alert vermelho
   └─ "Limite permanente atingido"
```

**Exemplo de Mensagem:**
> 🚫 Limite permanente de clientes atingido. Você pode ter no máximo 30 clientes no plano Free. Upgrade para adicionar mais.

---

### 3. Serviços

**Tipo:** Bloqueio por Quantidade (Não-Renovável)

**Limite:** 10 serviços máximo

**Comportamento:**
- Counter visível: "8/10 serviços"
- Warning em 80%: Alert destacado
- Bloqueio em 100%: Não consegue criar novo serviço

**Reset:**
- ❌ Nunca (limite permanente)
- ✅ Apenas com upgrade para Paid

**Exemplo de Mensagem:**
> 🚫 Limite permanente de serviços atingido. Você pode ter no máximo 10 serviços no plano Free. Upgrade para adicionar mais.

---

### 4. Financeiro - Meta

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Completamente Bloqueado

**Comportamento:**
- Menu "Meta" oculto no sidebar
- Se acessado diretamente: redirect para upgrade
- Sem acesso de dados

**Mensagem:**
> 🔒 Meta Financeira está disponível apenas no plano Paid. Upgrade para acessar.

---

### 5. Financeiro - Ticket Médio

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Completamente Bloqueado

**Comportamento:**
- Campo "Ticket Médio" oculto em relatórios
- Métrica não calculada
- Sem acesso de dados

**Mensagem:**
> 🔒 Ticket Médio está disponível apenas no plano Paid. Upgrade para acessar.

---

### 6. Funcionários

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Completamente Bloqueado

**Comportamento:**
- Menu "Funcionários" oculto no sidebar
- Nenhuma operação CRUD disponível
- Usuários podem ter roles, mas não há módulo de gerenciamento

**Mensagem:**
> 🔒 Gerenciamento de Funcionários está disponível apenas no plano Paid. Upgrade para acessar.

---

### 7. Upload de Imagem (Avarias)

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Campo de Upload Desabilitado

**Comportamento:**
- Input desabilitado (gray out)
- Drag-and-drop desabilitado
- Texto livre permitido, mas sem imagem
- Tooltip: "Upgrade para upload"

**Mensagem:**
> 📸 Upload de imagens disponível apenas no plano Paid. Você pode descrever a avaria em texto.

---

### 8. Reconhecimento de Placa

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Botão Desabilitado

**Comportamento:**
- Botão "🔍 Reconhecer Placa" desabilitado
- Campo de placa em modo read-only
- Usuário pode digitar manualmente

**Mensagem:**
> 🔒 Reconhecimento automático de placa está disponível apenas no plano Paid. Você pode digitar a placa manualmente.

---

### 9. Consulta de Informações do Veículo

**Tipo:** Bloqueio de Funcionalidade

**Status:** ❌ Busca Desabilitada

**Comportamento:**
- Botão de busca desabilitado
- Campo de dados do veículo desabilitado
- Usuário não consegue buscar dados automaticamente

**Mensagem:**
> 🔒 Consulta de dados do veículo está disponível apenas no plano Paid. Complete os dados manualmente.

---

## Tabela Resumida

| Feature | Limite | Tipo | Renovável | Ação |
|---------|--------|------|-----------|------|
| Agendamento | 30/mês | Qtd | ✅ | Mostrar contador + bloqueio |
| Clientes | 30 máx | Qtd | ❌ | Mostrar contador + bloqueio |
| Serviços | 10 máx | Qtd | ❌ | Mostrar contador + bloqueio |
| Meta | - | Bloqueio | - | Ocultar menu |
| Ticket Médio | - | Bloqueio | - | Ocultar campo |
| Funcionários | - | Bloqueio | - | Ocultar menu |
| Upload | - | Bloqueio | - | Desabilitar input |
| Reconhecimento | - | Bloqueio | - | Desabilitar botão |
| Consulta | - | Bloqueio | - | Desabilitar botão |

---

## Upgrade

### Como Usuário Free Faz Upgrade?

1. Atinge limite ou quer feature premium
2. Clica em "Upgrade" (botão em toast, modal, etc)
3. Redireciona para página de pagamento
4. Seleciona plano Paid
5. Realiza pagamento
6. Acesso imediato ao plano Paid

### O que Muda Após Upgrade?

- ✅ Todos os limites removidos
- ✅ Todas as features desbloqueadas
- ✅ Sem mais restrições
- ✅ Faturamento automático

---

## API

### Endpoints de Validação

```
GET /api/subscription
→ Retorna { plan, limits, usage }

POST /api/subscriptions/upgrade
→ Inicia fluxo de pagamento

GET /api/usage/{feature}
→ Retorna uso atual de uma feature
```

---

## Próximos Passos

👉 [Paid Plan](./paid-plan.md) - O que está disponível no Paid

👉 [Arquitetura](./decisions/feature-flags.md) - Como implementar estes bloqueios

👉 [Mensagens](./decisions/error-messages.md) - Copy padronizado
