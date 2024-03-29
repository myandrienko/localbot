#!/usr/bin/env zx

import * as ngrok from "./ngrok.mjs";
import * as tg from "./telegram.mjs";

let exitCode = 0;

try {
  const path = argv._[1] ?? "/";
  const token = argv.token ?? argv.t ?? process.env.BOT_TOKEN;
  const port = argv.port ?? argv.p ?? process.env.PORT ?? "3000";

  if (!token) {
    throw new Error("Missing argument: bot token");
  }

  await ngrok.startInstance();
  const { public_url: url } = await ngrok.startTunnel({
    name: "localbot",
    proto: "http",
    addr: port,
  });

  await tg.setBotWebhook({ token, url: `${url}${path}` });
  console.log(chalk.green("All done!"));

  await ngrok.waitForInstance();
} catch (e) {
  console.error(chalk.red(e.message));
  exitCode = 1;
} finally {
  await ngrok.stopInstance();
}
