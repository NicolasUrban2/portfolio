'use client'

import clsx from "clsx";
import { PortfolioContentsEdit } from "./PortfolioContentEdit";
import { createClient } from "@/lib/supabase/client";
import { DisplayTypeFilter } from "../filter/DisplayTypeFilter";
import { useEffect, useState } from "react";
import { Database } from "@/definitions/supabase";
import { LocaleFilter } from "../filter/LocaleFilter";

export type PortfolioContentsProps = {
    className?: string,
};

export function PortfolioContents(props: PortfolioContentsProps) {
    const { className } = props;

    const [displayType, setDisplayType] = useState<Database['public']['Enums']['display_types'] | 'any'>('any');
    const [locale, setLocale] = useState<Database['public']['Enums']['locales'] | 'any'>('any');
    const [portfolioContents, setPortfolioContents] = useState<Database['public']['Tables']['portfolio_contents']['Row'][] | null>(null);

    const supabase = createClient();

    useEffect(() => {
        supabase.from('portfolio_contents').select('*').order('id', { ascending: true }).then(({ data }) => {
            setPortfolioContents(data);
        });
    }, [supabase]);

    return (
        <div className={clsx(
            'flex flex-col gap-8',
            className
        )}>
            <div className="flex gap-8">
                <DisplayTypeFilter onChange={setDisplayType} />
                <LocaleFilter onChange={setLocale} />
            </div>
            {portfolioContents !== null ? portfolioContents.map((portfolioContent, index) => {
                const isFilteredDisplayType = portfolioContent.display_type === displayType || displayType === 'any';
                const isFilteredLocale = portfolioContent.locale === locale || locale === 'any';

                return <div className={clsx({
                    'hidden': !isFilteredDisplayType || !isFilteredLocale,
                })} key={portfolioContent.id}>
                    {index > 0 ? <hr /> : null}
                    <PortfolioContentsEdit
                        portfolioContent={portfolioContent}
                    />
                </div>
            }) : <div>Loading...</div>}
        </div>
    );
}