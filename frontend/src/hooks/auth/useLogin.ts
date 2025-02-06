import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login, LoginData, UserResponse } from "../../services/authService";

export const useLogin = (): UseMutationResult<
  UserResponse,
  Error,
  LoginData
> => {
  return useMutation<UserResponse, Error, LoginData>({ mutationFn: login });
};
