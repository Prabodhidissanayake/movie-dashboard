"use client";

import { useLanguageStore } from "@/app/store/languageStore";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/app/utils/languages";
import { useState } from "react";

export default function SettingsPage() {
  const { language, setLanguage } = useLanguageStore();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(language);
  const [isSaving, setIsSaving] = useState(false);

  const hasChanges = selectedLanguage !== language;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulating a save operation
      await new Promise((resolve) => setTimeout(resolve, 200));
      setLanguage(selectedLanguage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <section className="max-w-md">
        <h2 className="text-xl font-semibold mb-4">Language Preferences</h2>

        <div className="space-y-4">
          <select
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(e.target.value as SupportedLanguage)
            }
            className="w-full p-2 border rounded-lg bg-white"
            disabled={isSaving}
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className={`flex items-center justify-center w-full px-4 py-2 rounded-lg text-white
              ${
                hasChanges
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              } ${isSaving ? "cursor-wait" : ""}`}
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          <p className="text-sm text-gray-600">
            Current language: {SUPPORTED_LANGUAGES[language]}
          </p>

          {hasChanges && !isSaving && (
            <p className="text-sm text-blue-600">You have unsaved changes</p>
          )}
        </div>
      </section>
    </main>
  );
}
