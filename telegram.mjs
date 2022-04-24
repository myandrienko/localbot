const apiBaseUrl = "https://api.telegram.org/bot";

export async function setBotWebhook({ token, url }) {
  console.log(`Setting bot hook to ${chalk.blue(url)}...`);

  const res = await fetch(`${apiBaseUrl}${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(`Failed to set webhook: ${body.description}`);
  }
}
