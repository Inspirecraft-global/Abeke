import { useEffect, useState, useCallback } from 'react';
import { useGoogleAuth } from '../hooks/queries/auth.query';
import { useAuthStore } from '../store/auth.store';

// Replace with your Google Client ID
const GOOGLE_CLIENT_ID =
  '864258024185-aep9mq37c6kork3o3ll2lpf7810gq3m7.apps.googleusercontent.com'; // From Google Cloud Console

const GoogleOneTap = ({ showFallback = true, className = "" }) => {
  const { isAuthenticated } = useAuthStore();
  const { mutate, isPending } = useGoogleAuth();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(null);

  const initializeGoogleOneTap = useCallback(() => {
    if (!window.google?.accounts?.id || isAuthenticated) return;

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          setError(null);
          mutate(response.credential, {
            onError: (error) => {
              console.error('Google Auth Error:', error);
              setError('Authentication failed. Please try again.');
            }
          });
        },
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        ux_mode: 'popup',
        itp_support: true, // Improved third-party cookie support
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
              if (showFallback) setShowPrompt(true);
              break;
            case 'secure_http_required':
              setError('Secure connection required for Google authentication');
              break;
            case 'suppressed_by_user':
              // User suppressed the prompt - show fallback
              if (showFallback) setShowPrompt(true);
              break;
            case 'unregistered_origin':
              setError('This domain is not registered with Google');
              break;
            case 'unknown_reason':
            default:
              if (showFallback) setShowPrompt(true);
              break;
          }
        } else if (notification.isSkippedMoment()) {
          const reason = notification.getSkippedReason();
          console.log('One Tap skipped:', reason);
          
          if (reason === 'auto_cancel' && showFallback) {
            setShowPrompt(true);
          }
        } else if (notification.isDismissedMoment()) {
          const reason = notification.getDismissedReason();
          console.log('One Tap dismissed:', reason);
          
          if (reason === 'credential_returned' || reason === 'cancel') {
            if (showFallback) setShowPrompt(true);
          }
        }
      });
    } catch (error) {
      console.error('Error initializing Google One Tap:', error);
      setError('Failed to initialize Google authentication');
      if (showFallback) setShowPrompt(true);
    }
  }, [mutate, isAuthenticated, showFallback]);

  useEffect(() => {
    if (isAuthenticated || !GOOGLE_CLIENT_ID) return;

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
      setError('Failed to load Google authentication script');
      if (showFallback) setShowPrompt(true);
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
  if (isAuthenticated) return null;

  return (
    <div className={`google-one-tap-container ${className}`}>
      {/* Loading state */}
      {isPending && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-blue-700 text-sm font-medium">
            Authenticating with Google...
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-2">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Fallback Google Sign-In button */}
      {showPrompt && showFallback && scriptLoaded && (
        <div className="mt-4">
          <div
            id="g_id_signin"
            className="g_id_signin"
            data-type="standard"
            data-theme="outline"
            data-size="large"
            data-text="signin_with"
            data-shape="rectangular"
            data-logo_alignment="left"
            data-width="280"
          ></div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Sign in with Google for a better experience
          </p>
        </div>
      )}

      {/* Hidden container for One Tap prompt */}
      <div id="g_id_onload" className="hidden"></div>
    </div>
  );
};

export default GoogleOneTap;
