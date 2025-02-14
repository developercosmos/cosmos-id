
// HTML DOM Parser Constants
export type HDOM_TYPE = number;
export const HDOM_TYPE_VALUES = {
  ELEMENT: 1,
  COMMENT: 2,
  TEXT: 3,
  ENDTAG: 4,
  ROOT: 5,
  UNKNOWN: 6
} as const;

export type HDOM_INFO = number;
export const HDOM_INFO_VALUES = {
  BEGIN: 0,
  END: 1,
  QUOTE: 2,
  SPACE: 3,
  TEXT: 4,
  INNER: 5,
  OUTER: 6,
  ENDSPACE: 7
} as const;

export const HDOM_QUOTE = {
  DOUBLE: 0,
  SINGLE: 1,
  NO: 3
} as const;

export const DEFAULT_TARGET_CHARSET = 'UTF-8';
export const DEFAULT_BR_TEXT = '\r\n';
export const DEFAULT_SPAN_TEXT = ' ';
export const MAX_FILE_SIZE = 600000;
export const HDOM_SMARTY_AS_TEXT = 1;
