import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plant } from '@/data/plantsData';

interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
}

export function PlantCard({ plant, onPress }: PlantCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#E8F5E8', '#F0F8F0', '#FFFFFF']}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: plant.image === 'https://via.placeholder.com/150' ? 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' : plant.image }} 
            style={styles.image} 
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{plant.name}</Text>
          <Text style={styles.category}>{plant.category}</Text>
          
          <View style={styles.careIndicator}>
            <LinearGradient
              colors={['#4CAF50', '#66BB6A']}
              style={styles.careIndicatorGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.careIndicatorText}>💧 13%</Text>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: '48%',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  content: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1E392A',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  category: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  careIndicator: {
    alignSelf: 'flex-start',
    marginTop: 4,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  careIndicatorGradient: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  careIndicatorText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});