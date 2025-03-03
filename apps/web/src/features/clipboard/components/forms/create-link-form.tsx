"use client"

import { useRef } from "react"

import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  TagCreator,
  TagCreatorCommand,
  TagCreatorCommandTrigger,
  TagCreatorProvider,
} from "@/components/testing"
import { Button } from "@/components/ui/button"
import {
  CredenzaBody,
  CredenzaClose,
  CredenzaFooter,
} from "@/components/ui/credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  type CreateLinkFormData,
  createLinkSchema,
} from "@/features/clipboard/types"
import { useCreateLink } from "@/features/links/queries/use-create-link"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

import { LucideLoader2 } from "lucide-react"

export const CreateLinkForm = () => {
  const { mutate, isPending } = useCreateLink()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const useClipboard = useStore(clipboardStore, (state) => state)

  const url = useClipboard?.clipboardHistory

  const form = useForm<CreateLinkFormData>({
    // @ts-expect-error - missing types
    resolver: zodResolver(createLinkSchema),
    mode: "onSubmit",
    values: {
      title: "",
      url: url ?? "",
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        json: data,
      },
      {
        onSuccess: () => {
          closeButtonRef.current?.click()
        },
      }
    )
  })

  return (
    <form className="mt-2 min-h-fit space-y-4" onSubmit={onSubmit}>
      <CredenzaBody className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title" className="text-xs font-semibold">
            title
          </Label>

          <Input id="title" {...form.register("title")} />

          <ErrorMessage
            errors={form.formState.errors}
            name="title"
            render={({ message }) => (
              <p className="text-destructive text-[0.75rem] tracking-tight">
                {message}
              </p>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url" className="text-xs font-semibold">
            url
          </Label>

          <Input id="url" {...form.register("url")} />

          <ErrorMessage
            errors={form.formState.errors}
            name="url"
            render={({ message }) => (
              <p className="text-destructive text-[0.75rem] tracking-tight">
                {message}
              </p>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url" className="text-xs font-semibold">
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
              <p className="text-destructive text-[0.75rem] tracking-tight">
                {message}
              </p>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tags" className="text-xs font-semibold">
            tags
          </Label>

          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <TagCreatorProvider>
                <TagCreator>
                  <TagCreatorCommandTrigger />
                  <TagCreatorCommand {...field} />
                </TagCreator>
              </TagCreatorProvider>
            )}
          />

          <ErrorMessage
            errors={form.formState.errors}
            name="tags"
            render={({ message }) => (
              <p className="text-destructive text-[0.75rem] tracking-tight">
                {message}
              </p>
            )}
          />
        </div>
      </CredenzaBody>

      <CredenzaFooter>
        <CredenzaClose className="cursor-pointer" asChild>
          <Button variant="ghost" ref={closeButtonRef}>
            cancel
          </Button>
        </CredenzaClose>

        <Button type="submit" disabled={!form.formState.isValid}>
          create
          {isPending && <LucideLoader2 className="size-3.5 animate-spin" />}
        </Button>
      </CredenzaFooter>
    </form>
  )
}
