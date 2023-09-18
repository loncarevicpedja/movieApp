import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="page-container px-5 w-100 h-header-100">
      <div className="container">
        <div className="row pt-5">
          <div className="col-4"></div>
          <div className="col-4 p-0 mb-1 px-4 d-flex justify-content-center align-items-center">
            <Link className="btn p-4 rounded-0 btn-light w-100 h-100" to="/movies">
              Movies
            </Link>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4 p-0 mb-1 px-4 d-flex justify-content-center align-items-center">
            <Link className="btn p-4 rounded-0 btn-light w-100 h-100" to="/add-movie">
              Add movie
            </Link>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4 p-0 mb-1 px-4 d-flex justify-content-center align-items-center">
            <Link className="btn p-4 rounded-0 btn-light w-100 h-100" to="/admin-directors">
              Directors
            </Link>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4 p-0 mb-1 px-4 d-flex justify-content-center align-items-center">
            <Link
              className="btn p-4 rounded-0 btn-light w-100 h-100"
              to="/admin-categories"
            >
              Categories
            </Link>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div className="col-4 p-0 mb-1 px-4 d-flex justify-content-center align-items-center">
            <Link className="btn p-4 rounded-0 btn-light w-100 h-100" to="/admin-add-category">
              Add Category
            </Link>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
