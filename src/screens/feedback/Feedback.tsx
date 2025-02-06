import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    // Handle feedback submission
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Thank You for using TCS Now!</Text>
        <Text style={styles.subtitle}>
          Your parcel has been successfully delivered.
        </Text>

        <Text style={styles.rateText}>Rate the Courier</Text>
        <StarRating
          rating={rating}
          onChange={setRating}
          starSize={30}
          style={styles.starRating}
        />

        <Text style={styles.experienceText}>How was your experience?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What could we do better next time?"
          placeholderTextColor="#A9A9A9"
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#465061',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#465061',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  rateText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
    color: '#465061',
  },
  starRating: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  experienceText: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
    color: '#465061',
  },
  textInput: {
    height: 80,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF4D4F',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    textAlign: 'center',
    color: '#FF4D4F',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default FeedbackScreen;
