# ADR 003: Padronização de Mensagens de Erro e Aviso

## Status
Accepted

## Context

Diferentes bloqueios (funcionalidade, limite renovável, limite não-renovável) precisam de mensagens diferentes para o usuário entender por que uma ação foi bloqueada.

## Decision

### Mensagens por Tipo de Bloqueio

#### Tipo 1: Feature Bloqueada (Paid-Only)

**Tooltip/Placeholder:**
```
"Recurso disponível apenas no plano Paid"
```

**Mensagem de Aviso:**
```
"🔒 {FEATURE} está disponível apenas no plano Paid. Upgrade para acessar."
```

**Exemplos:**
- "🔒 Meta Financeira está disponível apenas no plano Paid. Upgrade para acessar."
- "🔒 Reconhecimento automático de placa está disponível apenas no plano Paid. Upgrade para acessar."

---

#### Tipo 2: Limite Renovável Atingido (Agendamentos)

**Toast de Aviso (80%):**
```
"⚠️ Você atingiu 80% do limite de agendamentos (24/30). Upgrade para continuar."
```

**Erro ao Tentar Criar:**
```
"Limite de agendamentos atingido. Você pode criar 30 agendamentos por mês. Upgrade para ilimitado."
```

**Modal de Upgrade:**
```
Título: "Limite de Agendamentos Atingido"
Descrição: "Você atingiu o limite de 30 agendamentos mensais. Faça upgrade para criar agendamentos ilimitados."
Botão: "Upgrade Agora"
```

---

#### Tipo 3: Limite Não-Renovável Atingido (Clientes/Serviços)

**Toast de Aviso (80%):**
```
"⚠️ Você está próximo do limite de clientes (24/30). Considere fazer upgrade."
```

**Erro ao Tentar Criar:**
```
"Limite permanente de clientes atingido. Você pode ter no máximo 30 clientes no plano Free. Upgrade para ilimitado."
```

**Alert Visual Inline:**
```
"🚫 Limite de clientes atingido. Não é possível adicionar novos clientes no plano Free."
```

---

### Strings Centralizadas

```typescript
// src/features/subscription/constants/messages.ts

export const SUBSCRIPTION_MESSAGES = {
  // Feature Bloqueada
  FEATURE_BLOCKED: (feature: string) => 
    `🔒 ${feature} está disponível apenas no plano Paid. Upgrade para acessar.`,
  
  // Agendamentos
  AGENDAMENTOS_WARNING: (current: number, max: number) =>
    `⚠️ Você atingiu ${Math.round((current/max) * 100)}% do limite de agendamentos (${current}/${max}). Upgrade para continuar.`,
  
  AGENDAMENTOS_LIMIT_REACHED: (max: number) =>
    `Limite de agendamentos atingido. Você pode criar ${max} agendamentos por mês. Upgrade para ilimitado.`,
  
  // Clientes
  CLIENTES_WARNING: (current: number, max: number) =>
    `⚠️ Você está próximo do limite de clientes (${current}/${max}). Considere fazer upgrade.`,
  
  CLIENTES_LIMIT_REACHED: (max: number) =>
    `Limite permanente de clientes atingido. Você pode ter no máximo ${max} clientes no plano Free. Upgrade para ilimitado.`,
  
  // Serviços
  SERVICOS_WARNING: (current: number, max: number) =>
    `⚠️ Você está próximo do limite de serviços (${current}/${max}). Considere fazer upgrade.`,
  
  SERVICOS_LIMIT_REACHED: (max: number) =>
    `Limite permanente de serviços atingido. Você pode ter no máximo ${max} serviços no plano Free. Upgrade para ilimitado.`,
}
```

### Uso nos Componentes

```typescript
// src/features/agendamentos/components/new-agendamento-button.tsx
import { SUBSCRIPTION_MESSAGES } from '@/features/subscription/constants/messages'
import { useAuth } from '@/features/auth'

export function NewAgendamentoButton() {
  const { usage, limits } = useAuth()
  const canCreate = usage.agendamentos_mes < limits.agendamentos_mes
  const isFull = usage.agendamentos_mes >= limits.agendamentos_mes
  
  const handleClick = () => {
    if (isFull) {
      toast.error(SUBSCRIPTION_MESSAGES.AGENDAMENTOS_LIMIT_REACHED(limits.agendamentos_mes))
      return
    }
    // ... criar agendamento
  }
  
  useEffect(() => {
    if (usage.agendamentos_mes / limits.agendamentos_mes >= 0.8) {
      toast.warning(SUBSCRIPTION_MESSAGES.AGENDAMENTOS_WARNING(usage.agendamentos_mes, limits.agendamentos_mes))
    }
  }, [usage.agendamentos_mes])
  
  return (
    <Button 
      disabled={!canCreate}
      onClick={handleClick}
    >
      Novo Agendamento
    </Button>
  )
}
```

## Tone and Style

- ✅ Use emojis para visual clarity (⚠️ aviso, 🔒 bloqueado, 🚫 erro)
- ✅ Seja específico: mencione números e plano
- ✅ Ofereça solução: sempre mencionar upgrade
- ✅ Tom amigável, não técnico
- ❌ Não usar jargão
- ❌ Não ser genérico ("Erro ao criar")

## Related

- [ADR 002: UI Blocking Patterns](./002-ui-blocking-patterns.md)
- [ADR 001: Feature Flags](./001-feature-flags.md)

## Date
2026-06-25
