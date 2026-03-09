import { auth } from "@/lib/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const settingsService = {
  /**
   * Changes the password for the currently authenticated user.
   * Re-authenticates first (required by Firebase for sensitive operations).
   */
  changePassword: async (currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("No hay un usuario autenticado.");
    }

    // Re-authenticate before the sensitive operation
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);
  },
};
