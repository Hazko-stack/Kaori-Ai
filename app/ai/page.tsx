"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import DOMPurify from "dompurify";
import { Send, Loader } from "lucide-react";

interface Message {
  type: "user" | "ai";
  content: string;
}

const models = [
  "qwen-2.5-32b",
  "Deepseek-r1-distill-qwen-32b",
  "DeepSeek-R1-Distill-Llama-70b",
];

export default function AI() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>(models[0]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userMessage.trim()) return;

    try {
      setIsLoading(true);
      const sanitizedUserMessage = DOMPurify.sanitize(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: sanitizedUserMessage },
      ]);
      setUserMessage("");

      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: sanitizedUserMessage, model: selectedModel }),
      });

      const data = await res.json();
      const sanitizedAiResponse = DOMPurify.sanitize(data.content);

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: sanitizedAiResponse },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="p-4 bg-gray-800 shadow-md text-center font-semibold text-lg">
        かおり AI
      </header>

      <div className="p-4">
        <label htmlFor="model-select" className="block text-sm text-gray-400 mb-2">
          Choose AI Model:
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[75%] ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-lg bg-gray-800 text-gray-300 animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Shift+Enter to send)"
            rows={1}
            className="w-full p-3 rounded-lg bg-gray-800 text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !userMessage.trim()}
            className={`ml-3 p-3 rounded-lg ${isLoading || !userMessage.trim() ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </form>
    </div>
  );
}
