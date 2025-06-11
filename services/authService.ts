import { supabase } from './supabase';

interface AuthResponse {
  success: boolean;
  error?: string;
}

class AuthServiceClass {
  private currentUser: any = null;

  async initialize(): Promise<void> {
    try {
      // Try to get the current session first
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.currentUser = session.user;
        return;
      }
      
      // If no session, try to get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.currentUser = user;
      }
    } catch (error) {
      console.error('Error initializing auth service:', error);
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Login failed. Please check your credentials.',
        };
      }

      if (data.user) {
        console.log('Login successful, user data:', data.user); // Debug log
        console.log('User metadata from login:', data.user.user_metadata); // Debug log
        this.currentUser = data.user;
        return { success: true };
      }

      return {
        success: false,
        error: 'Login failed. Please try again.',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.',
      };
    }
  }

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Signup attempt with name:', name); // Debug log
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error); // Debug log
        return {
          success: false,
          error: error.message || 'Signup failed. Please try again.',
        };
      }

      if (data.user) {
        console.log('Signup successful, user data:', data.user); // Debug log
        console.log('User metadata from signup:', data.user.user_metadata); // Debug log
        this.currentUser = data.user;
        return { success: true };
      }

      return {
        success: false,
        error: 'Signup failed. Please try again.',
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      this.currentUser = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.currentUser = session.user;
        return true;
      }
      // If no session, also try to get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Auth check error:', error);
      return false;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async refreshUser() {
    try {
      console.log('refreshUser called'); // Debug log
      
      // First try to get from session
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session data:', session); // Debug log
      
      if (session?.user) {
        this.currentUser = session.user;
        console.log('User from session:', session.user); // Debug log
        return session.user;
      }
      
      // If no session, try to get current user
      const { data: { user } } = await supabase.auth.getUser();
      console.log('User from getUser:', user); // Debug log
      
      if (user) {
        this.currentUser = user;
        console.log('User set from getUser'); // Debug log
        return user;
      }
      
      console.log('No user found in refreshUser'); // Debug log
      return null;
    } catch (error) {
      console.error('Error refreshing user:', error);
      return null;
    }
  }

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  async completeOnboarding(userId: string): Promise<boolean> {
    try {
      // In a real app, you would update the user's metadata in Supabase
      // For now, simulate success or update based on your Supabase setup
      const { data, error } = await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', userId);

      if (error) {
        console.error('Error updating onboarding status:', error);
        return false;
      }

      if (this.currentUser && this.currentUser.id === userId) {
        this.currentUser = { ...this.currentUser, onboarding_completed: true };
      }

      return true;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return false;
    }
  }

  async updateProfile(name: string): Promise<boolean> {
    try {
      console.log('updateProfile called with name:', name); // Debug log
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user from getUser:', user); // Debug log
      
      if (!user) {
        console.error('No user found in updateProfile');
        return false;
      }

      console.log('Attempting to update user with name:', name); // Debug log
      
      const { error } = await supabase.auth.updateUser({
        data: { name: name }
      });

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      console.log('User update successful, refreshing user data'); // Debug log

      // Refresh the current user data to get the updated metadata
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      console.log('Updated user data:', updatedUser); // Debug log
      
      if (updatedUser) {
        this.currentUser = updatedUser;
        console.log('Current user updated successfully'); // Debug log
      }

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }

  async updatePassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to update password. Please try again.'
        };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating password:', error);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }
}

export const AuthService = new AuthServiceClass();