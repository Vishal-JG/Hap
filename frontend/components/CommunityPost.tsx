import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

type CommunityPostProps = {
  image: string;
  location: string;
  date: string;
  time: string;
  title: string;
  votes: number;          // hardcoded starting value
  onPress?: () => void;
};

const CommunityPost: React.FC<CommunityPostProps> = ({
  image,
  location,
  date,
  time,
  title,
  votes,
  onPress,
}) => {
  // 👇 use the prop ONCE as initial value
  const [currentVotes, setCurrentVotes] = useState<number>(votes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setCurrentVotes(v => v - 1);
      setUserVote(null);
      return;
    }
    if (userVote === 'down') {
      setCurrentVotes(v => v + 2);
    } else {
      setCurrentVotes(v => v + 1);
    }
    setUserVote('up');
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setCurrentVotes(v => v + 1);
      setUserVote(null);
      return;
    }
    if (userVote === 'up') {
      setCurrentVotes(v => v - 2);
    } else {
      setCurrentVotes(v => v - 1);
    }
    setUserVote('down');
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.box,
        pressed && styles.pressedContainer,
      ]}
    >
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>

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

      <View style={styles.voteContainer}>
        <Pressable onPress={handleUpvote} style={styles.voteButton}>
          <Text
            style={[
              styles.voteIcon,
              userVote === 'up' && styles.voteIconUpActive,
            ]}
          >
            ↑
          </Text>
        </Pressable>

        {/* 👇 ALWAYS render currentVotes, not props.votes */}
        <Text style={styles.voteCount}>{currentVotes}</Text>

        <Pressable onPress={handleDownvote} style={styles.voteButton}>
          <Text
            style={[
              styles.voteIcon,
              userVote === 'down' && styles.voteIconDownActive,
            ]}
          >
            ↓
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

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
    marginBottom: 18,
  },
  imageContainer: {
    flex: 0.35,
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
    paddingVertical: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  voteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  },
  voteIcon: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FFFFFF',          // white when unpressed
  },
  voteIconUpActive: {
    color: '#00FFC6',          // green/teal when upvoted
  },
  voteIconDownActive: {
    color: '#FF7F7F',          // coral when downvoted
  },
  voteCount: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  pressedContainer: {
    shadowOpacity: 0.8,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default CommunityPost;
