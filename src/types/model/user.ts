export interface User {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
    name?: string;
    mobile?: number | null;
    confirmation?: string;
}
