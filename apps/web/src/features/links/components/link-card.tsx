"use client"

import { useFetchLinks } from "../queries/use-fetch-links"

export const LinkCard = () => {
  const { data } = useFetchLinks()

  return <div>{JSON.stringify(data, null, 2)}</div>
}
