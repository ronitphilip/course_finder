import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";
import SERVER_URL from "./services/serverURL";

function ChatBot() {
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [csrfToken, setCsrfToken] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        axios.get(`${SERVER_URL}/csrf/`)
            .then(response => setCsrfToken(response.data.csrfToken))
            .catch(error => console.error("CSRF token fetch error", error));
    }, []);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { text: userInput, sender: "user" }];
        setMessages(newMessages);
        setUserInput("");

        try {
            const response = await axios.post(`${SERVER_URL}/chatbot/`, { userInput });
            console.log('response:', response);

            if (response.data.response) {
                setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
            }
        } catch (error) {
            console.log(error);
            setMessages([...newMessages, { text: "Error getting response", sender: "bot" }]);
        }
    };

    return (
        <div>
            {/* Floating Chat Button */}
            {!isActive && (
                <button 
                    onClick={() => setIsActive(true)} 
                    className="fixed z-10 bottom-6 right-6 bg-blue-500 text-white p-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition flex items-center gap-2">
                    <MessageCircle size={24} />
                    <span className="hidden md:block">Chat</span>
                </button>
            )}

            {/* Chat UI */}
            {isActive && (
                <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg flex flex-col h-120 border border-gray-300">
                    {/* Chat Header */}
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
                        <span className="font-bold">ChatBot</span>
                        <button onClick={() => setIsActive(false)} className="text-white text-lg cursor-pointer">&times;</button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-2 max-w-xs rounded-lg text-sm ${msg.sender === "user" 
                                    ? "bg-blue-500 text-white ml-auto self-end" 
                                    : "bg-gray-200 text-gray-800 self-start"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t flex items-center gap-2 text-black">
                        <input
                            type="text"
                            className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Type a message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatBot;
