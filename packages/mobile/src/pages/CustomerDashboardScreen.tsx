import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import { theme } from '../styles';
import { useAuth } from '../context/AuthContext';

function CustomerDashboardScreen({ navigation }) {
  const { user } = useAuth();

  // Mock data - in real app, fetch from API
  const upcomingBookings = [
    {
      id: 1,
      guideName: 'Ethan Carter',
      location: 'Paris, France',
      date: '2024-01-20',
      time: '14:00',
      status: 'confirmed',
      image: 'https://example.com/guide1.jpg'
    }
  ];

  const pastBookings = [
    {
      id: 2,
      guideName: 'Sophia Clark',
      location: 'Tokyo, Japan',
      date: '2024-01-10',
      time: '10:00',
      status: 'completed',
      rating: 5
    }
  ];

  const stats = {
    totalBookings: 12,
    totalSpent: 850,
    favoriteGuides: 5,
    reviewsLeft: 8
  };

  const renderBookingCard = (booking, isUpcoming = true) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.guideName}>{booking.guideName}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(booking.status) }
        ]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="map-pin" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{booking.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{booking.date} at {booking.time}</Text>
        </View>
      </View>

      {!isUpcoming && booking.rating && (
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>Your rating: </Text>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={14}
              color={i < booking.rating ? '#FFD700' : theme.colors.textSecondary}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return theme.colors.success;
      case 'pending': return theme.colors.warning;
      case 'completed': return theme.colors.primary;
      case 'cancelled': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const renderStatCard = (title, value, icon) => (
    <View style={styles.statCard}>
      <Icon name={icon} size={24} color={theme.colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <Layout safeAreaEdges={['top', 'bottom']}>
      <ScrollView style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.firstName}!</Text>
          <Text style={styles.welcomeSubtext}>Ready for your next adventure?</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard('Total Bookings', stats.totalBookings, 'calendar')}
          {renderStatCard('Total Spent', `$${stats.totalSpent}`, 'dollar-sign')}
          {renderStatCard('Favorite Guides', stats.favoriteGuides, 'heart')}
          {renderStatCard('Reviews Left', stats.reviewsLeft, 'star')}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Guides')}
            >
              <Icon name="search" size={24} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Find Guides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Favorites')}
            >
              <Icon name="heart" size={24} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllBookings')}>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => renderBookingCard(booking, true))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="calendar" size={40} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateText}>No upcoming bookings</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('Guides')}
              >
                <Text style={styles.emptyStateButtonText}>Book a Tour</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BookingHistory')}>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {pastBookings.map(booking => renderBookingCard(booking, false))}
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  welcomeSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    marginBottom: theme.spacing.md,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  userName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  welcomeSubtext: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadow.sm,
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
  },
  statTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  quickActions: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadow.md,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
    marginTop: theme.spacing.xs,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionAction: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
  },
  bookingCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.sm,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  guideName: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  bookingDetails: {
    marginBottom: theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  emptyState: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  emptyStateButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
  },
});

export default CustomerDashboardScreen;