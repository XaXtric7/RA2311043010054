import axios from 'axios';
import { Logger } from '../utils/logger';

const BASE_URL = 'http://20.207.122.201/evaluation-service';

export interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

const TYPE_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

export const fetchNotifications = async (params?: { limit?: number; page?: number; notification_type?: string }) => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, { params });
    await Logger.Log('frontend', 'info', 'api', `Fetched ${response.data.notifications?.length || 0} notifications`);
    return response.data.notifications as Notification[];
  } catch (error: any) {
    await Logger.Log('frontend', 'error', 'api', `Failed to fetch notifications: ${error.message}`);
    // Return empty array on error to prevent UI crash
    return [];
  }
};

export const getPriorityNotifications = (notifications: Notification[], n: number = 10) => {
  return [...notifications]
    .sort((a, b) => {
      const weightA = TYPE_WEIGHTS[a.Type] || 0;
      const weightB = TYPE_WEIGHTS[b.Type] || 0;
      
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, n);
};
