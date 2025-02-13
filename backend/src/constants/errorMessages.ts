export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_TOKEN: 'Invalid or expired token',
    NO_TOKEN: 'No authentication token provided',
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_CREDENTIALS: 'Invalid credentials',
    ACCOUNT_EXISTS: 'Account already exists',
    ACCOUNT_NOT_FOUND: 'Account not found',
    INVALID_PROVIDER: 'Invalid authentication provider',
    SESSION_EXPIRED: 'Authentication session expired',
  },
  USER: {
    NOT_FOUND: 'User not found',
    INVALID_INPUT: 'Invalid user input',
    EMAIL_EXISTS: 'Email already exists',
    USERNAME_EXISTS: 'Username already exists',
  },
  SERVER: {
    INTERNAL_ERROR: 'Internal server error',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
    BAD_GATEWAY: 'Bad gateway',
  },
  VALIDATION: {
    INVALID_REQUEST: 'Invalid request data',
    MISSING_FIELDS: 'Required fields are missing',
  }
}; 