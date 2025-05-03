"server-only";
import { currentUser } from "@clerk/nextjs/server";

export const getClerkUser = async () => {
  return currentUser();
};
