/**
 * LUMIXSA AI ASSISTANT
 * Fresh Build - Visible on All Pages
 */

(function() {
  'use strict';

  // ============================================
  // AI KNOWLEDGE BASE
  // ============================================
  const Knowledge = {
    owner: {
      name: 'Dilshad Ahmad',
      role: 'Manager of Lumixsa AI',
      experience: '10+ years developer'
    },
    platform: {
      name: 'Lumixsa AI',
      services: ['AI Tools', 'Online Utilities', 'Blog Content', 'Global Support']
    },
    tools: [
      'Password Generator',
      'QR Code Generator',
      'Fake Data Generator',
      'AI Caption Generator',
      'Meme Generator',
      'Code Explainer',
      'Startup Name Generator',
      'Habit Tracker',
      'Chat with PDF',
      'Explain Like I\'m 10'
    ],
    contact: {
      email: 'lumixsasupport@gmail.com',
      phone: '03904563345'
    },

    // Main response function - ALWAYS returns something
    getResponse(input) {
      const q = (input || '').toLowerCase().trim();
      
      // Empty input
      if (!q) {
        return 'Hello! How can I help you today?';
      }
      
      // Greetings
      if (/^(hi|hello|hey|good|greetings|howdy|hola)/.test(q)) {
        return 'Hello! Welcome to Lumixsa AI. I can help you with information about our tools, owner, or contact details. What would you like to know?';
      }
      
      // Owner questions
      if (/(dilshad|ahmad|owner|founder|manager|who made|who created|who is the)/.test(q)) {
        return `👤 **Dilshad Ahmad** is the Manager of Lumixsa AI with **10+ years** of development experience. He founded this platform to provide AI tools and resources globally.`;
      }
      
      // Platform/Website info
      if (/(what is|about|tell me about) lumixsa|platform|website|what do you|services/.test(q)) {
        return `🌐 **Lumixsa AI** provides:
• AI Tools for productivity
• Online Utilities for daily tasks
• Blog Content for learning
• Global Support for users worldwide

All services are designed to be accessible and user-friendly!`;
      }
      
      // Tools list
      if (/(all tools|list tools|what tools|tools|available tools|show tools)/.test(q)) {
        return `🛠️ **Our 10 AI Tools:**
1. Password Generator
2. QR Code Generator
3. Fake Data Generator
4. AI Caption Generator
5. Meme Generator
6. Code Explainer
7. Startup Name Generator
8. Habit Tracker
9. Chat with PDF
10. Explain Like I'm 10

All tools are FREE to use!`;
      }
      
      // Specific tool
      for (const tool of this.tools) {
        if (q.includes(tool.toLowerCase().split(' ')[0])) {
          return `✅ **${tool}** is available on our platform! Visit the Tools page to use it for free.`;
        }
      }
      
      // Contact info
      if (/(contact|email|phone|reach|support|help|call)/.test(q)) {
        return `📞 **Contact Lumixsa AI:**
📧 Email: lumixsasupport@gmail.com
📱 Phone: 03904563345
👤 Manager: Dilshad Ahmad

We're here to help!`;
      }
      
      // Thank you
      if (/(thank|thanks|thx|appreciate)/.test(q)) {
        return 'You\'re welcome! 😊 Is there anything else I can help you with?';
      }
      
      // Help
      if (/(help|what can you|assist|how do you work)/.test(q)) {
        return `I can help you with:
• Information about Lumixsa AI
• Details about our 10 AI tools
• Contact information
• Owner details (Dilshad Ahmad)

Just ask me anything!`;
      }
      
      // Default response
      return `I understand you're asking about "${input}". I can help with:
• Lumixsa AI platform info
• Our 10 AI tools
• Contact details
• Owner information

Try asking: "What tools do you have?" or "Who is Dilshad Ahmad?"`;
    }
  };

  // ============================================
  // AI CHAT SYSTEM
  // ============================================
  const AI = {
    elements: {},
    synth: null,
    voiceOn: true,
    
    // Initialize
    init() {
      console.log('AI: Initializing...');
      
      // Get elements
      this.elements = {
        container: document.getElementById('ai-chat-container'),
        messages: document.getElementById('ai-chat-messages'),
        input: document.getElementById('ai-chat-input'),
        sendBtn: document.getElementById('ai-chat-send'),
        voiceBtn: document.getElementById('ai-chat-voice')
      };
      
      // Check if elements exist
      if (!this.elements.container) {
        console.log('AI: Container not found on this page');
        return;
      }
      
      // Initialize voice
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
      
      // Bind events
      this.bindEvents();
      
      // Show welcome
      this.addBotMessage('Hello! 👋 I\'m your Lumixsa AI Assistant. Ask me about our tools, services, or contact info!');
      
      console.log('AI: Ready!');
    },
    
    // Bind events
    bindEvents() {
      const { sendBtn, input, voiceBtn } = this.elements;
      
      // Send button
      if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.sendMessage();
        });
      }
      
      // Enter key
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });
      }
      
      // Voice toggle
      if (voiceBtn) {
        voiceBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleVoice();
        });
      }
    },
    
    // Send message
    sendMessage() {
      const text = this.elements.input?.value?.trim();
      if (!text) return;
      
      // Add user message
      this.addUserMessage(text);
      
      // Clear input
      this.elements.input.value = '';
      
      // Show typing
      this.showTyping();
      
      // Get response after delay
      setTimeout(() => {
        this.hideTyping();
        const response = Knowledge.getResponse(text);
        this.addBotMessage(response);
        this.speak(response);
      }, 400);
    },
    
    // Add user message (right side)
    addUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'ai-msg user';
      msg.innerHTML = `<div class="ai-msg-bubble user">${this.escape(text)}</div>`;
      this.elements.messages.appendChild(msg);
      this.scrollDown();
    },
    
    // Add bot message (left side)
    addBotMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'ai-msg bot';
      msg.innerHTML = `<div class="ai-msg-avatar">🤖</div><div class="ai-msg-bubble bot">${this.format(text)}</div>`;
      this.elements.messages.appendChild(msg);
      this.scrollDown();
    },
    
    // Show typing indicator
    showTyping() {
      const typing = document.createElement('div');
      typing.id = 'ai-typing-indicator';
      typing.className = 'ai-msg bot typing';
      typing.innerHTML = `<div class="ai-msg-avatar">🤖</div><div class="ai-msg-bubble bot"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
      this.elements.messages.appendChild(typing);
      this.scrollDown();
    },
    
    // Hide typing indicator
    hideTyping() {
      const typing = document.getElementById('ai-typing-indicator');
      if (typing) typing.remove();
    },
    
    // Scroll to bottom
    scrollDown() {
      if (this.elements.messages) {
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
      }
    },
    
    // Toggle voice
    toggleVoice() {
      this.voiceOn = !this.voiceOn;
      const btn = this.elements.voiceBtn;
      
      if (btn) {
        btn.textContent = this.voiceOn ? '🔊' : '🔇';
        btn.title = this.voiceOn ? 'Click to mute' : 'Click to unmute';
      }
      
      if (!this.voiceOn && this.synth) {
        this.synth.cancel();
      }
    },
    
    // Speak text
    speak(text) {
      if (!this.synth || !this.voiceOn) return;
      
      // Stop previous
      this.synth.cancel();
      
      // Clean text (remove markdown/emojis)
      const clean = text
        .replace(/\*\*/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[•📝🛠️📞👤🌐✅👋😊]/g, '');
      
      // Speak
      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 1;
      utter.pitch = 1;
      
      const voices = this.synth.getVoices();
      const voice = voices.find(v => v.lang.includes('en')) || voices[0];
      if (voice) utter.voice = voice;
      
      this.synth.speak(utter);
    },
    
    // Escape HTML
    escape(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },
    
    // Format text (markdown-like)
    format(text) {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '• ');
    }
  };

  // ============================================
  // INITIALIZE ON DOM READY
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AI.init());
  } else {
    AI.init();
  }

})();
