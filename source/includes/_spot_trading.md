# Spot Trading

Delta Exchange also offers Spot markets, where supported cryptocurrencies are traded directly against INR.

Spot uses the same REST endpoints, WebSocket channels, and authentication as the rest of the API. There are no separate Spot endpoints and no additional auth requirements — to trade Spot, point an existing call at a Spot product.

| Asset | Symbol |
| --- | --- |
| Bitcoin | `BTC_INR` |
| Ethereum | `ETH_INR` |
| Solana | `SOL_INR` |
| XRP | `XRP_INR` |

New markets are added over time. Fetch the current list from `/v2/products`:

`curl -X GET "https://api.india.delta.exchange/v2/products?contract_types=spot&states=live" -H "Accept: application/json"`
