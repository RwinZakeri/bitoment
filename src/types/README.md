# Global Types System

This directory contains all global types, enums, and constants used throughout the application, following TypeScript best practices.

## Structure

```
src/types/
├── global.ts          # Main types file with all enums, interfaces, and constants
├── index.ts           # Centralized export point
└── README.md          # This documentation file
```

## Usage

### Importing Types

```typescript
// Import specific types
import { TwoFactorMethod, Language, Theme } from "@/types";

// Import all types
import * as Types from "@/types";

// Import with alias
import { TwoFactorMethod as TFA } from "@/types";
```

### Available Enums

- **TwoFactorMethod**: SMS, EMAIL, GOOGLE_AUTHENTICATOR
- **Language**: ENGLISH, SPANISH, FRENCH, GERMAN, CHINESE, ARABIC
- **Theme**: LIGHT, DARK, SYSTEM_DEFAULT
- **Currency**: USD, EUR
- **ButtonSize**: MEDIUM, LARGE
- **RadioVariant**: DEFAULT, TURQUOISE

### Available Interfaces

- **BaseOption**: Generic option type for dropdowns, radio buttons
- **TwoFactorOption**: Two-factor authentication option
- **LinkedOptionsProps**: Linked options component props
- **ButtonProps**: Button component props
- **RadioProps**: Radio button component props
- **ProfileItem**: Profile item interface

### Available Constants

- **SETTING_LINKED_OPTIONS**: Setting page options
- **LANGUAGE_OPTIONS**: Language selection options
- **THEME_OPTIONS**: Theme selection options
- **CURRENCY_OPTIONS**: Currency selection options

### Utility Functions

- **isTwoFactorMethod()**: Type guard for TwoFactorMethod
- **isLanguage()**: Type guard for Language
- **isTheme()**: Type guard for Theme
- **isCurrency()**: Type guard for Currency
- **getEnumKeyByValue()**: Get enum key by value
- **getEnumValueByKey()**: Get enum value by key
- **enumToOptions()**: Convert enum to options array

## Best Practices

1. **Use Enums**: Always use enums for fixed sets of values instead of magic numbers or strings
2. **Type Guards**: Use provided type guards for runtime type checking
3. **Consistent Naming**: Follow PascalCase for enums and interfaces
4. **Documentation**: Add JSDoc comments for complex types
5. **Backward Compatibility**: Maintain backward compatibility when updating types

## Examples

### Using Enums

```typescript
import { TwoFactorMethod } from "@/types";

const handleTwoFactorSelection = (method: TwoFactorMethod) => {
  switch (method) {
    case TwoFactorMethod.SMS:
      // Handle SMS
      break;
    case TwoFactorMethod.EMAIL:
      // Handle Email
      break;
    case TwoFactorMethod.GOOGLE_AUTHENTICATOR:
      // Handle Google Authenticator
      break;
  }
};
```

### Using Type Guards

```typescript
import { isTwoFactorMethod } from "@/types";

const validateInput = (value: unknown) => {
  if (isTwoFactorMethod(value)) {
    // TypeScript knows value is TwoFactorMethod here
    console.log("Valid two-factor method:", value);
  }
};
```

### Using Utility Functions

```typescript
import { enumToOptions, TwoFactorMethod } from "@/types";

const twoFactorOptions = enumToOptions(TwoFactorMethod, (key) =>
  key.replace("_", " ").toLowerCase()
);
```

## Migration Guide

When migrating existing code to use global types:

1. Replace local enums with global enums
2. Update imports to use `@/types`
3. Use type guards for runtime validation
4. Leverage utility functions for common operations
5. Maintain backward compatibility with type aliases

## Adding New Types

When adding new types to the global system:

1. Add to `global.ts` with proper documentation
2. Export from `index.ts`
3. Update this README
4. Consider backward compatibility
5. Add type guards if needed
6. Add utility functions if beneficial
