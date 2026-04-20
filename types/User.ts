export type UserRole = "ADMIN" | "ANALYST" | "VIEWER";

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  institution: string;
  active: boolean;
  firebaseUuid: string;
};

export type RegisterUserRequest = {
  email: string;
  fullName: string;
  institution: string;
  firebaseUuid: string;
};
