import api from "./axiosInterceptor";

interface QueryParamsProps {
    q?: string,
    page?: number,
    per_page?: number
}

interface GetRepoProps {
    username: string,
    repo: string,
}

export const searchUsers = async ({ q, page, per_page }: QueryParamsProps) => {
    try {
        const response = await api.get("search/users", { params: { q, page, per_page } });
        return response.data.items;

    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUserDetail = async ({ q: username }: QueryParamsProps) => {
    try {
        const response = await api.get(`/users/${username}`);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getUserRepo = async ({ q: username }: QueryParamsProps) => {
    try {
        const response = await api.get(`/users/${username}/repos`);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getRepoReadme = async ({ username, repo }: GetRepoProps) => {
    try {
        const response = await api.get(`/repos/${username}/${repo}/readme`);

        const content = atob(response.data.content);

        return content;
    } catch (error) {
        console.error('Error:', error);
    }
}
