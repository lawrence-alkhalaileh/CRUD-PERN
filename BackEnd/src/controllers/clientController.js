import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (err) {
    console.log("Error fetching clients", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postClient = async (req, res) => {
  try {
    const data = req.body;

    const emailCheck = await clientService.checkForEmail(data.email);

    if (emailCheck) {
      return res.status(403).json({ message: "email already exists" });
    }

    const response = await clientService.createClient(data);

    res.status(201).json(response);
  } catch (err) {
    console.log("Error adding a client", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.id;

    const emailCheck = await clientService.checkForEmail(data.email);

    if (emailCheck) {
      return res.status(403).json({ message: "email already exists" });
    }

    const response = await clientService.updateClient(data, userId);

    res.status(202).json(response);
  } catch (error) {
    console.log("Error Updating user data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await clientService.deleteClient(userId);

    if (response && response.message === "Client not found") {
      return res.status(404).json({ message: "Client not found" });
    }

    if (response && response.message === "Client deleted") {
      return res.status(202).json(response.updatedClient);
    }

    res
      .status(400)
      .json({ message: "An error occurred while deleting the client" });
  } catch (error) {
    console.error("Error deleting client:", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClient = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const response = await clientService.searchClient(searchTerm);
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
  }
};
