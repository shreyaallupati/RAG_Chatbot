import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import {Button} from "./ui/button"
import Link from 'next/link'
import { Minus, SeparatorVertical } from 'lucide-react'

export const Navigation = () => {
    return (
        <div className="border-b border-[var(--foreground)]/10">
            <div className='flex containerh-16 items-center justify-between px-4 mx-auto p-3'>
                <div className='flex-row flex gap-4'>
                    {/* <div className='text-xl font-semibold p-1 pr-0'>RAG Chatbot</div> */}
                    <Link href="/" className='text-xl font-semibold p-1 pr-0'>RAG Chatbot</Link>
                    <div className='p-1 align-center rotate-90 text-zinc-300'>
                    <Minus></Minus>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link href="/chat" className='text-md font-medium border p-1.5 rounded-sm hover:bg-gray-50 hover:shadow-sm transition-all duration-150'>Chatbot</Link>
                        <Link href="/upload" className='text-md font-medium border p-1.5 rounded-sm hover:bg-gray-50 hover:shadow-sm transition-all duration-150'>Upload PDF</Link>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button variant="ghost">Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <Button variant="outline">Sign Out</Button>
                        </SignOutButton>
                        <UserButton/>
                    </SignedIn>
                </div>
            </div>
        </div>
    )
};