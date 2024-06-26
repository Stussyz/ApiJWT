import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

const useSignup = () => {
    const { login } = useAuth(); // Destructuring may still fail here
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError("Password are not the same");
        }

        try {
            setError(null);
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                // headers: {
                //     'Context-Type': "application/json",
                // },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.status === 201) {
                message.success("user registered");
                // Only call login if it's defined
                if (login) {
                    login(data.token, data.user);
                } else {
                    // Handle the case where login is not available
                    console.warn("Login function not available in useAuth.");
                }
            } else if (res.status === 400) {
                setError(data.message);
            } else {
                message.error("Registration Failed");
            }
        } catch (error) {
            message.error("Registration Failed");
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, registerUser };
};

export default useSignup;