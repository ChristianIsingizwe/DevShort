declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DATABASE_AUTH_TOKEN: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
      MAX_FILE_SIZE: string;
      UPLOAD_TIMEOUT: string;
    }
  }
}

export {}