import { PortfolioContentsVoter } from "@/security/voter/PortfolioContentsVoter";
import { createAdminClient, createClient } from "../server";
import { getUserRoles } from "./getUserRoles";

export const PortfolioContentsResource = {
    getList: async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const roles = user ? await getUserRoles(user) : [];

        if (PortfolioContentsVoter.hasAccess('read', roles)) {
            const adminClient = createAdminClient();

            return (await adminClient.from('portfolio_contents').select('*')).data;
        }
        return [];
    }
}