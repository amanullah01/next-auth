import { hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const passwordHashed = await hash(password, 12);
  return passwordHashed;
};
