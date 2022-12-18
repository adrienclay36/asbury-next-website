import { PermissionSet } from "./permission-set";

export type UserInfo = {
    id: string;
    recurring_dontations: boolean;
    location: string;
    avatar_url: string;
    avatar_path: string;
    role: string;
    title: string;
    first_name: string;
    last_name: string;
    permissions: PermissionSet;
    email: string;
    customer_id: string;
}