interface User {
  id: number;
  email: string;
  username: string;
  profilePictureUrl?: string;
  provider: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
export default User;
