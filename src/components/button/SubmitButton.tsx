import clsx from "clsx";

export type SubmitButtonProps = {
    className?: string;
    children: React.ReactNode;
};

export default function SubmitButton(props: SubmitButtonProps) {
    const { className, children } = props;
    
    return (
        <button
            type="submit"
            className={clsx(
                "p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg",
                className,
            )}
        >
            {children}
        </button>
    );
}