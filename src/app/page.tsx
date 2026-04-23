import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          RAG Chatbot
        </div>
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left grow justify-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Welcome to RAG Chatbot
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              An intelligent chatbot powered by Retrieval-Augmented Generation (RAG). Upload documents and have natural conversations with AI-powered answers based on your content.
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 dark:bg-blue-950 rounded">
              <h2 className="font-semibold text-black dark:text-zinc-50 mb-2">
                Chatbot
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Start a conversation with the RAG chatbot. Ask questions about your uploaded documents and get intelligent, context-aware responses.
              </p>
              <Link
                href="/chat"
                className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500"
              >
                Open Chatbot
              </Link>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 dark:bg-green-950 rounded">
              <h2 className="font-semibold text-black dark:text-zinc-50 mb-2">
                Upload PDF
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Upload PDF documents to your knowledge base. These documents will be processed and indexed for the chatbot to reference during conversations.
              </p>
              <Link
                href="/upload"
                className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 dark:hover:bg-green-500"
              >
                Upload PDF
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
