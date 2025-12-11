import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type Message = {
  id: string;
  text: string;
  from: 'bot' | 'user';
};

const AIPlanner = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi! How can I help you today?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      from: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'This is a mock bot reply.',
      from: 'bot',
    };
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.from === 'user';
    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.messageRowRight : styles.messageRowLeft,
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleBot,
          ]}
        >
          <Text style={isUser ? styles.textUser : styles.textBot}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // background
  },
  listContent: {
    padding: 12,
    paddingBottom: 80,
  },
  messageRow: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24, // rounded-hap
  },
  bubbleBot: {
    backgroundColor: '#1C1C1C', // surface
    borderWidth: 1,
    borderColor: '#A070FF', // neonViolet
    shadowColor: '#A070FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bubbleUser: {
    backgroundColor: '#1C1C1C', // neonTeal
    borderWidth: 1,
    borderColor: '#00FFC6',
    shadowColor: '#00FFC6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textBot: {
    color: '#EDEDED', // text
  },
  textUser: {
    color: '#EDEDED', // background for contrast on neon
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#2A2A2A',
    backgroundColor: '#1C1C1C', // surface
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#121212',
    color: '#EDEDED',
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#FF6F61', // neonCoral
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sendText: {
    color: '#121212',
    fontSize: 16,
  },
});

export default AIPlanner;
