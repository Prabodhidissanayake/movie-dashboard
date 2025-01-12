import { create } from 'zustand'
import { SupportedLanguage } from '../utils/languages'

interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en-US',
  setLanguage: (language) => set({ language }),
}))