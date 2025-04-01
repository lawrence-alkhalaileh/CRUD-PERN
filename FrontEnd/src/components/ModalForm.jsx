import { useState, useEffect } from "react";

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    job: "",
    rate: "",
    status: false,
  });

  const { name, email, job, rate, status } = formData;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "rate" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === "Active";

    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setFormData({
        id: clientData.id || "",
        name: clientData.name || "",
        email: clientData.email || "",
        job: clientData.job || "",
        rate: clientData.rate || "",
        status: clientData.isActive || false,
      });
    } else {
      setFormData({
        id: "",
        name: "",
        email: "",
        job: "",
        rate: "",
        status: false,
      });
    }
  }, [mode, clientData]);

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box bg-base-100 shadow-lg border border-base-300 p-6 max-w-md mx-auto">
          <h3 className="font-bold text-xl mb-6 text-primary">
            {mode === "edit" ? "Edit Client" : "Add Client"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Enter client name"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={handleFieldChange}
                  type="email"
                  placeholder="client@example.com"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Job</span>
                </label>
                <input
                  name="job"
                  value={job}
                  onChange={handleFieldChange}
                  type="text"
                  placeholder="Client position"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Rate</span>
                  </label>
                  <input
                    name="rate"
                    value={rate}
                    onChange={handleFieldChange}
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered w-full focus:input-primary"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Status</span>
                  </label>
                  <select
                    name="status"
                    value={status ? "Active" : "Inactive"}
                    onChange={handleStatusChange}
                    className="select select-bordered w-full focus:select-primary"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-action flex justify-between items-center mt-8">
              <button className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {mode === "edit" ? "Save Changes" : "Add Client"}
              </button>
            </div>
          </form>

          <button
            className="btn btn-sm btn-circle absolute right-3 top-3"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
