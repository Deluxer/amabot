## AMABot Products tracking
Search products of the many differents online stores and compare prices, get products of lower price

Get start [AMABot](https://t.me/amaproductsbot) and seach products

* Compare prices in the following Marketplace
    - Amazon
    - MercadoLibre

## How to use AMABot?
1. Enter at the amabot in Telegram https://t.me/amaproductsbot
2. Click on start
3. Use the command /buscar \<product>

Result information by product:
* Name products
* Price
* URL

# Crate new project

## Installation

1. Clone repo
```
git clone git@github.com:Deluxer/amabot.git
```
2. install
```bash
npm install
```

3. Create Telegram bot.

To be able to create a bot is necessary to use [BotFather](https://t.me/BotFather) of the telegram, follow the steps, and create a bot.
You should be able to get a token from telegram.

4. Copy ```.env.example``` to ```.env```
5. Set environment variables
```
AMABOT_TELEGRAM_TOKEN=<here telegram token>
....
....
```
6. Create new image
* One time to build project
```
docker-compose up -d --build
```

* Just run project
```
docker-compose up -d
```

### If you don't want to use docker, then use the following commands, you must create and connect the database

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start
```

## Stack used
* Nest
* Postgresql

## Dependencies
* Scraping Amazon products with [Nest-crawler](https://www.npmjs.com/package/nest-crawler)
* axios