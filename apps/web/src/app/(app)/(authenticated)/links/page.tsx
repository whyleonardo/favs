import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateLinkForm } from "@/features/links/components/forms/create-link-form"
import { LinksContainer } from "@/features/links/components/links-container"

import { PlusIcon } from "lucide-react"

const LinksPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <header className="flex h-14 w-full items-center">
        <Credenza>
          <CredenzaTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <PlusIcon /> New link
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Hey</CredenzaTitle>
            </CredenzaHeader>
            <ScrollArea>
              <div>
                <CreateLinkForm />
              </div>
            </ScrollArea>
          </CredenzaContent>
        </Credenza>
      </header>

      <main>
        <LinksContainer />
      </main>
    </div>
  )
}

export default LinksPage
