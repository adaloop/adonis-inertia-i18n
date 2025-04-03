import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { IntlMessageFormat } from 'intl-messageformat'

// Define a type for the formatter function
type Formatter = (message: string, data: Record<string, any>, locale: string) => string

// Default formatter using IntlMessageFormat
const defaultFormatter: Formatter = (message, vars, locale) => {
  try {
    const msg = new IntlMessageFormat(message, locale)
    return msg.format(vars) as string
  } catch (error) {
    console.error(`Error formatting message: ${message}`, error)
    return message // Fallback to raw message on error
  }
}

export function useI18n(formatter: Formatter = defaultFormatter) {
  const page = usePage<{ locale: string; translations: Record<string, string> }>()

  const locale = computed(() => page.props.locale)

  // Main t function with enhanced capabilities and backwards compatibility
  function t(
    key: string,
    dataOrFallback?: Record<string, any> | string,
    fallback?: string
  ): string {
    // Handle the old signature: t(key, fallback)
    if (typeof dataOrFallback === 'string') {
      return page.props.translations[key] ?? dataOrFallback ?? key
    }

    // Handle the new signature: t(key, data, fallback)
    const message = page.props.translations[key] ?? fallback ?? key
    if (dataOrFallback && typeof dataOrFallback === 'object') {
      return formatter(message, dataOrFallback, locale.value)
    }
    return message
  }

  return {
    locale,
    t,
  }
}
