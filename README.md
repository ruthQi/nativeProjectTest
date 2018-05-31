#编译bundle.js文件：npm run build-android

//========================真机测试（集成到安卓工程）==============================
1.创建一个react-native工程：react-native init xxx
2.在安卓工程中添加react-native依赖包，可以把node_modules/react-native/android....这个文件夹的内容copy到安卓工程的根目录下，在安卓的根目录下就多了一个node_modules的文件夹
3.在安卓工程下的app中的build.gradle文件中添加：
dependencies {
     ...
     compile "com.facebook.react:react-native:+" // From node_modules.
 }
4.在项目的build.gradle文件中添加（此处的依赖是指安卓工程中的依赖包，$rootDir表示的根目录，node_modules在哪个位置就写哪个目录）：
allprojects {
    repositories {
        ...
        maven {
            // All of React Native (JS, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
    ...
}

5.在 AndroidManifest.xml 清单文件中声明网络权限:
<uses-permission android:name="android.permission.INTERNET" />
6.在安卓工程创建跟reactnative相关的activity
public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index.android")
                .addPackage(new MainReactPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        // 注意这里的MyReactNativeApp必须对应“index.android.js”中的
        // “AppRegistry.registerComponent()”的第一个参数
        mReactRootView.startReactApplication(mReactInstanceManager, "MyReactNativeApp", null);  

        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
7.在 AndroidManifest.xml中注册activity
8.在native项目中指向命令，生成index.android.bundle文件
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/com/your-company-name/app-package-name/src/main/assets/index.android.bundle --assets-dest android/com/your-company-name/app-package-name/src/main/res/
9.把生成的assets和res文件夹下的文件copy到安卓工程的相同目录下，如果没有，在app/src/main下创建一个assets文件夹，并把生成的文件放在此文件夹下
10.启动安卓工程
遇到的问题：
1.java.lang.UnsatisfiedLinkError: dlopen failed: "/data/data/com.example.bjqiru.nativeandroidproject/lib-main/libgnustl_shared.so" is 32-bit instead of 64-bit
解决方法：在app的build.gradle文件中添加ndk
android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "com.example.bjqiru.nativeandroidproject"
        minSdkVersion 21
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
        ndk {
            abiFilters "armeabi-v7a"
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
2.unable to load script from assets 'index.android bundle' 
原因是在app运行的时候，没有启动rn工程，所以在安卓机上访问时，先用run-android启动下rn工程，这样访问就没问题了