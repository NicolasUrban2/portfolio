'use client'

import { Database } from "@/definitions/supabase";
import clsx from "clsx";
import { useActionState, useState } from "react";
import { MarkdownContent } from "../text/MarkdownContent";
import TextInput from "../input/TextInput";
import SelectInput from "../input/SelectInput";
import { debounce } from "@/lib/util/debounce";
import { RotateLoader } from "react-spinners";
import { create } from "@/action/portfolioContents";

export type PortfolioContentsCreateProps = {
    className?: string,
}

export function PortfolioContentCreate(props: PortfolioContentsCreateProps) {
    const { className } = props;

    const [markdownContent, setMarkdownContent] = useState<string>('');

    const [state, formAction, pending] = useActionState(create, { error: null });

    const localeOptions: {
        [key in Database['public']['Enums']['locales']]: {
            label: string;
            default?: boolean;
        }
    } = {
        'en': { label: 'English', default: true },
        'fr_FR': { label: 'French', default: false },
    };
    const displayTypeOptions: {
        [key in Database['public']['Enums']['display_types']]: {
            label: string;
            default?: boolean;
        }
    } = {
        'markdown': { label: 'Markdown', default: true },
        '3d': { label: '3D', default: false },
    };

    return <div
        className={clsx(
            'flex flex-col md:flex-row w-full gap-4',
            className,
        )}
    >
        <form action={formAction} className="flex flex-col gap-4 w-full">
            <TextInput name="code" placeholder="Code..." value="" />
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
                placeholder="Content..."
                value=""
                onChange={debounce(setMarkdownContent, 500)}
            />
            {
                pending ? <RotateLoader className="my-4 w-full mx-auto" color="#ff5a00" size={10} /> : <button
                    className="p-4 m-1 bg-transparent dark:shadow-black shadow-xl hover:shadow-md focus:shadow-inner rounded-lg"
                >
                    Create
                </button>
            }
            {
                state.error && <p className="text-red-500">{state.error}</p>
            }
        </form>
        <div className="hidden md:flex w-full rounded border border-black dark:border-white">
            <MarkdownContent className="m-4" markdown={markdownContent} />
        </div>
    </div>
}