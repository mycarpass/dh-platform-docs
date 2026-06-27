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

:::tip Decisão de MVP (implementada)
O cliente **seleciona o porte** num seletor visual com exemplos de modelos
(Pequeno: Mobi/Kwid/Ka · Médio: Onix/Corolla/Golf · etc.). O preço é mostrado
como **referência por porte**, e a tela deixa claro que o **parceiro confirma o
valor final** ao aceitar o agendamento. Isso destrava o fluxo sem comprometer
a plataforma a um preço errado. Inferência automática pela placa fica como
evolução futura.
:::

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

:::tip Decisão de MVP (implementada)
**Escolha livre**: o cliente escolhe entre os **próximos 14 dias** e uma grade
de **horários fixos**. A tela avisa que "o horário é uma solicitação" e que o
parceiro confirma a disponibilidade pelo WhatsApp. Mostrar disponibilidade real
fica como evolução futura.
:::

---

## 5. Cliente com mais de um veículo 🚙

Se o cliente já existe e tem **vários veículos**, em qual deles o serviço será feito?

**Decisão necessária:** deixar o cliente escolher o veículo existente ou permitir cadastrar um novo no momento do agendamento.

:::tip Decisão de MVP (implementada)
Para simplificar, o MVP usa o **primeiro veículo** do cliente quando ele já
existe. Seleção entre múltiplos veículos (ou cadastro de um novo no fluxo) fica
como evolução futura.
:::

---

## Resumo das Decisões Pendentes

| # | Tema | Tipo | Situação |
|---|------|------|----------|
| 1 | Porte do veículo / preço | Produto + UX | ✅ Decidido (MVP) |
| 2 | Status "aguardando confirmação" | Backend | 🔴 Pendente (backend) |
| 3 | Consulta pública + privacidade | Backend + LGPD | 🔴 Pendente (backend) |
| 4 | Disponibilidade de horários | Produto | ✅ Decidido (MVP) |
| 5 | Múltiplos veículos | Produto + UX | ✅ Decidido (MVP) |

As decisões de produto (1, 4, 5) já estão **implementadas no frontend**. Os
itens 2 e 3 dependem do backend e seguem pendentes.

---

> Conforme as decisões forem tomadas, esta página deve ser atualizada e os pontos resolvidos migram para a [Visão Geral](./overview.md) e [Casos de Uso](./use-cases.md).
