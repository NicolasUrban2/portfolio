import { Roles } from "@/security/roles";
import { createAdminClient } from "../server";
import { User } from "@supabase/supabase-js";

export async function getUserRoles(user: User): Promise<Roles[]> {
    const supabaseAdmin = createAdminClient();
    const userRoles = (await supabaseAdmin
        .from('user_roles')
        .select('role')
        .eq('user', user?.id ?? '')
    ).data ?? [];

    const roles: string[] = [];
    for (let index = 0; index < userRoles.length; index++) {
        const userRole = userRoles[index];
        const role = (await supabaseAdmin.from('roles').select().eq('id', userRole.role)).data;
        if (role && role.length > 0) {
            roles.push(role[0].name);
        }
    }

    return roles.map(role => {
        const formattedRole = role.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
        return Roles[formattedRole as keyof typeof Roles];
    });
}