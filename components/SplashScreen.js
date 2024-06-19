import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/12/10/railroad-159321_1280.png' }}
        style={styles.image}
      />
      {/* Text */}
      <Text style={styles.title}>Live Running Status</Text>
      {/* Activity Indicator */}
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as per your app's theme
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20, // Adjust as needed
    resizeMode: 'contain', // Adjust the image's content mode
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SplashScreen;
