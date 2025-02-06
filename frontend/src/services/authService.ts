import apiClient from "../api/apiClient";

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface OTPData {
  email: string;
  otp: number;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    username: string;
    email: string;
    profilePictureUrl: string;
  };
}

export const signUp = async(data: SignUpData): Promise<UserResponse> =>{
    const response = await apiClient.post<UserResponse>('/auth/signup', data);
    return response.data;
}

export const verifyOTP = async (data: OTPData): Promise<AuthResponse> =>{
    const response = await apiClient.post<AuthResponse>('/auth/verify-otp', data)
    return response.data;
}

export const login = async (data: LoginData): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/auth/login', data)
    return response.data;
}
