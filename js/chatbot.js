/* ============================================
   Lumixsa AI - Chatbot with Text-to-Speech
   ============================================ */

(function() {
    'use strict';

    // Chatbot Knowledge Base
    const knowledgeBase = {
        greetings: ['hello', 'hi', 'hey', 'greetings', 'howdy'],
        about: {
            keywords: ['about', 'what is lumixsa', 'lumixsa ai', 'who are you', 'company'],
            response: `Lumixsa AI is a cutting-edge platform offering AI-powered tools and resources. Founded by Dilshad Ahmad, a developer with 10+ years of experience, we provide innovative solutions including AI tools, financial insights, and productivity utilities. Our mission is to make advanced technology accessible to everyone.`
        },
        tools: {
            keywords: ['tools', 'features', 'what can you do', 'services', 'products'],
            response: `We offer 10 powerful AI tools: 1) Explain Like I'm 10, 2) Startup Name Generator, 3) Habit Tracker, 4) Fake Data Generator, 5) AI Caption Generator, 6) Meme Generator, 7) Chat with PDF, 8) Code Explainer, 9) Password Generator, and 10) QR Code Generator. Visit our Tools page to explore them all!`
        },
        blog: {
            keywords: ['blog', 'articles', 'content', 'read', 'news'],
            response: `Our blog features in-depth articles on Loans, Credit Cards, and Finance topics for USA, UK, and Canada. We cover personal loans, business loans, credit scores, travel cards, and rewards programs. All content is SEO-optimized and regularly updated.`
        },
        contact: {
            keywords: ['contact', 'email', 'phone', 'reach', 'support', 'help'],
            response: `You can reach Dilshad Ahmad at lumixsasupport@gmail.com or call 03904563345. Visit our Contact page for the contact form and more details. We're here to help!`
        },
        owner: {
            keywords: ['dilshad', 'owner', 'founder', 'manager', 'who created'],
            response: `Dilshad Ahmad is the Manager and Founder of Lumixsa AI. With over 10 years of development experience, he leads our mission to provide innovative AI tools and financial insights to users worldwide.`
        },
        privacy: {
            keywords: ['privacy', 'data', 'security', 'policy', 'safe'],
            response: `We take your privacy seriously. Visit our Privacy Policy page for detailed information about how we collect, use, and protect your data. We never share your personal information with third parties without consent.`
        },
        pricing: {
            keywords: ['price', 'cost', 'free', 'payment', 'subscription', 'plan'],
            response: `Most of our tools are completely free to use! We believe in making AI technology accessible to everyone. Some advanced features may require registration, but our core tools remain free.`
        },
        default: `I'm Lumixsa AI Assistant. I can help you learn about our tools, blog articles, contact information, and more. What would you like to know? You can also enable voice responses by clicking the speaker icon!`
    };

    // DOM Elements
    let chatbotToggle, chatbotContainer, chatbotClose, chatbotMessages, 
        chatbotInput, chatbotSend, chatbotVoiceToggle;
    let isOpen = false;
    let isVoiceEnabled = false;
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;

    // Initialize chatbot
    function init() {
        createChatbotHTML();
        getElements();
        bindEvents();
        addMessage('bot', knowledgeBase.default);
    }

    // Create chatbot HTML
    function createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-toggle" id="chatbotToggle" aria-label="Open chat">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
            </div>
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div class="chatbot-title">
                        <div class="chatbot-avatar">AI</div>
                        <div>
                            <h4>Lumixsa Assistant</h4>
                            <span class="chatbot-status">Online</span>
                        </div>
                    </div>
                    <div class="chatbot-actions">
                        <button class="chatbot-voice-toggle" id="chatbotVoiceToggle" title="Toggle voice">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                        </button>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="chatbot-messages" id="chatbotMessages"></div>
                <div class="chatbot-input-container">
                    <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
                    <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"/>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        const chatbotWrapper = document.createElement('div');
        chatbotWrapper.className = 'chatbot-wrapper';
        chatbotWrapper.innerHTML = chatbotHTML;
        document.body.appendChild(chatbotWrapper);

        // Add chatbot styles
        addChatbotStyles();
    }

    // Add chatbot CSS
    function addChatbotStyles() {
        const styles = `
            .chatbot-wrapper {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: var(--font-family);
            }
            .chatbot-toggle {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: var(--gradient-primary);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: var(--shadow-lg), var(--shadow-glow);
                transition: all var(--transition-base);
            }
            .chatbot-toggle:hover {
                transform: scale(1.1);
            }
            .chatbot-container {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                height: 500px;
                background: var(--surface);
                border-radius: var(--radius-xl);
                border: 1px solid var(--border);
                box-shadow: var(--shadow-xl);
                display: flex;
                flex-direction: column;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px) scale(0.95);
                transition: all var(--transition-base);
            }
            .chatbot-container.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0) scale(1);
            }
            .chatbot-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--spacing-md) var(--spacing-lg);
                border-bottom: 1px solid var(--border);
                background: rgba(99, 102, 241, 0.1);
                border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            }
            .chatbot-title {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
            }
            .chatbot-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--gradient-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: var(--font-size-sm);
                color: white;
            }
            .chatbot-title h4 {
                font-size: var(--font-size-base);
                margin: 0;
            }
            .chatbot-status {
                font-size: var(--font-size-xs);
                color: var(--success);
            }
            .chatbot-status::before {
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                background: var(--success);
                border-radius: 50%;
                margin-right: 4px;
            }
            .chatbot-actions {
                display: flex;
                gap: var(--spacing-sm);
            }
            .chatbot-actions button {
                width: 32px;
                height: 32px;
                border-radius: var(--radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-secondary);
                transition: all var(--transition-fast);
            }
            .chatbot-actions button:hover {
                background: var(--surface-light);
                color: var(--text-primary);
            }
            .chatbot-voice-toggle.active {
                color: var(--primary);
                background: rgba(99, 102, 241, 0.2);
            }
            .chatbot-messages {
                flex: 1;
                overflow-y: auto;
                padding: var(--spacing-lg);
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
            }
            .chatbot-message {
                max-width: 85%;
                padding: var(--spacing-md) var(--spacing-lg);
                border-radius: var(--radius-lg);
                font-size: var(--font-size-sm);
                line-height: 1.5;
                animation: fadeInUp 0.3s ease;
            }
            .chatbot-message.user {
                align-self: flex-end;
                background: var(--gradient-primary);
                color: white;
                border-bottom-right-radius: var(--radius-sm);
            }
            .chatbot-message.bot {
                align-self: flex-start;
                background: var(--surface-light);
                color: var(--text-primary);
                border-bottom-left-radius: var(--radius-sm);
            }
            .chatbot-input-container {
                display: flex;
                gap: var(--spacing-sm);
                padding: var(--spacing-md) var(--spacing-lg);
                border-top: 1px solid var(--border);
            }
            .chatbot-input {
                flex: 1;
                padding: var(--spacing-md);
                background: var(--background);
                border: 1px solid var(--border);
                border-radius: var(--radius-lg);
                color: var(--text-primary);
                font-size: var(--font-size-sm);
            }
            .chatbot-input:focus {
                outline: none;
                border-color: var(--primary);
            }
            .chatbot-send {
                width: 44px;
                height: 44px;
                border-radius: var(--radius-lg);
                background: var(--gradient-primary);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all var(--transition-fast);
            }
            .chatbot-send:hover {
                transform: scale(1.05);
                box-shadow: var(--shadow-glow);
            }
            @media (max-width: 480px) {
                .chatbot-wrapper {
                    bottom: 10px;
                    right: 10px;
                }
                .chatbot-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 0;
                    z-index: 10000;
                }
                .chatbot-header {
                    border-radius: 0;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Get DOM elements
    function getElements() {
        chatbotToggle = document.getElementById('chatbotToggle');
        chatbotContainer = document.getElementById('chatbotContainer');
        chatbotClose = document.getElementById('chatbotClose');
        chatbotMessages = document.getElementById('chatbotMessages');
        chatbotInput = document.getElementById('chatbotInput');
        chatbotSend = document.getElementById('chatbotSend');
        chatbotVoiceToggle = document.getElementById('chatbotVoiceToggle');
    }

    // Bind events
    function bindEvents() {
        chatbotToggle.addEventListener('click', toggleChatbot);
        chatbotClose.addEventListener('click', toggleChatbot);
        chatbotSend.addEventListener('click', sendMessage);
        chatbotVoiceToggle.addEventListener('click', toggleVoice);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Toggle chatbot visibility
    function toggleChatbot() {
        isOpen = !isOpen;
        chatbotContainer.classList.toggle('active', isOpen);
        if (isOpen) {
            chatbotInput.focus();
        }
    }

    // Toggle voice
    function toggleVoice() {
        isVoiceEnabled = !isVoiceEnabled;
        chatbotVoiceToggle.classList.toggle('active', isVoiceEnabled);
        
        if (!isVoiceEnabled && speechSynthesis) {
            speechSynthesis.cancel();
        }
    }

    // Add message to chat
    function addMessage(type, text) {
        const message = document.createElement('div');
        message.className = `chatbot-message ${type}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Speak if voice is enabled and it's a bot message
        if (type === 'bot' && isVoiceEnabled) {
            speak(text);
        }
    }

    // Text to Speech
    function speak(text) {
        if (!speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Try to find a good voice
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google')) || 
                               voices.find(v => v.lang.startsWith('en')) || 
                               voices[0];
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        currentUtterance = utterance;
        speechSynthesis.speak(utterance);
    }

    // Send message
    function sendMessage() {
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage('user', text);
        chatbotInput.value = '';

        // Get response
        const response = getResponse(text);
        
        // Simulate typing delay
        setTimeout(() => {
            addMessage('bot', response);
        }, 500);
    }

    // Get response based on input
    function getResponse(input) {
        const lowerInput = input.toLowerCase();

        // Check greetings
        if (knowledgeBase.greetings.some(g => lowerInput.includes(g))) {
            return `Hello! Welcome to Lumixsa AI. How can I assist you today?`;
        }

        // Check knowledge base
        for (const key in knowledgeBase) {
            if (key === 'greetings' || key === 'default') continue;
            const item = knowledgeBase[key];
            if (item.keywords && item.keywords.some(k => lowerInput.includes(k))) {
                return item.response;
            }
        }

        // Check for specific page mentions
        if (lowerInput.includes('tool') && lowerInput.includes('explain')) {
            return `The "Explain Like I'm 10" tool simplifies complex topics into easy-to-understand explanations. Perfect for learning new concepts quickly!`;
        }

        if (lowerInput.includes('password')) {
            return `Our Password Generator creates strong, secure passwords with customizable length and character types. Keep your accounts safe!`;
        }

        if (lowerInput.includes('qr') || lowerInput.includes('code')) {
            return `The QR Code Generator lets you create QR codes for URLs, text, contact info, and more. Try it out on our Tools page!`;
        }

        if (lowerInput.includes('loan')) {
            return `We have comprehensive articles about personal loans, business loans, and loan strategies. Check our Blog section for detailed guides!`;
        }

        if (lowerInput.includes('credit card')) {
            return `Our blog covers everything about credit cards - from choosing the right one to maximizing rewards. Visit our Blog page to learn more!`;
        }

        // Default response
        return knowledgeBase.default;
    }

    // Load voices when available
    if (speechSynthesis) {
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
