import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendTeamInvitation = async ({ 
    recipientEmail, 
    recipientName, 
    inviterName, 
    botName, 
    role, 
    invitationLink 
}) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@customerbot.ai',
            to: recipientEmail,
            subject: `You've been invited to join ${botName} team`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1f2937; margin-bottom: 10px;">Team Invitation</h1>
                        <p style="color: #6b7280; font-size: 16px;">You've been invited to collaborate</p>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h2 style="color: #1f2937; margin-bottom: 15px;">Hello ${recipientName || 'there'}!</h2>
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                            <strong>${inviterName}</strong> has invited you to join the <strong>${botName}</strong> team 
                            as a <strong>${role}</strong>.
                        </p>
                        <p style="color: #374151; line-height: 1.6;">
                            As a ${role}, you'll be able to:
                        </p>
                        <ul style="color: #374151; margin: 10px 0; padding-left: 20px;">
                            ${role === 'admin' ? `
                                <li>Manage team members and permissions</li>
                                <li>Edit bot configuration and training</li>
                                <li>Access all analytics and reports</li>
                                <li>Manage integrations and settings</li>
                            ` : role === 'editor' ? `
                                <li>Edit bot settings and configuration</li>
                                <li>Manage training data and content</li>
                                <li>View detailed analytics</li>
                                <li>Test bot functionality</li>
                            ` : `
                                <li>View conversations and chat history</li>
                                <li>Access basic analytics</li>
                                <li>Export conversation data</li>
                                <li>Monitor bot performance</li>
                            `}
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${invitationLink}" 
                           style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Accept Invitation
                        </a>
                    </div>
                    
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0;">
                            If you didn't expect this invitation, you can safely ignore this email.
                        </p>
                        <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
                            © ${new Date().getFullYear()} CustomerBot. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Team invitation sent to ${recipientEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending team invitation:', error);
        throw error;
    }
};

export const sendWelcomeEmail = async ({ 
    recipientEmail, 
    recipientName, 
    botName, 
    role 
}) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@customerbot.ai',
            to: recipientEmail,
            subject: `Welcome to ${botName} team!`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1f2937; margin-bottom: 10px;">Welcome to the Team!</h1>
                        <p style="color: #6b7280; font-size: 16px;">You're now part of ${botName}</p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 4px solid #3b82f6;">
                        <h2 style="color: #1f2937; margin-bottom: 15px;">Hello ${recipientName || 'there'}!</h2>
                        <p style="color: #374151; line-height: 1.6; margin-bottom: 15px;">
                            Welcome to the <strong>${botName}</strong> team! You've been added as a <strong>${role}</strong> 
                            and can now start collaborating with your team.
                        </p>
                        <p style="color: #374151; line-height: 1.6;">
                            Get started by logging into your dashboard and exploring your new permissions.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${process.env.VITE_WEB_URL}/dashboard" 
                           style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                            Go to Dashboard
                        </a>
                    </div>
                    
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0;">
                            Need help? Contact our support team anytime.
                        </p>
                        <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
                            © ${new Date().getFullYear()} CustomerBot. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${recipientEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
};