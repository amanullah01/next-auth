import { hash, compare } from "bcryptjs";

export const hashPassword = async (password) => {
  const passwordHashed = await hash(password, 12);
  return passwordHashed;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
