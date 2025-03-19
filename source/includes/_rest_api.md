<h1 id="ApiSection" class="section-header">Rest Api</h1>
This section documents the latest(v2) api for trading on Delta Exchange. The REST API has endpoints for account and order management as well as public market data.

If you are looking for the old api documentation, here is the link to [v1 api](https://github.com/delta-exchange/slate/blob/master/source/includes/_rest_api_v1.md) docs (now deprecated). 

REST API Endpoint URL for [Delta Exchange](https://www.delta.exchange)

 - **Production** - https://api.india.delta.exchange
 - **Testnet(Demo Account)** - https://cdn-ind.testnet.deltaex.org

<h1 id="delta-exchange-api-v2-assets">Assets</h1>

Get Asset List

## Get list of all assets

<a id="opIdgetAssets"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/assets', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/assets \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/assets',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /assets`

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    }
  ]
}
```

<h3 id="get-list-of-all-assets-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of [Asset schema](#tocSasset)|Inline|

<h3 id="get-list-of-all-assets-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|deposit_status|enabled|
|deposit_status|disabled|
|withdrawal_status|enabled|
|withdrawal_status|disabled|

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-indices">Indices</h1>

Get Indices List

## Get indices

<a id="opIdgetIndices"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/indices', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/indices \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/indices',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /indices`

Indices refer to spot price indices that Delta Exchange creates by combining spot prices of prominent crypto exchanges. These indices form the underlying of futures and options contracts listed on Delta Exchange. All details of indices on Delta Exchange are available [here](https://www.delta.exchange/indices).

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 14,
      "symbol": ".DEXBTUSD",
      "constituent_exchanges": [
        {
          "name": "ExchangeA",
          "weight": 0.25
        }
      ],
      "underlying_asset_id": 13,
      "quoting_asset_id": 14,
      "tick_size": "0.5",
      "index_type": "spot_pair"
    }
  ]
}
```

<h3 id="get-indices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of [Spot Index schema](#tocSindex)|Inline|

<h3 id="get-indices-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|index_type|spot_pair|
|index_type|fixed_interest_rate|
|index_type|floating_interest_rate|

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-products">Products</h1>

Get Product List

## Get list of products

<a id="opIdgetProducts"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/products', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/products \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/products',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /products`

The endpoint provides details about all available trading products on the platform. Each product represents a financial instrument like perpetual futures, options, or contracts for specific asset pairs.

<h3 id="get-list-of-products-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|contract_types|query|string|false|Comma separated list of contract types e.g. perpetual_futures,call_options, put_options|
|states|query|string|false|Comma separated list of states e.g. upcoming,live,expired,settled to get expired contracts.|
|after|query|string|false|after cursor for paginated request|
|before|query|string|false|before cursor for paginated request|
|page_size|query|string|false|size of a single page for paginated request, default: 100|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 27,
      "symbol": "BTCUSD",
      "description": "Bitcoin Perpetual futures, quoted, settled & margined in INR",
      "created_at": "2023-12-18T13:10:39Z",
      "updated_at": "2024-11-15T02:47:50Z",
      "settlement_time": null,
      "notional_type": "vanilla",
      "impact_size": 10000,
      "initial_margin": "0.5",
      "maintenance_margin": "0.25",
      "contract_value": "0.001",
      "contract_unit_currency": "BTC",
      "tick_size": "0.5",
      "product_specs": {
        "funding_clamp_value": 0.05,
        "only_reduce_only_orders_allowed": false,
        "tags": [
          "layer_1"
        ]
      },
      "state": "live",
      "trading_status": "operational",
      "max_leverage_notional": "100000",
      "default_leverage": "200",
      "initial_margin_scaling_factor": "0.0000025",
      "maintenance_margin_scaling_factor": "0.00000125",
      "taker_commission_rate": "0.0005",
      "maker_commission_rate": "0.0002",
      "liquidation_penalty_factor": "0.5",
      "contract_type": "perpetual_futures",
      "position_size_limit": 229167,
      "basis_factor_max_limit": "10.95",
      "is_quanto": false,
      "funding_method": "mark_price",
      "annualized_funding": "10.95",
      "price_band": "2.5",
      "underlying_asset": {
        "id": 14,
        "symbol": "USD",
        "precision": 8,
        "deposit_status": "enabled",
        "withdrawal_status": "enabled",
        "base_withdrawal_fee": "0.000000000000000000",
        "min_withdrawal_amount": "0.000000000000000000"
      },
      "quoting_asset": {
        "id": 14,
        "symbol": "USD",
        "precision": 8,
        "deposit_status": "enabled",
        "withdrawal_status": "enabled",
        "base_withdrawal_fee": "0.000000000000000000",
        "min_withdrawal_amount": "0.000000000000000000"
      },
      "settling_asset": {
        "id": 14,
        "symbol": "USD",
        "precision": 8,
        "deposit_status": "enabled",
        "withdrawal_status": "enabled",
        "base_withdrawal_fee": "0.000000000000000000",
        "min_withdrawal_amount": "0.000000000000000000"
      },
      "spot_index": {
        "id": 14,
        "symbol": ".DEXBTUSD",
        "constituent_exchanges": [
          {
            "name": "ExchangeA",
            "weight": 0.25
          }
        ],
        "underlying_asset_id": 13,
        "quoting_asset_id": 14,
        "tick_size": "0.5",
        "index_type": "spot_pair"
      }
    }
  ]
}
```

<h3 id="get-list-of-products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of [Products](#tocSproduct)|Inline|

<h3 id="get-list-of-products-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|notional_type|vanilla|
|notional_type|inverse|
|state|live|
|state|expired|
|state|upcoming|
|trading_status|operational|
|trading_status|disrupted_cancel_only|
|trading_status|disrupted_post_only|
|deposit_status|enabled|
|deposit_status|disabled|
|withdrawal_status|enabled|
|withdrawal_status|disabled|
|index_type|spot_pair|
|index_type|fixed_interest_rate|
|index_type|floating_interest_rate|

<aside class="success">
This operation does not require authentication.
</aside>

## Get product by symbol

<a id="opIdgetProduct"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/products/{symbol}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/products/{symbol} \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/products/{symbol}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /products/{symbol}`

The endpoint retrieves details of a specific product identified by its symbol (e.g., BTCUSD, ETHUSD).

<h3 id="get-product-by-symbol-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|symbol|path|string|true|symbol of the desired product like BTCUSD, ETHUSD|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 27,
    "symbol": "BTCUSD",
    "description": "Bitcoin Perpetual futures, quoted, settled & margined in INR",
    "created_at": "2023-12-18T13:10:39Z",
    "updated_at": "2024-11-15T02:47:50Z",
    "settlement_time": null,
    "notional_type": "vanilla",
    "impact_size": 10000,
    "initial_margin": "0.5",
    "maintenance_margin": "0.25",
    "contract_value": "0.001",
    "contract_unit_currency": "BTC",
    "tick_size": "0.5",
    "product_specs": {
      "funding_clamp_value": 0.05,
      "only_reduce_only_orders_allowed": false,
      "tags": [
        "layer_1"
      ]
    },
    "state": "live",
    "trading_status": "operational",
    "max_leverage_notional": "100000",
    "default_leverage": "200",
    "initial_margin_scaling_factor": "0.0000025",
    "maintenance_margin_scaling_factor": "0.00000125",
    "taker_commission_rate": "0.0005",
    "maker_commission_rate": "0.0002",
    "liquidation_penalty_factor": "0.5",
    "contract_type": "perpetual_futures",
    "position_size_limit": 229167,
    "basis_factor_max_limit": "10.95",
    "is_quanto": false,
    "funding_method": "mark_price",
    "annualized_funding": "10.95",
    "price_band": "2.5",
    "underlying_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "quoting_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "settling_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "spot_index": {
      "id": 14,
      "symbol": ".DEXBTUSD",
      "constituent_exchanges": [
        {
          "name": "ExchangeA",
          "weight": 0.25
        }
      ],
      "underlying_asset_id": 13,
      "quoting_asset_id": 14,
      "tick_size": "0.5",
      "index_type": "spot_pair"
    }
  }
}
```

<h3 id="get-product-by-symbol-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|[Product](#tocSproduct)|Inline|

<h3 id="get-product-by-symbol-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|notional_type|vanilla|
|notional_type|inverse|
|state|live|
|state|expired|
|state|upcoming|
|trading_status|operational|
|trading_status|disrupted_cancel_only|
|trading_status|disrupted_post_only|
|deposit_status|enabled|
|deposit_status|disabled|
|withdrawal_status|enabled|
|withdrawal_status|disabled|
|index_type|spot_pair|
|index_type|fixed_interest_rate|
|index_type|floating_interest_rate|

<aside class="success">
This operation does not require authentication.
</aside>

## Get tickers for products

<a id="opIdgetTickers"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/tickers', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/tickers \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/tickers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /tickers`

This endpoint retrieves the live tickers for available trading products, with an optional filter by specified contract types. The contract types should be provided as a comma-separated list (e.g., futures, perpetual_futures, call_options). If no contract type is specified, data for all available products will be returned.

<h3 id="get-tickers-for-products-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|contract_types|query|string|false|A comma-separated list of contract types to filter the tickers. Example values include perpetual_futures, call_options, put_options.|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "close": 67321,
      "contract_type": "futures",
      "greeks": {
        "delta": "0.25",
        "gamma": "0.10",
        "rho": "0.05",
        "theta": "-0.02",
        "vega": "0.15"
      },
      "high": 68500.5,
      "low": 66300.25,
      "mark_price": "67000.00",
      "mark_vol": "500",
      "oi": "15000",
      "oi_value": "1000000",
      "oi_value_symbol": "USD",
      "oi_value_usd": "1050000",
      "open": 67000,
      "price_band": {
        "lower_limit": "61120.45",
        "upper_limit": "72300.00"
      },
      "product_id": 123456,
      "quotes": {
        "ask_iv": "0.25",
        "ask_size": "100",
        "best_ask": "150.00",
        "best_bid": "148.00",
        "bid_iv": "0.22",
        "bid_size": "50"
      },
      "size": 100,
      "spot_price": "67000.00",
      "strike_price": "68000.00",
      "symbol": "BTCUSD",
      "timestamp": 1609459200,
      "turnover": 5000000,
      "turnover_symbol": "USD",
      "turnover_usd": 5200000,
      "volume": 25000
    }
  ]
}
```

<h3 id="get-tickers-for-products-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of live [tickers](#tocSticker) for all products, including implied volatility (IV) for option strikes.|Inline|

<h3 id="get-tickers-for-products-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

## Get ticker for a product by symbol

<a id="opIdgetTicker"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/tickers/{symbol}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/tickers/{symbol} \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/tickers/{symbol}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /tickers/{symbol}`

This endpoint retrieves the ticker data for a specific product, identified by its symbol. The ticker data includes live price data, open interest, implied volatility (IV) for options, and other related market data.

<h3 id="get-ticker-for-a-product-by-symbol-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|symbol|path|string|true|The symbol of the product for which the ticker data is requested (e.g., BTCUSD, ETHUSD).|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "close": 67321,
    "contract_type": "futures",
    "greeks": {
      "delta": "0.25",
      "gamma": "0.10",
      "rho": "0.05",
      "theta": "-0.02",
      "vega": "0.15"
    },
    "high": 68500.5,
    "low": 66300.25,
    "mark_price": "67000.00",
    "mark_vol": "500",
    "oi": "15000",
    "oi_value": "1000000",
    "oi_value_symbol": "USD",
    "oi_value_usd": "1050000",
    "open": 67000,
    "price_band": {
      "lower_limit": "61120.45",
      "upper_limit": "72300.00"
    },
    "product_id": 123456,
    "quotes": {
      "ask_iv": "0.25",
      "ask_size": "100",
      "best_ask": "150.00",
      "best_bid": "148.00",
      "bid_iv": "0.22",
      "bid_size": "50"
    },
    "size": 100,
    "spot_price": "67000.00",
    "strike_price": "68000.00",
    "symbol": "BTCUSD",
    "timestamp": 1609459200,
    "turnover": 5000000,
    "turnover_symbol": "USD",
    "turnover_usd": 5200000,
    "volume": 25000
  }
}
```

<h3 id="get-ticker-for-a-product-by-symbol-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|[Ticker](#tocSticker) data for the requested product, including implied volatility (IV) for option strikes, if applicable.|Inline|

<h3 id="get-ticker-for-a-product-by-symbol-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-orders">Orders</h1>

Placing Orders, Cancelling Orders, Placing batch orders, Cancelling batch orders, Get Open orders, Change Orders Leverage. Rate limits have been introduced recently that allows only set number of operations inside a matching engine in a timeframe. The current rate limits is 500 operations/sec for each product. For ex - placing 50 orders in a batch is equivalent to 50 operations as these orders will be processed by matching engine. Rate limits do not apply when cancelling orders.

## Place Order

<a id="opIdplaceOrder"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/orders', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/orders',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /orders`

> Body parameter

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "limit_price": "59000",
  "size": 10,
  "side": "buy",
  "order_type": "limit_order",
  "stop_order_type": "stop_loss_order",
  "stop_price": "56000",
  "trail_amount": "50",
  "stop_trigger_method": "last_traded_price",
  "bracket_stop_loss_limit_price": "57000",
  "bracket_stop_loss_price": "56000",
  "bracket_trail_amount": "50",
  "bracket_take_profit_limit_price": "62000",
  "bracket_take_profit_price": "61000",
  "time_in_force": "gtc",
  "mmp": "disabled",
  "post_only": false,
  "reduce_only": false,
  "client_order_id": "34521712",
  "cancel_orders_accepted": false
}
```

<h3 id="place-order-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateOrderRequest](#schemacreateorderrequest)|true|Order which needs to be created. Rate limits apply.|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
}
```

<h3 id="place-order-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the order object with assigned id and latest state|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns [error](#place-order-error-description) if order could not be placed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="place-order-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Cancel Order

<a id="opIdcancelOrder"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.delete('https://api.india.delta.exchange/v2/orders', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X DELETE https://api.india.delta.exchange/v2/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.delete 'https://api.india.delta.exchange/v2/orders',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`DELETE /orders`

> Body parameter

```json
{
  "id": 13452112,
  "client_order_id": "34521712",
  "product_id": 27
}
```

<h3 id="cancel-order-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DeleteOrderRequest](#schemadeleteorderrequest)|true|Order which needs to be cancelled|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
}
```

<h3 id="cancel-order-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the order object|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if order could not be cancelled|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="cancel-order-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Edit Order

<a id="opIdeditOrder"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/orders', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/orders \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/orders',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /orders`

> Body parameter

```json
{
  "id": 34521712,
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "limit_price": "59000",
  "size": 15,
  "mmp": "disabled",
  "post_only": false,
  "cancel_orders_accepted": false,
  "stop_price": "56000",
  "trail_amount": "50"
}
```

<h3 id="edit-order-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EditOrderRequest](#schemaeditorderrequest)|true|Order which needs to be edited. Rate limits apply.|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
}
```

<h3 id="edit-order-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the order object with assigned id and latest state|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns [error](#place-order-error-description) if order could not be placed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="edit-order-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get Active Orders

<a id="opIdgetOrders"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/orders', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/orders \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/orders',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /orders`

<h3 id="get-active-orders-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_ids|query|string|false|comma separated product ids, if not specified, all the orders will be returned|
|states|query|string|false|comma separated list of states - open,pending|
|contract_types|query|string|false|comma separated list of desired contract types, if not specified any parameters then, all the orders will be returned|
|order_types|query|string|false|comma separated order types|
|start_time|query|integer|false|from time in micro-seconds in epoc; referring to the order creation time|
|end_time|query|integer|false|from time in micro-seconds in epoc; referring to the order creation time|
|after|query|string|false|after cursor for pagination; becomes null if page after the current one does not exist|
|before|query|string|false|before cursor for pagination; becomes null if page before the current one does not exist|
|page_size|query|integer|false|number of records per page|

#### Enumerated Values

|Parameter|Value|
|---|---|
|contract_types|futures|
|contract_types|perpetual_futures|
|contract_types|call_options|
|contract_types|put_options|
|order_types|market|
|order_types|limit|
|order_types|stop_market|
|order_types|stop_limit|
|order_types|all_stop|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 123,
      "user_id": 453671,
      "size": 10,
      "unfilled_size": 2,
      "side": "buy",
      "order_type": "limit_order",
      "limit_price": "59000",
      "stop_order_type": "stop_loss_order",
      "stop_price": "55000",
      "paid_commission": "0.5432",
      "commission": "0.5432",
      "reduce_only": false,
      "client_order_id": "34521712",
      "state": "open",
      "created_at": "1725865012000000",
      "product_id": 27,
      "product_symbol": "BTCUSD"
    }
  ],
  "meta": {
    "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
    "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
  }
}
```

<h3 id="get-active-orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of orders as per the query|Inline|

<h3 id="get-active-orders-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Place Bracket order

<a id="opIdbracketOrder"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/orders/bracket', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/orders/bracket \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/orders/bracket',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /orders/bracket`

A bracket order is a set of TP and SL order. For a bracket order , size need not be specified as it closes the entire position. For a given contract, you can have multiple bracket orders for open orders but only a single bracket order for any open position.

> Body parameter

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "stop_loss_order": {
    "order_type": "limit_order",
    "stop_price": "56000",
    "trail_amount": "50",
    "limit_price": "55000"
  },
  "take_profit_order": {
    "order_type": "limit_order",
    "stop_price": "65000",
    "limit_price": "64000"
  },
  "bracket_stop_trigger_method": "last_traded_price"
}
```

<h3 id="place-bracket-order-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateBracketOrderRequest](#schemacreatebracketorderrequest)|true|Bracket Order which needs to be updated |

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="place-bracket-order-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns back success response|[ApiSuccessResponse](#schemaapisuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if orders could not be updated|[ApiErrorResponse](#schemaapierrorresponse)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Edit Bracket order

<a id="opIdbracketOrder"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/orders/bracket', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/orders/bracket \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/orders/bracket',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /orders/bracket`

A bracket order is a set of TP and SL order. You can specify bracket order with an order that will create a new position. Use this api to change the bracket params attached with an order.

> Body parameter

```json
{
  "id": 34521712,
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "bracket_stop_loss_limit_price": "55000",
  "bracket_stop_loss_price": "56000",
  "bracket_take_profit_limit_price": "65000",
  "bracket_take_profit_price": "64000",
  "bracket_trail_amount": "50",
  "bracket_stop_trigger_method": "last_traded_price"
}
```

<h3 id="edit-bracket-order-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EditBracketOrderRequest](#schemaeditbracketorderrequest)|true|Bracket Order which needs to be updated |

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="edit-bracket-order-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns back success response|[ApiSuccessResponse](#schemaapisuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if orders could not be updated|[ApiErrorResponse](#schemaapierrorresponse)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Cancel all open orders

<a id="opIdcancelAllOrders"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.delete('https://api.india.delta.exchange/v2/orders/all', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X DELETE https://api.india.delta.exchange/v2/orders/all \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.delete 'https://api.india.delta.exchange/v2/orders/all',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`DELETE /orders/all`

Cancels all orders for a given product id. If product id is not provided, it cancels orders for provided contract types. If none of them are provided, it cancels all the orders. Provide either product id or list of contract types at a time. If both are provided, contract types will be ignored.

> Body parameter

```json
{
  "product_id": 27,
  "contract_types": "perpetual_futures,put_options,call_options",
  "cancel_limit_orders": false,
  "cancel_stop_orders": false,
  "cancel_reduce_only_orders": false
}
```

<h3 id="cancel-all-open-orders-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CancelAllFilterObject](#schemacancelallfilterobject)|false|Filters for selecting orders that needs to be cancelled|

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="cancel-all-open-orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns back success response|[ApiSuccessResponse](#schemaapisuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if orders could not be cancelled|[ApiErrorResponse](#schemaapierrorresponse)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Create batch orders

<a id="opIdbatchCreate"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/orders/batch', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/orders/batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/orders/batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /orders/batch`

Orders in a batch should belong to the same contract. Max allowed size limit in a batch is 50. Rate limits apply. Please note that ioc is not valid time in force values for creating batch orders.

> Body parameter

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "limit_price": "59000",
      "size": 10,
      "side": "buy",
      "order_type": "limit_order",
      "time_in_force": "gtc",
      "mmp": "disabled",
      "post_only": false,
      "client_order_id": "34521712"
    }
  ]
}
```

<h3 id="create-batch-orders-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BatchCreateOrdersRequest](#schemabatchcreateordersrequest)|true|Does not support time_in_force flag for orders, All orders in batch create are assumed to be gtc orders. batch create does not support stop orders, it support only limit orders|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 123,
      "user_id": 453671,
      "size": 10,
      "unfilled_size": 2,
      "side": "buy",
      "order_type": "limit_order",
      "limit_price": "59000",
      "stop_order_type": "stop_loss_order",
      "stop_price": "55000",
      "paid_commission": "0.5432",
      "commission": "0.5432",
      "reduce_only": false,
      "client_order_id": "34521712",
      "state": "open",
      "created_at": "1725865012000000",
      "product_id": 27,
      "product_symbol": "BTCUSD"
    }
  ]
}
```

<h3 id="create-batch-orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the orders placed|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|returns error if orders couldnt be placed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="create-batch-orders-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Edit batch orders

<a id="opIdbatchEdit"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/orders/batch', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/orders/batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/orders/batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /orders/batch`

Orders to be edited in a batch. Rate limits apply.

> Body parameter

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "id": 34521712,
      "limit_price": "59000",
      "size": 15,
      "mmp": "disabled",
      "post_only": false
    }
  ]
}
```

<h3 id="edit-batch-orders-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BatchEditOrdersRequest](#schemabatcheditordersrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 123,
      "user_id": 453671,
      "size": 10,
      "unfilled_size": 2,
      "side": "buy",
      "order_type": "limit_order",
      "limit_price": "59000",
      "stop_order_type": "stop_loss_order",
      "stop_price": "55000",
      "paid_commission": "0.5432",
      "commission": "0.5432",
      "reduce_only": false,
      "client_order_id": "34521712",
      "state": "open",
      "created_at": "1725865012000000",
      "product_id": 27,
      "product_symbol": "BTCUSD"
    }
  ]
}
```

<h3 id="edit-batch-orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of edited orders|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|returns error if orders couldnt be edited|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="edit-batch-orders-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Delete batch orders

<a id="opIdbatchDelete"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.delete('https://api.india.delta.exchange/v2/orders/batch', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X DELETE https://api.india.delta.exchange/v2/orders/batch \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.delete 'https://api.india.delta.exchange/v2/orders/batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`DELETE /orders/batch`

> Body parameter

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "id": 13452112,
      "client_order_id": "34521712"
    }
  ]
}
```

<h3 id="delete-batch-orders-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BatchDeleteOrdersRequest](#schemabatchdeleteordersrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 123,
      "user_id": 453671,
      "size": 10,
      "unfilled_size": 2,
      "side": "buy",
      "order_type": "limit_order",
      "limit_price": "59000",
      "stop_order_type": "stop_loss_order",
      "stop_price": "55000",
      "paid_commission": "0.5432",
      "commission": "0.5432",
      "reduce_only": false,
      "client_order_id": "34521712",
      "state": "open",
      "created_at": "1725865012000000",
      "product_id": 27,
      "product_symbol": "BTCUSD"
    }
  ]
}
```

<h3 id="delete-batch-orders-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the orders deleted|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|returns error if orders couldnt be deleted|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="delete-batch-orders-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get Order by id

<a id="opIdgetOrderById"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/orders/{order_id}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/orders/{order_id} \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/orders/{order_id}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /orders/{order_id}`

<h3 id="get-order-by-id-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|order_id|path|string|true|Id of the order|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
}
```

<h3 id="get-order-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the order object with assigned id and latest state|Inline|

<h3 id="get-order-by-id-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get Order by client oid

<a id="opIdgetOrderByCOI"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/orders/client_order_id/{client_oid}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/orders/client_order_id/{client_oid} \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/orders/client_order_id/{client_oid}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /orders/client_order_id/{client_oid}`

<h3 id="get-order-by-client-oid-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|client_oid|path|string|true|Client provided order id|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
}
```

<h3 id="get-order-by-client-oid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the order object with assigned client order id and latest state|Inline|

<h3 id="get-order-by-client-oid-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Change order leverage

<a id="opIdchangeOrderLeverage"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /products/{product_id}/orders/leverage`

> Body parameter

```json
{
  "leverage": 10
}
```

<h3 id="change-order-leverage-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_id|path|integer|true|Product id of the ordered product|
|body|body|object|true|none|
|» leverage|body|string|true|Order leverage|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "leverage": 10,
    "order_margin": "563.2",
    "product_id": 27
  }
}
```

<h3 id="change-order-leverage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the OrderLeverage object|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if leverage couldnt be changed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="change-order-leverage-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get order leverage

<a id="opIdgetOrderLeverage"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/products/{product_id}/orders/leverage',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /products/{product_id}/orders/leverage`

<h3 id="get-order-leverage-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_id|path|integer|true|Product id of the ordered product|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "leverage": 10,
    "order_margin": "563.2",
    "product_id": 27
  }
}
```

<h3 id="get-order-leverage-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the OrderLeverage object|Inline|

<h3 id="get-order-leverage-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-positions">Positions</h1>

Get Open positions, Change Position Margin, Close Position, Close All Position

## Get margined positions

<a id="opIdgetMarginedPositions"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/positions/margined', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/positions/margined \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/positions/margined',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /positions/margined`

Change in position may take upto 10secs to reflect. Use 'GET /position' for real-time data.

<h3 id="get-margined-positions-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_ids|query|string|false|comma separated product ids. If not specified any parameters, all the open positions will be returned|
|contract_types|query|string|false|comma separated list of desired contract types. If not specified any parameters then, all the open positions will be returned|

#### Enumerated Values

|Parameter|Value|
|---|---|
|contract_types|perpetual_futures|
|contract_types|call_options|
|contract_types|put_options|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "user_id": 0,
      "size": 0,
      "entry_price": "string",
      "margin": "string",
      "liquidation_price": "string",
      "bankruptcy_price": "string",
      "adl_level": 0,
      "product_id": 0,
      "product_symbol": "string",
      "commission": "string",
      "realized_pnl": "string",
      "realized_funding": "string"
    }
  ]
}
```

<h3 id="get-margined-positions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of all [open positions](#tocSposition)|Inline|

<h3 id="get-margined-positions-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get position

<a id="opIdgetPositions"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/positions', params={
  'product_id': '27'
}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/positions?product_id=27 \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/positions',
  params: {
  'product_id' => '27'
}, headers: headers

p JSON.parse(result)

```

`GET /positions`

Get real-time positions data.

<h3 id="get-position-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_id|query|integer|true|id of the product. Only send either product_id or underlying_asset_symbol.|
|underlying_asset_symbol|query|string|false|Underlying asset symbol. e.g. 'BTC', 'ETH'. This gives a list of all positions in products which have the given underlying asset. Only send either product_id or underlying_asset_symbol.|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "size": 12,
    "entry_price": "string"
  }
}
```

<h3 id="get-position-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Open position for the give product id|Inline|

<h3 id="get-position-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Auto Topup

<a id="opIdchangeAutoTopup"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/positions/auto_topup', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/positions/auto_topup \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/positions/auto_topup',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /positions/auto_topup`

Changes position auto topup flag. Positions automatically inherits auto topup flag of the account. If account level auto topop is set to false, use this api to change auto topup flag for individual positions.

> Body parameter

```json
{
  "product_id": 0,
  "auto_topup": "false"
}
```

<h3 id="auto-topup-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» product_id|body|integer|true|none|
|» auto_topup|body|boolean|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "user_id": 0,
    "size": 0,
    "entry_price": "string",
    "margin": "string",
    "liquidation_price": "string",
    "bankruptcy_price": "string",
    "adl_level": 0,
    "product_id": 0,
    "product_symbol": "string",
    "commission": "string",
    "realized_pnl": "string",
    "realized_funding": "string"
  }
}
```

<h3 id="auto-topup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the position object|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if position margin could not be changed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="auto-topup-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Add/Remove position margin

<a id="opIdchangePositionMargin"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/positions/change_margin', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/positions/change_margin \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/positions/change_margin',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /positions/change_margin`

> Body parameter

```json
{
  "product_id": 0,
  "delta_margin": "string"
}
```

<h3 id="add/remove-position-margin-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» product_id|body|integer|true|none|
|» delta_margin|body|string|true|Delta in the position margin, positive in case of adding margin & negative in case of removing margin|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "user_id": 0,
    "size": 0,
    "entry_price": "string",
    "margin": "string",
    "liquidation_price": "string",
    "bankruptcy_price": "string",
    "adl_level": 0,
    "product_id": 0,
    "product_symbol": "string",
    "commission": "string",
    "realized_pnl": "string",
    "realized_funding": "string"
  }
}
```

<h3 id="add/remove-position-margin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns the position object|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if position margin could not be changed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="add/remove-position-margin-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Close all positions 

<a id="opIdcloseAllPosition"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/positions/close_all', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/positions/close_all \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/positions/close_all',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /positions/close_all`

> Body parameter

```json
{
  "close_all_portfolio": true,
  "close_all_isolated": true,
  "user_id": 0
}
```

<h3 id="close-all-positions--parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» close_all_portfolio|body|boolean|true|none|
|» close_all_isolated|body|boolean|true|none|
|» user_id|body|integer|true|none|

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="close-all-positions--responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|returns back success response|[ApiSuccessResponse](#schemaapisuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if not able to close all positions|[ApiErrorResponse](#schemaapierrorresponse)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-tradehistory">TradeHistory</h1>

Get Orders History, Get Fill History

## Get order history (cancelled and closed)

<a id="opIdgetOrderHistory"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/orders/history', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/orders/history \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/orders/history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /orders/history`

<h3 id="get-order-history-(cancelled-and-closed)-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_ids|query|string|false|comma separated product ids|
|contract_types|query|string|false|comma separated list of desired contract types|
|order_types|query|string|false|comma separated order types|
|start_time|query|integer|false|from time in micro-seconds in epoc|
|end_time|query|integer|false|from time in micro-seconds in epoc|
|after|query|string|false|after cursor for pagination|
|before|query|string|false|before cursor for pagination|
|page_size|query|integer|false|number of records per page|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_types|market|
|order_types|limit|
|order_types|stop_market|
|order_types|stop_limit|
|order_types|all_stop|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 123,
      "user_id": 453671,
      "size": 10,
      "unfilled_size": 2,
      "side": "buy",
      "order_type": "limit_order",
      "limit_price": "59000",
      "stop_order_type": "stop_loss_order",
      "stop_price": "55000",
      "paid_commission": "0.5432",
      "commission": "0.5432",
      "reduce_only": false,
      "client_order_id": "34521712",
      "state": "open",
      "created_at": "1725865012000000",
      "product_id": 27,
      "product_symbol": "BTCUSD"
    }
  ],
  "meta": {
    "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
    "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
  }
}
```

<h3 id="get-order-history-(cancelled-and-closed)-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of closed and cancelled orders. [Order schema](#tocSorder)|Inline|

<h3 id="get-order-history-(cancelled-and-closed)-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## GET user fills by filters

<a id="opIdgetUserfills"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/fills', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/fills \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/fills',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /fills`

<h3 id="get-user-fills-by-filters-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_ids|query|string|false|comma separated product ids|
|contract_types|query|string|false|comma separated list of desired contract types|
|start_time|query|integer|false|from time in micro-seconds in epoc|
|end_time|query|integer|false|from time in micro-seconds in epoc|
|after|query|string|false|after cursor for pagination|
|before|query|string|false|before cursor for pagination|
|page_size|query|integer|false|number of records per page|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 0,
      "size": 0,
      "fill_type": "normal",
      "side": "buy",
      "price": "string",
      "role": "taker",
      "commission": "string",
      "created_at": "string",
      "product_id": 0,
      "product_symbol": "string",
      "order_id": "string",
      "settling_asset_id": 0,
      "settling_asset_symbol": "string",
      "meta_data": {
        "commission_deto": "string",
        "commission_deto_in_settling_asset": "string",
        "effective_commission_rate": "string",
        "liquidation_fee_deto": "string",
        "liquidation_fee_deto_in_settling_asset": "string",
        "order_price": "string",
        "order_size": "string",
        "order_type": "string",
        "order_unfilled_size": "string",
        "tfc_used_for_commission": "string",
        "tfc_used_for_liquidation_fee": "string",
        "total_commission_in_settling_asset": "string",
        "total_liquidation_fee_in_settling_asset": "string"
      }
    }
  ],
  "meta": {
    "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
    "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
  }
}
```

<h3 id="get-user-fills-by-filters-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Array of [fills](#tocSfill)|Inline|

<h3 id="get-user-fills-by-filters-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|fill_type|normal|
|fill_type|adl|
|fill_type|liquidation|
|fill_type|settlement|
|fill_type|otc|
|side|buy|
|side|sell|
|role|taker|
|role|maker|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Download Fills history

<a id="opIddownloadFillsHistory"></a>

> Code samples

```python
import requests
headers = {
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/fills/history/download/csv', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/fills/history/download/csv \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/fills/history/download/csv',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /fills/history/download/csv`

<h3 id="download-fills-history-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|product_ids|query|string|false|comma separated product ids|
|contract_types|query|string|false|comma separated list of desired contract types|
|start_time|query|integer|false|from time in micro-seconds in epoc|
|end_time|query|integer|false|from time in micro-seconds in epoc|

<h3 id="download-fills-history-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|csv of fills for the filter query|None|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-orderbook">Orderbook</h1>

L2Orderbook

## Get L2 orderbook

<a id="opIdgetL2Orderbook"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/l2orderbook/{symbol}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/l2orderbook/{symbol} \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/l2orderbook/{symbol}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /l2orderbook/{symbol}`

<h3 id="get-l2-orderbook-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|symbol|path|string|true|none|
|depth|query|integer|false|number of levels on each side|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "buy": [
      {
        "depth": "983",
        "price": "9187.5",
        "size": 205640
      }
    ],
    "last_updated_at": 1654589595784000,
    "sell": [
      {
        "depth": "1185",
        "price": "9188.0",
        "size": 113752
      }
    ],
    "symbol": "BTCUSD"
  }
}
```

<h3 id="get-l2-orderbook-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|L2 orderbook for the product|Inline|

<h3 id="get-l2-orderbook-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-trades">Trades</h1>

Get Trades of a contract

## Get public trades

<a id="opIdgetTrades"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/trades/{symbol}', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/trades/{symbol} \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/trades/{symbol}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /trades/{symbol}`

<h3 id="get-public-trades-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|symbol|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "trades": [
      {
        "side": "buy",
        "size": 0,
        "price": "string",
        "timestamp": 0
      }
    ]
  }
}
```

<h3 id="get-public-trades-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of recent trades of the product|Inline|

<h3 id="get-public-trades-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-wallet">Wallet</h1>

Get balances, Get transaction history

## Get Wallet Balances

<a id="opIdgetBalances"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/wallet/balances', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/wallet/balances \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/wallet/balances',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /wallet/balances`

> Example responses

> 200 Response

```json
{
  "meta": {
    "net_equity": "string",
    "robo_trading_equity": "string"
  },
  "result": [
    {
      "asset_id": 0,
      "asset_symbol": "string",
      "available_balance": "string",
      "available_balance_for_robo": "string",
      "balance": "string",
      "blocked_margin": "string",
      "commission": "string",
      "cross_asset_liability": "string",
      "cross_commission": "string",
      "cross_locked_collateral": "string",
      "cross_order_margin": "string",
      "cross_position_margin": "string",
      "id": 0,
      "interest_credit": "string",
      "order_margin": "string",
      "pending_referral_bonus": "string",
      "pending_trading_fee_credit": "string",
      "portfolio_margin": "string",
      "position_margin": "string",
      "trading_fee_credit": "string",
      "unvested_amount": "string",
      "user_id": 0
    }
  ],
  "success": true
}
```

<h3 id="get-wallet-balances-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of wallets attached to the user account|[WalletPayload](#schemawalletpayload)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get Wallet transactions

<a id="opIdgetTransactions"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/wallet/transactions', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/wallet/transactions \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/wallet/transactions',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /wallet/transactions`

<h3 id="get-wallet-transactions-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|asset_ids|query|integer|false|comma separated list of asset_ids for which to get txns logs|
|start_time|query|integer|false|from time in micro-seconds in epoc|
|end_time|query|integer|false|from time in micro-seconds in epoc|
|after|query|string|false|after cursor for pagination|
|before|query|string|false|before cursor for pagination|
|page_size|query|integer|false|number of records per page|
|transaction_types|query|[TransactionTypes](#schematransactiontypes)|false|transaction types to retrieve|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": 0,
      "amount": "string",
      "balance": "string",
      "transaction_type": "string",
      "meta_data": {},
      "product_id": 0,
      "asset_id": 0,
      "asset_symbol": 0,
      "created_at": "string"
    }
  ],
  "meta": {
    "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
    "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
  }
}
```

<h3 id="get-wallet-transactions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|list of [Wallet transactions](#tocStransaction)|Inline|

<h3 id="get-wallet-transactions-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|transaction_type|cashflow|
|transaction_type|deposit|
|transaction_type|withdrawal|
|transaction_type|commission|
|transaction_type|conversion|
|transaction_type|funding|
|transaction_type|settlement|
|transaction_type|liquidation_fee|
|transaction_type|spot_trade|
|transaction_type|withdrawal_cancellation|
|transaction_type|referral_bonus|
|transaction_type|sub_account_transfer|
|transaction_type|commission_rebate|
|transaction_type|promo_credit|
|transaction_type|trading_credits|
|transaction_type|trading_credits_forfeited|
|transaction_type|trading_credits_paid|
|transaction_type|trading_fee_credits_paid_liquidation_fee|
|transaction_type|trading_credits_reverted|
|transaction_type|interest_credit|
|transaction_type|external_deposit|
|transaction_type|credit_line|
|transaction_type|trading_competition|
|transaction_type|fund_deposit|
|transaction_type|fund_withdrawal|
|transaction_type|fund_wallet_deposit|
|transaction_type|fund_wallet_withdrawal|
|transaction_type|fund_reward|
|transaction_type|trade_farming_reward|
|transaction_type|interest_credit|
|transaction_type|revert|
|transaction_type|raf_bonus|
|transaction_type|fill_appropriation|
|transaction_type|incident_compensation|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Download Wallet transactions

<a id="opIddownloadTransactions"></a>

> Code samples

```python
import requests
headers = {
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/wallet/transactions/download', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/wallet/transactions/download \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/wallet/transactions/download',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /wallet/transactions/download`

<h3 id="download-wallet-transactions-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|asset_ids|query|integer|false|comma separated list of asset_ids|
|start_time|query|integer|false|from time in micro-seconds in epoc|
|end_time|query|integer|false|from time in micro-seconds in epoc|
|after|query|string|false|after cursor for pagination|
|before|query|string|false|before cursor for pagination|
|page_size|query|integer|false|number of records per page|

<h3 id="download-wallet-transactions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|csv of transactions for that wallet|None|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Request asset transfer

<a id="opIdassetTransfer"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/wallets/sub_account_balance_transfer', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/wallets/sub_account_balance_transfer \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/wallets/sub_account_balance_transfer',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /wallets/sub_account_balance_transfer`

This api transfers asset from one subaccount to another subaccount or to the main/parent account. Please ensure that the subaccounts involved in the transfer should belong to the same parent account. Requests to transfer assets across subaccounts that belong to different parent accounts will fail. Please make sure that the api key used to make this api request belongs to the main/parent account.

> Body parameter

```json
{
  "transferrer_user_id": "string",
  "transferee_user_id": "string",
  "asset_symbol": "string",
  "amount": null
}
```

<h3 id="request-asset-transfer-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[AssetTransferSubaccountReq](#schemaassettransfersubaccountreq)|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": null
}
```

<h3 id="request-asset-transfer-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns success message|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error code|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="request-asset-transfer-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Request subaccount balance transfer history.

<a id="opIdSubaccountTransferHistory"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/wallets/sub_accounts_transfer_history', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/wallets/sub_accounts_transfer_history \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/wallets/sub_accounts_transfer_history',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /wallets/sub_accounts_transfer_history`

This api returns the wallet balance transfers for subaccounts belonging to the parent/main account of an api user. Make sure you are calling this api from the main account. If no subaccount is mentioned in the request, data for all the subacounts will be returned. Use page size to get more entries in a single request.

> Body parameter

```json
{
  "subaccount_user_id": "string",
  "before": "string",
  "after": "string",
  "page_size": 10
}
```

<h3 id="request-subaccount-balance-transfer-history.-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SubaccountTransferHistory](#schemasubaccounttransferhistory)|true|none|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "transferrer_user_id": "string",
      "transferee_user_id": "string",
      "asset_symbol": "string",
      "amount": null,
      "created_at": "string",
      "transferee_user": {},
      "transferrer_user": {}
    }
  ],
  "meta": {
    "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
    "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
  }
}
```

<h3 id="request-subaccount-balance-transfer-history.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns success message|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error code|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="request-subaccount-balance-transfer-history.-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-stats">Stats</h1>

Get Volume Stats

## Get volume stats

<a id="opIdgetStat"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/stats', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/stats \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/stats',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /stats`

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "last_30_days_volume": 0,
    "last_7_days_volume": 0,
    "total_volume": 0
  }
}
```

<h3 id="get-volume-stats-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|sum of turnover in the last 7 and 30 days along with  Total Volume in the last 24 hours (in USD)|Inline|

<h3 id="get-volume-stats-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-mmp">MMP</h1>

Market maker protection

## Update MMP config

<a id="opIdupdateMMP"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/users/update_mmp', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/users/update_mmp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/users/update_mmp',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /users/update_mmp`

Channel provides updates when MMP is triggered. Market maker protection is available to registered market makers by default. Others can reach out to support for getting access to MMP. More info [here](https://guides.delta.exchange/delta-exchange-user-guide/market-makers-guide/market-maker-protection).

> Body parameter

```json
{
  "asset": "string",
  "window_interval": 0,
  "freeze_interval": 0,
  "trade_limit": "string",
  "delta_limit": "string",
  "vega_limit": "string",
  "mmp": "mmp1"
}
```

<h3 id="update-mmp-config-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[MMPConfigUpdateRequest](#schemammpconfigupdaterequest)|true|mmp config for a given underlying asset|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "user_id": 57354187,
    "default_auto_topup": true,
    "mmp_config": null,
    "deto_for_commission": false,
    "vip_level": 0,
    "vip_discount_factor": "0.00",
    "volume_30d": "1060.675333",
    "email_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": true,
      "order_fill": true,
      "stop_order_trigger": true
    },
    "notification_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": false,
      "order_fill": true,
      "price_alert": true,
      "stop_order_trigger": true
    },
    "price_alert_assets": [
      "BTC",
      "ETH"
    ],
    "enabled_portfolios": {},
    "interest_credit": false
  }
}
```

<h3 id="update-mmp-config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the User Preference which contains mmp config|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if mmp is not enabled on the account|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="update-mmp-config-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Reset MMP

<a id="opIdresetMMP"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/users/reset_mmp', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/users/reset_mmp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/users/reset_mmp',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /users/reset_mmp`

> Body parameter

```json
{
  "asset": "string",
  "mmp": "mmp1"
}
```

<h3 id="reset-mmp-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[MMPResetRequest](#schemammpresetrequest)|true|reset mmp config for a given underlying asset|

> Example responses

> 200 Response

```json
{
  "success": true
}
```

<h3 id="reset-mmp-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the User Preference which contains mmp config|[ApiSuccessResponse](#schemaapisuccessresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if mmp is not enabled on the account|[ApiErrorResponse](#schemaapierrorresponse)|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-dead-man-s-switch-auto-cancel-">Dead Man's Switch (Auto Cancel)</h1>

Set up timers for auto orders cancel in case of network malfunctions 

## Cancel After

<a id="opIdcancelAfter"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.post('https://api.india.delta.exchange/v2/orders/cancel_after', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X POST https://api.india.delta.exchange/v2/orders/cancel_after \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.post 'https://api.india.delta.exchange/v2/orders/cancel_after',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`POST /orders/cancel_after`

> Body parameter

```json
{
  "cancel_after": "5000"
}
```

<h3 id="cancel-after-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CancelAfterRequest](#schemacancelafterrequest)|true|cancel after details|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "cancel_after_enabled": "true",
    "cancel_after_timestamp": "1669119262000"
  }
}
```

<h3 id="cancel-after-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns back the cancel_after configs set|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns if configs couldnt be set|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="cancel-after-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|cancel_after_enabled|false|
|cancel_after_enabled|true|

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-account">Account</h1>

Account level settings

## Get users trading preferences

<a id="opIdgetTradingPreferences"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/users/trading_preferences', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/users/trading_preferences \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/users/trading_preferences',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /users/trading_preferences`

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "user_id": 57354187,
    "default_auto_topup": true,
    "mmp_config": null,
    "deto_for_commission": false,
    "vip_level": 0,
    "vip_discount_factor": "0.00",
    "volume_30d": "1060.675333",
    "email_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": true,
      "order_fill": true,
      "stop_order_trigger": true
    },
    "notification_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": false,
      "order_fill": true,
      "price_alert": true,
      "stop_order_trigger": true
    },
    "price_alert_assets": [
      "BTC",
      "ETH"
    ],
    "enabled_portfolios": {},
    "interest_credit": false
  }
}
```

<h3 id="get-users-trading-preferences-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User trading preferences attached to the account|Inline|

<h3 id="get-users-trading-preferences-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Update users trading preferences

<a id="opIdupdateTradingPreferences"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/users/trading_preferences', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/users/trading_preferences \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/users/trading_preferences',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /users/trading_preferences`

> Body parameter

```json
{
  "default_auto_topup": true,
  "showMarketOrdersForOptionsInBracket": true,
  "interest_credit": false,
  "email_preferences": {
    "adl": true,
    "liquidation": true,
    "order_fill": true,
    "stop_order_trigger": true,
    "order_cancel": true,
    "marketing": true
  },
  "notification_preferences": {
    "adl": false,
    "liquidation": true,
    "order_fill": true,
    "stop_order_trigger": true,
    "price_alert": true,
    "marketing": true
  }
}
```

<h3 id="update-users-trading-preferences-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EditUserPreference](#schemaedituserpreference)|true|trading preferences|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "user_id": 57354187,
    "default_auto_topup": true,
    "mmp_config": null,
    "deto_for_commission": false,
    "vip_level": 0,
    "vip_discount_factor": "0.00",
    "volume_30d": "1060.675333",
    "email_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": true,
      "order_fill": true,
      "stop_order_trigger": true
    },
    "notification_preferences": {
      "adl": true,
      "liquidation": true,
      "margin_topup": false,
      "marketing": true,
      "order_cancel": false,
      "order_fill": true,
      "price_alert": true,
      "stop_order_trigger": true
    },
    "price_alert_assets": [
      "BTC",
      "ETH"
    ],
    "enabled_portfolios": {},
    "interest_credit": false
  }
}
```

<h3 id="update-users-trading-preferences-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User trading preferences attached to the account|Inline|

<h3 id="update-users-trading-preferences-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get subaccounts

<a id="opIdgetSubaccounts"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/sub_accounts', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/sub_accounts \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/sub_accounts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /sub_accounts`

This api returns all the subaccounts belonging to the same parent/main user. Make sure to call this api from the parent user.

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "id": "98765432",
      "email": "rajtrader2342@gmail.com",
      "account_name": "Main",
      "first_name": "Rajesh",
      "last_name": "Sharma",
      "dob": "1985-08-25",
      "country": "India",
      "phone_number": "9876543210",
      "margin_mode": "isolated",
      "pf_index_symbol": ".DEXBTUSD",
      "is_sub_account": false,
      "is_kyc_done": true
    }
  ]
}
```

<h3 id="get-subaccounts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Subaccounts belonging to the same parent account.|Inline|

<h3 id="get-subaccounts-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Get user

<a id="opIdgetUser"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.get('https://api.india.delta.exchange/v2/profile', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/profile \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/profile',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /profile`

This api returns the user object.

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": "98765432",
    "email": "rajtrader2342@gmail.com",
    "account_name": "Main",
    "first_name": "Rajesh",
    "last_name": "Sharma",
    "dob": "1985-08-25",
    "country": "India",
    "phone_number": "9876543210",
    "margin_mode": "isolated",
    "pf_index_symbol": ".DEXBTUSD",
    "is_sub_account": false,
    "is_kyc_done": true
  }
}
```

<h3 id="get-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User Object|Inline|

<h3 id="get-user-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

## Change margin mode

<a id="opIdchangeMarginMode"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'api-key': '****',
  'signature': '****',
  'timestamp': '****'
}

r = requests.put('https://api.india.delta.exchange/v2/users/margin_mode', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X PUT https://api.india.delta.exchange/v2/users/margin_mode \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'api-key: ****' \
  -H 'signature: ****' \
  -H 'timestamp: ****'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'api-key' => '****',
  'signature' => '****',
  'timestamp' => '****'
}

result = RestClient.put 'https://api.india.delta.exchange/v2/users/margin_mode',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`PUT /users/margin_mode`

> Body parameter

```json
{
  "margin_mode": "isolated",
  "subaccount_user_id": "5112346"
}
```

<h3 id="change-margin-mode-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ChangeMarginModeRequest](#schemachangemarginmoderequest)|true|changes margin mode of the user|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": "98765432",
    "email": "rajtrader2342@gmail.com",
    "account_name": "Main",
    "first_name": "Rajesh",
    "last_name": "Sharma",
    "dob": "1985-08-25",
    "country": "India",
    "phone_number": "9876543210",
    "margin_mode": "isolated",
    "pf_index_symbol": ".DEXBTUSD",
    "is_sub_account": false,
    "is_kyc_done": true
  }
}
```

<h3 id="change-margin-mode-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns the [profile](#tocSuser) with the updated margin mode|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Returns error if margin mode could not be changed|[ApiErrorResponse](#schemaapierrorresponse)|

<h3 id="change-margin-mode-responseschema">Response Schema</h3>

<aside class="warning">
To perform this operation, you must be sign the request using your api key and secret. See Authentication section for more details.
</aside>

<h1 id="delta-exchange-api-v2-settlement-prices">Settlement Prices</h1>

## Get product settlement prices

<a id="opIdgetProduct"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/products/?states=expired', params={

}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/products/?states=expired \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/products/?states=expired',
  params: {
  }, headers: headers

p JSON.parse(result)

```

`GET /products/?states=expired`

<h3 id="get-product-settlement-prices-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|states|query|string|false|Comma separated list of states e.g. to get expired contracts https://api.india.delta.exchange/v2/products?contract_types=call_options&states=expired |
|page_size|query|string|false|size of a single page for paginated request, default: 100|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "id": 27,
    "symbol": "BTCUSD",
    "description": "Bitcoin Perpetual futures, quoted, settled & margined in INR",
    "created_at": "2023-12-18T13:10:39Z",
    "updated_at": "2024-11-15T02:47:50Z",
    "settlement_time": null,
    "notional_type": "vanilla",
    "impact_size": 10000,
    "initial_margin": "0.5",
    "maintenance_margin": "0.25",
    "contract_value": "0.001",
    "contract_unit_currency": "BTC",
    "tick_size": "0.5",
    "product_specs": {
      "funding_clamp_value": 0.05,
      "only_reduce_only_orders_allowed": false,
      "tags": [
        "layer_1"
      ]
    },
    "state": "live",
    "trading_status": "operational",
    "max_leverage_notional": "100000",
    "default_leverage": "200",
    "initial_margin_scaling_factor": "0.0000025",
    "maintenance_margin_scaling_factor": "0.00000125",
    "taker_commission_rate": "0.0005",
    "maker_commission_rate": "0.0002",
    "liquidation_penalty_factor": "0.5",
    "contract_type": "perpetual_futures",
    "position_size_limit": 229167,
    "basis_factor_max_limit": "10.95",
    "is_quanto": false,
    "funding_method": "mark_price",
    "annualized_funding": "10.95",
    "price_band": "2.5",
    "underlying_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "quoting_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "settling_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "spot_index": {
      "id": 14,
      "symbol": ".DEXBTUSD",
      "constituent_exchanges": [
        {
          "name": "ExchangeA",
          "weight": 0.25
        }
      ],
      "underlying_asset_id": 13,
      "quoting_asset_id": 14,
      "tick_size": "0.5",
      "index_type": "spot_pair"
    }
  }
}
```

<h3 id="get-product-settlement-prices-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of products|Inline|

<h3 id="get-product-settlement-prices-responseschema">Response Schema</h3>

#### Enumerated Values

|Property|Value|
|---|---|
|notional_type|vanilla|
|notional_type|inverse|
|state|live|
|state|expired|
|state|upcoming|
|trading_status|operational|
|trading_status|disrupted_cancel_only|
|trading_status|disrupted_post_only|
|deposit_status|enabled|
|deposit_status|disabled|
|withdrawal_status|enabled|
|withdrawal_status|disabled|
|index_type|spot_pair|
|index_type|fixed_interest_rate|
|index_type|floating_interest_rate|

<aside class="success">
This operation does not require authentication.
</aside>

<h1 id="delta-exchange-api-v2-historical-ohlc-candles-sparklines">Historical OHLC Candles/Sparklines</h1>

## GET historical ohlc candles

<a id="opIdgetCandles"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/history/candles', params={
  'resolution': '5m',  'symbol': 'BTCUSD',  'start': '1685618835',  'end': '1722511635'
}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/history/candles?resolution=5m&symbol=BTCUSD&start=1685618835&end=1722511635 \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/history/candles',
  params: {
  'resolution' => '5m',
'symbol' => 'BTCUSD',
'start' => '1685618835',
'end' => '1722511635'
}, headers: headers

p JSON.parse(result)

```

`GET /history/candles`

It returns historical Open-High-Low-Close(ohlc) candles data of the symbol as per input values for resolution, start time and end time. Also, it can return only upto 2000 candles maximum in a response.

<h3 id="get-historical-ohlc-candles-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|resolution|query|string|true|ohlc candle time frames like 1m, 5m, 1h|
|symbol|query|string|true|To get funding history pass symbol as FUNDING:${symbol}, mark price MARK:${symbol} and OI data OI:${symbol} for e.g. - FUNDING:BTCUSD, MARK:C-BTC-66400-010824, OI:ETHUSD|
|start|query|integer|true|Start time: unix timestamp in seconds|
|end|query|integer|true|End time: unix timestamp in seconds|

#### Enumerated Values

|Parameter|Value|
|---|---|
|resolution|1m|
|resolution|3m|
|resolution|5m|
|resolution|15m|
|resolution|30m|
|resolution|1h|
|resolution|2h|
|resolution|4h|
|resolution|6h|
|resolution|1d|
|resolution|7d|
|resolution|30d|
|resolution|1w|
|resolution|2w|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": [
    {
      "time": 0,
      "open": 0,
      "high": 0,
      "low": 0,
      "close": 0,
      "volume": 0
    }
  ]
}
```

<h3 id="get-historical-ohlc-candles-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|ohlc|Inline|

<h3 id="get-historical-ohlc-candles-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

## GET product history sparklines

<a id="opIdgetSparklines"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.india.delta.exchange/v2/history/sparklines', params={
  'symbols': 'ETHUSD,MARK:BTCUSD'
}, headers = headers)

print r.json()

```

```shell
# You can also use wget
curl -X GET https://api.india.delta.exchange/v2/history/sparklines?symbols=ETHUSD%2CMARK%3ABTCUSD \
  -H 'Accept: application/json'

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://api.india.delta.exchange/v2/history/sparklines',
  params: {
  'symbols' => 'ETHUSD,MARK:BTCUSD'
}, headers: headers

p JSON.parse(result)

```

`GET /history/sparklines`

<h3 id="get-product-history-sparklines-parameters">Parameters</h3>

|Parameter|In|Type|Required|Description|
|---|---|---|---|---|
|symbols|query|string|true|comma separated product symbols|

> Example responses

> 200 Response

```json
{
  "success": true,
  "result": {
    "ETHUSD": [
      [
        1594214051,
        0.00003826
      ],
      [
        1594214051,
        0.00003826
      ]
    ],
    "MARK:BTCUSD": [
      [
        1594215270,
        0.00003826
      ]
    ]
  }
}
```

<h3 id="get-product-history-sparklines-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|product history sparkline|Inline|

<h3 id="get-product-history-sparklines-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication.
</aside>

# Schemas

<h2 id="tocSapisuccessresponse">ApiSuccessResponse</h2>

<a id="schemaapisuccessresponse"></a>

```json
{
  "success": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|false|none|none|

<h2 id="tocSapierrorresponse">ApiErrorResponse</h2>

<a id="schemaapierrorresponse"></a>

```json
{
  "success": false,
  "error": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|success|boolean|false|none|none|
|error|object|false|none|none|

<h2 id="tocSindex">Index</h2>

<a id="schemaindex"></a>

```json
{
  "id": 14,
  "symbol": ".DEXBTUSD",
  "constituent_exchanges": [
    {
      "name": "ExchangeA",
      "weight": 0.25
    }
  ],
  "underlying_asset_id": 13,
  "quoting_asset_id": 14,
  "tick_size": "0.5",
  "index_type": "spot_pair"
}

```

*Details of an index used in trading, including its constituents and characteristics.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|Unique identifier for the index.|
|symbol|string|false|none|Symbol representing the index, typically prefixed by '.DE' followed by base asset and quoting asset.|
|constituent_exchanges|[object]|false|none|Details of constituent exchanges, including their names and weights in the index.|
|» name|string|false|none|Name of the constituent exchange.|
|» weight|number|false|none|Weight of the exchange in the index.|
|underlying_asset_id|integer|false|none|ID of the underlying asset for the index.|
|quoting_asset_id|integer|false|none|ID of the quoting asset for the index.|
|tick_size|string|false|none|Precision of the spot price in decimal format.|
|index_type|string|false|none|Type of the index.|

#### Enumerated Values

|Property|Value|
|---|---|
|index_type|spot_pair|
|index_type|fixed_interest_rate|
|index_type|floating_interest_rate|

<h2 id="tocSarrayofindices">ArrayOfIndices</h2>

<a id="schemaarrayofindices"></a>

```json
[
  {
    "id": 14,
    "symbol": ".DEXBTUSD",
    "constituent_exchanges": [
      {
        "name": "ExchangeA",
        "weight": 0.25
      }
    ],
    "underlying_asset_id": 13,
    "quoting_asset_id": 14,
    "tick_size": "0.5",
    "index_type": "spot_pair"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Index](#schemaindex)]|false|none|[Details of an index used in trading, including its constituents and characteristics.]|

<h2 id="tocSproductspecs">ProductSpecs</h2>

<a id="schemaproductspecs"></a>

```json
{
  "funding_clamp_value": 0.05,
  "only_reduce_only_orders_allowed": false,
  "tags": [
    "layer_1"
  ]
}

```

*Specifications related to the specific product or contract.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|funding_clamp_value|number|false|none|The maximum allowable funding rate clamp value.|
|only_reduce_only_orders_allowed|boolean|false|none|Indicates whether only reduce-only orders are allowed.|
|tags|[string]|false|none|Tags associated with the product specifications.|

<h2 id="tocSasset">Asset</h2>

<a id="schemaasset"></a>

```json
{
  "id": 14,
  "symbol": "USD",
  "precision": 8,
  "deposit_status": "enabled",
  "withdrawal_status": "enabled",
  "base_withdrawal_fee": "0.000000000000000000",
  "min_withdrawal_amount": "0.000000000000000000"
}

```

*Details of the asset used in the product or contract.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|Unique identifier for the asset.|
|symbol|string|false|none|Symbol representing the asset.|
|precision|integer|false|none|Number of decimal places supported for the asset.|
|deposit_status|string|false|none|Indicates if deposits are enabled for the asset.|
|withdrawal_status|string|false|none|Indicates if withdrawals are enabled for the asset.|
|base_withdrawal_fee|string|false|none|Fixed withdrawal fee for the asset.|
|min_withdrawal_amount|string|false|none|Minimum allowable withdrawal amount for the asset.|

#### Enumerated Values

|Property|Value|
|---|---|
|deposit_status|enabled|
|deposit_status|disabled|
|withdrawal_status|enabled|
|withdrawal_status|disabled|

<h2 id="tocSarrayofassets">ArrayOfAssets</h2>

<a id="schemaarrayofassets"></a>

```json
[
  {
    "id": 14,
    "symbol": "USD",
    "precision": 8,
    "deposit_status": "enabled",
    "withdrawal_status": "enabled",
    "base_withdrawal_fee": "0.000000000000000000",
    "min_withdrawal_amount": "0.000000000000000000"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Asset](#schemaasset)]|false|none|[Details of the asset used in the product or contract.]|

<h2 id="tocSproduct">Product</h2>

<a id="schemaproduct"></a>

```json
{
  "id": 27,
  "symbol": "BTCUSD",
  "description": "Bitcoin Perpetual futures, quoted, settled & margined in INR",
  "created_at": "2023-12-18T13:10:39Z",
  "updated_at": "2024-11-15T02:47:50Z",
  "settlement_time": null,
  "notional_type": "vanilla",
  "impact_size": 10000,
  "initial_margin": "0.5",
  "maintenance_margin": "0.25",
  "contract_value": "0.001",
  "contract_unit_currency": "BTC",
  "tick_size": "0.5",
  "product_specs": {
    "funding_clamp_value": 0.05,
    "only_reduce_only_orders_allowed": false,
    "tags": [
      "layer_1"
    ]
  },
  "state": "live",
  "trading_status": "operational",
  "max_leverage_notional": "100000",
  "default_leverage": "200",
  "initial_margin_scaling_factor": "0.0000025",
  "maintenance_margin_scaling_factor": "0.00000125",
  "taker_commission_rate": "0.0005",
  "maker_commission_rate": "0.0002",
  "liquidation_penalty_factor": "0.5",
  "contract_type": "perpetual_futures",
  "position_size_limit": 229167,
  "basis_factor_max_limit": "10.95",
  "is_quanto": false,
  "funding_method": "mark_price",
  "annualized_funding": "10.95",
  "price_band": "2.5",
  "underlying_asset": {
    "id": 14,
    "symbol": "USD",
    "precision": 8,
    "deposit_status": "enabled",
    "withdrawal_status": "enabled",
    "base_withdrawal_fee": "0.000000000000000000",
    "min_withdrawal_amount": "0.000000000000000000"
  },
  "quoting_asset": {
    "id": 14,
    "symbol": "USD",
    "precision": 8,
    "deposit_status": "enabled",
    "withdrawal_status": "enabled",
    "base_withdrawal_fee": "0.000000000000000000",
    "min_withdrawal_amount": "0.000000000000000000"
  },
  "settling_asset": {
    "id": 14,
    "symbol": "USD",
    "precision": 8,
    "deposit_status": "enabled",
    "withdrawal_status": "enabled",
    "base_withdrawal_fee": "0.000000000000000000",
    "min_withdrawal_amount": "0.000000000000000000"
  },
  "spot_index": {
    "id": 14,
    "symbol": ".DEXBTUSD",
    "constituent_exchanges": [
      {
        "name": "ExchangeA",
        "weight": 0.25
      }
    ],
    "underlying_asset_id": 13,
    "quoting_asset_id": 14,
    "tick_size": "0.5",
    "index_type": "spot_pair"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer(int64)|false|none|Unique identifier of a product or contract.|
|symbol|string|false|none|Symbol of the product or contract like BTCUSD, ETHUSD.|
|description|string|false|none|Detailed description of the product or contract.|
|created_at|string|false|none|Creation timestamp of the product or contract.|
|updated_at|string|false|none|Last update timestamp of the product or contract.|
|settlement_time|string|false|none|Settlement timestamp for futures contracts.|
|notional_type|string|false|none|Type of notional calculation.|
|impact_size|integer|false|none|Size of a typical trade used for mark price computation.|
|initial_margin|string|false|none|Margin required to open a position.|
|maintenance_margin|string|false|none|Minimum margin required to maintain a position.|
|contract_value|string|false|none|Notional value of the contract (spot price x contract amount).|
|contract_unit_currency|string|false|none|Unit of the contract (underlying asset or settling asset).|
|tick_size|string|false|none|Minimum price interval between two successive prices.|
|product_specs|[ProductSpecs](#schemaproductspecs)|false|none|Specifications related to the specific product or contract.|
|state|string|false|none|Current state of the product.|
|trading_status|string|false|none|Trading status of the contract.|
|max_leverage_notional|string|false|none|Maximum notional position size at the highest leverage.|
|default_leverage|string|false|none|Default leverage assigned to the product.|
|initial_margin_scaling_factor|string|false|none|Scaling factor for initial margin.|
|maintenance_margin_scaling_factor|string|false|none|Scaling factor for maintenance margin.|
|taker_commission_rate|string|false|none|Commission rate for taker trades.|
|maker_commission_rate|string|false|none|Commission rate for maker trades.|
|liquidation_penalty_factor|string|false|none|Factor used to calculate liquidation penalty.|
|contract_type|string|false|none|Type of contract (e.g., futures, perpetual).|
|position_size_limit|integer|false|none|Maximum size for a single contract order.|
|basis_factor_max_limit|string|false|none|Maximum value for annualized basis.|
|is_quanto|boolean|false|none|Indicates if the contract is quanto.|
|funding_method|string|false|none|Method used for funding calculation.|
|annualized_funding|string|false|none|Maximum allowed annualized funding rate.|
|price_band|string|false|none|Price range allowed around the mark price (percentage).|
|underlying_asset|[Asset](#schemaasset)|false|none|Details of the asset used in the product or contract.|
|quoting_asset|[Asset](#schemaasset)|false|none|Details of the asset used in the product or contract.|
|settling_asset|[Asset](#schemaasset)|false|none|Details of the asset used in the product or contract.|
|spot_index|[Index](#schemaindex)|false|none|Details of an index used in trading, including its constituents and characteristics.|

#### Enumerated Values

|Property|Value|
|---|---|
|notional_type|vanilla|
|notional_type|inverse|
|state|live|
|state|expired|
|state|upcoming|
|trading_status|operational|
|trading_status|disrupted_cancel_only|
|trading_status|disrupted_post_only|

<h2 id="tocSproductcategories">ProductCategories</h2>

<a id="schemaproductcategories"></a>

```json
{
  "PutOptions": "string",
  "CallOptions": "string",
  "MoveOptions": "string",
  "Spot": "string",
  "Futures": "string",
  "Perpetual Futures": "string"
}

```

*List of all the product category names on delta exchange. Please refer to this list while subscribing to various public and private channels on delta exchange websocket*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PutOptions|string|false|none|put_options|
|CallOptions|string|false|none|call_options|
|MoveOptions|string|false|none|move_options|
|Spot|string|false|none|spot|
|Futures|string|false|none|futures|
|Perpetual Futures|string|false|none|perpetual_futures|

<h2 id="tocSarrayofproducts">ArrayOfProducts</h2>

<a id="schemaarrayofproducts"></a>

```json
[
  {
    "id": 27,
    "symbol": "BTCUSD",
    "description": "Bitcoin Perpetual futures, quoted, settled & margined in INR",
    "created_at": "2023-12-18T13:10:39Z",
    "updated_at": "2024-11-15T02:47:50Z",
    "settlement_time": null,
    "notional_type": "vanilla",
    "impact_size": 10000,
    "initial_margin": "0.5",
    "maintenance_margin": "0.25",
    "contract_value": "0.001",
    "contract_unit_currency": "BTC",
    "tick_size": "0.5",
    "product_specs": {
      "funding_clamp_value": 0.05,
      "only_reduce_only_orders_allowed": false,
      "tags": [
        "layer_1"
      ]
    },
    "state": "live",
    "trading_status": "operational",
    "max_leverage_notional": "100000",
    "default_leverage": "200",
    "initial_margin_scaling_factor": "0.0000025",
    "maintenance_margin_scaling_factor": "0.00000125",
    "taker_commission_rate": "0.0005",
    "maker_commission_rate": "0.0002",
    "liquidation_penalty_factor": "0.5",
    "contract_type": "perpetual_futures",
    "position_size_limit": 229167,
    "basis_factor_max_limit": "10.95",
    "is_quanto": false,
    "funding_method": "mark_price",
    "annualized_funding": "10.95",
    "price_band": "2.5",
    "underlying_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "quoting_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "settling_asset": {
      "id": 14,
      "symbol": "USD",
      "precision": 8,
      "deposit_status": "enabled",
      "withdrawal_status": "enabled",
      "base_withdrawal_fee": "0.000000000000000000",
      "min_withdrawal_amount": "0.000000000000000000"
    },
    "spot_index": {
      "id": 14,
      "symbol": ".DEXBTUSD",
      "constituent_exchanges": [
        {
          "name": "ExchangeA",
          "weight": 0.25
        }
      ],
      "underlying_asset_id": 13,
      "quoting_asset_id": 14,
      "tick_size": "0.5",
      "index_type": "spot_pair"
    }
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Product](#schemaproduct)]|false|none|none|

<h2 id="tocSorder">Order</h2>

<a id="schemaorder"></a>

```json
{
  "id": 123,
  "user_id": 453671,
  "size": 10,
  "unfilled_size": 2,
  "side": "buy",
  "order_type": "limit_order",
  "limit_price": "59000",
  "stop_order_type": "stop_loss_order",
  "stop_price": "55000",
  "paid_commission": "0.5432",
  "commission": "0.5432",
  "reduce_only": false,
  "client_order_id": "34521712",
  "state": "open",
  "created_at": "1725865012000000",
  "product_id": 27,
  "product_symbol": "BTCUSD"
}

```

*An Order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|Genraeted order id|
|user_id|integer|false|none|Client id|
|size|integer|false|none|Order size|
|unfilled_size|integer|false|none|Order size which is not filled yet|
|side|string|false|none|Side for which to place order|
|order_type|string|false|none|Order type - limit_order/market_order|
|limit_price|string|false|none|Price level on which order must be triggered|
|stop_order_type|string|false|none|Stop order type - stop loss or take profit|
|stop_price|string|false|none|Stop price level for the stop order|
|paid_commission|string|false|none|Commission paid for filled order|
|commission|string|false|none|Commission blocked for order|
|reduce_only|string|false|none|if set, will only close positions. New orders will not be placed|
|client_order_id|string|false|none|client order id provided by the user while creating order|
|state|string|false|none|Order Status|
|created_at|string|false|none|Created at unix timestamp of the order in micro seconds|
|product_id|integer|false|none|Product id of the ordered product|
|product_symbol|string|false|none|Product symbol of the ordered product|

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|reduce_only|false|
|reduce_only|true|
|state|open|
|state|pending|
|state|closed|
|state|cancelled|

<h2 id="tocSarrayoforders">ArrayOfOrders</h2>

<a id="schemaarrayoforders"></a>

```json
[
  {
    "id": 123,
    "user_id": 453671,
    "size": 10,
    "unfilled_size": 2,
    "side": "buy",
    "order_type": "limit_order",
    "limit_price": "59000",
    "stop_order_type": "stop_loss_order",
    "stop_price": "55000",
    "paid_commission": "0.5432",
    "commission": "0.5432",
    "reduce_only": false,
    "client_order_id": "34521712",
    "state": "open",
    "created_at": "1725865012000000",
    "product_id": 27,
    "product_symbol": "BTCUSD"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Order](#schemaorder)]|false|none|[An Order object]|

<h2 id="tocScreateorderrequest">CreateOrderRequest</h2>

<a id="schemacreateorderrequest"></a>

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "limit_price": "59000",
  "size": 10,
  "side": "buy",
  "order_type": "limit_order",
  "stop_order_type": "stop_loss_order",
  "stop_price": "56000",
  "trail_amount": "50",
  "stop_trigger_method": "last_traded_price",
  "bracket_stop_loss_limit_price": "57000",
  "bracket_stop_loss_price": "56000",
  "bracket_trail_amount": "50",
  "bracket_take_profit_limit_price": "62000",
  "bracket_take_profit_price": "61000",
  "time_in_force": "gtc",
  "mmp": "disabled",
  "post_only": false,
  "reduce_only": false,
  "client_order_id": "34521712",
  "cancel_orders_accepted": false
}

```

*A create order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|true|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|true|none|Only one of either product_id or product_symbol must be sent.|
|limit_price|string|false|none|Price level for limit orders|
|size|integer|true|none|Order size|
|side|string|true|none|Buy order or Sell order|
|order_type|string|true|none|Limit order(limit_price must be defined) or Market order|
|stop_order_type|string|false|none|Stop order type - stop loss or take profit|
|stop_price|string|false|none|Stop loss price level if the order is stop order|
|trail_amount|string|false|none|Use trail amount if you want a trailing stop order. Required if stop price is empty.|
|stop_trigger_method|string|false|none|Stop order trigger method - mark_price/last_traded_price/spot_price|
|bracket_stop_loss_limit_price|string|false|none|Bracket order stop loss limit price|
|bracket_stop_loss_price|string|false|none|Bracket order stop loss trigger price|
|bracket_trail_amount|string|false|none|use bracket trail amount if you want a trailing stop order. Required if bracket stop price is empty|
|bracket_take_profit_limit_price|string|false|none|Bracket order take profit limit price|
|bracket_take_profit_price|string|false|none|take profit trigger price for bracket order|
|time_in_force|string|false|none|GTC/IOC order type|
|mmp|string|false|none|MMP level for the order - disabled/mmp1/mmp2/mmp3/mmp4/mmp5|
|post_only|string|false|none|Post only order|
|reduce_only|string|false|none|if set, will only close positions. New orders will not be placed|
|client_order_id|string|false|none|client order id provided by the user while creating order|
|cancel_orders_accepted|string|false|none|if set, will cancel all existing orders for the product|

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|stop_order_type|stop_loss_order|
|stop_order_type|take_profit_order|
|stop_trigger_method|mark_price|
|stop_trigger_method|last_traded_price|
|stop_trigger_method|spot_price|
|time_in_force|gtc|
|time_in_force|ioc|
|mmp|disabled|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|
|post_only|true|
|post_only|false|
|reduce_only|true|
|reduce_only|false|
|cancel_orders_accepted|true|
|cancel_orders_accepted|false|

<h2 id="tocSbatchcreateorder">BatchCreateOrder</h2>

<a id="schemabatchcreateorder"></a>

```json
{
  "limit_price": "59000",
  "size": 10,
  "side": "buy",
  "order_type": "limit_order",
  "time_in_force": "gtc",
  "mmp": "disabled",
  "post_only": false,
  "client_order_id": "34521712"
}

```

*A create order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit_price|string|false|none|Price level for limit orders|
|size|integer|true|none|Order size|
|side|string|true|none|Buy order or Sell order|
|order_type|string|true|none|Limit order(limit_price must be defined) or Market order|
|time_in_force|string|false|none|GTC/IOC order type|
|mmp|string|false|none|MMP level for the order - disabled/mmp1/mmp2/mmp3/mmp4/mmp5|
|post_only|string|false|none|Post only order|
|client_order_id|string|false|none|client order id provided by the user while creating order|

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|
|order_type|limit_order|
|order_type|market_order|
|time_in_force|gtc|
|time_in_force|ioc|
|mmp|disabled|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|
|post_only|true|
|post_only|false|

<h2 id="tocSbatchcreateordersrequest">BatchCreateOrdersRequest</h2>

<a id="schemabatchcreateordersrequest"></a>

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "limit_price": "59000",
      "size": 10,
      "side": "buy",
      "order_type": "limit_order",
      "time_in_force": "gtc",
      "mmp": "disabled",
      "post_only": false,
      "client_order_id": "34521712"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|false|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|false|none|Only one of either product_id or product_symbol must be sent.|
|orders|[[BatchCreateOrder](#schemabatchcreateorder)]|false|none|[A create order object]|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

<h2 id="tocSarrayofcreateorderrequest">ArrayOfCreateOrderRequest</h2>

<a id="schemaarrayofcreateorderrequest"></a>

```json
[
  {
    "product_id": 27,
    "product_symbol": "BTCUSD",
    "limit_price": "59000",
    "size": 10,
    "side": "buy",
    "order_type": "limit_order",
    "stop_order_type": "stop_loss_order",
    "stop_price": "56000",
    "trail_amount": "50",
    "stop_trigger_method": "last_traded_price",
    "bracket_stop_loss_limit_price": "57000",
    "bracket_stop_loss_price": "56000",
    "bracket_trail_amount": "50",
    "bracket_take_profit_limit_price": "62000",
    "bracket_take_profit_price": "61000",
    "time_in_force": "gtc",
    "mmp": "disabled",
    "post_only": false,
    "reduce_only": false,
    "client_order_id": "34521712",
    "cancel_orders_accepted": false
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[CreateOrderRequest](#schemacreateorderrequest)]|false|none|[A create order object]|

<h2 id="tocSeditorderrequest">EditOrderRequest</h2>

<a id="schemaeditorderrequest"></a>

```json
{
  "id": 34521712,
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "limit_price": "59000",
  "size": 15,
  "mmp": "disabled",
  "post_only": false,
  "cancel_orders_accepted": false,
  "stop_price": "56000",
  "trail_amount": "50"
}

```

*edit order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|existing order id to be edited|
|product_id|integer|true|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|true|none|Only one of either product_id or product_symbol must be sent.|
|limit_price|string|false|none|Price level for limit orders|
|size|integer|true|none|total size after editing order|
|mmp|string|false|none|MMP level for the order - disabled/mmp1/mmp2/mmp3/mmp4/mmp5|
|post_only|string|false|none|Post only order|
|cancel_orders_accepted|string|false|none|if set, will cancel all existing orders for the product|
|stop_price|string|false|none|price to trigger stop order|
|trail_amount|string|false|none|Use trail amount if you want a trailing stop order. Required if stop price is empty.|

#### Enumerated Values

|Property|Value|
|---|---|
|mmp|disabled|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|
|post_only|true|
|post_only|false|
|cancel_orders_accepted|true|
|cancel_orders_accepted|false|

<h2 id="tocSbatcheditorder">BatchEditOrder</h2>

<a id="schemabatcheditorder"></a>

```json
{
  "id": 34521712,
  "limit_price": "59000",
  "size": 15,
  "mmp": "disabled",
  "post_only": false
}

```

*edit order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|existing order id to be edited|
|limit_price|string|false|none|Price level for limit orders|
|size|integer|true|none|total size after editing order|
|mmp|string|false|none|MMP level for the order - disabled/mmp1/mmp2/mmp3/mmp4/mmp5|
|post_only|string|false|none|Post only order|

#### Enumerated Values

|Property|Value|
|---|---|
|mmp|disabled|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|
|post_only|false|
|post_only|true|

<h2 id="tocSbatcheditordersrequest">BatchEditOrdersRequest</h2>

<a id="schemabatcheditordersrequest"></a>

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "id": 34521712,
      "limit_price": "59000",
      "size": 15,
      "mmp": "disabled",
      "post_only": false
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|false|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|false|none|Only one of either product_id or product_symbol must be sent.|
|orders|[[BatchEditOrder](#schemabatcheditorder)]|false|none|[edit order object]|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

<h2 id="tocScreatebracketorderrequest">CreateBracketOrderRequest</h2>

<a id="schemacreatebracketorderrequest"></a>

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "stop_loss_order": {
    "order_type": "limit_order",
    "stop_price": "56000",
    "trail_amount": "50",
    "limit_price": "55000"
  },
  "take_profit_order": {
    "order_type": "limit_order",
    "stop_price": "65000",
    "limit_price": "64000"
  },
  "bracket_stop_trigger_method": "last_traded_price"
}

```

*bracket order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|true|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|true|none|Only one of either product_id or product_symbol must be sent.|
|stop_loss_order|object|false|none|none|
|» order_type|string|false|none|Limit order(limit_price must be defined) or Market order|
|» stop_price|string|false|none|Stop loss price level|
|» trail_amount|string|false|none|Use trail amount if you want a trailing stop order. Required if stop price is empty.|
|» limit_price|string|false|none|required for limit orders|
|take_profit_order|object|false|none|none|
|» order_type|string|false|none|Limit order(limit_price must be defined) or Market order|
|» stop_price|string|false|none|Stop price level|
|» limit_price|string|false|none|required for limit orders|
|bracket_stop_trigger_method|string|false|none|stop order trigger method for bracket orders- mark_price/last_traded_price/spot_price|

#### Enumerated Values

|Property|Value|
|---|---|
|order_type|limit_order|
|order_type|market_order|
|order_type|limit_order|
|order_type|market_order|
|bracket_stop_trigger_method|mark_price|
|bracket_stop_trigger_method|last_traded_price|
|bracket_stop_trigger_method|spot_price|

<h2 id="tocSeditbracketorderrequest">EditBracketOrderRequest</h2>

<a id="schemaeditbracketorderrequest"></a>

```json
{
  "id": 34521712,
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "bracket_stop_loss_limit_price": "55000",
  "bracket_stop_loss_price": "56000",
  "bracket_take_profit_limit_price": "65000",
  "bracket_take_profit_price": "64000",
  "bracket_trail_amount": "50",
  "bracket_stop_trigger_method": "last_traded_price"
}

```

*bracket order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|Order ID for which bracket params are being updated|
|product_id|integer|true|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|true|none|Only one of either product_id or product_symbol must be sent.|
|bracket_stop_loss_limit_price|string|false|none|stop loss limit price for bracket order|
|bracket_stop_loss_price|string|false|none|stop loss trigger price for bracket order|
|bracket_take_profit_limit_price|string|false|none|take profit limit price for bracket order|
|bracket_take_profit_price|string|false|none|take profit trigger price for bracket order|
|bracket_trail_amount|string|false|none|trail amount of bracket order|
|bracket_stop_trigger_method|string|false|none|stop order trigger method for bracket orders- mark_price/last_traded_price/spot_price|

#### Enumerated Values

|Property|Value|
|---|---|
|bracket_stop_trigger_method|mark_price|
|bracket_stop_trigger_method|last_traded_price|
|bracket_stop_trigger_method|spot_price|

<h2 id="tocSbatchdeleteorder">BatchDeleteOrder</h2>

<a id="schemabatchdeleteorder"></a>

```json
{
  "id": 13452112,
  "client_order_id": "34521712"
}

```

*A delete order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|use bracket trail amount if you want a trailing stop order. Required if bracket stop price is empty|
|client_order_id|string|false|none|client order id provided by the user while creating order|

<h2 id="tocSdeleteorderrequest">DeleteOrderRequest</h2>

<a id="schemadeleteorderrequest"></a>

```json
{
  "id": 13452112,
  "client_order_id": "34521712",
  "product_id": 27
}

```

*A delete order object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|use bracket trail amount if you want a trailing stop order. Required if bracket stop price is empty|
|client_order_id|string|false|none|client order id provided by the user while creating order|
|product_id|integer|false|none|product_id of the product in the order|

<h2 id="tocScancelallfilterobject">CancelAllFilterObject</h2>

<a id="schemacancelallfilterobject"></a>

```json
{
  "product_id": 27,
  "contract_types": "perpetual_futures,put_options,call_options",
  "cancel_limit_orders": false,
  "cancel_stop_orders": false,
  "cancel_reduce_only_orders": false
}

```

*Cancel all request filter object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|false|none|Only one of either product_id or product_symbol must be sent.|
|contract_types|string|false|none|comma separated list of desired contract types|
|cancel_limit_orders|string|false|none|set true to cancel open limit orders|
|cancel_stop_orders|string|false|none|set as true to cancel stop orders|
|cancel_reduce_only_orders|string|false|none|set as true to cancel reduce only orders|

#### Enumerated Values

|Property|Value|
|---|---|
|cancel_limit_orders|true|
|cancel_limit_orders|false|
|cancel_stop_orders|true|
|cancel_stop_orders|false|
|cancel_reduce_only_orders|true|
|cancel_reduce_only_orders|false|

<h2 id="tocSbatchdeleteordersrequest">BatchDeleteOrdersRequest</h2>

<a id="schemabatchdeleteordersrequest"></a>

```json
{
  "product_id": 27,
  "product_symbol": "BTCUSD",
  "orders": [
    {
      "id": 13452112,
      "client_order_id": "34521712"
    }
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|product_id|integer|false|none|Only one of either product_id or product_symbol must be sent.|
|product_symbol|string|false|none|Only one of either product_id or product_symbol must be sent.|
|orders|[[BatchDeleteOrder](#schemabatchdeleteorder)]|false|none|[A delete order object]|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|

<h2 id="tocSposition">Position</h2>

<a id="schemaposition"></a>

```json
{
  "user_id": 0,
  "size": 0,
  "entry_price": "string",
  "margin": "string",
  "liquidation_price": "string",
  "bankruptcy_price": "string",
  "adl_level": 0,
  "product_id": 0,
  "product_symbol": "string",
  "commission": "string",
  "realized_pnl": "string",
  "realized_funding": "string"
}

```

*A position object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_id|integer|false|none|none|
|size|integer|false|none|Position size, negative for short and positive for long|
|entry_price|string|false|none|none|
|margin|string|false|none|none|
|liquidation_price|string|false|none|none|
|bankruptcy_price|string|false|none|none|
|adl_level|integer|false|none|none|
|product_id|integer|false|none|none|
|product_symbol|string|false|none|none|
|commission|string|false|none|commissions blocked in the position|
|realized_pnl|string|false|none|Net realized pnl since the position was opened|
|realized_funding|string|false|none|Net realized funding since the position was opened|

<h2 id="tocSarrayofpositions">ArrayOfPositions</h2>

<a id="schemaarrayofpositions"></a>

```json
[
  {
    "user_id": 0,
    "size": 0,
    "entry_price": "string",
    "margin": "string",
    "liquidation_price": "string",
    "bankruptcy_price": "string",
    "adl_level": 0,
    "product_id": 0,
    "product_symbol": "string",
    "commission": "string",
    "realized_pnl": "string",
    "realized_funding": "string"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Position](#schemaposition)]|false|none|[A position object]|

<h2 id="tocSfill">Fill</h2>

<a id="schemafill"></a>

```json
{
  "id": 0,
  "size": 0,
  "fill_type": "normal",
  "side": "buy",
  "price": "string",
  "role": "taker",
  "commission": "string",
  "created_at": "string",
  "product_id": 0,
  "product_symbol": "string",
  "order_id": "string",
  "settling_asset_id": 0,
  "settling_asset_symbol": "string",
  "meta_data": {
    "commission_deto": "string",
    "commission_deto_in_settling_asset": "string",
    "effective_commission_rate": "string",
    "liquidation_fee_deto": "string",
    "liquidation_fee_deto_in_settling_asset": "string",
    "order_price": "string",
    "order_size": "string",
    "order_type": "string",
    "order_unfilled_size": "string",
    "tfc_used_for_commission": "string",
    "tfc_used_for_liquidation_fee": "string",
    "total_commission_in_settling_asset": "string",
    "total_liquidation_fee_in_settling_asset": "string"
  }
}

```

*A fill object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|size|integer|false|none|none|
|fill_type|string|false|none|none|
|side|string|false|none|none|
|price|string|false|none|Price at which the fill happened, BigDecimal sent as string|
|role|string|false|none|none|
|commission|string|false|none|Commission paid on this fill, negative value means commission was earned because of maker role|
|created_at|string|false|none|none|
|product_id|integer|false|none|none|
|product_symbol|string|false|none|none|
|order_id|string|false|none|Will be order_id(Integer) in most cases. Will be UUID string of order when fill_type is settlement|
|settling_asset_id|integer|false|none|none|
|settling_asset_symbol|string|false|none|none|
|meta_data|[FillMetaData](#schemafillmetadata)|false|none|Meta data inside fill|

#### Enumerated Values

|Property|Value|
|---|---|
|fill_type|normal|
|fill_type|adl|
|fill_type|liquidation|
|fill_type|settlement|
|fill_type|otc|
|side|buy|
|side|sell|
|role|taker|
|role|maker|

<h2 id="tocSarrayoffills">ArrayOfFills</h2>

<a id="schemaarrayoffills"></a>

```json
[
  {
    "id": 0,
    "size": 0,
    "fill_type": "normal",
    "side": "buy",
    "price": "string",
    "role": "taker",
    "commission": "string",
    "created_at": "string",
    "product_id": 0,
    "product_symbol": "string",
    "order_id": "string",
    "settling_asset_id": 0,
    "settling_asset_symbol": "string",
    "meta_data": {
      "commission_deto": "string",
      "commission_deto_in_settling_asset": "string",
      "effective_commission_rate": "string",
      "liquidation_fee_deto": "string",
      "liquidation_fee_deto_in_settling_asset": "string",
      "order_price": "string",
      "order_size": "string",
      "order_type": "string",
      "order_unfilled_size": "string",
      "tfc_used_for_commission": "string",
      "tfc_used_for_liquidation_fee": "string",
      "total_commission_in_settling_asset": "string",
      "total_liquidation_fee_in_settling_asset": "string"
    }
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Fill](#schemafill)]|false|none|[A fill object]|

<h2 id="tocSfillmetadata">FillMetaData</h2>

<a id="schemafillmetadata"></a>

```json
{
  "commission_deto": "string",
  "commission_deto_in_settling_asset": "string",
  "effective_commission_rate": "string",
  "liquidation_fee_deto": "string",
  "liquidation_fee_deto_in_settling_asset": "string",
  "order_price": "string",
  "order_size": "string",
  "order_type": "string",
  "order_unfilled_size": "string",
  "tfc_used_for_commission": "string",
  "tfc_used_for_liquidation_fee": "string",
  "total_commission_in_settling_asset": "string",
  "total_liquidation_fee_in_settling_asset": "string"
}

```

*Meta data inside fill*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|commission_deto|string|false|none|none|
|commission_deto_in_settling_asset|string|false|none|none|
|effective_commission_rate|string|false|none|none|
|liquidation_fee_deto|string|false|none|none|
|liquidation_fee_deto_in_settling_asset|string|false|none|none|
|order_price|string|false|none|none|
|order_size|string|false|none|none|
|order_type|string|false|none|none|
|order_unfilled_size|string|false|none|none|
|tfc_used_for_commission|string|false|none|none|
|tfc_used_for_liquidation_fee|string|false|none|none|
|total_commission_in_settling_asset|string|false|none|none|
|total_liquidation_fee_in_settling_asset|string|false|none|none|

<h2 id="tocSorderleverage">OrderLeverage</h2>

<a id="schemaorderleverage"></a>

```json
{
  "leverage": 10,
  "order_margin": "563.2",
  "product_id": 27
}

```

*Order Leverage for a product*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|leverage|string|false|none|Leverage of all open orders for this product|
|order_margin|string|false|none|Margin blocked in open orders for this product|
|product_id|integer|false|none|Product id of the ordered product|

<h2 id="tocSl2orderbook">L2Orderbook</h2>

<a id="schemal2orderbook"></a>

```json
{
  "buy": [
    {
      "depth": "983",
      "price": "9187.5",
      "size": 205640
    }
  ],
  "last_updated_at": 1654589595784000,
  "sell": [
    {
      "depth": "1185",
      "price": "9188.0",
      "size": 113752
    }
  ],
  "symbol": "BTCUSD"
}

```

*L2 orderbook*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|buy|[object]|false|none|none|
|» depth|string|false|none|sum of size till that price level|
|» price|string|false|none|none|
|» size|integer|false|none|for derivatives -> number of contracts, for spot -> amount in underlying|
|last_updated_at|integer|false|none|none|
|sell|[object]|false|none|none|
|» depth|string|false|none|sum of size till that price level|
|» price|string|false|none|none|
|» size|integer|false|none|for derivatives -> number of contracts, for spot -> amount in underlying|
|symbol|string|false|none|none|

<h2 id="tocStrades">Trades</h2>

<a id="schematrades"></a>

```json
{
  "trades": [
    {
      "side": "buy",
      "size": 0,
      "price": "string",
      "timestamp": 0
    }
  ]
}

```

*trades of a symbol*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|trades|[object]|false|none|none|
|» side|string|false|none|none|
|» size|integer|false|none|none|
|» price|string|false|none|none|
|» timestamp|integer|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|side|buy|
|side|sell|

<h2 id="tocSwallet">Wallet</h2>

<a id="schemawallet"></a>

```json
{
  "asset_id": 0,
  "asset_symbol": "string",
  "available_balance": "string",
  "available_balance_for_robo": "string",
  "balance": "string",
  "blocked_margin": "string",
  "commission": "string",
  "cross_asset_liability": "string",
  "cross_commission": "string",
  "cross_locked_collateral": "string",
  "cross_order_margin": "string",
  "cross_position_margin": "string",
  "id": 0,
  "interest_credit": "string",
  "order_margin": "string",
  "pending_referral_bonus": "string",
  "pending_trading_fee_credit": "string",
  "portfolio_margin": "string",
  "position_margin": "string",
  "trading_fee_credit": "string",
  "unvested_amount": "string",
  "user_id": 0
}

```

*Wallet Data for each asset.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|asset_id|integer|false|none|Id for assets like BTC|
|asset_symbol|string|false|none|Symbol for assets like BTC|
|available_balance|string|false|none|Balance available for trading|
|available_balance_for_robo|string|false|none|Balance available for robo trading|
|balance|string|false|none|Total wallet balance|
|blocked_margin|string|false|none|Total blocked margin including commissions for all modes|
|commission|string|false|none|Commissions blocked in Isolated Mode|
|cross_asset_liability|string|false|none|Asset liability in Cross margin mode|
|cross_commission|string|false|none|Commision blocked in Cross margin mode|
|cross_locked_collateral|string|false|none|collateral blocked in Cross margin mode|
|cross_order_margin|string|false|none|margin blocked for open orders in Cross margin mode|
|cross_position_margin|string|false|none|margin blocked for open positions in Cross margin mode|
|id|integer|false|none|Wallet Id|
|interest_credit|string|false|none|Total interest credited|
|order_margin|string|false|none|margin blocked for open positions in isolated mode|
|pending_referral_bonus|string|false|none|Pending referral bonus|
|pending_trading_fee_credit|string|false|none|Credit of trading fee pending|
|portfolio_margin|string|false|none|Total margin blocked including commissions in portfolio margin mode|
|position_margin|string|false|none|Margin blocked in open positions in isolated mode|
|trading_fee_credit|string|false|none|Credit of trading fee|
|unvested_amount|string|false|none|Amount currently unvested|
|user_id|integer|false|none|User Id linked to this wallet|

<h2 id="tocSwalletpayload">WalletPayload</h2>

<a id="schemawalletpayload"></a>

```json
{
  "meta": {
    "net_equity": "string",
    "robo_trading_equity": "string"
  },
  "result": [
    {
      "asset_id": 0,
      "asset_symbol": "string",
      "available_balance": "string",
      "available_balance_for_robo": "string",
      "balance": "string",
      "blocked_margin": "string",
      "commission": "string",
      "cross_asset_liability": "string",
      "cross_commission": "string",
      "cross_locked_collateral": "string",
      "cross_order_margin": "string",
      "cross_position_margin": "string",
      "id": 0,
      "interest_credit": "string",
      "order_margin": "string",
      "pending_referral_bonus": "string",
      "pending_trading_fee_credit": "string",
      "portfolio_margin": "string",
      "position_margin": "string",
      "trading_fee_credit": "string",
      "unvested_amount": "string",
      "user_id": 0
    }
  ],
  "success": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|meta|[WalletMetaData](#schemawalletmetadata)|false|none|Meta data for robo trading|
|result|[ArrayOfWallets](#schemaarrayofwallets)|false|none|Array of wallet for every asset|
|success|boolean|false|none|none|

<h2 id="tocSwalletmetadata">WalletMetaData</h2>

<a id="schemawalletmetadata"></a>

```json
{
  "net_equity": "string",
  "robo_trading_equity": "string"
}

```

*Meta data for robo trading*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|net_equity|string|false|none|Net equity for robo trading|
|robo_trading_equity|string|false|none|trading equity for robo trading|

<h2 id="tocSarrayofwallets">ArrayOfWallets</h2>

<a id="schemaarrayofwallets"></a>

```json
[
  {
    "asset_id": 0,
    "asset_symbol": "string",
    "available_balance": "string",
    "available_balance_for_robo": "string",
    "balance": "string",
    "blocked_margin": "string",
    "commission": "string",
    "cross_asset_liability": "string",
    "cross_commission": "string",
    "cross_locked_collateral": "string",
    "cross_order_margin": "string",
    "cross_position_margin": "string",
    "id": 0,
    "interest_credit": "string",
    "order_margin": "string",
    "pending_referral_bonus": "string",
    "pending_trading_fee_credit": "string",
    "portfolio_margin": "string",
    "position_margin": "string",
    "trading_fee_credit": "string",
    "unvested_amount": "string",
    "user_id": 0
  }
]

```

*Array of wallet for every asset*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Wallet](#schemawallet)]|false|none|Array of wallet for every asset|

<h2 id="tocSassettransfersubaccountreq">AssetTransferSubaccountReq</h2>

<a id="schemaassettransfersubaccountreq"></a>

```json
{
  "transferrer_user_id": "string",
  "transferee_user_id": "string",
  "asset_symbol": "string",
  "amount": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|transferrer_user_id|string|false|none|Debit account|
|transferee_user_id|string|false|none|Credit account|
|asset_symbol|string|false|none|Asset to transfer|
|amount|big_decimal|false|none|Amount to transfer. Only postive values allowed.|

<h2 id="tocSsubaccounttransferhistory">SubaccountTransferHistory</h2>

<a id="schemasubaccounttransferhistory"></a>

```json
{
  "subaccount_user_id": "string",
  "before": "string",
  "after": "string",
  "page_size": 10
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subaccount_user_id|string|false|none|subaccount user id|
|before|string|false|none|before cursor for pagination|
|after|string|false|none|after cursor for pagination|
|page_size|big_decimal|false|none|records per page|

<h2 id="tocStransactiontypes">TransactionTypes</h2>

<a id="schematransactiontypes"></a>

```json
"string"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|
|transaction_type|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|transaction_type|cashflow|
|transaction_type|deposit|
|transaction_type|withdrawal|
|transaction_type|commission|
|transaction_type|conversion|
|transaction_type|funding|
|transaction_type|settlement|
|transaction_type|liquidation_fee|
|transaction_type|spot_trade|
|transaction_type|withdrawal_cancellation|
|transaction_type|referral_bonus|
|transaction_type|sub_account_transfer|
|transaction_type|commission_rebate|
|transaction_type|promo_credit|
|transaction_type|trading_credits|
|transaction_type|trading_credits_forfeited|
|transaction_type|trading_credits_paid|
|transaction_type|trading_fee_credits_paid_liquidation_fee|
|transaction_type|trading_credits_reverted|
|transaction_type|interest_credit|
|transaction_type|external_deposit|
|transaction_type|credit_line|
|transaction_type|trading_competition|
|transaction_type|fund_deposit|
|transaction_type|fund_withdrawal|
|transaction_type|fund_wallet_deposit|
|transaction_type|fund_wallet_withdrawal|
|transaction_type|fund_reward|
|transaction_type|trade_farming_reward|
|transaction_type|interest_credit|
|transaction_type|revert|
|transaction_type|raf_bonus|
|transaction_type|fill_appropriation|
|transaction_type|incident_compensation|

<h2 id="tocStransaction">Transaction</h2>

<a id="schematransaction"></a>

```json
{
  "id": 0,
  "amount": "string",
  "balance": "string",
  "transaction_type": "string",
  "meta_data": {},
  "product_id": 0,
  "asset_id": 0,
  "asset_symbol": 0,
  "created_at": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|amount|string|false|none|amount credited/debited in this transaction (+ for credited, - for debited)|
|balance|string|false|none|net wallet balance after this transaction|
|transaction_type|[TransactionTypes](#schematransactiontypes)|false|none|none|
|meta_data|object|false|none|none|
|product_id|integer|false|none|none|
|asset_id|integer|false|none|none|
|asset_symbol|integer|false|none|none|
|created_at|string|false|none|none|

<h2 id="tocSarrayoftransactions">ArrayOfTransactions</h2>

<a id="schemaarrayoftransactions"></a>

```json
[
  {
    "id": 0,
    "amount": "string",
    "balance": "string",
    "transaction_type": "string",
    "meta_data": {},
    "product_id": 0,
    "asset_id": 0,
    "asset_symbol": 0,
    "created_at": "string"
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Transaction](#schematransaction)]|false|none|none|

<h2 id="tocSsubaccounttransferlog">SubaccountTransferLog</h2>

<a id="schemasubaccounttransferlog"></a>

```json
{
  "transferrer_user_id": "string",
  "transferee_user_id": "string",
  "asset_symbol": "string",
  "amount": null,
  "created_at": "string",
  "transferee_user": {},
  "transferrer_user": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|transferrer_user_id|string|false|none|User id of the account debited with the asset.|
|transferee_user_id|string|false|none|User id of the account credited with the asset.|
|asset_symbol|string|false|none|Asset symbol transferred.|
|amount|big_decimal|false|none|Amount transferred.|
|created_at|string|false|none|transfer creation date and time|
|transferee_user|object|false|none|User details|
|transferrer_user|object|false|none|User details|

<h2 id="tocSarrayofsubaccounttransferlog">ArrayOfSubaccountTransferLog</h2>

<a id="schemaarrayofsubaccounttransferlog"></a>

```json
[
  {
    "transferrer_user_id": "string",
    "transferee_user_id": "string",
    "asset_symbol": "string",
    "amount": null,
    "created_at": "string",
    "transferee_user": {},
    "transferrer_user": {}
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[SubaccountTransferLog](#schemasubaccounttransferlog)]|false|none|none|

<h2 id="tocSgreeks">greeks</h2>

<a id="schemagreeks"></a>

```json
{
  "delta": "0.25",
  "gamma": "0.10",
  "rho": "0.05",
  "theta": "-0.02",
  "vega": "0.15"
}

```

*The Greeks represent different factors that influence the pricing of options. These are key measures for assessing risk and managing option positions.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|delta|string|false|none|The rate of change of the option price with respect to changes in the underlying asset price. A measure of sensitivity to the asset price movement.|
|gamma|string|false|none|The rate of change of delta with respect to changes in the underlying asset price. A measure of the curvature of the option’s price sensitivity to the asset price.|
|rho|string|false|none|The rate of change of the option price with respect to changes in the risk-free interest rate. A measure of interest rate sensitivity.|
|theta|string|false|none|The rate of change of the option price with respect to time, often referred to as time decay. A measure of how the option's price declines as expiration approaches.|
|vega|string|false|none|The rate of change of the option price with respect to changes in the volatility of the underlying asset. A measure of volatility sensitivity.|

<h2 id="tocSprice_band">price_band</h2>

<a id="schemaprice_band"></a>

```json
{
  "lower_limit": "61120.45",
  "upper_limit": "72300.00"
}

```

*The price band defines the permissible price range for a product. The lower and upper limits represent the boundaries within which the product's price can fluctuate.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lower_limit|string|false|none|The minimum price limit for the product. It defines the lowest allowable price before triggering a price band constraint.|
|upper_limit|string|false|none|The maximum price limit for the product. It defines the highest allowable price before triggering a price band constraint.|

<h2 id="tocSquotes">quotes</h2>

<a id="schemaquotes"></a>

```json
{
  "ask_iv": "0.25",
  "ask_size": "100",
  "best_ask": "150.00",
  "best_bid": "148.00",
  "bid_iv": "0.22",
  "bid_size": "50"
}

```

*The 'quotes' object contains the latest bid and ask prices, their respective implied volatilities (IV), and order sizes for an asset. It provides key market data for understanding liquidity and pricing.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ask_iv|string|false|none|The implied volatility (IV) for the ask price. Represents the market's expectation of the future volatility of the underlying asset.|
|ask_size|string|false|none|The size of the ask order, representing the quantity of the asset available for sale at the ask price.|
|best_ask|string|false|none|The best (lowest) ask price available in the market for the asset.|
|best_bid|string|false|none|The best (highest) bid price available in the market for the asset.|
|bid_iv|string|false|none|The implied volatility (IV) for the bid price. Represents the market's expectation of future volatility for the bid side of the order book.|
|bid_size|string|false|none|The size of the bid order, representing the quantity of the asset that buyers are willing to purchase at the bid price.|

<h2 id="tocSticker">Ticker</h2>

<a id="schematicker"></a>

```json
{
  "close": 67321,
  "contract_type": "futures",
  "greeks": {
    "delta": "0.25",
    "gamma": "0.10",
    "rho": "0.05",
    "theta": "-0.02",
    "vega": "0.15"
  },
  "high": 68500.5,
  "low": 66300.25,
  "mark_price": "67000.00",
  "mark_vol": "500",
  "oi": "15000",
  "oi_value": "1000000",
  "oi_value_symbol": "USD",
  "oi_value_usd": "1050000",
  "open": 67000,
  "price_band": {
    "lower_limit": "61120.45",
    "upper_limit": "72300.00"
  },
  "product_id": 123456,
  "quotes": {
    "ask_iv": "0.25",
    "ask_size": "100",
    "best_ask": "150.00",
    "best_bid": "148.00",
    "bid_iv": "0.22",
    "bid_size": "50"
  },
  "size": 100,
  "spot_price": "67000.00",
  "strike_price": "68000.00",
  "symbol": "BTCUSD",
  "timestamp": 1609459200,
  "turnover": 5000000,
  "turnover_symbol": "USD",
  "turnover_usd": 5200000,
  "volume": 25000
}

```

*The 'Ticker' object provides real-time trading data for a specific product, including prices, volumes, open interest, and Greek values (for options). This data is essential for analyzing market trends and asset performance.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|close|integer|false|none|The closing price of the last trade for the product.|
|contract_type|string|false|none|Comma-separated list of contract types, such as futures, perpetual_futures, call_options, put_options.|
|greeks|[greeks](#schemagreeks)|false|none|The Greeks represent different factors that influence the pricing of options. These are key measures for assessing risk and managing option positions.|
|high|number|false|none|The highest price reached during the trading session.|
|low|number|false|none|The lowest price reached during the trading session.|
|mark_price|string|false|none|The market price of the product, reflecting the most recent transaction.|
|mark_vol|string|false|none|The market volume at the most recent trade price.|
|oi|string|false|none|The open interest, or the number of outstanding contracts, for the product.|
|oi_value|string|false|none|The value of the open interest in the base currency.|
|oi_value_symbol|string|false|none|The symbol representing the currency of the open interest value.|
|oi_value_usd|string|false|none|The open interest value converted to USD.|
|open|number|false|none|The opening price at the start of the trading session.|
|price_band|[price_band](#schemaprice_band)|false|none|The price band defines the permissible price range for a product. The lower and upper limits represent the boundaries within which the product's price can fluctuate.|
|product_id|number|false|none|A unique identifier for the product.|
|quotes|[quotes](#schemaquotes)|false|none|The 'quotes' object contains the latest bid and ask prices, their respective implied volatilities (IV), and order sizes for an asset. It provides key market data for understanding liquidity and pricing.|
|size|number|false|none|The size of the most recent order executed in the market.|
|spot_price|string|false|none|The current spot price of the underlying asset.|
|strike_price|string|false|none|The strike price for options contracts associated with the product.|
|symbol|string|false|none|The ticker symbol for the product.|
|timestamp|number|false|none|The timestamp of the last trade or update to the ticker.|
|turnover|number|false|none|The total turnover (value traded) for the product during the trading session.|
|turnover_symbol|string|false|none|The symbol representing the currency in which the turnover is measured.|
|turnover_usd|number|false|none|The turnover value converted to USD.|
|volume|integer|false|none|The total trading volume for the product during the trading session.|

<h2 id="tocSarrayoftickers">ArrayOfTickers</h2>

<a id="schemaarrayoftickers"></a>

```json
[
  {
    "close": 67321,
    "contract_type": "futures",
    "greeks": {
      "delta": "0.25",
      "gamma": "0.10",
      "rho": "0.05",
      "theta": "-0.02",
      "vega": "0.15"
    },
    "high": 68500.5,
    "low": 66300.25,
    "mark_price": "67000.00",
    "mark_vol": "500",
    "oi": "15000",
    "oi_value": "1000000",
    "oi_value_symbol": "USD",
    "oi_value_usd": "1050000",
    "open": 67000,
    "price_band": {
      "lower_limit": "61120.45",
      "upper_limit": "72300.00"
    },
    "product_id": 123456,
    "quotes": {
      "ask_iv": "0.25",
      "ask_size": "100",
      "best_ask": "150.00",
      "best_bid": "148.00",
      "bid_iv": "0.22",
      "bid_size": "50"
    },
    "size": 100,
    "spot_price": "67000.00",
    "strike_price": "68000.00",
    "symbol": "BTCUSD",
    "timestamp": 1609459200,
    "turnover": 5000000,
    "turnover_symbol": "USD",
    "turnover_usd": 5200000,
    "volume": 25000
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Ticker](#schematicker)]|false|none|[The 'Ticker' object provides real-time trading data for a specific product, including prices, volumes, open interest, and Greek values (for options). This data is essential for analyzing market trends and asset performance.]|

<h2 id="tocSpaginationmeta">PaginationMeta</h2>

<a id="schemapaginationmeta"></a>

```json
{
  "after": "g3QAAAACZAAKY3JlYXRlZF9hdHQAAAAN",
  "before": "a2PQRSACZAAKY3JlYXRlZF3fnqHBBBNZL"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|after|string|false|none|after cursor for pagination; becomes null if page after the current one does not exist|
|before|string|false|none|before cursor for pagination; becomes null if page before the current one does not exist|

<h2 id="tocSohlcdata">OHLCData</h2>

<a id="schemaohlcdata"></a>

```json
{
  "time": 0,
  "open": 0,
  "high": 0,
  "low": 0,
  "close": 0,
  "volume": 0
}

```

*A ohlc object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|time|integer|false|none|none|
|open|number|false|none|none|
|high|number|false|none|none|
|low|number|false|none|none|
|close|number|false|none|none|
|volume|number|false|none|none|

<h2 id="tocSarrayofohlcdata">ArrayOfOHLCData</h2>

<a id="schemaarrayofohlcdata"></a>

```json
[
  {
    "time": 0,
    "open": 0,
    "high": 0,
    "low": 0,
    "close": 0,
    "volume": 0
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[OHLCData](#schemaohlcdata)]|false|none|[A ohlc object]|

<h2 id="tocSsparklinedata">SparklineData</h2>

<a id="schemasparklinedata"></a>

```json
{
  "ETHUSD": [
    [
      1594214051,
      0.00003826
    ],
    [
      1594214051,
      0.00003826
    ]
  ],
  "MARK:BTCUSD": [
    [
      1594215270,
      0.00003826
    ]
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|[integer]|false|none|array of timestamp and closing value|

<h2 id="tocSstats">Stats</h2>

<a id="schemastats"></a>

```json
{
  "last_30_days_volume": 0,
  "last_7_days_volume": 0,
  "total_volume": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|last_30_days_volume|integer|false|none|sum of turnover usd in the last 30 days|
|last_7_days_volume|integer|false|none|sum of turnover usd in the last 7 days|
|total_volume|integer|false|none|sum of turnover usd in the last 24 hours|

<h2 id="tocSmmpconfigupdaterequest">MMPConfigUpdateRequest</h2>

<a id="schemammpconfigupdaterequest"></a>

```json
{
  "asset": "string",
  "window_interval": 0,
  "freeze_interval": 0,
  "trade_limit": "string",
  "delta_limit": "string",
  "vega_limit": "string",
  "mmp": "mmp1"
}

```

*MMP config for an underlying*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|asset|string|false|none|none|
|window_interval|integer|false|none|Window interval in seconds|
|freeze_interval|integer|false|none|MMP freeze interval in seconds. Setting this to zero will require a manual reset once mmp is triggered.|
|trade_limit|string|false|none|Notional trade limit for mmp to trigger (in USD)|
|delta_limit|string|false|none|Delta Adjusted notional trade limit for mmp to trigger (in USD)|
|vega_limit|string|false|none|vega traded limit for mmp to trigger (in USD)|
|mmp|string|false|none|Specify mmp flag for the config update|

#### Enumerated Values

|Property|Value|
|---|---|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|

<h2 id="tocSmmpresetrequest">MMPResetRequest</h2>

<a id="schemammpresetrequest"></a>

```json
{
  "asset": "string",
  "mmp": "mmp1"
}

```

*MMP config for an underlying*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|asset|string|false|none|none|
|mmp|string|false|none|specify mmp flag to reset|

#### Enumerated Values

|Property|Value|
|---|---|
|mmp|mmp1|
|mmp|mmp2|
|mmp|mmp3|
|mmp|mmp4|
|mmp|mmp5|

<h2 id="tocSchangemarginmoderequest">ChangeMarginModeRequest</h2>

<a id="schemachangemarginmoderequest"></a>

```json
{
  "margin_mode": "isolated",
  "subaccount_user_id": "5112346"
}

```

*Request to change the margin mode for a main or subaccount.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|margin_mode|string|false|none|The target margin mode: 'isolated' or 'portfolio'.|
|subaccount_user_id|string|false|none|The user ID of the account. Provide the main user ID for the main account or the respective subaccount user ID.|

#### Enumerated Values

|Property|Value|
|---|---|
|margin_mode|isolated|
|margin_mode|portfolio|

<h2 id="tocSuserpreference">UserPreference</h2>

<a id="schemauserpreference"></a>

```json
{
  "user_id": 57354187,
  "default_auto_topup": true,
  "mmp_config": null,
  "deto_for_commission": false,
  "vip_level": 0,
  "vip_discount_factor": "0.00",
  "volume_30d": "1060.675333",
  "email_preferences": {
    "adl": true,
    "liquidation": true,
    "margin_topup": false,
    "marketing": true,
    "order_cancel": true,
    "order_fill": true,
    "stop_order_trigger": true
  },
  "notification_preferences": {
    "adl": true,
    "liquidation": true,
    "margin_topup": false,
    "marketing": true,
    "order_cancel": false,
    "order_fill": true,
    "price_alert": true,
    "stop_order_trigger": true
  },
  "price_alert_assets": [
    "BTC",
    "ETH"
  ],
  "enabled_portfolios": {},
  "interest_credit": false
}

```

*User trading preferences*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_id|integer|false|none|Unique identifier for the user|
|default_auto_topup|boolean|false|none|Default auto top-up setting for newly acquired positions (only for isolated mode)|
|mmp_config|object¦null|false|none|Config object for market maker protection (only for MMP-enabled accounts)|
|deto_for_commission|boolean|false|none|Flag to determine whether to pay commissions in DETO|
|vip_level|integer|false|none|VIP level for this account. Customers get better fee discounting for higher VIP levels|
|vip_discount_factor|string|false|none|Discount factor based on the VIP level|
|volume_30d|string|false|none|30-day trading volume for the user|
|email_preferences|object|false|none|Email preferences for different events|
|» adl|boolean|false|none|none|
|» liquidation|boolean|false|none|none|
|» margin_topup|boolean|false|none|none|
|» marketing|boolean|false|none|none|
|» order_cancel|boolean|false|none|none|
|» order_fill|boolean|false|none|none|
|» stop_order_trigger|boolean|false|none|none|
|notification_preferences|object|false|none|Notification preferences for different events|
|» adl|boolean|false|none|none|
|» liquidation|boolean|false|none|none|
|» margin_topup|boolean|false|none|none|
|» marketing|boolean|false|none|none|
|» order_cancel|boolean|false|none|none|
|» order_fill|boolean|false|none|none|
|» price_alert|boolean|false|none|none|
|» stop_order_trigger|boolean|false|none|none|
|price_alert_assets|[string]|false|none|Assets for which price alerts are set|
|enabled_portfolios|object|false|none|Enabled portfolios for the user|
|interest_credit|boolean|false|none|Whether the user is receiving interest credits|

<h2 id="tocSedituserpreference">EditUserPreference</h2>

<a id="schemaedituserpreference"></a>

```json
{
  "default_auto_topup": true,
  "showMarketOrdersForOptionsInBracket": true,
  "interest_credit": false,
  "email_preferences": {
    "adl": true,
    "liquidation": true,
    "order_fill": true,
    "stop_order_trigger": true,
    "order_cancel": true,
    "marketing": true
  },
  "notification_preferences": {
    "adl": false,
    "liquidation": true,
    "order_fill": true,
    "stop_order_trigger": true,
    "price_alert": true,
    "marketing": true
  }
}

```

*Edit User Preference Object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|default_auto_topup|boolean|false|none|Default auto top-up setting for newly acquired positions|
|showMarketOrdersForOptionsInBracket|boolean|false|none|Flag to display market orders for options in bracket orders|
|interest_credit|boolean|false|none|Whether the user is receiving interest credits|
|email_preferences|object|false|none|Email preferences for different events|
|» adl|boolean|false|none|none|
|» liquidation|boolean|false|none|none|
|» order_fill|boolean|false|none|none|
|» stop_order_trigger|boolean|false|none|none|
|» order_cancel|boolean|false|none|none|
|» marketing|boolean|false|none|none|
|notification_preferences|object|false|none|Notification preferences for different events|
|» adl|boolean|false|none|none|
|» liquidation|boolean|false|none|none|
|» order_fill|boolean|false|none|none|
|» stop_order_trigger|boolean|false|none|none|
|» price_alert|boolean|false|none|none|
|» marketing|boolean|false|none|none|

<h2 id="tocScancelafterrequest">CancelAfterRequest</h2>

<a id="schemacancelafterrequest"></a>

```json
{
  "cancel_after": "5000"
}

```

*Cancel After Request Object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cancel_after|string|false|none|Timer value in milliseconds after which orders are to be cancelled. To disable deadman switch and keep your orders open, set cancel_after to 0.|

<h2 id="tocScancelafterresponse">CancelAfterResponse</h2>

<a id="schemacancelafterresponse"></a>

```json
{
  "cancel_after_enabled": "true",
  "cancel_after_timestamp": "1669119262000"
}

```

*Cancel After Response Object*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cancel_after_enabled|string|false|none|none|
|cancel_after_timestamp|string|false|none|timestamp after which orders will get cancelled|

#### Enumerated Values

|Property|Value|
|---|---|
|cancel_after_enabled|false|
|cancel_after_enabled|true|

<h2 id="tocSuser">User</h2>

<a id="schemauser"></a>

```json
{
  "id": "98765432",
  "email": "rajtrader2342@gmail.com",
  "account_name": "Main",
  "first_name": "Rajesh",
  "last_name": "Sharma",
  "dob": "1985-08-25",
  "country": "India",
  "phone_number": "9876543210",
  "margin_mode": "isolated",
  "pf_index_symbol": ".DEXBTUSD",
  "is_sub_account": false,
  "is_kyc_done": true
}

```

*Represents a user account with personal and account-related details.*

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|Unique user identifier, which can be an integer or string.|
|email|string|false|none|User's email address.|
|account_name|string|false|none|The main account or subaccount name.|
|first_name|string|false|none|User's first name.|
|last_name|string|false|none|User's last name.|
|dob|string(date)|false|none|Date of birth in YYYY-MM-DD format.|
|country|string|false|none|User's country of residence.|
|phone_number|string|false|none|User's phone number with country code.|
|margin_mode|string|false|none|The user's margin mode, which can be 'isolated' or 'portfolio'.|
|pf_index_symbol|string|false|none|Portfolio index symbol if the account is in portfolio margin mode.|
|is_sub_account|boolean|false|none|Indicates if the user account is a sub-account.|
|is_kyc_done|boolean|false|none|Indicates if the user's KYC verification is completed.|

<h2 id="tocSarrayofsubaccouns">ArrayOfSubaccouns</h2>

<a id="schemaarrayofsubaccouns"></a>

```json
[
  {
    "id": "98765432",
    "email": "rajtrader2342@gmail.com",
    "account_name": "Main",
    "first_name": "Rajesh",
    "last_name": "Sharma",
    "dob": "1985-08-25",
    "country": "India",
    "phone_number": "9876543210",
    "margin_mode": "isolated",
    "pf_index_symbol": ".DEXBTUSD",
    "is_sub_account": false,
    "is_kyc_done": true
  }
]

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|[Represents a user account with personal and account-related details.]|

