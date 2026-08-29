export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export const settingsValidationMessages = {
  required: "This field is required",
  email: "Enter a valid email address",
  minPassword: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  passwordMismatch: "Passwords do not match",
} as const;

export const contactValidationMessages = {
  required: "This field is required",
  email: "Enter a valid email address",
  minName: "Name must be at least 2 characters",
  minMessage: "Message must be at least 10 characters",
} as const;
