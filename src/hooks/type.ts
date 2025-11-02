import { GoogleOAuthResponse } from "@/types/auth";

export interface googleConfig {
  clientId: string;
  scope: string;
  redirectUri: string;
}

export interface GoogleAccountsOAuth2Error {
  type?: string;
  message?: string;
  status?: number;
}

export interface UseGoogleOAuthOptions {
  onSuccess?: (data: GoogleOAuthResponse) => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
            error_callback?: (error: GoogleAccountsOAuth2Error) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}
