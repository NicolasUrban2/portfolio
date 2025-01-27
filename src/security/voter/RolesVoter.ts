import { Roles } from "../roles";
import { Voter } from "./Voter";

export const RolesVoter: Voter = {
    ressource: 'roles',
    hasAccess: (operation, roles) => {
        return roles.includes(Roles.Admin);
    }
}