import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { theme } from '../styles';

const { width } = Dimensions.get('window');

function HomeScreen({ navigation }) {

  const featuredGuides = [
    {
      id: 1,
      name: 'Ethan Carter',
      specialty: 'Expert in local history and culture',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJLzlS7ubnGckKEhFmdL5GW07p8hmLQq9ZLJrR7Jpgm3VDwCb6FJgx9FVPlaSiPXYKLFhDNADc3OvizkJ5samD01oDDlGSp7If9L0hcMP-o7csEP2ct6fV2R3OptWJjNjIztLKxF_I0ImnWiEAgO2Fev5YQswrRIgleY2Rs7gxheeKlvgWskSMc9UzkCuoP2fawHDDlmgCW4Kx9-CeEYNjtgLKBmDcPK-YXcU2IOXO8hP9tQWRhR8ggXlCymDwMFozf2bC4XzptndM'
    },
    {
      id: 2,
      name: 'Sophia Clark',
      specialty: 'Specializes in food and wine tours',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf'
    },
    {
      id: 3,
      name: 'Liam Bennett',
      specialty: 'Adventure and outdoor activities',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALacbFfxSjTlNhxRJgDzPBjhholoPMjTLy_VNi3URH7YFh8nnYFd5xS08UcAKKe_m0Gz1__xI95V1pCsRsNZ8uktdgIpyZgzvSdBk2jEF5dbOtrcqKN_C976g66tVpmm_0PTle-2TjAMRLA-hAAC58cdFgN8lBKk7IBUtxLZnDHv-q7rp66wmErtHJtbzJ7lCFOtFuXA2F9yrEthhRsAeo_hURA6u1x8IfQ0LFhoO875z4Hq_3JnUT6yiZrSvFjy7TFXeechDQ1hN4'
    }
  ];

  const featuredDestinations = [
    {
      name: 'Paris',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8qfaN11KR7IiA7EQLDoyJxjawHXNxzU2CNFmJbDPCv9f3vHIUEXfvC9FIlOtRrmqne7k4pXe6t5yQ5m4xQE3mS-fm4BfES-iaaac76Bfhem4ScLBKXoGLG4QH2xzkyPhOpJKPxIzlHuO2ov6Pr-PnCcWIzAL11ZECnAO6gd3Cfgs_do3VQVqUegIUO0HCvPZ2abpX74oPp_fr2MOb-fHSQm2ap0VokYTZvHi7mHfOEj7z_Lr0oVJFZ4-6m0WQxRApirtXXcOjkuk0'
    },
    {
      name: 'Tokyo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZc2036SqXGKT4wywd6NtmlsUu1Ivp7tde-xh7Mah_FGyQhD3CV8Vb45ELSN-cxSwC-2itEK9-MB4hW4OWds3udC7i5ix-h_u-Kgb2WhBGNhGcTnFeSrw-yh4BbtJzzw6mpor92cHJetruKn_EdVzb_bUlM1bhvhlShLETAj5_m92bZ78J60wf8KEotXphVnNv45gy7NNjR6bdfKH2P_VCco7jPHkyG8XF8gMgjCLMRwzyGuFvl5ErrslqhJ-aTi8zlCi8ihRWWS3i'
    },
    {
      name: 'New York',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ9eGiUGMksqgdRIzVMNSwvaK1laYpLNwsksDfM7t2VX6Ftllli1mKDOP4gnqZXNhVebTJ1WAuvkM19znNNLHFgXYhl7vaRLUenSJBdY3gu-xzdmG-rpsOo5sCk_t1A3kXC67RjERDXIihfnJa4VjpW2hP-21y-GCuZWp5316SoVgn4rXM153Hq6CjC6cuNpvc7nAdyGyTCH1NxJpwMiNH4S3rxZ6JRfjkjrm3rZ3yJyF_Ocup4xL6WefzDfb0jocgGYOib62fc4cx'
    },
    {
      name: 'Rome',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_dW1_smdX2koviezag9rOT-PaUy2RxWc0_GxEX6iFlzsYTcK-f854gTA_jkU-ss-3ROC1GT0jTopondL4abKoqoeZV2nBYyt9aLJtNtM3Zozqex8ZZ9JdEKYNfUI2HBhUJ2312Lz8nSaxpEx9CKJgX8iM0BkMpyPv3Jq7qZXo_q3Ht4LiJghgjca6r1ydaUUyDNmdNWlmicGc94O6Nq791qkDCwaHmOqMksjCaI4GDsxX8IuLhyKP6PnLwn4kYdX-pFyo__19OJJu'
    }
  ];

  const renderGuideCard = (guide) => (
    <TouchableOpacity
      key={guide.id}
      style={styles.guideCard}
      onPress={() => navigation.navigate('Booking', { guideId: guide.id })}
    >
      <FastImage
        source={{ uri: guide.image }}
        style={styles.guideImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.guideInfo}>
        <Text style={styles.guideName}>{guide.name}</Text>
        <Text style={styles.guideSpecialty}>{guide.specialty}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDestinationCard = (destination, index) => (
    <TouchableOpacity
      key={index}
      style={styles.destinationCard}
      onPress={() => navigation.navigate('Guides', { destination: destination.name })}
    >
      <FastImage
        source={{ uri: destination.image }}
        style={styles.destinationImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.destinationOverlay}>
        <Text style={styles.destinationName}>{destination.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout safeAreaEdges={['top']}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
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
              placeholder="搜尋目的地、導遊或活動..."
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {/* Featured Guides Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>精選導遊</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {featuredGuides.map(renderGuideCard)}
          </ScrollView>
        </View>

        {/* Featured Destinations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>熱門目的地</Text>
          <View style={styles.destinationsGrid}>
            {featuredDestinations.map(renderDestinationCard)}
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
  searchContainer: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
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
  section: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  horizontalScroll: {
    paddingRight: theme.spacing.md,
  },
  guideCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
    width: width * 0.7,
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
  guideSpecialty: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: (width - theme.spacing.md * 3) / 2,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadow.md,
  },
  destinationImage: {
    width: '100%',
    height: 120,
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: theme.spacing.md,
  },
  destinationName: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.white,
  },
});

export default HomeScreen;