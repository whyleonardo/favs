"use client"

import {
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

import { CreateLinkForm } from "../forms/create-link-form"

export const CreateNewLinkModal = () => {
  return (
    <CredenzaContent className="!w-[1500px]">
      <CredenzaHeader>
        <CredenzaTitle>we detected a link in your clipboard</CredenzaTitle>
      </CredenzaHeader>
      <CreateLinkForm />
    </CredenzaContent>
  )
}
