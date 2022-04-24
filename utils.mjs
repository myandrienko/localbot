export async function until(
  predicate,
  { sleepDurationMs = 500, sleepBefore = true } = {}
) {
  if (sleepBefore) {
    await sleep(sleepDurationMs);
  }

  while (!(await predicate())) {
    await sleep(sleepDurationMs);
  }
}
