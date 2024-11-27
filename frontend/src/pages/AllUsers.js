import React, { useEffect, useState } from 'react';
import axios from "axios";
import summaryApi from "../common/index";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

function AllUsers() {
  const [allUsers, setAllUsers] = useState({})
  const [userId, setUserId] = useState()
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    await axios
      .get(summaryApi.allUsers.url, {
        withCredentials: true
      })
      .then((response) => {
        const responseData = response.data

        if (responseData.success) {
          setAllUsers(responseData)
        } else {
          toast.error(responseData.message)
        }
      })
  }

  const deleteUser = async () => {
    try {
      await axios.post(
        summaryApi.deleteUser.url, {
        userId
      },
        {
          withCredentials: true
        }
      );
      fetchAllUsers();  // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, display an error message to the user here
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return (
    <>
      <div className='bg-white flex justify-center'>

        <table className='w-full userTable'>

          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allUsers?.data?.map((ele, index) => {
              return (
                <tr key={ele._id}>
                  <td>{index + 1}</td>
                  <td>{ele?.name}</td>
                  <td>{ele?.email}</td>
                  <td>{ele?.role}</td>
                  <td>{moment(ele?.createdAt).format("LL")}</td>
                  {ele?.role === "MANAGER" ? (
                    <td className='p-2'>MANAGER IS STATIC</td>
                  ) : (
                    <td>
                      <button
                        onClick={() => {
                          setUpdateUserDetails(ele)
                          setOpenUpdateRole(true)
                        }}
                        className='bg-green-200 p-2 m-1 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        onClick={() => {
                          setUserId(ele?._id)
                          deleteUser()
                        }}
                        className='bg-red-200 p-2 m-1 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
            }
          </tbody>

        </table>

        {openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )}

      </div>
    </>
  )
}

export default AllUsers