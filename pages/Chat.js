import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [keyboardEnabled, setKeyboardEnabled] = useState(true);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi there! Thank you for using SUCCess, the first app that you download after the ORD counter\nI a chatbot and will tailor my response based on your profile.\nYou can ask me anything that you want to know about how to best use of your time!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SUCCess",
          avatar:
            "https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp",
        },
      },
    ]);
  }, []);

  async function onSend(newMessages) {
    setKeyboardEnabled(false);
    try {
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, newMessages)
      );
      const lastMessage = newMessages[0].text;
      const url = `http://3.95.216.190/prompt?prompt=${encodeURIComponent(
        lastMessage
      )}`;
      const llmResponse = await fetch(url)
        .then((response) => response.text())
        .catch((error) => {
          (response) => "Error connecting to server";
        });
      const responseMessage = {
        _id: Math.round(Math.random() * 1000000).toString(),
        text: llmResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "SUCCess",
          avatar:
            "https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp",
        },
      };
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [responseMessage])
      );
      setKeyboardEnabled(true);
    } catch (error) {
      setKeyboardEnabled(true);
    }
  }

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode={keyboardEnabled ? "none" : "interactive"}
      />

      {!keyboardEnabled && <View style={styles.overlay} />}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export { Chat };
