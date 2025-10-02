import { useEffect, useState, useCallback } from 'react';
import { useGoogleAuth } from '../../hooks/queries/auth.query';
import { useAuthStore } from '../../store/auth.store';
import { getGoogleConfig, validateGoogleConfig } from '../../config/google.config';

const GoogleOneTap = ({ 
  showFallback = null, // null means use config default
  className = "",
  position = null, // null means use config default
  placement = null, // null means use config default
}) => {
  const { isAuthenticated } = useAuthStore();
  const { mutate, isPending } = useGoogleAuth();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Get configuration with prop overrides
  const config = getGoogleConfig();
  const validation = validateGoogleConfig(config);
  
  // Use props or fallback to config
  const finalShowFallback = showFallback !== null ? showFallback : config.FALLBACK.show_fallback;
  const finalPosition = position || config.POSITION.type;
  const finalPlacement = placement || config.POSITION.placement;

  // Position classes based on placement
  const getPositionClasses = () => {
    const baseClasses = finalPosition === 'fixed' ? `fixed z-${config.POSITION.z_index}` : finalPosition;
    
    switch (finalPlacement) {
      case 'top-right':
        return `${baseClasses} top-4 right-4`;
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`;
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`;
      default:
        return `${baseClasses} top-4 right-4`;
    }
  };

  const initializeGoogleOneTap = useCallback(() => {
    if (!window.google?.accounts?.id || isAuthenticated) return;

    // Log configuration validation errors
    if (!validation.isValid && config.DEBUG.enabled) {
      console.warn('Google One Tap configuration errors:', validation.errors);
    }

    try {
      window.google.accounts.id.initialize({
        client_id: config.CLIENT_ID,
        callback: (response) => {
          setError(null);
          mutate(response.credential, {
            onError: (error) => {
              if (config.DEBUG.enabled) {
                console.error('Google Auth Error:', error);
              }
              if (config.ERROR_HANDLING.show_errors) {
                setError('Authentication failed. Please try again.');
              }
            }
          });
        },
        auto_select: config.ONE_TAP.auto_select,
        cancel_on_tap_outside: config.ONE_TAP.cancel_on_tap_outside,
        context: config.ONE_TAP.context,
        ux_mode: config.ONE_TAP.ux_mode,
        itp_support: config.ONE_TAP.itp_support,
        scope: config.ONE_TAP.scope,
        login_hint: config.ONE_TAP.login_hint,
        hosted_domain: config.ONE_TAP.hosted_domain,
      });

      // Show the One Tap prompt
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason();
          console.warn('One Tap not displayed:', reason);
          
          // Handle different reasons for not displaying
          switch (reason) {
            case 'browser_not_supported':
              setError('Your browser does not support Google One Tap');
              break;
            case 'invalid_client':
              setError('Google authentication is not properly configured');
              break;
            case 'opt_out_or_no_session':
              // User has opted out or no session - this is normal
              if (finalShowFallback) setShowPrompt(true);
              break;
            case 'secure_http_required':
              if (config.ERROR_HANDLING.show_errors) {
                setError('Secure connection required for Google authentication');
              }
              break;
            case 'suppressed_by_user':
              // User suppressed the prompt - show fallback
              if (finalShowFallback) setShowPrompt(true);
              break;
            case 'unregistered_origin':
              setError('This domain is not registered with Google');
              break;
            case 'unknown_reason':
            default:
              if (finalShowFallback) setShowPrompt(true);
              break;
          }
        } else if (notification.isSkippedMoment()) {
          const reason = notification.getSkippedReason();
          console.log('One Tap skipped:', reason);
          
          if (reason === 'auto_cancel' && finalShowFallback) {
            setShowPrompt(true);
          }
        } else if (notification.isDismissedMoment()) {
          const reason = notification.getDismissedReason();
          if (config.DEBUG.enabled) {
            console.log('One Tap dismissed:', reason);
          }
          
          if (reason === 'credential_returned' || reason === 'cancel') {
            if (finalShowFallback) setShowPrompt(true);
          }
        }
      });
    } catch (error) {
      if (config.DEBUG.enabled) {
        console.error('Error initializing Google One Tap:', error);
      }
      if (config.ERROR_HANDLING.show_errors) {
        setError('Failed to initialize Google authentication');
      }
      if (config.ERROR_HANDLING.fallback_on_error && finalShowFallback) {
        setShowPrompt(true);
      }
    }
  }, [mutate, isAuthenticated, finalShowFallback, config]);

  useEffect(() => {
    if (isAuthenticated || !config.CLIENT_ID) return;

    // Check if Google script is already loaded
    if (window.google?.accounts?.id) {
      setScriptLoaded(true);
      initializeGoogleOneTap();
      return;
    }

    // Load Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptLoaded(true);
      initializeGoogleOneTap();
    };
    script.onerror = () => {
      if (config.ERROR_HANDLING.show_errors) {
        setError('Failed to load Google authentication script');
      }
      if (config.ERROR_HANDLING.fallback_on_error && finalShowFallback) {
        setShowPrompt(true);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Cancel any pending prompts
      if (window.google?.accounts?.id) {
        window.google.accounts.id.cancel();
      }
    };
  }, [initializeGoogleOneTap, isAuthenticated]);

  // Don't render anything if user is authenticated
  if (isAuthenticated || !isVisible) return null;

  return (
    <div className={`google-one-tap-container ${getPositionClasses()} ${className}`}>
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Close Google One Tap"
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Loading state */}
      {isPending && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-700 text-sm font-medium">
            Authenticating with Google...
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-2 shadow-lg max-w-xs">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-500 text-xs mt-1 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Fallback Google Sign-In button */}
      {showPrompt && finalShowFallback && scriptLoaded && (
        <div className="bg-white rounded-lg shadow-lg border p-4 max-w-xs">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              Quick Sign In
            </h3>
            <p className="text-xs text-gray-600">
              Sign in with Google for a better experience
            </p>
          </div>
          
          <div
            id="g_id_signin"
            className="g_id_signin"
            data-type="standard"
            data-theme={config.FALLBACK.theme}
            data-size={config.FALLBACK.size}
            data-text={config.FALLBACK.text}
            data-shape={config.FALLBACK.shape}
            data-logo_alignment={config.FALLBACK.logo_alignment}
            data-width={config.FALLBACK.width}
          ></div>
        </div>
      )}

      {/* Hidden container for One Tap prompt */}
      <div id="g_id_onload" className="hidden"></div>
    </div>
  );
};

export default GoogleOneTap;
