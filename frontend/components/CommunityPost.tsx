import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

type CommunityPostProps = {
  image: string;
  location: string;
  date: string;
  time: string;
  title: string;
  votes: number;
  user: string;
  onPress?: () => void;
};

const CommunityPost: React.FC<CommunityPostProps> = ({
  image,
  location,
  date,
  time,
  title,
  votes,
  user,
  onPress,
}) => {
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
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.location}>{location}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}> · {time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footerRow}>
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

        <Text style={styles.username}>{user}</Text>
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
    marginBottom: 10, // reduced to make room
  },
  imageContainer: {
    flex: 0.8,       // make image take more width
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,255,198,0.4)',
  },
  image: {
    width: 200,
    height: 150,      // taller image
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#EDEDED',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 6,
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
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 6,
    marginTop: 4,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // left-justify voting UI
  },
  voteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
  },
  voteIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  voteIconUpActive: {
    color: '#00FFC6',
  },
  voteIconDownActive: {
    color: '#FF7F7F',
  },
  voteCount: {
    color: '#EDEDED',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 6,
    minWidth: 24,
    textAlign: 'center',
  },
  username: {
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right', // right-justify username
  },
  pressedContainer: {
    shadowOpacity: 0.8,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#181818',
  },
});

export default CommunityPost;
