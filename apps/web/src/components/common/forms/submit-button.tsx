"use client"

import { Button } from "@/components/ui/button"

import { Loader2Icon } from "lucide-react"

interface SubmitButtonProps {
  isPending: boolean
  canSubmit: boolean
}

export const SubmitButton = ({ isPending, canSubmit }: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={!canSubmit || isPending}>
      Create
      {isPending && <Loader2Icon className="size-3.5 animate-spin" />}
    </Button>
  )
}
