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

function GuideDashboardScreen({ navigation }) {
  const { user } = useAuth();

  // Mock data - in real app, fetch from API
  const todayBookings = [
    {
      id: 1,
      customerName: 'Sarah Johnson',
      time: '14:00',
      duration: 3,
      groupSize: 2,
      status: 'confirmed',
      customerContact: '+1 555-0123'
    }
  ];

  const upcomingBookings = [
    {
      id: 2,
      customerName: 'Mike Chen',
      date: '2024-01-22',
      time: '10:00',
      duration: 4,
      groupSize: 1,
      status: 'pending',
      customerContact: '+1 555-0456'
    }
  ];

  const stats = {
    monthlyEarnings: 2450,
    totalTours: 48,
    averageRating: 4.8,
    responseTime: '15 min'
  };

  const renderBookingCard = (booking, isToday = false) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.customerName}>{booking.customerName}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(booking.status) }
        ]}>
          <Text style={styles.statusText}>{booking.status}</Text>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        {!isToday && (
          <View style={styles.detailRow}>
            <Icon name="calendar" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Icon name="clock" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{booking.time} ({booking.duration}h)</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="users" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{booking.groupSize} person(s)</Text>
        </View>
      </View>

      <View style={styles.bookingActions}>
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => /* Handle contact */ null}
        >
          <Icon name="phone" size={16} color={theme.colors.primary} />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
        
        {booking.status === 'pending' && (
          <>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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

  const renderStatCard = (title, value, icon, trend) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Icon name={icon} size={20} color={theme.colors.primary} />
        {trend && (
          <View style={styles.trendContainer}>
            <Icon 
              name={trend > 0 ? 'trending-up' : 'trending-down'} 
              size={12} 
              color={trend > 0 ? theme.colors.success : theme.colors.error} 
            />
            <Text style={[
              styles.trendText,
              { color: trend > 0 ? theme.colors.success : theme.colors.error }
            ]}>
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <Layout safeAreaEdges={['top', 'bottom']}>
      <ScrollView style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Good day,</Text>
          <Text style={styles.userName}>{user?.firstName}!</Text>
          <Text style={styles.welcomeSubtext}>You have {todayBookings.length} tour(s) today</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard('Monthly Earnings', `$${stats.monthlyEarnings}`, 'dollar-sign', 12)}
          {renderStatCard('Total Tours', stats.totalTours, 'map', 8)}
          {renderStatCard('Average Rating', stats.averageRating, 'star')}
          {renderStatCard('Response Time', stats.responseTime, 'clock')}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('ManageAvailability')}
            >
              <Icon name="calendar" size={24} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Availability</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Earnings')}
            >
              <Icon name="trending-up" size={24} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Earnings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Icon name="user" size={24} color={theme.colors.white} />
              <Text style={styles.actionButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Tours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tours</Text>
          
          {todayBookings.length > 0 ? (
            todayBookings.map(booking => renderBookingCard(booking, true))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="calendar" size={40} color={theme.colors.textSecondary} />
              <Text style={styles.emptyStateText}>No tours scheduled for today</Text>
              <Text style={styles.emptyStateSubtext}>Enjoy your free day!</Text>
            </View>
          )}
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllBookings')}>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingBookings.map(booking => renderBookingCard(booking, false))}
        </View>

        {/* Performance Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <View style={styles.insightCard}>
            <View style={styles.insightRow}>
              <Text style={styles.insightLabel}>Tours Completed</Text>
              <Text style={styles.insightValue}>15</Text>
            </View>
            <View style={styles.insightRow}>
              <Text style={styles.insightLabel}>Customer Satisfaction</Text>
              <Text style={styles.insightValue}>98%</Text>
            </View>
            <View style={styles.insightRow}>
              <Text style={styles.insightLabel}>Repeat Customers</Text>
              <Text style={styles.insightValue}>6</Text>
            </View>
          </View>
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
    ...theme.shadow.sm,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
    marginLeft: theme.spacing.xs,
  },
  statValue: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  statTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
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
  customerName: {
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
    marginBottom: theme.spacing.md,
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
  bookingActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  contactButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  acceptButton: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  acceptButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.white,
  },
  declineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  declineButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.error,
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
  },
  emptyStateSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  insightsSection: {
    padding: theme.spacing.md,
  },
  insightCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  insightLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  insightValue: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
});

export default GuideDashboardScreen;