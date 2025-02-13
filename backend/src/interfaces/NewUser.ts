interface NewUser {
  email: string;
  username: string;
  profilePictureUrl?: string;
  provider: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
}
export default NewUser;
