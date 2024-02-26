import { BASE_URL } from "../config/apiConfig";


export interface ApiLog {
    totalCount: number;
}


export interface ApiResponse<T> {
    error: boolean;
    message?: string;
    data?: T;
}

export const getAPICount = () => {
    return fetchAPI<ApiLog>(`${BASE_URL}/api-logs/counts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
};

async function fetchAPI<T>(
    url: string,
    config?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, config);
        const data: ApiResponse<T> = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "An error occurred");
        }
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return { error: true, message: error.message };
        }
        return { error: true, message: "An unknown error occurred" };
    }
}
