import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  FileText, 
  Bot, 
  MessageSquare, 
  Settings, 
  Users, 
  Brain, 
  Code, 
  Globe, 
  Shield, 
  Zap, 
  Crown, 
  Search, 
  ChevronRight, 
  ChevronDown,
  Play,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Lightbulb,
  Target,
  Rocket,
  Star,
  Heart,
  Coffee
} from 'lucide-react'

const documentationSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    color: 'from-green-500 to-emerald-500',
    items: [
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        content: `
# Quick Start Guide

Welcome to CustomerBot! Get your AI assistant up and running in minutes.

## Step 1: Create Your First Bot
1. Tap the "Create New Assistant" card on the main screen
2. Enter a name for your bot (e.g., "Support Assistant")
3. Optionally add your website URL for automatic content scanning
4. Choose to skip training data or add PDFs/text content
5. Tap "Create" to build your AI assistant

## Step 2: Customize Your Bot
1. Tap on your newly created bot
2. Choose from pre-made color schemes or create custom colors
3. Upload custom avatars for bot and user
4. Set the bot's personality with a system prompt
5. Add quick questions for common inquiries
6. Save your changes

## Step 3: Test Your Bot
1. Switch to the "Preview" tab
2. Start a conversation to test responses
3. Adjust settings based on performance
4. Your bot is ready to help customers!

## Next Steps
- Add more training data in the Training section
- Invite team members to collaborate
- Monitor conversations and analytics
        `
      },
      {
        id: 'first-bot',
        title: 'Creating Your First Bot',
        content: `
# Creating Your First Bot

## Bot Creation Process

### Basic Information
- **Bot Name**: Choose a clear, descriptive name
- **Website URL**: Optional but recommended for content scanning
- **Bot Icon**: Upload a custom avatar or use default

### Training Data Options
1. **Skip**: Start with basic AI knowledge
2. **Upload PDF**: Add documents for specialized knowledge
3. **Enter Text**: Add custom training content

### Best Practices
- Use clear, descriptive names
- Add relevant training data for your industry
- Test thoroughly before deploying
- Start simple and iterate

## Example Bot Names
- "Support Assistant" - For customer support
- "Sales Helper" - For sales inquiries
- "Product Guide" - For product information
- "FAQ Bot" - For frequently asked questions
        `
      }
    ]
  },
  {
    id: 'customization',
    title: 'Customization',
    icon: Settings,
    color: 'from-purple-500 to-pink-500',
    items: [
      {
        id: 'appearance',
        title: 'Appearance & Themes',
        content: `
# Appearance & Themes

## Color Schemes
Choose from 6 pre-designed color palettes:
- **Ocean Blue**: Professional blue theme
- **Purple Pink**: Creative gradient theme
- **Dark Violet**: Dark mode with purple accents
- **Emerald Gold**: Nature-inspired green and gold
- **Sunset**: Warm orange and red tones
- **Tropical Aqua**: Fresh cyan and blue

## Custom Colors
Create your own color scheme:
- **Primary Color**: Main accent color for buttons and highlights
- **Secondary Color**: Supporting color for gradients
- **Background Color**: Chat background color

## Theme Modes
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes, modern look

## Typography
Choose from 4 font sizes:
- Small (14px)
- Medium (16px) - Recommended
- Large (18px)
- Extra Large (20px)
        `
      },
      {
        id: 'avatars',
        title: 'Avatar Settings',
        content: `
# Avatar Settings

## Bot Avatar
- Upload custom bot profile picture
- Recommended size: 64x64 pixels
- Supported formats: JPG, PNG, GIF
- Max file size: 2MB

## User Avatar
- Upload custom user profile picture
- Same specifications as bot avatar
- Represents your customers in chat

## Best Practices
- Use clear, professional images
- Ensure good contrast and visibility
- Keep file sizes small for fast loading
- Test on different screen sizes
        `
      },
      {
        id: 'chat-settings',
        title: 'Chat Configuration',
        content: `
# Chat Configuration

## Bot Persona
Define your bot's personality and behavior:

### System Prompt
The system prompt is crucial for your bot's behavior:
- Define the bot's role and expertise
- Set the tone (formal, friendly, professional)
- Include specific instructions and limitations
- Example: "You are a helpful customer support assistant for a SaaS company. Always be polite and professional."

### Bot Name
- Choose a memorable, brand-appropriate name
- Keep it short and easy to pronounce
- Examples: "Alex", "Support Bot", "Helper"

## Welcome Message
- First message users see when opening chat
- Should be welcoming and informative
- Example: "Hi! I'm here to help with any questions about our products."

## Quick Questions
Add up to 5 pre-written questions:
- Common customer inquiries
- Product-specific questions
- Support topics
- Examples: "What are your pricing plans?", "How do I reset my password?"

## Message Settings
- Font size affects readability
- Color scheme impacts user experience
- Test with different devices and screen sizes
        `
      }
    ]
  },
  {
    id: 'training',
    title: 'Training & AI',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    items: [
      {
        id: 'training-data',
        title: 'Training Data Types',
        content: `
# Training Data Types

## PDF Documents
Upload PDF files to train your bot:
- **Supported**: PDF files up to 10MB
- **Best for**: Manuals, guides, documentation
- **Processing**: Automatic text extraction and analysis
- **Limit**: 20 sources per bot

### PDF Best Practices
- Use clear, well-formatted documents
- Avoid image-heavy PDFs
- Ensure text is selectable
- Break large documents into smaller files

## Website Content
Scrape content from web pages:
- **Input**: Valid website URLs
- **Processing**: Automatic content extraction
- **Best for**: Product pages, FAQ sections, blogs
- **Limit**: 20 URLs per bot

### Website Scraping Tips
- Use public, accessible pages
- Ensure content is relevant to your bot's purpose
- Test URLs before adding
- Monitor for content changes

## Custom Text
Add specific knowledge directly:
- **Format**: Plain text content
- **Best for**: Specific policies, procedures, FAQs
- **Limit**: 5,000 characters per entry
- **Processing**: Immediate availability

### Text Content Guidelines
- Write clear, concise information
- Use proper formatting and structure
- Include relevant keywords
- Update regularly for accuracy

## Q&A Pairs
Create specific question-answer combinations:
- **Purpose**: Handle specific scenarios
- **Format**: Question + detailed answer
- **Best for**: Common customer inquiries
- **Limit**: 50 pairs per bot

### Q&A Best Practices
- Use natural language questions
- Provide comprehensive answers
- Cover edge cases and variations
- Test with real customer scenarios
        `
      },
      {
        id: 'ai-behavior',
        title: 'AI Behavior & Prompts',
        content: `
# AI Behavior & Prompts

## System Prompts
The system prompt is your bot's foundation:

### Structure
1. **Role Definition**: What is the bot's job?
2. **Personality**: How should it communicate?
3. **Constraints**: What should it avoid?
4. **Instructions**: Specific behaviors and responses

### Example System Prompts

**Customer Support Bot:**
\`\`\`
You are a helpful customer support assistant for TechCorp, a SaaS company. 
Always be polite, professional, and empathetic. If you don't know something, 
admit it and offer to connect the customer with a human agent. 
Focus on solving problems quickly and efficiently.
\`\`\`

**Sales Assistant:**
\`\`\`
You are a friendly sales assistant for our e-commerce store. 
Help customers find products, answer questions about features and pricing, 
and guide them through the purchase process. Be enthusiastic but not pushy. 
Always prioritize customer satisfaction.
\`\`\`

**Technical Support:**
\`\`\`
You are a technical support specialist with expertise in our software platform. 
Provide clear, step-by-step instructions for technical issues. 
Use simple language and avoid jargon. If an issue requires human intervention, 
escalate appropriately with context about what was already tried.
\`\`\`

## Prompt Engineering Tips
- Be specific about desired behavior
- Include examples of good responses
- Set clear boundaries and limitations
- Test with various scenarios
- Iterate based on performance

## Training Effectiveness
- More relevant data = better responses
- Quality over quantity
- Regular updates improve accuracy
- Monitor and adjust based on user feedback
        `
      }
    ]
  },
  {
    id: 'team-management',
    title: 'Team Management',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    items: [
      {
        id: 'team-roles',
        title: 'Team Roles & Permissions',
        content: `
# Team Roles & Permissions

## Role Types

### Admin
**Full access to everything:**
- Create, edit, and delete bots
- Manage team members and permissions
- Access all analytics and reports
- Configure integrations and settings
- Export data and conversations

### Editor
**Content and configuration access:**
- Edit bot settings and appearance
- Add and modify training data
- View detailed analytics
- Manage conversations and sessions
- Cannot manage team members

### Viewer
**Read-only access:**
- View bot performance and analytics
- Read conversations and sessions
- Access basic reports
- Cannot modify any settings
- Cannot access sensitive data

## Permission Matrix

| Feature | Admin | Editor | Viewer |
|---------|-------|--------|--------|
| Create Bots | ✅ | ❌ | ❌ |
| Edit Bots | ✅ | ✅ | ❌ |
| Delete Bots | ✅ | ❌ | ❌ |
| Training Data | ✅ | ✅ | ❌ |
| View Analytics | ✅ | ✅ | ✅ |
| Team Management | ✅ | ❌ | ❌ |
| Integrations | ✅ | ✅ | ❌ |
| Export Data | ✅ | ✅ | ❌ |

## Best Practices
- Assign minimum necessary permissions
- Regularly review team access
- Use viewer role for stakeholders
- Limit admin access to key personnel
        `
      },
      {
        id: 'collaboration',
        title: 'Team Collaboration',
        content: `
# Team Collaboration

## Inviting Team Members
1. Navigate to the Teams section
2. Select the bot you want to add members to
3. Tap "Invite" button
4. Enter email address and select role
5. Send invitation

## Managing Team Members
- **Change Roles**: Update permissions as needed
- **Remove Members**: Remove access when no longer needed
- **Monitor Activity**: Track team member contributions

## Collaboration Features
- **Shared Bot Access**: Multiple team members can work on the same bot
- **Real-time Updates**: Changes are synchronized across all team members
- **Activity Tracking**: See who made what changes and when
- **Permission Controls**: Granular access control for security

## Communication Guidelines
- Use clear, descriptive bot names
- Document changes in training data
- Coordinate major updates with team
- Regular review meetings for optimization

## Security Considerations
- Regular access reviews
- Immediate removal of departing team members
- Role-based access principles
- Audit trail for all changes
        `
      }
    ]
  },
  {
    id: 'chat-features',
    title: 'Chat Features',
    icon: MessageSquare,
    color: 'from-cyan-500 to-blue-500',
    items: [
      {
        id: 'conversations',
        title: 'Managing Conversations',
        content: `
# Managing Conversations

## Chat Sessions
Each conversation is organized into sessions:
- **Session Creation**: Automatic when new conversation starts
- **Session Management**: View, search, and organize chats
- **Message History**: Complete conversation records
- **Session Analytics**: Performance metrics per conversation

## Conversation Features

### Real-time Chat
- Instant message delivery
- Typing indicators
- Read receipts
- Online/offline status

### Message Types
- **Text Messages**: Standard chat messages
- **Quick Replies**: Pre-defined response options
- **File Attachments**: Documents, images, and media
- **System Messages**: Automated notifications

### Search & Filter
- Search by message content
- Filter by date range
- Sort by activity or creation date
- Tag conversations for organization

## Session Management
- **Archive**: Store old conversations
- **Delete**: Remove unnecessary chats
- **Export**: Download conversation data
- **Share**: Collaborate with team members

## Best Practices
- Regular cleanup of old sessions
- Use descriptive session names
- Monitor conversation quality
- Analyze common topics for training improvements
        `
      },
      {
        id: 'chat-ui',
        title: 'Chat Interface',
        content: `
# Chat Interface

## Mobile-Optimized Design
- **Touch-friendly**: Large tap targets for mobile use
- **Responsive**: Adapts to different screen sizes
- **Smooth Scrolling**: Optimized for mobile browsers
- **Gesture Support**: Swipe and touch interactions

## Interface Elements

### Chat Header
- Bot name and status
- Online/offline indicator
- Action buttons (minimize, settings, close)
- Typing indicators

### Message Area
- Scrollable message history
- Message bubbles with timestamps
- Avatar display for bot and user
- Status indicators (sent, delivered, read)

### Input Area
- Text input with auto-resize
- Send button with loading states
- Quick reply buttons
- File attachment options

## Customization Options
- **Colors**: Match your brand colors
- **Fonts**: Choose readable font sizes
- **Avatars**: Custom bot and user images
- **Layout**: Adjust spacing and alignment

## Accessibility Features
- Screen reader support
- High contrast mode
- Keyboard navigation
- Voice input compatibility

## Performance Optimization
- Lazy loading for long conversations
- Message pagination
- Optimized image loading
- Efficient memory management
        `
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations & API',
    icon: Code,
    color: 'from-indigo-500 to-purple-500',
    items: [
      {
        id: 'api-overview',
        title: 'API Overview',
        content: `
# API Overview

## REST API
CustomerBot provides a comprehensive REST API for integration:

### Base URL
\`\`\`
https://api.customerbot.ai/v1
\`\`\`

### Authentication
All API requests require authentication:
\`\`\`javascript
headers: {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
\`\`\`

### Rate Limits
- **Free Plan**: 100 requests/hour
- **Starter Plan**: 1,000 requests/hour
- **Professional Plan**: 10,000 requests/hour
- **Enterprise**: Custom limits

## Key Endpoints

### Bots Management
\`\`\`
GET /bots - List all bots
POST /bots - Create new bot
GET /bots/{id} - Get bot details
PUT /bots/{id} - Update bot
DELETE /bots/{id} - Delete bot
\`\`\`

### Chat Operations
\`\`\`
POST /chat/message - Send message
GET /chat/sessions - List sessions
GET /chat/sessions/{id} - Get session details
DELETE /chat/sessions/{id} - Delete session
\`\`\`

### Training Data
\`\`\`
POST /training/pdf - Upload PDF
POST /training/url - Add website URL
POST /training/text - Add text content
GET /training/status - Check training status
\`\`\`

## Webhooks
Receive real-time notifications:
- New messages
- Training completion
- Error notifications
- Usage alerts

### Webhook Setup
1. Configure webhook URL in settings
2. Choose events to receive
3. Verify webhook signature
4. Handle webhook payloads
        `
      },
      {
        id: 'integrations',
        title: 'Platform Integrations',
        content: `
# Platform Integrations

## Website Integration

### HTML/JavaScript
Add to any website:
\`\`\`html
<script src="https://cdn.customerbot.ai/widget.js" 
        data-bot-id="YOUR_BOT_ID">
</script>
\`\`\`

### React Integration
For React applications:
\`\`\`jsx
import { CustomerBotWidget } from '@customerbot/react'

function App() {
  return (
    <div>
      <CustomerBotWidget 
        botId="YOUR_BOT_ID"
        theme="modern"
      />
    </div>
  )
}
\`\`\`

### WordPress Plugin
Install via WordPress admin:
1. Download CustomerBot plugin
2. Upload and activate
3. Configure with your bot ID
4. Customize appearance

## Mobile App Integration

### React Native
\`\`\`javascript
import { CustomerBot } from '@customerbot/react-native'

<CustomerBot
  botId="YOUR_BOT_ID"
  style={{ flex: 1 }}
/>
\`\`\`

### iOS (Swift)
\`\`\`swift
import CustomerBotSDK

let chatView = CustomerBotView(botId: "YOUR_BOT_ID")
view.addSubview(chatView)
\`\`\`

### Android (Kotlin)
\`\`\`kotlin
import com.customerbot.sdk.ChatView

val chatView = ChatView(this, "YOUR_BOT_ID")
layout.addView(chatView)
\`\`\`

## Third-Party Platforms
- **Shopify**: Available in app store
- **WooCommerce**: WordPress plugin
- **Squarespace**: Code injection
- **Wix**: HTML embed
- **Webflow**: Custom code component
        `
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    icon: Target,
    color: 'from-amber-500 to-orange-500',
    items: [
      {
        id: 'metrics',
        title: 'Key Metrics',
        content: `
# Key Metrics & Analytics

## Performance Metrics

### Response Time
- **Average Response Time**: How quickly your bot responds
- **Target**: Under 2 seconds for optimal experience
- **Factors**: Training data quality, server load, complexity

### Resolution Rate
- **First Contact Resolution**: Issues solved in first interaction
- **Target**: 80%+ for effective automation
- **Improvement**: Better training data and clearer prompts

### User Satisfaction
- **Rating System**: 1-5 star ratings from users
- **Target**: 4.5+ average rating
- **Feedback**: Collect and analyze user comments

## Usage Analytics

### Conversation Volume
- Daily, weekly, monthly conversation counts
- Peak usage times and patterns
- Growth trends and seasonality
- Capacity planning insights

### Popular Topics
- Most common questions and topics
- Trending issues and concerns
- Knowledge gaps identification
- Training data optimization opportunities

### User Behavior
- Session duration and engagement
- Drop-off points in conversations
- Return user patterns
- Feature usage statistics

## Business Impact

### Cost Savings
- Reduced support ticket volume
- Lower response time costs
- Improved agent efficiency
- 24/7 availability benefits

### Customer Experience
- Faster issue resolution
- Consistent service quality
- Reduced wait times
- Improved satisfaction scores

## Reporting Features
- **Real-time Dashboard**: Live metrics and alerts
- **Custom Reports**: Tailored analytics for your needs
- **Data Export**: CSV, PDF, and API access
- **Scheduled Reports**: Automated delivery to stakeholders
        `
      },
      {
        id: 'optimization',
        title: 'Performance Optimization',
        content: `
# Performance Optimization

## Bot Performance Tuning

### Response Quality
- **Monitor Accuracy**: Track correct vs incorrect responses
- **User Feedback**: Collect ratings and comments
- **A/B Testing**: Test different prompts and approaches
- **Continuous Improvement**: Regular updates based on data

### Training Data Optimization
- **Quality over Quantity**: Focus on relevant, accurate content
- **Regular Updates**: Keep information current
- **Content Gaps**: Identify and fill knowledge gaps
- **Redundancy Removal**: Clean up duplicate or outdated content

### Prompt Engineering
- **Clear Instructions**: Specific, actionable prompts
- **Context Setting**: Provide relevant background information
- **Constraint Definition**: Set clear boundaries and limitations
- **Example Responses**: Include sample interactions

## Technical Optimization

### Response Speed
- **Content Optimization**: Streamline training data
- **Caching**: Implement response caching for common queries
- **CDN Usage**: Global content delivery for faster access
- **Server Optimization**: Efficient processing and delivery

### Scalability Planning
- **Usage Monitoring**: Track growth and capacity needs
- **Load Testing**: Ensure performance under high traffic
- **Backup Systems**: Redundancy for high availability
- **Upgrade Planning**: Scale resources as needed

## Monitoring & Alerts
- **Performance Alerts**: Automated notifications for issues
- **Usage Thresholds**: Alerts for unusual activity
- **Error Tracking**: Monitor and resolve technical issues
- **Uptime Monitoring**: Ensure consistent availability

## Best Practices
- Regular performance reviews
- Data-driven optimization decisions
- User feedback integration
- Continuous testing and improvement
        `
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    color: 'from-red-500 to-pink-500',
    items: [
      {
        id: 'data-security',
        title: 'Data Security',
        content: `
# Data Security & Privacy

## Data Protection

### Encryption
- **In Transit**: TLS 1.3 encryption for all data transmission
- **At Rest**: AES-256 encryption for stored data
- **End-to-End**: Secure communication channels
- **Key Management**: Advanced key rotation and management

### Access Controls
- **Role-Based Access**: Granular permission system
- **Multi-Factor Authentication**: Additional security layer
- **Session Management**: Secure session handling
- **API Security**: Token-based authentication with expiration

### Data Storage
- **Geographic Controls**: Choose data storage regions
- **Backup Security**: Encrypted backup systems
- **Retention Policies**: Configurable data retention
- **Secure Deletion**: Complete data removal when requested

## Privacy Compliance

### GDPR Compliance
- **Data Minimization**: Collect only necessary data
- **Consent Management**: Clear consent mechanisms
- **Right to Access**: Users can request their data
- **Right to Deletion**: Complete data removal options
- **Data Portability**: Export user data in standard formats

### CCPA Compliance
- **Transparency**: Clear privacy notices
- **Opt-Out Rights**: Easy opt-out mechanisms
- **Data Categories**: Clear categorization of collected data
- **Third-Party Sharing**: Transparent sharing policies

### SOC 2 Type II
- **Security Controls**: Comprehensive security framework
- **Availability**: High uptime and reliability standards
- **Processing Integrity**: Accurate and complete processing
- **Confidentiality**: Protection of sensitive information
- **Privacy**: Robust privacy protection measures

## Security Best Practices

### For Administrators
- Use strong, unique passwords
- Enable two-factor authentication
- Regularly review team access
- Monitor security alerts
- Keep software updated

### For Organizations
- **Security Training**: Educate team members
- **Access Reviews**: Regular permission audits
- **Incident Response**: Clear procedures for security issues
- **Vendor Assessment**: Evaluate third-party integrations
- **Compliance Monitoring**: Regular compliance checks

## Data Handling

### Customer Data
- **Minimal Collection**: Only necessary information
- **Purpose Limitation**: Use data only for stated purposes
- **Accuracy**: Maintain accurate and up-to-date records
- **Security**: Protect against unauthorized access

### Conversation Data
- **Encryption**: All conversations encrypted
- **Retention**: Configurable retention periods
- **Access Logs**: Track who accesses what data
- **Anonymization**: Option to anonymize old conversations
        `
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    items: [
      {
        id: 'common-issues',
        title: 'Common Issues',
        content: `
# Common Issues & Solutions

## Bot Not Responding

### Possible Causes
- **Training Data**: Insufficient or poor quality training data
- **System Prompt**: Unclear or conflicting instructions
- **API Limits**: Rate limiting or quota exceeded
- **Network Issues**: Connectivity problems

### Solutions
1. **Check Training Data**: Ensure relevant content is uploaded
2. **Review System Prompt**: Clarify bot instructions
3. **Verify API Status**: Check service status and limits
4. **Test Connection**: Ensure stable internet connection

## Poor Response Quality

### Symptoms
- Irrelevant or incorrect answers
- Generic or unhelpful responses
- Inconsistent behavior
- Failure to understand context

### Improvements
1. **Add More Training Data**: Include relevant documents and FAQs
2. **Improve System Prompt**: Be more specific about desired behavior
3. **Add Q&A Pairs**: Create specific question-answer combinations
4. **Regular Updates**: Keep training data current and accurate

## Integration Problems

### Website Integration
- **Script Loading**: Ensure script loads properly
- **Bot ID**: Verify correct bot ID in integration code
- **Permissions**: Check website permissions and CORS settings
- **Conflicts**: Resolve conflicts with other scripts

### Mobile App Issues
- **SDK Version**: Use latest SDK version
- **Permissions**: Grant necessary app permissions
- **Network**: Ensure app has internet access
- **Configuration**: Verify correct bot configuration

## Performance Issues

### Slow Response Times
1. **Optimize Training Data**: Remove unnecessary content
2. **Check Server Status**: Verify service availability
3. **Network Diagnostics**: Test connection speed
4. **Cache Clearing**: Clear browser or app cache

### High Error Rates
1. **Review Logs**: Check error messages and patterns
2. **Update Training**: Add missing information
3. **Prompt Adjustment**: Refine system prompts
4. **Contact Support**: Escalate persistent issues

## Getting Help

### Self-Service Options
- **Documentation**: Comprehensive guides and tutorials
- **FAQ Section**: Common questions and answers
- **Video Tutorials**: Step-by-step visual guides
- **Community Forum**: User discussions and solutions

### Support Channels
- **Live Chat**: Instant support during business hours
- **Email Support**: Detailed technical assistance
- **Phone Support**: Direct contact for urgent issues
- **Screen Sharing**: Remote assistance for complex problems

### Support Response Times
- **Live Chat**: Immediate during business hours
- **Email**: Within 24 hours
- **Phone**: Within 4 hours for urgent issues
- **Community**: Peer support available 24/7
        `
      },
      {
        id: 'best-practices',
        title: 'Best Practices',
        content: `
# Best Practices & Tips

## Bot Design Principles

### User Experience First
- **Clear Communication**: Use simple, understandable language
- **Helpful Responses**: Provide actionable information
- **Graceful Failures**: Handle unknown queries elegantly
- **Human Handoff**: Know when to escalate to humans

### Brand Consistency
- **Voice and Tone**: Match your brand personality
- **Visual Design**: Use brand colors and styling
- **Messaging**: Consistent with other customer touchpoints
- **Professional Standards**: Maintain quality and reliability

## Training Strategy

### Content Quality
- **Accuracy**: Ensure all information is correct and current
- **Relevance**: Focus on customer-facing information
- **Completeness**: Cover all important topics thoroughly
- **Organization**: Structure content logically

### Iterative Improvement
- **Start Simple**: Begin with basic functionality
- **Monitor Performance**: Track metrics and user feedback
- **Regular Updates**: Continuously improve based on data
- **A/B Testing**: Test different approaches

## Deployment Strategy

### Gradual Rollout
1. **Internal Testing**: Test with team members first
2. **Beta Users**: Limited release to select customers
3. **Soft Launch**: Gradual increase in traffic
4. **Full Deployment**: Complete rollout with monitoring

### Monitoring & Maintenance
- **Daily Checks**: Monitor key metrics daily
- **Weekly Reviews**: Analyze performance trends
- **Monthly Updates**: Regular content and feature updates
- **Quarterly Assessments**: Comprehensive performance reviews

## Success Metrics

### Customer Satisfaction
- **Response Quality**: Accurate and helpful answers
- **Resolution Rate**: Issues solved without human intervention
- **User Ratings**: Direct feedback from customers
- **Repeat Usage**: Customers returning to use the bot

### Business Impact
- **Cost Reduction**: Lower support costs per interaction
- **Efficiency Gains**: Faster resolution times
- **Scalability**: Handle more customers without proportional cost increase
- **24/7 Availability**: Round-the-clock customer support

## Common Pitfalls to Avoid
- **Over-Engineering**: Keep it simple and focused
- **Insufficient Training**: Invest time in quality training data
- **Ignoring Feedback**: Regularly review and act on user feedback
- **Set and Forget**: Continuous monitoring and improvement required
- **Poor Handoff**: Ensure smooth transition to human agents when needed

## Growth Strategies
- **Feature Expansion**: Gradually add new capabilities
- **Integration Growth**: Connect with more platforms and tools
- **Team Scaling**: Add team members as usage grows
- **Advanced Features**: Implement analytics, reporting, and automation
        `
      }
    ]
  }
]

export function Documentation() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState(new Set(['getting-started']))
  const [selectedItem, setSelectedItem] = useState(null)
  const [copiedCode, setCopiedCode] = useState('')

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(text)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.items.some(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const renderContent = (content) => {
    const lines = content.trim().split('\n')
    const elements = []
    let currentElement = []
    let inCodeBlock = false
    let codeLanguage = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <div key={i} className="relative bg-gray-900 rounded-xl p-4 my-4 overflow-x-auto">
              <button
                onClick={() => copyToClipboard(currentElement.join('\n'))}
                className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copiedCode === currentElement.join('\n') ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-300" />
                )}
              </button>
              <pre className="text-green-400 text-sm">
                <code>{currentElement.join('\n')}</code>
              </pre>
            </div>
          )
          currentElement = []
          inCodeBlock = false
        } else {
          // Start code block
          codeLanguage = line.substring(3)
          inCodeBlock = true
        }
        continue
      }

      if (inCodeBlock) {
        currentElement.push(line)
        continue
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
            {line.substring(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-5">
            {line.substring(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">
            {line.substring(4)}
          </h3>
        )
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
            • {line.substring(2)}
          </li>
        )
      } else if (line.startsWith('1. ') || /^\d+\. /.test(line)) {
        const match = line.match(/^(\d+)\. (.+)/)
        if (match) {
          elements.push(
            <li key={i} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
              {match[1]}. {match[2]}
            </li>
          )
        }
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={i} className="font-semibold text-gray-900 dark:text-white mb-2">
            {line.substring(2, line.length - 2)}
          </p>
        )
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-2" />)
      } else if (line.includes('|')) {
        // Simple table handling
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell)
        if (cells.length > 1) {
          elements.push(
            <div key={i} className="grid grid-cols-4 gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
              {cells.map((cell, idx) => (
                <div key={idx} className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {cell}
                </div>
              ))}
            </div>
          )
        }
      } else {
        elements.push(
          <p key={i} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {line}
          </p>
        )
      }
    }

    return elements
  }

  // If an item is selected, show its content
  if (selectedItem) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {selectedItem.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Documentation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <div className="prose prose-sm max-w-none">
              {renderContent(selectedItem.content)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-target"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Documentation</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Complete guide to CustomerBot</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Welcome to CustomerBot</h2>
                  <p className="text-blue-100">Your complete guide to AI-powered customer support</p>
                </div>
              </div>
              <p className="text-blue-50 leading-relaxed">
                This documentation covers everything you need to know about creating, customizing, and managing your AI assistants.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedItem(documentationSections[0].items[0])}
              className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">Quick Start</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Get started in minutes</p>
            </button>

            <button
              onClick={() => setSelectedItem(documentationSections[4].items[0])}
              className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white text-sm">Security</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Data protection guide</p>
            </button>
          </div>

          {/* Documentation Sections */}
          {filteredSections.map((section) => (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{section.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{section.items.length} articles</p>
                    </div>
                  </div>
                  {expandedSections.has(section.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedSections.has(section.id) && (
                <div className="border-t border-gray-100 dark:border-gray-700">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {item.content.split('\n').find(line => line.trim() && !line.startsWith('#'))?.substring(0, 100)}...
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* No Results */}
          {filteredSections.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No documentation found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 dark:text-blue-400 font-medium"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Need More Help?</h3>
                <p className="text-indigo-100 text-sm">We're here to support you</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Live Chat</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}