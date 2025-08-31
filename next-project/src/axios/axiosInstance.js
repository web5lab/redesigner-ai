@@ .. @@
 const axiosInstance = axios.create({
-  baseURL: import.meta.env.VITE_SERVER_URL,
+  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
 });