import twColors from "tailwindcss/colors"

import { colorsToFilter } from "./constants"
import type { CSSVariableColor, CSSVariableColorState, Colors } from "./types"

export const COLORS = Object.keys(twColors).filter(
  (twColor) => !colorsToFilter.includes(twColor)
) as Colors[]

export const getComputedCSSColorsVariables = (document: Document) => {
  const styles = window.getComputedStyle(document.documentElement)
  const cssVars = [] as CSSVariableColor[]
  let cssVarsReduced = [] as CSSVariableColorState[]

  for (const prop of Array.from(styles)) {
    if (prop.startsWith("--")) {
      const propertyValue = styles.getPropertyValue(prop)

      const hslKey = "hsl("

      if (propertyValue.startsWith(hslKey)) {
        const propertyName = prop.split("--")[1]

        cssVars.push({
          name: propertyName,
          value: propertyValue,
        })

        cssVarsReduced = cssVars.reduce((acc, curr) => {
          if (curr.name.includes("sidebar")) {
            acc.push({
              key: "sidebar",
              color: {
                name: curr.name,
                value: curr.value,
              },
            })

            return acc
          }

          if (curr.name.includes("chart")) {
            acc.push({
              key: "chart",
              color: {
                name: curr.name,
                value: curr.value,
              },
            })

            return acc
          }

          acc.push({
            key: "common",
            color: {
              name: curr.name,
              value: curr.value,
            },
          })

          return acc
        }, [] as CSSVariableColorState[])
      }
    }
  }

  return cssVarsReduced
}
