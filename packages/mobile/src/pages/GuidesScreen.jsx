import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import { theme } from '../styles';

function GuidesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      id: 1,
      name: 'Ethan Carter',
      location: 'Paris, France',
      rating: 4.9,
      price: 60,
      specialty: 'History & Culture',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJLzlS7ubnGckKEhFmdL5GW07p8hmLQq9ZLJrR7Jpgm3VDwCb6FJgx9FVPlaSiPXYKLFhDNADc3OvizkJ5samD01oDDlGSp7If9L0hcMP-o7csEP2ct6fV2R3OptWJjNjIztLKxF_I0ImnWiEAgO2Fev5YQswrRIgleY2Rs7gxheeKlvgWskSMc9UzkCuoP2fawHDDlmgCW4Kx9-CeEYNjtgLKBmDcPK-YXcU2IOXO8hP9tQWRhR8ggXlCymDwMFozf2bC4XzptndM',
      languages: ['English', 'French']
    },
    {
      id: 2,
      name: 'Sophia Clark',
      location: 'Tokyo, Japan',
      rating: 4.8,
      price: 55,
      specialty: 'Food & Wine',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf',
      languages: ['English', 'Japanese', 'Mandarin']
    },
    {
      id: 3,
      name: 'Liam Bennett',
      location: 'New York, USA',
      rating: 4.9,
      price: 70,
      specialty: 'Adventure & Outdoor',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALacbFfxSjTlNhxRJgDzPBjhholoPMjTLy_VNi3URH7YFh8nnYFd5xS08UcAKKe_m0Gz1__xI95V1pCsRsNZ8uktdgIpyZgzvSdBk2jEF5dbOtrcqKN_C976g66tVpmm_0PTle-2TjAMRLA-hAAC58cdFgN8lBKk7IBUtxLZnDHv-q7rp66wmErtHJtbzJ7lCFOtFuXA2F9yrEthhRsAeo_hURA6u1x8IfQ0LFhoO875z4Hq_3JnUT6yiZrSvFjy7TFXeechDQ1hN4',
      languages: ['English', 'Spanish']
    }
  ];

  const renderGuide = ({ item }) => (
    <TouchableOpacity
      style={styles.guideCard}
      onPress={() => navigation.navigate('Booking', { guideId: item.id })}
    >
      <FastImage
        source={{ uri: item.image }}
        style={styles.guideImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.guideInfo}>
        <Text style={styles.guideName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-pin" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
        <Text style={styles.specialty}>{item.specialty}</Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        
        <View style={styles.languagesContainer}>
          {item.languages.map((lang, index) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.priceUnit}>每小時</Text>
        </View>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>預訂</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout safeAreaEdges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon 
              name="search" 
              size={20} 
              color={theme.colors.textSecondary} 
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋導遊..."
              placeholderTextColor={theme.colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        
        <FlatList
          data={guides}
          renderItem={renderGuide}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    padding: theme.spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  listContainer: {
    padding: theme.spacing.md,
  },
  guideCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
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
    fontSize: theme.typography.fontSize.lg,
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
  specialty: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
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
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  languageTag: {
    backgroundColor: theme.colors.dark700,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  languageText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.md,
  },
  price: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  priceUnit: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
});

export default GuidesScreen;