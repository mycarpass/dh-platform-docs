---
sidebar_position: 5
---

# Dúvidas em Aberto

Pontos que precisam de decisão antes (ou durante) a implementação. Como a feature está em **💡 Ideação**, estas questões são parte do processo de definição.

---

## 1. Seleção do porte do veículo 🚗

**O problema:** a precificação dos serviços no Detail Lab é **por porte** (carroceria). Quando o parceiro cadastra um serviço, ele define o preço para cada porte — ex.: *Lavagem simples* custa R$ 100 para um hatch (P/pequeno) e R$ 120 para um sedan (M/médio).

Para mostrar o **preço correto** ao cliente no autoagendamento, precisamos saber o porte do veículo dele. Mas:

- Se **o cliente** escolhe o porte, ele pode errar (escolher P sendo M) e ver um preço menor do que o real.
- Se **não pedimos** o porte, não conseguimos exibir o preço.

**Decisão necessária:** pedir o porte agora ou deixar para depois?

### Sugestões para evitar porte errado

- **Inferir pelo modelo:** já existe consulta de dados do veículo pela placa na API (`/vehicles/plate-info/{plate}`). Dá para tentar **deduzir o porte automaticamente** a partir do modelo/placa e só pedir confirmação.
- **Lista visual com exemplos:** mostrar cada porte com modelos de referência (ex: "Médio — Onix, Corolla, Golf"), reduzindo erro.
- **Confirmação do parceiro:** como o agendamento já chega "aguardando confirmação", o parceiro pode **ajustar o porte/preço** antes de confirmar.
- **Preço "a confirmar":** exibir o serviço sem preço fechado no autoagendamento e deixar o valor final para a confirmação do parceiro.

> 💡 Recomendação inicial: na primeira versão, **não bloquear o fluxo no porte** — inferir quando possível e deixar o parceiro confirmar o valor final.

---

## 2. Status "aguardando confirmação" não existe 📋

Hoje os status de agendamento (`WorkStatus`) são:

`in_queue` · `in_progress` · `finished` · `delivered` · `cancelled`

Não há um status para um agendamento que **o cliente criou mas o parceiro ainda não confirmou**.

**Decisão necessária:** criar um novo status (ex.: `pending_confirmation` / "aguardando confirmação") e definir o que o parceiro pode fazer a partir dele (confirmar → vai para a fila; recusar → cancela; reagendar).

---

## 3. Consulta pública de cliente e privacidade 🔒

A consulta de cliente por telefone existe, mas é **autenticada**. No autoagendamento o cliente não está logado, então precisaríamos de uma versão pública.

**Risco:** uma consulta pública por telefone pode permitir que **qualquer pessoa com o link** descubra se um número está cadastrado e veja dados do cliente/veículo.

**Decisão necessária:** como proteger essa consulta? Algumas opções:

- Vincular a consulta ao `slug` do parceiro (só retorna clientes daquele parceiro).
- Retornar o **mínimo** necessário (ex.: só confirmar "já é cliente" sem expor veículos antes de uma validação).
- Validação por código no WhatsApp (mais fricção, mais segurança).

---

## 4. Disponibilidade de data e horário 📅

A documentação prevê o cliente escolher dia e horário, mas:

**Decisão necessária:** o cliente vê **horários livres reais** da agenda do parceiro, ou escolhe livremente e o parceiro ajusta na confirmação?

- Mostrar disponibilidade real exige expor a agenda do parceiro publicamente.
- Escolha livre é mais simples, mas pode gerar conflitos resolvidos só na confirmação.

---

## 5. Cliente com mais de um veículo 🚙

Se o cliente já existe e tem **vários veículos**, em qual deles o serviço será feito?

**Decisão necessária:** deixar o cliente escolher o veículo existente ou permitir cadastrar um novo no momento do agendamento.

---

## Resumo das Decisões Pendentes

| # | Tema | Tipo | Bloqueia MVP? |
|---|------|------|----------------|
| 1 | Porte do veículo / preço | Produto + UX | Parcialmente |
| 2 | Status "aguardando confirmação" | Backend | ✅ Sim |
| 3 | Consulta pública + privacidade | Backend + LGPD | ✅ Sim |
| 4 | Disponibilidade de horários | Produto | Parcialmente |
| 5 | Múltiplos veículos | Produto + UX | Não |

---

> Conforme as decisões forem tomadas, esta página deve ser atualizada e os pontos resolvidos migram para a [Visão Geral](./overview.md) e [Casos de Uso](./use-cases.md).
