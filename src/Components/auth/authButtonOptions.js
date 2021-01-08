import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userDetailContext";
import Sidebar from '../layout/Sidebar.component';

export default function AuthButtonOptions() {

    const { userLoginData, setUserLoginData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/signup");
    const login = () => history.push("/signin");

    const logout = () => {
        setUserLoginData({
            token: undefined,
            userData: undefined,
        });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

    return (
        <nav className="auth-options">
            {userLoginData.userData ? (
                <>
                    <button onClick={logout}>Sign out</button>
                    <Sidebar />
                </>
            ) : (
                    <>
                        <button onClick={login}>Sign In</button>
                        <button onClick={register}>Join Now</button>
                    </>
                )}
        </nav>
    );
}

