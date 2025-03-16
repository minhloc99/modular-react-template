export function formatTime(time: string) {
  const date = new Date(time);

  return {
    fullDateTime: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    date: date.toLocaleDateString(),
  }
}