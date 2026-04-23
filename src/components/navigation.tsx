import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { Button } from "./ui/button"
import Link from 'next/link'
import { Minus } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export const Navigation = () => {
    // Added bg-background/50 and backdrop-blur-md for better readability over the animation
    return (
        <div className="border-b border-(--foreground)/10 bg-background/50 backdrop-blur-md sticky top-0 z-50">
            <div className='flex container h-16 items-center justify-between px-4 mx-auto p-3'>
                <div className='flex-row flex gap-4 items-center'>
                    <Link href="/" className='text-xl font-semibold p-1 pr-0'>RAG Chatbot</Link>
                    <div className='p-1 align-center rotate-90 text-zinc-300'>
                        <Minus />
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link href="/upload" className='text-md font-medium border p-1.5 rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-150'>Upload PDF</Link>
                        <Link href="/chat" className='text-md font-medium border p-1.5 rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-150'>Chatbot</Link>   
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    {/* Dark Mode Toggle Button */}
                    <ThemeToggle />
                    
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost">Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button variant="ghost">Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton redirectUrl="/">
                            <Button variant="outline">Sign Out</Button>
                        </SignOutButton>
                        <UserButton afterSignOutUrl="/"/>
                    </SignedIn>
                </div>
            </div>
        </div>
    )
};