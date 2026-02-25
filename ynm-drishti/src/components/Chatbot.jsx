import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  RotateCcw, 
  Download, 
  ChevronDown,
  Bot,
  User,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  HelpCircle,
  Sparkles,
  Zap,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { COMPANY_KNOWLEDGE, SYSTEM_PROMPT } from '../data/companyKnowledge';

/* ═══════════════════════════════════════════════════════════════════════
   GEMINI AI CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════ */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;
let model = null;

// Initialize Gemini only if API key is available
if (API_KEY && API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 500,
    },
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   ENHANCED FAQ DATA
   ═══════════════════════════════════════════════════════════════════════ */
const FAQ_DATA = [
  {
    id: 1,
    question: "What is YNM Drishti?",
    answer: "YNM Drishti is an advanced AI-powered road infrastructure monitoring system that uses state-of-the-art computer vision and deep learning to detect road defects like potholes, cracks, damaged signs, and 15+ other infrastructure elements in real-time with 99.8% accuracy. We revolutionize road maintenance by making it proactive, efficient, and data-driven.",
    icon: "🚗"
  },
  {
    id: 2,
    question: "How accurate is the detection?",
    answer: "Our AI system achieves an industry-leading 99.8% accuracy in detecting road defects. We use state-of-the-art deep learning models including YOLO and CNN architectures, trained on millions of road images from diverse conditions to ensure reliable and precise detection in real-world scenarios.",
    icon: "🎯"
  },
  {
    id: 3,
    question: "What can Drishti detect?",
    answer: "Drishti can detect 15+ types of road infrastructure elements including: potholes, alligator cracks, longitudinal & transverse cracks, edge breaks, raveling, rutting, lane markings, traffic signs, road barriers, speed bumps, drainage systems (manholes, grates), road markings, zebra crossings, and more.",
    icon: "🔍"
  },
  {
    id: 4,
    question: "How does it work?",
    answer: "Drishti uses high-resolution cameras mounted on vehicles (patrol cars, buses, or dedicated vehicles) to capture road footage while driving at normal speeds. Our AI processes 30 frames per second in real-time using edge computing, detecting defects and GPS-tagging their exact locations. The data is transmitted to our cloud platform where it's visualized on an interactive dashboard for maintenance teams to view, prioritize, and assign repair tasks.",
    icon: "⚙️"
  },
  {
    id: 5,
    question: "What is the processing speed?",
    answer: "Drishti processes at an impressive 30 frames per second (1,800 snapshots per minute) while vehicles travel at speeds up to 100 km/h. This ensures comprehensive coverage without slowing down traffic or requiring special inspection runs.",
    icon: "⚡"
  },
  {
    id: 6,
    question: "How can I get a demo?",
    answer: "You can request a free demo by clicking the 'See Demo' button on our homepage, filling out the contact form, or emailing us at contact@ynmdrishti.com. Our team will reach out within 24 hours to schedule a personalized demonstration of our technology tailored to your specific needs.",
    icon: "🎬"
  },
  {
    id: 7,
    question: "What industries and customers do you serve?",
    answer: "We serve municipal corporations, highway authorities (national & state), road construction companies, smart city projects, toll road operators, and transportation departments. Any organization responsible for road maintenance and infrastructure management can benefit from our solution.",
    icon: "🏢"
  },
  {
    id: 8,
    question: "Is there an API available?",
    answer: "Yes! We offer a comprehensive RESTful API for seamless integration into your existing systems including GIS platforms, asset management software, work order systems, and municipal ERPs. Our API supports real-time data streaming, webhooks, and comes with complete documentation. Contact our team for API access and integration support.",
    icon: "🔗"
  },
  {
    id: 9,
    question: "What are the benefits and ROI?",
    answer: "Drishti delivers 30-50% reduction in maintenance costs, 80% reduction in manual inspection time, and covers 10x more road distance per day. Benefits include proactive maintenance, accident prevention, extended road lifespan, optimized crew deployment, and comprehensive data analytics for informed decision-making.",
    icon: "💰"
  },
  {
    id: 10,
    question: "What technology powers Drishti?",
    answer: "Drishti uses Deep Convolutional Neural Networks (CNN), YOLO algorithms for real-time detection, semantic segmentation, and custom-trained models. Our hardware includes 4K cameras, GPS modules, edge computing devices, mounted on ruggedized systems. The cloud infrastructure is built on scalable platforms with encrypted data transmission.",
    icon: "🤖"
  },
  {
    id: 11,
    question: "What support and training do you provide?",
    answer: "We offer comprehensive on-site training for operators, online video tutorials, detailed documentation, and regular webinar sessions. Support includes 24/7 technical assistance, dedicated account managers, email and phone support, regular software updates, and ongoing maintenance.",
    icon: "🎓"
  },
  {
    id: 12,
    question: "How do I contact YNM Drishti?",
    answer: "You can reach us via email at contact@ynmdrishti.com, visit our website at ynmdrishti.com, or connect with us on LinkedIn, Facebook, and Instagram. We respond to all inquiries within 24 hours.",
    icon: "📞"
  }
];

/* Quick suggestion chips - Enhanced with more options */
const QUICK_SUGGESTIONS = [
  { text: "What is Drishti?", icon: "✨", category: "intro" },
  { text: "Detection accuracy", icon: "🎯", category: "tech" },
  { text: "What can you detect?", icon: "🔍", category: "features" },
  { text: "Get a demo", icon: "🚀", category: "action" },
  { text: "How it works", icon: "⚙️", category: "tech" },
  { text: "Benefits and ROI", icon: "💰", category: "business" },
  { text: "API integration", icon: "🔗", category: "tech" },
  { text: "Pricing options", icon: "💵", category: "business" }
];

// Dynamic follow-up suggestions based on conversation
const getFollowUpSuggestions = (lastResponse) => {
  const response = lastResponse.toLowerCase();
  
  if (response.includes('accuracy') || response.includes('99.8')) {
    return [
      { text: "What technology powers this?", icon: "🤖" },
      { text: "Can I see a demo?", icon: "🎬" }
    ];
  }
  if (response.includes('detect') || response.includes('pothole')) {
    return [
      { text: "How fast does it process?", icon: "⚡" },
      { text: "What are the benefits?", icon: "💰" }
    ];
  }
  if (response.includes('demo') || response.includes('try')) {
    return [
      { text: "What's the pricing?", icon: "💵" },
      { text: "Do you have an API?", icon: "🔗" }
    ];
  }
  if (response.includes('api') || response.includes('integration')) {
    return [
      { text: "Show me use cases", icon: "📊" },
      { text: "What support do you offer?", icon: "🎓" }
    ];
  }
  
  return null;
};

/* Social links */
const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://linkedin.com/company/ynmdrishti', label: 'LinkedIn', color: '#0A66C2' },
  { icon: Facebook, href: 'https://facebook.com/ynmdrishti', label: 'Facebook', color: '#1877F2' },
  { icon: Instagram, href: 'https://instagram.com/ynmdrishti', label: 'Instagram', color: '#E4405F' },
  { icon: Mail, href: 'mailto:contact@ynmdrishti.com', label: 'Email', color: '#EA4335' },
];

/* ═══════════════════════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════ */

// Fallback function for when Gemini is not available or for simple greetings
const getFallbackAnswer = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  // Quick greetings
  if (message.match(/^(hi|hello|hey|hola|namaste|good morning|good afternoon|good evening)$/)) {
    return "Hey there! 👋 I'm your Drishti AI assistant. Ready to help you explore our road monitoring technology. What would you like to know?";
  }
  
  if (message.match(/^(thank|thanks|thx|ty|appreciate)/)) {
    return "You're welcome! 🙌 Anything else you'd like to explore about YNM Drishti?";
  }
  
  if (message.match(/^(bye|goodbye|see you|take care)$/)) {
    return "Catch you later! 👋 Feel free to come back anytime with questions about our road monitoring tech. Safe travels!";
  }

  // Match against FAQ
  let bestMatch = null;
  let highestScore = 0;

  for (const faq of FAQ_DATA) {
    let score = 0;
    const messageWords = message.split(' ');
    
    for (const word of messageWords) {
      if (word.length > 2) {
        if (faq.question.toLowerCase().includes(word)) score += 2;
        if (faq.answer.toLowerCase().includes(word)) score += 1;
      }
    }
    
    // Boost scores for specific keywords
    if (message.includes('what is') && faq.id === 1) score += 5;
    if ((message.includes('accuracy') || message.includes('accurate')) && faq.id === 2) score += 5;
    if ((message.includes('detect') || message.includes('find') || message.includes('identify')) && faq.id === 3) score += 5;
    if ((message.includes('demo') || message.includes('trial') || message.includes('test')) && faq.id === 6) score += 5;
    if ((message.includes('speed') || message.includes('fast') || message.includes('fps')) && faq.id === 5) score += 5;
    if ((message.includes('work') || message.includes('process') || message.includes('function')) && faq.id === 4) score += 4;
    if ((message.includes('api') || message.includes('integrate') || message.includes('integration')) && faq.id === 8) score += 5;
    if ((message.includes('industry') || message.includes('serve') || message.includes('customer')) && faq.id === 7) score += 5;
    if ((message.includes('benefit') || message.includes('roi') || message.includes('saving') || message.includes('cost')) && faq.id === 9) score += 5;
    if ((message.includes('technology') || message.includes('tech') || message.includes('ai') || message.includes('ml')) && faq.id === 10) score += 5;
    if ((message.includes('support') || message.includes('training') || message.includes('help')) && faq.id === 11) score += 5;
    if ((message.includes('contact') || message.includes('reach') || message.includes('email')) && faq.id === 12) score += 5;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  if (highestScore >= 3 && bestMatch) {
    return bestMatch.answer;
  }

  return "I'm here to answer questions about YNM Drishti and our road infrastructure monitoring solutions! 🚗\n\nTry asking about:\n• What we can detect\n• Our AI accuracy and technology\n• How to get a demo\n• Benefits and ROI\n• API integration\n• Industries we serve";
};

// Easter eggs for fun interactions
const getEasterEggResponse = (message) => {
  const msg = message.toLowerCase();
  
  // Fun Easter eggs
  if (msg.includes('love') && (msg.includes('you') || msg.includes('drishti'))) {
    return "Aww! 💛 We love helping make roads safer! What would you like to know about our technology?";
  }
  if (msg.includes('awesome') || msg.includes('amazing') || msg.includes('great')) {
    return "Thank you! 🎉 We're passionate about making roads safer through AI. Want to learn more about how we do it?";
  }
  if (msg.includes('cool') || msg.includes('nice')) {
    return "Glad you think so! 😎 Road infrastructure monitoring with AI is pretty exciting. What interests you most?";
  }
  if (msg.match(/^(wow|omg|damn|dang|impressive)$/)) {
    return "Right?! 🚀 99.8% accuracy at 100 km/h is no joke! Want to see a demo of it in action?";
  }
  if (msg.includes('smart') || msg.includes('intelligent')) {
    return "Thanks! 🧠 We've trained our AI on millions of road images. It's getting smarter every day! What would you like to know?";
  }
  if (msg.includes('robot') || msg.includes('human')) {
    return "I'm an AI assistant! 🤖 But I'm specifically trained on YNM Drishti's road monitoring tech. How can I help you today?";
  }
  if (msg.includes('help')) {
    return "I'm here to help! 🙋‍♂️ I can tell you about our detection capabilities, accuracy, pricing, demos, API, or anything else about YNM Drishti. What interests you?";
  }
  
  return null;
};

// Enhanced response with personality
const addPersonality = (response) => {
  // Randomly add enthusiasm to some responses
  if (Math.random() > 0.7 && !response.includes('!')) {
    if (response.includes('detection') || response.includes('accuracy')) {
      return response.replace('.', '! 🎯');
    }
    if (response.includes('demo') || response.includes('try')) {
      return response.replace('.', '! 🚀');
    }
    if (response.includes('contact') || response.includes('reach')) {
      return response.replace('.', '! 📧');
    }
  }
  
  return response;
};

// Check if question is off-topic (general knowledge, not about company)
const isOffTopicQuestion = (message) => {
  const msg = message.toLowerCase();
  
  // List of off-topic indicators
  const offTopicKeywords = [
    'capital', 'president', 'prime minister', 'weather', 'temperature',
    'joke', 'story', 'recipe', 'cook', 'celebrity', 'actor', 'movie',
    'sports', 'football', 'cricket', 'game', 'who won', 'who is',
    'what is 2+2', 'calculate', 'math', 'history', 'geography',
    'country', 'city', 'population', 'when was', 'who invented',
    'translate', 'language', 'definition of', 'meaning of'
  ];
  
  // Check for math operations
  if (msg.match(/\d+\s*[+\-*/]\s*\d+/)) {
    return true;
  }
  
  // Check for off-topic keywords
  for (const keyword of offTopicKeywords) {
    if (msg.includes(keyword)) {
      // But allow if also mentions company/road related terms
      const companyTerms = ['drishti', 'road', 'pothole', 'detect', 'api', 'demo', 'price', 'ai'];
      const hasCompanyTerm = companyTerms.some(term => msg.includes(term));
      if (!hasCompanyTerm) {
        return true;
      }
    }
  }
  
  return false;
};

// Main function to get AI response with enhanced features
const getAIResponse = async (userMessage, conversationHistory = []) => {
  const message = userMessage.toLowerCase().trim();
  
  // Check for Easter eggs first
  const easterEgg = getEasterEggResponse(message);
  if (easterEgg) {
    return easterEgg;
  }
  
  // Check for simple greetings
  if (message.match(/^(hi|hello|hey|hola|namaste|good morning|good afternoon|good evening)$/)) {
    return getFallbackAnswer(userMessage);
  }
  if (message.match(/^(thank|thanks|thx|ty|appreciate)$/)) {
    return getFallbackAnswer(userMessage);
  }
  if (message.match(/^(bye|goodbye|see you|take care)$/)) {
    return getFallbackAnswer(userMessage);
  }
  
  // Check if question is off-topic before sending to Gemini
  if (isOffTopicQuestion(message)) {
    return "I'm specifically designed to help with YNM Drishti and road infrastructure monitoring. I can tell you about our AI-powered road defect detection, pricing, demos, or technology. What would you like to know? 🚗";
  }

  // Use Gemini if available
  if (model) {
    try {
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.8, // Increased for more creative responses
          topP: 0.95,
        },
      });

      const enhancedPrompt = `${SYSTEM_PROMPT}

ADDITIONAL PERSONALITY GUIDELINES:
- Be enthusiastic and passionate about road safety
- Use occasional emojis (but not too many)
- Show excitement about our technology
- Be conversational and friendly
- If appropriate, end with a follow-up question to engage the user

User Question: ${userMessage}

Provide a helpful, engaging response. If the question is not about YNM Drishti or road infrastructure, politely redirect to company topics with enthusiasm.`;
      
      const result = await chat.sendMessage(enhancedPrompt);
      const response = await result.response;
      let text = response.text();
      
      // Add personality touches
      text = addPersonality(text);
      
      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fall back to local matching
      return getFallbackAnswer(userMessage);
    }
  }
  
  // Fallback to local matching if Gemini not configured
  return getFallbackAnswer(userMessage);
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

/* ═══════════════════════════════════════════════════════════════════════
   MODERN CHATBOT COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: API_KEY && API_KEY !== 'your_gemini_api_key_here' 
        ? "Hey! 👋 I'm your Drishti AI assistant powered by Gemini 2.5 Flash. Ask me anything about our road monitoring technology!"
        : "Hey! 👋 I'm your Drishti AI assistant. Ask me anything about our road monitoring tech! (Note: Connect Gemini API for enhanced responses)",
      time: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [error, setError] = useState(null);
  const [followUpSuggestions, setFollowUpSuggestions] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, activeTab]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);
    setFollowUpSuggestions(null); // Clear previous suggestions

    try {
      // Get AI response
      const aiResponse = await getAIResponse(userMessage.text, conversationHistory);
      
      // Simulate typing effect for more natural feel
      const typingDelay = Math.min(aiResponse.length * 3, 1000); // Max 1 second
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      // Update conversation history for context
      setConversationHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: userMessage.text }] },
        { role: "model", parts: [{ text: aiResponse }] }
      ]);

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: aiResponse,
        time: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Generate follow-up suggestions
      const suggestions = getFollowUpSuggestions(aiResponse);
      if (suggestions) {
        setFollowUpSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Oops! Something went wrong. Please try again.');
      
      // Fallback response
      const fallbackResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: "I'm having trouble connecting right now. Please try asking your question again, or reach out to us at contact@ynmdrishti.com for immediate assistance! 📧",
        time: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickSuggestion = async (suggestion) => {
    if (isTyping) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: suggestion,
      time: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);
    setFollowUpSuggestions(null);

    try {
      const aiResponse = await getAIResponse(suggestion, conversationHistory);
      
      // Typing effect
      const typingDelay = Math.min(aiResponse.length * 3, 1000);
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      setConversationHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: suggestion }] },
        { role: "model", parts: [{ text: aiResponse }] }
      ]);

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: aiResponse,
        time: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Generate follow-up suggestions
      const suggestions = getFollowUpSuggestions(aiResponse);
      if (suggestions) {
        setFollowUpSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const fallbackResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: "I'm having trouble connecting right now. Please try again! 🔄",
        time: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    const greetings = [
      "Fresh start! 🚀 What would you like to explore about YNM Drishti?",
      "New conversation! ✨ How can I help you with road monitoring today?",
      "Let's start fresh! 💡 Ask me anything about our AI-powered road detection!",
      "Ready for a new chat! 🎯 What interests you about our technology?",
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: API_KEY && API_KEY !== 'your_gemini_api_key_here'
          ? randomGreeting
          : "Fresh start! 🚀 What would you like to know about Drishti?",
        time: new Date()
      }
    ]);
    setConversationHistory([]);
    setError(null);
    setFollowUpSuggestions(null);
  };

  // Prevent scroll propagation to parent page
  const handleScrollCapture = (e) => {
    e.stopPropagation();
  };

  const handleWheel = (e) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const height = target.clientHeight;
    const wheelDelta = e.deltaY;
    const isDeltaPositive = wheelDelta > 0;

    if (isDeltaPositive && scrollTop + height >= scrollHeight) {
      // At bottom, scrolling down
      e.preventDefault();
      e.stopPropagation();
    } else if (!isDeltaPositive && scrollTop <= 0) {
      // At top, scrolling up
      e.preventDefault();
      e.stopPropagation();
    } else {
      // In the middle, allow scroll but stop propagation
      e.stopPropagation();
    }
  };

  const handleSaveChat = () => {
    const chatContent = messages.map(msg => 
      `[${formatTime(msg.time)}] ${msg.type === 'bot' ? 'Drishti AI' : 'You'}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drishti-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Modern Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-[100] group"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            {/* Animated ring */}
            <div 
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{ background: 'linear-gradient(135deg, #FFD700, #1E90FF)' }}
            />
            
            {/* Button body */}
            <div 
              className="relative flex items-center gap-2 px-5 py-3.5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(26, 40, 71, 0.95) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                }}
              >
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Chat with AI</div>
                <div className="text-gray-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online now
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[100] w-[400px] max-w-[calc(100vw-48px)] rounded-3xl overflow-hidden"
            style={{
              height: '600px',
              maxHeight: 'calc(100vh - 100px)',
              background: 'linear-gradient(180deg, rgba(8, 15, 30, 0.98) 0%, rgba(15, 25, 45, 0.98) 100%)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Gradient border effect */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(30, 144, 255, 0.3), rgba(255, 215, 0, 0.3))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />

            {/* Header */}
            <div 
              className="relative px-5 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 35, 60, 0.8) 0%, rgba(30, 50, 80, 0.8) 100%)',
                borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Animated avatar */}
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)',
                      }}
                    >
                      <Bot className="w-6 h-6 text-black" />
                    </div>
                    <span 
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                      style={{ 
                        background: '#22C55E',
                        borderColor: 'rgba(8, 15, 30, 1)',
                        boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Drishti AI</h3>
                    <p className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Ready to help
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleNewChat}
                    className="p-2.5 rounded-xl transition-all hover:bg-white/10 group"
                    title="New Chat"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-300" />
                  </button>
                  <button
                    onClick={handleSaveChat}
                    className="p-2.5 rounded-xl transition-all hover:bg-white/10 group"
                    title="Save Chat"
                  >
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-white transition-all" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl transition-all hover:bg-red-500/20 group"
                    title="Close"
                  >
                    <X className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-all" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modern Tabs */}
            <div className="flex gap-2 px-5 py-3 bg-black/20">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'chat' ? 'text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={activeTab === 'chat' ? {
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                } : {}}
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'faq' ? 'text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={activeTab === 'faq' ? {
                  background: 'linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)',
                  boxShadow: '0 4px 15px rgba(30, 144, 255, 0.3)',
                } : {}}
              >
                <HelpCircle className="w-4 h-4" />
                FAQs
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col overflow-hidden" style={{ height: 'calc(100% - 160px)' }}>
              {activeTab === 'chat' ? (
                <>
                  {/* Messages */}
                  <div 
                    className="flex-1 overflow-y-auto px-5 py-4 space-y-4 custom-scrollbar"
                    style={{ minHeight: 0 }}
                    onWheel={handleWheel}
                    onScroll={handleScrollCapture}
                  >
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <div className={`flex items-end gap-2.5 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div 
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: msg.type === 'bot' 
                                ? 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)'
                                : 'linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%)',
                              boxShadow: msg.type === 'bot'
                                ? '0 4px 12px rgba(255, 215, 0, 0.3)'
                                : '0 4px 12px rgba(30, 144, 255, 0.3)',
                            }}
                          >
                            {msg.type === 'bot' 
                              ? <Bot className="w-4 h-4 text-black" />
                              : <User className="w-4 h-4 text-white" />
                            }
                          </div>
                          <div className="space-y-1">
                            <div 
                              className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                              style={{
                                background: msg.type === 'bot' 
                                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)'
                                  : 'linear-gradient(135deg, #1E90FF 0%, #0066CC 100%)',
                                color: 'white',
                                borderBottomLeftRadius: msg.type === 'bot' ? '6px' : '20px',
                                borderBottomRightRadius: msg.type === 'user' ? '6px' : '20px',
                                boxShadow: msg.type === 'user' ? '0 4px 15px rgba(30, 144, 255, 0.3)' : 'none',
                                border: msg.type === 'bot' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                              }}
                            >
                              {msg.text}
                            </div>
                            <span className={`text-[10px] text-gray-500 block ${msg.type === 'user' ? 'text-right' : ''}`}>
                              {formatTime(msg.time)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Modern Typing indicator */}
                    {isTyping && (
                      <motion.div 
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ 
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
                          }}
                        >
                          <Bot className="w-4 h-4 text-black" />
                        </div>
                        <div 
                          className="px-5 py-3.5 rounded-2xl flex items-center gap-1.5"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-2 h-2 rounded-full"
                              style={{ background: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}
                              animate={{ 
                                opacity: [0.3, 1, 0.3], 
                                scale: [0.8, 1.2, 0.8],
                                y: [0, -4, 0]
                              }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Suggestions - Show on first messages */}
                  {messages.length <= 2 && (
                    <div className="px-5 pb-2 flex-shrink-0" style={{ maxHeight: '120px', overflow: 'visible' }}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-medium">✨ Quick questions</p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_SUGGESTIONS.slice(0, 6).map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleQuickSuggestion(suggestion.text)}
                            disabled={isTyping}
                            className="group px-3.5 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                            style={{
                              background: 'rgba(255, 215, 0, 0.08)',
                              border: '1px solid rgba(255, 215, 0, 0.2)',
                              color: '#FFD700',
                            }}
                            whileHover={!isTyping ? { 
                              scale: 1.03,
                              background: 'rgba(255, 215, 0, 0.15)',
                              borderColor: 'rgba(255, 215, 0, 0.4)',
                            } : {}}
                            whileTap={!isTyping ? { scale: 0.97 } : {}}
                          >
                            <span className="mr-1.5">{suggestion.icon}</span>
                            {suggestion.text}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Follow-up Suggestions - Show after bot response */}
                  {followUpSuggestions && messages.length > 2 && !isTyping && (
                    <motion.div 
                      className="px-5 pb-2 flex-shrink-0"
                      style={{ maxHeight: '80px', overflow: 'visible' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-[10px] text-blue-400 uppercase tracking-wider mb-2 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        You might also like
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {followUpSuggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => handleQuickSuggestion(suggestion.text)}
                            className="group px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
                            style={{
                              background: 'rgba(30, 144, 255, 0.08)',
                              border: '1px solid rgba(30, 144, 255, 0.2)',
                              color: '#1E90FF',
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            whileHover={{ 
                              scale: 1.03,
                              background: 'rgba(30, 144, 255, 0.15)',
                              borderColor: 'rgba(30, 144, 255, 0.4)',
                            }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="mr-1.5">{suggestion.icon}</span>
                            {suggestion.text}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Modern Input Area */}
                  <div className="p-4 border-t border-white/5">
                    {/* Error Message */}
                    {error && (
                      <motion.div 
                        className="mb-3 px-3 py-2 rounded-lg flex items-center gap-2 text-xs"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#FCA5A5'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </motion.div>
                    )}
                    
                    {/* API Key Warning */}
                    {(!API_KEY || API_KEY === 'your_gemini_api_key_here') && (
                      <motion.div 
                        className="mb-3 px-3 py-2 rounded-lg flex items-center gap-2 text-xs"
                        style={{
                          background: 'rgba(251, 191, 36, 0.1)',
                          border: '1px solid rgba(251, 191, 36, 0.3)',
                          color: '#FCD34D'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Using fallback mode. Add your Gemini API key for enhanced responses.
                      </motion.div>
                    )}

                    <div 
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: inputValue.trim() ? '0 0 20px rgba(255, 215, 0, 0.1)' : 'none',
                      }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about YNM Drishti..."
                        className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
                      />
                      <motion.button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="p-2.5 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                          background: inputValue.trim() && !isTyping
                            ? 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)'
                            : 'rgba(255, 255, 255, 0.05)',
                          boxShadow: inputValue.trim() && !isTyping ? '0 4px 15px rgba(255, 215, 0, 0.3)' : 'none',
                        }}
                        whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
                        whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
                      >
                        <Send className="w-4 h-4" style={{ color: inputValue.trim() && !isTyping ? '#000' : '#666' }} />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                /* Modern FAQ Tab */
                <div 
                  className="flex-1 overflow-y-auto px-5 py-4 custom-scrollbar"
                  onWheel={handleWheel}
                  onScroll={handleScrollCapture}
                >
                  <div className="space-y-3">
                    {FAQ_DATA.map((faq, index) => (
                      <motion.div 
                        key={faq.id} 
                        className="rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ 
                          background: expandedFaq === faq.id 
                            ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(30, 144, 255, 0.1) 100%)'
                            : 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid',
                          borderColor: expandedFaq === faq.id 
                            ? 'rgba(255, 215, 0, 0.2)'
                            : 'rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                          className="w-full px-4 py-4 flex items-center gap-3 text-left transition-all hover:bg-white/5"
                        >
                          <span className="text-lg">{faq.icon}</span>
                          <span className="flex-1 text-sm text-white font-medium">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === faq.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed pl-12">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modern Footer */}
            <div 
              className="px-5 py-3 flex items-center justify-between"
              style={{ 
                background: 'rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)' }}
                >
                  <Sparkles className="w-3 h-3 text-black" />
                </div>
                <span className="text-[11px] text-gray-500 font-medium">
                  {API_KEY && API_KEY !== 'your_gemini_api_key_here' 
                    ? 'Powered by Gemini 2.5 Flash' 
                    : 'Powered by Drishti AI'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all"
                    style={{ color: '#666' }}
                    whileHover={{ 
                      scale: 1.15,
                      color: social.color,
                    }}
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
