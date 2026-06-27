---
sidebar_position: 1
---

# Autoagendamento

:::note Status
🟡 **Em andamento** — fluxo implementado no **link** e endpoints públicos + novo status implementados na **API**. Falta o **painel web** exibir o status "aguardando confirmação" e a revisão de privacidade da consulta pública.
:::

## O Que É

O **Autoagendamento** permite que o cliente final agende um serviço **sozinho**, sem precisar conversar com o parceiro para marcar horário. O parceiro envia um link, o cliente abre, informa seus dados, escolhe o serviço, a data e o horário — e o agendamento cai direto no painel do parceiro para confirmação.

A feature vive dentro do projeto **link** ([`reforged-partner-link`](https://github.com/mycarpass/reforged-partner-link)), onde já existe o fluxo público de captação de leads dos parceiros Detail Lab.

---

## Para Quem É

- **Parceiros Detail Lab** — que querem reduzir o vai-e-volta no WhatsApp para marcar horário. Eles compartilham o link de autoagendamento com seus clientes.
- **Clientes finais** — que querem agendar um serviço de forma rápida, a qualquer hora, sem depender de resposta imediata do parceiro.

---

## Como Funciona (Resumo)

```mermaid
graph LR
    A["📲 Cliente recebe<br/>o link do parceiro"] --> B["Informa nome<br/>e telefone"]
    B --> C{"Cliente já<br/>existe?"}
    C -->|Sim| E["Escolhe o serviço"]
    C -->|Não| D["Cadastra veículo"]
    D --> E
    E --> F["Escolhe data<br/>e horário"]
    F --> G["Confirmação +<br/>volta pro WhatsApp"]
    G --> H["Cai no painel do<br/>parceiro: aguardando<br/>confirmação"]
```

---

## Onde Vive

| Parte | Projeto | Detalhe |
|-------|---------|---------|
| Telas do autoagendamento | **link** ([`reforged-partner-link`](https://github.com/mycarpass/reforged-partner-link)) | Rota `/{slug}/agendar` · feature `scheduling` |
| Endpoints consumidos | **Detail Lab API** ([`reforged-api`](https://github.com/mycarpass/reforged-api)) | Endpoints públicos (a implementar) |
| Recebimento do agendamento | **painel web** ([`admin_dash_web`](https://github.com/mycarpass/admin_dash_web)) | Status "aguardando confirmação" (a implementar) |

---

## Comece Por Aqui

- 📋 **[Visão Geral](./overview.md)** — o fluxo completo, etapa por etapa
- 🎯 **[Casos de Uso](./use-cases.md)** — situações reais de uso
- 🔌 **[Dados e Integrações](./integracoes.md)** — endpoints que a feature usa
- ❓ **[Dúvidas em Aberto](./duvidas.md)** — pontos que precisam de decisão

---

## Status de Desenvolvimento

- [x] Ideia inicial
- [x] Definição de produto
- [x] Decisões de MVP para as dúvidas em aberto (ver [Dúvidas](./duvidas.md))
- [x] Implementação das telas (link) — feature `scheduling`, rota `/{slug}/agendar`
- [x] Endpoints públicos na API ([lookup, services, appointments](./integracoes.md))
- [x] Novo status `WorkStatus::PENDING_CONFIRMATION` (+ migration)
- [ ] Exibir o status "aguardando confirmação" no painel web
- [ ] Revisão de privacidade da consulta pública de cliente (LGPD)
- [ ] Teste ponta a ponta + lançamento
