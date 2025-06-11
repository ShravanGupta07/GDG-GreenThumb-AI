import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, X, Check } from 'lucide-react-native';
import { PlantService, Plant, Category } from '@/services/plantService';

interface AddPlantModalProps {
  visible: boolean;
  onClose: () => void;
  onPlantAdded: () => void; // Callback to refresh profile data
}

const plantCategories: Category[] = PlantService.getCategoryStats([]); // Use available categories

export const AddPlantModal: React.FC<AddPlantModalProps> = ({ visible, onClose, onPlantAdded }) => {
  const [plantName, setPlantName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [plantLocation, setPlantLocation] = useState('');
  const [loading, setLoading] = useState(false);

  // Health assessment states
  const [question1, setQuestion1] = useState<boolean | null>(null); // Leaves vibrant green?
  const [question2, setQuestion2] = useState<boolean | null>(null); // Yellowing leaves?
  const [question3, setQuestion3] = useState<boolean | null>(null); // New growth?

  const handleSubmit = async () => {
    if (!plantName.trim() || !selectedCategory) {
      Alert.alert('Error', 'Please fill in Plant Name and select a Category.');
      return;
    }
    
    if (question1 === null || question2 === null || question3 === null) {
      Alert.alert('Error', 'Please answer all health assessment questions.');
      return;
    }

    setLoading(true);

    const healthStatus = PlantService.determineHealthStatus(question1, question2, question3);

    const newPlant: Omit<Plant, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
      name: plantName.trim(),
      category: selectedCategory.name.toLowerCase() as Plant['category'],
      location: plantLocation.trim() || undefined,
      care_level: 'beginner', // Default or could be determined by questions too
      health_status: healthStatus,
      watering_frequency: 7, // Default, can be user input later
      fertilizing_frequency: 30, // Default, can be user input later
    };

    const result = await PlantService.addPlant(newPlant);

    if (result.success) {
      Alert.alert('Success', `Plant "${plantName}" added successfully! Health: ${healthStatus}`);
      onPlantAdded();
      handleResetAndClose();
    } else {
      Alert.alert('Error', result.error || 'Failed to add plant.');
    }
    setLoading(false);
  };

  const handleResetAndClose = () => {
    setPlantName('');
    setSelectedCategory(null);
    setPlantLocation('');
    setQuestion1(null);
    setQuestion2(null);
    setQuestion3(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleResetAndClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Plant</Text>
              <TouchableOpacity onPress={handleResetAndClose}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Plant Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Fiddle Leaf Fig"
                value={plantName}
                onChangeText={setPlantName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <TouchableOpacity 
                style={styles.dropdownTrigger}
                onPress={() => Alert.alert(
                  'Select Category',
                  'Please select one:',
                  plantCategories.map(cat => ({ 
                    text: cat.name, 
                    onPress: () => setSelectedCategory(cat) 
                  }))
                )}
              >
                <Text style={styles.dropdownText}>
                  {selectedCategory ? selectedCategory.name : 'Select a category'}
                </Text>
                <ChevronDown size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Living Room window, Patio"
                value={plantLocation}
                onChangeText={setPlantLocation}
              />
            </View>

            <Text style={styles.sectionHeading}>Health Assessment</Text>
            <Text style={styles.sectionSubHeading}>Answer a few questions about your plant's current state:</Text>

            <View style={styles.questionGroup}>
              <Text style={styles.questionText}>1. Are the leaves vibrant green and firm?</Text>
              <View style={styles.answerOptions}>
                <TouchableOpacity 
                  style={[styles.answerButton, question1 === true && styles.answerSelected]}
                  onPress={() => setQuestion1(true)}
                >
                  <CheckCircle size={18} color={question1 === true ? 'white' : '#10B981'} />
                  <Text style={[styles.answerButtonText, question1 === true && styles.answerButtonTextSelected]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.answerButton, question1 === false && styles.answerSelected]}
                  onPress={() => setQuestion1(false)}
                >
                  <X size={18} color={question1 === false ? 'white' : '#EF4444'} />
                  <Text style={[styles.answerButtonText, question1 === false && styles.answerButtonTextSelected]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.questionGroup}>
              <Text style={styles.questionText}>2. Are there any yellowing or browning leaves?</Text>
              <View style={styles.answerOptions}>
                <TouchableOpacity 
                  style={[styles.answerButton, question2 === true && styles.answerSelected]}
                  onPress={() => setQuestion2(true)}
                >
                  <CheckCircle size={18} color={question2 === true ? 'white' : '#EF4444'} />
                  <Text style={[styles.answerButtonText, question2 === true && styles.answerButtonTextSelected]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.answerButton, question2 === false && styles.answerSelected]}
                  onPress={() => setQuestion2(false)}
                >
                  <X size={18} color={question2 === false ? 'white' : '#10B981'} />
                  <Text style={[styles.answerButtonText, question2 === false && styles.answerButtonTextSelected]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.questionGroup}>
              <Text style={styles.questionText}>3. Do you see any new growth (new leaves, buds, etc.)?</Text>
              <View style={styles.answerOptions}>
                <TouchableOpacity 
                  style={[styles.answerButton, question3 === true && styles.answerSelected]}
                  onPress={() => setQuestion3(true)}
                >
                  <CheckCircle size={18} color={question3 === true ? 'white' : '#10B981'} />
                  <Text style={[styles.answerButtonText, question3 === true && styles.answerButtonTextSelected]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.answerButton, question3 === false && styles.answerSelected]}
                  onPress={() => setQuestion3(false)}
                >
                  <X size={18} color={question3 === false ? 'white' : '#EF4444'} />
                  <Text style={[styles.answerButtonText, question3 === false && styles.answerButtonTextSelected]}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Adding Plant...' : 'Add Plant'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleResetAndClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%', // Adjust height to fit content
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  dropdownTrigger: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 8,
  },
  sectionSubHeading: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 16,
  },
  questionGroup: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginBottom: 12,
  },
  answerOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  answerSelected: {
    backgroundColor: '#22C55E',
  },
  answerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  answerButtonTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
}); 