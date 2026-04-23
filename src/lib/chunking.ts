import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = new RecursiveCharacterTextSplitter({
    // Increase chunk size to 1000 characters (roughly 200-250 words)
    chunkSize: 1000, 
    
    // Increase overlap to maintain context between chunks
    chunkOverlap: 200, 
    
    // REMOVE your custom separators array! 
    // By default, Langchain intelligently splits by paragraphs ("\n\n"), 
    // then newlines ("\n"), then spaces (" "). 
    // Forcing it to only split by spaces creates messy chunks.
});

export async function chunkContent(content: string){
    return await textSplitter.splitText(content.trim());
}