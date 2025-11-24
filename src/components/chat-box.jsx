import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/partials/button";
import { Input } from "@/components/partials/input";
import { cn } from "@/lib/utils";
import { GoogleGenAI } from "@google/genai";
import { useApiContext } from "@/context/ApiContext";

const ChatBox = () => {
  const { profile, projects, skills, workExperience } = useApiContext();
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm an AI assistant. Ask me anything about Putra's skills, projects, or experience.",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateContext = () => {
    const hardSkills = skills?.hardSkills?.hardSkills || [];
    const softSkills = skills?.softSkills?.softSkills || [];
    
    return `
      You are a helpful AI assistant for Putra Christian.
      Your goal is to answer questions about Putra based on the following context, telling all good about Putra, promote Putra's skills, projects, and experience.
      
      PROFILE:
      Name: ${profile?.name || "Putra Christian"}
      Role: ${profile?.role || "Web Developer"}
      About: ${profile?.about || ""}
      
      SKILLS:
      Hard Skills: ${hardSkills.join(", ")}
      Soft Skills: ${softSkills.join(", ")}

      RESUME CONTENT:
      PUTRA CHRISTIAN
      +62882000000208 | putra3christian@gmail.com | linkedin.com/in/putra-christian | putrachristian.github.io
      Jakarta, Indonesia
      A dedicated Front-End Web Developer with over 5 years of experience in developing and implementing 
      interactive web app. Expertise in building large-scale web events and gamification features, specifically within the 
      gaming industry. Proficient in using React.js and other modern technologies to create engaging and responsive 
      user experiences.
      
      Work Experiences:
      PT. Garena Indonesia - Jakarta, Indonesia (Feb 2019 - Present)
      Associate Front End Web Developer
      - Fully responsible for the development and implementation of web events and gamification for major game titles such as Free Fire, AOV, and others.
      - Built user interfaces (UI) and client-side logic using React.js, Redux, and JavaScript (ES6+) to create seamless interactive experiences.
      - Collaborated with back-end developers, designers, and product managers.
      - Optimized performance and loading speed of web events.
      - Implemented web development best practices, clean code, Git, and responsive design.
      
      PT. Garena Indonesia - Jakarta, Indonesia (Aug 2018 - Jan 2019)
      Internship Front End Web Developer
      - Supported the development team in testing and debugging existing web events.
      - Assisted in the development of UI components and static web pages using HTML and CSS.
      
      Webinar & Workshop:
      - Create Your Own Personal Page with React JS (Mar 2021): Speaker. Conducted webinar with AMBIZ x HMIF ITB.
      - Belajar bikin game bareng Garena (Jun 2021): Speaker. Workshop by Skilvul and Garena.
      - How to Develop a Web Game (Feb 2024): Speaker. Guest Speaker for TERRATALKS Eps. 8 by Skilvul.
      
      Tech Stack:
      JavaScript (ES6+), HTML5, CSS3, React.js, Redux, Node.js, NextJS, Sass, Styled-Components, Git, npm/yarn/bun, RESTful APIs, SPA, Responsive Web Design, Performance Optimization, Cross-browser compatibility.
      
      INSTRUCTIONS:
      - Be polite, professional, and concise.
      - If the user asks about something not in this context, politely say you only answer information about Putra.
      - You are acting as a representative of Putra.
      - Do not make up facts, but you can promote Putra's skills, projects, and experience so client want hire Putra.
      - You can use Indonesian language to answer the user if user ask in Indonesian language.
      - Don't use very long sentence.
      - Don't use very long paragraph.
      - Don't use very long response.
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input?.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const systemInstruction = generateContext();
      
      // Build conversation history for context
      // The SDK expects 'user' and 'model' roles
      const historyContents = messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // Build conversation contents (only user and model messages, no system prompt in contents)
      const contents = [
        ...historyContents,
        { role: "user", parts: [{ text: userMessage.content }] },
      ];

      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      const text = response.text;

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please check your API key or try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-xl overflow-hidden shadow-lg flex flex-col h-[500px]">
      <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-full">
          <Sparkles size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Ask AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Ask anything about my work</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-background" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-8 px-4">
              <p>Hi! I'm an AI assistant. Ask me about my skills, projects, or experience.</p>
            </div>
          )}
          
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                m.role === "user" ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  m.role === "user" ? "chat-bubble-user" : "bg-muted text-muted-foreground"
                )}
              >
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={cn(
                  "p-3 rounded-lg text-sm",
                  m.role === "user"
                    ? "chat-bubble-user"
                    : "bg-muted text-foreground"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-muted text-foreground p-3 rounded-lg flex items-center">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
