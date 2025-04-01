import { useState, useEffect } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null); // Store client data for edit

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, client = null) => {
    setModalMode(mode);
    if (client) {
      setClientToEdit(client); // Pass client data for editing
    }
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/add-client",
          newClientData
        );
        console.log("Client added:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error adding client:", error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/update-client/${clientToEdit.id}`,
          newClientData
        );
        console.log("Client updated:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error updating client:", error);
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="py-5 px-5">
        <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
        <TableList
          clients={clients}
          onOpen={(mode, client) => handleOpen(mode, client)}
          searchTerm={searchTerm}
        />
        <ModalForm
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          mode={modalMode}
          onSubmit={handleSubmit}
          clientData={clientToEdit} // Pass client data for editing
        />
      </div>
    </>
  );
}

export default App;
