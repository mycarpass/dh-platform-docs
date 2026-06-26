# Subscription Plans

## Overview

A plataforma DH (Detail Lab) oferece dois planos de assinatura: **Free** e **Paid**. O plano Free possui limitações por quantidade e bloqueio de funcionalidades, enquanto o plano Paid oferece acesso total a todas as features.

## Planos e Pricing

### Free Plan
- **Preço:** Gratuito
- **Ciclo:** Indefinido até upgrade
- **Renovação:** N/A

### Paid Plan
- **Preço:** A definir por tier (Starter, Professional, Enterprise)
- **Ciclo:** Mensal ou Anual
- **Renovação:** Automática

---

## Regras de Negócio - Free Plan

### 1. Agendamento (Bloqueio por Quantidade)
- **Limite:** 30 agendamentos por mês
- **Comportamento:** Após atingir 30, usuário não consegue criar novos agendamentos
- **Reset:** Mensal (1º dia do mês)
- **Mensagem:** "Você atingiu o limite de 30 agendamentos mensal. Upgrade para Paid para continuar."

### 2. Clientes (Bloqueio por Quantidade - Não Renovável)
- **Limite:** 30 clientes máximo
- **Comportamento:** Após atingir 30, não consegue criar novo cliente
- **Reset:** Nunca (limite permanente)
- **Aviso:** Quando atinge 80% (24 clientes): "Você está próximo do limite de clientes"

### 3. Serviços (Bloqueio por Quantidade - Não Renovável)
- **Limite:** 10 serviços máximo
- **Comportamento:** Após atingir 10, não consegue criar novo serviço
- **Reset:** Nunca (limite permanente)
- **Aviso:** Quando atinge 80% (8 serviços): "Você está próximo do limite de serviços"

### 4. Financeiro - Meta (Bloqueado)
- **Status:** Funcionalidade completamente bloqueada
- **UI:** Menu "Meta" desabilitado/oculto
- **Mensagem:** "Recurso disponível apenas no plano Paid"

### 5. Financeiro - Ticket Médio (Bloqueado)
- **Status:** Funcionalidade completamente bloqueada
- **UI:** Campo/seção "Ticket Médio" desabilitado/oculto
- **Mensagem:** "Recurso disponível apenas no plano Paid"

### 6. Funcionários (Bloqueado Completamente)
- **Status:** Funcionalidade completamente bloqueada
- **UI:** Menu "Funcionários" desabilitado/oculto
- **Acesso:** Nenhum acesso ao módulo
- **Mensagem:** "Recurso disponível apenas no plano Paid"

### 7. Cadastro de Avarias com Upload de Imagem (Bloqueado)
- **Status:** Funcionalidade bloqueada
- **Comportamento:** Campo de upload de imagem desabilitado
- **Alternativa:** Texto livre permitido, mas sem imagem
- **Mensagem:** "Upload de imagens disponível apenas no plano Paid"

### 8. Reconhecimento de Placa (Bloqueado)
- **Status:** Feature completamente bloqueada
- **Comportamento:** Botão de reconhecimento desabilitado
- **UI:** Campo de placa em modo read-only com aviso
- **Mensagem:** "Reconhecimento automático de placa disponível apenas no plano Paid"

### 9. Consulta de Informações do Veículo pela Placa (Bloqueado)
- **Status:** Feature completamente bloqueada
- **Comportamento:** Botão/ícone de busca desabilitado
- **UI:** Campo desabilitado com aviso
- **Mensagem:** "Consulta de dados do veículo disponível apenas no plano Paid"

---

## Regras de Negócio - Paid Plan

✅ **Acesso total a todas as funcionalidades**
- Agendamentos ilimitados
- Clientes ilimitados
- Serviços ilimitados
- Todos os módulos desbloqueados
- Todas as features habilitadas

---

## Matriz de Permissões

| Feature | Free | Paid |
|---------|------|------|
| **Agendamento** | 30/mês | Ilimitado |
| **Clientes** | 30 (max) | Ilimitado |
| **Serviços** | 10 (max) | Ilimitado |
| **Meta Financeira** | ❌ | ✅ |
| **Ticket Médio** | ❌ | ✅ |
| **Funcionários** | ❌ | ✅ |
| **Upload de Imagem (Avarias)** | ❌ | ✅ |
| **Reconhecimento de Placa** | ❌ | ✅ |
| **Consulta de Dados do Veículo** | ❌ | ✅ |

---

## Implementação

### Frontend
- [Feature Flag System](./decisions/001-feature-flags.md)
- [UI Blocking Patterns](./decisions/002-ui-blocking-patterns.md)
- [Error Messages](./decisions/003-error-messages.md)

### Backend
- [API Middleware](./decisions/004-api-middleware.md)
- [Database Schema](./schemas/subscription-schema.md)
- [Billing Logic](./decisions/005-billing-logic.md)

### Data
- [User Subscription Schema](./schemas/user-subscription-schema.md)
- [Usage Tracking Schema](./schemas/usage-tracking-schema.md)

---

## Status da Implementação

- [ ] Database schema criado
- [ ] API endpoints criados
- [ ] Frontend feature flags implementadas
- [ ] UI bloqueios implementados
- [ ] Mensagens de erro padronizadas
- [ ] Testes unitários
- [ ] Documentação de deploy

---

## Contato

Para dúvidas sobre as regras de negócio dos planos, contacte o time de Product.
