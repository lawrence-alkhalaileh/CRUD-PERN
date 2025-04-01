import { useState, useEffect } from "react";
import axios from "axios";

const TableList = ({ clients, onOpen, searchTerm }) => {
  const filteredData = clients.filter(
    (cl) =>
      cl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cl.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cl.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (cl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`http://localhost:5000/api/delete/${cl.id}`);
        setClients((prevData) =>
          prevData.filter((client) => client.id !== cl.id)
        );
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-10 m-5">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Job</th>
            <th>Rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="hover">
          {filteredData.map((cl, index) => (
            <tr key={cl.id}>
              <th>{index + 1}</th>
              <td>{cl.name}</td>
              <td>{cl.email}</td>
              <td>{cl.job}</td>
              <td>{cl.rate}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${
                    cl.status ? "btn-primary" : "btn-outline btn-primary"
                  }`}
                >
                  {cl.status ? "Active" : "Inactive"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => onOpen("edit", cl)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-accent"
                  onClick={() => handleDelete(cl)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
