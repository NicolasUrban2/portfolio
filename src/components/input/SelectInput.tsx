import clsx from "clsx";

export type SelectInputProps = {
    className?: string;
    name: string,
    options: {
        [value: string]: {
            label: string;
            default?: boolean;
        }
    };
}

export default function SelectInput(props: SelectInputProps) {
    const { className, name, options } = props;

    return (
        <select
            name={name}
            className={clsx(
                'p-4 bg-transparent dark:shadow-black shadow-inner focus:outline-none rounded-lg',
                className,
            )}
            defaultValue={Object.keys(options).find(value => options[value].default)}
        >
            {Object.keys(options).map(value =>
                <option
                    className="p-4 bg-window dark:shadow-black shadow-inner focus:outline-none rounded-lg"
                    key={value}
                    value={value}
                >{options[value].label}</option>
            )}
        </select>
    );
}