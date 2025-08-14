import React, { useState, useEffect } from "react"

export const UserAuth = React.createContext()

function UserAuthContext({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [formData, setFormData] = useState({ name: '', pass: '' })

    useEffect(() => {
        const storedUsername = localStorage.getItem("username")
        const storedPassword = localStorage.getItem("password")
        const storedLogoutToken = localStorage.getItem("logout_token")
        const storedUserID = localStorage.getItem("userID")
        

        if (storedUsername && storedPassword && storedLogoutToken && storedUserID) {
            setIsAuthorized(true)
            setFormData({
                name: storedUsername,
                pass: storedPassword,
                logoutToken: storedLogoutToken,
                userID: storedUserID,
            })
        }
    }, [])

    return (
        <UserAuth.Provider value={{ isAuthorized, setIsAuthorized, formData, setFormData }}>
            {children}
        </UserAuth.Provider>
    )
}

export default UserAuthContext