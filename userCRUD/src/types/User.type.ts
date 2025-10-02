export type UserResponse = {
    users: User[];
}

export type CreateUserPayload = {
    user: User;
}

export type CreateUserResponse = {
    user: User;
}

export type User = {
    "id": number;
    "name": string;
    "email": string;
    "created": string | Date;
}