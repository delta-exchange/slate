"use strict";
var _ = require("lodash");
var crypto = require("crypto");
var url = require("url");

/**
 * Handles HMAC signing for Delta API keys.
 */
var DELTAAPIKeyAuthorization = function(apiKey, apiSecret) {
  this.apiKey = apiKey;
  this.apiSecret = apiSecret;
};

DELTAAPIKeyAuthorization.prototype.apply = function(obj) {
  //var nonce = Date.now() * 1000; // prevents colliding nonces. Otherwise, use expires
  var timeStamp = Math.floor(new Date().getTime() / 1000);
  var parsedURL = url.parse(obj.url);
  var thisPath = parsedURL.pathname + (parsedURL.search || "");
  console.log("thisPath :" + thisPath);
  var signature = this.sign(
    obj.method.toUpperCase(),
    thisPath,
    timeStamp,
    obj.body
  );
  console.log("signature :" + signature);
  obj.headers["api-key"] = this.apiKey;
  // Alternatively, omit this and set 'api-expires' to a unix time in the future.
  // obj.headers['api-expires'] = (Date.now() / 1000) + 5; // expires in 5s
  //obj.headers['api-nonce'] = nonce;
  obj.headers["signature"] = signature;
  obj.headers["timestamp"] = timeStamp;
  return true;
};

DELTAAPIKeyAuthorization.prototype.sign = function(verb, url, timeStamp, data) {
  if (!data || _.isEmpty(data)) data = "";
  else if (_.isObject(data)) data = JSON.stringify(data);

  return crypto
    .createHmac("sha256", this.apiSecret)
    .update(verb + timeStamp + url + data)
    .digest("hex");
};

module.exports = DELTAAPIKeyAuthorization;
