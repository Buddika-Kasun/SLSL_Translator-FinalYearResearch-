plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.example.test"
    compileSdk = 36
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    defaultConfig {
        applicationId = "com.example.test"
        minSdk = 24
        targetSdk = 34
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        release {
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    aaptOptions {
        noCompress("tflite")
    }

    // packagingOptions {
    //     pickFirst("lib/armeabi-v7a/libtensorflowlite_flex_jni.so")
    //     pickFirst("lib/arm64-v8a/libtensorflowlite_flex_jni.so")
    //     pickFirst("lib/x86/libtensorflowlite_flex_jni.so")
    //     pickFirst("lib/x86_64/libtensorflowlite_flex_jni.so")
    // }
}

dependencies {
    // Only this one dependency - let tflite_flutter handle the rest
    //implementation("org.tensorflow:tensorflow-lite-select-tf-ops:2.13.0")
    implementation("com.google.mediapipe:tasks-vision:latest.release")
}

flutter {
    source = "../.."
}