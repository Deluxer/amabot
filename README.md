## AMABot Products tracking
Search products of the many differents online stores and compare prices, get products of lower price

Get start [AMABot](https://t.me/amaproductsbot) and seach products

* Compare prices in the following Marketplace
    - Amazon
    - MercadoLibre

## How to use AMABot?
Search products use command /buscar \<product>  | ✔ | <br/>
Subcribe products command /subscribe \<product> \<price>  | ✔ | 

## Requirements
* NPM
* Nodejs v18
* Docker v20
* docker-compose v1.29.2


## Installation

1. Clone repo
```
git clone https://github.com/Deluxer/amabot.git
```

2. Create Telegram bot.

To be able to create a bot is necessary to use [BotFather](https://t.me/BotFather) of the telegram, follow the steps, and create a bot.
You should be able to get a token from telegram.

3. Copy ```.env.example``` to ```.env```

4. Set environment variables
```
AMABOT_TELEGRAM_TOKEN=<here telegram token>
....
....
```
5. Start project
```
docker-compose up -d
```

### If you don't want to use docker, then use the following commands, you must create PostgresSQL database and make connection.

```bash
Note: --force is used because 'nest-crawler' use an old version of @nestjs/common
# install 
npm install --force

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start
```

Clean code, run before each commit
```
npm run lint
```

## Stack used
* Nestjs
* Postgresql

## Relevant Dependencies
* Scraping Amazon products with [Nest-crawler](https://www.npmjs.com/package/nest-crawler)
* axios
* nestjs-telegraf

## Aditional information
* Build and Deploy On AWS using the free instance
    - Route 53
    - Load balancer
    - EC2

## Recommendation
[json viewer pro](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc) see nice json format in browsers