import {useEffect} from "preact/hooks";




/**
 * @function useIntersectionObserver
 * @param {}
 * @description sets an intersection observer on the input element and calls the onIntersect callback when the element intersects with the observer's root. The observer's will be removed with unmount
 */
const useIntersectionObserver = ({
                                     target,
                                     onIntersect,
                                     threshold = 1.0, rootMargin = '0px',
                                     enabled = true,
                                 }) => {
    useEffect(() => {
        if (!enabled) {
            return
        }
        const observer = new IntersectionObserver(
            entries =>
                entries.forEach(entry => entry.isIntersecting && onIntersect()),
            {
                rootMargin,
                threshold,
            }
        )

        const el = target && target.current

        if (!el) {
            return
        }

        observer.observe(el)

        return () => {
            observer.unobserve(el)
        }
    }, [target.current, enabled])
}

export default useIntersectionObserver