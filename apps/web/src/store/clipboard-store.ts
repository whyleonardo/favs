import { create } from "zustand"

interface IClipboardState {
  clipboardHistory: string | null
  setClipboardHistory: (clipboardItem: string) => void
}

export const clipboardStore = create<IClipboardState>()((set) => ({
  clipboardHistory: null,
  setClipboardHistory: (clipboardItem: string) => {
    set(() => ({
      clipboardHistory: clipboardItem,
    }))
  },
}))
