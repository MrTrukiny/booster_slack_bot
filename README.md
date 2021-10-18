# Booster Slack Bot v1.0

## Booster Software Engineer - Exercise

Welcome to **Booster Slack Bot**.
This is an App that receives messages from a Slack bot named '**booster\_bot\_v1**'. *Booster Bot* is waiting for you to say "Hi!", or give him a VIN number and he will search into NHTSA API for vehicle's data if any. Don't forget to send a valid VIN number ^\_^.

## How can I see it in action?

1. First at all, you should join my Slack Workspace. Ask me for an invitation!
2. Then you should search a public channel named ["#booster"](https://webdev-and-friends.slack.com/archives/C02HPKCGV7V) and join it.
3. You can mention the bot "@booster_bot_v1" in the **#booster** channel for optain its instructions.
4. You can mention @booster_bot_v1 and send a valid VIN number like this **VIN:JH4DB1650MS013392**, and he will retrieve you vehicle's information if finds something.

## How it works?

There is a Docker image allocated in Amazon Elastic Container Registry that contains a function triggered by AWS Lambda throw API Gateway. The function is listening for Slack events comming from **@booster_bot_v1** that were sent throw **#booster** channel.

### Technologies and services used

- Node.js 14 LTS
- Docker -> public.ecr.aws/lambda/nodejs:14
- AWS ECR
- AWS Lambda
- AWS API GATEWAY
- Libraries
  - crypto
  - @slack/web-api
  - axios

Enjoy it!!
