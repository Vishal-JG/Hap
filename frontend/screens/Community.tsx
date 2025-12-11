import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommunityChat from '../components/CommunityChat';
import type { CommunityStackParamList } from './CommunityStack';

type NavProp = NativeStackNavigationProp<CommunityStackParamList, 'CommunityHome'>;

const Community = () => {
  const navigation = useNavigation<NavProp>();

  const groups = [
    {
      id: 1,
      title: 'Sports',
      tagline: 'Connect with fellow sports enthusiasts',
      members: 1247,
      icon: '⚽',
      lastActivity: '2 min ago'
    },
    {
      id: 2,
      title: 'Music Festival',
      tagline: 'Live music and festival vibes',
      members: 892,
      icon: '🎵',
      lastActivity: '15 min ago'
    },
    {
      id: 3,
      title: 'Foodies',
      tagline: 'Discover amazing food spots',
      members: 2156,
      icon: '🍜',
      lastActivity: '1 hour ago'
    },
    {
      id: 4,
      title: 'Animal Lovers',
      tagline: 'Reptile lovers and exotic shows',
      members: 687,
      icon: '🐍',
      lastActivity: '3 hours ago'
    },
  ];

  const openThread = (topic: string) => {
    navigation.navigate('CommunityThread', { topic });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {groups.map((group) => (
          <CommunityChat
            key={group.id}
            title={
              <>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{group.icon}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.groupTitle}>{group.title}</Text>
                  <Text style={styles.tagline}>{group.tagline}</Text>
                  <View style={styles.footer}>
                    <Text style={styles.activity}>{group.lastActivity}</Text>
                    <Text style={styles.members}>{group.members.toLocaleString()} members</Text>
                  </View>
                </View>
              </>
            }
            onPress={() => openThread(group.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 0,
    paddingTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EDEDED',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EDEDED',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activity: {
    fontSize: 12,
    color: '#888',
  },
  members: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});

export default Community;
