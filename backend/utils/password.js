import bcrypt from 'bcryptjs';

// Helpers de senha. Ficam separados do database.js porque bcrypt
// não tem nada a ver com o pool MySQL — são preocupações diferentes.

const SALT_ROUNDS = 10;

export const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);
