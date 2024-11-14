# Websocket Feed

Websocket api can be used for the following use cases

- Get real time feed of market data, this includes L2 and L3 orderbook and recent trades.
- Get price feeds - Mark prices of different contracts, price feed of underlying indexes etc.
- Get account specific notifications like fills, liquidations, [ADL](https://www.delta.exchange/user-guide/docs/trading-guide/ADL/) and PnL updates.
- Get account specific updates on orders ,positions and wallets.

Access url for Delta Exchange India

- **Production-India** - wss://socket.india.delta.exchange
- **Testnet-India** - wss://socket-ind.testnet.deltaex.org

Access url for Delta Exchange Global

- **Production-Global** - wss://socket.delta.exchange
- **Testnet-Global** - wss://testnet-socket.delta.exchange


 You will be disconnected, if there is no activity within 60 seconds after making connection.

# Subscribing to Channels

## Subscribe

To begin receiving feed messages, you must first send a subscribe message to the server indicating which channels and contracts to subscribe for.

To specify contracts within each channel, just pass a list of symbols inside the channel payload. Mention ***["all"]*** in symbols if you want to receive updates across all the contracts. Please note that snapshots are sent only for specified symbols,meaning no snapshots are sent for symbol: ***"all"***.

Once a subscribe message is received the server will respond with a subscriptions message that lists all channels you are subscribed to. Subsequent subscribe messages will add to the list of subscriptions. 

> Subscription Sample

```
// Request
// Subscribe to BTCUSD_28Dec and ETHBTC_28Dec with the ticker and orderbookL2 channels,
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "ticker",
                "symbols": [
                    "BTCUSD_28Dec",
                    "ETHBTC_28Dec"
                ]
            },
            {
                "name": "l2_orderbook",
                "symbols": [
                    "BTCUSD_28Dec"
                ]
            },
            {
                "name": "funding_rate",
                "symbols": [
                    "all"
                ]
            }
        ]
    }
}

// Response
{
    "type": "subscriptions",
    "channels": [
        {
            "name": "l2_orderbook",
            "symbols": [
                "BTCUSD_28Dec"
            ],
        },
        {
            "name": "ticker",
            "symbols": [
                "BTCUSD_28Dec",
                "ETHBTC_28Dec"
            ]
        },
        {
            "name": "funding_rate",
            "symbols": [
                "all"
            ]
        }
    ]
}

// Error Response 
{
    "type": "subscriptions",
    "channels": [
        {
            "name": "l2_orderbook",
            "symbols": [
                "BTCUSD_28Dec"
            ],
        },
        {
            "name": "trading_notifications",
            "error": "subscription forbidden on trading_notifications. Unauthorized user"
        }
    ]
}
```


## Unsubscribe

If you want to unsubscribe from channel/contracts pairs, send an "unsubscribe" message. The structure is equivalent to subscribe messages. If you want to unsubscribe for specific symbols in a channel, you can pass it in the symbol list. As a shorthand you can also provide no symbols for a channel, which will unsubscribe you from the channel entirely.

> Unsubscribe Sample

```
// Request
{
    "type": "unsubscribe",
    "payload": {
        "channels": [
            {
                "name": "ticker",          // unsubscribe from ticker channel only for BTCUSD_28Dec
                "symbols": [
                    "BTCUSD_28Dec"
                ]
            },
            {
                "name": "l2_orderbook"      // unsubscribe from all symbols for l2_orderbook channel
            }
        ]
    }
}
```

## Authenticating a connection

Authentication allows clients to receives private messages, like trading notifications. Examples of the trading notifications are: fills, liquidations, [adl](/#trading-notitifications) and pnl updates.

To authenticate, you need to send a signed request of type 'auth' on your socket connection. Check the authentication section above for more details on how to sign a request using api key and secret.

The payload for the signed request will be
'GET' + timestamp + '/live'

To subscribe to private channels, the client needs to first send an auth event, providing api-key, and signature. 

> Authentication sample

```python
// auth message with signed request
import websocket
import hashlib
import hmac
import base64

api_key = 'a207900b7693435a8fa9230a38195d'
api_secret = '7b6f39dcf660ec1c7c664f612c60410a2bd0c258416b498bf0311f94228f'

def generate_signature(secret, message):
    message = bytes(message, 'utf-8')
    secret = bytes(secret, 'utf-8')
    hash = hmac.new(secret, message, hashlib.sha256)
    return hash.hexdigest()

def get_time_stamp():
    d = datetime.datetime.utcnow()
    epoch = datetime.datetime(1970,1,1)
    return str(int((d - epoch).total_seconds()))

# Get open orders
method = 'GET'
timestamp = get_time_stamp()
path = '/live'
signature_data = method + timestamp + path
signature = generate_signature(api_secret, signature_data)


ws = websocket.WebSocketApp('wss://api.delta.exchange:2096')
ws.send(json.dumps({
    "type": "auth",
    "payload": {
        "api-key": api_key,
        "signature": signature,
        "timestamp": timestamp
    }
}))
```

```nodejs

```

To unsubscribe from all private channels, just send a 'unauth' message on the socket. This will automatically unsubscribe the connection from all authenticated channels.

```python
ws.send(json.dumps({
    "type": 'unauth',
    "payload": {}
}))

```

# Detecting Connection Drops
Some client libraries might not detect connection drops properly. We provide two methods for the clients to ensure they are connected and getting subscribed data.

## Heartbeat (Recommended)
The client can enable heartbeat on the socket. If heartbeat is enabled, the server is expected to periodically send a heartbeat message to the client. Right now, the heartbeat time is set to 30 seconds. 

### How to Implement on client side

- Enable heartbeat (check sample code) after each successful socket connection
- Set a timer with duration of 35 seconds (We take 5 seconds buffer for heartbeat to arrive).
- When you receive a new heartbeat message, you reset the timer
- If the timer is called, that means the client didn't receive any heartbeat in last 35 seconds. In this case, the client should exit the existing connection and try to reconnect. 

```
// Enable Heartbeat on successful connection
ws.send({
    "type": "enable_heartbeat"
})

// Disable Heartbeat
ws.send({
    "type": "disable_heartbeat"
})

// Sample Heartbeat message received periodically by client
{
    "type": "heartbeat"
}
```


## Ping/Pong
The client can periodically (~ every 30 seconds) send a ping frame or a raw ping message and the server will respond back with a pong frame or a raw pong response. If the client doesn't receive a pong response in next 5 seconds, the client should exit the existing connection and try to reconnect. 

```
// Ping Request
ws.send({
    "type": "ping"
})

// Pong Response
ws.send({
    "type": "pong"
})
```

# Public Channels

## v2 ticker

The ticker channel provides **price change data** for the last **24 hrs** (rolling window).  
It is published every **5 seconds**.

To subscribe to the ticker channel, you need to send the list of **symbols** for which you would like to receive updates.

You can also subscribe to ticker updates for a **category of products** by sending a list of [category names](/#schemaproductcategories).  
For example, to receive updates for **put options** and **futures**, use the following format:  
```
{"symbols": ["put_options", "futures"]}
```

If you would like to subscribe to all listed contracts, pass:  
```
{ "symbols": ["all"] }
```

**Important:**  
If you subscribe to the ticker channel without specifying a symbols list, you will **not** receive any data.

> **Ticker Sample**

```json
// Subscribe to specific symbol
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "v2/ticker",
                "symbols": [
                    "BTCUSD_28Dec"
                ]
            }
        ]
    }
}

// Subscribe to all symbols
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "v2/ticker",
                "symbols": [
                    "all"
                ]
            }
        ]
    }
}
```

```json
// Response
{
    "open": 0.00001347, // The price at the beginning of the 24-hour period
    "close": 0.00001327, // The price at the end of the 24-hour period
    "high": 0.00001359, // The highest price during the 24-hour period
    "low": 0.00001323, // The lowest price during the 24-hour period
    "mark_price": "0.00001325", // The current market price
    "mark_change_24h": "-0.1202", // Percentage change in market price over the last 24 hours
    "oi": "812.6100", // Open interest, indicating the total number of outstanding contracts
    "product_id": 56, // The unique identifier for the product
    "quotes": {
        "ask_iv": "0.25", // Implied volatility for the ask price (if available)
        "ask_size": "922", // The size of the ask (the amount available for sale)
        "best_ask": "3171.5", // The best ask price (the lowest price at which the asset is being offered)
        "best_bid": "3171.4", // The best bid price (the highest price a buyer is willing to pay)
        "bid_iv": "0.25", // Implied volatility for the bid price (if available)
        "bid_size": "191", // The size of the bid (the amount a buyer is willing to purchase)
        "impact_mid_price": "61200", // Mid price impact, if available (the price midpoint between the best bid and ask)
        "mark_iv": "0.29418049" // Mark volatility (volatility of the asset used for mark price calculation)
    },
    "greeks": { // Options-related metrics, will be null for Futures and Spot products
        "delta": "0.01939861", // Rate of change of the option price with respect to the underlying asset's price
        "gamma": "0.00006382", // Rate of change of delta with respect to the underlying asset's price
        "rho": "0.00718630", // Rate of change of option price with respect to interest rate
        "spot": "63449.5", // The current spot price of the underlying asset
        "theta": "-81.48397021", // Rate of change of option price with respect to time (time decay)
        "vega": "0.72486575" // Sensitivity of the option price to volatility changes
    },
    "size": 1254631, // Number of contracts traded
    "spot_price": "0.00001326", // Spot price at the time of the ticker
    "symbol": "BTCUSD_28Dec", // The symbol of the contract
    "timestamp": 1595242187705121, // The timestamp of the data (in microseconds)
    "turnover": 16.805033569999996, // The total turnover in the settling symbol
    "turnover_symbol": "BTC", // The symbol used for settling
    "turnover_usd": 154097.09108233, // The turnover value in USD
    "volume": 1254631 // Total volume, defined as contract value * size
}
```

## l1_orderbook

**l1_orderbook** channel provides level1 orderbook updates. You need to send the list of symbols for which you would like to subscribe to L1 orderbook. You can also subscribe to 
orderbook updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to L1 channel without specifying the symbols list, you will not receive any data.  
Publish interval: 100 millisecs  
Max interval (in case of same data): 5 secs

> L1 Orderbook Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l1_orderbook",
                "symbols": [
                    "ETHUSDT"
                ]
            }
        ]
    }
}
```

```
// l1 orderbook Response
{
  "ask_qty":"839",
  "best_ask":"1211.3",
  "best_bid":"1211.25",
  "bid_qty":"772",
  "last_sequence_no":1671603257645135,
  "last_updated_at":1671603257623000,
  "product_id":176,"symbol":"ETHUSDT",
  "timestamp":1671603257645134,
  "type":"l1_orderbook"
}
```

## l1ob

**l1ob** channel provides best ask and bid price, size updates in the orderbook. You need to send the list of symbols for which you would like to subscribe. If best ask/bid data is same for a symbol, same data will only be sent after the max interval (stated below) has passed since that symbol's data was last sent.
Please note that if you subscribe to l1ob channel without specifying the symbols list, you will not receive any data.  
Publish interval: 100 millisecs  
Max interval (in case of same data): 5 secs

> l1ob subscribe Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l1ob",
                "symbols": [
                    "BTCUSDT",
                    "C-BTC-42000-260124"
                ]
            }
        ]
    }
}
```

```
// l1ob sample Response
{
  "type":"l1ob",
  "s":"BTCUSDT",  //product symbol
  "d": ["37026.2","2133","37025.6","1977"],  
  // [BestAskPrice, BestAskSize, BestBidPrice, BestBidSize]
  // Price and Size will be null for the side with no orders.
  "t": 1701157803668868, //message publish time in microsec
  "T": 1701157444959989  //orderbook update time in microsec
}
```

## l1ob_c

**l1ob_c** channel provides best ask and bid price, size updates in the orderbook for an Option chain. You can subscribe to a Asset_Expiry. e.g. To subscribe to data for all BTC Options expiring on 26th January 2024, send "BTC_260124". If best ask/bid data is same for a symbol, same data will only be sent after the max interval (stated below) has passed since that symbol's data was last sent.
The data is Brotli compressed and in base64 encoded string format, to use this data first Brotli decompress to get a list of json. 
Please note that if you subscribe to l1ob_c channel without specifying the Asset_Expiry list, you will not receive any data.  
Publish interval: 100 millisecs  
Max interval (in case of same data): 5 secs

> l1ob_c subscribe Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l1ob_c",
                "symbols": [
                    "BTC_260124",
                    "BTC_270124"
                ]
            }
        ]
    }
}
```

```
// l1ob_c Response
{
  "type":"l1ob_c",
  "s":"BTC_011223",  //Asset_Expiry
  "c": "G6gA+B0HzjnKz3E2icneQi2yFbPX1mbq5Ok9j49QZ6iGuNDWLDpdfWEDjinwATeecMOF7GTgAjJOddfahjsUbHpW6fEp4spZhjoMQTFpZEo2fjnjvWcEAQyUk2E32VVd3ssdudqRE61qupUB",  
  //Brotli decompress this to get the below json.
  "t": 1701157556471116  //message publish time
}

//Brotli decompressed data format
[{
    "T":1701105329216885,  //orderbook update time in microsec
    "s":"C-BTC-32000-081223",  //product symbol
    "d":["5246.8","593","5053.2","6655"]  // [BestAskPrice, BestAskSize, BestBidPrice, BestBidSize]
},
{
    "T":1701105298898194,
    "d":["1064.8","593","936.0","989"],
    "s":"C-BTC-37500-081223"
}, ...
]
```


## l2_orderbook

**l2_orderbook** channel provides the complete level2 orderbook for the sepecified list of symbols at a pre-determined frequency. The frequency of updates may vary for different symbols. You can only subscribe to upto 20 symbols on a single connection. Unlike L1 orderbook channel, L2 orderbook channel does not accept product category names or "all" as valid symbols. 
Please note that if you subscribe to L2 channel without specifying the symbols list, you will not receive any data.  
Publish interval: 1 sec  
Max interval (in case of same data): 10 secs

> L2 Orderbook Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l2_orderbook",
                "symbols": [
                    "ETHUSDT"
                ]
            }
        ]
    }
}
```

```
// l2 orderbook Response
{
  "type":"l2_orderbook"
  "symbol":"ETHUSDT",
  "product_id": 176,
  "buy": [
    {
        "limit_price":"101.5",
        "size":10,              // For Futures & Options: number of contracts integer. Spot product: Asset token quantity in string.
        "depth":"10"            // total size from best bid
    },
    ...
  ],
  "sell": [
    {
        "limit_price":"102.0",
        "size":20,
        "depth":"20"            // total size from best ask
    },
    ...
  ],
  "last_sequence_no": 6435634,
  "last_updated_at": 1671600133884000,
  "timestamp":1671600134033215,
}
```

## l2_updates

**l2_updates** channel provides initial snapshot and then incremental orderbook data. The frequency of updates may vary for different symbols. You can only subscribe to upto 100 symbols on a single connection. l2_updates channel does not accept product category names or "all" as valid symbols. 
Please note that if you subscribe to l2_updates channel without specifying the symbols list, you will not receive any data.  
Publish interval: 100 millisecs  
"action"="update" messages wont be published till there is an orderbook change.

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "l2_updates",
                "symbols": [
                    "BTCUSDT"
                ]
            }
        ]
    }
}

// Initial snapshot response
{
  "action":"snapshot",
  "asks":[["16919.0", "1087"], ["16919.5", "1193"], ["16920.0", "510"]],
  "bids":[["16918.0", "602"], ["16917.5", "1792"], ["16917.0", "2039"]],
  "timestamp":1671140718980723,
  "sequence_no":6199,
  "symbol":"BTCUSDT",
  "type":"l2_updates",
  "cs":2178756498
}

// Incremental update response
{
  "action":"update",
  "asks":[["16919.0", "0"], ["16919.5", "710"]],
  "bids":[["16918.5", "304"]],
  "sequence_no":6200,
  "symbol":"BTCUSDT",
  "type":"l2_updates",
  "timestamp": 1671140769059031,
  "cs":3409694612
}

// Error response
{
  "action":"error",
  "symbol":"BTCUSDT",
  "type":"l2_updates",
  "msg":"Snapshot load failed. Verify if product is live and resubscribe after a few secs."
}
```

### How to maintain orderbook locally using this channel:

1) When you subscribe to this channel, the first message with "action"= "snapshot" resembles the complete l2_orderbook at this time. "asks" and "bids" are arrays of ["price", "size"]. (size is number of contracts at this price)

2) After the initial snapshot, messages will be with "action" = "update", resembling the difference between current and previous orderbook state. "asks" and "bids" are arrays of ["price", "new size"]. "asks" are sorted in increasing order of price. "bids" are sorted in decreasing order of price. This is true for both "snapshot" and "update" messages.

3) "sequence_no" field must be used to check if any messages were dropped. "sequence_no" must be +1 of the last message.  
e.g. In the snapshot message it is 6199, and the update message has 6200. The next update message must have 6201. In case of sequence_no mismatch, resubscribe to the channel, and start from the beginning.

4) If sequence_no is correct, edit the in-memory orderbook using the "update" message.  
Case 1: price already exists, new size is 0 -> Delete this price level.  
Case 2: price already exists, new size isn't 0 -> Replace the old size with new size.  
Case 3: price doesn’t exists -> insert the price level.  
e.g. for the shown snapshot and update messages to create the new orderbook: in the ask side, price level of "16919.0" will be deleted. Size at price level "16919.5" will be changed from "1193" to "710". In the bids side there was no price level of "16918.5", so add a new level of "16918.5" of size "304". Other price levels from the snapshot will remain the same.

5) If "action":"error" message is received, resubscribe this symbol after a few seconds. Can occur in rare cases, e.g. Failed to send "action":"snapshot" message after subscribing due to a race condition, instead an "error" message will be sent.

Checksum: Using this, users can verify the accuracy of orderbook data created using l2_updates. checksum is the "cs" key in the message payload.  
Steps to calculate checksum:  
1) Edit the old in-memory orderbook with the "update" message received.  
2) Create asks_string and bids_string as shown below. where priceN = price at Nth level, sizeN = size at Nth level. Asks are sorted in increasing order and bids in decreasing order by price.  
asks_string = price0:size0,price1:size1,…,price9:size9  
bids_string = price0:size0,price1:size1,…,price9:size9  
checksum_string = asks_string + "|" + bids_string  
Only consider the first 10 price levels on both sides. If orderbook as less than 10 levels, use only them.  
e.g. If after applying the update, the new orderbook becomes ->  
asks = [["100.00", "23"], ["100.05", "34"]]  
bids = [["99.04", "87"], ["98.65", "102"], ["98.30", "16"]]  
checksum_string = "100.00:23,100.05:34|99.04:87,98.65:102,98.30:16"  
3) Calculate the CRC32 value (32-bit unsigned integer) of checksum_string. This should be equal to the checksum provided in the “update” message.

## all_trades

**all_trades** channel provides a real time feed of all trades (fills).
You need to send the list of symbols for which you would like to subscribe to all trades channel. After subscribing to this channel, you get a snapshot of last 50 trades and then trade data in real time. You can also subscribe to
all trades updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to all_trades channel without specifying the symbols list, you will not receive any data.

> All Trades Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "all_trades",
                "symbols": [
                    "BTCUSDT"
                ]
            }
        ]
    }
}
```

```
// All Trades Response Snapshot
{
    "symbol": "BTCUSDT",
    "type": "all_trades_snapshot",          // "type" is not "all_trades"
    "trades": [                             // Recent trades list
        {
            "buyer_role": "maker",
            "seller_role": "taker",
            "size": 53,                     // size in contracts
            "price": "25816.5",
            "timestamp": 1686577411879974   // time of the trade.
        },
        ... // More recent trades.
    ]
}
```

```
// All Trades Response
{
    symbol: "BTCUSDT",
    price: "25816.5",
    size: 100,
    type: "all_trades",
    buyer_role: "maker",
    seller_role: "taker",
    timestamp: 1686577411879974
}
```



## mark_price

**mark_price** channel provides mark price updates at a fixed interval. This is the price on which all open positions are marked for liquidation.Please note that the product symbol is prepended with a "MARK:" to subscribe for mark price.  
You need to send the list of symbols for which you would like to subscribe to mark price channel. You can also subscribe to 
mark price updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.  
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.  
You can also subscribe to a Options chain, by passing 'Asset-Expiry', e.g. `{"symbols": ["BTC-310524"] }` will subscribe to all BTC Options expirying on 31st May 2024.  
Please note that if you subscribe to mark price channel without specifying the symbols list, you will not receive any data.  
Publish interval: 2 secs.


> Mark Price Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "mark_price",
                "symbols": [
                    "MARK:C-BTC-13000-301222"
                ]
            }
        ]
    }
}
```

```
// Mark Price Response
{
    "ask_iv":null,
    "ask_qty":null,
    "best_ask":null,
    "best_bid":"9532",
    "bid_iv":"5.000",
    "bid_qty":"896",
    "delta":"0",
    "gamma":"0",
    "implied_volatility":"0",
    "price":"3910.088012",
    "price_band":{"lower_limit":"3463.375340559572217228510815","upper_limit":"4354.489445440427782771489185"},
    "product_id":39687,
    "rho":"0",
    "symbol":"MARK:C-BTC-13000-301222",
    "timestamp":1671867039712836,
    "type":"mark_price",
    "vega":"0"
}
```

## spot_price

**spot_price** channel provides a real time feed of the underlying index prices. Specifying symbols when subscribing to spot_price is necessary to receive updates. No updates are sent for symbol: ***"all"***

> Spot Price Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "spot_price",
                "symbols": [
                    ".DEBNBBTC"
                ]
            }
        ]
    }
}
```

```
// Spot Price Response
{
    symbol: ".DEBNBBTC",
    price: "0.0014579",
    type: "spot_price"
}
```

## v2/spot_price

**v2/spot_price** channel publishes data of underlying index prices at a fixed interval. Specifying symbols when subscribing to v2/spot_price is necessary to receive updates. No updates are sent for symbol: ***"all"***  
Publish interval: 1 sec  

> v2/spot_price Subscribe

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "v2/spot_price",
                "symbols": [
                    ".DEETHUSDT"
                ]
            }
        ]
    }
}
```

```
// Response
{
    s: ".DEETHUSDT",   # spot index symbol
    p: 1349.3412141,   # spot price
    type: "v2/spot_price"
}
```

## spot_30mtwap_price

**spot_30mtwap_price** channel provides a real time feed of the 30 min twap of underlying index prices. 
This is the price used for settlement of options. Specifying symbols when subscribing to spot_30mtwap_price is necessary to receive updates. No updates are sent for symbol: ***"all"***

> Spot Price 30mtwap Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "spot_30mtwap_price",
                "symbols": [
                    ".DEXBTUSDT"
                ]
            }
        ]
    }
}
```

```
// Spot 30 minutes twap Price Response
{
    symbol: ".DEXBTUSDT",
    price: "0.0014579",
    type: "spot_30mtwap_price",
    timestamp: 1561634049751430
}
```

## funding_rate

**funding_rate** channel provides a real time feed of funding rates for perpetual contracts.

You need to send the list of symbols for which you would like to subscribe to funding rate channel. You can also subscribe to funding rate updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to funding rate channel without specifying the symbols list, you will not receive any data.

> Funding Rate Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "funding_rate",
                "symbols": [
                    "BTCUSDT"
                ]
            }
        ]
    }
}
```

```
// Funding Rate Response
{
    symbol: "BTCUSDT",
    product_id: 139,
    type: "funding_rate",
    funding_rate: 0.005701298078111892,  // %
    funding_rate_8h: 0.005701298078111892, // %
    next_funding_realization: 1683734400000000 // %
    predicted_funding_rate: 0.007221329334075148, // in us
    timestamp: 1683711930547419   // in us
}
```

## product_updates
This channel provides updates when markets are disrupted and resumed. On opening, we conduct a single price auction and auction starting and finish events are also published on this channel. To subscribe, you dont need to pass the symbol list. This channel automatically subscribes to all markets by default.

>  Product Updates Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "product_updates"
            }
        ]
    }
}
```

```
// Market Disruption Response
{
    "type":"product_updates",
    "event":"market_disruption",
    "product":{
        "id":17,
        "symbol":"NEOUSDQ",
        "trading_status":"disrupted_cancel_only",
    },
    "timestamp": 1561634049751430,
}

// Auction Started Response
{
    "type":"product_updates",
    "event":"start_auction",
    "product":{
        "id":17,
        "symbol":"NEOUSDQ",
        "trading_status":"disrupted_post_only",
    },
    "timestamp": 1561634049751430,
}

// Auction Finished Response
{
    "type":"product_updates",
    "event":"finish_auction",
    "product":{
        "id":17,
        "symbol":"NEOUSDQ",
        "trading_status":"operational",
    },
    "timestamp": 1561634049751430,
}
```
### Market Disruption
When markets are disrupted, orderbook enters into cancel only mode. You can refer to "trading_status" field in product info to determine this. In cancel only mode, you can only cancel your orders. No matching happens in this mode.

### Auction Started
When markets need to come up, we conduct a single price auction. In this case, orderbook enters into post only mode. In post only mode, you can post new orders, cancel exisiting orders, add more margin to open positions. No matching happens in this mode. It is possible to see an overlap between asks and bids during this time.


### Auction Finished
When auction finishes, markets enter into operational mode and trading continues as usual. 

You can read more about the single price auction [here](https://www.delta.exchange/blog/bootstrapping-liquidity-using-auctions/)


## announcements
This channel provides updates on system wide announcements like scheduled maintenance, new contract launches etc. No need to pass any symbols while subscribing to this channel.

> Announcements Sample


```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "announcements"
            }
        ]
    }
}
```

```
// Maintenance Started Response
{
    "type":"announcements",
    "event":"maintenance_started",
    "maintenance_finish_time": 1561638049751430,
    "timestamp": 1561634049751430,
}

// Maintenance Finished Response
{
    "type":"announcements",
    "event":"maintenance_finished",
    "timestamp": 1561634049751430,
}
```

## candlesticks
This channel provides last ohlc candle for given time resolution.

Subscribe to **candlestick_${resolution}** channel for updates. 

List of supported resolutions
["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","2w","30d"]
 
You need to send the list of symbols for which you would like to subscribe to candlesticks channel. You can also subscribe to candlesticks
updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
Please note that if you subscribe to candlsticks channel without specifying the symbols list, you will not receive any data.

>OHLC candles update sample

```
Sample Subscribe Request
{
  "name": "candlestick_1m",                 // "candlestick_" + resolution
  "symbols": [ "BTCUSDT" ]        // product symbol
}



Sample feed response

{
    "candle_start_time": 1596015240000000,
    "close": 9223,
    "high": 9228,
    "low": 9220,
    "open": 9221,
    "resolution": "1m",
    "symbol": "BTCUSDT",
    "timestamp": 1596015289339699,
    "type": "candlestick_1m",
    "volume": 1.2
}
```

# Private Channels

Private channels require clients to authenticate.

## Margins
This channel provides updates on wallet balances. Updates are sent for a specific asset whenever there is a change in wallet balances and margins for that asset. 

> Margins Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "margins"
            }
        ]
    }
}
```
```
// margin update
{
    "action": "update",
    "asset_id": 2,                           // BTC
    "asset_symbol": "BTC",                   // BTC
    "available_balance": "9.385",            // Available balance for trading = balance - blocked_margin
    "available_balance_for_robo": "9.385",   // Available balance for robo trading = balance - blocked_margin
    "balance": "10",                         // Wallet balance = deposits - withdrawals + realised_cashflows
    "blocked_margin": "0.615",               // Total Margin blocked
    "commission": "0.001",                   // Commissions blocked in isolated margined positions and orders
    "cross_asset_liability": "0",            // Liability between asset in cross margin mode
    "cross_commission": "0.002",             // Commissions blocked in cross margined positions and orders
    "cross_locked_collateral": "0.003",      // Balance blocked for collateral
    "cross_order_margin": "0.004",           // Margin blocked in cross margined open orders
    "cross_position_margin": "0.005",        // Margin blocked in cross margined positions
    "id": 1,                                 // Wallet Id
    "interest_credit": "0",                  // Interest credited
    "order_margin": "0.1",                   // Margin blocked in isolated margined open orders
    "pending_referral_bonus": "0",           // Bonus pending
    "pending_trading_fee_credit": "0",       // Pending trading fee to credit
    "portfolio_margin": "0.2",               // Margin blocked for portfolio margined positions and orders. Same as blocked margin in portfolio margins channel.
    "position_margin": "0.3",                // Margin blocked in isolated margined positions
    "robo_trading_equity": "0",              // Equity for robo trading
    "timestamp": 1719397302569921,           // Unix timestamp in microseconds
    "trading_fee_credit": "0",               // Trading fee credited
    "type": "margins",                       // Margins channel
    "unvested_amount": "0",                  // Amount locked. Relevant only for DETO
    "user_id": 1                             // User id
}
```


## Positions
This channel provides updates whenever there is any change in your open positions.

A snapshot of current open position will be sent after subscribing a symbol, incremental updates will be sent on trade executions.
You need to send the list of symbols for which you would like to subscribe to positions channel. You can also subscribe to positions 
updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to positions channel without specifying the symbols list, you will not receive any data.

> Positions Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "positions",
                "symbols": ["BTCUSD_29Mar"]
            }
        ]
    }
}

//Subscribe for all the symbols
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "positions",
                "symbols": ["all"]
            }
        ]
    }
}
```

```
// Position update
{
    "type": "positions",
    "action": "",                       // "create"/"update"/"delete"
    "reason": "",                       // null, "auto_topup"
    "symbol": "BTCUSD_29Mar",           // Product Symbol
    "product_id": 1,                    // Product ID
    "size": -100,                       // Position size, if > 0 -> long else short
    "margin": "0.0121",                 // Margin blocked in the position
    "entry_price": "3500.0",            // Avg Entry price of the position
    "liquidation_price": "3356.0",      // Liquidation trigger price
    "bankruptcy_price": "3300.0",       // Bankruptcy Price
    "commission": "0.00001212"          // Commissions blocked for closing the position
}

//Snapshot 
{
   "result":[
      {
         "adl_level":"4.3335",
         "auto_topup":false,
         "bankruptcy_price":"261.82",
         "commission":"17.6571408",
         "created_at":"2021-04-29T07:25:59Z",
         "entry_price":"238.023457888493475682",
         "liquidation_price":"260.63",
         "margin":"4012.99",
         "product_id":357,
         "product_symbol":"ZECUSDT",
         "realized_funding":"-3.08",
         "realized_pnl":"6364.57",
         "size":-1686,
         "updated_at":"2021-04-29T10:00:05Z",
         "user_id":1,
         "symbol":"ZECUSDT"
      }
   ],
   "success":true,
   "type":"positions",
   "action":"snapshot"
}
```

## Orders
Channel provides updates when any order is updated for any action such as fill, quantity change. Need to pass list of product symbols while subscribing.

A snapshot of all open/pending orders will be sent after subscribing a symbol. And all incremental updates will be sent on create/update/delete of orders

All updates including snapshot will have incremental seq_id. seq_id is separate for each symbol.

Any of the following events can be tracked by the reason field in this channel

- fill
- stop_update
- stop_trigger
- stop_cancel
- liquidation
- self_trade


You need to send the list of symbols for which you would like to subscribe to orders channel. You can also subscribe to orders
updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to orders channel without specifying the symbols list, you will not receive any data.

> Orders Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "orders",
                "symbols": ["BTCUSD_29Mar"]
            }
        ]
    }
}
```
```
// Order update

{
    "type": "orders",
    "action": "create",                 // "create"/"update"/"delete"
    "reason": "",                       // "fill"/"stop_update"/"stop_trigger"/"stop_cancel"/"liquidation"/"self_trade"/null
    "symbol": "BTCUSD_29Mar",           // Product Symbol
    "product_id": 1,                    // Product ID
    "order_id": 1234                    // Order id
    "client_order_id": ""               // Client order id
    "size": 100,                        // Order size
    "unfilled_size": 55,                // Unfilled size
    "average_fill_price": "8999.00"     // nil for unfilled orders
    "limit_price": "9000.00"                  // Price of the order
    "side": "buy"                       // Order side (buy or sell)
    "cancellation_reason": "cancelled_by_user"        // Cancellation reason in case of cancelled order, null otherwise
    "stop_order_type": "stop_loss_order",             // If a Stop Order -> "stop_loss_order"/"take_profit_order", null otherwise
    "bracket_order": false              // true for a bracket_order, false otherwise
    "state": "open"                     // "open"/"pending"/"closed"/"cancelled"
    "seq_no": 1                         // Incremental sequence number
    "timestamp": 1594105083998848       // Unix timestamp in microseconds
    "stop_price": "9010.00"                             // stop_price of stop order        
    "trigger_price_max_or_min": "9020.00"               // for trailing stop orders
    "bracket_stop_loss_price": "8090.00"
    "bracket_stop_loss_limit_price": "8090.00"
    "bracket_take_profit_price": "9020"      
    "bracket_take_profit_limit_price": "9020"
    "bracket_trail_amount": "10.00"
}

// Snapshot
{
  "meta": {
    "seq_no": 7,
    "timestamp": 1594149235554045
  },
  "result": [
    {
      "id": 1592130,
      "limit_price": "9000",
      "order_type": "limit_order",
      "product_id": 13,
      "reduce_only": false,
      "side": "buy",
      "size": 1,
      "state": "open",
      "stop_order_type": null,
      "stop_price": null,
      "time_in_force": "gtc",
      "trail_amount": null,
      "unfilled_size": 1,
      "average_fill_price": "8999.00",
      "user_id": 1132
    }
  ],
  "success": true,
  "symbol": "BTCUSD",
  "type": "orders",
  "action": "snapshot"
}
```

## UserTrades
Please use "v2/user_trades" channel for better latency.

Channel provides updates for fills. Need to pass list of product symbols while subscribing.

All updates will have incremental seq_id. seq_id is separate for each symbol.

Auto Deleverage Liquidations of a position can be tracked by reason: "adl" in the user_trades channel.
You need to send the list of symbols for which you would like to subscribe to user trades channel. You can also subscribe to user trades
updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to user trades channel without specifying the symbols list, you will not receive any data.

> User Trades Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "user_trades",
                "symbols": ["BNBBTC_30Nov"]
            }
        ]
    }
}
```
```
// user_trades
{
    "symbol": "BNBBTC_30Nov",
    "fill_id": "1234-abcd-qwer-3456",
    "reason": "normal"                      // "normal" or "adl"
    "product_id": 7,
    "type": "user_trades",
    "user_id": 1998,
    "order_id": 3283999,
    "side": "buy",
    "size": 190,
    "price": "0.00145791",
    "role": "taker",
    "client_order_id": "GA123",
    "timestamp": 1544091555086559,
    "seq_no": 1
}
    
```

## v2/user_trades
Channel provides updates for fills. Need to pass list of product symbols while subscribing. This channel is similar to user_trades channel, only difference is that, it is faster than user_trades and doesn't contain commission data.

All updates will have incremental sequence_id. sequence_id is separate for each symbol, useful for identifying if any v2/user_trades messages were missed/dropped. The sequence_id will reset to 1 after our systems restart. (usually after maintainaince/market disruption).

Auto Deleverage Liquidations of a position can be tracked by reason: "adl" in the user_trades channel.
You need to send the list of symbols for which you would like to subscribe to v2/user_trades channel. You can also subscribe to v2/user_trades
updates for category of products by sending [category-names](/#schemaproductcategories). For example: to receive updates for put options and futures, refer this: `{"symbols": ["put_options", "futures"]}`.
If you would like to subscribe for all the listed contracts, pass: `{ "symbols": ["all"] }`.
Please note that if you subscribe to v2/user_trades channel without specifying the symbols list, you will not receive any data.

> v2/user_trades Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "v2/user_trades",
                "symbols": ["BTCUSDT"]
            }
        ]
    }
}
```
```
// v2/user_trades
{
    "type": "v2/user_trades",
    "sy": "BTCUSDT",             // symbol
    "f": "1234-abcd-qwer-3456",  // fill_id
    "R": "normal"                // reason: "normal" or "adl"
    "u": 1998,                   // user_id
    "o": 3283999,                // order_id
    "S": "buy",                  // side: "buy" or "sell"
    "s": 190,                    // size in contracts
    "p": "17289.2",              // price
    "po": 5,                     // position (in contracts) after this fill.
    "r": "taker",                // role: "taker" or "maker"
    "c": "GA123",                // client_order_id
    "t": 1685794274866438,       // timestamp of fill creation
    "se": 4                      // incremental sequence_no
}
    
```

## PortfolioMargins
Channel provides updates for portfolio margin values of the selected sub-account. These updates are sent every 2 seconds. In case portfolio margin is not enabled on the selected sub-account, no updates will be sent on this channel.

For detailed description of portfolio margin please see [user guide](https://guides.delta.exchange/delta-exchange-user-guide/trading-guide/margin-explainer/portfolio-margin)

UCF: is unrealised cashflows of your portfolio. These are the cashflows (negative for outgoing and positive for incoming) that will take place if all the positions in your portfolio are closed at prevailing mark prices.

> Portfolio Margin Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "portfolio_margins",
                "symbols": [".DEXBTUSDT"]
            }
        ]
    }
}
```
```
// portfolio margin update

{
    "type": "portfolio_margins",
    "user_id": 1,
    "asset_id": 2,                   // BTC
    "index_symbol": ".DEXBTUSDT",
    liquidation_risk: false,
    "blocked_margin": "100", // Margin blocked for current portfolio. Same as portfolio_margin in margins channel.
    "mm_wo_ucf": "80",
    "mm_w_ucf": "80",
    "im_wo_ucf": "100",
    "im_w_ucf": "100",
    "positions_upl": "0", 
    "risk_margin": "100",
    "risk_matrix":{"down":[{"is_worst":false,"pnl":"230.03686162","price_shock":"10"}],"unchanged":[{"is_worst":false,"pnl":"230.03686162","price_shock":"10"}],"up":[]},
    "futures_margin_floor": "20",
    "short_options_margin_floor": "20",
    "long_options_margin_floor": "20",
    "under_liquidation": false,
    "commission": "3.444",
    "margin_floor": "60",
    "timestamp": 1544091555086559, //timestamp in microseconds
    "margin_shortfall": "4.5"             // key sent when liquidation_risk is true 
}

```

Keys - 

<dl>
    <dt>index_symbol</dt>
    <dd>This is the coin on which portfolio margin is enabled.</dd>
    <dt>positions_upl</dt>
    <dd>This is unrealised cashflows (UCF) of your portfolio. These are the cashflows (negative for outgoing and positive for incoming) that will take place if all the positions in your portfolio are closed at prevailing mark prices. Unrealised cashflow is positive for long options and negative for short options.</dd>
    <dt>im_w_ucf</dt>
    <dd>This is the initial margin (IM) requirement for the portfolio. IM is computed as max(risk_margin, margin_floor) - UCF.</dd>
    <dd>If UCF > max(risk_margin, margin_floor) then IM is negative. Negative margin requirement results in increase in your balance available for trading.</dd>
    <dd>If the Wallet Balance (ex spot orders) is less than IM then you would only be able to place orders that reduce the risk of the portfolio.</dd>
    <dt>im_wo_ucf</dt>
    <dd>This is IM without UCF.</dd>
    <dt>mm_w_ucf</dt>
    <dd>This is the maintenance margin (MM) requirement for the portfolio. MM is computed as 80% * max(risk_margin, margin_floor) - UCF.</dd>
    <dd>If the Wallet Balance (ex spot orders) is less than MM then the portfolio will go into liquidation.</dd>
    <dd></dd>
    <dt>mm_wo_ucf</dt>
    <dd>This is MM without UCF.</dd>
    <dt>commission</dt>
    <dd>This is the trading fees blocked for the open orders/positions (for closing the positions) in the portfolio.</dd>
    <dd>This is in addition to the IM requirement.</dd>
    <dt>blocked_margin</dt>
    <dd>The margin actually blocked for your portfolio. If your Wallet Balance (ex spot orders) is greater than IM + commission then blocked_margin = IM + commissions. Otherwise blocked_margin is equal to the maximum amout we are able to block to meet the portfolio margin requirement.</dd>
    <dd>If blocked_margin < MM then the portfolio goes into liquidation.</dd>
    <dt>liquidation_risk</dt>
    <dd>This flag indicates if the portfolio is at liquidation risk.</dd>
    <dd>This flag is set to TRUE when blocked_margin < im_w_ucf + commissions.</dd>
    <dt>under_liquidation</dt>
    <dd>This flag is set to TRUE when the portfolio is under liquidation.</dd>
    <dt>margin_shortfall</dt>
    <dd>This is the minimum topup amount needed to bring the portfolio out of liquidation risk state.</dd>
    <dt>risk_margin</dt>
    <dd>The maximum likely loss of the portfolio under the various simulated stress scenarios.</dd>
    <dt>risk_matrix</dt>
    <dd>Matrix showing the profit/loss of the portfolio under various simulated stress scenarios.</dd>
    <dd> Profit/loss for each position and open order is computed with reference to the prevailing mark prices. Positive numbers indicate profit and negative numbers indicate loss.</dd>
    <dt>margin_floor</dt>
    <dd>Margin Floor is the minimum risk_margin required for a portfolio. </dd>
    <dd>It is comprised of sum of futures_margin_floor, long_options_margin_floor, short_options_margin_floor</dd>
</dl>

## MMP Trigger
Channel provides updates when MMP is triggered. Market maker protection is available to registered market makers by default. Others can reach out to support for getting access to MMP. More info [here](https://guides.delta.exchange/delta-exchange-user-guide/market-makers-guide/market-maker-protection).  

> MMP Trigger Sample

```
//Subscribe
{
    "type": "subscribe",
    "payload": {
        "channels": [
            {
                "name": "mmp_trigger"
            }
        ]
    }
}
```
```
// mmp_trigger response
{
    user_id: 1,
    asset: "BTC",
    frozen_till: 1561634049751430     # timestamp is microseconds, will be -1 if manual reset is enabled 
}
```