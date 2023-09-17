import User from "../models/user.model.js";
import byscryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jsonwebtoken.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config.js";

export const registerController = async (request, response) => {
  // console.log("Veamos la request en el controlador", request.body);

  const { username, email, password } = request.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return response.status(400).json(["El correo ya esta en uso"]);

    const hashedPassword = await byscryptjs.hash(password, 10);
    // console.log({ hashedPassword }); OK
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const newUserSaved = await newUser.save();
    const token = await createAccessToken({ id: newUserSaved._id });

    response.cookie("token", token);
    response.json({
      message: "Usuario creado exitosamente",
      id: newUserSaved._id,
      username: newUserSaved.username,
      email: newUserSaved.email,
      createdAt: newUserSaved.createdAt,
      updatedAt: newUserSaved.updatedAt,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error al crear el usuario",
    });
    console.error("Error en el controlador authController", error);
  }
};

export const loginController = async (request, response) => {
  console.log("Veamos la request en el controlador", request.body);

  const { email, password } = request.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return response.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await byscryptjs.compare(password, userFound.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Contraseña incorrecta" });
    }
    // console.log({ hashedPassword }); OK
    const token = await createAccessToken({ id: userFound._id });

    response.cookie("token", token);
    response.json({
      message: "Has ingresado exitosamente",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    response.status(500).json({
      message: "Error al crear el usuario",
    });
    console.error("Error en el controlador authController", error);
  }
};

export const logoutController = (request, response) => {
  response.cookie("token", "", {
    expires: new Date(0),
  });
  return response.sendStatus(200);
};

export const profileController = async (request, response) => {
  const userFound = await User.findById(request.user.id);
  if (!userFound) {
    return response.status(400).json({ message: "Usuario no encontrado" });
  } else {
    response.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  }
};

export const verifyToken = async (request, response) => {
  const { token } = request.cookies;

  if (!token) {
    return response.status(401).json({ message: "No estas autorizado" });
  }

  jwt.verify(token, SECRET_KEY_JWT, async (err, user) => {
    if (err) {
      return response.status(401).json({ message: "No estas autorizado" });
    } else {
      const userFound = await User.findById(user.id);

      if (!userFound) {
        return response.status(401).json({ message: "No estas autorizado" });
      } else {
        return response.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        });
      }
    }
  });
};
