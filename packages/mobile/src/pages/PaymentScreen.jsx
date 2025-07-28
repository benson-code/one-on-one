import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import { theme } from '../styles';

function PaymentScreen({ navigation, route }) {
  const { bookingData } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('usdt');
  const [paymentStep, setPaymentStep] = useState('method'); // method, processing, completed

  // Mock USDT payment address
  const usdtAddress = 'TQrZ8tKfjSZyxmFgLTCjKFaGz1nN5s8dWh';
  const paymentAmount = bookingData.totalPrice;

  const handlePayment = () => {
    if (paymentMethod === 'usdt') {
      setPaymentStep('processing');
    } else {
      Alert.alert('Coming Soon', 'This payment method will be available soon');
    }
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  const confirmPayment = () => {
    setPaymentStep('completed');
    setTimeout(() => {
      Alert.alert(
        'Payment Successful',
        'Your booking has been confirmed! The guide will contact you shortly.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Main', { screen: 'Dashboard' })
          }
        ]
      );
    }, 1000);
  };

  const renderPaymentMethod = () => (
    <View style={styles.container}>
      <View style={styles.bookingSummary}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date & Time</Text>
          <Text style={styles.summaryValue}>
            {bookingData.date} at {bookingData.time}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration</Text>
          <Text style={styles.summaryValue}>{bookingData.duration} hours</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Group Size</Text>
          <Text style={styles.summaryValue}>{bookingData.groupSize} person(s)</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${paymentAmount}</Text>
        </View>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'usdt' && styles.paymentOptionSelected
          ]}
          onPress={() => setPaymentMethod('usdt')}
        >
          <View style={styles.paymentOptionLeft}>
            <View style={styles.cryptoIcon}>
              <Text style={styles.cryptoIconText}>₮</Text>
            </View>
            <View>
              <Text style={styles.paymentOptionTitle}>USDT (Tether)</Text>
              <Text style={styles.paymentOptionSubtitle}>Cryptocurrency payment</Text>
            </View>
          </View>
          <View style={styles.radioButton}>
            {paymentMethod === 'usdt' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'card' && styles.paymentOptionSelected
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <View style={styles.paymentOptionLeft}>
            <Icon name="credit-card" size={24} color={theme.colors.textPrimary} />
            <View style={styles.paymentOptionText}>
              <Text style={styles.paymentOptionTitle}>Credit Card</Text>
              <Text style={styles.paymentOptionSubtitle}>Coming soon</Text>
            </View>
          </View>
          <View style={styles.radioButton}>
            {paymentMethod === 'card' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === 'paypal' && styles.paymentOptionSelected
          ]}
          onPress={() => setPaymentMethod('paypal')}
        >
          <View style={styles.paymentOptionLeft}>
            <Icon name="dollar-sign" size={24} color={theme.colors.textPrimary} />
            <View style={styles.paymentOptionText}>
              <Text style={styles.paymentOptionTitle}>PayPal</Text>
              <Text style={styles.paymentOptionSubtitle}>Coming soon</Text>
            </View>
          </View>
          <View style={styles.radioButton}>
            {paymentMethod === 'paypal' && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handlePayment}
      >
        <Text style={styles.proceedButtonText}>
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProcessing = () => (
    <View style={styles.container}>
      <View style={styles.usdtPayment}>
        <Text style={styles.usdtTitle}>USDT Payment</Text>
        <Text style={styles.usdtSubtitle}>
          Send exactly ${paymentAmount} USDT to the address below
        </Text>

        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Payment Address (TRC20)</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressText}>{usdtAddress}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard(usdtAddress)}
            >
              <Icon name="copy" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount to Send</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>${paymentAmount} USDT</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={() => copyToClipboard(paymentAmount.toString())}
            >
              <Icon name="copy" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.warningBox}>
          <Icon name="alert-triangle" size={20} color={theme.colors.warning} />
          <Text style={styles.warningText}>
            Only send USDT (TRC20) to this address. Sending other cryptocurrencies may result in permanent loss.
          </Text>
        </View>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>Payment Instructions:</Text>
          <Text style={styles.instructionText}>
            1. Copy the payment address above{'\n'}
            2. Open your crypto wallet{'\n'}
            3. Send exactly ${paymentAmount} USDT (TRC20){'\n'}
            4. Return here and confirm payment
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmPayment}
        >
          <Text style={styles.confirmButtonText}>
            I've Sent the Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCompleted = () => (
    <View style={styles.completedContainer}>
      <View style={styles.successIcon}>
        <Icon name="check" size={40} color={theme.colors.white} />
      </View>
      <Text style={styles.successTitle}>Payment Processing</Text>
      <Text style={styles.successSubtitle}>
        We're verifying your payment. You'll receive a confirmation email shortly.
      </Text>
      <View style={styles.loadingDots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );

  return (
    <Layout safeAreaEdges={['bottom']}>
      <ScrollView style={styles.scrollContainer}>
        {paymentStep === 'method' && renderPaymentMethod()}
        {paymentStep === 'processing' && renderProcessing()}
        {paymentStep === 'completed' && renderCompleted()}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.md,
  },
  bookingSummary: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.md,
  },
  summaryTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
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
  paymentMethods: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.dark700,
  },
  paymentOptionSelected: {
    borderColor: theme.colors.primary,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoIcon: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  cryptoIconText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
  paymentOptionText: {
    marginLeft: theme.spacing.md,
  },
  paymentOptionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textPrimary,
  },
  paymentOptionSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  proceedButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  proceedButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
  usdtPayment: {
    flex: 1,
  },
  usdtTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  usdtSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  addressContainer: {
    marginBottom: theme.spacing.lg,
  },
  addressLabel: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  addressBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.dark700,
  },
  addressText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontFamily: 'monospace',
  },
  copyButton: {
    padding: theme.spacing.xs,
  },
  amountContainer: {
    marginBottom: theme.spacing.lg,
  },
  amountLabel: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  amountBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.dark700,
    alignItems: 'center',
  },
  amountText: {
    flex: 1,
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  warningText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.warning,
    marginLeft: theme.spacing.sm,
  },
  instructionBox: {
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
  },
  instructionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  instructionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.success,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  successTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  successSubtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default PaymentScreen;