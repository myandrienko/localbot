import { until } from "./utils.mjs";

const port = 4040;
const apiBaseUrl = `http://localhost:${port}/api`;
const webUiUrl = `http://localhost:${port}`;

let instance = null;
let apiReady = false;

export async function startInstance() {
  if (await checkApiReady()) {
    console.log(`Found ngrok on port ${port}`);
    apiReady = true;
    return;
  }

  console.log("Starting ngrok...");
  instance = $`${await findBinary()} start --none`;
  await until(checkApiReady);
  console.log(`Ngrok is running on port ${port}`);
  console.log(`Web interface is available at ${chalk.blue(webUiUrl)}`);
  apiReady = true;
}

export async function waitForInstance() {
  if (instance) {
    console.log("Press Ctrl + C to stop ngrok");
    await instance;
  }
}

export async function stopInstance() {
  if (instance) {
    console.log("Stopping ngrok...");
    await instance.kill();
    instance = null;
    console.log("Ngrok stopped gracefully");
  }

  apiReady = false;
}

export async function startTunnel(options) {
  if (!apiReady) {
    throw new Error("Ngrok is not running");
  }

  const res = await fetch(`${apiBaseUrl}/tunnels`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    throw new Error("Failed to start tunnel");
  }

  return await res.json();
}

async function findBinary() {
  for (const bin of ["./ngrok", "ngrok"]) {
    if ((await nothrow($`which ${bin}`)).exitCode === 0) {
      return bin;
    }
  }

  throw new Error("Cannot find ngrok binary");
}

async function checkApiReady() {
  try {
    await fetch(`${apiBaseUrl}/tunnels`);
  } catch (e) {
    return false;
  }

  return true;
}
