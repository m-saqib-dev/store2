import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/user";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../app/store";
import InputField from "../../../componets/InputField";
import { login } from "../../../api/auth";
import CustomButton from "../../../componets/button";

const Login = () => {
    const [error, setError] = useState("");
    const naviate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const res = await login(data);
        if (!res.success) {
            setError(res.error)
            return;
        }
        dispatch(setUser({
            adress: res.data.address,
            id: res.data._id,
            email: res.data.email,
            role: res.data.role,
            name: res.data.name
        }))
        naviate("/");

    }

    return (
        <div className="p-10 bg-black flex justify-center items-center h-screen flex-col gap-4">
            <div className="max-w-screen-md min-w-full p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
                {/* custom error */}
                {error && (
                    <div className=" text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium"></span> {error}
                    </div>
                )}
                <h2 className="text-2xl py-4 font-semibold text-gray-800 dark:text-white">LogIn</h2>
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="email"
                            error=""
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <InputField
                            label="password"
                            error=""
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <CustomButton type="submit">
                            Login
                        </CustomButton>
                        <Link to="/signup" className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">Don't have an account? SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
