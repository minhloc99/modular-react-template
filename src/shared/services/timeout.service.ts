export function setCustomTimeout(callback: () => void, minDelay: number = 300, maxDelay: number = 2000) {
  const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  return setTimeout(callback, randomDelay);
}