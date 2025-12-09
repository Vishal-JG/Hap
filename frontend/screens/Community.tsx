import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CommunityChat from '../components/CommunityChat';
import type { CommunityStackParamList } from './CommunityStack';

type NavProp = NativeStackNavigationProp<
  CommunityStackParamList,
  'CommunityHome'
>;

const Community = () => {
  const navigation = useNavigation<NavProp>();

  const openThread = (topic: string) => {
    navigation.navigate('CommunityThread', { topic });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ScrollView>
        <CommunityChat title="Sports" onPress={() => openThread('Sports')} />
        <CommunityChat
          title="Music Festival"
          onPress={() => openThread('Music Festival')}
        />
        <CommunityChat title="Foodies" onPress={() => openThread('Foodies')} />
        <CommunityChat
          title="Snake Show"
          onPress={() => openThread('Snake Show')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Community;
