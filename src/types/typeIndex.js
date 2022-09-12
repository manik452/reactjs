export interface AppState {
    user: {
        accessToken: string;
        refreshToken: string;
        username: string;
        roles: string;
    } | null;
    username: string;
    password: string;
    success: boolean;
    error: boolean;
}