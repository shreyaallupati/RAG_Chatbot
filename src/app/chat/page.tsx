"use client";

import { useState, Fragment, useEffect } from "react";
import {useChat} from "@ai-sdk/react";

import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputFooter,
    PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {Loader} from "@/components/ai-elements/loader";


export default function RAGChatBot(){

    const [input, setInput] = useState("");
    const {messages, sendMessage, status, error} = useChat();

    useEffect(() => {
        if (error) {
            console.error("Chat error:", error);
        }
    }, [error]);

    const handleSubmit = (message: PromptInputMessage) => {
        if (!message.text) return;
        console.log("Submitting message:", message.text);
        sendMessage({text: message.text });
        setInput("");
    }

    return (<div className="max-w-4xl mx-auto p-6 relative flex flex-col h-[calc(100dvh-4rem)]">
        <div className="flex-1 flex flex-col border rounded-xl shadow-lg pointer-events-auto bg-background/80 backdrop-blur-md overflow-hidden">
            <Conversation className="h-full">
                <ConversationContent>
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-zinc-400">
                            <p>Start a conversation by typing a message below</p>
                        </div>
                    ) : (
                        messages.map((message, msgIndex) => {
                            console.log(`Rendering message ${msgIndex}:`, message);
                            return (
                                <div key={`msg-${msgIndex}`}>
                                    {message.parts && message.parts.length > 0 ? (
                                        message.parts.map((part, partIndex) => {
                                            if (part.type === "text") {
                                                return (
                                                    <Fragment key={`${msgIndex}-${partIndex}`}>
                                                        <Message from={message.role}>
                                                            <MessageContent>
                                                                <MessageResponse>{part.text}</MessageResponse>
                                                            </MessageContent>
                                                        </Message>
                                                    </Fragment>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        <div className="text-zinc-500 text-sm">Empty message</div>
                                    )}
                                </div>
                            );
                        })
                    )}
                    {status === "streaming" && <Loader />}
                    {error && (
                        <div className="text-red-500 text-sm mt-4 p-4 bg-red-50 dark:bg-red-950 rounded">
                            Error: {error.message}
                        </div>
                    )}
                </ConversationContent>
                <ConversationScrollButton />
            </Conversation>
            <PromptInput onSubmit={handleSubmit} className="mt-4">
                <PromptInputBody>
                    <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)}/>
                </PromptInputBody>
                <PromptInputFooter>
                    <PromptInputTools>
                        {/* model selector, web search etc */}
                    </PromptInputTools>
                    <PromptInputSubmit />
                </PromptInputFooter>
            </PromptInput>
        </div>
    </div>);
}