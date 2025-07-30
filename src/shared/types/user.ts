export interface User {
  id: number;
  name: string;
  loginId: string;
  role: string;
  email?: string;
  phoneNumber?: string | undefined;
}

export interface InputUser {
  name: string;
  username: string;
  role: string;
  phoneNumber: string | undefined;
}
