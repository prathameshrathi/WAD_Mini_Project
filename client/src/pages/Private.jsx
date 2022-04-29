import { Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout, setAuth } from '../redux/auth/slice'

const Private = () => {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(logout())
  }
  return (
    <VStack>
      <Text>This is private page</Text>
      <Button onClick={onClick}>Logout</Button>
    </VStack>
  )
}

export default Private