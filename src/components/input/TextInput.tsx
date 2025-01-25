import clsx from "clsx";

export type TextInputProps = {
    className?: string;
    name: string,
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
};

export default function TextInput(props: TextInputProps) {
    const { className, value, placeholder, onChange } = props;

    return (
        <input
            type="text"
            className={clsx(
                "p-4 m-1 bg-transparent dark:shadow-black shadow-inner focus:outline-none rounded-lg",
                className,
            )}
            value={value}
            placeholder={placeholder}
            onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
        />
    );
}