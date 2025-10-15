import {
  BaseOption,
  CURRENCY_OPTIONS,
  LANGUAGE_OPTIONS,
  LinkedOptionsProps,
  SETTING_LINKED_OPTIONS,
  THEME_OPTIONS,
} from "@/types";

// Re-export types for backward compatibility
export type optionsType = BaseOption;
export type LinkedOptionsPropsType = LinkedOptionsProps;

// Re-export constants for backward compatibility
export const settingLinkedOptions = SETTING_LINKED_OPTIONS;
export const Language = LANGUAGE_OPTIONS;
export const Theme = THEME_OPTIONS;
export const Currency = CURRENCY_OPTIONS;
