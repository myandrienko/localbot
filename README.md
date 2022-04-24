**localbot** is a utility for local telegram bot development using ngrok. It
automatically launches ngrok and sets a randomly chosen public URL as the
webhook for your bot.

## Prerequisites

[zx](https://www.npmjs.com/package/zx) must be globally installed on your
system:

```
npm i -g zx
```

[ngrok](https://ngrok.com/) must be available in `PATH` or as a binary in the
current working directory. The easiest way to install ngrok is to
[download it](https://ngrok.com/download) and unzip the TGZ file next to
`localbot.mjs`.

## Usage

Clone this repo, then run:

```
./localbot.mjs <bot_token> [-p <port>]
```

Webhook requests will tunnel to a specified port on your local machine. The
default is port 80.

## Troubleshooting

**I am getting an ERR_NGROK_8012 error in the ngrok web interface.**  
Is your ngrok configured correctly? Check if there is
`~/.config/ngrok/ngrok.yml` file with your authtoken. If the file does not
exist, run the `ngrok config add-authtoken` command.

**I get the error "Failed to set webhook: Unauthorized" error.**  
There may be a typo in your bot token. The bot token should look something like
this `0000000000:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.
