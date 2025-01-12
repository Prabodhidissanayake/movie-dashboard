import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SupportedLanguage } from '../utils/languages'

interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en-US',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
)