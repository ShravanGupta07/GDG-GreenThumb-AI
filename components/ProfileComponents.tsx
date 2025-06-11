import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { ChevronDown, ChevronRight, Plus, Heart, Star } from 'lucide-react-native';
import { Plant, Category, WishlistItem as WishlistItemType } from '@/services/plantService';

const { width } = Dimensions.get('window');

// CollapsibleSection Component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ComponentType<any>;
  count?: number;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  onAddPress?: () => void;
  showAddButton?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  icon: IconComponent, 
  count, 
  children, 
  initiallyExpanded = false,
  onAddPress,
  showAddButton = false
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  return (
    <View style={styles.section}>
      <TouchableOpacity 
        style={styles.sectionHeader}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.sectionTitle}>
          <IconComponent size={20} color="#6B7280" />
          <Text style={styles.sectionTitleText}>{title}</Text>
          {showAddButton && isExpanded && onAddPress && (
            <TouchableOpacity 
              style={styles.addIconButton}
              onPress={(e) => {
                e.stopPropagation();
                onAddPress();
              }}
            >
              <Plus size={14} color="#22C55E" />
            </TouchableOpacity>
          )}
        </View>
        {isExpanded ? (
          <ChevronDown size={20} color="#6B7280" />
        ) : (
          <ChevronRight size={20} color="#6B7280" />
        )}
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  );
};

// StatCard Component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: IconComponent, 
  color, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.statCard, onPress && styles.statCardPressable]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <IconComponent size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value || 0}</Text>
      <Text style={styles.statTitle}>{title || ''}</Text>
    </TouchableOpacity>
  );
};

// PlantCard Component
interface PlantCardProps {
  plant: Plant;
  onPress: () => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onPress }) => {
  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'thriving': return '#059669';
      case 'needs_care': return '#F59E0B';
      case 'sick': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '🌱';
      case 'thriving': return '🌿';
      case 'needs_care': return '⚠️';
      case 'sick': return '🥀';
      default: return '🌱';
    }
  };

  return (
    <TouchableOpacity style={styles.plantCard} onPress={onPress}>
      <View style={styles.plantImageContainer}>
        <Image 
          source={{ 
            uri: plant.image_url || 'https://via.placeholder.com/100x100?text=Plant' 
          }} 
          style={styles.plantImage}
        />
        <View style={[styles.healthIndicator, { backgroundColor: getHealthColor(plant.health_status) }]}>
          <Text style={styles.healthIcon}>{getHealthIcon(plant.health_status)}</Text>
        </View>
      </View>
      <View style={styles.plantInfo}>
        <Text style={styles.plantName} numberOfLines={1}>{plant.name || 'Unnamed Plant'}</Text>
        <Text style={styles.plantCategory} numberOfLines={1}>
          {plant.category ? plant.category.charAt(0).toUpperCase() + plant.category.slice(1) : 'Unknown'}
        </Text>
        <View style={styles.plantMeta}>
          <Text style={styles.careLevel}>{plant.care_level || 'Unknown'}</Text>
          {plant.location && (
            <Text style={styles.location}>📍 {plant.location}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// CategoryCard Component
interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
      <View style={[styles.categoryIcon, { backgroundColor: (category.color || '#6B7280') + '20' }]}>
        <Text style={[styles.categoryIconText, { color: category.color || '#6B7280' }]}>
          {category.icon === 'home' ? '🏠' : 
           category.icon === 'tree' ? '🌳' :
           category.icon === 'leaf' ? '🍃' :
           category.icon === 'sprout' ? '🌱' :
           category.icon === 'flower' ? '🌸' :
           category.icon === 'tree-pine' ? '🌲' :
           category.icon === 'cactus' ? '🌵' : '🌿'}
        </Text>
      </View>
      <Text style={styles.categoryName}>{category.name || 'Unknown'}</Text>
      <Text style={styles.categoryCount}>{category.count || 0} plants</Text>
    </TouchableOpacity>
  );
};

// WishlistItem Component
interface WishlistItemProps {
  item: WishlistItemType;
  onPress: () => void;
  onAddToCollection: () => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({ 
  item, 
  onPress, 
  onAddToCollection 
}) => {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return '#EF4444';
      case 2: return '#F59E0B';
      case 3: return '#3B82F6';
      case 4: return '#10B981';
      case 5: return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <TouchableOpacity style={styles.wishlistItem} onPress={onPress}>
      <View style={styles.wishlistItemContent}>
        <View style={styles.wishlistItemHeader}>
          <Text style={styles.wishlistItemName} numberOfLines={1}>
            {item.plant_name || 'Unnamed Plant'}
          </Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority || 1) }]}>
            <Star size={12} color="white" />
            <Text style={styles.priorityText}>{item.priority || 1}</Text>
          </View>
        </View>
        
        {item.scientific_name && (
          <Text style={styles.scientificName} numberOfLines={1}>
            {item.scientific_name}
          </Text>
        )}
        
        {item.reason && (
          <Text style={styles.wishlistReason} numberOfLines={2}>
            {item.reason}
          </Text>
        )}
        
        <View style={styles.wishlistItemFooter}>
          {item.estimated_cost && (
            <Text style={styles.estimatedCost}>
              💰 ${item.estimated_cost}
            </Text>
          )}
          <TouchableOpacity 
            style={styles.addToCollectionButton}
            onPress={onAddToCollection}
          >
            <Plus size={16} color="#22C55E" />
            <Text style={styles.addToCollectionText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Add Plant Button Component
interface AddPlantButtonProps {
  onPress: () => void;
}

export const AddPlantButton: React.FC<AddPlantButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addPlantButton} onPress={onPress}>
      <Plus size={20} color="white" />
    </TouchableOpacity>
  );
};

// Add Wishlist Button Component
interface AddWishlistButtonProps {
  onPress: () => void;
}

export const AddWishlistButton: React.FC<AddWishlistButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addWishlistButton} onPress={onPress}>
      <Heart size={20} color="#22C55E" />
      <Text style={styles.addWishlistButtonText}>Add to Wishlist</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Section styles
  section: {
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionTitleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  countBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  countBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 20,
  },

  // Stat card styles
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginHorizontal: -4, // Counteract card's horizontal margin
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: (width / 2) - 28, // Adjusted width to account for new padding and margins
    height: (width / 2) - 28, // Make it square
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 4,
  },
  statCardPressable: {
    shadowOpacity: 0.15,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },

  // Plant card styles
  plantCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width * 0.45,
    marginRight: 10,
    marginBottom: 16,
  },
  plantImageContainer: {
    position: 'relative',
  },
  plantImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  healthIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthIcon: {
    fontSize: 16,
  },
  plantInfo: {
    padding: 12,
  },
  plantName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  plantCategory: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  plantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  careLevel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#22C55E',
    backgroundColor: '#22C55E20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  location: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },

  // Category card styles
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 150, // Fixed width
    height: 150, // Fixed height to make it square
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },

  // Wishlist item styles
  wishlistItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistItemContent: {
    gap: 8,
  },
  wishlistItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wishlistItemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    flex: 1,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  priorityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'white',
  },
  scientificName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    fontStyle: 'italic',
  },
  wishlistReason: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
  },
  wishlistItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  estimatedCost: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
  addToCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addToCollectionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#22C55E',
  },

  // Button styles
  addPlantButton: {
    backgroundColor: '#22C55E',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  addWishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22C55E',
    gap: 8,
    marginTop: 12,
  },
  addWishlistButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#22C55E',
  },
  addIconButton: {
    padding: 2,
    marginLeft: 6,
    borderRadius: 4,
    backgroundColor: '#22C55E20',
  },
}); 