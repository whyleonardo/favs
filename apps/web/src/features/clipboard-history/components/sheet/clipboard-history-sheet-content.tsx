import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useStore } from "@/hooks/use-store"
import { clipboardStore } from "@/store/clipboard-store"

export const ClipboardHistorySheetContent = () => {
  const useClipboard = useStore(clipboardStore, (state) => state)

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>your clipboard history</SheetTitle>
        <SheetDescription>
          here you can view old links you have imported to grek.
        </SheetDescription>

        <ul>
          {useClipboard?.clipboardHistory.map((item) => (
            <li key={item.date.toString()}>{item.url}</li>
          ))}
        </ul>
      </SheetHeader>
    </SheetContent>
  )
}
