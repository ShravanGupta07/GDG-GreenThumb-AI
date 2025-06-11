import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, FlatList, ViewToken, BackHandler } from 'react-native';
import { Plant, plantsData } from '@/data/plantsData'; // Import Plant interface and plantsData
import { useRouter } from 'expo-router'; // Import useRouter
import { SinglePlantCard } from '@/components/SinglePlantCard'; // Import the new component
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  minimumViewTime: 200,
};

interface IdentifyScreenProps {
  plants: Plant[];
  searchText: string; // Add searchText to props
  onBack?: () => void; // Add onBack prop
}

export default function IdentifyScreen({ plants, searchText, onBack }: IdentifyScreenProps) {
  const router = useRouter();
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0);
  const flatListRef = useRef<FlatList<Plant>>(null);

  useEffect(() => {
    setCurrentPlantIndex(0); // Reset index when plants change (e.g., new search)
  }, [plants]);

  // Handle mobile back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (searchText && onBack) {
        onBack();
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    });

    return () => backHandler.remove();
  }, [searchText, onBack]);

  const showInitialIdentifyScreen = !searchText && (!plants || plants.length === 0);
  const showSinglePlantResult = searchText && plants.length === 1;
  const showComparativeResult = searchText && plants.length > 1;

  const handleNextPlant = () => {
    if (currentPlantIndex < plants.length - 1) {
      const nextIndex = currentPlantIndex + 1;
      console.log('handleNextPlant: nextIndex', nextIndex);
      setCurrentPlantIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevPlant = () => {
    if (currentPlantIndex > 0) {
      const prevIndex = currentPlantIndex - 1;
      console.log('handlePrevPlant: prevIndex', prevIndex);
      setCurrentPlantIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  // Callback for viewable items change to keep currentPlantIndex in sync with scroll
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const validViewableItems = viewableItems.filter(item => item.index !== null && item.isViewable);

    if (validViewableItems.length > 0) {
      // For paging, usually the first viewable item is sufficient
      const newIndex = validViewableItems[0].index as number;
      if (newIndex !== currentPlantIndex) {
        console.log('onViewableItemsChanged: newIndex', newIndex);
        setCurrentPlantIndex(newIndex);
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.headerTitle}>Identify Plants</Text> */}
      {showInitialIdentifyScreen && (
        <View style={styles.imageContainer}>
          {/* This section for the large circular text/image is typically for the initial identify screen without search */}
          {/* Removed placeholder plant names: plantsData[0].name and plantsData[1].name */}
        </View>
      )}

      {/* Conditionally render SinglePlantCard(s) based on search results */}
      {showSinglePlantResult && plants[0] && (
        <SinglePlantCard plant={plants[0]} onBack={onBack} />
      )}

      {showComparativeResult && (
        <View style={styles.carouselWrapper}>
          <TouchableOpacity 
            onPress={handlePrevPlant} 
            style={[styles.arrowButton, styles.leftArrow]}
            disabled={currentPlantIndex === 0}
          >
            <ArrowLeftCircle size={36} color={currentPlantIndex === 0 ? "#1E392A" : "#D1D5DB"} />
          </TouchableOpacity>
          
          <FlatList
            ref={flatListRef}
            data={plants}
            renderItem={({ item }) => (
              <View style={styles.singleCardContainer}>
                <SinglePlantCard plant={item} onBack={onBack} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled={true}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={info => {
              console.log('onScrollToIndexFailed:', info);
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            contentContainerStyle={styles.flatListContentContainer}
            onMomentumScrollEnd={(event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const itemFullWidth = width * 0.9 + (width * 0.05 * 2);
              const newIndex = Math.round(contentOffsetX / itemFullWidth);
              if (newIndex !== currentPlantIndex) {
                console.log('onMomentumScrollEnd: newIndex', newIndex);
                setCurrentPlantIndex(newIndex);
              }
            }}
          />

          <TouchableOpacity 
            onPress={handleNextPlant} 
            style={[styles.arrowButton, styles.rightArrow]}
            disabled={currentPlantIndex === plants.length - 1}
          >
            <ArrowRightCircle size={36} color={currentPlantIndex === plants.length - 1 ? "#D1D5DB" : "#1E392A"} />
          </TouchableOpacity>
        </View>
      )}

      {searchText && plants.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noPlantsFoundText}>No plants found for "{searchText}".</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
          >
            <ArrowLeftCircle size={24} color="#1E392A" />
            <Text style={styles.backButtonText}>Back to Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1E392A',
    marginBottom: 40,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: width * 0.9,
    height: width * 0.45,
    marginBottom: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImageCircle: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    position: 'absolute',
    zIndex: 1,
    borderColor: 'white',
    borderWidth: 4,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  plantImageLeft: {
    left: - (width * 0.1),
  },
  plantImageRight: {
    right: - (width * 0.1),
  },
  plantNameInCircle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E392A',
    textAlign: 'center',
  },
  carouselWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  flatListContentContainer: {
    paddingHorizontal: width * 0.05,
  },
  singleCardContainer: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    alignItems: 'center',
  },
  arrowButton: {
    padding: 10,
    zIndex: 10,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -18 }],
  },
  leftArrow: {
    left: 0,
  },
  rightArrow: {
    right: 0,
  },
  noPlantsFoundText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#1E392A',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E392A',
    marginLeft: 8,
  },
});