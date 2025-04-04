import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsersAPI, getSubmitedContactAPI } from "../services/allAPI";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = () => {
            const userRole = localStorage.getItem("role");
            setIsAdmin(userRole === "admin");
        };

        checkAdmin();
        window.addEventListener("storage", checkAdmin);

        return () => window.removeEventListener("storage", checkAdmin);
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const fetchData = async () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }

        setLoading(true);

        try {
            const [MessageData, userData] = await Promise.all([
                getSubmitedContactAPI(headers),
                getAllUsersAPI(headers),
            ]);

            if (userData?.data) setUsers(userData.data);
            if (MessageData?.data) setMessages(MessageData.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <AdminContext.Provider value={{ users, messages, loading, fetchData }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext);