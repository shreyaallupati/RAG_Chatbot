# 🧠 Gemini RAG Chatbot

A high-performance Retrieval-Augmented Generation (RAG) application built with **Next.js**, leveraging **Google Gemini** for intelligent responses and **Neon DB** for scalable vector storage.

## 🚀 Overview

This chatbot doesn't just chat—it remembers. By vectorizing your documents and storing them in a PostgreSQL database (via Neon), the bot can retrieve relevant context to provide accurate, grounded answers using the latest LLM capabilities.

### Key Tech Stack

  * **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
  * **LLM:** `gemini-2.5-flash` for fast, multimodal reasoning.
  * **Embeddings:** `text-embedding-004` for high-dimensional vectorization.
  * **Vector Database:** [Neon DB](https://neon.tech/) with `pgvector`.
  * **Styling:** Tailwind CSS.

-----

## ✨ Features

  * **Semantic Search:** Uses Google's state-of-the-art embedding model to understand context, not just keywords.
  * **Fast Inference:** Powered by Gemini 2.5 Flash for near-instant response times.
  * **Serverless Vector Storage:** Neon DB provides a serverless PostgreSQL experience with built-in vector support.
  * **Streaming UI:** Real-time message streaming for a smooth, ChatGPT-like experience.

-----

## 🛠️ Getting Started

### 1\. Prerequisites

  * A [Google AI Studio](https://aistudio.google.com/) API Key.
  * A [Neon.tech](https://neon.tech/) PostgreSQL connection string.

### 2\. Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here
DATABASE_URL=your_neon_connection_string_here
CLERK_SECRET_KEY=your_clerk_secret_key_for_auth
NEON_DATABASE_URL=your_neon_db_url
```

### 3\. Installation & Development

```bash
# Install dependencies
npm install

# Run the migration to set up pgvector on Neon
# (If you have a setup script)
npm run db:setup 

# Start the dev server
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to start chatting with your data.

-----

## 🏗️ Architecture

1.  **Ingestion:** Documents are split into chunks and converted into vectors using `text-embedding-004`.
2.  **Storage:** Vectors and metadata are stored in **Neon DB** using the `pgvector` extension.
3.  **Retrieval:** When a user asks a question, the app generates a query embedding and performs a cosine similarity search in SQL.
4.  **Generation:** The retrieved context + user prompt are sent to **Gemini 2.5 Flash** to generate the final response.

-----

*Built with ❤️ for the next generation of AI-driven apps.*
