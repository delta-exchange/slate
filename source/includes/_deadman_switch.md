# Deadman Switch

The Deadman Switch is a safety mechanism that automatically cancels orders or takes other protective actions when a client fails to send heartbeat signals within specified time intervals. This feature is essential for risk management and preventing unwanted positions from accumulating due to client disconnections or failures.

## Overview

The Deadman Switch system consists of several components:

- **Heartbeat Creation**: Clients register a heartbeat with specific configuration
- **Heartbeat Acknowledgment**: Clients periodically send acknowledgments to keep the heartbeat alive
- **Automatic Actions**: When heartbeats expire, the system automatically executes configured actions

## Authentication

All Deadman Switch endpoints require authentication. Include your API key and signature in the request headers as described in the [Authentication](#authentication) section.

## Heartbeat Management

### Create Heartbeat

Creates a new heartbeat with specific configuration for automatic actions.

**Endpoint:** `POST /heartbeat/create`

**Request Body:**

```json
{
  "heartbeat_id": "my_trading_bot_001",
  "impact": "contracts",
  "contract_types": ["perpetual_futures", "call_options"],
  "underlying_assets": ["BTC", "ETH"],
  "product_symbols": ["BTCUSD", "ETHUSD"],
  "config": [
    {
      "action": "cancel_orders",
      "unhealthy_count": 1
    },
    {
      "action": "spreads",
      "unhealthy_count": 3,
      "value": 100
    }
  ]
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `heartbeat_id` | string | Yes | Unique identifier for the heartbeat |
| `impact` | string | Yes | Impact : `contracts`, `products` |
| `contract_types` | array | Yes | Array of contract types to monitor, required if impact is contracts |
| `underlying_assets` | array | No | Array of underlying assets to monitor |
| `product_symbols` | array | Yes | Array of specific product symbols to monitor, reuired if impact is products |
| `config` | array | Yes | Array of action configurations |

**Config Actions:**

- `cancel_orders`: Cancels all open orders
- `disrupt`: Disrupts market trading
- `speed_bump`: Adds speed bump to orders
- `spreads`: Adds spreads to orders

**Response:**

```json
{
  "success": true,
  "result": {
    "heartbeat_id": "my_trading_bot_001",
    "status": "active"
  }
}
```

### Heartbeat Acknowledgment

Sends an acknowledgment to keep the heartbeat active.

**Endpoint:** `POST /heartbeat`

**Request Body:**

```json
{
  "heartbeat_id": "my_trading_bot_001",
  "ttl": 30000
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `heartbeat_id` | string | Yes | Heartbeat identifier |
| `ttl` | integer/string | Yes | Time to live in milliseconds |

**Response:**

```json
{
  "success": true,
  "result": {
    "heartbeat_id": "my_trading_bot_001",
    "status": "acknowledged",
    "next_ack_required_by": 1640995200000
  }
}
```

### Get Heartbeats

Retrieves all active heartbeats for a user.

**Endpoint:** `GET /heartbeat`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `heartbeat_id` | string | No | Specific heartbeat ID to retrieve |

**Response:**

```json
{
  "success": true,
  "result": [
    {
      "user_id": "user_id",
      "heartbeat_id": "my_trading_bot_001",
      "impact": "contracts",
      "contract_types": ["perpetual_futures", "call_options"],
      "underlying_assets": ["BTC", "ETH"],
      "product_symbols": ["BTCUSD", "ETHUSD"],
      "config": [
        {
          "action": "cancel_orders",
          "unhealthy_count": 1
        }
      ]
    }
  ]
}
```

## Implementation Guidelines

### Best Practices

1. **Regular Heartbeats**: Send heartbeat acknowledgments at regular intervals (recommended: every 30 seconds)
2. **Error Handling**: Implement proper error handling for heartbeat failures
3. **Monitoring**: Monitor heartbeat status and implement alerts for failures
4. **Graceful Shutdown**: Properly disable heartbeats when shutting down trading systems

### Python Example

```python
import requests
import time
import json

class DeadmanSwitch:
    def __init__(self, api_key, api_secret, base_url):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = base_url
        self.heartbeat_id = "trading_bot_" + str(int(time.time()))
        
    def create_heartbeat(self, user_id):
        """Create a new heartbeat"""
        url = f"{self.base_url}/heartbeat/create"
        headers = self._get_auth_headers()
        
        payload = {
            "heartbeat_id": self.heartbeat_id,
            "impact": "contracts",
            "contract_types": ["perpetual_futures"],
            "config": [
                {
                    "action": "cancel_orders",
                    "unhealthy_count": 1 # if heartbeat missed 1 time than cancel all orders
                }
            ]
        }
        
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    
    def send_heartbeat(self, user_id):
        """Send heartbeat acknowledgment"""
        url = f"{self.base_url}/heartbeat"
        headers = self._get_auth_headers()
        
        payload = {
            "heartbeat_id": self.heartbeat_id,
            "ttl": 30000  # 30 seconds
        }
        
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
    
    def start_heartbeat_loop(self, user_id):
        """Start continuous heartbeat loop"""
        while True:
            try:
                result = self.send_heartbeat(user_id)
                print(f"Heartbeat sent: {result}")
                time.sleep(25)  # Send every 25 seconds (TTL is 30)
            except Exception as e:
                print(f"Heartbeat failed: {e}")
                time.sleep(5)
    
    def _get_auth_headers(self):
        # Implement authentication headers
        return {
            "Content-Type": "application/json",
            "api-key": self.api_key,
            # Add signature generation logic
        }

# Usage example
deadman = DeadmanSwitch("your_api_key", "your_api_secret", "https://api.delta.exchange")
deadman.create_heartbeat(12345)
deadman.start_heartbeat_loop(12345)
```

### Node.js Example

```javascript
const axios = require('axios');
const crypto = require('crypto');

class DeadmanSwitch {
    constructor(apiKey, apiSecret, baseUrl) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.baseUrl = baseUrl;
        this.heartbeatId = `trading_bot_${Date.now()}`;
    }
    
    async createHeartbeat(userId) {
        const url = `${this.baseUrl}/heartbeat/create`;
        const headers = this.getAuthHeaders();
        
        const payload = {
            user_id: userId,
            heartbeat_id: this.heartbeatId,
            impact: "contracts",
            contract_types: ["perpetual_futures"],
            config: [
                {
                    action: "cancel_orders",
                    unhealthy_count: 1
                }
            ]
        };
        
        const response = await axios.post(url, payload, { headers });
        return response.data;
    }
    
    async sendHeartbeat(userId) {
        const url = `${this.baseUrl}/heartbeat`;
        const headers = this.getAuthHeaders();
        
        const payload = {
            heartbeat_id: this.heartbeatId,
            ttl: 30000
        };
        
        const response = await axios.post(url, payload, { headers });
        return response.data;
    }
    
    startHeartbeatLoop(userId) {
        setInterval(async () => {
            try {
                const result = await this.sendHeartbeat(userId);
                console.log('Heartbeat sent:', result);
            } catch (error) {
                console.error('Heartbeat failed:', error);
            }
        }, 25000); // Send every 25 seconds
    }
    
    getAuthHeaders() {
        // Implement authentication headers
        return {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
            // Add signature generation logic
        };
    }
}

// Usage example
const deadman = new DeadmanSwitch('your_api_key', 'your_api_secret', 'https://api.delta.exchange');
deadman.createHeartbeat(12345);
deadman.startHeartbeatLoop(12345);
```

## Error Codes

| Error Code | Description |
|------------|-------------|
| `unauthorized` | Authentication failed |
| `rate_limit_exceeded` | Too many requests |

## Rate Limits

- Heartbeat acknowledgments: 10 requests per minute per user
- Heartbeat creation: 5 requests per minute per user
- Cancel after: 10 requests per minute per user

## Security Considerations

1. **API Key Security**: Keep your API keys secure and never expose them in client-side code
2. **Network Security**: Use HTTPS for all API communications
3. **Monitoring**: Implement proper monitoring and alerting for heartbeat failures
4. **Backup Systems**: Consider implementing backup heartbeat mechanisms for critical trading systems 