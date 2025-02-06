import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { verifyOTP, OTPData, AuthResponse } from "../../services/authService";

export const useVerifyOTP = (): UseMutationResult<
  AuthResponse,
  Error,
  OTPData
> => {
  return useMutation<AuthResponse, Error, OTPData>({ mutationFn: verifyOTP });
};
