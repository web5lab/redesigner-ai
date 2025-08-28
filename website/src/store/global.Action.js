import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import toast from "react-hot-toast";

export const GetUserData = createAsyncThunk(
    "global/getUserData",
    async (token) => {
        try {
            const Response = await axiosInstance.get(`/auth/user-data`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const createBot = createAsyncThunk(
    "global/createBot",
    async ({ data }) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.post(`/bot/create-bot`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            toast.success("Bot Created Successfully");
            return Response.data;
        } catch (err) {
            toast.error("Bot Created Failed");
            if (err) {
                throw err;
            }
        }
    }
);

export const createBotApi = async ({ data }) => {
    try {
        const token = localStorage.getItem('authToken');
        const Response = await axiosInstance.post(`/bot/create-bot`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token to the request headers
            }
        });
        toast.success("Bot Created Successfully");
        return Response.data;
    } catch (err) {
        toast.error("Bot Created Failed");
        if (err) {
            throw err;
        }
    }
}


export const GetBots = createAsyncThunk(
    "global/getBots",
    async () => {
        console.log("get data api call")
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.get(`/bot/get-bot`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            console.log("api err 1 =>", err);
            if (err) {
                throw err;
            }
        }
    }
);

export const GetBotData = createAsyncThunk(
    "global/getBotData",
    async (token) => {
        try {
            const Response = await axiosInstance.get(`/auth/bot-data`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const DeleteChatBot = async ({chatBotId}) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.delete(`/bot/delete-bot/${chatBotId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }


export const addFaq = createAsyncThunk(
    "global/addFaq",
    async ({ data, token }) => {
        try {
            const Response = await axiosInstance.post(`/auth/add-faq`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const scrapPdfData = createAsyncThunk(
    "global/addPdfData",
    async ({ data }) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.post(`/scrap-data/process-pdf`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const scrapWebsiteUrl = createAsyncThunk(
    "global/scrapWebsiteUrl",
    async ({ url }) => {
        const token = localStorage.getItem('authToken');
        try {
            const Response = await axiosInstance.get(`/scrap-data/process-url?url=${url}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const getBotsession = createAsyncThunk(
    "global/getBotsession",
    async ({ data, token }) => {
        try {
            const Response = await axiosInstance.post(`/auth/get-bot-session`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const getChatSessions = createAsyncThunk(
    "global/getChatSessions",
    async ({ botId }) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.get(`/chat/get-chat-sessions/${botId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const getChatSession = createAsyncThunk(
    "global/getChatSession",
    async ({ sessionId }) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.get(`/chat/get-chat-session/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const updateChatBot = async ({ data, botId }) => {
    try {
        const token = localStorage.getItem('authToken');
        const Response = await axiosInstance.post(`/bot/update-bot/${botId}`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token to the request headers
            }
        });
        console.log("api data", Response);
        return Response.data;
    } catch (err) {
        if (err) {
            throw err;
        }
    }
}

export const getBotConfig = async ({ botId }) => {
    try {
        const Response = await axiosInstance.get(`/bot/bot-config/${botId}`);
        return Response.data.bot;
    } catch (err) {
        if (err) {
            throw err;
        }
    }
}

export const chatApi = createAsyncThunk(
    "global/chatApi",
    async ({ data }) => {
        try {
            const token = localStorage.getItem('authToken');
            const Response = await axiosInstance.post(`/chat/process-chat`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to the request headers
                }
            });
            console.log("api data", Response);
            return Response.data;
        } catch (err) {
            if (err) {
                throw err;
            }
        }
    }
);

export const geminiChatApi = async ({ data }) => {
    try {
        const token = localStorage.getItem('authToken');
        const Response = await axiosInstance.post(`/chat/process-chat`, data, {
            headers: {
                Authorization: `Bearer ${token}` // Add the token to the request headers
            }
        });
        return Response.data;
    } catch (err) {
        if (err) {
            throw err;
        }
    }
}