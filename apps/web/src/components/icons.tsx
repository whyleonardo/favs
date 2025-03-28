import type { SVGProps } from "react"

export const Icons = {
  shadcn: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" strokeWidth={25} d="M208 128l-80 80M192 40L40 192" />
    </svg>
  ),
}
