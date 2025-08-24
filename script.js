// Global variables
let chatHistory = [];
let isTyping = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Enter key to send message
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize input and enable/disable send button
    messageInput.addEventListener('input', function() {
        const isEmpty = this.value.trim() === '';
        sendButton.style.opacity = isEmpty ? '0.5' : '1';
        sendButton.disabled = isEmpty;
    });

    // Initial button state
    sendButton.style.opacity = '0.5';
    sendButton.disabled = true;
}

// Initialize chat
function initializeChat() {
    const welcomeMessage = {
        type: 'bot',
        text: 'Hello! I\'m your NynnahAttorneys Legal Assistant. I can help you with legal advice, appointment booking, case status updates, and more. How can I assist you today?',
        timestamp: new Date()
    };
    chatHistory.push(welcomeMessage);
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '' || isTyping) return;
    
    // Add user message
    addMessage('user', message);
    messageInput.value = '';
    
    // Update button state
    const sendButton = document.getElementById('sendButton');
    sendButton.style.opacity = '0.5';
    sendButton.disabled = true;
    
    // Process the message
    processUserMessage(message);
}

// Send quick message
function sendQuickMessage(message) {
    addMessage('user', message);
    processUserMessage(message);
}

// Add message to chat
function addMessage(type, text, options = {}) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'}"></i>
        </div>
        <div class="message-content">
            <div class="message-text">${text}</div>
            <div class="message-time">${timestamp}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to history
    chatHistory.push({
        type: type,
        text: text,
        timestamp: new Date(),
        ...options
    });
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'block';
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    isTyping = true;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'none';
    isTyping = false;
}

// Process user message and generate response
async function processUserMessage(message) {
    showTypingIndicator();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    hideTypingIndicator();
    
    const response = await generateResponse(message.toLowerCase());
    addMessage('bot', response);
}

// Generate AI response based on user input
async function generateResponse(message) {
    // Legal advice patterns
    if (message.includes('legal advice') || message.includes('legal help') || message.includes('need help')) {
        return `I'd be happy to help you with legal advice! NynnahAttorneys specializes in:
        
        <ul>
            <li><strong>Technology Law</strong> - Data protection, cybersecurity, software licensing</li>
            <li><strong>Business Law</strong> - Corporate formation, contracts, compliance</li>
            <li><strong>Intellectual Property</strong> - Trademarks, copyrights, patents</li>
            <li><strong>Employment Law</strong> - Contracts, disputes, compliance</li>
        </ul>
        
        Could you please tell me more about your specific legal issue? This will help me provide more targeted guidance or connect you with the right specialist.`;
    }
    
    // Appointment booking
    if (message.includes('appointment') || message.includes('book') || message.includes('schedule') || message.includes('meeting')) {
        return `I'd be happy to help you schedule an appointment with our legal team!
        
        <strong>Available consultation options:</strong>
        <ul>
            <li>Initial consultation (30 minutes) - ₦25,000</li>
            <li>Extended consultation (60 minutes) - ₦45,000</li>
            <li>Business strategy session (90 minutes) - ₦65,000</li>
        </ul>
        
        <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 9:00 PM
        
        To book your appointment, please call us at <strong>+234 814 007 9115</strong> or email <strong>nynnahattorneys@gmail.com</strong> with your preferred date and time.
        
        What type of legal matter would you like to discuss during your consultation?`;
    }
    
    // Services inquiry
    if (message.includes('services') || message.includes('what do you do') || message.includes('help with')) {
        return `NynnahAttorneys offers comprehensive legal services for individuals and organizations:
        
        <strong>🏢 For Businesses:</strong>
        <ul>
            <li>Startups & Business Formation</li>
            <li>Contract Drafting & Review</li>
            <li>Regulatory Compliance</li>
            <li>Mergers & Acquisitions</li>
            <li>Employment Law</li>
        </ul>
        
        <strong>💻 Technology Law:</strong>
        <ul>
            <li>Data Protection & Privacy</li>
            <li>Software Licensing</li>
            <li>Cybersecurity Compliance</li>
            <li>E-commerce Law</li>
        </ul>
        
        <strong>👥 For Individuals:</strong>
        <ul>
            <li>Personal Legal Consultation</li>
            <li>Contract Review</li>
            <li>Legal Document Preparation</li>
        </ul>
        
        Which area interests you most?`;
    }
    
    // Technology law specific
    if (message.includes('technology law') || message.includes('data protection') || message.includes('cybersecurity') || message.includes('software')) {
        return `Technology Law is one of our core specializations! We help clients navigate the complex digital landscape:
        
        <strong>🔒 Data Protection & Privacy:</strong>
        <ul>
            <li>NDPR (Nigeria Data Protection Regulation) compliance</li>
            <li>Privacy policy drafting</li>
            <li>Data breach response</li>
            <li>Cross-border data transfer agreements</li>
        </ul>
        
        <strong>💻 Software & Technology:</strong>
        <ul>
            <li>Software licensing agreements</li>
            <li>SaaS terms of service</li>
            <li>API agreements</li>
            <li>Technology transfer agreements</li>
        </ul>
        
        <strong>🛡️ Cybersecurity Law:</strong>
        <ul>
            <li>Cybersecurity frameworks</li>
            <li>Incident response planning</li>
            <li>Regulatory compliance</li>
        </ul>
        
        Do you have a specific technology law issue you'd like to discuss?`;
    }
    
    // Business registration
    if (message.includes('register') && message.includes('business') || message.includes('company registration') || message.includes('incorporate')) {
        return `Great question! Business registration in Nigeria involves several steps:
        
        <strong>🏢 Types of Business Entities:</strong>
        <ul>
            <li><strong>Limited Liability Company (LLC)</strong> - Most popular for SMEs</li>
            <li><strong>Public Limited Company (PLC)</strong> - For larger businesses</li>
            <li><strong>Business Name Registration</strong> - For sole proprietorships</li>
            <li><strong>Partnership</strong> - For joint ventures</li>
        </ul>
        
        <strong>📋 Required Documents:</strong>
        <ul>
            <li>Memorandum & Articles of Association</li>
            <li>Form CAC 1.1 (Application form)</li>
            <li>Directors' consent forms</li>
            <li>Shareholders' details</li>
        </ul>
        
        <strong>⏱️ Timeline:</strong> Typically 2-4 weeks
        <strong>💰 Cost:</strong> Varies by company type (₦15,000 - ₦50,000+)
        
        Would you like me to schedule a consultation to discuss your specific business registration needs?`;
    }
    
    // Fees and pricing
    if (message.includes('fee') || message.includes('cost') || message.includes('price') || message.includes('charge')) {
        return `Our fee structure is transparent and competitive:
        
        <strong>💼 Consultation Fees:</strong>
        <ul>
            <li>Initial consultation (30 min): ₦25,000</li>
            <li>Extended consultation (60 min): ₦45,000</li>
            <li>Business strategy session (90 min): ₦65,000</li>
        </ul>
        
        <strong>📄 Document Services:</strong>
        <ul>
            <li>Contract drafting: ₦50,000 - ₦200,000</li>
            <li>Agreement review: ₦25,000 - ₦75,000</li>
            <li>Legal opinion: ₦100,000 - ₦300,000</li>
        </ul>
        
        <strong>🏢 Business Services:</strong>
        <ul>
            <li>Company registration: ₦150,000 - ₦300,000</li>
            <li>Regulatory compliance: ₦200,000 - ₦500,000</li>
            <li>Monthly retainer: ₦100,000 - ₦500,000</li>
        </ul>
        
        *Fees may vary based on complexity. We offer flexible payment plans for ongoing services.
        
        Would you like a detailed quote for your specific needs?`;
    }
    
    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
        return `Here's how you can reach us:
        
        <strong>📞 Phone:</strong> +234 814 007 9115
        <strong>📧 Email:</strong> nynnahattorneys@gmail.com
        <strong>📍 Address:</strong> FCT, Abuja, Nigeria
        <strong>🕒 Office Hours:</strong> Monday - Friday, 9:00 AM - 9:00 PM
        
        <strong>🌐 Website:</strong> <a href="https://www.nynnahattorney.com/" target="_blank">www.nynnahattorney.com</a>
        
        For urgent matters, please call our office directly. For non-urgent inquiries, email works best and we typically respond within 24 hours.
        
        Is there anything specific you'd like to discuss or schedule?`;
    }
    
    // Case status
    if (message.includes('case status') || message.includes('my case') || message.includes('case update')) {
        return `To check your case status, I'll need to verify your identity first.
        
        Please provide:
        <ul>
            <li>Your full name</li>
            <li>Case reference number (if available)</li>
            <li>Phone number on file</li>
        </ul>
        
        Alternatively, you can:
        <ul>
            <li>Call our office at +234 814 007 9115</li>
            <li>Email us at nynnahattorneys@gmail.com</li>
            <li>Visit our office during business hours</li>
        </ul>
        
        For security reasons, detailed case information cannot be shared through this chat without proper verification.`;
    }
    
    // Default response for unrecognized queries
    return `Thank you for your question! While I can provide general information about our services, for specific legal advice, I recommend speaking directly with one of our attorneys.
    
    <strong>I can help you with:</strong>
    <ul>
        <li>General information about our services</li>
        <li>Scheduling appointments</li>
        <li>Fee information</li>
        <li>Contact details</li>
        <li>Basic legal guidance</li>
    </ul>
    
    For detailed legal advice tailored to your situation, please call us at <strong>+234 814 007 9115</strong> or email <strong>nynnahattorneys@gmail.com</strong>.
    
    Is there anything else I can help you with today?`;
}

// Clear chat function
function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        chatHistory = [];
        initializeChat();
        
        // Re-add welcome message to display
        const welcomeMessage = chatHistory[0];
        addMessage('bot', welcomeMessage.text);
    }
}

// Download chat function
function downloadChat() {
    const chatContent = chatHistory.map(msg => {
        const time = msg.timestamp.toLocaleString();
        const sender = msg.type === 'user' ? 'You' : 'Legal Assistant';
        return `[${time}] ${sender}: ${msg.text.replace(/<[^>]*>/g, '')}`;
    }).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nynnahattorneys-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Enhanced message processing with backend integration
async function processUserMessage(message) {
    showTypingIndicator();

    // Use local processing directly since API is not available
    try {
        const response = await generateLocalResponse(message);

        setTimeout(() => {
            hideTypingIndicator();
            addMessage('bot', response);

            // Update suggestions based on the response
            updateContextualSuggestions(message);
        }, 1000 + Math.random() * 1000); // Simulate processing time

    } catch (error) {
        console.error('Error processing message:', error);
        hideTypingIndicator();
        addMessage('bot', 'I apologize for the technical difficulty. Please contact us directly at <strong>+234 814 007 9115</strong> for immediate assistance.');
    }
}

// Enhanced local response generation with comprehensive legal knowledge
async function generateLocalResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Appointment booking
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
        return `I'd be happy to help you book an appointment! 📅

<strong>How to Schedule:</strong>
• Call us at <strong>+234 814 007 9115</strong>
• Email <strong>nynnahattorneys@gmail.com</strong>
• Visit our website: <a href="https://www.nynnahattorney.com" target="_blank">www.nynnahattorney.com</a>

<strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 9:00 PM
<strong>Location:</strong> FCT, Abuja, Nigeria

<strong>Consultation Types:</strong>
• Initial consultation (30 minutes)
• Business law consultation
• Technology law consultation
• Contract review sessions`;
    }

    // Services inquiry
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('help with')) {
        return `NynnahAttorneys offers comprehensive legal services: ⚖️

<strong>🔧 Technology Law:</strong>
• Data protection & privacy compliance
• Software licensing agreements
• Cybersecurity legal frameworks
• Digital contracts & e-commerce law

<strong>🏢 Business Law:</strong>
• Company registration & incorporation
• Corporate governance
• Mergers & acquisitions
• Business compliance

<strong>📄 Contract Services:</strong>
• Contract drafting & review
• Employment agreements
• Partnership agreements
• Service agreements

<strong>💼 General Legal Services:</strong>
• Legal consultation & advice
• Document preparation
• Legal representation
• Dispute resolution

Contact us at <strong>+234 814 007 9115</strong> for detailed consultation.`;
    }

    // Technology law specific
    if (lowerMessage.includes('technology law') || lowerMessage.includes('data protection') || lowerMessage.includes('privacy') || lowerMessage.includes('software') || lowerMessage.includes('cyber')) {
        return `<strong>Technology Law Expertise 💻</strong>

NynnahAttorneys specializes in cutting-edge technology law:

<strong>🔒 Data Protection & Privacy:</strong>
• GDPR compliance for Nigerian businesses
• Data processing agreements
• Privacy policy drafting
• Data breach response protocols

<strong>⚡ Software & Digital:</strong>
• Software licensing agreements
• SaaS terms of service
• API usage agreements
• Digital product compliance

<strong>🛡️ Cybersecurity Law:</strong>
• Cybersecurity frameworks
• Incident response legal protocols
• Regulatory compliance
• Risk assessment legal support

<strong>📱 E-commerce & Digital Business:</strong>
• Online business registration
• Digital payment compliance
• Platform terms & conditions
• Digital marketing legal compliance

For specialized technology law consultation, call <strong>+234 814 007 9115</strong>.`;
    }

    // Business registration
    if (lowerMessage.includes('register') || lowerMessage.includes('business registration') || lowerMessage.includes('company') || lowerMessage.includes('incorporate')) {
        return `<strong>Business Registration in Nigeria 🏢</strong>

We'll guide you through the complete business registration process:

<strong>📋 Required Steps:</strong>
1. Name reservation with CAC
2. Prepare incorporation documents
3. Submit application to CAC
4. Obtain Certificate of Incorporation
5. Register for taxes (FIRS)
6. Open corporate bank account

<strong>📄 Required Documents:</strong>
• Memorandum & Articles of Association
• Form CAC 1.1 (Application form)
• Evidence of payment
• Passport photographs of directors
• Valid ID of shareholders/directors

<strong>⏱️ Timeline:</strong> 7-14 business days
<strong>💰 Our Fee:</strong> Contact for competitive rates

<strong>🎯 Business Types We Handle:</strong>
• Limited Liability Companies (LLC)
• Public Limited Companies (PLC)
• Partnerships
• Sole Proprietorships
• Non-profit organizations

Call <strong>+234 814 007 9115</strong> to start your business registration today!`;
    }

    // Contract law
    if (lowerMessage.includes('contract') || lowerMessage.includes('agreement') || lowerMessage.includes('terms')) {
        return `<strong>Contract Law Services 📋</strong>

Expert contract drafting and review services:

<strong>✍️ Contract Drafting:</strong>
• Employment contracts
• Service agreements
• Partnership agreements
• Non-disclosure agreements (NDAs)
• Licensing agreements
• Supply agreements

<strong>🔍 Contract Review:</strong>
• Risk assessment
• Terms negotiation
• Compliance verification
• Amendment recommendations

<strong>⚖️ Contract Disputes:</strong>
• Breach of contract cases
• Contract interpretation
• Dispute resolution
• Legal representation

<strong>🎯 Specialized Contracts:</strong>
• Technology licensing
• Software development agreements
• Data processing agreements
• International contracts

<strong>💡 Why Choose Us:</strong>
• Experienced in Nigerian contract law
• Technology-focused expertise
• Quick turnaround time
• Competitive pricing

Contact <strong>+234 814 007 9115</strong> for contract services.`;
    }

    // Fees and pricing
    if (lowerMessage.includes('fee') || lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('charge')) {
        return `<strong>Legal Service Fees 💰</strong>

We offer competitive and transparent pricing:

<strong>📞 Consultation Fees:</strong>
• Initial consultation: Contact for rates
• Follow-up consultations: Reduced rates
• Phone consultations available

<strong>📄 Document Services:</strong>
• Contract drafting: Based on complexity
• Document review: Per document
• Legal opinions: Fixed rates

<strong>🏢 Business Services:</strong>
• Company registration: Competitive packages
• Compliance services: Monthly retainers available
• Corporate legal support: Customized pricing

<strong>💻 Technology Law:</strong>
• Data protection compliance: Project-based
• Software agreements: Fixed rates
• Privacy policy drafting: Standard rates

<strong>🎯 Payment Options:</strong>
• One-time payments
• Installment plans available
• Corporate retainer agreements
• Pro bono cases (qualifying circumstances)

Call <strong>+234 814 007 9115</strong> for detailed pricing information.`;
    }

    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('address')) {
        return `<strong>Contact NynnahAttorneys 📞</strong>

<strong>📱 Phone:</strong> +234 814 007 9115
<strong>📧 Email:</strong> nynnahattorneys@gmail.com
<strong>🌐 Website:</strong> <a href="https://www.nynnahattorney.com" target="_blank">www.nynnahattorney.com</a>
<strong>📍 Location:</strong> FCT, Abuja, Nigeria

<strong>🕒 Office Hours:</strong>
Monday - Friday: 9:00 AM - 9:00 PM
Saturday: By appointment only
Sunday: Closed

<strong>💬 Social Media:</strong>
• LinkedIn: NynnahAttorneys
• Twitter: @NynnahAttorneys
• Facebook: NynnahAttorneys

<strong>🚨 Emergency Legal Matters:</strong>
For urgent legal matters outside office hours, please send an email with "URGENT" in the subject line.

We respond to all inquiries within 24 hours!`;
    }

    // General legal advice
    if (lowerMessage.includes('legal advice') || lowerMessage.includes('law') || lowerMessage.includes('legal') || lowerMessage.includes('advice')) {
        return `<strong>Legal Advice & Consultation ⚖️</strong>

NynnahAttorneys provides expert legal guidance:

<strong>🎯 Our Approach:</strong>
• Personalized legal solutions
• Clear, understandable advice
• Practical business-focused guidance
• Proactive legal strategies

<strong>📚 Areas of Expertise:</strong>
• Nigerian business law
• Technology & data protection law
• Contract law & commercial agreements
• Corporate governance & compliance
• Dispute resolution & litigation

<strong>💡 What We Offer:</strong>
• Initial case assessment
• Legal strategy development
• Risk analysis & mitigation
• Ongoing legal support
• Court representation when needed

<strong>🔍 Consultation Process:</strong>
1. Initial discussion of your legal issue
2. Legal research & analysis
3. Strategy recommendations
4. Implementation support
5. Follow-up & monitoring

<strong>⚡ Quick Legal Questions?</strong>
We offer brief consultations for simple legal questions.

Call <strong>+234 814 007 9115</strong> to schedule your legal consultation today!`;
    }

    // Default response with suggestions
    return `Thank you for your message! 🙏

I'm here to help with information about NynnahAttorneys' legal services. Here are some topics I can assist with:

<strong>🔧 Popular Topics:</strong>
• Business registration in Nigeria
• Technology law & data protection
• Contract drafting & review
• Legal consultation booking
• Service fees & pricing
• Contact information

<strong>💬 Try asking:</strong>
• "How do I register my business?"
• "What is technology law?"
• "How much do your services cost?"
• "I need help with a contract"
• "I want to book an appointment"

<strong>📞 Direct Contact:</strong>
For immediate assistance: <strong>+234 814 007 9115</strong>
Email: <strong>nynnahattorneys@gmail.com</strong>

How can I help you with your legal needs today?`;
}

// Session management
function getSessionId() {
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
        sessionId = generateUUID();
        localStorage.setItem('chatSessionId', sessionId);
    }
    return sessionId;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getCurrentContext() {
    return {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

// Update suggestions dynamically
function updateSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('inputSuggestions');
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-btn';
        button.textContent = suggestion;
        button.onclick = () => sendQuickMessage(suggestion);
        suggestionsContainer.appendChild(button);
    });
}

// Update contextual suggestions based on user message
function updateContextualSuggestions(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let suggestions = [];

    if (lowerMessage.includes('business') || lowerMessage.includes('register') || lowerMessage.includes('company')) {
        suggestions = [
            'What documents do I need for business registration?',
            'How long does business registration take?',
            'What are the costs for business registration?'
        ];
    } else if (lowerMessage.includes('technology') || lowerMessage.includes('data') || lowerMessage.includes('software')) {
        suggestions = [
            'What is GDPR compliance?',
            'Do I need a privacy policy?',
            'How do I protect my software legally?'
        ];
    } else if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
        suggestions = [
            'What should be in an employment contract?',
            'How do I review a business contract?',
            'What is a non-disclosure agreement?'
        ];
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('consultation')) {
        suggestions = [
            'What should I prepare for consultation?',
            'How long is a typical consultation?',
            'Can I have a phone consultation?'
        ];
    } else {
        suggestions = [
            'How do I register my business in Nigeria?',
            'What technology law services do you offer?',
            'I need help with a contract'
        ];
    }

    updateSuggestions(suggestions);
}

// Handle special actions
function handleActions(actions) {
    actions.forEach(action => {
        switch (action) {
            case 'book_consultation':
                showBookingModal();
                break;
            case 'call_office':
                showCallPrompt();
                break;
            case 'email_office':
                showEmailPrompt();
                break;
            case 'view_services':
                showServicesModal();
                break;
            default:
                console.log('Unknown action:', action);
        }
    });
}

// Modal functions
function showBookingModal() {
    // Create and show booking modal
    const modal = createModal('Book Consultation', `
        <div class="booking-form">
            <p>Ready to book your consultation? Choose your preferred method:</p>
            <div class="booking-options">
                <button class="booking-btn" onclick="window.open('tel:+2348140079115')">
                    <i class="fas fa-phone"></i> Call Now
                </button>
                <button class="booking-btn" onclick="window.open('mailto:nynnahattorneys@gmail.com?subject=Consultation Booking Request')">
                    <i class="fas fa-envelope"></i> Email Us
                </button>
                <button class="booking-btn" onclick="showOnlineBookingForm()">
                    <i class="fas fa-calendar"></i> Book Online
                </button>
            </div>
        </div>
    `);
}

function showCallPrompt() {
    const modal = createModal('Call NynnahAttorneys', `
        <div class="call-prompt">
            <p><strong>📞 Ready to call us?</strong></p>
            <p>Our phone number: <strong>+234 814 007 9115</strong></p>
            <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 9:00 PM</p>
            <button class="call-btn" onclick="window.open('tel:+2348140079115')">
                <i class="fas fa-phone"></i> Call Now
            </button>
        </div>
    `);
}

function showEmailPrompt() {
    const modal = createModal('Email NynnahAttorneys', `
        <div class="email-prompt">
            <p><strong>📧 Send us an email</strong></p>
            <p>Email address: <strong>nynnahattorneys@gmail.com</strong></p>
            <p>We typically respond within 24 hours.</p>
            <button class="email-btn" onclick="window.open('mailto:nynnahattorneys@gmail.com?subject=Legal Inquiry')">
                <i class="fas fa-envelope"></i> Send Email
            </button>
        </div>
    `);
}

function createModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.chat-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'chat-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.chat-modal');
    if (modal) {
        modal.remove();
    }
}

// Utility function to format text with HTML
function formatMessage(text) {
    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');

    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    return text;
}

// Enhanced chat analytics
function trackChatEvent(eventType, data = {}) {
    // Track user interactions for analytics
    const event = {
        type: eventType,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        ...data
    };

    // Store locally for now (could send to analytics service)
    const events = JSON.parse(localStorage.getItem('chatEvents') || '[]');
    events.push(event);
    localStorage.setItem('chatEvents', JSON.stringify(events.slice(-100))); // Keep last 100 events
}
