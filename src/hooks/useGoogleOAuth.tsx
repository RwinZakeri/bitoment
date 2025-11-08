import { GoogleOAuthResponse } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import {
  GoogleAccountsOAuth2Error,
  googleConfig,
  UseGoogleOAuthOptions,
} from "./type";

const useGoogleOAuth = (
  config: googleConfig,
  options?: UseGoogleOAuthOptions
) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = useCallback(async () => {
    
    if (!window.google) {
      
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!window.google) {
        options?.onError?.(
          "Google API not loaded. Please make sure Google Sign-In script is included."
        );
        return;
      }
    }

    if (!config.clientId) {
      options?.onError?.("Google OAuth client ID is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      const googleApi = window.google;

      return new Promise<void>((resolve, reject) => {
        const client = googleApi.accounts.oauth2.initTokenClient({
          client_id: config.clientId,
          scope: config.scope,
          callback: async (response) => {
            try {
              if (!response.access_token) {
                throw new Error("No access token received from Google");
              }

              
              const apiResponse = await axios.post<GoogleOAuthResponse>(
                "/api/auth/google",
                { accessToken: response.access_token }
              );

              if (!apiResponse.data.success) {
                throw new Error(
                  apiResponse.data.message || "Authentication failed"
                );
              }

              
              options?.onSuccess?.(apiResponse.data);
              resolve();
            } catch (error) {
              const errorMessage =
                (error as AxiosError<{ message?: string }>)?.response?.data
                  ?.message ||
                (error instanceof Error
                  ? error.message
                  : "Failed to authenticate with Google");
              options?.onError?.(errorMessage);
              reject(error);
            } finally {
              setIsLoading(false);
            }
          },
          error_callback: (error: GoogleAccountsOAuth2Error) => {
            setIsLoading(false);

            
            const isPopupClosed =
              error.type === "popup_closed" ||
              error.message?.toLowerCase().includes("popup window closed") ||
              error.message?.toLowerCase().includes("popup closed");

            if (isPopupClosed) {
              
              resolve();
              return;
            }

            
            const errorMessage =
              error.message || "Google authentication failed";
            options?.onError?.(errorMessage);
            reject(error);
          },
        });

        client.requestAccessToken();
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      options?.onError?.(errorMessage);
    }
  }, [config, options]);

  return { signInWithGoogle, isLoading };
};

export default useGoogleOAuth;
