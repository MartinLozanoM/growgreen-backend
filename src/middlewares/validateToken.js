import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config.js";

export const authRequired = (request, response, next) => {
  const { token } = request.cookies;
  if (!token) {
    return response
      .status(401)
      .json({ message: "No se encontro un token, autorizacion denegada" });
  }

  jwt.verify(token, SECRET_KEY_JWT, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Token invalido" });
    }
    request.user = user;
    next();
  });
};
