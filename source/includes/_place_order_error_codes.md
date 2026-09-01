# Place order errors
This section lists various errors returned by the system while placing order. The error format looks like this 

```json
{
  "success": false,
  "error": {
    "code": "...",        // error code
    "context": {
      "..."
    }
  }
}
```

Here is a list of error codes and their explanation

error code | description
--|--
insufficient_margin | Margin required to place order with selected leverage and quantity is insufficient.
close_position_insufficient_margin | Margin available is insufficient to close/reduce the position at the requested price and size.
insufficient_commission | Available balance is insufficient to cover the commission for this order.
order_size_exceed_available | The order book doesn't have sufficient liquidity, hence the order couldnt be filled (for ex - ioc orders).
order_size_not_available_in_orderbook | Requested order size isn't available in the orderbook at the given price.
close_order_position_unavailable | No open position is available to close against this order.
risk_limits_breached | orders couldn't be placed as it will breach allowed risk limits.
invalid_contract | The contract/product is either doesn\'t exist or has already expired.
immediate_liquidation | Order will cause immediate liquidation.
out_of_bankruptcy | Order prices are out of position bankruptcy limits.
self_matching_disrupted_post_only | Self matching is not allowed during auction.
overlapping_buy_sell_orders | Order price overlaps with an existing resting order on the opposite side from the same account (self-trade).
immediate_execution_post_only | orders couldn't be placed as it includes post only orders which will be immediately executed.
naked_short_restricted | Order would create a naked short position beyond the allowed limit.
portfolio_risk_limits_breached | Order would breach the aggregate risk limit set for portfolio margin mode.
liquidation_risk_limits_breached | Only reduce-only orders are allowed while account liquidation risk is elevated.
greeks_limits_breached | Order would breach the delta/vega/gamma limits set on the options portfolio.
no_position_for_reduce_only | Reduce-only order was placed but there is no open position to reduce.
no_position_left_for_reduce_only | Reduce-only order couldn't be processed as no position is left to reduce.
max_leverage_exceeded | Requested leverage is higher than the maximum leverage allowed for this product.
min_leverage_exceeded | Requested leverage is lower than the minimum leverage allowed for this product.
leverage_limit_exceeded | Position and open order notional at the selected leverage exceeds the maximum notional allowed for that leverage bracket.
order_already_filled | Order has already been completely filled.
less_than_order_min_size | Order size is less than the minimum order size allowed for this product.
order_max_size_exceeded | Order size exceeds the maximum order size allowed for this product.
reduce_only_orders_allowed_sell_side | Only reduce-only sell orders are allowed for this product.
reduce_only_orders_allowed | Only reduce-only orders are allowed on this product/account currently.
trading_blocked | Trading is currently blocked for this product or account.
kyc_pending | KYC verification is not complete for this account.
trading_credits_breached | Order would breach the trading credits limit set on the account.
derivatives_trading_blocked | Derivatives trading is currently blocked for this account.
spot_trading_blocked | Spot trading is currently blocked for this account.
spot_blocked_country | Spot trading is not permitted from the account's registered country.
account_risk_limits_breached | Order would breach the account-level risk limit.
position_under_liquidation | Order couldn't be placed as the position is currently under liquidation.
position_bracket_exist_or_invalid_data | Bracket order couldn't be placed as a position already exists on this product, or the bracket data is invalid.
no_open_position | No open position exists for the requested action.
stale_order | Order was rejected as it is considered stale.
limit_order_not_allowed_for_binary_options | Limit orders are not supported for binary options products.
stop_orders_not_allowed_for_binary_options | Stop orders are not supported for binary options products.
not_a_binary_options_product | This action is only valid for binary options products.
offset_by_reduce_only | Order couldn't be placed at full size due to insufficient margin; the reduce-only/stop-loss/take-profit flag on the order was used to offset it instead of rejecting it outright.
unsupported | Market order couldn't be validated for price impact as orderbook data isn't available.
no_orders | Batch request was submitted with an empty order list.
no_liquidity_for_market_order | The orderbook doesn't have enough liquidity to fill the market order.
family_position_limit_exceeded | Combined position across family/linked accounts exceeds the allowed position size limit.
trading_not_allowed_on_current_margin_mode | This action isn't allowed in the account's current margin mode.
max_orders_count_exceeded | Number of open orders has exceeded the maximum allowed for this account.
invalid_index_symbol | The index symbol referenced in the portfolio margin basket order doesn't exist.
