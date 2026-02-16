const BASE_URL = "http://fleet-api.runasp.net/api";

export const api = {
    async post(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }
        return result;
    },

    async get(endpoint, token) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }
        return result;
    }
};
