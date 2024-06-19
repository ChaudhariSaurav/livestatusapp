import React, { useState, useEffect } from 'react';
import { Card, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {  Image,  View, Text, StyleSheet } from 'react-native';

import FetchTrainData from './traindetails'; // Adjust import as per your file structure

const CardComponent = ({ navigation }) => {
  const [train, setTrain] = useState('');
  const [trainDetails, setTrainDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate an async operation like fetching initial data or checking auth status
    setTimeout(() => {
      setShowSplash(false); // Hide splash screen after timeout (replace with actual data loading logic)
    }, 3000); // Example: Hide after 3 seconds (adjust as needed)

  }, []);

  const fetchTrainDetails = async () => {
    if (!train || train.trim() === '') {
      setError('Train number should not be empty');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`https://railway-a3r5.onrender.com/getLtsDetails/${train}`);
      setLoading(false);

      if (!response.data || !response.data.trainName) {
        setError('No valid data found for the provided train number');
        setTrainDetails(null);
        setTrain('')
      } else {
        setTrainDetails(response.data);
        setTrain("")
      }
    } catch (error) {
      console.error('Error fetching train details:', error);
      setLoading(false);
      setError('Failed to fetch train details. Please try again.');
    }
  };


  const handleTextInputChange = (text) => {
    setTrain(text);
    setTrainDetails(null); // Clear train details when input changes
    setError(null); // Clear error when input changes
  };

  const handleSubmit = () => {
    // Check if the train number has at least 5 digits
    if (train.length < 5) {
      setError('Train number should have at least 5 digits');
      return;
    }

    fetchTrainDetails();
  };


  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Card style={{ margin: 16, padding: 16 }}>
          <TextInput
            style={{ marginBottom: 16 }}
            mode="outlined"
            label="Train Number"
            value={train}
            onChangeText={handleTextInputChange}
            placeholder="Please enter train number"
          />
          <Button
            mode="contained"
            onPress={handleSubmit}
            // disabled={train.length === 0 || train.length < 1}
            style={{ borderRadius: 0, backgroundColor: '#ab0000' }}
          >
            GET STATUS
          </Button>
         
        </Card>
        
        {loading ? (
          <ActivityIndicator animating={true} color="#ab0000" size={80} style={{ marginTop: 20 }} />
        ) : error ? (
          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : trainDetails ? (
          <FetchTrainData trainDetails={trainDetails} />
        ) : null}
      </View>


      <Button
        mode="contained"
        title="PNR Status"
        style={{ borderRadius: 0, backgroundColor: '#ab0000', margin: 16 }}
        onPress={() => navigation.navigate('Details')}
      >
        PNR STATUS
      </Button>
     
    </SafeAreaView>
  );
};

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/12/10/railroad-159321_1280.png' }}
        style={styles.image}
      />
      {/* Text */}
      <Text style={styles.title}>Live Running Status || Saurav Chaudhary</Text>
      {/* Activity Indicator */}
      <ActivityIndicator size="large" color="#ab0000" />
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
    width: 400,
    height: 400,
    marginBottom: 20, // Adjust as needed
    resizeMode: 'contain', // Adjust the image's content mode
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    marginTop:100,
    padding: 20,
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: '#f5c6cb',
    marginBottom: 20,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
});

export default CardComponent;
