---
sidebar_position: 4
---

# Dados e Integrações

Endpoints da **Detail Lab API** ([`reforged-api`](https://github.com/mycarpass/reforged-api)) que o autoagendamento consome ou vai precisar. Esta página é uma referência de produto — o objetivo é deixar claro **de onde vêm os dados** de cada etapa e **o que ainda falta**.

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

Hoje a consulta existe, mas **apenas autenticada** (`GET /customers?search=`, usada pelo painel web). Para o autoagendamento o frontend consome um **endpoint público escopado ao parceiro** (a implementar no backend):

```
GET /public/partners/{slug}/customers/lookup?phone={digitos}
```

**Resposta esperada:**
```json
{
  "data": {
    "exists": true,
    "customer": {
      "id": 1,
      "name": "João",
      "phone": "5511999999999",
      "vehicles": [
        {
          "id": 10,
          "manufacturer": "Honda",
          "model": "Civic",
          "license_plate": "ABC-1D23",
          "color": "Preto",
          "category": "medium"
        }
      ]
    }
  }
}
```

Quando não existe: `{ "data": { "exists": false, "customer": null } }`.

:::tip Implementado
`PublicCustomerLookupController` — escopado ao `slug` (só clientes daquele
parceiro) e retornando o mínimo necessário. Revisão de privacidade/LGPD ainda em
aberto (ver [Dúvidas](./duvidas.md)).
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

O frontend consome (a implementar no backend):

```
GET /public/partners/{slug}/services
```

**Resposta esperada:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Lavagem simples",
      "description": "Lavagem externa completa",
      "prices": [
        { "vehicle_category": "small", "price": 10000 },
        { "vehicle_category": "medium", "price": 12000 }
      ]
    }
  ]
}
```

> `price` em **centavos** (a API trabalha sempre em centavos). O frontend formata para reais.

:::tip Implementado
`PublicServiceController` — lista os serviços ativos do parceiro com preços por porte.
:::

---

## 5. Criação do agendamento

O agendamento é um `Work`, que já possui o campo `scheduled_at` (data/hora do agendamento). O frontend envia (a implementar no backend):

```
POST /public/partners/{slug}/appointments
```

**Corpo enviado:**
```json
{
  "customer_id": 1,
  "name": "João",
  "phone": "(11) 99999-9999",
  "vehicle": { "id": 10 },
  "service_id": 1,
  "vehicle_category": "medium",
  "scheduled_at": "2026-07-01T14:00:00"
}
```

> Para cliente novo, `customer_id` é omitido e `vehicle` traz os dados completos
> (`manufacturer`, `model`, `license_plate`, `color`, `category`) em vez de `id`.

**Resposta esperada:** `{ "data": { "id": 99, "whatsapp_redirect_url": "https://wa.me/..." } }`

:::tip Implementado
`PublicAppointmentController` + `PublicAppointmentService` criam um `Work`
(status `pending_confirmation`) com um `WorkItem` ligando o serviço escolhido,
criando/atualizando cliente e veículo conforme necessário. O novo status
`WorkStatus::PENDING_CONFIRMATION` foi adicionado (com migration que alarga a
coluna `works.status`).

⚠️ Rode `php artisan migrate` para aplicar a migration da coluna `status`.
:::

---

## 6. Redirect para o WhatsApp

Ao final, o cliente volta ao WhatsApp do parceiro. Esse padrão **já existe** no fluxo de lead:

- O backend monta uma URL `https://wa.me/{telefone}?text={mensagem}`
- Retorna no campo `whatsapp_redirect_url`

Para o autoagendamento, basta ajustar a mensagem para algo como:
> "Acabei de fazer meu agendamento pelo link e estou aguardando a confirmação."

---

## Implementação no link

O frontend já está implementado no projeto **link** ([`reforged-partner-link`](https://github.com/mycarpass/reforged-partner-link)):

- **Rota:** `/{slug}/agendar`
- **Feature:** `src/features/scheduling/` (espelha o padrão da feature `lead`)
  - `services/` — consome os três endpoints públicos acima
  - `hooks/use-scheduling-flow.ts` — máquina de estados das etapas
  - `components/steps/` — identificação, veículo, serviço, data/hora, sucesso

As chamadas consomem os endpoints públicos abaixo, já implementados no backend.

## Implementação no backend

Implementado na API ([`reforged-api`](https://github.com/mycarpass/reforged-api)):

- **Rotas públicas** (em `routes/api.php`, middleware `throttle:public`):
  - `GET /public/partners/{slug}/customers/lookup` → `PublicCustomerLookupController`
  - `GET /public/partners/{slug}/services` → `PublicServiceController`
  - `POST /public/partners/{slug}/appointments` → `PublicAppointmentController`
- **`PublicAppointmentService`** — cria `Work` (status `pending_confirmation`) +
  `WorkItem`, e faz upsert de cliente/veículo (reaproveitando o padrão do lead).
- **`WorkStatus::PENDING_CONFIRMATION`** — novo status + migration que alarga a
  coluna `works.status`.

⚠️ **Rodar `php artisan migrate`** para aplicar a migration da coluna `status`.

---

## Resumo: o que já existe x o que falta

| Necessidade | Frontend | Backend |
|-------------|----------|---------|
| Identificar parceiro pelo link | ✅ | ✅ Existe (`/public/partners/{slug}`) |
| Redirect WhatsApp | ✅ | ✅ Existe (`whatsapp_redirect_url`) |
| Consultar cliente por telefone (público) | ✅ | ✅ Implementado |
| Listar serviços/preços do parceiro (público) | ✅ | ✅ Implementado |
| Criar agendamento pelo link | ✅ | ✅ Implementado |
| Status "aguardando confirmação" | — | ✅ `WorkStatus::PENDING_CONFIRMATION` (rodar migration) |
| Exibir agendamento no painel web | — | ⏳ Pendente (`admin_dash_web`) |

---

## Próximos Passos

👉 [Dúvidas em Aberto](./duvidas.md) — decisões de produto e itens de backend pendentes
