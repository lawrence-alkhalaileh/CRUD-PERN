import React from "react";

const Navbar = ({ onOpen, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-pr text-xl">CRUD APP with PSQL</a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <input
            onChange={(e) => handleSearchChange(e)}
            type="text"
            placeholder="Search"
            className="input input-bordered w-28 lg:w-112 md:w-68"
          />
        </div>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary" onClick={onOpen}>
          Add Client
        </button>
      </div>
    </div>
  );
};

export default Navbar;
