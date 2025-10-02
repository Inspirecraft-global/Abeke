// Google One Tap Configuration
export const GOOGLE_CONFIG = {
  // Replace with your actual Google Client ID from Google Cloud Console
  CLIENT_ID: '864258024185-aep9mq37c6kork3o3ll2lpf7810gq3m7.apps.googleusercontent.com',
  
  // Google One Tap settings
  ONE_TAP: {
    // Auto select user if only one account is available
    auto_select: false,
    
    // Cancel prompt when user taps outside
    cancel_on_tap_outside: true,
    
    // Context for the prompt (signin, signup, use)
    context: 'signin',
    
    // UX mode - popup shows sliding prompt, redirect redirects to Google
    ux_mode: 'popup',
    
    // Improved third-party cookie support
    itp_support: true,
    
    // Additional scopes (if needed)
    scope: 'email profile',
    
    // Login hint (user's email if known)
    login_hint: '',
    
    // Hosted domain restriction (if applicable)
    hosted_domain: '',
  },
  
  // Fallback button settings
  FALLBACK: {
    // Show fallback button when One Tap is not available
    show_fallback: true,
    
    // Button theme
    theme: 'outline',
    
    // Button size
    size: 'large',
    
    // Button text
    text: 'signin_with',
    
    // Button shape
    shape: 'rectangular',
    
    // Logo alignment
    logo_alignment: 'left',
    
    // Button width
    width: 280,
  },
  
  // Position settings
  POSITION: {
    // Position type: fixed, relative, absolute
    type: 'fixed',
    
    // Placement: top-right, top-left, bottom-right, bottom-left
    placement: 'top-right',
    
    // Z-index for fixed positioning
    z_index: 50,
  },
  
  // Error handling
  ERROR_HANDLING: {
    // Show error messages to user
    show_errors: true,
    
    // Log errors to console
    log_errors: true,
    
    // Fallback on errors
    fallback_on_error: true,
  },
  
  // Debug settings
  DEBUG: {
    // Enable debug logging
    enabled: false,
    
    // Log level: 'error', 'warn', 'info', 'debug'
    level: 'info',
  },
};

// Helper function to get configuration with environment overrides
export const getGoogleConfig = () => {
  const config = { ...GOOGLE_CONFIG };
  
  // Override with environment variables if available
  if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    config.CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  }
  
  if (import.meta.env.VITE_GOOGLE_DEBUG === 'true') {
    config.DEBUG.enabled = true;
  }
  
  return config;
};

// Helper function to validate configuration
export const validateGoogleConfig = (config = getGoogleConfig()) => {
  const errors = [];
  
  if (!config.CLIENT_ID) {
    errors.push('Google Client ID is required');
  }
  
  if (config.CLIENT_ID && !config.CLIENT_ID.includes('.apps.googleusercontent.com')) {
    errors.push('Invalid Google Client ID format');
  }
  
  if (!['fixed', 'relative', 'absolute'].includes(config.POSITION.type)) {
    errors.push('Invalid position type');
  }
  
  if (!['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(config.POSITION.placement)) {
    errors.push('Invalid placement');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
