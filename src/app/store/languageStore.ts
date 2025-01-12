import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en-US' | 'es-ES' | 'fr-FR'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
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