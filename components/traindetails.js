import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FetchTrainData = ({ trainDetails }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Train Number:</Text>
        <Text style={styles.value}>{trainDetails.trainNumber}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Train Name:</Text>
        <Text style={styles.value}>{trainDetails.trainName}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Running Date:</Text>
        <Text style={styles.value}>{trainDetails.consideredRunningDate}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Currently:</Text>
        <Text style={styles.value}>{trainDetails.currentlyAt}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{trainDetails.runningStatus?.header}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Upcoming Station:</Text>
        <Text style={styles.value}>{trainDetails.upcomingStation}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.row}>
        <Text style={styles.label}>Last Update:</Text>
        <Text style={styles.update}>{trainDetails.ltsLastUpdatedTime}</Text>
      </View>
      {/* Add more rows as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#6f0000',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // for Android
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: 140,
  },
  value: {
    flex: 1,
  },
  update: {
    flexWrap: 'wrap-reverse',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 8,
  },
});

export default FetchTrainData;
