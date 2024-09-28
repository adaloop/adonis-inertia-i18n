import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

export function useI18n() {
  const page = usePage<{ locale: string; translations: Record<string, string> }>()

  const locale = computed(() => page.props.locale)

  function t(key: string, fallback?: string): string {
    return page.props.translations[key] ?? fallback ?? key
  }

  return {
    locale,
    t,
  }
}
