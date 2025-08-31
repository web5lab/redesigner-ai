import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../lib/axiosInstance"

export const GetUserData = createAsyncThunk(
    "global/getUserData",
    async (token: string) => {
        try {
            const Response = await axiosInstance.get(`/auth/user-data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return Response.data
        } catch (err) {
            throw err
        }
    }
)

export const GetWebsite = createAsyncThunk(
    "global/GetWebsite",
    async (token: string) => {
        try {
            const Response = await axiosInstance.get(`/dashboard/get-websites`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return Response.data
        } catch (err) {
            throw err
        }
    }
)

export const GetChatHistory = createAsyncThunk(
    "global/GetChatHistory",
    async () => {
        try {
            const token = localStorage.getItem('authToken')
            const Response = await axiosInstance.get(`/chat/chat-history`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return Response.data
        } catch (err) {
            throw err
        }
    }
)

export const getTemplates = createAsyncThunk(
    "global/getTemplates",
    async ({ page = 1, limit = 8 }: { page?: number; limit?: number }) => {
        try {
            const token = localStorage.getItem('authToken')
            const Response = await axiosInstance.get(`/dashboard/get-templates?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return {
                data: Response.data.data,
                totalCount: Response.data.total || 0,
                totalPages: Math.ceil(Response.data.total / limit),
                page: Number(page),
                limit: Number(limit)
            }
        } catch (err) {
            throw err
        }
    }
)

export const getPublicTemplates = createAsyncThunk(
    "global/getPublicTemplates",
    async () => {
        try {
            const token = localStorage.getItem('authToken')
            const Response = await axiosInstance.get(`/dashboard/get-templates?page=1&limit=9`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return {
                data: Response.data.data,
            }
        } catch (err) {
            throw err
        }
    }
)

export const sendMessageApi = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/chat/send`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const redesignWebsite = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/redesign`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err: any) {
        if (err.response && err.response.status === 400) {
            throw new Error(err.response.data?.message || "Bad Request")
        }
        throw err
    }
}

export const imageToDesign = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/image-to-code`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const createDocApi = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/create-docs`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const AiChatHistory = async ({ uuid }: { uuid: string }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.get(`/ai/history/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const DeleteAiChatHistory = async ({ uuid }: { uuid: string }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.delete(`/ai/delete/${uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const updateWebsite = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/ai/update-website`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const createBlogApi = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/create-blog`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const remixWebsite = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/remix`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const editWebsite = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/edit-page`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

export const addWebsitePage = async ({ data }: { data: any }) => {
    try {
        const token = localStorage.getItem('authToken')
        const Response = await axiosInstance.post(`/add-page`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return Response.data
    } catch (err) {
        throw err
    }
}

// Additional API functions would be added here following the same pattern