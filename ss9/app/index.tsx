import PhoneApp from '@/components/PhoneApp'
import { PhoneBookProvider } from '@/context/PhoneBookContext'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomePage() {
  return (
    <SafeAreaView>
        <PhoneBookProvider>  
            <PhoneApp />
        </PhoneBookProvider>
    </SafeAreaView>
  )
}
