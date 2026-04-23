import { embed, embedMany } from "ai";
import { google } from '@ai-sdk/google';

// Helper function to pause execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateEmbedding(text: string) {
    const input = text.replace(/\n/g, " ");

    const { embedding } = await embed({
        model: google.textEmbeddingModel('gemini-embedding-001'), 
        value: input,
        // Move outputDimensionality here to avoid TypeScript errors
        providerOptions: {
            google: {
                outputDimensionality: 768
            }
        }
    });

    return embedding;
}

export async function generateEmbeddings(texts: string[]) {
    const inputs = texts.map((text) => text.replace(/\n/g, " "));
    
    const BATCH_SIZE = 90; 
    const allEmbeddings: number[][] = [];

    for (let i = 0; i < inputs.length; i += BATCH_SIZE) {
        const batch = inputs.slice(i, i + BATCH_SIZE);
        let success = false;
        let attempts = 0;

        while (!success && attempts < 5) {
            try {
                const { embeddings } = await embedMany({
                    model: google.textEmbeddingModel('gemini-embedding-001'), 
                    values: batch,
                    // Move outputDimensionality here to avoid TypeScript errors
                    providerOptions: {
                        google: {
                            outputDimensionality: 768
                        }
                    }
                });
                
                allEmbeddings.push(...embeddings);
                success = true;

                if (i + BATCH_SIZE < inputs.length) {
                    console.log(`Processed ${allEmbeddings.length}/${inputs.length} chunks. Waiting 60s for API rate limits to reset...`);
                    await delay(60000); 
                }

            } catch (error: any) {
                attempts++;
                
                const match = error.message?.match(/retry in (\d+\.?\d*)s/);
                
                if (match && match[1]) {
                    const waitMs = Math.ceil(parseFloat(match[1]) * 1000) + 1000; 
                    console.log(`Rate limited by Google! Pausing for ${waitMs / 1000} seconds...`);
                    await delay(waitMs);
                } else {
                    console.log(`Rate limited! Pausing for 60 seconds...`);
                    await delay(60000);
                }

                if (attempts >= 5) {
                    throw new Error("Failed to generate embeddings after 5 attempts due to persistent rate limits.");
                }
            }
        }
    }

    return allEmbeddings;
}