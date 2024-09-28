import { usePage } from '@inertiajs/react'

export function useI18n() {
  const page = usePage<{ locale: string; translations: Record<string, string> }>()

  function t(key: string, fallback?: string): string {
    return page.props.translations[key] ?? fallback ?? key
  }

  return {
    locale: page.props.locale,
    t,
  }
}
