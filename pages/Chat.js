// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

function Chat(){
  const [messages, setMessages] = React.useState([]);
  const onSend = React.useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  return <GiftedChat
        messages={messages}
        onSend={onSend}
        user={'user'}
      />;
}

export { Chat };
