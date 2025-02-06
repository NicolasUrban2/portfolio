'use client';

import { edit } from "@/action/portfolioContents";
import { Database } from "@/definitions/supabase";
import clsx from "clsx";
import { useActionState } from "react";
import TextInput from "../input/TextInput";
import { RotateLoader } from "react-spinners";
import SelectInput from "../input/SelectInput";

export type PortfolioContentsEditProps = {
    className?: string,
    portfolioContent: Database['public']['Tables']['portfolio_contents']['Row'],
}

export function PortfolioContentsEdit(props: PortfolioContentsEditProps) {
    const { className, portfolioContent } = props;

    const [state, formAction, pending] = useActionState(edit, { error: null });
    const localeOptions: {
        [key in Database['public']['Enums']['locales']]: {
            label: string;
            default?: boolean;
        }
    } = {
        'en': { label: 'English', default: portfolioContent.locale === 'en' },
        'fr_FR': { label: 'French', default: portfolioContent.locale === 'fr_FR' },
    };

    return (
        <div className={clsx(
            'flex flex-col w-full',
            className
        )} >
            <form action={formAction} className="flex flex-col gap-4">
                <input name="id" type="hidden" value={portfolioContent.id} />
                <TextInput name="code" value={portfolioContent.code} />
                <SelectInput
                    name="locale"
                    options={localeOptions}
                />
                <TextInput type="textarea" name="content" value={portfolioContent.content ?? ''} />
                {
                    pending ? <RotateLoader className="my-4 w-full mx-auto" color="#ff5a00" size={10} /> : <button
                        className="p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg"
                    >
                        Submit
                    </button>
                }
                {
                    state.error && <p className="text-red-500">{state.error}</p>
                }
            </form>
        </div>
    );
}