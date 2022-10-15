import * as bcrypt from 'bcrypt';

export const hashingPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const compare = async (plainText: string, hash: string) =>
  bcrypt.compare(plainText, hash);
