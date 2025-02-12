import { Roles } from "./roles";
import { PortfolioContentsVoter } from "./voter/PortfolioContentsVoter";

/**
 * IMPORTANT : Don't forget the / at beginning of the route
 */
export const authorizations: {
    [route: string]: (roles: Roles[]) => boolean,
} = {
    '/': () => true,
    '/login': () => true,
    '/error': () => true,
    '/dashboard': (roles) => roles.includes(Roles.Admin),
    '/dashboard/portfolio-contents': (roles) => PortfolioContentsVoter.hasAccess('read', roles),
    '/api/markdown-to-html': () => true,
};