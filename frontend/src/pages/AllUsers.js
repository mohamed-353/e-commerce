import React, { useEffect, useState } from 'react';
import axios from "axios";
import summaryApi from "../common/index";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

function AllUsers() {
  const [allUsers, setAllUsers] = useState({})
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

        console.log("data in then allUsers", responseData);
      })
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
                  <td>
                    <button
                      onClick={() => {
                        setUpdateUserDetails(ele)
                        setOpenUpdateRole(true)
                      }}
                      className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                    >
                      <MdModeEdit />
                    </button>
                  </td>
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