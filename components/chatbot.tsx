"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm the Meraz AI Assistant. I can help you with information about events, registration, schedules, and answer any questions about the festival. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [size, setSize] = useState({ width: 400, height: 600 })
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("") // Clear input immediately for better UX
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. For immediate assistance, please contact us at meraz@iitbhilai.ac.in or call +91 771 2973 622.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(300, Math.min(800, window.innerWidth - e.clientX - 24))
      const newHeight = Math.max(400, Math.min(800, window.innerHeight - e.clientY - 24))
      setSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-[var(--galaxy-purple)] to-[var(--galaxy-pink)] rounded-full shadow-2xl border border-[var(--galaxy-purple)]/30 hover:border-[var(--galaxy-purple)]"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25 }}
            style={{
              width: window.innerWidth < 768 ? "90vw" : `${size.width}px`,
              height: `${size.height}px`,
            }}
            className="fixed bottom-24 right-6 z-50 glass border border-[var(--galaxy-purple)]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Resize Handle */}
            <div
              onMouseDown={handleMouseDown}
              className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize hover:bg-[var(--galaxy-purple)]/30 transition-colors rounded-tl-2xl group"
              title="Drag to resize"
            >
              <div className="absolute top-1 left-1 w-2 h-2 bg-gray-400 group-hover:bg-[var(--galaxy-purple)] rounded-full transition-colors"></div>
            </div>

            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--galaxy-purple)] to-[var(--galaxy-pink)] p-4 border-b border-[var(--galaxy-purple)]/30">
              <h3 className="text-lg font-bold text-white">Meraz AI Assistant</h3>
              <p className="text-sm text-gray-200">Ask me anything about the festival</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--galaxy-dark)]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-[var(--galaxy-purple)] to-[var(--galaxy-pink)] text-white"
                        : "glass border border-[var(--galaxy-purple)]/30"
                    }`}
                  >
                    <div className="text-sm prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          // Style markdown elements
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-[var(--galaxy-pink)]">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="ml-2">{children}</li>,
                          h1: ({ children }) => <h1 className="text-xl font-bold mb-2 text-[var(--galaxy-purple)]">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-[var(--galaxy-purple)]">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-md font-bold mb-1 text-[var(--galaxy-pink)]">{children}</h3>,
                          code: ({ children }) => <code className="bg-black/30 px-1 py-0.5 rounded text-[var(--galaxy-cyan)]">{children}</code>,
                          a: ({ children, href }) => <a href={href} className="text-[var(--galaxy-cyan)] underline hover:text-[var(--galaxy-pink)]" target="_blank" rel="noopener noreferrer">{children}</a>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass border border-[var(--galaxy-purple)]/30 p-3 rounded-2xl flex items-center gap-2">
                    <Loader2 className="animate-spin text-[var(--galaxy-purple)]" size={20} />
                    <span className="text-sm text-gray-300">searching for the stars...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[var(--galaxy-purple)]/30 bg-[var(--galaxy-dark)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full glass border border-[var(--galaxy-purple)]/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--galaxy-purple)] focus:border-[var(--galaxy-purple)]"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-gradient-to-r from-[var(--galaxy-purple)] to-[var(--galaxy-pink)] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
