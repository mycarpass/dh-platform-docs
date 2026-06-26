---
sidebar_position: 3
---

# Casos de Uso

Situações reais de como o autoagendamento funciona, do ponto de vista do cliente e do parceiro.

---

## Caso 1: Cliente já cadastrado agenda um serviço

**Contexto:** A estética já atendeu o João antes, então ele já existe na base do parceiro.

**O que acontece:**

1. João recebe o link de autoagendamento pelo WhatsApp do parceiro
2. Abre o link e informa **nome** e **telefone**
3. O sistema consulta pelo telefone e **encontra** o cadastro do João (com o veículo dele)
4. João vai **direto para a seleção de serviço** — não precisa cadastrar nada de novo
5. Escolhe o serviço, a data e o horário
6. Vê a tela de confirmação e volta ao WhatsApp do parceiro

**Resultado:** agendamento criado em segundos, sem recadastro.

---

## Caso 2: Cliente novo precisa se cadastrar

**Contexto:** A Maria nunca foi atendida por essa estética.

**O que acontece:**

1. Maria abre o link e informa **nome** e **telefone**
2. O sistema consulta pelo telefone e **não encontra** nenhum cliente
3. A tela pede o cadastro: Maria **confirma o nome e o telefone** que já digitou
4. Abrem-se os campos do **veículo**: fabricante, modelo, placa, cor (e o porte — ver [Dúvidas](./duvidas.md))
5. Com o cadastro feito, Maria segue para a **seleção de serviço**
6. Escolhe serviço, data e horário e finaliza

**Resultado:** cliente e veículo cadastrados, agendamento criado no mesmo fluxo.

---

## Caso 3: Escolha do serviço conforme o veículo

**Contexto:** Cliente com cadastro pronto, na tela de serviços.

**O que acontece:**

1. O cliente vê a lista de serviços oferecidos pelo parceiro
2. Os preços exibidos correspondem ao **porte do veículo** dele
   - Ex.: *Lavagem simples* → Hatch (P) = R$ 100 · Sedan (M) = R$ 120
3. O cliente seleciona o serviço desejado

**Resultado:** serviço escolhido com o preço correto para o porte do carro.

> ⚠️ Como o porte é determinado é um ponto em aberto — ver [Dúvidas em Aberto](./duvidas.md).

---

## Caso 4: Escolha de data e horário

**Contexto:** Serviço já selecionado.

**O que acontece:**

1. O cliente vê uma tela para escolher o **dia** do agendamento
2. Em seguida escolhe o **horário** disponível naquele dia
3. Confirma a seleção

**Resultado:** data e horário do agendamento definidos.

---

## Caso 5: Confirmação e retorno ao WhatsApp

**Contexto:** Cliente concluiu a escolha de data e horário.

**O que acontece:**

1. Aparece a tela final: **"Seu agendamento foi enviado!"**
2. A tela explica que o parceiro ainda vai **confirmar** o horário
3. Um botão **"Falar no WhatsApp"** leva o cliente ao WhatsApp do parceiro
4. A mensagem já vem preenchida, no sentido de:
   > "Acabei de fazer meu agendamento pelo link e estou aguardando a confirmação."

**Resultado:** cliente informado e em contato direto com o parceiro.

---

## Caso 6: Parceiro recebe o agendamento no painel

**Contexto:** O cliente finalizou o autoagendamento.

**O que acontece:**

1. No **painel web**, o parceiro vê um novo agendamento
2. O agendamento está com o status **aguardando confirmação**
3. O parceiro confirma (ou reagenda/recusa) o horário

**Resultado:** o parceiro tem controle final sobre a agenda, sem perder o pedido do cliente.

> ⚠️ O status "aguardando confirmação" ainda não existe e precisa ser criado — ver [Dúvidas em Aberto](./duvidas.md).

---

## Resumo do Fluxo

| Etapa | Tela | O que o cliente faz |
|-------|------|---------------------|
| 1 | Identificação | Informa nome + telefone |
| 2 | Cadastro (se novo) | Confirma dados + cadastra veículo |
| 3 | Serviço | Escolhe o serviço (preço por porte) |
| 4 | Agenda | Escolhe data e horário |
| 5 | Confirmação | Vê confirmação + volta ao WhatsApp |
| 6 | (Parceiro) | Recebe no painel "aguardando confirmação" |
