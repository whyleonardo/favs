"use client"

import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { insertLinksSchema } from "@grek/db/schemas"

import { Button } from "@/components/ui/button"
import {
  CredenzaBody,
  CredenzaClose,
  CredenzaFooter,
} from "@/components/ui/credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CreateLinkFormData } from "@/features/clipboard-history/types"

const schema = insertLinksSchema.pick({
  title: true,
  url: true,
  description: true,
})

export const CreateLinkForm = () => {
  const form = useForm<CreateLinkFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form
      className="min-h-fit space-y-4 overflow-y-scroll p-2"
      onSubmit={onSubmit}
    >
      <CredenzaBody className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="font-semibold">
            title
          </Label>
          <Input id="title" {...form.register("title")} />

          <ErrorMessage
            errors={form.formState.errors}
            name="title"
            render={({ message }) => (
              <p className="text-xs tracking-tight text-red-500">{message}</p>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="url" className="font-semibold">
            url
          </Label>

          <Input id="url" {...form.register("url")} />

          <ErrorMessage
            errors={form.formState.errors}
            name="url"
            render={({ message }) => (
              <p className="text-xs tracking-tight text-red-500">{message}</p>
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="url" className="font-semibold">
            description
          </Label>

          <Textarea
            id="description"
            className="resize-none"
            {...form.register("description")}
          />

          <ErrorMessage
            errors={form.formState.errors}
            name="description"
            render={({ message }) => (
              <p className="text-xs tracking-tight text-red-500">{message}</p>
            )}
          />
        </div>
      </CredenzaBody>

      <CredenzaFooter>
        <CredenzaClose asChild>
          <Button variant="ghost">cancel</Button>
        </CredenzaClose>

        <Button type="submit">create</Button>
      </CredenzaFooter>
    </form>
  )
}
