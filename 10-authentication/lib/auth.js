import { hash } from 'bcrypt';

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export default hashPassword;
