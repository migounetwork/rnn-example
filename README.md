

This is a react-native template which include 3 main dependency:
 - [react-native-navigation](https://wix.github.io/react-native-navigation/docs/before-you-start/)
   - Native navigation for react native
 - [react-native-config](https://github.com/luggit/react-native-config)
   - Config all the Environment Variable incldue JS side and native code side
 - [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
   - Launch screen control

 <br> 


# 1. Prepare environment and installing react native dependencies

### You will need Node, Watchman, the React Native command line interface, Xcode and CocoaPods.
### While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.
 <br>

## Node & Watchman

### We recommend installing Node and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```sh
> brew install node  
> brew install watchman
```

<br>

### If you have already installed Node on your system, make sure it is Node 12 or newer.
### Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.
 <br>


## Xcode
### The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.
### If you have already installed Xcode on your system, make sure it is version 10 or newer.
 <br>

## Command Line Tools
### You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.
![Alt text](https://reactnative.dev/assets/images/GettingStartedXcodeCommandLineTools-8259be8d3ab8575bec2b71988163c850.png)
<br>

## CocoaPods
### CocoaPods is built with Ruby and it will be installable with the default Ruby available on macOS. You can use a Ruby Version manager, however we recommend that you use the standard Ruby available on macOS unless you know what you're doing.
### Using the default Ruby install will require you to use sudo when installing gems. (This is only an issue for the duration of the gem installation, though.)
```sh
sudo gem install cocoapods
```
<br>

### For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).
<br>


# 2. Install project dependency
```sh
> yarn install
> pod install --project-directory=ios
```

<br>
<br>


# 3. Config global variable
### Please define all the global variable by System Enviornment varialbe throught by `.env.dev` or `.env.production` file. Please copy `.env.dev.example` sample file to `.env.dev` or `.env.production` for dev scheme and production scheme.
```sh
> cp .env.dev.example .env.dev
> vi .env.dev
```

<br>

Example 1 - Use variables declared in .env.dev in Obj-C classes like:
```objc
// import header
#import "ReactNativeConfig.h"

// then read individual keys like:
NSString *apiUrl = [ReactNativeConfig envFor:@"API_URL"];

// or just fetch the whole config
NSDictionary *config = [ReactNativeConfig env];
```

<br>

Example 2 - Use variables declared in .env.dev in Info.plist like:
```plist
<key>CFBundleIdentifier</key>
<string>$(APP_ID_IOS)</string>
```

<br>
<br>


# 4. Run your project
### Please run it in xCode by default or production scheme which also apply `.env.dev` or `.env.projection` environment separately.
### NOTICE: For running a react native project will launch a node.js server which delivery js code before simulator and app is running. The node.js server will be launch when you run your code in xCode which already integragted to run step. Please make sure node.js server is running before running app.

# 5. Add custom native modulel
### The ExternalComponent layout allows you to display any native view as a screen. To use the External Component we'll need to register it with a string name. This name is then used when declaring layouts in JS.

<br>

## ViewController registration
### Import your custom view controller to `ios/rnnexample/AppDelegate.m`
```objc
#import "ExternalViewController.h"
```
### Register constom view controller to `ios/rnnexample/AppDelegate.m`
```objc
RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
[ReactNativeNavigation bootstrapWithBridge:bridge];
[ReactNativeNavigation registerExternalComponent:@"MyExternalComponent" callback:^UIViewController *(NSDictionary *props, RCTBridge *bridge) {
    return [[ExternalViewController alloc] initWithProps:props];
}];
```

<br>

## Using the component from JS
### In the main `index.js` file. Modify your component register string as below for navigating custom native component.
```js
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             externalComponent: {
               name: 'MyExternalComponent'
             }
           }
         ],
         options: {
           topBar: {
             visible: false,
             drawBehind: true,
             animate: false,
           }
         }
       }
     }
  });
});
```

<br>

## Custom native view example please refer below repo link:
 - [Playground APP](https://github.com/wix/react-native-navigation/tree/master/playground)
