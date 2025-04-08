export const removeProtocolFromUrl = (url: string) => {
  if (url.startsWith("https://")) {
    return url.split("https://")[1]
  }

  return url
}
