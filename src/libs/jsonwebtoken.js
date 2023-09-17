import { SECRET_KEY_JWT } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1d" }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}
