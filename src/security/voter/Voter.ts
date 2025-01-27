import { Database } from "@/definitions/supabase";
import { Roles } from "../roles";

export type Voter = {
    ressource: keyof Database['public']['Tables'],
    hasAccess: (operation: 'read' | 'write' | 'delete', roles: Roles[]) => boolean,
};