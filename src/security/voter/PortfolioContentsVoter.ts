import { Roles } from "../roles";
import { Voter } from "./Voter";

export const PortfolioContentsVoter: Voter = {
    ressource: 'portfolio_contents',
    hasAccess: (operation, roles) => {
        if (operation === 'read') {
            return true;
        }
        return roles.includes(Roles.Admin);
    }
}