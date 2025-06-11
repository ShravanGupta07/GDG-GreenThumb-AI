import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image, TextInput, Modal, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, HelpCircle, LogOut, ArrowLeft, ChevronRight, Lock, MapPin, ListPlus, Pencil, Check, Eye, EyeOff, Mail, Linkedin, MessageSquare, Bug, Leaf, BarChart3, Heart, FolderTree, Flame, CheckCircle, AlertCircle, User } from 'lucide-react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { AuthService } from '@/services/authService';
import { SupportService } from '@/services/supportService';
import { PlantService, Plant as PlantType, PlantStats, Category, WishlistItem } from '@/services/plantService';
import { 
  CollapsibleSection, 
  StatCard, 
  PlantCard, 
  CategoryCard, 
  WishlistItem as WishlistItemComponent,
  AddPlantButton,
  AddWishlistButton
} from '@/components/ProfileComponents';
import { AddPlantModal } from '@/components/AddPlantModal';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('Parves Ahamad');
  const [username, setUsername] = useState('@parvesahamad');
  const [editedName, setEditedName] = useState('Parves Ahamad');
  const [isEditingName, setIsEditingName] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showHelpSupportModal, setShowHelpSupportModal] = useState(false);
  const [showRequestFeatureModal, setShowRequestFeatureModal] = useState(false);
  const [showReportBugModal, setShowReportBugModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  
  // Request feature form states
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  
  // Report bug form states
  const [bugName, setBugName] = useState('');
  const [bugEmail, setBugEmail] = useState('');
  const [bugDescription, setBugDescription] = useState('');

  // Plant management states
  const [userPlants, setUserPlants] = useState<PlantType[]>([]);
  const [plantStats, setPlantStats] = useState<PlantStats>({
    total: 0,
    healthy: 0,
    needsCare: 0,
    sick: 0,
    thriving: 0,
    byCategory: {},
    careStreak: 0,
    nextWatering: 0,
    nextFertilizing: 0
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Add Plant Modal state
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  
  // Add loading state for name update
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      // Initialize auth service first
      await AuthService.initialize();
      
      // Refresh user data to ensure we have the latest information
      const user = await AuthService.refreshUser();
      console.log('User data loaded:', user); // Debug log
      console.log('User metadata:', user?.user_metadata); // Debug log
      console.log('User email:', user?.email); // Debug log
      
      if (user) {
        // Get name from user_metadata or fallback to email prefix
        const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
        console.log('User name resolved:', userName); // Debug log
        console.log('User metadata name:', user.user_metadata?.name); // Debug log
        setName(userName);
        setEditedName(userName);
        
        // Set username from email
        if (user.email) {
          setUsername(`@${user.email.split('@')[0]}`);
        }
      } else {
        // Fallback if no user data
        console.log('No user data available, using defaults');
        setName('User');
        setEditedName('User');
        setUsername('@user');
      }
    };

    loadUserData();
    
    // Load plant management data
    loadPlantData();
  }, []);

  const loadPlantData = async () => {
    setIsLoading(true);
    try {
      const [plantsResult, statsResult, wishlistResult] = await Promise.all([
        PlantService.getUserPlants(),
        PlantService.getPlantStatistics(),
        PlantService.getUserWishlist()
      ]);

      if (plantsResult.success && plantsResult.data) {
        setUserPlants(plantsResult.data);
        // Generate categories from plants
        const categoryStats = PlantService.getCategoryStats(plantsResult.data);
        setCategories(categoryStats);
      }

      if (statsResult.success && statsResult.data) {
        setPlantStats(statsResult.data);
      }

      if (wishlistResult.success && wishlistResult.data) {
        setWishlist(wishlistResult.data);
      }
    } catch (error) {
      console.error('Failed to load plant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveName = async () => {
    try {
      // Prevent multiple rapid clicks
      if (isUpdatingName) {
        return;
      }
      
      if (editedName.trim() === '') {
        Alert.alert('Error', 'Name cannot be empty.');
        return;
      }
      
      setIsUpdatingName(true);
      console.log('Attempting to update name to:', editedName.trim()); // Debug log
      
      const success = await AuthService.updateProfile(editedName.trim());
      console.log('Update profile result:', success); // Debug log
      
      if (success) {
        try {
          // Refresh user data to get the updated name
          const user = await AuthService.refreshUser();
          console.log('Refreshed user data:', user); // Debug log
          
          if (user) {
            const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
            console.log('Setting name to:', userName); // Debug log
            setName(userName);
            setEditedName(userName);
          } else {
            // If refresh fails, just use the edited name
            console.log('User refresh failed, using edited name'); // Debug log
            setName(editedName.trim());
            setEditedName(editedName.trim());
          }
        } catch (refreshError) {
          console.error('Error refreshing user:', refreshError);
          // If refresh fails, just use the edited name
          setName(editedName.trim());
          setEditedName(editedName.trim());
        }
        
        setIsEditingName(false);
        Alert.alert('Success', 'Name updated!');
      } else {
        Alert.alert('Error', 'Failed to update name.');
      }
    } catch (error) {
      console.error('Error in handleSaveName:', error);
      Alert.alert('Error', 'An unexpected error occurred while updating your name. Please try again.');
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long.');
      return;
    }

    // In a real app, you would verify old password with your backend/Supabase.
    // Supabase's updateUser only requires the new password if the user is already authenticated.
    // For enhanced security, you might want a separate API endpoint to verify old password.

    const result = await AuthService.updatePassword(newPassword);
    if (result.success) {
      Alert.alert('Success', 'Password updated successfully!');
      setShowChangePasswordModal(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      Alert.alert('Error', result.error || 'Failed to update password. Please try again.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            router.replace('/auth');
          }
        }
      ]
    );
  };

  const handleEmailContact = () => {
    Linking.openURL('mailto:Shravan3333m@gmail.com?subject=Help & Support - GreenThumb App');
  };

  const handleLinkedInContact = () => {
    Linking.openURL('https://www.linkedin.com/in/bhavna-solanki-a03b8728a/');
  };

  const handleRequestFeature = () => {
    setShowHelpSupportModal(false);
    setShowRequestFeatureModal(true);
  };

  const handleReportBug = () => {
    setShowHelpSupportModal(false);
    setShowReportBugModal(true);
  };

  const handleSubmitFeatureRequest = async () => {
    if (!requestName.trim() || !requestEmail.trim() || !requestDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const result = await SupportService.submitFeatureRequest({
      name: requestName.trim(),
      email: requestEmail.trim(),
      description: requestDescription.trim()
    });

    if (result.success) {
      Alert.alert(
        'Success', 
        'Your feature request has been submitted successfully! We\'ll get back to you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowRequestFeatureModal(false);
              setRequestName('');
              setRequestEmail('');
              setRequestDescription('');
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to submit feature request. Please try again.');
    }
  };

  const handleSubmitBugReport = async () => {
    if (!bugName.trim() || !bugEmail.trim() || !bugDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const result = await SupportService.submitBugReport({
      name: bugName.trim(),
      email: bugEmail.trim(),
      description: bugDescription.trim()
    });

    if (result.success) {
      Alert.alert(
        'Success', 
        'Your bug report has been submitted successfully! We\'ll investigate and get back to you soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowReportBugModal(false);
              setBugName('');
              setBugEmail('');
              setBugDescription('');
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to submit bug report. Please try again.');
    }
  };

  // Plant management handlers
  const handleAddPlant = () => {
    setShowAddPlantModal(true);
  };

  const handlePlantPress = (plant: PlantType) => {
    Alert.alert('Plant Details', `Viewing details for ${plant.name}`);
  };

  const handleCategoryPress = (category: Category) => {
    Alert.alert('Category', `Viewing ${category.name} plants`);
  };

  const handleWishlistItemPress = (item: WishlistItem) => {
    Alert.alert('Wishlist Item', `Viewing ${item.plant_name}`);
  };

  const handleAddToCollection = (item: WishlistItem) => {
    Alert.alert('Add to Collection', `Adding ${item.plant_name} to your collection`);
  };

  const handleAddToWishlist = () => {
    Alert.alert('Add to Wishlist', 'This feature will be implemented in the next update!');
  };

  const menuItems = [
    { icon: Lock, label: 'Change Password', onPress: () => setShowChangePasswordModal(true), route: '' },
    { icon: HelpCircle, label: 'Help & Support', onPress: () => setShowHelpSupportModal(true), route: '' },
    { icon: LogOut, label: 'Log out', onPress: handleLogout, route: '' },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.fullScreenScrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={{ width: 24 }} /> { /* Placeholder for spacing */ }
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.noAvatarContainer}>
              <User size={60} color="#9CA3AF" />
            </View>
            <View style={styles.nameContainer}>
              {isEditingName ? (
                <TextInput
                  style={styles.profileNameInput}
                  value={editedName}
                  onChangeText={setEditedName}
                  autoFocus
                />
              ) : (
                <Text style={styles.profileName}>{name}</Text>
              )}
              <TouchableOpacity 
                onPress={() => {
                  if (isUpdatingName) {
                    return; // Prevent clicks during update
                  }
                  if (isEditingName) {
                    handleSaveName();
                  } else {
                    setIsEditingName(true);
                  }
                }}
                disabled={isUpdatingName}
              > 
                {isEditingName ? (
                  <Check size={18} color={isUpdatingName ? "#9CA3AF" : "#22C55E"} style={styles.pencilIcon} />
                ) : (
                  <Pencil size={18} color="#6B7280" style={styles.pencilIcon} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.profileUsername}>{username}</Text>
          </View>

          {/* Plant Statistics Cards */}
          <View style={styles.statsContainer}>
            <StatCard 
              title="Total Plants" 
              value={plantStats?.total || 0} 
              icon={Leaf} 
              color="#22C55E"
            />
            <StatCard 
              title="Healthy" 
              value={plantStats?.healthy || 0} 
              icon={CheckCircle} 
              color="#10B981"
            />
            <StatCard 
              title="Needs Care" 
              value={plantStats?.needsCare || 0} 
              icon={AlertCircle} 
              color="#F59E0B"
            />
            <StatCard 
              title="Care Streak" 
              value={`${plantStats?.careStreak || 0} days`} 
              icon={Flame} 
              color="#EF4444"
            />
          </View>

          {/* My Plants Section */}
          <CollapsibleSection 
            title="My Plants" 
            icon={Leaf}
            showAddButton={true}
            onAddPress={handleAddPlant}
          >
            {userPlants && userPlants.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plantsScrollContainer}>
                {userPlants.map((plant) => (
                  <PlantCard 
                    key={plant.id} 
                    plant={plant} 
                    onPress={() => handlePlantPress(plant)}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.emptyStateText}>No plants added yet</Text>
            )}
          </CollapsibleSection>

          {/* Plant Categories Section */}
          <CollapsibleSection 
            title="Plant Categories" 
            icon={FolderTree}
          >
            <View style={styles.categoriesRow}>
              {categories && categories.filter(c => c.name === 'Indoor').map((category) => (
                <CategoryCard 
                  key={category.name}
                  category={category}
                  onPress={() => handleCategoryPress(category)}
                />
              ))}
              {categories && categories.filter(c => c.name === 'Outdoor').map((category) => (
                <CategoryCard 
                  key={category.name}
                  category={category}
                  onPress={() => handleCategoryPress(category)}
                />
              ))}
            </View>
            <View style={styles.categoriesRowCenter}>
              {categories && categories.filter(c => c.name === 'Succulent').map((category) => (
                <CategoryCard 
                  key={category.name}
                  category={category}
                  onPress={() => handleCategoryPress(category)}
                />
              ))}
            </View>
          </CollapsibleSection>

          {/* Plant Wishlist Section */}
          {/* <CollapsibleSection 
            title="Plant Wishlist" 
            icon={Heart}
            count={wishlist.length}
          >
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <WishlistItemComponent 
                  key={item.id}
                  item={item}
                  onPress={() => handleWishlistItemPress(item)}
                  onAddToCollection={() => handleAddToCollection(item)}
                />
              ))
            ) : (
              <Text style={styles.emptyStateText}>No plants in wishlist</Text>
            )}
            <AddWishlistButton onPress={handleAddToWishlist} />
          </CollapsibleSection> */}

          {/* Settings Section */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemContent}>
                    <IconComponent size={20} color="#6B7280" />
                    <Text style={styles.menuItemText}>
                      {item.label}
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* App Version and Info */}
          <View style={styles.appInfoContainer}>
            <Text style={styles.appInfoText}>App Version: {Constants.expoConfig?.version ?? 'N/A'}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={showChangePasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowChangePasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.passwordModalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Old Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter old password"
                  secureTextEntry={!showOldPassword}
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
                <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
                  {showOldPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter new password"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
                  {showNewPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm new password"
                  secureTextEntry={!showConfirmNewPassword}
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)} style={styles.eyeIcon}>
                  {showConfirmNewPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.resetPasswordButton} onPress={handleChangePassword}>
              <Text style={styles.resetPasswordButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowChangePasswordModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showHelpSupportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHelpSupportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.helpModalContainer}>
            <Text style={styles.modalTitle}>Help & Support</Text>
            
            <TouchableOpacity style={styles.helpOption} onPress={handleEmailContact}>
              <View style={styles.helpOptionContent}>
                <Mail size={24} color="#22C55E" />
                <View style={styles.helpOptionText}>
                  <Text style={styles.helpOptionTitle}>Email Us</Text>
                  <Text style={styles.helpOptionSubtitle}>Get in touch via email</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpOption} onPress={handleLinkedInContact}>
              <View style={styles.helpOptionContent}>
                <Linkedin size={24} color="#0077B5" />
                <View style={styles.helpOptionText}>
                  <Text style={styles.helpOptionTitle}>LinkedIn</Text>
                  <Text style={styles.helpOptionSubtitle}>Connect with us on LinkedIn</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpOption} onPress={handleRequestFeature}>
              <View style={styles.helpOptionContent}>
                <MessageSquare size={24} color="#8B5CF6" />
                <View style={styles.helpOptionText}>
                  <Text style={styles.helpOptionTitle}>Request a Feature</Text>
                  <Text style={styles.helpOptionSubtitle}>Suggest new features</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpOption} onPress={handleReportBug}>
              <View style={styles.helpOptionContent}>
                <Bug size={24} color="#EF4444" />
                <View style={styles.helpOptionText}>
                  <Text style={styles.helpOptionTitle}>Report a Bug</Text>
                  <Text style={styles.helpOptionSubtitle}>Report an issue</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowHelpSupportModal(false)}>
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showRequestFeatureModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRequestFeatureModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.requestModalContainer}>
            <Text style={styles.modalTitle}>Request a Feature</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  value={requestName}
                  onChangeText={setRequestName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  value={requestEmail}
                  onChangeText={setRequestEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Feature Request</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe the feature you'd like to see..."
                  value={requestDescription}
                  onChangeText={setRequestDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeatureRequest}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowRequestFeatureModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showReportBugModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReportBugModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.reportModalContainer}>
            <Text style={styles.modalTitle}>Report a Bug</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  value={bugName}
                  onChangeText={setBugName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  value={bugEmail}
                  onChangeText={setBugEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bug Description</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe the bug..."
                  value={bugDescription}
                  onChangeText={setBugDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBugReport}>
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowReportBugModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Plant Modal */}
      <AddPlantModal
        visible={showAddPlantModal}
        onClose={() => setShowAddPlantModal(false)}
        onPlantAdded={loadPlantData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  fullScreenScrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  profileInfoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  noAvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  profileNameInput: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4, // Adjust as needed to align with username
  },
  pencilIcon: {
    marginTop: 4, // Fine-tune vertical alignment
  },
  profileUsername: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  editProfileButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  menuScrollContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuContainer: {
    // backgroundColor: 'white', // Removed background color
    // borderRadius: 12, // Removed border radius
    // shadowColor: '#000', // Removed shadow
    // shadowOffset: { width: 0, height: 2 }, // Removed shadow
    // shadowOpacity: 0.05, // Removed shadow
    // shadowRadius: 4, // Removed shadow
    // elevation: 3, // Removed elevation
    // overflow: 'hidden', // Removed overflow as it's for borderRadius clipping
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
    marginHorizontal: 20,
    // Removed borderBottomWidth and borderBottomColor
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Changed gap to match CollapsibleSection
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold', // Changed font family to match CollapsibleSection
    color: '#1F2937', // Changed color to match CollapsibleSection
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  passwordModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  eyeIcon: {
    padding: 8,
  },
  resetPasswordButton: {
    backgroundColor: '#22C55E',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  resetPasswordButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  helpModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  helpOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  helpOptionText: {
    flex: 1,
  },
  helpOptionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  helpOptionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  requestModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#22C55E',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  reportModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  categoriesRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 16,
  },
  plantsScrollContainer: {
    // Removed paddingHorizontal
  },
  appInfoContainer: {
    padding: 20,
    borderTopWidth: 0,
    alignItems: 'center',
  },
  appInfoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
});