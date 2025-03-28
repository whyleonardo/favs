const regex = /^https:\/\/([^/?#]+)/i

export const getUrlDomain = (url: string) => {
  if (!url.startsWith("https://")) {
    return url.split("/")[0]
  }

  const match = url.match(regex)
  return match ? match[1] : url
}
