import { Roles } from "../roles";
import { Voter } from "./Voter";

export const UserRolesVoter: Voter = {
    ressource: 'user_roles',
    hasAccess: (operation, roles) => {
        return roles.includes(Roles.Admin);
    }
}