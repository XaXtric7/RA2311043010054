import { 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip, 
  Typography,
  Paper
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventIcon from '@mui/icons-material/Event';
import { Notification } from '../services/api';

interface NotificationItemProps {
  notification: Notification;
  isRead: boolean;
  onClick: () => void;
}

export const NotificationItem = ({ notification, isRead, onClick }: NotificationItemProps) => {
  const getLevelIcon = (type: string) => {
    switch (type) {
      case 'Placement': return <SchoolIcon color="primary" />;
      case 'Result': return <AssessmentIcon color="secondary" />;
      case 'Event': return <EventIcon color="action" />;
      default: return <NotificationsIcon color="disabled" />;
    }
  };

  const getLevelColor = (type: string) => {
    switch (type) {
      case 'Placement': return 'primary';
      case 'Result': return 'secondary';
      case 'Event': return 'default';
      default: return 'default';
    }
  };

  return (
    <ListItem 
      divider 
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        backgroundColor: isRead ? 'transparent' : 'rgba(25, 118, 210, 0.05)',
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
      }}
    >
      <ListItemIcon>
        {getLevelIcon(notification.Type)}
      </ListItemIcon>
      <ListItemText 
        primary={
          <Typography variant="subtitle1" sx={{ fontWeight: isRead ? 400 : 600 }}>
            {notification.Message}
          </Typography>
        } 
        secondary={
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        } 
      />
      <Chip 
        label={notification.Type.toUpperCase()} 
        size="small" 
        color={getLevelColor(notification.Type) as any}
        variant={isRead ? 'outlined' : 'filled'}
        sx={{ ml: 2 }}
      />
    </ListItem>
  );
};
