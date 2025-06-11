import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Leaf, Search, MessageCircle, Sparkle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const FeatureItem = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <View style={styles.featureItem}>
    <Icon size={20} color="#2F4F4F" />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

export default function Onboarding() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/bg-leaves.jpg')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/leaf.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>GreenThumb AI</Text>
          <Text style={styles.subtitle}>Your Intelligent Plant Care Assistant</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem icon={Leaf} text="Identify plants & access detailed care guides" />
          <FeatureItem icon={Search} text="Detect plant diseases using AI" />
          <FeatureItem icon={MessageCircle} text="Chat with our 24/7 plant care assistant" />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/auth/signup')}>
            <Text style={styles.primaryButtonText}>Create an Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/auth/login')}>
            <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 32,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    color: '#005600',
    fontWeight: 'bold',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '600',
  },
  features: {
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  featureText: {
    color: '#2F4F4F',
    fontSize: 16,
    marginLeft: 12,
    lineHeight: 22,
    fontWeight: '600',
  },
  buttons: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#006400',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});