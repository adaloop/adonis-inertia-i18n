# @adaloop/adonis-inertia-i18n

[![GitHub Actions Status](https://img.shields.io/github/actions/workflow/status/adaloop/adonis-inertia-i18n/test.yml?branch=main&style=flat)](https://github.com/adaloop/adonis-inertia-i18n/actions?query=workflow:Tests+branch:main)
[![Coverage Status](https://coveralls.io/repos/github/adaloop/adonis-inertia-i18n/badge.svg?branch=main)](https://coveralls.io/github/adaloop/adonis-inertia-i18n?branch=main)
[![GitHub issues](https://img.shields.io/github/issues/adaloop/adonis-inertia-i18n)](https://img.shields.io/github/issues/adaloop/adonis-inertia-i18n)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/adaloop/adonis-inertia-i18n)](https://img.shields.io/github/issues-pr/adaloop/adonis-inertia-i18n)
[![npm version](https://badge.fury.io/js/%40adaloop%2Fadonis-inertia-i18n.svg)](https://badge.fury.io/js/%40adaloop%2Fadonis-inertia-i18n)
[![License](https://img.shields.io/github/license/adaloop/adonis-inertia-i18n)](https://img.shields.io/github/license/adaloop/adonis-inertia-i18n)

This package provide a simple way to use @adonisjs/i18n in your [AdonisJS](https://adonisjs.com) application using [InertiaJS](https://inertiajs.com).

## Installation

Install and configure the package using the following command :

```bash
node ace add @adaloop/adonis-inertia-i18n
```

Then add the following lines to your `detect_user_locale_middleware.ts` file :

> [!NOTE]  
> This file is created by `@adonisjs/i18n` package.

```ts
export default class DetectUserLocaleMiddleware {
  // This method already exists but you must return a string instead of string | null, then return the default locale if the user doesn't have a locale
  protected getRequestLocale(ctx: HttpContext) {
    const userLanguages = ctx.request.languages()
    return i18nManager.getSupportedLocaleFor(userLanguages) ?? i18nManager.defaultLocale
  }

  async handle(ctx: HttpContext, next: NextFn) {
    // rest of the method...

    /**
     * Sharing translations to inertia view
     */
    if ('inertia' in ctx) {
      ctx.inertia.share({
        locale: language,
        translations: i18nManager.getTranslationsFor(language),
      })
    }

    return next()
  }
}
```

## Usage

### React

```tsx
import { useI18n } from '@adaloop/adonis-inertia-i18n/hooks/react'

function MyComponent() {
  const { t } = useI18n()

  return (
    <>
      <h1>{t('my.i18n.key')}</h1>
      <p>{t('my.i18n.key', 'Fallback')}</p>
    </>
  )
}
```

### Vue 3

```vue
<script setup>
import { useI18n } from '@adaloop/adonis-inertia-i18n/hooks/vue'

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('my.i18n.key') }}</h1>
  <p>{{ t('my.i18n.key', 'Fallback') }}</p>
</template>
```

## Contributing

Thank you for being interested in making this package better. We encourage everyone to help improve this project with new features, bug fixes, or performance improvements. Please take a little bit of your time to read our guide to make this process faster and easier.

### Contribution Guidelines

To understand how to submit an issue, commit and create pull requests, check our [Contribution Guidelines](/.github/CONTRIBUTING.md).

### Code of Conduct

We expect you to follow our [Code of Conduct](/.github/CODE_OF_CONDUCT.md). You can read it to understand what kind of behavior will and will not be tolerated.

## License

[MIT](./LICENSE.md)
