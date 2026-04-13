// electron-builder configuration for Windows packaging.
// Referenced via --config in the build script so it stays separate from package.json.
// ESM syntax is valid here because package.json declares "type":"module" and
// electron-builder v24 loads JS configs via dynamic import().

export default {
  appId: 'com.notes-todo-app',
  productName: 'Notes & Todos',
  copyright: `Copyright © ${new Date().getFullYear()}`,

  // Files bundled into the app package.
  // electron-builder auto-includes production node_modules (better-sqlite3).
  // The prebuilt .node binary is placed outside the asar archive automatically.
  files: [
    'dist/renderer/**/*',
    'src/main/**/*',
    'src/preload.cjs',
    'package.json',
  ],

  directories: {
    output: 'dist/installer',
  },

  win: {
    // Used by `npm run build:installer`.
    // The NSIS target requires Developer Mode (or admin) to be enabled on Windows
    // so that 7-Zip can create the macOS symlinks inside winCodeSign.7z.
    // `npm run build` uses --dir instead, which skips signing tools entirely.
    target: [{ target: 'nsis', arch: ['x64'] }],
    // Place assets/icon.ico here to use a custom app icon.
    // icon: 'assets/icon.ico',
  },

  nsis: {
    // Show the installer wizard so the user can choose install location.
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },

  // Rebuild native modules (better-sqlite3) against the packaged Electron version.
  // This runs automatically during electron-builder packaging.
  npmRebuild: true,
};
