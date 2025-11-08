
import { useState } from "react"
import Modal from './Modal'
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import { useLogoutAuthorMutation } from "../../authorApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AuthorPopup() {
    const [open, setOpen] = useState(false)
    const [logout, { isLoading: isLoggingOut, isError, error }] = useLogoutAuthorMutation();

    const handleLogout = async () => {
        logout().unwrap()
            .then(() => {
                localStorage.removeItem('token');
                window.location.replace('/login');
            })
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.data?.message || error.data?.error || "Logout failed");
        }
    }, [isError, error]);


    return (
        <main className="App">

            <button onClick={() => setOpen(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-start" >Log out
            </button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="text-center w-56">
                    <BiLogOut size={56} className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-48">
                        <h3 className="text-lg font-black text-gray-800">Confirm Logout</h3>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to Logout?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleLogout}
                            disabled={isLoggingOut}
                            className={`flex-1 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition duration-300 ${isLoggingOut ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                            {isLoggingOut ? "Logout..." : "Logout"}
                        </button>
                        <button
                            className="flex-1 bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}