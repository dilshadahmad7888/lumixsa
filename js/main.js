/**
 * LUMIXSA AI - MAIN JAVASCRIPT
 * Production-Level JS with Theme System, Chatbot, and Animations
 */

// ============================================
// THEME SYSTEM
// ============================================
const ThemeManager = {
  init() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.icon = this.themeToggle?.querySelector('.theme-icon');
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('lumixsa-theme') || 'dark';
    this.setTheme(savedTheme);
    
    // Add event listener
    this.themeToggle?.addEventListener('click', () => this.toggle());
  },
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lumixsa-theme', theme);
    this.updateIcon(theme);
  },
  
  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },
  
  updateIcon(theme) {
    if (this.icon) {
      this.icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
};

// ============================================
// MOBILE NAVIGATION
// ============================================
const MobileNav = {
  init() {
    this.menuBtn = document.querySelector('.mobile-menu-btn');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.overlay = document.createElement('div');
    this.overlay.className = 'nav-overlay';
    document.body.appendChild(this.overlay);
    
    this.menuBtn?.addEventListener('click', () => this.toggle());
    this.overlay.addEventListener('click', () => this.close());
    
    // Close on link click
    this.mobileNav?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });
  },
  
  toggle() {
    this.mobileNav.classList.toggle('active');
    this.overlay.classList.toggle('active');
    document.body.style.overflow = this.mobileNav.classList.contains('active') ? 'hidden' : '';
  },
  
  close() {
    this.mobileNav.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// ============================================
// AI CHATBOT WITH TEXT-TO-SPEECH
// ============================================
const AIChatbot = {
  knowledgeBase: {
    greetings: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'hola', 'good morning', 'good afternoon', 'good evening'],
    website: {
      keywords: ['website', 'lumixsa', 'about lumixsa', 'what is lumixsa', 'platform', 'site', 'yourself', 'who are you'],
      response: `Lumixsa AI is a cutting-edge platform offering AI-powered tools and comprehensive financial resources to help you work smarter and achieve your goals. 

<strong>What we offer:</strong>
• 10+ Advanced AI Tools - From code explainers to caption generators
• Expert Financial Guides - Loans, credit cards, investing, and more
• Global Accessibility - Designed for users worldwide
• Free Resources - Most tools and guides are completely free

Founded by Dilshad Ahmad with a mission to democratize AI technology for everyone.`
    },
    tools: {
      keywords: ['tools', 'features', 'what can you do', 'capabilities', 'services', 'ai tools', 'utilities', 'functions'],
      response: `Lumixsa AI offers 10+ powerful AI tools:

<strong>Content & Creativity:</strong>
• AI Caption Generator - Create engaging social media captions
• Startup Name Generator - Generate unique business names
• Meme Generator - Make custom memes instantly

<strong>Developer Tools:</strong>
• Code Explainer - Understand any code snippet
• Explain Like I'm 10 - Simplify complex topics
• Fake Data Generator - Generate test data

<strong>Productivity:</strong>
• Habit Tracker Dashboard - Build better habits
• Password Generator - Create secure passwords
• QR Code Generator - Generate QR codes
• Chat with PDF - Interact with PDF documents

<strong>Financial Tools:</strong>
• Loan Calculator - Calculate EMIs and interest
• Budget Planner - Manage your finances
• Compound Interest Calculator - Plan investments

Visit the <a href="tools.html">Tools page</a> to explore all features!`
    },
    blog: {
      keywords: ['blog', 'articles', 'content', 'guides', 'finance', 'loans', 'credit cards', 'posts', 'read', 'learn'],
      response: `Our blog features 20+ comprehensive SEO-optimized articles covering personal finance, investing, and money management:

<strong>Financial Basics:</strong>
• Emergency Fund Guide - Build your safety net
• Budgeting Guide - Master your money
• Debt Payoff Strategies - Become debt-free
• 50 Money-Saving Tips - Save thousands annually

<strong>Investing:</strong>
• Stock Market Basics - Start investing confidently
• Cryptocurrency Guide - Understand Bitcoin & Ethereum
• Financial Independence (FIRE) - Retire early
• Retirement Planning - Secure your future

<strong>Credit & Loans:</strong>
• Personal Loans Complete Guide
• Credit Score Mastery
• Best Credit Cards 2026
• Business Loans Guide

<strong>Income:</strong>
• 50+ Side Hustle Ideas
• Passive Income Strategies
• Online Earning Methods

All articles are 1500+ words with expert insights. Visit the <a href="blog.html">Blog page</a>!`
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'reach', 'support', 'help', 'call', 'message'],
      response: `You can reach Lumixsa AI through the following channels:

<strong>📧 Email:</strong> lumixsasupport@gmail.com
<strong>📱 Phone:</strong> 03904563345
<strong>👤 Manager:</strong> Dilshad Ahmad

<strong>Business Hours:</strong>
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed

For general inquiries, visit our <a href="contact.html">Contact page</a> to send a message directly. We typically respond within 24 hours!`
    },
    dilshad: {
      keywords: ['dilshad', 'ahmad', 'founder', 'owner', 'manager', 'developer', 'who created', 'who made'],
      response: `<strong>Dilshad Ahmad</strong> is the Manager, Founder, and Lead Developer of Lumixsa AI.

<strong>Background:</strong>
• 10+ years of professional development experience
• Expert in web technologies, AI integration, and user experience design
• Passionate about making technology accessible to everyone
• Based in [Location], serving a global audience

<strong>Vision:</strong>
Dilshad founded Lumixsa AI with the mission to democratize AI tools and provide valuable financial education to users worldwide. His expertise spans full-stack development, artificial intelligence, and creating user-friendly digital solutions that solve real problems.

<strong>Contact:</strong> lumixsasupport@gmail.com | 03904563345`
    },
    pricing: {
      keywords: ['price', 'pricing', 'cost', 'free', 'payment', 'subscription', 'plan', 'premium'],
      response: `Great news! Most of Lumixsa AI's tools and resources are completely <strong>FREE</strong> to use!

<strong>Free Features:</strong>
• All 10+ AI Tools - Unlimited use
• All Blog Articles - Full access
• Basic Support - Email assistance
• Future Updates - New features included

<strong>Why Free?</strong>
We believe everyone should have access to quality AI tools and financial education. Our platform is supported by advertising and optional donations from satisfied users.

<strong>Coming Soon:</strong>
We may introduce premium features in the future for power users, but the core tools will always remain free.`
    },
    howto: {
      keywords: ['how to use', 'tutorial', 'help me', 'guide', 'instructions', 'start', 'begin'],
      response: `Getting started with Lumixsa AI is easy!

<strong>Step 1:</strong> Explore our <a href="tools.html">AI Tools</a> - Try any tool instantly without registration

<strong>Step 2:</strong> Read our <a href="blog.html">Financial Guides</a> - Learn about loans, credit, investing, and more

<strong>Step 3:</strong> Bookmark your favorite tools for quick access

<strong>Popular Starting Points:</strong>
• Need a caption? Try the <a href="tool-pages/ai-caption-generator.html">AI Caption Generator</a>
• Want to understand code? Use the <a href="tool-pages/code-explainer.html">Code Explainer</a>
• Planning finances? Check our <a href="blog-posts/budgeting-guide.html">Budgeting Guide</a>

<strong>Need Help?</strong>
Just ask me anything! I can explain how specific tools work or guide you to the right resource.`
    }
  },
  
  instances: [],
  
  init() {
    // Find all AI chat containers on the page
    const chatContainers = document.querySelectorAll('.ai-chat-box');
    
    chatContainers.forEach((container, index) => {
      const instance = new AIChatInstance(container, index);
      this.instances.push(instance);
    });
  }
};

// Individual AI Chat Instance Class
class AIChatInstance {
  constructor(container, index) {
    this.container = container;
    this.index = index;
    this.chatBox = container.querySelector('.ai-messages');
    this.input = container.querySelector('.ai-input');
    this.sendBtn = container.querySelector('.ai-send-btn');
    this.voiceBtn = container.querySelector('.ai-voice-btn');
    
    if (!this.chatBox) return;
    
    // Initialize speech synthesis
    this.synth = window.speechSynthesis;
    this.voiceEnabled = false;
    
    // Load knowledge base if available
    this.kb = typeof LumixsaKnowledgeBase !== 'undefined' ? LumixsaKnowledgeBase : null;
    
    // Event listeners
    this.sendBtn?.addEventListener('click', () => this.sendMessage());
    this.input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    this.voiceBtn?.addEventListener('click', () => this.toggleVoice());
    
    // Add welcome message (only for first instance or if empty)
    if (this.chatBox.children.length === 0) {
      this.addMessage('bot', this.kb ? this.kb.quickResponses.greeting : 'Hello! I\'m Lumixsa AI Assistant. Ask me about our website, tools, blog articles, or how to contact us!');
    }
  }
  
  sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;
    
    // Add user message
    this.addMessage('user', message);
    this.input.value = '';
    
    // Show typing indicator
    this.showTyping();
    
    // Generate response
    setTimeout(() => {
      this.hideTyping();
      const response = this.generateResponse(message);
      this.addMessage('bot', response);
      
      // Speak if voice enabled
      if (this.voiceEnabled) {
        this.speak(response);
      }
    }, 1000);
  }
  
  generateResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    // Check for greetings
    if (this.knowledgeBase.greetings.some(g => lowerMsg.includes(g))) {
      return this.kb ? this.kb.quickResponses.greeting : 'Hello! Welcome to Lumixsa AI. How can I help you today?';
    }
    
    // Check for specific quick response triggers
    if (this.kb) {
      if (lowerMsg.includes('all tools') || lowerMsg.includes('list tools') || lowerMsg.includes('what tools')) {
        return this.kb.quickResponses.allTools;
      }
      if (lowerMsg.includes('all blogs') || lowerMsg.includes('all articles') || lowerMsg.includes('list articles')) {
        return this.kb.quickResponses.allBlogs;
      }
      if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
        return this.kb.quickResponses.contactInfo;
      }
      if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('free') || lowerMsg.includes('payment')) {
        return this.kb.quickResponses.pricing;
      }
      if (lowerMsg.includes('about site') || lowerMsg.includes('what is lumixsa') || lowerMsg.includes('about lumixsa')) {
        return this.kb.quickResponses.aboutSite;
      }
      if (lowerMsg.includes('dilshad') || lowerMsg.includes('founder') || lowerMsg.includes('owner') || lowerMsg.includes('manager')) {
        return this.kb.owner.description + `\n\n<strong>Contact:</strong> ${this.kb.owner.email} | ${this.kb.owner.phone}`;
      }
    }
    
    // Check knowledge base categories
    for (const category in this.knowledgeBase) {
      if (category === 'greetings') continue;
      const data = this.knowledgeBase[category];
      if (data.keywords.some(k => lowerMsg.includes(k))) {
        return data.response;
      }
    }
    
    // Search in knowledge base for blog articles or tools
    if (this.kb) {
      const searchResults = this.kb.search(message);
      if (searchResults.length > 0) {
        const result = searchResults[0];
        if (result.type === 'article') {
          return `<strong>${result.title}</strong>\n\n${result.excerpt}\n\n<a href="blog-posts/${result.slug}.html">Read full article →</a>`;
        }
        if (result.type === 'tool') {
          return `<strong>${result.name}</strong> (${result.category})\n\n${result.description}\n\n<a href="tool-pages/${result.slug}.html">Try this tool →</a>`;
        }
        if (result.type === 'faq') {
          return result.answer;
        }
      }
    }
    
    // Default responses
    const defaults = [
      'I can help you learn about Lumixsa AI\'s tools, blog articles, or how to contact us. What would you like to know?',
      'Ask me about our AI tools, financial guides, or say "contact" for our support information.',
      'I\'m here to help! Try asking about our website features, tools, or blog content.'
    ];
    
    return defaults[Math.floor(Math.random() * defaults.length)];
  }
  
  addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${sender}`;
    messageDiv.innerHTML = `
      <div class="ai-avatar">${sender === 'bot' ? '🤖' : '👤'}</div>
      <div class="ai-bubble">${this.formatText(text)}</div>
    `;
    this.chatBox.appendChild(messageDiv);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }
  
  formatText(text) {
    return text.replace(/\n/g, '<br>');
  }
  
  showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message bot typing-indicator';
    typingDiv.innerHTML = `
      <div class="ai-avatar">🤖</div>
      <div class="ai-bubble">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    `;
    this.chatBox.appendChild(typingDiv);
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }
  
  hideTyping() {
    const typing = this.chatBox.querySelector('.typing-indicator');
    if (typing) typing.remove();
  }
  
  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    this.voiceBtn.style.background = this.voiceEnabled ? 'var(--accent-primary)' : '';
    this.voiceBtn.style.color = this.voiceEnabled ? 'white' : '';
    
    if (this.voiceEnabled) {
      this.addMessage('bot', '🔊 Voice output enabled! I\'ll now speak my responses.');
    } else {
      this.synth.cancel();
    }
  }
  
  speak(text) {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    // Clean text for speech (remove emojis)
    const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to use a good English voice
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English')) || 
                          voices.find(v => v.name.includes('Samantha')) ||
                          voices.find(v => v.lang === 'en-US');
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    this.synth.speak(utterance);
  }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const ScrollAnimations = {
  init() {
    this.revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.revealElements.forEach(el => observer.observe(el));
  }
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const NavbarScroll = {
  init() {
    this.navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        this.navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        this.navbar.style.background = '';
        this.navbar.style.boxShadow = '';
      }
    });
  }
};

// ============================================
// FORM VALIDATION
// ============================================
const FormValidation = {
  init() {
    this.forms = document.querySelectorAll('form[data-validate]');
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
  },
  
  handleSubmit(e, form) {
    e.preventDefault();
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      const errorEl = input.parentElement.querySelector('.form-error');
      
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = 'var(--error)';
        if (errorEl) errorEl.classList.add('show');
      } else {
        input.style.borderColor = '';
        if (errorEl) errorEl.classList.remove('show');
      }
      
      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          input.style.borderColor = 'var(--error)';
        }
      }
    });
    
    if (isValid) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'alert alert-success';
      successMsg.style.cssText = `
        padding: 1rem;
        background: var(--success);
        color: white;
        border-radius: 0.5rem;
        margin-top: 1rem;
        text-align: center;
      `;
      successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
      
      form.appendChild(successMsg);
      form.reset();
      
      setTimeout(() => successMsg.remove(), 5000);
    }
  }
};

// ============================================
// TOOL FUNCTIONS
// ============================================
const Tools = {
  init() {
    // Initialize any tool-specific functionality
    this.initPasswordGenerator();
    this.initQRGenerator();
  },
  
  initPasswordGenerator() {
    const generateBtn = document.getElementById('generate-password');
    if (!generateBtn) return;
    
    generateBtn.addEventListener('click', () => {
      const length = document.getElementById('password-length')?.value || 16;
      const uppercase = document.getElementById('include-uppercase')?.checked ?? true;
      const numbers = document.getElementById('include-numbers')?.checked ?? true;
      const symbols = document.getElementById('include-symbols')?.checked ?? true;
      
      const password = this.generatePassword(parseInt(length), uppercase, numbers, symbols);
      const output = document.getElementById('password-output');
      if (output) output.value = password;
    });
  },
  
  generatePassword(length, uppercase, numbers, symbols) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },
  
  initQRGenerator() {
    const generateBtn = document.getElementById('generate-qr');
    if (!generateBtn) return;
    
    generateBtn.addEventListener('click', () => {
      const text = document.getElementById('qr-text')?.value;
      if (!text) return;
      
      // Simple QR code generation using API
      const qrContainer = document.getElementById('qr-output');
      if (qrContainer) {
        qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}" alt="QR Code">`;
      }
    });
  },
  
  // Copy to clipboard utility
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Copied to clipboard!';
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }
};

// ============================================
// LAZY LOADING
// ============================================
const LazyLoader = {
  init() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
};

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileNav.init();
  // AI Assistant is now in ai-assistant.js
  ScrollAnimations.init();
  NavbarScroll.init();
  FormValidation.init();
  Tools.init();
  LazyLoader.init();
  
  // Force reveal blog cards after a short delay (backup for scroll animations)
  setTimeout(() => {
    const blogCards = document.querySelectorAll('.blog-card.scroll-reveal');
    if (blogCards.length > 0) {
      blogCards.forEach(card => card.classList.add('revealed'));
    }
  }, 100);
  
  // Add CSS for nav overlay
  const style = document.createElement('style');
  style.textContent = `
    .nav-overlay {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 998;
    }
    .nav-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .typing-indicator .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--text-muted);
      border-radius: 50%;
      margin: 0 2px;
      animation: typing 1.4s infinite;
    }
    .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);
});

// Export for use in other scripts
window.Lumixsa = {
  ThemeManager,
  Tools,
  copyToClipboard: Tools.copyToClipboard
};
