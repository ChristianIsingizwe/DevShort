import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUp, SignUpData, UserResponse } from "../../services/authService";

export const useSignup = (): UseMutationResult<
  UserResponse,
  Error,
  SignUpData
> => {
  return useMutation<UserResponse, Error, SignUpData>({ mutationFn: signUp });
};
