import type { Dispatch, SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import {
  CredenzaBody,
  CredenzaClose,
  CredenzaFooter,
} from "@/components/ui/credenza"
import { CreateLinkForm } from "@/features/clipboard-history/components/forms/create-link-form"

export const createNewLinkSteps = [
  {
    index: 1,
    id: "ask-creation",
    title: "Create a new link",
    description: "Create a new link",
    component: ({
      setActiveStep,
    }: {
      setActiveStep?: Dispatch<SetStateAction<number>>
    }) => {
      return (
        <>
          <CredenzaBody>
            <p>create a new link with the url on your clipboard?</p>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant="ghost">cancel</Button>
            </CredenzaClose>

            <Button onClick={() => (setActiveStep ? setActiveStep(2) : null)}>
              create
            </Button>
          </CredenzaFooter>
        </>
      )
    },
  },
  {
    index: 2,
    id: "create-new-lin1k",
    title: "Create a new link",
    description: "Create a new link",
    component: () => {
      return <CreateLinkForm />
    },
  },
]
