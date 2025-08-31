@@ .. @@
-const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000');
+const socket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000');