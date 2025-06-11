import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ColorValue } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { AuthService } from '@/services/authService';
// Removed SvgUri import

// Import SVGs as components
import ReforestationBroSvg from '../../assets/Reforestation-bro.svg';
import BloomingBroSvg from '../../assets/Blooming-bro.svg';
import MangoTreeBroSvg from '../../assets/Mango tree-bro.svg';
import CoffeeBeanBroSvg from '../../assets/coffee bean-bro.svg';

interface OnboardingSlide {
  image: React.ComponentType<any>; // Changed to React.ComponentType for SVG components
  colors: [ColorValue, ColorValue, ...ColorValue[]];
  title: string;
  description: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    image: ReforestationBroSvg, // Use the imported SVG component
    colors: ['#D4EDDA', '#A8DDA8'],
    title: 'Identify Your Plants with AI',
    description: 'Simply snap a photo and instantly know your plant\'s name and species.',
  },
  {
    image: BloomingBroSvg, // Use the imported SVG component
    colors: ['#FFE0B2', '#FFC18C'],
    title: 'Diagnose Plant Diseases',
    description: 'Our AI can detect common diseases and suggest remedies to keep your plants healthy.',
  },
  {
    image: MangoTreeBroSvg, // Use the imported SVG component
    colors: ['#BBDEFB', '#90CAF9'],
    title: 'Personalized Care Guides',
    description: 'Get tailored advice on watering, light, and nutrients for each of your plants.',
  },
  {
    image: CoffeeBeanBroSvg, // Use the imported SVG component
    colors: ['#E1BEE7', '#CE93D8'],
    title: 'Connect with Plant Experts',
    description: 'Chat with our community and experts for instant help and tips.',
  },
];

export default function OnboardingQuestions() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentUser = AuthService.getCurrentUser();

  const handleNext = async () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await completeOnboardingFlow();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = async () => {
    await completeOnboardingFlow();
  };

  const completeOnboardingFlow = async () => {
    if (currentUser?.id) {
      const success = await AuthService.completeOnboarding(currentUser.id);
      if (!success) {
        console.error('Failed to save onboarding status.');
      }
    }
    router.replace('/(tabs)'); // Go to main app after completion/skip
  };

  const currentSlideData = onboardingSlides[currentSlide];
  const CurrentSvgComponent = currentSlideData.image; // Get the SVG component

  return (
    <LinearGradient
      colors={currentSlideData.colors}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Render the SVG component */}
        <CurrentSvgComponent width="80%" height="40%" style={styles.image} />
        <Text style={styles.title}>{currentSlideData.title}</Text>
        <Text style={styles.description}>{currentSlideData.description}</Text>
      </View>

      <View style={styles.pagination}>
        {onboardingSlides.map((_, index) => (
          <View 
            key={index} 
            style={[styles.dot, index === currentSlide && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={[styles.navButton, currentSlide === 0 && styles.disabledNavButton]}
          onPress={handleBack}
          disabled={currentSlide === 0}
        >
          <ArrowLeft size={24} color={currentSlide === 0 ? '#B0B0B0' : '#22C55E'} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={handleNext}
        >
          <ArrowRight size={24} color="#22C55E" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  image: {
    width: '80%', // This will be passed as a prop to the SVG component
    height: '40%', // This will be passed as a prop to the SVG component
    // resizeMode is not applicable to SVG components directly, but width/height can be passed
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#22C55E',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledNavButton: {
    opacity: 0.5,
  },
}); 