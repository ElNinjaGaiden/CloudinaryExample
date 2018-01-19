# Cordova Cloudinary Plugin Example

Tested on versions:

```
cordova 7.0.1
cordova-android 6.2.3
cordova-ios 4.4.0
```

If you have problems building for Android, try adding this code to the end of your local `platforms/android/build.gradle` file:

```
configurations.all {
    resolutionStrategy.eachDependency { DependencyResolveDetails details ->
        def requested = details.requested
        if (requested.group == 'com.android.support') {
            if (!requested.name.startsWith("multidex")) {
                details.useVersion '25.3.1'
            }
        }
    }
}
```