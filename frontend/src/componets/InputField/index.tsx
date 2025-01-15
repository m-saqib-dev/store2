import React from 'react'
interface InputFieldProps {
    name?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
}
const InputField = ({
    name,
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
}: InputFieldProps) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}:
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                type={type}
                onChange={onChange}
                name={name}
                value={value}
                placeholder={placeholder}
                required
            />
            {error == "" ? "" : <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span> {error}</p>
            }
        </div>
    )
}

export default InputField