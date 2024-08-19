import LoginPageComponent from '@/components/login/pageComponent'
import { SocketProvider } from '@/hooks/useSocket'
import React from 'react'

const Page = () => {
  return (
    <SocketProvider>
      <LoginPageComponent/>
    </SocketProvider>
  )
}

export default Page