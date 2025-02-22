"use client"

import { useRef, useState } from "react"

import { ErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

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
} from "@/features/clipboard-history/types"
import { useCreateLink } from "@/features/links/queries/use-create-link"
import { useFetchTags } from "@/features/tags/queries/use-fetch-tags"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

import { type Tag, TagInput } from "emblor"
import { LucideLoader2 } from "lucide-react"

export const CreateLinkForm = () => {
  const { data: userTags } = useFetchTags()
  const { mutate, isPending } = useCreateLink()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const tagsOptions = userTags?.map((tag) => ({
    id: tag.id,
    text: tag.name,
  }))

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const useClipboard = useStore(clipboardStore, (state) => state)

  const url = useClipboard?.clipboardHistory.at(-1)?.url

  const form = useForm<CreateLinkFormData>({
    // @ts-expect-error - missing types
    resolver: zodResolver(createLinkSchema),
    values: {
      title: "",
      url: url ?? "",
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        json: {
          ...data,
          tags: data?.tags?.map((tag) => tag.text),
        },
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
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="font-semibold">
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

        <div className="flex flex-col gap-1">
          <Label htmlFor="url" className="font-semibold">
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
              <p className="text-destructive text-[0.75rem] tracking-tight">
                {message}
              </p>
            )}
          />
        </div>

        <div className="flex max-w-full flex-col gap-1">
          <Label htmlFor="tags" className="font-semibold">
            tags
          </Label>

          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <TagInput
                {...field}
                tags={tags}
                placeholder="add tag"
                inlineTags={false}
                inputFieldPosition="bottom"
                autocompleteOptions={tagsOptions}
                enableAutocomplete
                setTags={(newTags) => {
                  setTags(newTags)
                  form.setValue("tags", newTags as [Tag, ...Tag[]])
                }}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
                styleClasses={{
                  tagList: {
                    container: "gap-1 mb-2",
                  },
                  input:
                    "rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring/40 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/8 dark:focus-visible:ring-ring/12 w-[92.5%]",
                  autoComplete: {
                    commandGroup: "p-3 ",
                  },
                  tag: {
                    body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
                    closeButton:
                      "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 dark:focus-visible:ring-ring/40 text-muted-foreground/80 hover:text-foreground",
                  },
                }}
              />
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
