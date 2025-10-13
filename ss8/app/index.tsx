import Ex1 from '@/components/exercises/Ex1'
import Ex2 from '@/components/exercises/Ex2'
import Ex3 from '@/components/exercises/Ex3'
import Ex4 from '@/components/exercises/Ex4'
import Ex5 from '@/components/exercises/Ex5'
import Ex6 from '@/components/exercises/Ex6'
import Ex7 from '@/components/exercises/Ex7'
import Ex8 from '@/components/exercises/Ex8'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomePage() {
  return (
    <SafeAreaView>
      <Ex1 />
      <Ex2 />
      <Ex3 />
      <Ex4 />
      <Ex5 />
      <Ex6 />
      <Ex7 />
      <Ex8 />
    </SafeAreaView>
  )
}
