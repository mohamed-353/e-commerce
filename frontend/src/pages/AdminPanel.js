import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa';
import userRoles from "../common/userRoles";
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user?.role !== userRoles.ADMIN && user?.role !== userRoles.MANAGER) {
        navigate("/")
      }
      if (user) {
        setLoading(false);
        console.log("header user", user);
      }
    }
  }, [navigate, user]);

  return (
    <div className='min-h-[calc(100vh-120px)] flex select-none'>

      <aside className='bg-white mt-1 min-h-full w-full max-w-60 customShadow'>

        <div className='h-32 flex justify-center items-center flex-col'>
          <div className="text-5xl relative flex justify-center">
            {loading ? (
              <FaRegUserCircle />
            ) : user?.profilePic ? (
              <img src={user?.profilePic} className="w-20 h-20 mt-2 rounded-full" alt={user?.name} />
            ) : (
              <FaRegUserCircle />
            )}
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
        </div>

        {/* navigation */}
        <div>
          <nav className='grid p-4 text-lg'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>product</Link>
          </nav>
        </div>

      </aside>

      <main className='md:w-full h-full p-2'>
        <Outlet />
      </main>

    </div>
  )
}

export default AdminPanel