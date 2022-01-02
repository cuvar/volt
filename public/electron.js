
const { app, BrowserWindow, ipcMain } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const fs = require('fs');
const process = require('process');

let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    // TODO: real size
    width: 700, // width of window
    height: 500, // height of window
    resizable: false,
    webPreferences: {
      // The preload file where we will perform our app communication
      preload: isDev
        ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
        : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
    },
  });

  // Loading a webpage inside the electron window we just created
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Loading localhost if dev mode
      : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
  );

  // Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(path.join(__dirname, 'images/appicon.ico'));

  // In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    });
  }
};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
  await createWindow(); // Create the mainWindow

  // If you want to add React Dev Tools
  if (isDev) {
    await session.defaultSession
      .loadExtension(
        path.join(__dirname, `../userdata/extensions/react-dev-tools`) // This folder should have the chrome extension for React Dev Tools. Get it online or from your Chrome extensions folder.
      )
      .then((name) => console.log('Dev Tools Loaded'))
      .catch((err) => console.log(err));
  }
});

// Exiting the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Activating the app
app.on('activate', () => {
  if (mainWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.handle('sort-images-by-month', (event, args) => {
  if (Object.entries(args.sortedImages).length === 0) {
    throw new Error("No sorted images provided");
  }
  // DEBUG

  const IMAGE_DIR = `${process.cwd()}/volt-images`
  createAndChangeDir(IMAGE_DIR);

  // write files as new directory to system
  for (let prop in args.sortedImages) {
    const yearRegex = new RegExp(/[0-9]{4}/, 'g');

    createAndChangeDir(`${process.cwd()}/${prop}`);

    // year obj
    if (prop.match(yearRegex)) {
      for (let month in args.sortedImages[prop]) {
        createAndChangeDir(`${process.cwd()}/${month}`);

        // loop over files in month array
        for (let fileobj of args.sortedImages[prop][month]) {
          console.log(fileobj);
          const filename = fileobj.path.split(/[\/\\]/).pop();
          console.log(`${process.cwd()}/${filename}`);
          fs.copyFileSync(fileobj.path, `${process.cwd()}/${filename}`);

          // const copyPath = path.join(fileobj.path, '..', 'volt-images', filename);
          // fs.copyFileSync(fileobj.path, copyPath);
        }

        // DEBUG
        // console.log(month);
        // console.dir(args.sortedImages[prop][month]);

        process.chdir(`..`);
      }

    } else {
      // loop over files in unsorted array
      for (let fileobj of args.sortedImages[prop]) {
        const filename = fileobj.path.split(/[\/\\]/).pop();
        console.log(`${process.cwd()}/${filename}`);
        fs.copyFileSync(fileobj.path, `${process.cwd()}/${filename}`);

        // const copyPath = path.join(fileobj.path, '..', 'volt-images', filename);
        // fs.copyFileSync(fileobj.path, copyPath);
      }
    }
    process.chdir(`..`);
  }
  process.chdir(`..`);
  console.log("finished");


  // // make dir 
  // const dir = "./custom";
  // fs.mkdir(dir, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log("Directory is created.");
  // });

  // // change dir
  // process.chdir(dir);


  // // write file
  // try {
  //   fs.writeFileSync('myfile.txt', 'the text to write in the file', 'utf-8');
  // }
  // catch (e) {
  //   console.log('Failed to save the file !');
  // }
});

function createAndChangeDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(`${dir}`);
  }
  process.chdir(`${dir}`);
}