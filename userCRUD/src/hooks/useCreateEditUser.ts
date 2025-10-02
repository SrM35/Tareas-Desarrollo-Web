import { useState } from "react";
import type { CreateUserPayload, CreateUserResponse } from "../types/User.type";
import HttpClient from "../utils/HttpClient";

const httpClient = new HttpClient();
const useCreateEditUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const createUser = async (data: CreateUserPayload) => {
        setIsLoading(true);
        try {
            const response = await httpClient.post('users/add', data);
            const userData = await response.json()
            setIsLoading(false);
            return userData as CreateUserResponse;
        } catch (error) {
            console.error("Error while creating or parsing a user", error);
            setIsLoading(false);
            return null;
        }
    };
    return {
        createUser,
        isLoading,
    };
};

export default useCreateEditUser;