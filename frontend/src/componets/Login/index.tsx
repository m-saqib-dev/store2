import { useEffect } from "react";
import { login,checkSession } from "../../api/auth";
import CustomButton from "../button";

// interface LoginResponse {
//     success: boolean;
//     message: string;
// }
const Login = () => {
    useEffect(() => {
      const check = async () => {
        const response = await checkSession();
        console.log(response)
      }
        check()
    }, [])
    
    const handleLogin = async (event: React.FormEvent) => {
        const email = (event.target as HTMLFormElement).email.value
        const password = (event.target as HTMLFormElement).password.value
        
        event.preventDefault();
        // await login((event.target as HTMLFormElement).email.value, (event.target as HTMLFormElement).password.value);
        await login({email, password});
    }

    return (
        <div className="w-full">
            <form onSubmit={handleLogin}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email:
                        </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" name="email" required />
                        {1 == 1 ? "" : <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                        }
                    </div>
                    <div>

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password:
                        </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" name="password" required />
                        {1 == 1 ? "" : <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snapp!</span> Some error message.</p>
                        }
                    </div>
                {/* {error && (
                    <div className="p-4 mb-4 text-sm col-span-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Danger alert!</span> {error}
                    </div>
                )} */}
                    {/* <button className="text-white col-span-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Login</button> */}
                    <CustomButton>
                        text
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default Login;
