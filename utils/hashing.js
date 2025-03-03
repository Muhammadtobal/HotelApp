import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;

export async function hashPassword(value, saltRounds) {
  return await hash(value, saltRounds);
}

export async function comparePasswords(value, hashedPassword) {
  return await compare(value, hashedPassword);
}
