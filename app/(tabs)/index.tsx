import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Heart, Lightbulb, Leaf, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { plantsData, Plant } from '@/data/plantsData';
import { PlantCard } from '@/components/PlantCard';
import { PlantDetail } from '@/components/PlantDetail';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import IdentifyScreen from './identify';
import { useRouter } from 'expo-router';
import { AuthService } from '@/services/authService';

interface AppStyles {
  container: ViewStyle;
  header: ViewStyle;
  headerLeft: ViewStyle;
  dotsIcon: ViewStyle;
  dot: ViewStyle;
  profilePicture: ImageStyle;
  welcomeText: TextStyle;
  searchContainer: ViewStyle;
  searchInput: TextStyle;
  searchIconContainer: ViewStyle;
  tabContainer: ViewStyle;
  tabButton: ViewStyle;
  tabButtonActive: ViewStyle;
  tabButtonText: TextStyle;
  tabButtonTextActive: TextStyle;
  content: ViewStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  featuredScroll: ViewStyle;
  featuredCard: ViewStyle;
  featuredName: TextStyle;
  featuredCategory: TextStyle;
  careIndicator: ViewStyle;
  careIndicatorText: TextStyle;
  cardContainerBase: ViewStyle;
  cardBackgroundImage: ImageStyle;
  cardContent: ViewStyle;
  cardHeader: ViewStyle;
  cardIcon: ViewStyle;
  bulletItem: TextStyle;
  dailyAdviceCard: ViewStyle;
  tipsCard: ViewStyle;
  factsCard: ViewStyle;
  tipItem: ViewStyle;
  factItem: ViewStyle;
  noResultsText: TextStyle;
  imageOverlay: ViewStyle;
  cardBackground: ViewStyle;
  cardGradient: ViewStyle;
  cardTitle: TextStyle;
  cardDescription: TextStyle;
  cardIconContainer: ViewStyle;
}

const baseCardStyle: ViewStyle = {
  width: '100%',
  maxWidth: 350,
  height: 120,
  marginVertical: 8,
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 8,
  backgroundColor: 'white',
};

const styles = StyleSheet.create<AppStyles>({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24,
    marginRight: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34614A',
    marginHorizontal: 1,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1E392A',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginHorizontal: 20,
    height: 60,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#1E392A',
    fontFamily: 'Inter-Regular',
    borderWidth: 0,
    borderColor: 'transparent',
    fontSize: 18,
    marginRight: 0,
    paddingLeft: 15,
    paddingRight: 0,
    paddingVertical: 0,
    elevation: 0,
    textAlignVertical: 'center',
  },
  searchIconContainer: {
    backgroundColor: '#34614A',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 20,
    marginLeft: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#A3D9B0',
    borderRadius: 8,
  },
  tabButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E392A',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1E392A',
    marginBottom: 15,
    marginTop: 10,
  },
  featuredScroll: {
    marginBottom: 10,
  },
  featuredCard: {
    width: 150,
    height: 100,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  featuredName: {
    color: '#1E392A',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  featuredCategory: {
    color: '#4B5563',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  careIndicator: {
    backgroundColor: '#A3D9B0',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  careIndicatorText: {
    color: '#1E392A',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  cardContainerBase: baseCardStyle,
  cardBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    zIndex: 0,
    resizeMode: 'cover',
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    marginRight: 10,
  },
  bulletItem: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1E392A',
    lineHeight: 24,
  },
  dailyAdviceCard: {
    ...baseCardStyle,
    backgroundColor: 'white',
  },
  tipsCard: {
    ...baseCardStyle,
    backgroundColor: 'white',
  },
  factsCard: {
    ...baseCardStyle,
    backgroundColor: 'white',
  },
  tipItem: {
    marginBottom: 10,
  },
  factItem: {
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 50,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    marginBottom: 5,
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'white',
    lineHeight: 20,
    opacity: 0.95,
  },
  cardIconContainer: {
    marginRight: 12,
  },
});

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeHomeTab, setActiveHomeTab] = useState('Require care');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser && currentUser.user_metadata && currentUser.user_metadata.avatar_url) {
        setUserProfilePicture(currentUser.user_metadata.avatar_url);
      } else {
        // Set a default placeholder image if no user profile picture is available
        setUserProfilePicture('https://randomuser.me/api/portraits/women/4.jpg'); 
      }
    };
    fetchUserProfile();
  }, []);

  // Sample data for Tips and Facts
  const plantTips = [
    "Water your plants in the morning to allow leaves to dry before nightfall, preventing fungal diseases.",
    "Rotate your indoor plants regularly to ensure even growth and exposure to light on all sides.",
    "Check soil moisture before watering. Stick your finger about an inch deep; if it feels dry, it's time to water.",
    "Use lukewarm water for watering indoor plants, as cold water can shock their roots.",
  ];

  const plantFacts = [
    "The Peace Lily is known for its air-purifying qualities, effectively removing toxins like formaldehyde and benzene.",
    "Some plants, like succulents, store water in their leaves, stems, or roots, allowing them to survive in arid climates.",
    "The Titan Arum (Corpse Flower) has the largest unbranched inflorescence in the world and emits a strong odor to attract pollinators.",
    "Bonsai is the art of cultivating small trees that mimic the shape and scale of full-size trees.",
  ];

  const dailyAdviceMessages = [
    "Water your Monstera today for lush growth and vibrant leaves!",
    "Remember to check soil moisture before watering to avoid over or under-watering.",
    "Consider rotating your plants regularly for even exposure to light on all sides.",
    "Wipe leaves regularly to keep them glossy and prevent dust buildup.",
    "Check for pests weekly and address any infestations early to keep your plants healthy."
  ];

  const filteredPlants = plantsData.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    setSearchQuery(searchText);
    setSelectedPlant(null);
  };

  const handleBackFromSearch = () => {
    setSearchQuery('');
    setSearchText('');
  };

  if (selectedPlant) {
    return (
      <>
        <PlantDetail 
          plant={selectedPlant} 
          onBack={() => setSelectedPlant(null)} 
        />
        <FloatingChatbot />
      </>
    );
  }

  const renderHomeContent = () => {
    switch (activeHomeTab) {
      case 'Require care':
        return (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Daily advice</Text>
              {dailyAdviceMessages.map((advice, index) => (
                <TouchableOpacity key={index} style={styles.dailyAdviceCard}> 
                  <LinearGradient
                    colors={['#4CAF50', '#66BB6A', '#81C784']}
                    style={styles.cardBackground}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 8 }]}>
                        <Lightbulb size={24} color="white" />
                      </View>
                      <Text style={styles.cardTitle}>Daily Tip #{index + 1}</Text>
                    </View>
                    <Text style={styles.cardDescription}>{advice}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 'Recent':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips for plants</Text>
            {plantTips.map((tip, index) => (
              <TouchableOpacity key={index} style={styles.tipsCard}>
                <LinearGradient
                  colors={['#FF9800', '#FFB74D', '#FFCC02']}
                  style={styles.cardBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 8 }]}>
                      <Leaf size={24} color="white" />
                    </View>
                    <Text style={styles.cardTitle}>Plant Care Tip</Text>
                  </View>
                  <Text style={styles.cardDescription}>{tip}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'New':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facts</Text>
            {plantFacts.map((fact, index) => (
              <TouchableOpacity key={index} style={styles.factsCard}>
                <LinearGradient
                  colors={['#2196F3', '#42A5F5', '#64B5F6']}
                  style={styles.cardBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.cardIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12, padding: 8 }]}>
                      <BookOpen size={24} color="white" />
                    </View>
                    <Text style={styles.cardTitle}>Did You Know?</Text>
                  </View>
                  <Text style={styles.cardDescription}>{fact}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {searchQuery === '' ? (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.dotsIcon}>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
                <View style={styles.dot}></View>
              </View>
            </View>
          </View>

          <Text style={styles.welcomeText}>Welcome to GreenThumb AI</Text>

        <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search plant"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#A0A0A0"
              onSubmitEditing={handleSearch}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.searchIconContainer} onPress={handleSearch}>
              <Search size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, activeHomeTab === 'Require care' && styles.tabButtonActive]}
              onPress={() => setActiveHomeTab('Require care')}
            >
              <Text 
                style={[styles.tabButtonText, activeHomeTab === 'Require care' && styles.tabButtonTextActive]}
              >Require care</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeHomeTab === 'Recent' && styles.tabButtonActive]}
              onPress={() => setActiveHomeTab('Recent')}
            >
              <Text 
                style={[styles.tabButtonText, activeHomeTab === 'Recent' && styles.tabButtonTextActive]}
              >Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeHomeTab === 'New' && styles.tabButtonActive]}
              onPress={() => setActiveHomeTab('New')}
            >
              <Text 
                style={[styles.tabButtonText, activeHomeTab === 'New' && styles.tabButtonTextActive]}
              >New</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
            {renderHomeContent()}
        </ScrollView>
        <FloatingChatbot />
      </SafeAreaView>
      ) : (
        <IdentifyScreen 
          plants={filteredPlants.slice(0, 2)} 
          searchText={searchText} 
          onBack={handleBackFromSearch} 
        />
      )}
    </>
  );
}