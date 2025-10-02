import { useState } from 'react';
import GoogleOneTap from './GoogleOneTap';
import { getGoogleConfig, validateGoogleConfig } from '../../config/google.config';

/**
 * Demo component to showcase Google One Tap functionality
 * This component can be used for testing and demonstration purposes
 */
const GoogleOneTapDemo = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [config, setConfig] = useState(getGoogleConfig());
  const [validation, setValidation] = useState(validateGoogleConfig(config));

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config };
    
    // Handle nested object updates
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      newConfig[parent] = { ...newConfig[parent], [child]: value };
    } else {
      newConfig[key] = value;
    }
    
    setConfig(newConfig);
    setValidation(validateGoogleConfig(newConfig));
  };

  const resetConfig = () => {
    const defaultConfig = getGoogleConfig();
    setConfig(defaultConfig);
    setValidation(validateGoogleConfig(defaultConfig));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Google One Tap Demo
        </h1>
        
        <div className="mb-6">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showDemo ? 'Hide' : 'Show'} Google One Tap
          </button>
        </div>

        {showDemo && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position Settings */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Position
                </label>
                <select
                  value={config.POSITION.type}
                  onChange={(e) => handleConfigChange('POSITION.type', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="fixed">Fixed</option>
                  <option value="relative">Relative</option>
                  <option value="absolute">Absolute</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Placement
                </label>
                <select
                  value={config.POSITION.placement}
                  onChange={(e) => handleConfigChange('POSITION.placement', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>

              {/* Fallback Settings */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Show Fallback
                </label>
                <select
                  value={config.FALLBACK.show_fallback}
                  onChange={(e) => handleConfigChange('FALLBACK.show_fallback', e.target.value === 'true')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Button Theme
                </label>
                <select
                  value={config.FALLBACK.theme}
                  onChange={(e) => handleConfigChange('FALLBACK.theme', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="outline">Outline</option>
                  <option value="filled_blue">Filled Blue</option>
                  <option value="filled_black">Filled Black</option>
                </select>
              </div>

              {/* Debug Settings */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Debug Mode
                </label>
                <select
                  value={config.DEBUG.enabled}
                  onChange={(e) => handleConfigChange('DEBUG.enabled', e.target.value === 'true')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value={false}>Disabled</option>
                  <option value={true}>Enabled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Show Errors
                </label>
                <select
                  value={config.ERROR_HANDLING.show_errors}
                  onChange={(e) => handleConfigChange('ERROR_HANDLING.show_errors', e.target.value === 'true')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetConfig}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Reset to Default
              </button>
            </div>

            {/* Configuration Status */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Configuration Status</h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${validation.isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {validation.isValid ? 'Configuration is valid' : 'Configuration has errors'}
                </span>
              </div>
              {!validation.isValid && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 font-medium">Errors:</p>
                  <ul className="text-sm text-red-600 list-disc list-inside">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Google One Tap Component */}
        {showDemo && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Google One Tap Component
            </h3>
            <div className="relative min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4">
              <GoogleOneTap
                showFallback={config.FALLBACK.show_fallback}
                position={config.POSITION.type}
                placement={config.POSITION.placement}
                className="max-w-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Click "Show Google One Tap" to display the component</li>
          <li>Adjust the configuration settings to see different behaviors</li>
          <li>Enable debug mode to see console logs</li>
          <li>The component will automatically show a fallback button if One Tap is not available</li>
          <li>Try different positions and placements to see how it adapts</li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleOneTapDemo;
