'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'

const IncidentCard = ({ incident, onResolve }) => {
    const [isFadingOut, setIsFadingOut] = useState(false)

    const handleResolveClick = async () => {
        setIsFadingOut(true)

        try {
            await onResolve(incident.id)
        } catch (error) {
            console.error('Failed to resolve incident:', error)
            setIsFadingOut(false)
        }
    }

    const handleUnresolveClick = () => {
        setIsFadingOut(false)
        console.log("Incident not resolved locally")
    }

    if (incident.resolved) {
        return null
    }

    return (
        <div className={`flex gap-3 items-start ${isFadingOut ? 'opacity-0 transition-opacity duration-500 ease-out' : ''}`}>
            <img
                src={incident.image}
                alt="Incident Thumbnail"
                className='w-30 h-20 object-cover rounded-md' />

            <div className='flex-1'>
                <div className='flex items-center gap-2 font-bold text-white text-sm'>
                    <span>{incident.typeIcon}</span>
                    {incident.type}
                </div>

                <div className="mt-6">
                    <div className="flex items-center gap-1 text-xs text-gray-200 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                            <path fill="white" d="m6.03 12.03l2 3.47l-2.53 3.18L2 12.62zM17 18v-2.71c.88-.39 1.5-1.26 1.5-2.29c0-.57-.2-1.1-.53-1.5l1.97-1.15c1.01-.59 1.36-1.88.77-2.89l-1.38-2.4a2.125 2.125 0 0 0-2.89-.78L8.31 9c-.95.53-1.28 1.75-.73 2.71l1.5 2.6c.55.95 1.78 1.28 2.73.73l1.88-1.08c.25.59.72 1.07 1.31 1.33V18c0 1.1.9 2 2 2h5v-2z"/>
                        </svg>

                        {incident.camera}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-white mt-0.5">
                             <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                <g fill="none">
                                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/>
                                    <path fill="white" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"/>
                                </g>
                            </svg>

                        {incident.start} - {incident.end} on {incident.date}
                    </div>
                </div>
            </div>

            {!incident.resolved && (
                <Menu as="div" className="relative">
                    <MenuButton className="flex items-center text-yellow-400 text-sm hover:underline py-6">
                        <span className="ml-1">Resolve</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10 17l5-5l-5-5" />
                        </svg>
                    </MenuButton>

                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                        <MenuItem>
                            <button
                                onClick={handleResolveClick}
                                className="block w-full text-left px-4 py-2 text-sm font-semibold text-green-800 hover:bg-gray-100"
                            >
                                Incident Resolved
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            )}
        </div>
    )
}

export default IncidentCard
