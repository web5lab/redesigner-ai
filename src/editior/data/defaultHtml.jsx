export const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Settings - Clean & Light</title>
    <meta name="description" content="Manage your profile and account settings with a clean, light theme.">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for placeholders or specific light theme elements if needed */
        .profile-placeholder {
            width: 120px;
            height: 120px;
            background-color: #e0f2f7; /* Light cyan */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0e7490; /* Teal */
            font-size: 1.2rem;
            font-weight: bold;
            flex-shrink: 0;
        }
        .setting-icon-placeholder {
            width: 24px;
            height: 24px;
            background-color: #bfdbfe; /* Light blue */
            border-radius: 4px;
            flex-shrink: 0;
            margin-right: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1d4ed8; /* Blue */
            font-size: 0.8rem;
        }
         .switch-toggle {
            width: 40px;
            height: 20px;
            background-color: #e5e7eb; /* Gray 200 */
            border-radius: 9999px;
            position: relative;
            transition: background-color 0.2s;
            cursor: pointer;
        }
        .switch-toggle.active {
            background-color: #34d399; /* Green 400 */
        }
        .switch-toggle .switch-circle {
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.2s;
        }
        .switch-toggle.active .switch-circle {
            transform: translateX(20px);
        }
    </style>
</head>
<body class="bg-gray-100 font-sans text-gray-800 leading-normal antialiased">

    
</body>
`;