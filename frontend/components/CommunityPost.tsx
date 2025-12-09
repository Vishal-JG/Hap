import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

type EventBoxProps = {
  image: string;
  location: string;
  date: string;
  time: string;
  title: string;
  votes: number;
  onPress?: () => void;
  onUpvote: () => void;
  onDownvote: () => void;
};

const EventBox: React.FC<EventBoxProps> = ({
  image,
  location,
  date,
  time,
  title,
  votes,
  onPress,
  onUpvote,
  onDownvote,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.box,
      pressed && styles.pressedContainer,
    ]}
  >
    <View style={styles.mainContent}>
      {/* Left side: Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      {/* Right side: Title and details */}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.location}>{location}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.time}> · {time}</Text>
        </View>
      </View>
    </View>

    {/* Bottom: Vote controls */}
    <View style={styles.voteContainer}>
      <Pressable style={styles.voteButton} onPress={onUpvote}>
        <Text style={styles.upvoteText}>↑</Text>
      </Pressable>
      <Text style={styles.voteCount}>{votes}</Text>
      <Pressable style={styles.voteButton} onPress={onDownvote}>
        <Text style={styles.downvoteText}>↓</Text>
      </Pressable>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 24,
    backgroundColor: '#1C1C1C',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#00FFC6',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 6,
  },
  mainContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageContainer: {
    flex: 0.35, // ~35% width for image
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,255,198,0.4)',
  },
  image: {
    width: '100%',
    height: 100,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 4,
    flexShrink: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    color: '#00FFC6',
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    color: '#AAAAAA',
    fontSize: 13,
  },
  time: {
    color: '#A070FF',
    fontSize: 13,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  voteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upvoteText: {
    color: '#00FFC6',
    fontSize: 18,
    fontWeight: '700',
  },
  downvoteText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '700',
  },
  voteCount: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  pressedContainer: {
    shadowOpacity: 0.8,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default EventBox;
