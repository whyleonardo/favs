import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface IClipboardState {
  clipboardHistory: string | null
  setClipboardHistory: (clipboardItem: string) => void
}

export const clipboardStore = create<IClipboardState>()(
  persist(
    (set) => ({
      clipboardHistory: null,
      setClipboardHistory: (clipboardItem: string) => {
        set(() => ({
          clipboardHistory: clipboardItem,
        }))
      },
    }),
    {
      name: "clipboard-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
