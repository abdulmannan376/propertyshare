import { useEffect, useState } from "react"

export const useMounted = () => {
    const [mounted, setMounted] = useState()
    // effects run only client-side
    // so we can detect when the component is hydrated/mounted
    // @see https://react.dev/reference/react/useEffect
    useEffect(() => {
        setMounted(true)
    })
    return mounted
}

export default function NoSsr({ children }) {
  const mounted = useMounted();
  if (!mounted) return null;
  return <>{children}</>;
}