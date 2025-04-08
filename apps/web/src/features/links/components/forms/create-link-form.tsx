"use client"

import { useEffect, useRef } from "react"

import { createFormHook } from "@tanstack/react-form"

import { FormInput } from "@/components/common/forms/form-input"
import { FormTagCreator } from "@/components/common/forms/form-tag-creator"
import { FormTextarea } from "@/components/common/forms/form-textarea"
import { SubmitButton } from "@/components/common/forms/submit-button"
import { Button } from "@/components/ui/button"
import {
  CredenzaBody,
  CredenzaClose,
  CredenzaFooter,
} from "@/components/ui/credenza"
import {
  type CreateLinkFormData,
  createLinkSchema,
} from "@/features/clipboard/types"
import { useCreateLink } from "@/features/links/api/use-create-link"
import { useStore } from "@/hooks/use-store"
import { fieldContext, formContext } from "@/lib/form"
import { clipboardStore } from "@/store/clipboard-store"
import { removeProtocolFromUrl } from "@/utils/remove-protocol-from-url"

const { useAppForm } = createFormHook({
  fieldComponents: {
    FormInput,
    FormTextarea,
    FormTagCreator,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

export const CreateLinkForm = () => {
  const { mutate, isPending: isCreatingLink } = useCreateLink()
  const useClipboard = useStore(clipboardStore, (state) => state)

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const form = useAppForm({
    defaultValues: {
      title: "",
      url: "",
      description: "",
      tags: [],
    } as CreateLinkFormData,
    validators: {
      onSubmit: createLinkSchema,
    },
    onSubmit: ({ value }) => {
      const url = value.url.startsWith("https://")
        ? removeProtocolFromUrl(value.url)
        : value.url

      mutate(
        {
          json: {
            title: value.title,
            url,
            description: value.description,
            tags: value.tags ? value.tags.map((tag) => tag) : [],
          },
        },
        {
          onSuccess: () => {
            closeButtonRef.current?.click()
            useClipboard?.setClipboardHistory("")
          },
        }
      )
    },
  })

  useEffect(() => {
    const clipboard = useClipboard?.clipboardHistory
    if (clipboard) {
      if (clipboard.startsWith("https://")) {
        form.setFieldValue("url", removeProtocolFromUrl(clipboard))

        return
      }

      form.setFieldValue("url", clipboard)
    }
  }, [useClipboard?.clipboardHistory, form.setFieldValue])

  return (
    <form
      className="min-h-fit space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
    >
      <CredenzaBody className="space-y-4">
        <form.AppField
          name="title"
          children={(field) => (
            <field.FormInput
              label={field.name}
              placeholder="Choose your link title"
            />
          )}
        />

        <form.AppField
          name="url"
          children={(field) => (
            <field.FormInput
              variant="link"
              label={field.name}
              placeholder="example.com"
              helperText="Hello, guys!"
            />
          )}
        />

        <form.AppField
          name="description"
          children={(field) => (
            <field.FormTextarea
              label={field.name}
              placeholder="Give a description to your link"
            />
          )}
        />

        <form.AppField
          name="tags"
          children={(field) => <field.FormTagCreator />}
        />
      </CredenzaBody>

      <CredenzaFooter>
        <CredenzaClose className="cursor-pointer" asChild>
          <Button variant="ghost" ref={closeButtonRef}>
            Cancel
          </Button>
        </CredenzaClose>

        <form.AppForm>
          <form.Subscribe
            children={(field) => (
              <form.SubmitButton
                canSubmit={field.canSubmit}
                isPending={isCreatingLink || field.isSubmitting}
              />
            )}
          />
        </form.AppForm>
      </CredenzaFooter>
    </form>
  )
}
