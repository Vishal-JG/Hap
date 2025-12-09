import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';

interface ProfileButtonProps {
  onSignOut: () => void;  
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ onSignOut }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        style={styles.button}>
         <Image
          source={require('../assets/default-avatar.png')}
          style = {styles.avatar}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onSignOut();
              }}
            >
              <Text style={styles.menuItem}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const AVATAR_SIZE = 32;

const styles = StyleSheet.create({
  button: {
    marginRight: 12,
    borderRadius: AVATAR_SIZE / 2,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 120,
    marginTop: 30,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default ProfileButton;
