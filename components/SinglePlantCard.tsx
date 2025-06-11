import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Droplets, Sun, Cloud, Thermometer, Tractor, Scissors, Sprout, BookOpen, Leaf, Sun as SunIcon, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plant } from '@/data/plantsData';

const { width } = Dimensions.get('window');

interface SinglePlantCardProps {
  plant: Plant;
  onBack?: () => void;
}

export function SinglePlantCard({ plant, onBack }: SinglePlantCardProps) {
  // const quote = `"The best ${plant.name} is the one you grow with love."`; // Placeholder quote

  const getInfoValue = (value: string | undefined, placeholder: string) => {
    return value && value.trim() !== '' ? value : placeholder;
  };

  return (
    <View style={styles.cardBackground}>
      <LinearGradient
        colors={['#E8F5E8', '#F0F8F0', '#FFFFFF']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContainerContent}> 
          {/* Back Button */}
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.backButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ArrowLeft size={24} color="#1E392A" />
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          <Text style={styles.plantNameHeading}>{plant.name}</Text>
          
          <View style={styles.imageContainer}>
            <LinearGradient
              colors={['#4CAF50', '#66BB6A', '#81C784']}
              style={styles.imageGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' }} 
                style={styles.plantImage} 
              />
              <View style={styles.quoteOverlay}>
                <Text style={styles.quoteText}>{plant.quote || "A beautiful plant for a beautiful home."}</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.infoPanel}>
            {getInfoValue(plant.category, "Unknown") !== "Unknown" && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Plant Type</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.category, "Unknown")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.light, "Unknown") !== "Unknown" && (
              <View style={styles.infoRow}>
                <SunIcon size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Sun Exposure</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.light, "Unknown")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.humidity, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <Cloud size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Humidity</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.humidity, "N/A")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.temperature, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <Thermometer size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Temperature</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.temperature, "N/A")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.fertilizer, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <Tractor size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Fertilizer</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.fertilizer, "N/A")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.pruning, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <Scissors size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Pruning</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.pruning, "N/A")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.propagation, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <Sprout size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Propagation</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.propagation, "N/A")}</Text>
              </View>
            )}
            {getInfoValue(plant.care.notes, "N/A") !== "N/A" && (
              <View style={styles.infoRow}>
                <BookOpen size={16} color="#6B7280" style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Notes</Text>
                <Text style={styles.infoValue}>{getInfoValue(plant.care.notes, "N/A")}</Text>
              </View>
            )}
          </View>

          <View style={styles.careIconsContainer}>
            <View style={styles.careIconItem}>
              <LinearGradient
                colors={['#BBDEFB', '#90CAF9', '#64B5F6']}
                style={[styles.iconCircle, styles.waterIcon]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Droplets size={24} color="#1E392A" />
              </LinearGradient>
              <Text style={styles.careText}>Water</Text>
              <Text style={styles.careSubText}>{getInfoValue(plant.care.water, "N/A")}</Text>
            </View>
            <View style={styles.careIconItem}>
              <LinearGradient
                colors={['#FFECB3', '#FFE082', '#FFD54F']}
                style={[styles.iconCircle, styles.lightIcon]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Sun size={24} color="#1E392A" />
              </LinearGradient>
              <Text style={styles.careText}>Light</Text>
              <Text style={styles.careSubText}>{getInfoValue(plant.care.light, "N/A")}</Text>
            </View>
            {getInfoValue(plant.care.difficulty, "Unknown") !== "Unknown" && (
              <View style={styles.careIconItem}>
                <LinearGradient
                  colors={['#C8E6C9', '#A5D6A7', '#81C784']}
                  style={[styles.iconCircle, styles.difficultyIcon]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Leaf size={24} color="#1E392A" />
                </LinearGradient>
                <Text style={styles.careText}>Difficulty</Text>
                <Text style={styles.careSubText}>{getInfoValue(plant.care.difficulty, "Unknown")}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBackground: {
    width: width * 0.9,
    height: width * 1.5,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
  },
  cardContainerContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    margin: 8,
  },
  plantNameHeading: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1E392A',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageContainer: {
    width: width * 0.6,
    height: width * 0.5, 
    borderRadius: 50, 
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  imageGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  plantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  quoteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
  },
  quoteText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoPanel: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 4,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1E392A',
    textAlign: 'right',
    flexShrink: 1,
  },
  careIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(30, 57, 42, 0.1)',
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    padding: 15,
  },
  careIconItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  waterIcon: {
    backgroundColor: '#BBDEFB',
  },
  lightIcon: {
    backgroundColor: '#FFECB3',
  },
  difficultyIcon: {
    backgroundColor: '#C8E6C9',
  },
  careText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1E392A',
    marginTop: 4,
  },
  careSubText: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  backButtonGradient: {
    padding: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}); 