import { supabase } from './supabase';

export interface FeatureRequest {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  description: string;
  status?: 'pending' | 'in_review' | 'approved' | 'rejected' | 'implemented';
  created_at?: string;
}

export interface BugReport {
  id?: string;
  user_id?: string;
  name: string;
  email: string;
  description: string;
  status?: 'pending' | 'investigating' | 'fixed' | 'wont_fix';
  priority?: 'low' | 'medium' | 'high' | 'critical';
  created_at?: string;
}

class SupportServiceClass {
  // Submit a feature request
  async submitFeatureRequest(request: FeatureRequest): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('feature_requests')
        .insert([
          {
            user_id: user?.id || null,
            name: request.name,
            email: request.email,
            description: request.description,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Feature request submission error:', error.message);
        return { success: false, error: 'Failed to submit feature request. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Feature request submission exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Submit a bug report
  async submitBugReport(report: BugReport): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('bug_reports')
        .insert([
          {
            user_id: user?.id || null,
            name: report.name,
            email: report.email,
            description: report.description,
            status: 'pending',
            priority: 'medium'
          }
        ]);

      if (error) {
        console.error('Bug report submission error:', error.message);
        return { success: false, error: 'Failed to submit bug report. Please try again.' };
      }

      return { success: true };
    } catch (error) {
      console.error('Bug report submission exception:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  // Get feature requests for the current user
  async getUserFeatureRequests(): Promise<{ success: boolean; data?: FeatureRequest[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('feature_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get feature requests error:', error.message);
        return { success: false, error: 'Failed to fetch feature requests.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get feature requests exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }

  // Get bug reports for the current user
  async getUserBugReports(): Promise<{ success: boolean; data?: BugReport[]; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('bug_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get bug reports error:', error.message);
        return { success: false, error: 'Failed to fetch bug reports.' };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Get bug reports exception:', error);
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
}

export const SupportService = new SupportServiceClass(); 