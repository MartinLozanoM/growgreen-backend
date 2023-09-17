import Client from "../models/client.model.js";

export const getClientsController = async (request, response) => {
  try {
    const clients = await Client.find();
    response.json(clients);
  } catch (error) {
    return response.status(500).json("Algo salio mal");
  }
};

export const createClientController = async (request, response) => {
  try {
    const { name, lastname, email, telephone, studies, comments } =
      request.body;
    console.log(name, lastname, email, telephone, studies, comments);
    const newClient = new Client({
      name,
      lastname,
      email,
      telephone,
      studies,
      comments,
    });
    console.log(newClient);
    const savedClient = await newClient.save();
    response.json(savedClient);
  } catch (error) {
    return response.status(500).json("Algo salio mal en crear un cliente");
  }
};

export const getClientController = async (request, response) => {
  try {
    const client = await Client.findById(request.params.id);

    if (!client)
      return response.status(404).json({ message: "Cliente no encontrada" });

    response.json(task);
  } catch (error) {
    return response.status(404).json("Cliente no encontrada");
  }
};

export const deleteClientController = async (request, response) => {
  try {
    const client = await Client.findByIdAndDelete(request.params.id);

    if (!client)
      return response.status(404).json({ message: "Cliente no encontrada" });

    return response.sendStatus(204);
  } catch (error) {
    return response.status(404).json({ message: "Cliente no encontrada" });
  }
};

export const updateClientController = async (request, response) => {
  try {
    const client = await Client.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );

    if (!client)
      return response.status(404).json({ message: "Cliente no encontrada" });

    response.json(client);
  } catch (error) {
    return response.status(404).json({ message: "Cliente no encontrada" });
  }
};
