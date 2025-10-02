# Google One Tap Authentication

This directory contains the Google One Tap authentication implementation for the Abeke project.

## Components

### GoogleOneTap.jsx

A React component that provides Google One Tap authentication functionality with the following features:

- **Automatic One Tap Prompt**: Shows Google's One Tap sign-in prompt when available
- **Fallback Button**: Displays a traditional Google Sign-In button when One Tap is not available
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Configurable**: Fully configurable through the `google.config.js` file
- **Responsive**: Works on both desktop and mobile devices
- **Accessible**: Includes proper ARIA labels and keyboard navigation

## Configuration

### google.config.js

The configuration file allows you to customize:

- **Client ID**: Your Google OAuth client ID
- **One Tap Settings**: Auto-select, cancel behavior, context, etc.
- **Fallback Button**: Theme, size, text, shape, etc.
- **Position**: Fixed, relative, or absolute positioning
- **Error Handling**: Whether to show errors, log them, etc.
- **Debug**: Enable debug logging and set log levels

### Environment Variables

You can override configuration using environment variables:

```bash
VITE_GOOGLE_CLIENT_ID=your-client-id-here
VITE_GOOGLE_DEBUG=true
```

## Usage

### Basic Usage

```jsx
import GoogleOneTap from './components/auth/GoogleOneTap';

// Use with default configuration
<GoogleOneTap />
```

### Custom Configuration

```jsx
// Override specific settings
<GoogleOneTap 
  showFallback={true}
  position="fixed"
  placement="top-right"
  className="custom-class"
/>
```

### Integration in Layouts

The component is already integrated into `HomeLayout.jsx` and will appear as a fixed element in the top-right corner.

## Features

### 1. Smart Fallback

- If Google One Tap is not available (browser not supported, user opted out, etc.), the component automatically shows a fallback Google Sign-In button
- Handles various scenarios gracefully without breaking the user experience

### 2. Error Handling

- Comprehensive error handling for different failure scenarios
- User-friendly error messages
- Optional error logging for debugging

### 3. Responsive Design

- Automatically adjusts for mobile devices
- Uses Tailwind CSS for consistent styling
- Supports dark mode

### 4. Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly

## Styling

### CSS Classes

The component uses Tailwind CSS classes and includes custom styles in `src/styles/google-one-tap.css`:

- `.google-one-tap-container`: Main container styles
- `.g_id_signin`: Google Sign-In button styling
- Responsive breakpoints for mobile devices
- Dark mode support

### Customization

You can customize the appearance by:

1. Modifying the configuration in `google.config.js`
2. Overriding CSS classes in `google-one-tap.css`
3. Passing custom `className` prop to the component

## Authentication Flow

1. **Component Mounts**: Checks if user is already authenticated
2. **Script Loading**: Dynamically loads Google's GSI script
3. **One Tap Prompt**: Attempts to show Google One Tap prompt
4. **Fallback**: If One Tap fails, shows traditional sign-in button
5. **Authentication**: Handles the authentication response
6. **User State**: Updates the application's authentication state

## Error Scenarios Handled

- Browser not supported
- Invalid client ID
- User opted out or no session
- Secure HTTP required
- User suppressed the prompt
- Unregistered origin
- Script loading failures
- Network errors

## Security Considerations

- Uses HTTPS for all Google API calls
- Validates client ID format
- Handles authentication tokens securely
- Prevents XSS attacks through proper script loading

## Browser Support

- Chrome 68+
- Firefox 60+
- Safari 12+
- Edge 79+

## Dependencies

- React 19+
- @tanstack/react-query
- zustand (for state management)
- Tailwind CSS (for styling)

## Troubleshooting

### Common Issues

1. **One Tap not showing**: Check if the domain is registered in Google Cloud Console
2. **Invalid client ID**: Ensure the client ID is correct and properly formatted
3. **HTTPS required**: Google One Tap requires HTTPS in production
4. **CORS issues**: Make sure your domain is added to authorized origins

### Debug Mode

Enable debug mode by setting `VITE_GOOGLE_DEBUG=true` in your environment variables or by modifying the config file.

### Console Logs

The component provides detailed console logs when debug mode is enabled:
- Configuration validation
- Google API responses
- Error details
- Authentication flow steps

## Future Enhancements

- Support for additional OAuth providers
- Custom branding options
- Advanced analytics integration
- Multi-language support
- Enhanced mobile experience

## Contributing

When making changes to this component:

1. Update the configuration schema if needed
2. Add proper TypeScript types
3. Include comprehensive error handling
4. Test across different browsers and devices
5. Update this documentation

## License

This implementation follows the same license as the main project.
