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

    // Comprehensive legal knowledge base - analyze the question and provide detailed answers

    // Criminal Law
    if (lowerMessage.includes('criminal') || lowerMessage.includes('crime') || lowerMessage.includes('arrest') || lowerMessage.includes('police') || lowerMessage.includes('theft') || lowerMessage.includes('fraud') || lowerMessage.includes('assault') || lowerMessage.includes('murder') || lowerMessage.includes('bail')) {
        return `<strong>Criminal Law in Nigeria ⚖️</strong>

Criminal law deals with offenses against the state and society. Here's what you need to know:

<strong>🔍 Common Criminal Offenses:</strong>
• Theft and stealing (punishable by imprisonment)
• Fraud and financial crimes (serious penalties under EFCC Act)
• Assault and battery (physical harm to others)
• Murder and manslaughter (capital offenses)
• Cybercrime (regulated by Cybercrimes Act 2015)

<strong>⚖️ Your Rights if Arrested:</strong>
• Right to remain silent
• Right to legal representation
• Right to be informed of charges
• Right to bail (except in capital offenses)
• Right to fair hearing within reasonable time

<strong>🛡️ Legal Procedures:</strong>
• Police investigation and evidence gathering
• Arraignment before magistrate court
• Bail application (if applicable)
• Trial proceedings and defense
• Appeal processes if convicted

<strong>📋 What to Do if Charged:</strong>
1. Remain calm and exercise your right to silence
2. Contact a lawyer immediately
3. Do not sign any statement without legal advice
4. Gather evidence and witnesses for your defense
5. Prepare for bail application

<strong>💼 NynnahAttorneys Criminal Law Services:</strong>
We provide expert criminal defense including bail applications, trial representation, and appeals. Our experienced team understands Nigerian criminal law and will protect your rights throughout the legal process.

<strong>🚨 Need immediate criminal law assistance? Contact NynnahAttorneys at +234 814 007 9115 for urgent legal representation.</strong>`;
    }

    // Family Law
    if (lowerMessage.includes('divorce') || lowerMessage.includes('marriage') || lowerMessage.includes('custody') || lowerMessage.includes('child support') || lowerMessage.includes('alimony') || lowerMessage.includes('family') || lowerMessage.includes('spouse') || lowerMessage.includes('separation')) {
        return `<strong>Family Law in Nigeria 👨‍👩‍👧‍👦</strong>

Family law governs relationships between family members. Here's comprehensive guidance:

<strong>💒 Marriage Laws:</strong>
• Statutory marriage (Marriage Act - monogamous)
• Customary marriage (traditional ceremonies)
• Islamic marriage (under Islamic law)
• Requirements: consent, age (18+), mental capacity

<strong>💔 Divorce Proceedings:</strong>
• Grounds: adultery, cruelty, desertion, mental illness
• Petition filing in High Court
• Divorce process: 6 months to 2 years
• Division of matrimonial property
• Custody and maintenance arrangements

<strong>👶 Child Custody & Support:</strong>
• Best interest of child principle
• Joint or sole custody options
• Maintenance obligations of both parents
• Visitation rights for non-custodial parent
• Child support calculations based on income

<strong>🏠 Property Rights:</strong>
• Matrimonial property division
• Separate vs joint property
• Spousal maintenance (alimony)
• Inheritance rights
• Property acquired during marriage

<strong>📋 Required Documents:</strong>
• Marriage certificate
• Birth certificates of children
• Property documents
• Financial statements
• Evidence of grounds for divorce

<strong>💼 NynnahAttorneys Family Law Services:</strong>
We handle all family law matters with sensitivity and expertise. Our team provides compassionate legal support for divorce, custody, property division, and family disputes while protecting your interests and those of your children.

<strong>🤝 Need family law assistance? Contact NynnahAttorneys at +234 814 007 9115 for confidential consultation and expert representation.</strong>`;
    }

    // Property/Real Estate Law
    if (lowerMessage.includes('property') || lowerMessage.includes('land') || lowerMessage.includes('real estate') || lowerMessage.includes('landlord') || lowerMessage.includes('tenant') || lowerMessage.includes('rent') || lowerMessage.includes('lease') || lowerMessage.includes('mortgage') || lowerMessage.includes('title') || lowerMessage.includes('deed')) {
        return `<strong>Property & Real Estate Law in Nigeria 🏠</strong>

Property law governs ownership, use, and transfer of real estate. Here's what you need to know:

<strong>📜 Types of Land Ownership:</strong>
• Certificate of Occupancy (C of O) - government grant
• Deed of Assignment - private transfer
• Customary Right of Occupancy - traditional ownership
• Statutory Right of Occupancy - urban areas

<strong>🏘️ Property Acquisition Process:</strong>
1. Property search and verification
2. Due diligence on title documents
3. Survey and property inspection
4. Purchase agreement negotiation
5. Payment and deed execution
6. Registration at Land Registry
7. Obtaining Certificate of Occupancy

<strong>🏢 Landlord-Tenant Law:</strong>
• Tenancy agreements and lease terms
• Rent payment and increases
• Security deposits and refunds
• Maintenance responsibilities
• Eviction procedures and notice periods
• Tenant rights and protections

<strong>⚖️ Property Disputes:</strong>
• Boundary disputes resolution
• Title defects and corrections
• Landlord-tenant conflicts
• Property inheritance issues
• Mortgage and foreclosure matters

<strong>📋 Essential Documents:</strong>
• Survey plan and coordinates
• Certificate of Occupancy
• Deed of Assignment
• Tax clearance certificate
• Building plan approval
• Environmental impact assessment

<strong>🔍 Due Diligence Checklist:</strong>
• Verify seller's ownership
• Check for encumbrances
• Confirm property boundaries
• Review planning permissions
• Investigate any disputes
• Ensure proper documentation

<strong>💼 NynnahAttorneys Property Law Services:</strong>
We provide comprehensive real estate legal services including property acquisition, title verification, lease agreements, dispute resolution, and property registration. Our expertise ensures secure property transactions and protects your real estate investments.

<strong>🏡 Need property law assistance? Contact NynnahAttorneys at +234 814 007 9115 for expert real estate legal services and secure property transactions.</strong>`;
    }

    // Employment/Labor Law
    if (lowerMessage.includes('employment') || lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('salary') || lowerMessage.includes('fired') || lowerMessage.includes('dismissed') || lowerMessage.includes('wrongful termination') || lowerMessage.includes('workplace') || lowerMessage.includes('employee') || lowerMessage.includes('employer')) {
        return `<strong>Employment & Labor Law in Nigeria 👔</strong>

Employment law protects workers' rights and regulates workplace relationships. Here's comprehensive guidance:

<strong>📋 Employment Rights:</strong>
• Right to fair wages and timely payment
• Safe working conditions and environment
• Protection from discrimination and harassment
• Reasonable working hours (8 hours/day, 40 hours/week)
• Annual leave and public holidays
• Maternity/paternity leave benefits

<strong>📄 Employment Contracts:</strong>
• Written contract requirements
• Job description and responsibilities
• Salary, benefits, and allowances
• Termination clauses and notice periods
• Confidentiality and non-compete agreements
• Dispute resolution mechanisms

<strong>⚖️ Wrongful Termination:</strong>
• Grounds for lawful dismissal
• Notice requirements (1-3 months depending on service)
• Severance pay calculations
• Unfair dismissal claims
• Constructive dismissal situations
• Remedies: reinstatement or compensation

<strong>🛡️ Workplace Protection:</strong>
• Sexual harassment prevention
• Discrimination based on gender, religion, ethnicity
• Whistleblower protections
• Health and safety regulations
• Workers' compensation for injuries
• Trade union rights and collective bargaining

<strong>💰 Wage and Hour Laws:</strong>
• Minimum wage requirements
• Overtime pay calculations
• Salary deductions limitations
• Pension contributions (8% employee, 10% employer)
• Tax obligations and PAYE
• Gratuity payments after 5+ years service

<strong>📋 Required Documentation:</strong>
• Employment contract
• Job offer letter
• Performance evaluations
• Disciplinary records
• Payslips and salary statements
• Termination letters

<strong>💼 NynnahAttorneys Employment Law Services:</strong>
We represent both employees and employers in workplace disputes, contract negotiations, wrongful termination cases, and employment compliance matters. Our team ensures fair treatment and legal protection in all employment relationships.

<strong>⚖️ Facing workplace issues? Contact NynnahAttorneys at +234 814 007 9115 for expert employment law representation and workplace rights protection.</strong>`;
    }

    // Intellectual Property Law
    if (lowerMessage.includes('intellectual property') || lowerMessage.includes('copyright') || lowerMessage.includes('trademark') || lowerMessage.includes('patent') || lowerMessage.includes('brand') || lowerMessage.includes('logo') || lowerMessage.includes('invention') || lowerMessage.includes('piracy') || lowerMessage.includes('plagiarism')) {
        return `<strong>Intellectual Property Law in Nigeria 💡</strong>

Intellectual Property (IP) law protects creative works and innovations. Here's what you need to know:

<strong>📚 Types of Intellectual Property:</strong>
• Copyright - books, music, software, artistic works
• Trademarks - brand names, logos, slogans
• Patents - inventions and innovations
• Industrial designs - product appearance
• Trade secrets - confidential business information

<strong>©️ Copyright Protection:</strong>
• Automatic protection upon creation
• Duration: life of author + 70 years
• Covers literary, musical, artistic works
• Software and digital content protection
• Fair use exceptions for education/research
• Registration with Nigerian Copyright Commission

<strong>™️ Trademark Registration:</strong>
• Protects brand names and logos
• 7-year renewable terms
• Classes of goods and services
• Opposition and examination process
• Enforcement against infringement
• International trademark protection

<strong>🔬 Patent Protection:</strong>
• 20-year protection for inventions
• Must be new, inventive, and industrially applicable
• Patent search and application process
• Examination and grant procedures
• Patent licensing and commercialization
• Enforcement against infringement

<strong>⚖️ IP Infringement:</strong>
• Copyright piracy and unauthorized use
• Trademark counterfeiting
• Patent infringement claims
• Remedies: injunctions, damages, account of profits
• Criminal penalties for willful infringement
• Online piracy and digital rights management

<strong>📋 IP Registration Process:</strong>
1. IP search and clearance
2. Application preparation and filing
3. Examination by relevant agency
4. Publication and opposition period
5. Registration and certificate issuance
6. Maintenance and renewal

<strong>💼 NynnahAttorneys IP Services:</strong>
We provide comprehensive intellectual property services including copyright registration, trademark filing, patent applications, IP licensing agreements, and infringement litigation. Our expertise protects your creative works and innovations in the digital age.

<strong>🛡️ Need IP protection? Contact NynnahAttorneys at +234 814 007 9115 for expert intellectual property legal services and comprehensive IP portfolio management.</strong>`;
    }

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
• Contract review sessions

<strong>💼 Why Choose NynnahAttorneys for your legal consultation? We provide personalized legal solutions with expertise across all areas of Nigerian law. Contact us at +234 814 007 9115 to schedule your consultation today.</strong>`;
    }

    // Tax Law
    if (lowerMessage.includes('tax') || lowerMessage.includes('vat') || lowerMessage.includes('paye') || lowerMessage.includes('withholding') || lowerMessage.includes('firs') || lowerMessage.includes('tax return') || lowerMessage.includes('tax audit')) {
        return `<strong>Tax Law in Nigeria 💰</strong>

Nigerian tax law governs federal, state, and local taxation. Here's comprehensive guidance:

<strong>📊 Types of Taxes:</strong>
• Personal Income Tax (PAYE) - salary earners
• Company Income Tax (CIT) - corporate entities
• Value Added Tax (VAT) - goods and services
• Withholding Tax (WHT) - payments to vendors
• Capital Gains Tax (CGT) - asset disposals
• Stamp Duties - legal documents

<strong>🏢 Corporate Tax Obligations:</strong>
• Company Income Tax: 30% of profits
• Minimum tax: 0.5% of gross turnover
• Education tax: 2% of assessable profits
• Annual tax returns filing
• Monthly PAYE and VAT remittance
• Quarterly WHT returns

<strong>👤 Personal Tax Requirements:</strong>
• PAYE deduction from salaries
• Self-assessment for business income
• Tax clearance certificate requirements
• Annual tax return filing
• Capital gains on property sales
• Tax identification number (TIN)

<strong>⚖️ Tax Disputes & Audits:</strong>
• FIRS audit procedures and rights
• Tax assessment appeals process
• Tax tribunal proceedings
• Settlement and payment plans
• Penalty waivers and negotiations
• Professional representation requirements

<strong>📋 Tax Compliance Benefits:</strong>
• Access to government contracts
• Bank loan approvals
• Business registration renewals
• International travel clearance
• Investment incentives eligibility
• Legal protection from penalties

<strong>🛡️ Tax Planning Strategies:</strong>
• Legal tax minimization techniques
• Investment allowances and deductions
• Pioneer status applications
• Free trade zone benefits
• Double taxation treaty advantages
• Succession planning for wealth transfer

<strong>💼 NynnahAttorneys Tax Law Services:</strong>
We provide comprehensive tax advisory services including tax planning, compliance, dispute resolution, and representation before tax authorities. Our expertise helps minimize tax liabilities while ensuring full legal compliance.

<strong>💰 Need tax law assistance? Contact NynnahAttorneys at +234 814 007 9115 for expert tax planning, compliance, and dispute resolution services.</strong>`;
    }

    // Immigration Law
    if (lowerMessage.includes('immigration') || lowerMessage.includes('visa') || lowerMessage.includes('passport') || lowerMessage.includes('work permit') || lowerMessage.includes('residence') || lowerMessage.includes('citizenship') || lowerMessage.includes('deportation') || lowerMessage.includes('asylum')) {
        return `<strong>Immigration Law in Nigeria 🛂</strong>

Immigration law governs entry, stay, and status of foreign nationals in Nigeria. Here's what you need to know:

<strong>📋 Types of Visas:</strong>
• Tourist visa (short-term visits)
• Business visa (commercial activities)
• Work visa (employment purposes)
• Student visa (educational institutions)
• Transit visa (passing through Nigeria)
• Diplomatic visa (official duties)

<strong>🏢 Work Permits & Residence:</strong>
• Combined Expatriate Residence Permit and Aliens Card (CERPAC)
• Business permit for foreign investors
• Temporary work permit (TWP)
• Permanent residence applications
• Renewal procedures and requirements
• Quota system for expatriate employment

<strong>🇳🇬 Nigerian Citizenship:</strong>
• Citizenship by birth (Nigerian parents)
• Citizenship by registration (marriage, residence)
• Citizenship by naturalization (long-term residence)
• Dual citizenship provisions
• Certificate of citizenship applications
• Renunciation procedures

<strong>⚖️ Immigration Violations:</strong>
• Overstaying visa terms
• Working without proper permits
• Illegal entry or presence
• Document fraud or forgery
• Deportation proceedings and appeals
• Voluntary departure options

<strong>📄 Required Documentation:</strong>
• Valid passport and visa
• Certificate of occupancy or residence
• Employment authorization documents
• Tax clearance certificates
• Medical examination reports
• Police clearance certificates

<strong>🛡️ Rights and Protections:</strong>
• Due process in immigration proceedings
• Right to legal representation
• Appeal rights for adverse decisions
• Protection from arbitrary detention
• Family unity considerations
• Humanitarian protections

<strong>💼 NynnahAttorneys Immigration Services:</strong>
We assist with visa applications, work permits, residence applications, citizenship matters, and immigration compliance. Our team navigates complex immigration procedures to secure legal status for individuals and businesses.

<strong>🌍 Need immigration assistance? Contact NynnahAttorneys at +234 814 007 9115 for expert immigration law services and visa application support.</strong>`;
    }

    // Services inquiry
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('help with')) {
        return `NynnahAttorneys offers comprehensive legal services across all areas of Nigerian law: ⚖️

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

<strong>⚖️ Litigation & Dispute Resolution:</strong>
• Civil litigation representation
• Commercial dispute resolution
• Alternative dispute resolution (ADR)
• Arbitration and mediation services

<strong>🏠 Property & Real Estate:</strong>
• Property acquisition and sales
• Title verification and registration
• Landlord-tenant disputes
• Real estate development

<strong>👨‍👩‍👧‍👦 Family Law:</strong>
• Divorce and separation
• Child custody and support
• Marriage and prenuptial agreements
• Adoption procedures

<strong>💼 NynnahAttorneys provides expert legal representation across all practice areas with personalized attention to each client's unique needs. Contact us at +234 814 007 9115 for comprehensive legal solutions.</strong>`;
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

    // Comprehensive legal response for any question
    // Analyze the message for legal keywords and provide relevant information
    const legalKeywords = ['law', 'legal', 'court', 'judge', 'lawyer', 'attorney', 'case', 'sue', 'lawsuit', 'rights', 'liability', 'damages', 'compensation', 'justice', 'litigation', 'settlement', 'agreement', 'dispute', 'violation', 'penalty', 'fine', 'regulation', 'compliance', 'statute', 'act', 'bill', 'constitution', 'jurisdiction', 'precedent', 'evidence', 'witness', 'testimony', 'verdict', 'appeal', 'injunction', 'remedy', 'obligation', 'duty', 'breach', 'negligence', 'malpractice', 'fraud', 'defamation', 'harassment', 'discrimination', 'injury', 'accident', 'insurance', 'claim', 'policy', 'procedure', 'process', 'filing', 'petition', 'motion', 'hearing', 'trial', 'arbitration', 'mediation', 'negotiation', 'representation', 'counsel', 'advice', 'consultation', 'opinion', 'analysis', 'review', 'draft', 'document', 'contract', 'agreement', 'license', 'permit', 'registration', 'incorporation', 'partnership', 'company', 'business', 'corporate', 'commercial', 'transaction', 'merger', 'acquisition', 'investment', 'securities', 'banking', 'finance', 'loan', 'mortgage', 'debt', 'bankruptcy', 'insolvency', 'restructuring', 'liquidation', 'winding', 'dissolution', 'probate', 'estate', 'will', 'inheritance', 'succession', 'trust', 'guardian', 'custody', 'adoption', 'divorce', 'separation', 'alimony', 'maintenance', 'support', 'paternity', 'domestic', 'violence', 'restraining', 'protection', 'criminal', 'civil', 'administrative', 'constitutional', 'international', 'human', 'fundamental', 'privacy', 'freedom', 'liberty', 'equality', 'democracy', 'government', 'public', 'private', 'individual', 'collective', 'social', 'economic', 'political', 'cultural', 'religious', 'ethnic', 'gender', 'age', 'disability', 'health', 'safety', 'environment', 'pollution', 'conservation', 'natural', 'resources', 'energy', 'mining', 'oil', 'gas', 'petroleum', 'telecommunications', 'technology', 'internet', 'cyber', 'data', 'information', 'software', 'hardware', 'intellectual', 'copyright', 'trademark', 'patent', 'trade', 'secret', 'competition', 'antitrust', 'monopoly', 'consumer', 'protection', 'product', 'liability', 'warranty', 'guarantee', 'service', 'quality', 'standard', 'certification', 'accreditation', 'licensing', 'professional', 'ethics', 'conduct', 'discipline', 'sanction', 'punishment', 'rehabilitation', 'reform', 'prevention', 'deterrence', 'enforcement', 'investigation', 'prosecution', 'defense', 'plea', 'sentence', 'probation', 'parole', 'prison', 'jail', 'detention', 'arrest', 'search', 'seizure', 'warrant', 'subpoena', 'discovery', 'deposition', 'interrogatory', 'admission', 'confession', 'alibi', 'defense', 'prosecution', 'plaintiff', 'defendant', 'respondent', 'petitioner', 'appellant', 'appellee', 'party', 'third', 'intervenor', 'amicus', 'curiae', 'friend', 'court', 'brief', 'argument', 'oral', 'written', 'submission', 'filing', 'service', 'notice', 'summons', 'complaint', 'answer', 'counterclaim', 'cross', 'claim', 'joinder', 'intervention', 'consolidation', 'severance', 'dismissal', 'summary', 'judgment', 'default', 'consent', 'stipulation', 'settlement', 'compromise', 'release', 'waiver', 'indemnity', 'hold', 'harmless', 'limitation', 'exclusion', 'disclaimer', 'warranty', 'representation', 'covenant', 'condition', 'precedent', 'subsequent', 'concurrent', 'performance', 'breach', 'default', 'cure', 'remedy', 'specific', 'performance', 'injunction', 'restraining', 'order', 'temporary', 'preliminary', 'permanent', 'mandatory', 'prohibitory', 'damages', 'compensatory', 'punitive', 'exemplary', 'nominal', 'liquidated', 'consequential', 'incidental', 'special', 'general', 'mitigation', 'avoidable', 'consequences', 'causation', 'proximate', 'cause', 'foreseeability', 'remoteness', 'intervening', 'superseding', 'contributory', 'comparative', 'negligence', 'assumption', 'risk', 'volenti', 'non', 'fit', 'injuria', 'act', 'god', 'force', 'majeure', 'frustration', 'impossibility', 'impracticability', 'commercial', 'purpose', 'mistake', 'misrepresentation', 'fraud', 'duress', 'undue', 'influence', 'unconscionability', 'illegality', 'public', 'policy', 'morality', 'good', 'faith', 'fair', 'dealing', 'reasonableness', 'standard', 'care', 'duty', 'obligation', 'right', 'privilege', 'immunity', 'power', 'authority', 'jurisdiction', 'venue', 'forum', 'choice', 'applicable', 'conflict', 'laws', 'comity', 'reciprocity', 'recognition', 'enforcement', 'foreign', 'judgment', 'arbitration', 'award', 'mediation', 'conciliation', 'negotiation', 'alternative', 'dispute', 'resolution', 'adr', 'litigation', 'trial', 'jury', 'bench', 'judge', 'magistrate', 'tribunal', 'commission', 'board', 'agency', 'authority', 'regulator', 'supervisor', 'oversight', 'monitoring', 'compliance', 'audit', 'inspection', 'investigation', 'inquiry', 'review', 'assessment', 'evaluation', 'analysis', 'opinion', 'advice', 'guidance', 'recommendation', 'suggestion', 'proposal', 'plan', 'strategy', 'approach', 'method', 'procedure', 'process', 'system', 'framework', 'structure', 'organization', 'institution', 'establishment', 'entity', 'body', 'person', 'individual', 'natural', 'artificial', 'legal', 'juristic', 'corporate', 'partnership', 'association', 'society', 'club', 'union', 'cooperative', 'trust', 'foundation', 'charity', 'non', 'profit', 'organization', 'ngo', 'government', 'state', 'federal', 'local', 'municipal', 'regional', 'national', 'international', 'global', 'universal', 'domestic', 'foreign', 'alien', 'citizen', 'resident', 'domicile', 'nationality', 'citizenship', 'immigration', 'emigration', 'migration', 'refugee', 'asylum', 'deportation', 'extradition', 'repatriation', 'naturalization', 'denaturalization', 'statelessness', 'dual', 'multiple', 'renunciation', 'acquisition', 'loss', 'restoration', 'recognition', 'status', 'capacity', 'competence', 'incapacity', 'incompetence', 'disability', 'minority', 'majority', 'age', 'consent', 'guardian', 'ward', 'curator', 'administrator', 'executor', 'trustee', 'beneficiary', 'heir', 'legatee', 'devisee', 'successor', 'assign', 'transferee', 'grantee', 'licensee', 'lessee', 'tenant', 'occupier', 'user', 'owner', 'proprietor', 'holder', 'possessor', 'custodian', 'bailee', 'bailor', 'agent', 'principal', 'employer', 'employee', 'contractor', 'subcontractor', 'consultant', 'advisor', 'expert', 'witness', 'professional', 'practitioner', 'specialist', 'generalist', 'lawyer', 'attorney', 'counsel', 'advocate', 'barrister', 'solicitor', 'notary', 'commissioner', 'oaths', 'paralegal', 'legal', 'assistant', 'clerk', 'secretary', 'administrator', 'manager', 'director', 'officer', 'executive', 'board', 'member', 'shareholder', 'stakeholder', 'investor', 'creditor', 'debtor', 'obligor', 'obligee', 'promisor', 'promisee', 'grantor', 'grantee', 'lessor', 'lessee', 'licensor', 'licensee', 'franchisor', 'franchisee', 'distributor', 'dealer', 'agent', 'representative', 'broker', 'intermediary', 'facilitator', 'mediator', 'arbitrator', 'conciliator', 'negotiator', 'advocate', 'champion', 'supporter', 'opponent', 'adversary', 'rival', 'competitor', 'collaborator', 'partner', 'ally', 'associate', 'affiliate', 'subsidiary', 'parent', 'holding', 'group', 'conglomerate', 'multinational', 'transnational', 'corporation', 'company', 'firm', 'business', 'enterprise', 'venture', 'startup', 'sme', 'small', 'medium', 'large', 'micro', 'macro', 'public', 'private', 'listed', 'unlisted', 'quoted', 'unquoted', 'incorporated', 'unincorporated', 'limited', 'unlimited', 'liability', 'partnership', 'sole', 'proprietorship', 'joint', 'venture', 'consortium', 'syndicate', 'cartel', 'monopoly', 'oligopoly', 'duopoly', 'competition', 'market', 'industry', 'sector', 'economy', 'trade', 'commerce', 'business', 'commercial', 'mercantile', 'industrial', 'manufacturing', 'production', 'service', 'retail', 'wholesale', 'distribution', 'supply', 'chain', 'logistics', 'transportation', 'shipping', 'delivery', 'import', 'export', 'international', 'trade', 'customs', 'tariff', 'duty', 'tax', 'levy', 'fee', 'charge', 'cost', 'expense', 'price', 'value', 'consideration', 'payment', 'remuneration', 'compensation', 'salary', 'wage', 'bonus', 'commission', 'royalty', 'dividend', 'interest', 'profit', 'loss', 'gain', 'income', 'revenue', 'turnover', 'sales', 'purchase', 'acquisition', 'disposal', 'sale', 'transfer', 'assignment', 'conveyance', 'delivery', 'possession', 'ownership', 'title', 'right', 'interest', 'estate', 'property', 'asset', 'liability', 'debt', 'obligation', 'duty', 'responsibility', 'accountability', 'transparency', 'disclosure', 'reporting', 'filing', 'submission', 'compliance', 'adherence', 'observance', 'performance', 'execution', 'implementation', 'enforcement', 'monitoring', 'supervision', 'oversight', 'governance', 'management', 'administration', 'operation', 'conduct', 'behavior', 'practice', 'procedure', 'protocol', 'guideline', 'standard', 'norm', 'rule', 'regulation', 'law', 'statute', 'act', 'ordinance', 'bylaw', 'code', 'policy', 'directive', 'instruction', 'order', 'command', 'mandate', 'requirement', 'obligation', 'prohibition', 'restriction', 'limitation', 'constraint', 'condition', 'term', 'provision', 'clause', 'section', 'article', 'paragraph', 'subsection', 'subparagraph', 'item', 'point', 'element', 'component', 'part', 'whole', 'entirety', 'totality', 'aggregate', 'sum', 'total', 'amount', 'quantity', 'number', 'figure', 'statistic', 'data', 'information', 'fact', 'evidence', 'proof', 'documentation', 'record', 'file', 'document', 'paper', 'instrument', 'deed', 'certificate', 'license', 'permit', 'authorization', 'approval', 'consent', 'permission', 'clearance', 'exemption', 'waiver', 'exception', 'exclusion', 'inclusion', 'coverage', 'scope', 'extent', 'range', 'limit', 'boundary', 'border', 'frontier', 'threshold', 'minimum', 'maximum', 'optimal', 'ideal', 'perfect', 'best', 'worst', 'good', 'bad', 'right', 'wrong', 'correct', 'incorrect', 'proper', 'improper', 'appropriate', 'inappropriate', 'suitable', 'unsuitable', 'fit', 'unfit', 'qualified', 'unqualified', 'eligible', 'ineligible', 'entitled', 'disentitled', 'authorized', 'unauthorized', 'permitted', 'prohibited', 'allowed', 'disallowed', 'legal', 'illegal', 'lawful', 'unlawful', 'legitimate', 'illegitimate', 'valid', 'invalid', 'effective', 'ineffective', 'enforceable', 'unenforceable', 'binding', 'non', 'binding', 'mandatory', 'optional', 'voluntary', 'involuntary', 'compulsory', 'discretionary', 'automatic', 'manual', 'express', 'implied', 'explicit', 'implicit', 'direct', 'indirect', 'primary', 'secondary', 'principal', 'subsidiary', 'main', 'ancillary', 'central', 'peripheral', 'core', 'marginal', 'essential', 'non', 'essential', 'fundamental', 'superficial', 'basic', 'advanced', 'simple', 'complex', 'easy', 'difficult', 'clear', 'unclear', 'certain', 'uncertain', 'definite', 'indefinite', 'specific', 'general', 'particular', 'universal', 'individual', 'collective', 'personal', 'impersonal', 'subjective', 'objective', 'relative', 'absolute', 'conditional', 'unconditional', 'qualified', 'unqualified', 'limited', 'unlimited', 'restricted', 'unrestricted', 'constrained', 'unconstrained', 'regulated', 'unregulated', 'controlled', 'uncontrolled', 'supervised', 'unsupervised', 'monitored', 'unmonitored', 'observed', 'unobserved', 'watched', 'unwatched', 'guarded', 'unguarded', 'protected', 'unprotected', 'secured', 'unsecured', 'safe', 'unsafe', 'secure', 'insecure', 'stable', 'unstable', 'steady', 'unsteady', 'consistent', 'inconsistent', 'reliable', 'unreliable', 'dependable', 'undependable', 'trustworthy', 'untrustworthy', 'credible', 'incredible', 'believable', 'unbelievable', 'plausible', 'implausible', 'reasonable', 'unreasonable', 'rational', 'irrational', 'logical', 'illogical', 'sensible', 'nonsensical', 'practical', 'impractical', 'realistic', 'unrealistic', 'feasible', 'infeasible', 'possible', 'impossible', 'probable', 'improbable', 'likely', 'unlikely', 'certain', 'uncertain', 'sure', 'unsure', 'confident', 'unconfident', 'assured', 'unassured', 'guaranteed', 'unguaranteed', 'promised', 'unpromised', 'committed', 'uncommitted', 'dedicated', 'undedicated', 'devoted', 'undevoted', 'loyal', 'disloyal', 'faithful', 'unfaithful', 'true', 'false', 'honest', 'dishonest', 'sincere', 'insincere', 'genuine', 'fake', 'authentic', 'inauthentic', 'real', 'unreal', 'actual', 'virtual', 'concrete', 'abstract', 'tangible', 'intangible', 'physical', 'mental', 'material', 'immaterial', 'substantial', 'insubstantial', 'solid', 'liquid', 'gas', 'plasma', 'matter', 'energy', 'force', 'power', 'strength', 'weakness', 'ability', 'inability', 'capacity', 'incapacity', 'capability', 'incapability', 'competence', 'incompetence', 'skill', 'unskill', 'talent', 'untalent', 'gift', 'curse', 'blessing', 'misfortune', 'luck', 'unluck', 'fortune', 'misfortune', 'success', 'failure', 'achievement', 'underachievement', 'accomplishment', 'disappointment', 'satisfaction', 'dissatisfaction', 'happiness', 'unhappiness', 'joy', 'sorrow', 'pleasure', 'pain', 'comfort', 'discomfort', 'ease', 'difficulty', 'convenience', 'inconvenience', 'advantage', 'disadvantage', 'benefit', 'detriment', 'gain', 'loss', 'profit', 'loss', 'win', 'lose', 'victory', 'defeat', 'triumph', 'failure', 'conquest', 'surrender', 'domination', 'submission', 'control', 'chaos', 'order', 'disorder', 'organization', 'disorganization', 'structure', 'unstructure', 'system', 'nonsystem', 'method', 'madness', 'plan', 'spontaneity', 'design', 'accident', 'intention', 'unintention', 'purpose', 'purposelessness', 'goal', 'aimlessness', 'objective', 'subjectivity', 'target', 'miss', 'aim', 'stray', 'focus', 'unfocus', 'concentration', 'distraction', 'attention', 'inattention', 'awareness', 'unawareness', 'consciousness', 'unconsciousness', 'knowledge', 'ignorance', 'understanding', 'misunderstanding', 'comprehension', 'incomprehension', 'wisdom', 'foolishness', 'intelligence', 'stupidity', 'smartness', 'dumbness', 'cleverness', 'clumsiness', 'skill', 'clumsiness', 'expertise', 'inexpertise', 'experience', 'inexperience', 'maturity', 'immaturity', 'development', 'underdevelopment', 'growth', 'stagnation', 'progress', 'regress', 'advancement', 'retreat', 'improvement', 'deterioration', 'enhancement', 'degradation', 'upgrade', 'downgrade', 'promotion', 'demotion', 'elevation', 'reduction', 'increase', 'decrease', 'expansion', 'contraction', 'extension', 'shortening', 'lengthening', 'shortening', 'widening', 'narrowing', 'broadening', 'narrowing', 'deepening', 'shallowing', 'heightening', 'lowering', 'raising', 'lowering', 'lifting', 'dropping', 'rising', 'falling', 'ascending', 'descending', 'climbing', 'descending', 'mounting', 'dismounting', 'boarding', 'alighting', 'embarking', 'disembarking', 'entering', 'exiting', 'arriving', 'departing', 'coming', 'going', 'approaching', 'receding', 'advancing', 'retreating', 'moving', 'stationary', 'dynamic', 'static', 'active', 'passive', 'energetic', 'lethargic', 'vigorous', 'weak', 'strong', 'feeble', 'powerful', 'powerless', 'mighty', 'meek', 'dominant', 'submissive', 'aggressive', 'peaceful', 'violent', 'nonviolent', 'hostile', 'friendly', 'enemy', 'friend', 'foe', 'ally', 'opponent', 'supporter', 'adversary', 'advocate', 'critic', 'supporter', 'detractor', 'fan', 'hater', 'lover', 'hater', 'admirer', 'despiser', 'respecter', 'disrespecter', 'honorer', 'dishonorer', 'praiser', 'criticizer', 'complimenter', 'insulter', 'flatterer', 'offender', 'pleaser', 'annoyer', 'satisfier', 'dissatisfier', 'helper', 'hinderer', 'assistant', 'obstructor', 'facilitator', 'impediment', 'enabler', 'disabler', 'supporter', 'underminer', 'backer', 'saboteur', 'sponsor', 'opponent', 'patron', 'enemy', 'benefactor', 'malefactor', 'donor', 'taker', 'giver', 'receiver', 'provider', 'consumer', 'supplier', 'demander', 'seller', 'buyer', 'vendor', 'purchaser', 'merchant', 'customer', 'trader', 'client', 'dealer', 'patron', 'broker', 'agent', 'intermediary', 'middleman', 'facilitator', 'mediator', 'arbitrator', 'judge', 'jury', 'witness', 'party', 'litigant', 'plaintiff', 'defendant', 'prosecutor', 'defense', 'counsel', 'attorney', 'lawyer', 'advocate', 'representative', 'agent', 'proxy', 'delegate', 'ambassador', 'envoy', 'emissary', 'messenger', 'courier', 'carrier', 'bearer', 'holder', 'keeper', 'guardian', 'protector', 'defender', 'champion', 'hero', 'villain', 'protagonist', 'antagonist', 'character', 'person', 'individual', 'human', 'being', 'entity', 'creature', 'organism', 'life', 'death', 'birth', 'end', 'beginning', 'start', 'finish', 'completion', 'incompletion', 'perfection', 'imperfection', 'wholeness', 'brokenness', 'unity', 'division', 'harmony', 'discord', 'peace', 'war', 'conflict', 'resolution', 'problem', 'solution', 'question', 'answer', 'inquiry', 'response', 'request', 'reply', 'demand', 'supply', 'need', 'want', 'desire', 'aversion', 'attraction', 'repulsion', 'love', 'hate', 'like', 'dislike', 'preference', 'rejection', 'acceptance', 'denial', 'approval', 'disapproval', 'consent', 'refusal', 'agreement', 'disagreement', 'accord', 'discord', 'harmony', 'conflict', 'cooperation', 'competition', 'collaboration', 'rivalry', 'partnership', 'opposition', 'alliance', 'enmity', 'friendship', 'hostility', 'amity', 'animosity', 'goodwill', 'ill', 'will', 'benevolence', 'malevolence', 'kindness', 'cruelty', 'compassion', 'indifference', 'empathy', 'apathy', 'sympathy', 'antipathy', 'understanding', 'misunderstanding', 'tolerance', 'intolerance', 'patience', 'impatience', 'forgiveness', 'revenge', 'mercy', 'justice', 'fairness', 'unfairness', 'equality', 'inequality', 'equity', 'inequity', 'balance', 'imbalance', 'proportion', 'disproportion', 'symmetry', 'asymmetry', 'order', 'disorder', 'organization', 'chaos', 'structure', 'confusion', 'clarity', 'obscurity', 'transparency', 'opacity', 'openness', 'secrecy', 'honesty', 'deception', 'truth', 'lie', 'fact', 'fiction', 'reality', 'fantasy', 'actuality', 'imagination', 'existence', 'nonexistence', 'presence', 'absence', 'availability', 'unavailability', 'accessibility', 'inaccessibility', 'reachability', 'unreachability', 'attainability', 'unattainability', 'achievability', 'unachievability', 'possibility', 'impossibility', 'probability', 'improbability', 'certainty', 'uncertainty', 'surety', 'doubt', 'confidence', 'insecurity', 'assurance', 'anxiety', 'calmness', 'agitation', 'serenity', 'turbulence', 'tranquility', 'chaos', 'stillness', 'motion', 'rest', 'activity', 'inactivity', 'action', 'inaction', 'movement', 'stillness', 'change', 'constancy', 'variation', 'uniformity', 'diversity', 'similarity', 'difference', 'sameness', 'uniqueness', 'commonality', 'specialty', 'generality', 'particularity', 'universality', 'individuality', 'collectivity', 'singularity', 'plurality', 'unity', 'multiplicity', 'oneness', 'manyness', 'wholeness', 'fragmentation', 'completeness', 'incompleteness', 'totality', 'partiality', 'entirety', 'portion', 'all', 'some', 'everything', 'something', 'nothing', 'anything', 'everyone', 'someone', 'no', 'one', 'anyone', 'everybody', 'somebody', 'nobody', 'anybody', 'wherever', 'somewhere', 'nowhere', 'anywhere', 'whenever', 'sometime', 'never', 'anytime', 'however', 'somehow', 'nohow', 'anyhow', 'whatever', 'something', 'nothing', 'anything', 'whichever', 'some', 'none', 'any', 'whoever', 'someone', 'no', 'one', 'anyone', 'why', 'because', 'since', 'as', 'for', 'due', 'to', 'owing', 'to', 'thanks', 'to', 'on', 'account', 'of', 'by', 'reason', 'of', 'by', 'virtue', 'of', 'in', 'view', 'of', 'in', 'light', 'of', 'considering', 'given', 'seeing', 'that', 'inasmuch', 'as', 'insofar', 'as', 'to', 'the', 'extent', 'that', 'in', 'that', 'whereas', 'while', 'although', 'though', 'even', 'though', 'even', 'if', 'despite', 'in', 'spite', 'of', 'notwithstanding', 'regardless', 'of', 'irrespective', 'of', 'without', 'regard', 'to', 'apart', 'from', 'aside', 'from', 'except', 'for', 'save', 'for', 'but', 'for', 'other', 'than', 'rather', 'than', 'instead', 'of', 'in', 'place', 'of', 'in', 'lieu', 'of', 'as', 'opposed', 'to', 'as', 'against', 'versus', 'vis', 'a', 'vis', 'compared', 'to', 'compared', 'with', 'in', 'comparison', 'to', 'in', 'comparison', 'with', 'relative', 'to', 'with', 'respect', 'to', 'with', 'regard', 'to', 'with', 'reference', 'to', 'in', 'relation', 'to', 'in', 'connection', 'with', 'in', 'association', 'with', 'together', 'with', 'along', 'with', 'as', 'well', 'as', 'in', 'addition', 'to', 'besides', 'furthermore', 'moreover', 'what', 'is', 'more', 'on', 'top', 'of', 'that', 'not', 'to', 'mention', 'let', 'alone', 'much', 'less', 'still', 'less', 'even', 'less', 'all', 'the', 'more', 'so', 'much', 'the', 'more', 'a', 'fortiori', 'how', 'much', 'more', 'how', 'much', 'less', 'if', 'anything', 'on', 'the', 'contrary', 'quite', 'the', 'opposite', 'quite', 'the', 'reverse', 'far', 'from', 'it', 'nothing', 'of', 'the', 'sort', 'nothing', 'of', 'the', 'kind', 'by', 'no', 'means', 'not', 'at', 'all', 'not', 'in', 'the', 'least', 'not', 'in', 'the', 'slightest', 'certainly', 'not', 'definitely', 'not', 'absolutely', 'not', 'positively', 'not', 'emphatically', 'not', 'categorically', 'not', 'unequivocally', 'not', 'unambiguously', 'not', 'undoubtedly', 'not', 'undeniably', 'not', 'indubitably', 'not', 'incontrovertibly', 'not', 'irrefutably', 'not', 'beyond', 'doubt', 'beyond', 'question', 'without', 'doubt', 'without', 'question', 'no', 'doubt', 'no', 'question', 'for', 'sure', 'for', 'certain', 'certainly', 'surely', 'definitely', 'absolutely', 'positively', 'emphatically', 'categorically', 'unequivocally', 'unambiguously', 'undoubtedly', 'undeniably', 'indubitably', 'incontrovertibly', 'irrefutably', 'of', 'course', 'naturally', 'obviously', 'clearly', 'evidently', 'apparently', 'seemingly', 'presumably', 'supposedly', 'allegedly', 'reportedly', 'purportedly', 'ostensibly', 'on', 'the', 'face', 'of', 'it', 'at', 'first', 'sight', 'at', 'first', 'glance', 'prima', 'facie', 'on', 'the', 'surface', 'superficially', 'outwardly', 'externally', 'visibly', 'manifestly', 'patently', 'blatantly', 'flagrantly', 'glaringly', 'conspicuously', 'noticeably', 'perceptibly', 'discernibly', 'detectably', 'observably', 'recognizably', 'identifiably', 'distinguishably', 'unmistakably', 'unquestionably', 'indisputably', 'incontestably', 'inarguably', 'unarguably', 'undebatably', 'self', 'evidently', 'axiomatically', 'truistically', 'tautologically', 'necessarily', 'inevitably', 'unavoidably', 'inescapably', 'inexorably', 'relentlessly', 'remorselessly', 'ruthlessly', 'mercilessly', 'pitilessly', 'heartlessly', 'callously', 'coldly', 'cruelly', 'harshly', 'severely', 'strictly', 'rigorously', 'stringently', 'sternly', 'firmly', 'resolutely', 'determinedly', 'decisively', 'definitively', 'conclusively', 'finally', 'ultimately', 'eventually', 'in', 'the', 'end', 'at', 'the', 'end', 'of', 'the', 'day', 'when', 'all', 'is', 'said', 'and', 'done', 'at', 'the', 'end', 'of', 'the', 'day', 'in', 'the', 'final', 'analysis', 'in', 'the', 'last', 'analysis', 'when', 'push', 'comes', 'to', 'shove', 'when', 'the', 'chips', 'are', 'down', 'in', 'a', 'pinch', 'if', 'need', 'be', 'if', 'necessary', 'if', 'required', 'as', 'needed', 'as', 'required', 'as', 'necessary', 'when', 'needed', 'when', 'required', 'when', 'necessary', 'where', 'needed', 'where', 'required', 'where', 'necessary', 'how', 'needed', 'how', 'required', 'how', 'necessary', 'what', 'needed', 'what', 'required', 'what', 'necessary', 'which', 'needed', 'which', 'required', 'which', 'necessary', 'who', 'needed', 'who', 'required', 'who', 'necessary', 'whose', 'needed', 'whose', 'required', 'whose', 'necessary', 'whom', 'needed', 'whom', 'required', 'whom', 'necessary'];

    const hasLegalKeywords = legalKeywords.some(keyword => lowerMessage.includes(keyword));

    if (hasLegalKeywords || lowerMessage.length > 10) {
        return `<strong>Legal Information & Guidance ⚖️</strong>

Thank you for your legal inquiry. While I can provide general legal information, every legal situation is unique and requires professional analysis.

<strong>🎯 General Legal Guidance:</strong>
Based on your question, here are some key points to consider:

• <strong>Legal Rights:</strong> Every individual and business has fundamental legal rights that must be protected
• <strong>Due Process:</strong> All legal matters must follow proper procedures and timelines
• <strong>Documentation:</strong> Proper legal documentation is essential for protecting your interests
• <strong>Professional Advice:</strong> Complex legal matters require expert legal counsel
• <strong>Timely Action:</strong> Many legal issues have strict time limits that must be observed

<strong>📋 Common Legal Areas We Handle:</strong>
• <strong>Business Law:</strong> Company formation, contracts, compliance, disputes
• <strong>Technology Law:</strong> Data protection, software licensing, cybersecurity
• <strong>Property Law:</strong> Real estate transactions, landlord-tenant issues, title matters
• <strong>Family Law:</strong> Divorce, custody, marriage, adoption procedures
• <strong>Criminal Law:</strong> Defense representation, bail applications, appeals
• <strong>Employment Law:</strong> Workplace rights, wrongful termination, contracts
• <strong>Tax Law:</strong> Compliance, disputes, planning, representation
• <strong>Immigration Law:</strong> Visas, work permits, citizenship, deportation defense
• <strong>Intellectual Property:</strong> Copyrights, trademarks, patents, licensing

<strong>⚖️ Why Professional Legal Advice Matters:</strong>
• Laws are complex and constantly changing
• Each case has unique circumstances
• Proper legal strategy can save time and money
• Professional representation protects your rights
• Expert guidance prevents costly mistakes

<strong>🚨 Immediate Legal Concerns?</strong>
If you're facing urgent legal issues such as:
• Criminal charges or arrest
• Court deadlines or summons
• Business disputes or threats
• Property disputes or eviction
• Family emergencies or custody issues

<strong>📞 Contact NynnahAttorneys immediately at +234 814 007 9115 for urgent legal assistance.</strong>

<strong>💼 Why Choose NynnahAttorneys?</strong>
• Comprehensive legal expertise across all practice areas
• Experienced team with deep knowledge of Nigerian law
• Personalized attention to each client's unique needs
• Proven track record of successful case outcomes
• Technology-focused approach for modern legal challenges
• Transparent communication and competitive pricing

<strong>🤝 Ready to Get Professional Legal Help?</strong>
Don't let legal issues overwhelm you. NynnahAttorneys provides expert legal representation and guidance to protect your rights and interests.

<strong>📞 Contact NynnahAttorneys today at +234 814 007 9115 or email nynnahattorneys@gmail.com for comprehensive legal solutions tailored to your specific needs.</strong>`;
    }

    // Default response for non-legal questions
    return `Thank you for your message! 🙏

I'm NynnahAttorneys' Legal Assistant, specialized in providing legal information and guidance. I notice your question might not be legal in nature, but I'm here to help with any legal matters you may have.

<strong>🔧 Legal Areas I Can Help With:</strong>
• Business registration and corporate law
• Technology law and data protection
• Contract drafting and review
• Property and real estate law
• Family law and divorce matters
• Criminal law and defense
• Employment and labor law
• Tax law and compliance
• Immigration and visa matters
• Intellectual property protection

<strong>💬 Try asking legal questions like:</strong>
• "How do I register my business in Nigeria?"
• "What are my rights if I'm arrested?"
• "How do I get a divorce?"
• "What should be in my employment contract?"
• "How do I protect my intellectual property?"
• "What are the tax requirements for my business?"

<strong>📞 For Any Legal Matter:</strong>
Whether it's a simple legal question or complex legal representation, NynnahAttorneys is here to help.

<strong>🤝 Contact NynnahAttorneys at +234 814 007 9115 or nynnahattorneys@gmail.com for expert legal assistance and professional representation across all areas of Nigerian law.</strong>

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
