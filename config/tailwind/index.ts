import resolveConfig from "tailwindcss/resolveConfig"

import { config } from "./config"

export const tailwindConfig = resolveConfig(config)
