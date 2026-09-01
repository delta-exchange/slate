# Edit order errors
This section lists various errors returned by the system while editing/amending an existing order. Editing an order re-runs the same risk checks as placing a new order, against the modified order (with the original order excluded from the book). The error format looks like this 

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
open_order_not_found | The order being edited couldn't be found among open orders — it may already be filled or cancelled.
insufficient_margin | Margin required for the edited order with selected leverage and quantity is insufficient.
close_position_insufficient_margin | Margin available is insufficient to close/reduce the position at the edited price and size.
insufficient_commission | Available balance is insufficient to cover the commission for the edited order.
order_size_exceed_available | The order book doesn't have sufficient liquidity, hence the edited order couldnt be filled (for ex - ioc orders).
order_size_not_available_in_orderbook | Requested order size isn't available in the orderbook at the edited price.
close_order_position_unavailable | No open position is available to close against the edited order.
risk_limits_breached | Order couldn't be edited as it will breach allowed risk limits.
invalid_contract | The contract/product either doesn\'t exist or has already expired.
immediate_liquidation | Edited order will cause immediate liquidation.
out_of_bankruptcy | Edited order price is out of position bankruptcy limits.
self_matching_disrupted_post_only | Self matching is not allowed during auction.
overlapping_buy_sell_orders | Edited order price overlaps with an existing resting order on the opposite side from the same account (self-trade).
immediate_execution_post_only | Order couldn't be edited as it is a post only order which would be immediately executed at the new price.
naked_short_restricted | Edited order would create a naked short position beyond the allowed limit.
portfolio_risk_limits_breached | Edited order would breach the aggregate risk limit set for portfolio margin mode.
liquidation_risk_limits_breached | Only reduce-only orders can be edited while account liquidation risk is elevated.
greeks_limits_breached | Edited order would breach the delta/vega/gamma limits set on the options portfolio.
no_position_for_reduce_only | Order is reduce-only but there is no open position to reduce.
no_position_left_for_reduce_only | Reduce-only order couldn't be processed as no position is left to reduce.
max_leverage_exceeded | Requested leverage is higher than the maximum leverage allowed for this product.
min_leverage_exceeded | Requested leverage is lower than the minimum leverage allowed for this product.
leverage_limit_exceeded | Position and open order notional at the selected leverage exceeds the maximum notional allowed for that leverage bracket.
order_already_filled | Order has already been completely filled and can no longer be edited.
less_than_order_min_size | Edited order size is less than the minimum order size allowed for this product.
order_max_size_exceeded | Edited order size exceeds the maximum order size allowed for this product.
reduce_only_orders_allowed_sell_side | Only reduce-only sell orders are allowed for this product.
reduce_only_orders_allowed | Only reduce-only orders are allowed on this product/account currently.
trading_blocked | Trading is currently blocked for this product or account.
kyc_pending | KYC verification is not complete for this account.
trading_credits_breached | Edited order would breach the trading credits limit set on the account.
derivatives_trading_blocked | Derivatives trading is currently blocked for this account.
spot_trading_blocked | Spot trading is currently blocked for this account.
spot_blocked_country | Spot trading is not permitted from the account's registered country.
account_risk_limits_breached | Edited order would breach the account-level risk limit.
position_under_liquidation | Order couldn't be edited as the position is currently under liquidation.
position_bracket_exist_or_invalid_data | Bracket order couldn't be edited as a position already exists on this product, or the bracket data is invalid.
no_open_position | No open position exists for the requested action.
stale_order | Order was rejected as it is considered stale.
offset_by_reduce_only | Order couldn't be edited to full size due to insufficient margin; the reduce-only/stop-loss/take-profit flag on the order was used to offset it instead of rejecting it outright.
unsupported | Edited market order couldn't be validated for price impact as orderbook data isn't available.
no_orders | Batch edit request was submitted with an empty order list.
no_liquidity_for_market_order | The orderbook doesn't have enough liquidity to fill the edited market order.
family_position_limit_exceeded | Combined position across family/linked accounts exceeds the allowed position size limit.
trading_not_allowed_on_current_margin_mode | This action isn't allowed in the account's current margin mode.
max_orders_count_exceeded | Number of open orders has exceeded the maximum allowed for this account.
