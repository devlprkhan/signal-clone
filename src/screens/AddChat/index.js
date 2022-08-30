import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button, Input } from 'react-native-elements'

const AddChat = ({navigation}) => {

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Add a new chat",
        headerBackTitle: "Chats"
      })
    }, [])

  return (
    <View style={styles.container}>
      <Text>Add Chat to Screen</Text>
    </View>
  )
}

export default AddChat