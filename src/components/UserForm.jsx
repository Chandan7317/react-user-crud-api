import React, { useState, useEffect } from "react";
import fields from "../config/fields";

const UserForm = ({ onSubmit, selectedUser, clearSelection }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(selectedUser || {});
  }, [selectedUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);
    setFormData({});
    clearSelection();
  };

  return (
    <div>
      <h3>{selectedUser ? "Update User" : "Create User"}</h3>

      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p style={{ color: "red" }}>{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button type="submit" className="btnCreate">
          {selectedUser ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
