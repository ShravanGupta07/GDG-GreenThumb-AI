import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Calendar, Leaf } from 'lucide-react-native';
import { Plant } from '@/data/plantsData';

const { width } = Dimensions.get('window');

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
}

export function PlantDetail({ plant, onBack }: PlantDetailProps) {
  const [activeTab, setActiveTab] = useState('About');

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
  return (
          <View>
            <Text style={styles.sectionTitle}>Care</Text>
            <Text style={styles.careDescription}>{plant.description}</Text>
            <Text style={styles.careTopic}>Light</Text>
            <Text style={styles.careDetailText}>{plant.care.light}</Text>
        
            {/* Additional care details from existing structure */}
            <Text style={styles.careTopic}>Watering</Text>
            <Text style={styles.careDetailText}>{plant.care.water}</Text>
            <Text style={styles.careTopic}>Humidity</Text>
            <Text style={styles.careDetailText}>{plant.care.humidity}</Text>
            <Text style={styles.careTopic}>Temperature</Text>
            <Text style={styles.careDetailText}>{plant.care.temperature}</Text>
            {plant.care.fertilizer && (
              <>
                <Text style={styles.careTopic}>Fertilizer</Text>
                <Text style={styles.careDetailText}>{plant.care.fertilizer}</Text>
              </>
            )}
            {plant.care.pruning && (
              <>
                <Text style={styles.careTopic}>Pruning</Text>
                <Text style={styles.careDetailText}>{plant.care.pruning}</Text>
              </>
            )}
            {plant.care.propagation && (
              <>
                <Text style={styles.careTopic}>Propagation</Text>
                <Text style={styles.careDetailText}>{plant.care.propagation}</Text>
              </>
            )}
            {plant.care.notes && (
              <>
                <Text style={styles.careTopic}>Notes</Text>
                <Text style={styles.careDetailText}>{plant.care.notes}</Text>
              </>
            )}
          </View>
        );
      case 'Tips':
        return (
          <View>
            <Text style={styles.sectionTitle}>Pro Tips</Text>
            {plant.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipNumber}>{index + 1}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        );
      case 'Activity':
        return (
          <View>
            <Text style={styles.sectionTitle}>Common Issues</Text>
            {plant.commonIssues.map((issue, index) => (
              <View key={index} style={styles.issueCard}>
                <Text style={styles.issueTitle}>{issue.issue}</Text>
                <Text style={styles.issueCause}>Cause: {issue.cause}</Text>
                <Text style={styles.issueSolution}>Solution: {issue.solution}</Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.headerContent}>
          <Text style={styles.locationText}>Living Room</Text>
          <Text style={styles.plantName}>{plant.name}</Text>
        </View>
        <Image source={{ uri: plant.image }} style={styles.topImage} />
        <View style={styles.careCardsContainer}>
          <View style={styles.careCard}>
            <View style={styles.careCardIconContainer}>
              <Calendar size={24} color="#1E392A" />
            </View>
            <Text style={styles.careCardLabel}>Water</Text>
            <Text style={styles.careCardValue}>in 6 Days</Text>
          </View>
          <View style={styles.careCard}>
            <View style={styles.careCardIconContainer}>
              <Leaf size={24} color="#1E392A" />
            </View>
            <Text style={styles.careCardLabel}>Fertilizing</Text>
            <Text style={styles.careCardValue}>in 28 Days</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section - Content and Tabs */}
      <View style={styles.bottomSection}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab('About')} style={[styles.tabButton, activeTab === 'About' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>About</Text>
            {activeTab === 'About' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Tips')} style={[styles.tabButton, activeTab === 'Tips' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Tips' && styles.activeTabText]}>Tips</Text>
            {activeTab === 'Tips' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Activity')} style={[styles.tabButton, activeTab === 'Activity' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Activity' && styles.activeTabText]}>Activity</Text>
            {activeTab === 'Activity' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.tabContentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.tabContent}>
            {renderContent()}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E392A',
  },
  topSection: {
    backgroundColor: '#1E392A',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 120, // This creates space for the image and cards to overlap
    position: 'relative',
  },
  headerContent: {
    marginBottom: 20,
    width: '60%',
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#A3D9B0',
    marginBottom: 4,
  },
  plantName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  topImage: {
    width: width * 0.4,
    height: width * 0.8,
    position: 'absolute',
    bottom: 0,
    right: 20,
    resizeMode: 'contain',
    zIndex: 1,
  },
  careCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: -60, // Adjust as needed to overlap with bottom section
    paddingHorizontal: 20,
    zIndex: 2,
  },
  careCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  careCardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  careCardLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  careCardValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -80, // Negative margin to pull it up over the top section
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 0, // Ensure it's below the care cards
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTab: {
    // No specific background for active tab button, only indicator
  },
  activeTabText: {
    color: '#F59E0B',
  },
  activeTabIndicator: {
    height: 3,
    width: '80%',
    backgroundColor: '#F59E0B',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  tabContentScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  careDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  careTopic: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 4,
  },
  careDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipNumber: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#22C55E',
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 24,
  },
  issueCard: {
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  issueTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginBottom: 4,
  },
  issueCause: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
    marginBottom: 4,
  },
  issueSolution: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4B5563',
  },
});