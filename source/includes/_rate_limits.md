# Rate Limits

When a rate limit is exceeded, a HTTP response status 429 Too Many Requests will be returned.
'X-RATE-LIMIT-RESET' is returned in response header with time left in milliseconds after which next API request can be hit. 

We throttle unauthenticated api requests by IP address and authenticated requests by user ID. 

Default Quota is 10000 for a fixed 5 minute window. Rate Limit quota resets to full every 5 mins.

### REST API Rate Limit Weight

Every REST endpoint has been assigned a weight. When you make an API call, the weight of that endpoint is deducted from your 5 min window quota. Exceeding the rate limit quota, results in 429 HTTP response status error. API endpoints related to reading public data are lighter in weight, whereas API endpoints related to writing private data (like placing an order) are heavier in weight. 

Here is the cost structure for various endpoints. Please note that any endpoint not mentioned here has a cost of 1 unit.

Weight Slab|API Endpoints
--|--
3| Get Products, Get Orderbook, Get Tickers, Get Open Orders, Get Open Postions, Get Balances, OHLC Candles
5| Place/Edit/Delete Order, Add Position Margin
10| Get Order History, Get Fills, Get Txn Logs
25| Batch Order Apis

e.g. Consider making all the below requests in a 5 minute window.  
100 Get Open Orders requests = 100 * 3 = 300 weight.  
50 Get Balances requests = 50 * 3 = 150 weight.  
200 Place order requests = 200 * 5 = 1000 weight.  
20 Batch Order requests = 20 * 25 = 500 weight.  
Total quota used: 300 + 150 + 1000 + 500 = 1950 quota used. If this is greater than quota assigned to you, rate limit error will occur.

### Increasing your rate limits

If you are running up against our limits and believe that you have a legitimate need, please email us at [support@delta.exchange](mailto:support@delta.exchange) to discuss increasing your rate limits.
