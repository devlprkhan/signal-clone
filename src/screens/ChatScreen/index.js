import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import styles from './styles'
const ChatScreen = ({ navigation, route }) => {

  // States for Input
  const [input, setInput] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Avatar rounded source={{ uri: "https://images.unsplash.com/photo-1523253112282-26697ead8398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80" }} />
          <Text
            style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
          >{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.topIcon}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  // Send message function
  const sendMessage = () => { }

  return (
    <SafeAreaView style={{ flex: 1, borderRightColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>
            {/* Chats Goes Here */}
          </ScrollView>
          {/* Footer */}
          <View style={styles.footer}>
            <TextInput
              value={input}
              onChangeText={text => setInput(text)} placeholder='Message'
              style={styles.input}
            />
            <TouchableOpacity style={styles.bottomInput} onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name='send' size={24} color="#2b68e6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen