import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Card, TextInput, Title, Button } from 'react-native-paper';
import axios from 'axios';

const PNRStatusComponent = () => {
  const [pnr, setPnr] = useState('');
  const [pnrData, setPnrData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const handlePNRSubmit = async () => {
    try {
      if (!pnr || pnr.length !== 10) {
        setError('Please enter a valid 10-digit PNR number');
        return;
      }

      setLoading(true); // Set loading to true when submitting PNR
      setError(null); // Clear any previous errors

      const response = await axios.get(`https://www.trainman.in/services/getPredictPnr?pnr=${pnr}&key=012562ae-60a9-4fcd-84d6-f1354ee1ea48`);
      
      setLoading(false); // Set loading to false after response is received

      if (response.data && response.data.pnr_data && response.data.pnr_data.train_code) {
        setPnrData(response.data);
        setPnr(""); // Clear input after successful fetch
      } else {
		setPnr("");
        setError('No valid data found for the provided PNR number');
      }
    } catch (error) {
      console.error('Error fetching PNR status:', error);
      setError('Failed to fetch PNR status. Please try again.');
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Card style={styles.card}>
        <Card.Content>
          {/* <Title style={styles.title}>Enter PNR Number</Title> */}
          <TextInput
            style={styles.input}
            mode="outlined"
            label="PNR Number"
            placeholder="Enter 10-digit PNR number"
            keyboardType="numeric"
            value={pnr}
			maxLength={10}
            onChangeText={setPnr}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handlePNRSubmit}
          >
            Get PNR Status
          </Button>
        </Card.Content>
      </Card>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color="#ab0000" size={70} />
          <Text style={{ marginTop: 10 }}>Fetching PNR status...</Text>
        </View>
      )}

      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ScrollView>
        {pnrData && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Title style={styles.resultTitle}>PNR Status Details</Title>
              <View style={styles.row}>
                <Text style={styles.label}>PNR Number:</Text>
                <Text style={styles.value}>{pnrData.pnr}</Text>
              </View>
              <View style={styles.hr} />
              {pnrData.pnr_data && pnrData.pnr_data.train_code ? (
                <>
                  <View style={styles.row}>
                    <Text style={styles.label}>Train Name:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data.train_code} - {pnrData.pnr_data.train_name} </Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Text style={styles.label}>From:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data.from_full} ({pnrData.pnr_data.from})</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Text style={styles.label}>To:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data.to_full} ({pnrData.pnr_data.to})</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Text style={styles.label}>Class:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data.class} - {pnrData.pnr_data.class_full}</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Text style={styles.label}>Total Distance:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data.trip_distance} KM</Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Text style={styles.label}>Date of Journey:</Text>
                    <Text style={styles.value}>{pnrData.pnr_data?.travel_date}</Text>
                  </View>
                  <View style={styles.hr} />
                  {/* <Title style={styles.resultTitle}>Passenger Booking Status</Title> */}
                  {pnrData.pnr_data.initial_passenger.map((passenger, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={styles.label}>Passenger {index + 1}:</Text>
                      <Text style={styles.value}>{passenger.booking_status} - {passenger.current_status}</Text>
                    </View>
                  ))}
                </>
              ) : (
                <Text style={styles.errorText}>No valid data found for the provided PNR number</Text>
              )}
              {/* Add more rows for other data fields */}
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 0,
    backgroundColor: '#ab0000',
    marginTop: 10,
  },
  scrollView: {
    flexGrow: 1,
    padding: 10,
  },
  resultCard: {
    marginBottom: 30,
	margin:10,
    borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    borderColor: '#ab0000',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  resultTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
	padding:3,
  },
  label: {
    fontWeight: 'bold',
    width: 140,
  },
  value: {
    flex: 1,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 8,
  },
});

export default PNRStatusComponent;
