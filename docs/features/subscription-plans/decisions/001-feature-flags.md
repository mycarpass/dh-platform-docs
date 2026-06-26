---
sidebar_position: 1
---

# ADR 001: Feature Flags para Planos de Assinatura

## Status

✅ Accepted

---

## Contexto

Precisamos controlar o acesso a diferentes funcionalidades baseado no plano do usuário (Free vs Paid). Existem várias abordagens:

1. **Condicionalizar no componente/página** - duplica lógica
2. **Feature flags centralizadas** - escalável, testável, auditável
3. **Middleware/Guard no router** - boilerplate
4. **Context API + custom hooks** - acoplado ao React

---

## Decisão

Usar **Feature Flags centralizadas** com:
- Fonte única de verdade no Zustand (auth store)
- Custom hooks para features bloqueadas (`useFeatureAccess`)
- Configuração declarativa e testável

---

## Implementação

### 1. Auth Store (Zustand)

```typescript
// src/features/auth/store/auth.ts
export type Plan = 'free' | 'paid'
export type SubscriptionLimits = {
  agendamentos_mes: number
  clientes_max: number
  servicos_max: number
}

export type AuthStore = {
  // ... existing fields
  plan: Plan
  limits: SubscriptionLimits
  usage: {
    agendamentos_mes: number
    clientes: number
    servicos: number
  }
}
```

### 2. Feature Access Hook

```typescript
// src/features/subscription/hooks/use-feature-access.ts
export type Feature = 
  | 'meta'
  | 'ticket_medio'
  | 'funcionarios'
  | 'upload_imagem'
  | 'reconhecimento_placa'
  | 'consulta_veiculo'

export function useFeatureAccess(feature: Feature) {
  const { plan } = useAuth()
  
  const blocked_features_free: Feature[] = [
    'meta',
    'ticket_medio',
    'funcionarios',
    'upload_imagem',
    'reconhecimento_placa',
    'consulta_veiculo',
  ]
  
  return {
    isBlocked: plan === 'free' && blocked_features_free.includes(feature),
    isPaid: plan === 'paid',
  }
}
```

### 3. Uso no Componente

```tsx
function FinancialPage() {
  const { isBlocked: metaBlocked } = useFeatureAccess('meta')
  
  if (metaBlocked) {
    return <UpgradePrompt feature="Meta Financeira" />
  }
  
  return <MetaSection />
}
```

---

## Alternativas Consideradas

### A. Condicionalizar no Componente
- ❌ Duplicação de lógica
- ❌ Difícil de manter
- ✅ Simples para 1-2 features

### B. Middleware no Router
- ✅ Centralizador
- ❌ Muito boilerplate
- ❌ Mensagens genéricas

### C. Context API
- ✅ Nativo React
- ❌ Performance (re-renders)
- ❌ Menos testável

---

## Vantagens

✅ Centralizador (fonte única de verdade)
✅ Reutilizável em qualquer componente
✅ Fácil de testar
✅ Escala bem quando adicionar features
✅ Integra direto com auth store existente

---

## Desvantagens

❌ Pequena overhead de uma custom hook
❌ Precisa manter lista de features sincronizada

---

## Relacionado

- [ADR 002: UI Blocking Patterns](./ui-blocking-patterns)
- [Schema: Subscriptions](../schemas/subscription)
