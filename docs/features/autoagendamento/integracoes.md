---
sidebar_position: 4
---

# Dados e Integrações

Endpoints da **Detail Lab API** (`reforged-api`) que o autoagendamento consome ou vai precisar. Esta página é uma referência de produto — o objetivo é deixar claro **de onde vêm os dados** de cada etapa e **o que ainda falta**.

---

## 1. Identificação do parceiro (pelo link)

O link carrega o `slug` do parceiro. A página usa o endpoint público que já existe:

```
GET /public/partners/{slug}
```

- ✅ **Já existe** e é público
- Retorna os dados do parceiro dono daquele link

---

## 2. Consulta do cliente pelo telefone

Depois que o cliente informa nome e telefone, o sistema precisa verificar se ele já existe na base do parceiro.

Hoje a consulta existe, mas **apenas autenticada** (usada pelo painel web):

```
GET /customers?search={telefone}
```

- Busca por nome **ou** telefone
- Já retorna o cliente **com os veículos** (`with('vehicles')`)

:::warning Gap
Esse endpoint exige autenticação (`auth:sanctum`). No autoagendamento o cliente **não está logado**, então será preciso uma **versão pública** dessa consulta — provavelmente vinculada ao `slug` do parceiro, no mesmo padrão de `/public/partners/{slug}/...`. Há também uma questão de privacidade a resolver (ver [Dúvidas](./duvidas.md)).
:::

---

## 3. Cadastro do cliente e do veículo

Quando o cliente não existe, criamos o cadastro. O fluxo de **lead atual** já faz algo muito parecido:

```
POST /public/partners/{slug}/leads
```

- ✅ **Já existe** e é público
- Já **cria ou encontra** o cliente (retorna se foi criado ou não)
- Já aceita dados de veículo: `manufacturer`, `model`, `license_plate`, `color`

**Campos do veículo** (model `Vehicle`):

| Campo | Descrição |
|-------|-----------|
| `manufacturer` | Fabricante |
| `model` | Modelo |
| `license_plate` | Placa |
| `color` | Cor |
| `mileage` | Quilometragem |
| `category` | **Porte** — ver [Dúvidas](./duvidas.md) |

> Esse endpoint pode ser a base para o cadastro do autoagendamento, evoluído para também receber serviço, data e horário.

---

## 4. Serviços e preços por porte

A lista de serviços do parceiro e seus preços vêm do catálogo. A precificação é **por porte do veículo**:

- `CatalogService` — o serviço (ex: "Lavagem simples")
- `CatalogServicePrice` — o preço por porte: `vehicle_category` + `price`

**Portes disponíveis** (enum `VehicleCategory`):

| Valor | Porte |
|-------|-------|
| `motorcycle` | Moto |
| `small` | Pequeno (ex: Mobi, Kwid, Ka) |
| `medium` | Médio (ex: Onix, Corolla, Golf) |
| `large` | Grande (ex: Fusion, sedans de luxo) |
| `extra_large` | SUV (ex: Compass, HR-V) |

:::warning Gap
Não há hoje um endpoint **público** que liste os serviços e preços de um parceiro para o cliente final. Será necessário expor isso (novamente, provavelmente via `slug`).
:::

---

## 5. Criação do agendamento

O agendamento é um `Work`, que já possui o campo `scheduled_at` (data/hora do agendamento).

:::warning Gap
1. **Não existe** endpoint público para criar um agendamento a partir do link.
2. O status **"aguardando confirmação" não existe** no `WorkStatus` (hoje: `in_queue`, `in_progress`, `finished`, `delivered`, `cancelled`). Precisa ser criado. Ver [Dúvidas](./duvidas.md).
:::

---

## 6. Redirect para o WhatsApp

Ao final, o cliente volta ao WhatsApp do parceiro. Esse padrão **já existe** no fluxo de lead:

- O backend monta uma URL `https://wa.me/{telefone}?text={mensagem}`
- Retorna no campo `whatsapp_redirect_url`

Para o autoagendamento, basta ajustar a mensagem para algo como:
> "Acabei de fazer meu agendamento pelo link e estou aguardando a confirmação."

---

## Resumo: o que já existe x o que falta

| Necessidade | Situação |
|-------------|----------|
| Identificar parceiro pelo link | ✅ Existe (`/public/partners/{slug}`) |
| Criar/encontrar cliente (público) | ✅ Existe (`/public/partners/{slug}/leads`) |
| Redirect WhatsApp | ✅ Existe (`whatsapp_redirect_url`) |
| Consultar cliente por telefone (público) | ⚠️ Só autenticado hoje |
| Listar serviços/preços do parceiro (público) | ❌ Não existe |
| Criar agendamento pelo link | ❌ Não existe |
| Status "aguardando confirmação" | ❌ Não existe |

---

## Próximos Passos

👉 [Dúvidas em Aberto](./duvidas.md) — decisões necessárias antes da implementação
