import { Database } from "@/definitions/supabase";
import SelectInput from "../input/SelectInput";
import clsx from "clsx";

export type LocaleFilterProps = {
    className?: string,
    onChange: (value: Database['public']['Enums']['locales'] | 'any') => void,
};

export function LocaleFilter(props: LocaleFilterProps) {
    const { className, onChange } = props;

    const options: {
        [key in Database['public']['Enums']['locales'] | 'any']: {
            label: string,
            default?: boolean,
        }
    } = {
        'en': {
            label: 'English',
            default: false,
        },
        'fr_FR': {
            label: 'French',
            default: false,
        },
        'any': {
            label: 'Any',
            default: true,
        }
    };

    const onValueChange = (value: string) => {
        onChange(value as Database['public']['Enums']['locales'] | 'any');
    }

    return (
        <div className={clsx(
            'flex',
            className
        )}>
            <SelectInput options={options} name="localeFilter" onChange={onValueChange} />
        </div>
    );
}