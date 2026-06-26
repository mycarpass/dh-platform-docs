---
sidebar_position: 2
---

# ADR 002: UI Blocking Patterns para Features Bloqueadas

## Status

✅ Accepted

---

## Contexto

Existem várias formas de bloquear features na UI:
1. **Remover componente** - usuário não vê nada
2. **Desabilitar/Gray out** - usuário vê mas não consegue clicar
3. **Modal/Redirect** - força upgrade imediato
4. **Ocultar com tooltip** - indica que algo falta

Para cada tipo de bloqueio (funcionalidade vs limite de quantidade), precisamos de padrões diferentes.

---

## Decisão

### Padrão 1: Bloqueio de Funcionalidade (Paid-Only)

**UI Behavior:**
- Ocultar menu/opção completamente
- Se necessário mostrar, usar badge com "Upgrade"
- Tooltip: "Recurso disponível apenas no plano Paid"

**Exemplo:**
```tsx
function Sidebar() {
  const { isBlocked: metaBlocked } = useFeatureAccess('meta')
  
  // Ocultar menu completamente
  if (metaBlocked) {
    return <SidebarWithoutMeta />
  }
  
  return <SidebarWithMeta />
}
```

---

### Padrão 2: Bloqueio por Limite de Quantidade (Renovável)

**UI Behavior (Agendamentos):**
- Mostrar contador: "25/30 agendamentos"
- Botão "Novo Agendamento" desabilitado quando atingir 30
- Toast warning em 80%: "Você está próximo do limite"
- Modal: "Limite atingido. Upgrade para continuar."

**Exemplo:**
```tsx
function AgendamentosPage() {
  const { usage, limits } = useAuth()
  const remaining = limits.agendamentos_mes - usage.agendamentos_mes
  const canCreate = remaining > 0
  
  return (
    <>
      <UsageBar 
        current={usage.agendamentos_mes}
        max={limits.agendamentos_mes}
        warning={80}
      />
      <Button 
        disabled={!canCreate}
        onClick={() => createAgendamento()}
      >
        Novo Agendamento
      </Button>
    </>
  )
}
```

---

### Padrão 3: Bloqueio por Limite Não-Renovável (Clientes/Serviços)

**UI Behavior:**
- Mostrar: "25/30 clientes"
- Botão "Novo Cliente" desabilitado quando atingir 30
- Mensagem: "Limite permanente atingido. Upgrade para adicionar mais."
- Aviso em 80% com destaque visual

**Exemplo:**
```tsx
function ClientesPage() {
  const { usage, limits } = useAuth()
  const isFull = usage.clientes >= limits.clientes_max
  
  return (
    <>
      <ProgressBar 
        value={usage.clientes}
        max={limits.clientes_max}
        showWarning={true}
      />
      {isFull && (
        <Alert variant="warning">
          Limite de clientes atingido. Upgrade para continuar adicionando.
        </Alert>
      )}
      <Button disabled={isFull}>Novo Cliente</Button>
    </>
  )
}
```

---

### Padrão 4: Bloqueio de Campo/Feature Específica

**UI Behavior:**
- Campo desabilitado com ícone/badge
- Tooltip explicativa
- Placeholder indicando limitação

**Exemplo:**
```tsx
<Input
  disabled={reconhecimentoPlacaBlocked}
  placeholder="Digite a placa (Upgrade para reconhecimento automático)"
  value={placa}
  onChange={handlePlacaChange}
/>
<Button
  disabled={reconhecimentoPlacaBlocked}
  title="Disponível apenas no plano Paid"
>
  🔍 Reconhecer Placa
</Button>
```

---

## Componentes Reutilizáveis

### 1. UsageBar Component

```tsx
// src/components/subscription/usage-bar.tsx
interface UsageBarProps {
  current: number
  max: number
  label: string
  warning?: number // % para ativar warning
}

export function UsageBar({ current, max, label, warning = 80 }: UsageBarProps) {
  const percentage = (current / max) * 100
  const isWarning = percentage >= warning
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className={isWarning ? 'text-warning' : ''}>
          {current}/{max}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={isWarning ? 'bg-warning/20' : ''}
      />
    </div>
  )
}
```

### 2. UpgradePrompt Component

```tsx
// src/components/subscription/upgrade-prompt.tsx
interface UpgradePromptProps {
  feature: string
  variant?: 'modal' | 'inline' | 'tooltip'
}

export function UpgradePrompt({ feature, variant = 'inline' }: UpgradePromptProps) {
  if (variant === 'inline') {
    return (
      <Card className="bg-primary/5 border-primary">
        <CardContent className="pt-6">
          <p>🎯 <strong>{feature}</strong> está disponível apenas no plano Paid</p>
          <Button className="mt-4">Upgrade Agora</Button>
        </CardContent>
      </Card>
    )
  }
  
  // ... outros variants
}
```

---

## Aplicação por Feature

| Feature | Padrão | Comportamento |
|---------|--------|---------------|
| **Meta** | 1 | Ocultar menu |
| **Ticket Médio** | 1 | Ocultar campo |
| **Funcionários** | 1 | Ocultar menu |
| **Upload Imagem** | 4 | Input desabilitado |
| **Reconhecimento Placa** | 4 | Botão desabilitado |
| **Consulta Veículo** | 4 | Botão desabilitado |
| **Agendamentos** | 2 | Contador + bloqueio |
| **Clientes** | 3 | Contador + bloqueio + aviso |
| **Serviços** | 3 | Contador + bloqueio + aviso |

---

## Relacionado

- [ADR 001: Feature Flags](./feature-flags)
- [ADR 003: Error Messages](./error-messages)
