import clsx from "clsx";
import { MainDescription } from "./MainDescription";

export type HomeContentProps = {
    className?: string;
}

export function HomeContent(props: HomeContentProps) {
    const { className } = props;

    return <div className={clsx(
        'flex flex-col justify-center items-center',
        className,
    )}>
        <MainDescription className="mt-10" />
    </div>;
}