'use client';

import { edit } from "@/action/portfolioContents";
import { Database } from "@/definitions/supabase";
import clsx from "clsx";
import { useActionState, useState } from "react";
import TextInput from "../input/TextInput";
import { RotateLoader } from "react-spinners";
import SelectInput from "../input/SelectInput";
import { MarkdownContent } from "../text/MarkdownContent";
import { debounce } from "@/lib/util/debounce";

export type PortfolioContentsEditProps = {
    className?: string,
    portfolioContent: Database['public']['Tables']['portfolio_contents']['Row'],
}

export function PortfolioContentsEdit(props: PortfolioContentsEditProps) {
    const { className, portfolioContent } = props;

    const [markdownContent, setMarkdownContent] = useState<string | null>(portfolioContent.content ?? null);

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
    const displayTypeOptions: {
        [key in Database['public']['Enums']['display_types']]: {
            label: string;
            default?: boolean;
        }
    } = {
        'markdown': { label: 'Markdown', default: portfolioContent.display_type === 'markdown' },
        '3d': { label: '3D', default: portfolioContent.display_type === '3d' },
    };

    return (
        <div className={clsx(
            'flex flex-col md:flex-row w-full gap-4',
            className
        )} >
            <form action={formAction} className="flex flex-col gap-4 w-full">
                <input name="id" type="hidden" value={portfolioContent.id} />
                <TextInput name="code" value={portfolioContent.code} />
                <SelectInput
                    name="locale"
                    options={localeOptions}
                />
                <SelectInput
                    name="display_type"
                    options={displayTypeOptions}
                />
                <TextInput
                    type="textarea"
                    name="content"
                    value={portfolioContent.content ?? ''}
                    onChange={debounce(setMarkdownContent, 500)}
                />
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
            <div className="hidden md:flex w-full rounded border border-black dark:border-white">
                <MarkdownContent className="m-4" markdown={markdownContent ?? ''} />
            </div>
        </div>
    );
}