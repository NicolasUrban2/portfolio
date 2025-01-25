import clsx from "clsx";

export type CardProps = {
    className?: string;
    children: React.ReactNode;
};

export default function Card(props: CardProps) {
    const { className, children } = props;
    
    return (
        <div className={clsx(
            'dark:bg-window shadow-2xl rounded-2xl p-4',
            className,
        )}>
            {children}
        </div>
    );
}