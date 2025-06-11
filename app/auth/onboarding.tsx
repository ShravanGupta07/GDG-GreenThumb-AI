import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Leaf, Search, MessageCircle, BarChart3, Sparkle } from 'lucide-react-native';

interface FeatureItemProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, description }) => (
  <View style={styles.featureItem}>
    <Icon size={22} color="#BBF7D0" />
    <Text style={styles.featureText}>{description}</Text>
  </View>
);

export default function Onboarding() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#22C55E', '#16A34A']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Sparkle size={64} color="#FFFFFF" style={styles.logo} />
        <Text style={styles.title}>GreenThumb AI</Text>
        <Text style={styles.subtitle}>
          Your Intelligent Plant Care Assistant
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureItem icon={Leaf} description="Identify plants & access detailed care guides" />
        <FeatureItem icon={Search} description="Detect plant diseases using AI" />
        <FeatureItem icon={MessageCircle} description="Chat with our 24/7 plant care assistant" />
        <FeatureItem icon={BarChart3} description="Monitor and track your garden's growth" />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.getStartedButton} onPress={() => router.replace('/auth/signup')}>
          <Text style={styles.getStartedButtonText}>Create an Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={() => router.replace('/auth/login')}>
          <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1FAE5',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  featuresContainer: {
    width: '100%',
    marginVertical: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#F0FDF4',
    marginLeft: 12,
    lineHeight: 22,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  getStartedButtonText: {
    color: '#16A34A',
    fontSize: 17,
    fontWeight: '600',
  },
  signInButton: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});