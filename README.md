## API Documentation

### Authentication APIs

#### 1. User Signup

- **Route**: POST /api/auth/signup
- **Request Body**:

```json
{
  "email": "user@example.com",
  "traderId": "TRADER123",
  "mobileNumber": "+1234567890"
}
```

- **Response Body**:

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "traderId": "TRADER123",
  "mobileNumber": "+1234567890",
  "role": "user"
}
```

#### 2. User Login

- **Route**: POST /api/auth/login
- **Request Body**:

```json
{
  "email": "user@example.com",
  "traderId": "TRADER123"
}
```

- **Response Body**:

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "traderId": "TRADER123",
  "role": "user",
  "token": "jwt_token"
}
```

### Trade APIs

#### 1. Create Trade

- **Route**: POST /api/trades/create
- **Request Body**:

```json
{
  "userId": "user_id",
  "asset": "EUR/USD",
  "buyPrice": 1.1234,
  "sellPrice": 1.1245,
  "tradeVolume": 1000
}
```

- **Response Body**:

```json
{
  "id": "trade_id",
  "userId": "user_id",
  "asset": "EUR/USD",
  "buyPrice": 1.1234,
  "sellPrice": 1.1245,
  "tradeVolume": 1000,
  "profitOrLoss": 110,
  "timestamp": "2023-04-20T12:34:56.789Z"
}
```

#### 2. Get User Trade History

- **Route**: GET /api/trades/user/:userId/history
- **Response Body**:

```json
[
  {
    "id": "trade_id_1",
    "userId": "user_id",
    "asset": "EUR/USD",
    "buyPrice": 1.1234,
    "sellPrice": 1.1245,
    "tradeVolume": 1000,
    "profitOrLoss": 110,
    "timestamp": "2023-04-20T12:34:56.789Z"
  },
  {
    "id": "trade_id_2",
    "userId": "user_id",
    "asset": "GBP/JPY",
    "buyPrice": 150.23,
    "sellPrice": 150.45,
    "tradeVolume": 500,
    "profitOrLoss": 110,
    "timestamp": "2023-04-19T10:11:12.345Z"
  }
]
```

#### 3. Get Trade by ID

- **Route**: GET /api/trades/:tradeId
- **Response Body**:

```json
{
  "id": "trade_id",
  "userId": "user_id",
  "asset": "EUR/USD",
  "buyPrice": 1.1234,
  "sellPrice": 1.1245,
  "tradeVolume": 1000,
  "profitOrLoss": 110,
  "timestamp": "2023-04-20T12:34:56.789Z"
}
```

### Funded Account APIs

#### 1. Create Funded Account

- **Route**: POST /api/funded-account/create
- **Request Body**:

```json
{
  "userId": "user_id",
  "initialBalance": 100000,
  "fundingProgram": "Standard",
  "tradingRules": "Max drawdown 10%, daily loss limit 5%"
}
```

- **Response Body**:

```json
{
  "id": "account_id",
  "userId": "user_id",
  "initialBalance": 100000,
  "currentBalance": 100000,
  "fundingProgram": "Standard",
  "activeTrades": [],
  "tradingRules": "Max drawdown 10%, daily loss limit 5%"
}
```

#### 2. Get Funded Account by ID

- **Route**: GET /api/funded-account/:accountId
- **Response Body**:

```json
{
  "id": "account_id",
  "userId": "user_id",
  "initialBalance": 100000,
  "currentBalance": 102000,
  "fundingProgram": "Standard",
  "activeTrades": [
    {
      "id": "trade_id",
      "asset": "EUR/USD",
      "buyPrice": 1.1234,
      "tradeVolume": 1000
    }
  ],
  "tradingRules": "Max drawdown 10%, daily loss limit 5%"
}
```

#### 3. Deposit Funds

- **Route**: POST /api/funded-account/:accountId/deposit
- **Request Body**:

```json
{
  "amount": 5000
}
```

- **Response Body**:

```json
{
  "id": "account_id",
  "userId": "user_id",
  "initialBalance": 100000,
  "currentBalance": 107000,
  "fundingProgram": "Standard"
}
```

#### 4. Withdraw Funds

- **Route**: POST /api/funded-account/:accountId/withdraw
- **Request Body**:

```json
{
  "amount": 3000
}
```

- **Response Body**:

```json
{
  "id": "account_id",
  "userId": "user_id",
  "initialBalance": 100000,
  "currentBalance": 104000,
  "fundingProgram": "Standard"
}
```

### Course APIs

#### 1. Create Course

- **Route**: POST /api/courses/create
- **Request Body**:

```json
{
  "courseName": "Forex Trading Basics",
  "description": "Learn the fundamentals of forex trading",
  "modules": ["Introduction", "Currency Pairs", "Technical Analysis"],
  "instructorId": "instructor_user_id"
}
```

- **Response Body**:

```json
{
  "id": "course_id",
  "courseName": "Forex Trading Basics",
  "description": "Learn the fundamentals of forex trading",
  "modules": ["Introduction", "Currency Pairs", "Technical Analysis"],
  "instructorId": "instructor_user_id"
}
```

#### 2. Get Course by ID

- **Route**: GET /api/courses/:courseId
- **Response Body**:

```json
{
  "id": "course_id",
  "courseName": "Forex Trading Basics",
  "description": "Learn the fundamentals of forex trading",
  "modules": ["Introduction", "Currency Pairs", "Technical Analysis"],
  "instructorId": {
    "id": "instructor_user_id",
    "email": "instructor@example.com",
    "traderId": "INSTRUCTOR123"
  }
}
```

#### 3. Update Course

- **Route**: PUT /api/courses/:courseId
- **Request Body**:

```json
{
  "courseName": "Advanced Forex Trading",
  "description": "Master advanced forex trading techniques",
  "modules": [
    "Advanced Technical Analysis",
    "Risk Management",
    "Trading Psychology"
  ]
}
```

- **Response Body**:

```json
{
  "id": "course_id",
  "courseName": "Advanced Forex Trading",
  "description": "Master advanced forex trading techniques",
  "modules": [
    "Advanced Technical Analysis",
    "Risk Management",
    "Trading Psychology"
  ],
  "instructorId": "instructor_user_id"
}
```

#### 4. Delete Course

- **Route**: DELETE /api/courses/:courseId
- **Response**: 204 No Content

### Chat APIs

#### 1. Create Chat Group

- **Route**: POST /api/chat/group/create
- **Request Body**:

```json
{
  "admin_id": "user_id",
  "group_name": "Forex Traders Group",
  "participants": ["user_id_1", "user_id_2", "user_id_3"]
}
```

- **Response Body**:

```json
{
  "id": "group_id",
  "adminId": "user_id",
  "groupName": "Forex Traders Group",
  "participants": ["user_id_1", "user_id_2", "user_id_3"],
  "messages": []
}
```

#### 2. Add Message to Chat

- **Route**: POST /api/chat/group/:groupId/message
- **Request Body**:

```json
{
  "senderId": "user_id",
  "message": "Hello, traders!"
}
```

- **Response Body**:

```json
{
  "id": "group_id",
  "adminId": "user_id",
  "groupName": "Forex Traders Group",
  "participants": ["user_id_1", "user_id_2", "user_id_3"],
  "messages": [
    {
      "senderId": "user_id",
      "message": "Hello, traders!",
      "timestamp": "2023-04-20T14:30:00.000Z"
    }
  ]
}
```

#### 3. Get Chat by ID

- **Route**: GET /api/chat/group/:groupId
- **Response Body**:

```json
{
  "id": "group_id",
  "adminId": {
    "id": "user_id",
    "email": "admin@example.com",
    "traderId": "ADMIN123"
  },
  "groupName": "Forex Traders Group",
  "participants": [
    {
      "id": "user_id_1",
      "email": "user1@example.com",
      "traderId": "TRADER1"
    },
    {
      "id": "user_id_2",
      "email": "user2@example.com",
      "traderId": "TRADER2"
    },
    {
      "id": "user_id_3",
      "email": "user3@example.com",
      "traderId": "TRADER3"
    }
  ],
  "messages": [
    {
      "senderId": {
        "id": "user_id",
        "email": "admin@example.com",
        "traderId": "ADMIN123"
      },
      "message": "Hello, traders!",
      "timestamp": "2023-04-20T14:30:00.000Z"
    }
  ]
}
```
