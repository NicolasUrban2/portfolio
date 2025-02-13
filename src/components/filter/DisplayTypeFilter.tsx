import { Database } from "@/definitions/supabase";
import SelectInput from "../input/SelectInput";
import clsx from "clsx";

export type DisplayTypeFilterProps = {
    className?: string,
    onChange: (value: Database['public']['Enums']['display_types'] | 'any') => void,
};

export function DisplayTypeFilter(props: DisplayTypeFilterProps) {
    const { className, onChange } = props;

    const options: {
        [key in Database['public']['Enums']['display_types'] | 'any']: {
            label: string,
            default?: boolean,
        }
    } = {
        '3d': {
            label: '3D',
            default: false,
        },
        'markdown': {
            label: 'Markdown',
            default: false,
        },
        'any': {
            label: 'Any',
            default: true,
        }
    };

    const onValueChange = (value: string) => {
        onChange(value as Database['public']['Enums']['display_types'] | 'any');
    }

    return (
        <div className={clsx(
            'flex',
            className
        )}>
            <SelectInput options={options} name="displayTypeFilter" onChange={onValueChange} />
        </div>
    );
}