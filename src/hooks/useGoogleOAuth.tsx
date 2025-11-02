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
      options?.onError?.(
        "Google API not loaded. Please make sure Google Sign-In script is included."
      );
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
              const apiResponse = await axios.post<GoogleOAuthResponse>(
                "/api/auth/google",
                { accessToken: response.access_token }
              );

              if (!apiResponse.data.success) {
                throw new Error(apiResponse.data.message);
              }

              options?.onSuccess?.(apiResponse.data);
              resolve();
            } catch (error) {
              const errorMessage =
                (error as AxiosError<{ message?: string }>)?.response?.data
                  ?.message || "Failed to authenticate with Google";
              options?.onError?.(errorMessage);
              reject(error);
            } finally {
              setIsLoading(false);
            }
          },
          error_callback: (error: GoogleAccountsOAuth2Error) => {
            setIsLoading(false);
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
