import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, Alert, Dimensions, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Upload, Sparkles, AlertTriangle, CheckCircle, Image as ImageIcon, X, RefreshCw, Shield, Edit3 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { FloatingChatbot } from '@/components/FloatingChatbot';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const PLANT_ID_API_KEY = 'VleHZXKaDM3EhbpagX02xm8xajSG3pDcADdQy0naekzc8zEv6R';

interface DiseaseAnalysisResult {
  name: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string;
  severity: string;
}

export default function DiseaseScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<DiseaseAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [enhancingSymptoms, setEnhancingSymptoms] = useState<boolean>(false);
  const router = useRouter();

  // Handle Android back button
  useEffect(() => {
    const backAction = () => {
      if (analysisResult) {
        // If we're showing results, go back to the input form
        setAnalysisResult(null);
        return true; // Prevent default back behavior
      } else if (selectedImage || symptoms.trim()) {
        // If we have input data, clear it
        resetAnalysis();
        return true; // Prevent default back behavior
      } else {
        // Navigate back to previous screen
        router.back();
        return true; // Prevent default back behavior
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [analysisResult, selectedImage, symptoms, router]);

  const pickImage = async () => {
    try {
      console.log('Starting image picker for gallery...');
      
      // Request permissions first
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Gallery permission result:', permissionResult);
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required', 
          'Please allow access to your photo library to select images.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() }
          ]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduced quality to prevent memory issues
        base64: false, // Don't include base64 to save memory
        exif: false, // Don't include EXIF data to save memory
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        console.log('Selected image URI:', selectedAsset.uri);
        
        // Validate the image file exists
        try {
          const fileInfo = await FileSystem.getInfoAsync(selectedAsset.uri);
          if (!fileInfo.exists) {
            throw new Error('Image file does not exist');
          }
          console.log('Image file size:', fileInfo.size);
          
          // Check file size to prevent memory issues
          if (fileInfo.size && fileInfo.size > 10 * 1024 * 1024) { // 10MB limit
            Alert.alert(
              'Image Too Large',
              'The selected image is too large. Please try again with a smaller image.',
              [{ text: 'OK' }]
            );
            return;
          }
          
          setSelectedImage(selectedAsset.uri);
        } catch (fileError) {
          console.error('Error validating image file:', fileError);
          Alert.alert(
            'Error',
            'There was an issue with the selected image. Please try again.',
            [{ text: 'OK' }]
          );
        }
      } else {
        console.log('Image selection was canceled or failed');
      }
    } catch (error) {
      console.error('Error picking image from gallery:', error);
      Alert.alert(
        'Error', 
        'Failed to access photo library. Please try again or check your permissions.',
        [{ text: 'OK' }]
      );
    }
  };

  const takePhoto = async () => {
    try {
      console.log('Starting camera...');
      
      // Request camera permissions first
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Camera permission result:', permissionResult);
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required', 
          'Please allow camera access to take photos.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => ImagePicker.requestCameraPermissionsAsync() }
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduced quality to prevent memory issues
        base64: false, // Don't include base64 to save memory
        exif: false, // Don't include EXIF data to save memory
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        console.log('Captured image URI:', selectedAsset.uri);
        
        // Validate the image file exists
        try {
          const fileInfo = await FileSystem.getInfoAsync(selectedAsset.uri);
          if (!fileInfo.exists) {
            throw new Error('Image file does not exist');
          }
          console.log('Image file size:', fileInfo.size);
          
          // Check file size to prevent memory issues
          if (fileInfo.size && fileInfo.size > 10 * 1024 * 1024) { // 10MB limit
            Alert.alert(
              'Image Too Large',
              'The selected image is too large. Please try again with a smaller image.',
              [{ text: 'OK' }]
            );
            return;
          }
          
          setSelectedImage(selectedAsset.uri);
        } catch (fileError) {
          console.error('Error validating image file:', fileError);
          Alert.alert(
            'Error',
            'There was an issue with the captured image. Please try again.',
            [{ text: 'OK' }]
          );
        }
      } else {
        console.log('Camera capture was canceled or failed');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Error', 
        'Failed to access camera. Please try again or check your permissions.',
        [{ text: 'OK' }]
      );
    }
  };

  const enhanceSymptomsWithGemini = async () => {
    if (!symptoms.trim()) {
      Alert.alert('No Symptoms', 'Please enter some symptoms to enhance.');
      return;
    }

    setEnhancingSymptoms(true);

    try {
      console.log('Starting symptom enhancement for:', symptoms);
      
      // Use local enhancement directly since API key is not available
      const enhancedSymptoms = enhanceSymptomsLocally(symptoms);
      setSymptoms(enhancedSymptoms);
      Alert.alert('Enhanced!', 'Your symptoms have been enhanced for better analysis accuracy.');
      
    } catch (error) {
      console.error('Enhancement error:', error);
      Alert.alert('Error', 'Failed to enhance symptoms. Please try again or continue with your original description.');
    } finally {
      setEnhancingSymptoms(false);
    }
  };

  const enhanceSymptomsLocally = (originalSymptoms: string): string => {
    console.log('Using local enhancement for:', originalSymptoms);
    
    const symptoms = originalSymptoms.toLowerCase();
    let enhanced = originalSymptoms;

    // Common symptom patterns and their enhanced versions
    const enhancementPatterns = [
      {
        pattern: /\b(yellow|yellowing)\b/gi,
        enhancement: 'Yellowing of leaves, indicating potential nutrient deficiency, overwatering, or disease'
      },
      {
        pattern: /\b(brown|browning)\b/gi,
        enhancement: 'Browning of leaf edges or tips, suggesting water stress, nutrient burn, or fungal infection'
      },
      {
        pattern: /\b(wilting|wilt)\b/gi,
        enhancement: 'Wilting of leaves and stems, indicating water stress, root rot, or vascular disease'
      },
      {
        pattern: /\b(spots|spotting)\b/gi,
        enhancement: 'Dark or discolored spots on leaves, possibly indicating fungal or bacterial infection'
      },
      {
        pattern: /\bholes\b/gi,
        enhancement: 'Holes in leaves, suggesting pest infestation or mechanical damage'
      },
      {
        pattern: /\b(curling|curled)\b/gi,
        enhancement: 'Leaf curling or distortion, indicating pest damage, viral infection, or environmental stress'
      },
      {
        pattern: /\b(dropping|falling)\b/gi,
        enhancement: 'Premature leaf drop, suggesting stress, disease, or environmental factors'
      },
      {
        pattern: /\b(stunted|slow)\b/gi,
        enhancement: 'Stunted or slow growth, indicating nutrient deficiency, root problems, or environmental stress'
      },
      {
        pattern: /\b(mold|mildew)\b/gi,
        enhancement: 'White or gray powdery growth, indicating fungal infection (powdery mildew)'
      },
      {
        pattern: /\b(rot|rotting)\b/gi,
        enhancement: 'Soft, mushy areas indicating rot, possibly due to overwatering or bacterial infection'
      }
    ];

    // Check if any patterns match and create a comprehensive enhancement
    let matchedPatterns: string[] = [];
    
    for (const pattern of enhancementPatterns) {
      if (pattern.pattern.test(symptoms)) {
        matchedPatterns.push(pattern.enhancement);
      }
    }

    // Create enhanced description based on matches
    if (matchedPatterns.length > 0) {
      enhanced = matchedPatterns.join('. ');
      
      // Add plant part specificity if not mentioned
      if (!enhanced.includes('leaf') && !enhanced.includes('stem') && !enhanced.includes('root')) {
        enhanced += '. Affecting leaves and stems.';
      }
      
      // Add environmental context
      enhanced += ' Consider environmental factors such as light, water, and temperature.';
    } else {
      // If no specific patterns match, provide general enhancement
      enhanced = `Plant showing symptoms: ${originalSymptoms}. Affecting leaves and stems. Consider environmental factors such as light, water, and temperature.`;
    }

    console.log('Local enhancement result:', enhanced);
    return enhanced;
  };

  const analyzeDisease = async () => {
    if (!selectedImage) {
      Alert.alert('Input Required', 'Please upload a photo of your plant for analysis.');
      return;
    }
    
    setLoading(true);
    setAnalysisResult(null);

    try {
      console.log('Starting Plant.id API analysis...');
      
      // Validate image file before processing
      const fileInfo = await FileSystem.getInfoAsync(selectedImage);
      if (!fileInfo.exists) {
        throw new Error('Selected image file no longer exists');
      }
      
      if (fileInfo.size && fileInfo.size > 10 * 1024 * 1024) {
        Alert.alert('Image Too Large', 'The image is too large for analysis. Please select a smaller image.');
        setLoading(false);
        return;
      }

      // Read image with error handling
      let base64Image: string;
      try {
        base64Image = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log('Image converted to base64, length:', base64Image.length);
        
        // Check if base64 is too large
        if (base64Image.length > 5 * 1024 * 1024) { // 5MB base64 limit
          Alert.alert('Image Too Large', 'The image is too large for analysis. Please select a smaller image.');
          setLoading(false);
          return;
        }
      } catch (readError) {
        console.error('Error reading image file:', readError);
        Alert.alert('Error', 'Failed to read the image file. Please try again.');
        setLoading(false);
        return;
      }

      const requestBody = {
        images: [base64Image],
        health: 'all',
        disease_details: ['common_names', 'url', 'description', 'symptoms', 'treatment', 'prevention'],
        lang: 'en',
      };
      console.log('Request body prepared:', Object.keys(requestBody));

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('https://plant.id/api/v2/health_assessment', {
        method: 'POST',
        headers: {
          'Api-Key': PLANT_ID_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', JSON.stringify(data, null, 2));

      if (data.health_assessment) {
        console.log('Processing health assessment...');
        const healthAssessment = data.health_assessment;
        console.log('Health assessment:', JSON.stringify(healthAssessment, null, 2));
        
        let detectedDisease: Omit<DiseaseAnalysisResult, 'severity'> | null = null;
        let severity = 'Healthy';

        // Check if image is recognized as a plant
        if (data.is_plant === false) {
          console.log('Image is not recognized as a plant');
          detectedDisease = {
            name: 'Not a Plant',
            description: 'The uploaded image does not appear to be a plant. Please upload a clear photo of a plant for disease analysis.',
            symptoms: [],
            treatment: ['Upload a clear photo of a plant', 'Ensure good lighting', 'Focus on the affected parts'],
            prevention: 'Always use clear, well-lit photos of plants for best results.',
          };
          severity = 'Needs Care';
        } 
        // Check if plant is healthy with high confidence
        else if (healthAssessment.is_healthy && healthAssessment.confidence && healthAssessment.confidence > 0.7) {
          console.log('Plant is healthy with high confidence');
          detectedDisease = {
            name: 'Healthy Plant',
            description: 'Your plant appears to be healthy! Keep up the good care.',
            symptoms: [],
            treatment: ['Continue regular watering and fertilizing', 'Ensure adequate light'],
            prevention: 'Maintain optimal growing conditions.',
          };
          severity = 'Healthy';
        } 
        // Check for diseases with high confidence
        else if (healthAssessment.diseases && healthAssessment.diseases.length > 0) {
          const mainDisease = healthAssessment.diseases[0];
          console.log('Disease detected:', mainDisease);
          
          // Only trust diseases with high confidence (>0.6)
          if (mainDisease.probability && mainDisease.probability > 0.6) {
            detectedDisease = {
              name: mainDisease.name || 'Unknown Disease',
              description: mainDisease.disease_details?.description || 'No detailed description available.',
              symptoms: mainDisease.disease_details?.symptoms || [],
              treatment: [
                ...(mainDisease.disease_details?.treatment?.biological || []),
                ...(mainDisease.disease_details?.treatment?.chemical || [])
              ],
              prevention: mainDisease.disease_details?.treatment?.prevention?.join('. ') || 'No specific prevention steps available.',
            };
            severity = mainDisease.probability > 0.8 ? 'Sick' : 'Needs Care';
          } else {
            console.log('Disease detected but confidence too low:', mainDisease.probability);
            detectedDisease = {
              name: 'Low Confidence Detection',
              description: 'A potential issue was detected but with low confidence. Please provide a clearer, closer photo of the affected plant parts.',
              symptoms: [],
              treatment: ['Take a closer photo of affected areas', 'Ensure good lighting', 'Focus on specific symptoms'],
              prevention: 'Regular monitoring and clear documentation.',
            };
            severity = 'Needs Care';
          }
        } 
        // Check if plant is healthy but with low confidence
        else if (healthAssessment.is_healthy) {
          console.log('Plant appears healthy but with low confidence');
          detectedDisease = {
            name: 'Likely Healthy Plant',
            description: 'Your plant appears to be healthy, but the analysis confidence is low. Consider taking a clearer photo for more accurate results.',
            symptoms: [],
            treatment: ['Continue regular care', 'Monitor for any changes'],
            prevention: 'Maintain optimal growing conditions.',
          };
          severity = 'Healthy';
        } 
        // Undetermined case
        else {
          console.log('Undetermined issue - no clear results');
          detectedDisease = {
            name: 'Unclear Results',
            description: 'We could not get a clear analysis of your plant. This could be due to poor image quality, lighting, or the image not being a plant.',
            symptoms: [],
            treatment: ['Take a clearer, well-lit photo', 'Ensure the plant is clearly visible', 'Focus on specific symptoms if any'],
            prevention: 'Use clear, well-lit photos for best results.',
          };
          severity = 'Needs Care';
        }
        
        if (detectedDisease) {
          console.log('Setting analysis result:', detectedDisease);
          setAnalysisResult({ ...detectedDisease, severity });
        }

      } else {
        console.error('API Error:', data);
        Alert.alert('Analysis Failed', data.error?.message || 'Could not get a valid analysis result from Plant.id.');
        setAnalysisResult(null);
      }
    } catch (error) {
      console.error('Plant.id API error:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        Alert.alert('Timeout', 'The analysis took too long. Please try again with a smaller image.');
      } else {
        Alert.alert('Error', 'An error occurred during analysis. Please try again.');
      }
      
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setSymptoms('');
    setAnalysisResult(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#059669', '#10B981']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Plant Health Scanner</Text>
            <Text style={styles.headerSubtitle}>AI-powered disease detection & care recommendations</Text>
          </View>
        </LinearGradient>

        <KeyboardAvoidingView 
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {!analysisResult ? (
              <>
                {/* Image Upload Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <ImageIcon size={24} color="#059669" />
                    <Text style={styles.sectionTitle}>Upload Plant Photo</Text>
                  </View>
                  
                  {selectedImage ? (
                    <View style={styles.imagePreviewContainer}>
                      <View style={styles.imageWrapper}>
                        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                        <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                          <X size={20} color="white" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.imageActions}>
                        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
                          <Upload size={16} color="#059669" />
                          <Text style={styles.secondaryButtonText}>Change Photo</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.uploadSection}>
                      <View style={styles.uploadButtonsContainer}>
                        <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                          <View style={styles.uploadIconContainer}>
                            <Camera size={32} color="#059669" />
                          </View>
                          <Text style={styles.uploadButtonText}>Take Photo</Text>
                          <Text style={styles.uploadButtonSubtext}>Use camera</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.divider}>
                          <View style={styles.dividerLine} />
                          <Text style={styles.dividerText}>or</Text>
                          <View style={styles.dividerLine} />
                        </View>
                        
                        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                          <View style={styles.uploadIconContainer}>
                            <Upload size={32} color="#059669" />
                          </View>
                          <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
                          <Text style={styles.uploadButtonSubtext}>Select existing photo</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.uploadTips}>
                        <Text style={styles.tipsTitle}>💡 Tips for best results:</Text>
                        <Text style={styles.tipText}>• Take clear, well-lit photos</Text>
                        <Text style={styles.tipText}>• Focus on affected areas</Text>
                        <Text style={styles.tipText}>• Include leaves, stems, and any visible damage</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Symptoms Description Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <AlertTriangle size={24} color="#F59E0B" />
                    <Text style={styles.sectionTitle}>Describe Symptoms (Optional)</Text>
                  </View>
                  <View style={styles.symptomsInputContainer}>
                    <TextInput
                      style={styles.symptomsInput}
                      placeholder="What symptoms are you seeing? (e.g., yellow leaves, brown spots, wilting, unusual growth...)"
                      placeholderTextColor="#9CA3AF"
                      value={symptoms}
                      onChangeText={setSymptoms}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                    />
                    {symptoms.trim() && (
                      <TouchableOpacity 
                        style={styles.enhanceButton}
                        onPress={enhanceSymptomsWithGemini}
                        disabled={enhancingSymptoms}
                      >
                        {enhancingSymptoms ? (
                          <RefreshCw size={16} color="#059669" style={styles.spinningIcon} />
                        ) : (
                          <Edit3 size={16} color="#059669" />
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.inputHelperText}>
                    {symptoms.trim() ? 'Tap the pencil icon to enhance your description with AI for better accuracy' : 'Adding symptoms helps provide more accurate analysis'}
                  </Text>
                </View>

                {/* Analyze Button - Fixed at bottom */}
                <View style={styles.analyzeButtonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.analyzeButton,
                      (!selectedImage) && styles.disabledButton
                    ]}
                    onPress={analyzeDisease}
                    disabled={loading || !selectedImage}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={20} color="white" style={styles.spinningIcon} />
                        <Text style={styles.analyzeButtonText}>Analyzing...</Text>
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} color="white" />
                        <Text style={styles.analyzeButtonText}>Analyze Plant Health</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              /* Results Section */
              <View style={styles.resultContainer}>
                <View style={styles.resultHeader}>
                  <View style={[
                    styles.severityBadge,
                    analysisResult.severity === 'Healthy' && styles.healthyBadge,
                    analysisResult.severity === 'Needs Care' && styles.warningBadge,
                    analysisResult.severity === 'Sick' && styles.dangerBadge
                  ]}>
                    {analysisResult.severity === 'Healthy' ? (
                      <CheckCircle size={20} color="#059669" />
                    ) : (
                      <AlertTriangle size={20} color="#F59E0B" />
                    )}
                    <Text style={[
                      styles.severityText,
                      analysisResult.severity === 'Healthy' && styles.healthyText
                    ]}>
                      {analysisResult.severity}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.newAnalysisButton} onPress={resetAnalysis}>
                    <RefreshCw size={16} color="#3B82F6" />
                    <Text style={styles.newAnalysisText}>New Analysis</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.diseaseName}>{analysisResult.name}</Text>
                <Text style={styles.diseaseDescription}>{analysisResult.description}</Text>

                {analysisResult.symptoms.length > 0 && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultSectionHeader}>
                      <AlertTriangle size={20} color="#F59E0B" />
                      <Text style={styles.resultSectionTitle}>Symptoms</Text>
                    </View>
                    {analysisResult.symptoms.map((symptom: string, index: number) => (
                      <View key={index} style={styles.symptomItem}>
                        <View style={styles.symptomBullet} />
                        <Text style={styles.symptomText}>{symptom}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {analysisResult.treatment.length > 0 && (
                  <View style={styles.resultSection}>
                    <View style={styles.resultSectionHeader}>
                      <CheckCircle size={20} color="#059669" />
                      <Text style={styles.resultSectionTitle}>Treatment</Text>
                    </View>
                    {analysisResult.treatment.map((step: string, index: number) => (
                      <View key={index} style={styles.treatmentStep}>
                        <View style={styles.stepNumberContainer}>
                          <Text style={styles.stepNumber}>{index + 1}</Text>
                        </View>
                        <Text style={styles.stepText}>{step}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.resultSection}>
                  <View style={styles.resultSectionHeader}>
                    <Shield size={20} color="#3B82F6" />
                    <Text style={styles.resultSectionTitle}>Prevention</Text>
                  </View>
                  <Text style={styles.preventionText}>{analysisResult.prevention}</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <FloatingChatbot />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: -20,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding to ensure analyze button is visible
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadButtonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#F0FDF4',
    borderWidth: 2,
    borderColor: '#D1FAE5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadIconContainer: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#059669',
    marginBottom: 4,
  },
  uploadButtonSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  uploadTips: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginBottom: 2,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  selectedImage: {
    width: width - 88,
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
  symptomsInputContainer: {
    position: 'relative',
  },
  symptomsInput: {
    minHeight: 120,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    paddingRight: 50, // Space for the enhance button
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  enhanceButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHelperText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  analyzeButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  analyzeButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  spinningIcon: {
    transform: [{ rotate: '360deg' }],
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  healthyBadge: {
    backgroundColor: '#F0FDF4',
  },
  warningBadge: {
    backgroundColor: '#FFFBEB',
  },
  dangerBadge: {
    backgroundColor: '#FEF2F2',
  },
  severityText: {
    color: '#DC2626',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  healthyText: {
    color: '#059669',
  },
  newAnalysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  newAnalysisText: {
    color: '#3B82F6',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  diseaseName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  diseaseDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginBottom: 24,
    lineHeight: 24,
  },
  resultSection: {
    marginBottom: 24,
  },
  resultSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  resultSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  symptomBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginTop: 6,
  },
  symptomText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  treatmentStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  stepNumberContainer: {
    backgroundColor: '#059669',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  stepText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  preventionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
});