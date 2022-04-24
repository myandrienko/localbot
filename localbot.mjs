#!/usr/bin/env zx

import * as ngrok from "./ngrok.mjs";
import * as tg from "./telegram.mjs";

const token = argv._[1];
const port = argv.port ?? argv.p ?? 80;

if (!token) {
  console.error(chalk.red("Missing argument: bot token"));
  process.exit(1);
}

try {
  await ngrok.startInstance();
  const { public_url: url } = await ngrok.startTunnel({
    name: "localbot",
    proto: "http",
    addr: port,
  });

  await tg.setBotWebhook({ token, url });
  console.log(chalk.green("All done!"));

  await ngrok.waitForInstance();
} catch (e) {
  console.error(chalk.red(e.message));
} finally {
  await ngrok.stopInstance();
}
