import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type ClipboardItem = {
  url: string
  date: Date
}

interface IClipboardState {
  clipboardHistory: ClipboardItem[]
  setClipboardHistory: (clipboardItem: ClipboardItem) => void
}

export const clipboardStore = create<IClipboardState>()(
  persist(
    (set, get) => ({
      clipboardHistory: [],
      setClipboardHistory: (clipboardItem: ClipboardItem) => {
        set(() => ({
          clipboardHistory: get().clipboardHistory.concat(clipboardItem),
        }))
      },
    }),
    {
      name: "clipboard-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
