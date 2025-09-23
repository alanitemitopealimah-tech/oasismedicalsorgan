import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, X, Phone, Clock, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Book Ultrasound Scan",
    "Lab Test Prices",
    "Working Hours",
    "Location & Contact",
    "X-Ray Services",
    "ECG Testing"
  ];

  const botResponses: { [key: string]: string } = {
    "book ultrasound scan": "Great! I can help you book an ultrasound scan. Our prices range from ₦2,500 for Pelvic/Obstetrics to ₦50,000 for HSG. Would you like to book via WhatsApp or see our full ultrasound price list?",
    "lab test prices": "We offer comprehensive laboratory services! Some popular tests: Full Blood Count (₦7,000), Blood Sugar (₦1,500), Lipid Profile (₦18,000), Malaria Test (₦2,000). Would you like to see our complete 2025 price list?",
    "working hours": "We're available 24/7! Our diagnostic center is open round the clock to serve you. For urgent tests or consultations, you can WhatsApp us anytime at 08058135226.",
    "location & contact": "📍 Location: Ifo, Ogun State\n📞 Phone: 08058135226 / 07033600770\n💬 WhatsApp: Available 24/7\n\nWould you like directions to our facility?",
    "x-ray services": "Our X-Ray services include: Chest X-Ray (₦10,000), Skull (₦12,000), Abdomen (₦15,000), and many more. All X-Rays come with detailed radiological reports. Book now!",
    "ecg testing": "ECG (Electrocardiogram) testing available for ₦12,000 (Pre & Post Exercise). Perfect for heart health assessment. Would you like to book an ECG test?"
  };

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! 👋 Welcome to O.A.S.I.S. MEDICALS. I'm here to help you with:\n\n• Booking appointments\n• Checking test prices\n• Getting location info\n• Answering questions\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userText: string): string => {
    // Check for keywords in user message
    for (const [key, response] of Object.entries(botResponses)) {
      if (userText.includes(key.toLowerCase())) {
        return response;
      }
    }

    // Check for greetings
    if (userText.includes('hello') || userText.includes('hi') || userText.includes('hey')) {
      return "Hello! How can I help you today? You can ask about our services, prices, or book an appointment. 😊";
    }

    // Check for pricing keywords
    if (userText.includes('price') || userText.includes('cost') || userText.includes('fee')) {
      return "Here are some of our popular service prices:\n\n🔬 Ultrasound: ₦2,500 - ₦50,000\n🧪 Lab Tests: Starting from ₦1,500\n📱 ECG: ₦12,000\n📷 X-Ray: ₦10,000+\n\nFor detailed pricing, please type 'price list' or contact us directly!";
    }

    // Check for booking keywords
    if (userText.includes('book') || userText.includes('appointment') || userText.includes('schedule')) {
      return "I'd be happy to help you book an appointment! For immediate booking, please:\n\n📱 WhatsApp: 08058135226\n📞 Call: 08058135226 / 07033600770\n\nOr you can continue here and I'll guide you through the process. What test would you like to book?";
    }

    // Default response
    return "Thank you for your message! For immediate assistance, please WhatsApp us at 08058135226 or call 07033600770. Our team is available 24/7 to help you. \n\nYou can also ask me about:\n• Service prices\n• Booking appointments\n• Our location\n• Working hours";
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/2348058135226?text=Hello! I would like to book a diagnostic test.', '_blank');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-medical-cyan to-medical-magenta text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">O.A.S.I.S. Assistant</CardTitle>
                <p className="text-sm text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-medical-cyan to-medical-magenta text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t bg-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <Button
                  key={index}
                  onClick={() => sendMessage(reply)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button 
                onClick={() => sendMessage(inputMessage)}
                className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-center mt-2">
              <Button
                onClick={openWhatsApp}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Continue on WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;