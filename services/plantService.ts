import { supabase } from './supabase';
import { subDays } from 'date-fns/subDays';
import { format } from 'date-fns/format';
import { isSameDay } from 'date-fns/isSameDay';

export interface Plant {
  id?: string;
  user_id?: string;
  name: string;
  scientific_name?: string;
  category: 'indoor' | 'outdoor' | 'succulent' | 'herb' | 'flower' | 'tree' | 'cactus' | 'fern';
  image_url?: string;
  description?: string;
  care_level: 'beginner' | 'intermediate' | 'expert';
  health_status: 'healthy' | 'needs_care' | 'sick' | 'thriving';
  location?: string;
  purchase_date?: string;
  last_watered?: string;
  last_fertilized?: string;
  next_watering_date?: string;
  next_fertilizing_date?: string;
  watering_frequency: number;
  fertilizing_frequency: number;
  created_at?: string;
  updated_at?: string;
}

export interface WishlistItem {
  id?: string;
  user_id?: string;
  plant_name: string;
  scientific_name?: string;
  category?: string;
  reason?: string;
  priority: number;
  estimated_cost?: number;
  notes?: string;
  created_at?: string;
}

export interface PlantStats {
  total: number;
  healthy: number;
  needsCare: number;
  sick: number;
  thriving: number;
  byCategory: { [key: string]: number };
  careStreak: number;
  nextWatering: number;
  nextFertilizing: number;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
  color: string;
}

class PlantServiceClass {
  // Get all plants for the current user
  async getUserPlants(): Promise<{ success: boolean; data?: Plant[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get plants error:', error.message);
        return { success: false, error: 'Failed to fetch plants.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get plants exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Add a new plant
  async addPlant(plantData: Omit<Plant, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('plants')
        .insert([
          {
            user_id: user.id,
            ...plantData,
            next_watering_date: this.calculateNextWateringDate(plantData.watering_frequency),
            next_fertilizing_date: this.calculateNextFertilizingDate(plantData.fertilizing_frequency)
          }
        ]);

      if (error) {
        console.error('Add plant error:', error.message);
        return { success: false, error: 'Failed to add plant. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Add plant exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Update a plant
  async updatePlant(plantId: string, updates: Partial<Plant>): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('plants')
        .update(updates)
        .eq('id', plantId);

      if (error) {
        console.error('Update plant error:', error.message);
        return { success: false, error: 'Failed to update plant. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Update plant exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Delete a plant
  async deletePlant(plantId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('plants')
        .delete()
        .eq('id', plantId);

      if (error) {
        console.error('Delete plant error:', error.message);
        return { success: false, error: 'Failed to delete plant. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Delete plant exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Get plant statistics
  async getPlantStatistics(): Promise<{ success: boolean; data?: PlantStats; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data: plants, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Get plant statistics error:', error.message);
        return { success: false, error: 'Failed to fetch plant statistics.' };
      }

      const stats = this.calculatePlantStats(plants || []);
      return { success: true, data: stats };
    } catch (error) {
      console.error('Get plant statistics exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Get plants by category
  async getPlantsByCategory(category: string): Promise<{ success: boolean; data?: Plant[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get plants by category error:', error.message);
        return { success: false, error: 'Failed to fetch plants.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get plants by category exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Get plants needing care
  async getPlantsNeedingCare(): Promise<{ success: boolean; data?: Plant[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', user.id)
        .or(`health_status.eq.needs_care,health_status.eq.sick,next_watering_date.lte.${today},next_fertilizing_date.lte.${today}`)
        .order('next_watering_date', { ascending: true });

      if (error) {
        console.error('Get plants needing care error:', error.message);
        return { success: false, error: 'Failed to fetch plants.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get plants needing care exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Get user's wishlist
  async getUserWishlist(): Promise<{ success: boolean; data?: WishlistItem[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('plant_wishlist')
        .select('*')
        .eq('user_id', user.id)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get wishlist error:', error.message);
        return { success: false, error: 'Failed to fetch wishlist.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get wishlist exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Add item to wishlist
  async addToWishlist(wishlistItem: Omit<WishlistItem, 'id' | 'user_id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { error } = await supabase
        .from('plant_wishlist')
        .insert([
          {
            user_id: user.id,
            ...wishlistItem
          }
        ]);

      if (error) {
        console.error('Add to wishlist error:', error.message);
        return { success: false, error: 'Failed to add to wishlist. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Add to wishlist exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Remove item from wishlist
  async removeFromWishlist(itemId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('plant_wishlist')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Remove from wishlist error:', error.message);
        return { success: false, error: 'Failed to remove from wishlist. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Remove from wishlist exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Get category statistics
  getCategoryStats(plants: Plant[]): Category[] {
    const categories = [
      { name: 'Indoor', icon: 'home', color: '#3B82F6' },
      { name: 'Outdoor', icon: 'tree', color: '#10B981' },
      { name: 'Succulent', icon: 'leaf', color: '#F59E0B' },
      { name: 'Herb', icon: 'sprout', color: '#8B5CF6' },
      { name: 'Flower', icon: 'flower', color: '#EC4899' },
      { name: 'Tree', icon: 'tree-pine', color: '#059669' },
      { name: 'Cactus', icon: 'cactus', color: '#D97706' },
      { name: 'Fern', icon: 'leaf', color: '#059669' }
    ];

    return categories.map(cat => ({
      ...cat,
      count: plants.filter(plant => plant.category === cat.name.toLowerCase()).length
    }));
  }

  // Helper methods
  private calculatePlantStats(plants: Plant[]): PlantStats {
    const total = plants.length;
    const healthy = plants.filter(p => p.health_status === 'healthy').length;
    const needsCare = plants.filter(p => p.health_status === 'needs_care').length;
    const sick = plants.filter(p => p.health_status === 'sick').length;
    const thriving = plants.filter(p => p.health_status === 'thriving').length;

    const byCategory: { [key: string]: number } = {};
    plants.forEach(plant => {
      byCategory[plant.category] = (byCategory[plant.category] || 0) + 1;
    });

    const today = new Date();
    const nextWatering = plants.filter(p => {
      if (!p.next_watering_date) return false;
      const wateringDate = new Date(p.next_watering_date);
      return wateringDate <= today;
    }).length;

    const nextFertilizing = plants.filter(p => {
      if (!p.next_fertilizing_date) return false;
      const fertilizingDate = new Date(p.next_fertilizing_date);
      return fertilizingDate <= today;
    }).length;

    // Calculate care streak (simplified - you can enhance this)
    const careStreak = this.calculateCareStreak(plants);

    return {
      total,
      healthy,
      needsCare,
      sick,
      thriving,
      byCategory,
      careStreak,
      nextWatering,
      nextFertilizing
    };
  }

  private calculateCareStreak(plants: Plant[]): number {
    const careDates: Set<string> = new Set();

    plants.forEach(plant => {
      if (plant.last_watered) {
        careDates.add(format(new Date(plant.last_watered), 'yyyy-MM-dd'));
      }
      if (plant.last_fertilized) {
        careDates.add(format(new Date(plant.last_fertilized), 'yyyy-MM-dd'));
      }
    });

    const sortedUniqueCareDates = Array.from(careDates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    let currentDate = new Date();
    const todayFormatted = format(currentDate, 'yyyy-MM-dd');

    // Check if there was care today
    if (careDates.has(todayFormatted)) {
      streak = 1;
    }

    // Continue checking for consecutive days backwards
    for (let i = 1; i < sortedUniqueCareDates.length + 2; i++) { // +2 to check yesterday and before
      const previousDay = subDays(currentDate, i);
      const previousDayFormatted = format(previousDay, 'yyyy-MM-dd');

      if (careDates.has(previousDayFormatted)) {
        streak++;
      } else {
        // If the previous day is not today and no care was recorded, break the streak
        // This handles cases where the streak might have started days ago, and today there's no care.
        if (!isSameDay(previousDay, subDays(currentDate, 1)) || !careDates.has(todayFormatted)) {
            break;
        }
      }
      // If we are checking the day before a day with recorded care, and that day had no care, but today does, don't break yet
      // This is complex due to the possibility of a streak ending *before* today.
      // A simpler logic is to iterate from today backwards.
    }

    // Corrected logic for streak calculation:
    streak = 0;
    currentDate = new Date(); // Start from today
    let foundRecentCare = false;

    // Check today first
    if (careDates.has(format(currentDate, 'yyyy-MM-dd'))) {
      streak = 1;
      foundRecentCare = true;
    }

    let dayToCheck = currentDate;

    while (true) {
      dayToCheck = subDays(dayToCheck, 1);
      const formattedDayToCheck = format(dayToCheck, 'yyyy-MM-dd');

      if (careDates.has(formattedDayToCheck)) {
        streak++;
        foundRecentCare = true; // Ensure this is true if we find a care day
      } else {
        // If we haven't found any care days yet, and we encounter a gap, the streak is 0
        if (!foundRecentCare) {
          streak = 0;
          break;
        }
        // If we found recent care but hit a gap, the streak ends
        break;
      }
    }

    return streak;
  }

  private calculateNextWateringDate(frequency: number): string {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + frequency);
    return nextDate.toISOString().split('T')[0];
  }

  private calculateNextFertilizingDate(frequency: number): string {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + frequency);
    return nextDate.toISOString().split('T')[0];
  }

  // Determine plant health status based on user answers
  determineHealthStatus(
    q1_vibrantLeaves: boolean,
    q2_yellowingLeaves: boolean,
    q3_newGrowth: boolean
  ): Plant['health_status'] {
    if (q1_vibrantLeaves && q3_newGrowth && !q2_yellowingLeaves) {
      return 'thriving';
    } else if (q1_vibrantLeaves && !q2_yellowingLeaves) {
      return 'healthy';
    } else if (q2_yellowingLeaves && !q3_newGrowth) {
      return 'sick';
    } else if (q2_yellowingLeaves) {
      return 'needs_care';
    } else if (q3_newGrowth) {
      return 'healthy'; // Even if not vibrant, new growth is a good sign
    } else {
      return 'healthy'; // Default safe state
    }
  }
}

export const PlantService = new PlantServiceClass(); 