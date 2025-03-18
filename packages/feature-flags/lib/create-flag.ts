import { flag } from "flags/next"

export const createFlag = (key: string) =>
  flag({
    key,
    defaultValue: false,
    async decide() {
      // const { data, error } = await getSession()

      // const userId = data?.user.id

      return this.defaultValue as boolean
    },
  })
