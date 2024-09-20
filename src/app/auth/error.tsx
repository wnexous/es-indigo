'use client' // Error boundaries must be Client Components

import If from '@/components/if'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    useEffect(() => {
        reset
    }, [error])

    return (
        <div className='flex flex-col gap-8'>
            <details open className='flex flex-col gap-4'>
                <summary className='text-3xl'>
                    Something went wrong!
                </summary>
                <div className='p-4 rounded-md bg-neutral-800 flex flex-col gap-4'>
                    <If conditional={!!error.name}>
                        <h1 className='font-bold text-2xl'>name</h1>
                        <span>{error.name}</span>
                    </If>

                    <If conditional={!!error.message}>
                        <h1 className='font-bold text-2xl'>Message</h1>
                        <span>{error.message}</span>
                    </If>
                    <If conditional={!!error.digest}>
                        <h1 className='font-bold text-2xl'>digest</h1>
                        <span>{error.digest}</span>
                    </If>
                    <If conditional={!!error.stack}>
                        <h1 className='font-bold text-2xl'>stack</h1>
                        <span>{error.stack}</span>
                    </If>

                </div>
            </details>
            <div className='flex gap-4 justify-end'>
                <a
                    className='p-4 rounded-md border'
                    href='/'>
                    Return to homepage
                </a>
                <button
                    className='p-4 rounded-md gradient-2 '
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button>

            </div>
        </div>
    )
}