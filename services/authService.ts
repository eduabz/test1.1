import { auth } from "@/constants/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { API_BASE_URL } from "@/constants/api";
import { RegisterUserRequest } from "@/types/User";

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function register(data: RegisterUserRequest & { password: string }) {
  const { password, ...rest } = data;
  const credential = await createUserWithEmailAndPassword(auth, data.email, password);
  const firebaseUser = credential.user;
  const token = await firebaseUser.getIdToken();

  await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...rest, firebaseUuid: firebaseUser.uid }),
  });

  return firebaseUser;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("No autenticado");
  return user.getIdToken();
}
