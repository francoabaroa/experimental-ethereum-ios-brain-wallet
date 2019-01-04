const devMode = (process.env.NODE_ENV !== 'development');

export default {
  // App Details
  appName: 'Custody Network',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? '' : '',
};
