import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../common";
import userRoles from "../common/userRoles";

function ChangeUserRole({ name, email, role, userId, onClose, callFunc }) {
  const [userRole, setUserRole] = useState(role);

  const handleSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const response = await axios.post(
        summaryApi.updateUser.url,
        {
          userId,
          oldRole: role,
          role: userRole,
        },
        {
          withCredentials: true,
        }
      );
      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the role.");
      console.error("Role update error:", error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60">
      <div className="bg-white shadow-md p-6 w-full max-w-lg">
        <button
          className="block ml-auto text-3xl"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose />
        </button>

        <h1 className="pb-6 text-2xl font-medium">Change User Role</h1>

        <p className="text-xl">Name: {name}</p>
        <p className="text-xl">Email: {email}</p>

        <div className="flex items-center justify-between my-6">
          <p className="text-xl">Role: {role}</p>
          <select
            className="border px-6 py-2 text-lg"
            value={userRole}
            onChange={handleSelect}
            aria-label="Select user role"
          >
            {Object.values(userRoles).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block py-2 px-4 text-lg rounded-full bg-cyan-600 text-white hover:bg-cyan-700"
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
