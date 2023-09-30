import { View, Text, StyleSheet, Keyboard, Image } from 'react-native'
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import { COLORS } from '../libs/colors'
import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { TakePhoto } from '../Components/TakePhoto'
import { PreviewPhoto } from '../Components/PreviewPhoto'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'

export const CreatePostsScreen = () => {
  const navigation = useNavigation()

  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null)
  const [photo, setPhoto] = useState('')

  const [isPublishBtnDisabled, setIsPublishBtnDisabled] = useState(true)

  const [location, setLocation] = useState('')
  const [name, setName] = useState('')
  const [locationName, setLocationName] = useState('')

  useEffect(() => {
    ;(async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync()

      setHasCameraPermission(cameraPermission.status === 'granted')
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
      }

      let location = await Location.getCurrentPositionAsync({})
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      setLocation(coords)
    })()
  }, [])

  if (hasCameraPermission === null) {
    return (
      <View style={styles.cameraErrorWrapper}>
        <Text style={styles.cameraError}>Requesting permission...</Text>
      </View>
    )
  } else if (!hasCameraPermission) {
    return (
      <View style={styles.cameraErrorWrapper}>
        <Text style={styles.cameraError}>
          Oops... Permission for the camera is not granted. Please change this
          in the settings.
        </Text>
      </View>
    )
  }

  const updateData = (value) => {
    setPhoto(value)
  }

  const reset = () => {
    setPhoto('')
    setName('')
    setLocationName('')
    setLocation('')
  }

  const onSubmit = () => {
    const data = {
      photo,
      name,
      locationName,
      location: location || { latitude: 50.450001, longitude: 30.523333 }
    }
    console.log(data)
    navigation.navigate('Posts')
    reset()
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.addPhotoSection}>
          <View style={styles.cameraWrapper}>
            {photo ? (
              <PreviewPhoto
                source={{ uri: 'data:image/jpg;base64,' + photo.base64 }}
              />
            ) : (
              <TakePhoto updateData={updateData} />
            )}
          </View>
          <TouchableOpacity
            style={styles.addPhotoLink}
            disabled={photo ? false : true}
            onPress={() => {
              setPhoto(null)
            }}
          >
            <Text style={styles.addPhotoText}>
              {photo ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.inputCommon, styles.inputName]}
          placeholder="Назва..."
          placeholderTextColor={COLORS.placeholderColor}
          name="name"
          onChangeText={(newText) => setName(newText)}
          value={name}
        />

        <TextInput
          style={[styles.inputCommon, styles.inputLocation]}
          placeholder="Місцевість..."
          placeholderTextColor={COLORS.placeholderColor}
          name="location"
          onChangeText={(newText) => setLocationName(newText)}
          value={locationName}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={{
          ...styles.publishBtn,
          backgroundColor:
            name === '' || locationName === '' || photo === ''
              ? COLORS.primaryBtnDisabled
              : COLORS.primaryBtnActive
        }}
        onPress={onSubmit}
        disabled={
          name === '' || locationName === '' || photo === '' ? true : false
        }
      >
        <Text
          style={{
            ...styles.publishBtnText,
            color:
              name === '' || locationName === '' || photo === ''
                ? COLORS.whiteBtnTextDisabled
                : COLORS.whiteBtnText
          }}
        >
          Опубліковати
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  addPhotoSection: {
    width: '100%',
    marginTop: 32
  },
  cameraWrapper: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden'
  },

  addPhotoText: {
    color: COLORS.grayText,
    fontSize: 16
  },
  addPhotoLink: {
    marginTop: 8
  },
  inputCommon: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 15,

    color: COLORS.regularText,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,

    borderBottomWidth: 1,
    borderColor: COLORS.inputBorder
  },
  inputName: {
    marginTop: 32
  },
  inputLocation: {
    marginTop: 16
  },
  publishBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32
  },
  publishBtnText: {
    color: COLORS.whiteBtnText,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  cameraErrorWrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,

    marginTop: 50,
    width: 250,
    alignSelf: 'center'
  },
  cameraError: {
    color: COLORS.regularText,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center'
  }
})
