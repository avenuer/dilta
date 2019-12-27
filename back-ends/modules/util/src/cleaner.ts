import { Auth } from "@dilta/shared";

/** redacts to protect user fields */
export function santizeAuth(authId: Auth) {
    if (!authId) {
      return authId;
    }
    const { hash, updatedAt, password, ...allowed } = authId;
    return allowed;
  }