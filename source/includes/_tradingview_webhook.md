# TradingView Webhook Order Integration

If a trade request sent via a TradingView webhook is rejected, you receive a **TradingView Webhook Order Failed** notification. This happens when the webhook request is not in the format Delta Exchange India expects, so the order is not processed.

## Required Fields

Delta Exchange India requires **all** of the following fields to be present and valid in the webhook request:

Field | Description
--|--
symbol | The trading pair, e.g. `BTCUSD.P`, `ETHUSD.P`
side | The trade direction. Must be either `buy` or `sell`
qty | The order quantity. Must be a whole number, such as `1`, `10` or `100`

## How to Fix

1. Ensure the selected instrument is from **Delta Exchange India (DELTAIN)**.
2. In TradingView, go to **Symbol Search**, apply the **Crypto** filter, select **Delta Exchange India**, and choose your instrument (e.g. `BTCUSD.P`).
3. Verify the order quantity is a whole number in **Strategy Properties**.
4. Set the `side` parameter as `"side": "{{strategy.order.action}}"`, and ensure your strategy generates valid `buy` and `sell` signals.
5. Format your webhook message like this:

```json
{
  "symbol": "{{ticker}}",
  "side": "{{strategy.order.action}}",
  "qty": "{{strategy.order.contracts}}",
  "trigger_time": "{{timenow}}",
  "strategy_id": "your_strategy_id"
}
```

<aside class="notice">
Replace <code>your_strategy_id</code> with the identifier of your own strategy. The <code>{{...}}</code> placeholders are filled in by TradingView when the alert fires.
</aside>
