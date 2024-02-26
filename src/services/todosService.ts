import { BASE_URL } from "../config/apiConfig";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export interface ApiResponse<T> {
    error: boolean;
    message?: string;
    data?: T;
}

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

export const getAllTodos = () => fetchAPI<Todo[]>(`${BASE_URL}/todos`);

export const createTodo = (title: string) => {
  return  fetchAPI<Todo>(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title}),
    });
}


export const updateTodo = (id: number, newTitle: string) => {
    return fetchAPI<Todo>(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title : newTitle}),
    });
}

export const deleteTodo = (id: number) => {

   return  fetchAPI<void>(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });

}

