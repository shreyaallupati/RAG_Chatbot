import { streamText, UIMessage, convertToModelMessages, tool, InferUITools, UIDataTypes } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import {z} from "zod";
import {searchDocuments} from "@/lib/search";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, 
});

const tools = {
    searchKnowledgeBase : tool({
        description: "Search the knowledge base for relevant information",
        inputSchema : z.object({
            query: z.string().describe("The search query to find relevant information"),
        }),
        execute: async({query})=> {
            try{
                const results = await searchDocuments(query, 3, 0.5);
                if(results.length ===0){
                    return "No relevant information found";
                }

                const formattedResults = results
                    .map((r,i)=> `[${i+1}] ${r.content}`)
                    .join("\n\n");
                return formattedResults;
            }catch(error){
                console.log("search error:",error);
                return "Error searching the knowledge base";
            }
        },
        })

}

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;



export async function POST(req: Request) {
    try{
        const body = await req.json();
        const messages = body.messages || [];
        
        console.log('Received messages:', messages);
        
        if (!messages || messages.length === 0) {
            console.error('No messages received');
            return new Response(JSON.stringify({ error: 'No messages provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Convert UI messages to model messages
        const modelMessages = convertToModelMessages(messages);
        console.log('Converted model messages:', modelMessages);
        
        const result = streamText({
            model : google("gemini-3-flash-preview"),
            messages : modelMessages,
            tools,
            system : `You are a helpful assistant with access to a knowledge base. 
                When users ask questions, search the knowledge base for relevant information.
                Always search before answering if the question might relate to uploaded documents.
                Base your answers on the search results when available. Give concise answers that correctly answer what the user is asking for. Do not flood them with all the information from the search results.`,
        });

        console.log('Stream created');
        return result.toUIMessageStreamResponse();
    }
    catch(error){
        console.error("Error Streaming chat completion:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        return new Response(JSON.stringify({ error: 'Failed to stream chat completion', details: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}