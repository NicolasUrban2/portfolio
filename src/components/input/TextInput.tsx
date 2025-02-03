import clsx from "clsx";
import { useState } from "react";

export type TextInputProps = {
    className?: string;
    name: string,
    value?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'textarea';
    isRequired?: boolean;
    onChange?: (value: string) => void;
};

export default function TextInput(props: TextInputProps) {
    const { className, name, value, placeholder, type, isRequired, onChange } = props;

    const [inputValue, setInputValue] = useState(value);

    const onInputChange = (value: string) => {
        setInputValue(value);
        onChange?.(value);
    };

    return (
        type === 'textarea' ?
            <textarea
                name={name}
                value={inputValue}
                placeholder={placeholder}
                required={isRequired}
                onChange={e => onInputChange(e.target.value)}
                className={clsx(
                    'p-4 m-1 bg-transparent dark:shadow-black shadow-inner focus:outline-none rounded-lg',
                    className,
                )}
            /> :
            <input
                type={type ?? 'text'}
                name={name}
                required={isRequired}
                className={clsx(
                    "p-4 m-1 bg-transparent dark:shadow-black shadow-inner focus:outline-none rounded-lg",
                    className,
                )}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => onInputChange(e.target.value)}
            />
    );
}