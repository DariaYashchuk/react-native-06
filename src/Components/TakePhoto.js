import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../libs/colors'
import React, { useRef, useState } from 'react'
import { Camera } from 'expo-camera'

export const TakePhoto = ({ updateData }) => {
  let cameraRef = useRef()

  const [type, setType] = useState(Camera.Constants.Type.back)

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    )
  }

  const takePhoto = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false
    }

    const newPhoto = await cameraRef.current.takePictureAsync(options)
    const { uri } = await cameraRef.current.takePictureAsync(options)
    // await MediaLibrary.createAssetAsync(uri)
    updateData(newPhoto)
  }

  return (
    <View style={styles.cameraWrapper}>
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <View style={styles.takePhotoIconWrapper}>
        <TouchableOpacity style={styles.takePhotoIcon} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color={COLORS.grayIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.flipCameraIconWrapper}>
        <TouchableOpacity style={styles.flipCameraIcon} onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color={COLORS.grayIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%'
  },
  takePhotoIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: 'white',
    overflow: 'hidden',

    position: 'absolute',
    alignSelf: 'center',
    bottom: 10
  },
  takePhotoIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipCameraIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: 'white',
    overflow: 'hidden',

    position: 'absolute',
    bottom: 10,
    right: 10
  },
  flipCameraIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
