"use client"

import { useRef } from "react"

import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { FormInput } from "@/components/common/forms/form-input"
import {
  TagCreator,
  TagCreatorCommand,
  TagCreatorCommandTrigger,
  TagCreatorProvider,
} from "@/components/tag-creator"
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
import { useCreateLink } from "@/features/links/api/use-create-link"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

import { Loader2Icon } from "lucide-react"

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
    <form className="min-h-fit space-y-4" onSubmit={onSubmit}>
      <CredenzaBody className="space-y-4">
        <FormInput />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url" className="text-s font-semibold">
            URL
          </Label>

          <div className="relative">
            <Input id="url" className="peer ps-16" type="text" />
            <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
              https://
            </span>
          </div>

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
          <Label htmlFor="description" className="text-s font-semibold">
            Description
          </Label>

          <Textarea
            id="description"
            placeholder="Describe your new link"
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
          <Label htmlFor="tags" className="text-s font-semibold">
            Tags
          </Label>

          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <TagCreatorProvider>
                <TagCreator>
                  <TagCreatorCommandTrigger id="tags" />
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
            Cancel
          </Button>
        </CredenzaClose>

        <Button type="submit" disabled={!form.formState.isValid || isPending}>
          Create
          {isPending && <Loader2Icon className="size-3.5 animate-spin" />}
        </Button>
      </CredenzaFooter>
    </form>
  )
}
