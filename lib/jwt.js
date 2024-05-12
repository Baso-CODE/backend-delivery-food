import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export const createToken = (id) => {
  const expiresIn = "1h";
  return jwt.sign({ id }, secretKey, { expiresIn });
};
