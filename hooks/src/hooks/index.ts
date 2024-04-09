import { useEffect, useRef, useState } from "react"


export const useClickOutSide = () => {
    const ref = useRef<HTMLElement>(null)
    const [isClickedOutside, setIsClickedOutside] = useState(false)


    useEffect(() => {
        const clickedOutside = (e: any) => {
            if (!ref?.current?.contains(e?.target)) {
                setIsClickedOutside(true)
            } else {
                setIsClickedOutside(false)
            }
        }

        const EVENTS = ["mousedown", "touchstart"]
        EVENTS.forEach(e => document.addEventListener(e, clickedOutside, true))
        return () => EVENTS.forEach(e => document.removeEventListener(e, clickedOutside, true))
    }, [])

    return [ref, isClickedOutside] as const
}

export function useClickAway<T extends HTMLElement>(handler: () => void) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const clickedOutside = (e: any) => {
            if (!ref?.current?.contains(e?.target as Node)) {
                handler()
            } 
        }
        
        const EVENTS = ["mousedown", "touchstart"]
        EVENTS.forEach(e => document.addEventListener(e, clickedOutside, true))
        return () => EVENTS.forEach(e => document.removeEventListener(e, clickedOutside, true))
    }, [])

    return ref
}
