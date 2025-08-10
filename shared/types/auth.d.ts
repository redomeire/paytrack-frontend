// auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    avatar_url?: string;
    timezone?: string;
    currency?: string;
    is_verified: boolean;
    email_verified_at?: string;
  }

  interface UserSession {
    user: User | null;
    token: string | null;
    loggedInAt: Date | null;
    secureSessionData?: SecureSessionData; // Optional field for additional secure session data
  }
}

export {};
