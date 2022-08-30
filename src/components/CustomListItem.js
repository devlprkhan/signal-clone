import React from 'react'
import { View, Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar 
      rounded
      source={{
        uri: "https://images.unsplash.com/photo-1523253112282-26697ead8398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80"
      }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800"}}>Haseeb Khan</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">Lorem Ipsum fsdjhjksf sdfjhsdfjh hsjkfhjksdhfhkj</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem