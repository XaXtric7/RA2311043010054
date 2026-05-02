import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  List, 
  AppBar, 
  Toolbar, 
  Button, 
  CircularProgress,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Logger } from './utils/logger';
import { fetchNotifications, getPriorityNotifications, Notification } from './services/api';
import { NotificationItem } from './components/NotificationItem';

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0); // 0: All, 1: Priority
  const [typeFilter, setTypeFilter] = useState('all');
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const params = typeFilter !== 'all' ? { notification_type: typeFilter } : {};
      const data = await fetchNotifications(params);
      setNotifications(data);
      await Logger.Log('frontend', 'info', 'page', `Loaded ${data.length} notifications with filter: ${typeFilter}`);
    } catch (error: any) {
      await Logger.Log('frontend', 'error', 'page', `Failed to load notifications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Load read state from local storage
    const saved = localStorage.getItem('read_notifications');
    if (saved) {
      setReadNotifications(new Set(JSON.parse(saved)));
    }
  }, [typeFilter]);

  const handleRefresh = async () => {
    await Logger.Log('frontend', 'debug', 'component', 'User triggered manual refresh');
    loadNotifications();
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    Logger.Log('frontend', 'info', 'component', `Switched to tab: ${newValue === 0 ? 'All' : 'Priority'}`);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeFilter(event.target.value);
  };

  const markAsRead = (id: string) => {
    const newRead = new Set(readNotifications);
    newRead.add(id);
    setReadNotifications(newRead);
    localStorage.setItem('read_notifications', JSON.stringify(Array.from(newRead)));
    Logger.Log('frontend', 'debug', 'component', `Marked notification ${id} as read`);
  };

  const displayedNotifications = tabValue === 0 
    ? notifications 
    : getPriorityNotifications(notifications, 10);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="sticky">
        <Toolbar>
          <NotificationsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campus Notifications
          </Typography>
          <Button color="inherit" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={loading}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification tabs">
            <Tab label="All Notifications" icon={<NotificationsIcon />} iconPosition="start" />
            <Tab label="Priority Inbox" icon={<PriorityHighIcon />} iconPosition="start" />
          </Tabs>

          {tabValue === 0 && (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Type</InputLabel>
              <Select value={typeFilter} label="Type" onChange={handleTypeChange}>
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="Placement">Placement</MenuItem>
                <MenuItem value="Result">Result</MenuItem>
                <MenuItem value="Event">Event</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>

        <Paper elevation={2}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
              <CircularProgress />
            </Box>
          ) : displayedNotifications.length === 0 ? (
            <Box sx={{ p: 8, textAlign: 'center' }}>
              <Typography color="text.secondary">No notifications found.</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {displayedNotifications.map((notif) => (
                <NotificationItem 
                  key={notif.ID} 
                  notification={notif} 
                  isRead={readNotifications.has(notif.ID)}
                  onClick={() => markAsRead(notif.ID)}
                />
              ))}
            </List>
          )}
        </Paper>
        
        {tabValue === 1 && !loading && displayedNotifications.length > 0 && (
          <Typography variant="caption" sx={{ mt: 2, display: 'block', textAlign: 'center', color: 'text.secondary' }}>
            Showing top 10 notifications weighted by Type (Placement &gt; Result &gt; Event) and Recency.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;
