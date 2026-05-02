import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip,
  AppBar,
  Toolbar,
  Button,
  CircularProgress
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import RefreshIcon from '@mui/icons-material/Refresh'
import { log } from './utils/logger'
import { fetchNotifications } from './services/api'

function App() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const data = await fetchNotifications()
      setNotifications(data)
      await log('info', 'page', 'Notifications loaded successfully')
    } catch (error) {
      await log('error', 'page', 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  const handleRefresh = () => {
    log('debug', 'component', 'User clicked refresh button')
    loadNotifications()
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <ErrorIcon color="error" />
      case 'warn': return <WarningIcon color="warning" />
      case 'info': return <InfoIcon color="info" />
      default: return <NotificationsIcon color="primary" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'error'
      case 'warn': return 'warning'
      case 'info': return 'info'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NotificationsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notification Dashboard
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            Recent Notifications
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />} 
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
        
        <Paper elevation={3}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {notifications.map((notif) => (
                <ListItem key={notif.id} divider>
                  <ListItemIcon>
                    {getLevelIcon(notif.level)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={notif.title} 
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {notif.message}
                        </Typography>
                        {` — ${notif.time}`}
                      </>
                    } 
                  />
                  <Chip 
                    label={notif.level.toUpperCase()} 
                    size="small" 
                    color={getLevelColor(notif.level) as any}
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default App
