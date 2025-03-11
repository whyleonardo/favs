"use client"

import {
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

import { CreateLinkForm } from "../forms/create-link-form"

export const CreateNewLinkModal = () => {
  return (
    <CredenzaContent>
      <CredenzaHeader>
        <CredenzaTitle>we detected a link in your clipboard</CredenzaTitle>
      </CredenzaHeader>
      <CreateLinkForm />
    </CredenzaContent>
  )
}
