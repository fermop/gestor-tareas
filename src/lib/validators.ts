// ── Validation constants ──
const MAX_TITLE_LENGTH = 150;
const MAX_PROJECT_NAME_LENGTH = 100;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];

// ── Custom error class for service-layer validation ──
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// ── Validators ──

export function validateRequiredString(value: string, fieldName: string, maxLength: number): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new ValidationError(`${fieldName} is required.`);
  }
  if (trimmed.length > maxLength) {
    throw new ValidationError(`${fieldName} must be ${maxLength} characters or less.`);
  }
  return trimmed;
}

export function validateTaskTitle(title: string): string {
  return validateRequiredString(title, "Task title", MAX_TITLE_LENGTH);
}

export function validateProjectName(name: string): string {
  return validateRequiredString(name, "Project name", MAX_PROJECT_NAME_LENGTH);
}

export function validateImageFile(file: File): void {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new ValidationError(
      `Invalid file type "${file.type}". Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}.`
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    throw new ValidationError(`File is too large (${sizeMB} MB). Maximum allowed is 5 MB.`);
  }
}

export function validateId(id: string, fieldName: string): void {
  if (!id || !id.trim()) {
    throw new ValidationError(`${fieldName} is required.`);
  }
}
