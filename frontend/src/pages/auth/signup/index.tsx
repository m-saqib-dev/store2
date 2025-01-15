import { useState } from "react";
// import { signUp } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/user";
import { AppDispatch } from "../../../app/store";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../componets/InputField";
import { signup } from "../../../api/auth";
import CustomButton from "../../../componets/button";

const SignUp = () => {
    const [error, setError] = useState("");
    const naviate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        if (data.password !== data.confirmPassword) {
            setError("Password and Confirm Password must be same");
            return;
        }

        const res = await signup(data)
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
                <h2 className="text-2xl py-4 font-semibold text-gray-800 dark:text-white">SignUp</h2>
                <form onSubmit={handleSignUp}>
                    <div className="flex flex-col gap-4">
                        <InputField
                            label="name"
                            error=""
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                        />
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
                        <InputField
                            label="confirm password"
                            error=""
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            type="password"
                        />
                        <CustomButton type="submit">
                            SignUp
                        </CustomButton>
                        <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-400">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
