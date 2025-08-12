import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import { theme } from '../styles';

function BookingScreen({ navigation, route }) {
  const { guideId } = route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(2);
  const [groupSize, setGroupSize] = useState(1);

  // Mock guide data - in real app, fetch based on guideId
  const guide = {
    id: guideId,
    name: 'Ethan Carter',
    location: 'Paris, France',
    rating: 4.9,
    price: 60,
    specialty: 'History & Culture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJLzlS7ubnGckKEhFmdL5GW07p8hmLQq9ZLJrR7Jpgm3VDwCb6FJgx9FVPlaSiPXYKLFhDNADc3OvizkJ5samD01oDDlGSp7If9L0hcMP-o7csEP2ct6fV2R3OptWJjNjIztLKxF_I0ImnWiEAgO2Fev5YQswrRIgleY2Rs7gxheeKlvgWskSMc9UzkCuoP2fawHDDlmgCW4Kx9-CeEYNjtgLKBmDcPK-YXcU2IOXO8hP9tQWRhR8ggXlCymDwMFozf2bC4XzptndM',
    languages: ['English', 'French'],
    description: 'Passionate historian with 8 years of experience showing visitors the hidden gems of Paris.',
    reviews: 127,
    responseTime: '30 minutes',
    availability: ['10:00', '14:00', '16:00']
  };

  const dates = [
    { date: '2024-01-15', day: 'Mon', dayNum: '15' },
    { date: '2024-01-16', day: 'Tue', dayNum: '16' },
    { date: '2024-01-17', day: 'Wed', dayNum: '17' },
    { date: '2024-01-18', day: 'Thu', dayNum: '18' },
    { date: '2024-01-19', day: 'Fri', dayNum: '19' },
  ];

  const totalPrice = guide.price * duration * groupSize;

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Incomplete', 'Please select date and time');
      return;
    }

    const bookingData = {
      guideId: guide.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      groupSize,
      totalPrice
    };

    navigation.navigate('Payment', { bookingData });
  };

  const renderDateOption = (dateOption) => (
    <TouchableOpacity
      key={dateOption.date}
      style={[
        styles.dateOption,
        selectedDate === dateOption.date && styles.dateOptionSelected
      ]}
      onPress={() => setSelectedDate(dateOption.date)}
    >
      <Text style={[
        styles.dayText,
        selectedDate === dateOption.date && styles.dayTextSelected
      ]}>
        {dateOption.day}
      </Text>
      <Text style={[
        styles.dayNumText,
        selectedDate === dateOption.date && styles.dayNumTextSelected
      ]}>
        {dateOption.dayNum}
      </Text>
    </TouchableOpacity>
  );

  const renderTimeOption = (time) => (
    <TouchableOpacity
      key={time}
      style={[
        styles.timeOption,
        selectedTime === time && styles.timeOptionSelected
      ]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={[
        styles.timeText,
        selectedTime === time && styles.timeTextSelected
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Layout safeAreaEdges={['bottom']}>
      <ScrollView style={styles.container}>
        {/* Guide Info */}
        <View style={styles.guideSection}>
          <FastImage
            source={{ uri: guide.image }}
            style={styles.guideImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.guideInfo}>
            <Text style={styles.guideName}>{guide.name}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-pin" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.location}>{guide.location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{guide.rating} ({guide.reviews} reviews)</Text>
            </View>
            <Text style={styles.specialty}>{guide.specialty}</Text>
            <Text style={styles.description}>{guide.description}</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}
          >
            {dates.map(renderDateOption)}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Times</Text>
          <View style={styles.timesContainer}>
            {guide.availability.map(renderTimeOption)}
          </View>
        </View>

        {/* Duration Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationContainer}>
            {[1, 2, 3, 4, 6, 8].map((hours) => (
              <TouchableOpacity
                key={hours}
                style={[
                  styles.durationOption,
                  duration === hours && styles.durationOptionSelected
                ]}
                onPress={() => setDuration(hours)}
              >
                <Text style={[
                  styles.durationText,
                  duration === hours && styles.durationTextSelected
                ]}>
                  {hours}h
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Group Size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group Size</Text>
          <View style={styles.groupSizeContainer}>
            <TouchableOpacity
              style={styles.groupSizeButton}
              onPress={() => setGroupSize(Math.max(1, groupSize - 1))}
            >
              <Icon name="minus" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.groupSizeText}>{groupSize}</Text>
            <TouchableOpacity
              style={styles.groupSizeButton}
              onPress={() => setGroupSize(Math.min(8, groupSize + 1))}
            >
              <Icon name="plus" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.priceSection}>
          <Text style={styles.priceSectionTitle}>Price Summary</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>${guide.price}/hour × {duration}h × {groupSize} person(s)</Text>
            <Text style={styles.priceValue}>${totalPrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee</Text>
            <Text style={styles.priceValue}>$5</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice + 5}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>
            Book for ${totalPrice + 5}
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  guideSection: {
    backgroundColor: theme.colors.cardBackground,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadow.md,
  },
  guideImage: {
    width: '100%',
    height: 200,
  },
  guideInfo: {
    padding: theme.spacing.md,
  },
  guideName: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  location: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  rating: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.xs,
  },
  specialty: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    margin: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  datesContainer: {
    paddingRight: theme.spacing.md,
  },
  dateOption: {
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  dateOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  dayText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  dayTextSelected: {
    color: theme.colors.white,
  },
  dayNumText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
  dayNumTextSelected: {
    color: theme.colors.white,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  timeOption: {
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  timeOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  timeText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  timeTextSelected: {
    color: theme.colors.white,
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  durationOption: {
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  durationOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  durationText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  durationTextSelected: {
    color: theme.colors.white,
  },
  groupSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  groupSizeButton: {
    backgroundColor: theme.colors.dark700,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupSizeText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.xl,
  },
  priceSection: {
    backgroundColor: theme.colors.cardBackground,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  priceSectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  priceLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  priceValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dark700,
  },
  totalLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  bottomSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.dark700,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
});

export default BookingScreen;