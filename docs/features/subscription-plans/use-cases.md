---
sidebar_position: 3
---

# Casos de Uso

Situações reais de como a feature de Planos de Assinatura funciona no dia a dia do parceiro.

---

## Caso 1: Parceiro Free atinge o limite de agendamentos

**Contexto:** Uma estética no plano Free já criou 30 agendamentos neste mês.

**O que acontece:**

1. O parceiro abre a agenda e vê o contador: **"30/30 agendamentos"**
2. O botão **"Novo Agendamento"** aparece desabilitado
3. Ao tentar criar mesmo assim, recebe a mensagem:
   > Limite de agendamentos atingido. Você pode criar 30 agendamentos por mês. Faça upgrade para ilimitado.
4. Um botão **"Fazer upgrade"** leva direto para a tela de planos

**No início do próximo mês:** o contador zera automaticamente e o parceiro volta a poder criar agendamentos.

---

## Caso 2: Parceiro Free se aproxima do limite de clientes

**Contexto:** A estética cadastrou 24 dos 30 clientes permitidos no Free.

**O que acontece:**

1. Ao cadastrar o 24º cliente (80% do limite), recebe um aviso:
   > ⚠️ Você está próximo do limite de clientes (24/30). Considere fazer upgrade.
2. Continua cadastrando normalmente até o 30º
3. No 30º cliente, novos cadastros ficam bloqueados:
   > 🚫 Limite de clientes atingido. No plano Free você pode ter até 30 clientes.

**Importante:** diferente dos agendamentos, o limite de clientes **não renova** — só o upgrade libera mais.

---

## Caso 3: Parceiro Free tenta acessar um recurso premium

**Contexto:** A estética quer ver a **Meta Financeira**, disponível só no Paid.

**O que acontece:**

1. O menu **"Meta"** não aparece no painel do parceiro Free
2. Se ele chega à tela por um link direto, vê um convite:
   > 🔒 Meta Financeira está disponível apenas no plano Paid.
3. Um botão **"Conhecer o plano Paid"** apresenta os benefícios

O mesmo vale para: Ticket Médio, Funcionários, Upload de imagens, Reconhecimento de placa e Consulta de veículo.

---

## Caso 4: Parceiro faz upgrade para o Paid

**Contexto:** A estética decidiu assinar o plano Paid.

**O que acontece:**

1. Escolhe o plano e o ciclo (mensal ou anual)
2. Conclui o pagamento
3. **Imediatamente:**
   - Todos os limites são removidos (agendamentos, clientes, serviços ilimitados)
   - Todos os recursos premium aparecem no painel
   - Nenhum dado é perdido — tudo que existia no Free continua

---

## Caso 5: Parceiro Paid cancela a assinatura

**Contexto:** A estética decide cancelar.

**O que acontece:**

1. Mantém o acesso Paid até o **fim do período já pago**
2. Após esse período, volta para o **Free**
3. Os dados são **preservados** — mas voltam a valer os limites do Free
4. Pode reativar o Paid a qualquer momento

---

## Caso 6: Parceiro Paid usa tudo sem restrição

**Contexto:** Estética estabelecida no plano Paid.

**O que acontece:**

- Cria agendamentos, clientes e serviços **sem contador e sem limite**
- Acessa todos os relatórios e recursos premium
- Usa automações como reconhecimento de placa e consulta de veículo
- Não vê nenhum aviso de upgrade

---

## Resumo das Mensagens ao Usuário

| Situação | Mensagem |
|----------|----------|
| Perto do limite (80%) | ⚠️ Aviso amigável sugerindo upgrade |
| Limite renovável atingido | Bloqueio + "renova no próximo mês" |
| Limite permanente atingido | Bloqueio + "só o upgrade libera mais" |
| Recurso premium bloqueado | 🔒 Convite para conhecer o Paid |

---

## Próximos Passos

👉 [Plano Free](./free-plan.md) — todos os limites em detalhe

👉 [Plano Paid](./paid-plan.md) — o que o upgrade libera
