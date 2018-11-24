"use strict";
var SwaggerClient = require("swagger-client");
var _ = require("lodash");
var DELTAAPIKeyAuthorization = require("./lib/DELTAAPIKeyAuthorization");

new SwaggerClient({
  // Switch this to `www.Delta.com` when you're ready to try it out for real.
  // Don't forget the `www`!
  url: "http://192.168.56.1:8080/swagger.json",
  usePromise: true,
  authorizations: {
    apiKey: new DELTAAPIKeyAuthorization(
      "680ff0ddf55957343767b5c0ec5d74",
      "5e5dd47e6fe3c3230a18d5bb2cb42260072ce79ffcfcd53bf085bc57b93f"
    )
  }
})
  .then(function(client) {
    // Comment out if you're not requesting any user data.
    // client.clientAuthorizations.add(
    //   "apiKey",
    //   new DELTAAPIKeyAuthorization("api-key", "api-secret")
    // );

    // Print client capabilities
    inspect(client.apis);

    // Get produts
    // client.Products.getProducts()
    //   .then(function(response) {
    //     var produts = JSON.parse(response.data.toString());
    //     // Print the max price traded in the last `count` trades.
    //     console.log("\nProducts:\n----\n", JSON.stringify(produts));
    //   })
    //   .catch(function(e) {
    //     // Error handling...
    //     console.log("Error:", e.statusText);
    //   });

    client.Wallet.getWalletBalances()
      .then(function(response) {
        var balances = JSON.parse(response.data.toString());
        console.log("\nWallet Balances:", balances);
      })
      .catch(function(e) {
        // Error handling...
        console.log("Error:", e.statusText);
      });

    // Example: Placing an order - commented for your safety
    // .then(function() {
    //   return client.Order.Order_new({symbol: 'XBTUSD', price: 1000, orderQty: 1})
    // })
    // .then(function (response) {
    //   console.log(response.data.toString());
    // });

    // Example: sending a bulk order
    // Note: due to a bug in the Swagger client, you must stringify the Array, otherwise
    // we will be sent `["[object Object]","[object Object]"]`
    // client.Order.Order_newBulk({
    //   "orders": JSON.stringify([
    //     {"symbol":"XBTUSD","price":2433.5,"orderQty":147,"side":"Sell"},
    //     {"symbol":"XBTUSD","price":2431.1,"orderQty":190,"side":"Sell"}
    //   ])
    // })
    // .then(function (response) {
    //   console.log(response.data.toString());
    // });
  })
  .catch(function(e) {
    console.error("Unable to connect:", e);
  });

function inspect(client) {
  console.log("Inspecting Delta API...");
  Object.keys(client).forEach(function(model) {
    if (!client[model].operations) return;
    console.log(
      "Available methods for %s: %s",
      model,
      Object.keys(client[model].operations).join(", ")
    );
  });
  console.log("------------------------\n");
}
