import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { COLORS } from '../libs/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'

export const RegistrationScreen = () => {
  const [isLogInFocused, setIsLogInFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(true)

  const navigation = useNavigation()

  const emailRules = /\S+@\S+\.\S+/
  // example: email@domain.com
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const schema = yup.object({
    login: yup.string().required('Username is a required field'),
    email: yup
      .string()
      .matches(emailRules, { message: 'Email is a required field' })
      .required('Please fill in your email'),
    password: yup
      .string()
      .matches(passwordRules, { message: 'Please create a stronger password' })
      .required('Password is a required field')
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)

    navigation.navigate('Home', {
      // screen: 'PostsScreen',

      email: data.email,
      login: data.login
    })

    reset()
  }

  const onPressAddImg = () => {
    return
  }

  const onPressShowPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  const onPressLoginRedirect = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/bg-login.jpg')}
        style={styles.bgImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={[styles.formBgDecoration]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.addPhotoWrapper}>
              <View style={styles.addPhotoIcon}></View>
              <TouchableOpacity
                onPress={onPressAddImg}
                title=""
                style={styles.addPhotoBtn}
              >
                <Icon name="add" size={20} color={COLORS.addAvatarBtn} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.inputCommon,
                      styles.inputSpace,
                      isLogInFocused && styles.focusedInput
                    ]}
                    placeholder="Логін"
                    placeholderTextColor={COLORS.placeholderColor}
                    name="login"
                    onFocus={() => {
                      setIsLogInFocused(true), setIsShowKeyboard(true)
                    }}
                    onBlur={() => {
                      setIsLogInFocused(false)
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="login"
              />
              {errors.login && (
                <Text style={styles.errorMsg}>{errors.login.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.inputCommon,
                      styles.inputSpace,
                      isEmailFocused && styles.focusedInput
                    ]}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor={COLORS.placeholderColor}
                    name="email"
                    onFocus={() => {
                      setIsEmailFocused(true), setIsShowKeyboard(true)
                    }}
                    onBlur={() => {
                      setIsEmailFocused(false)
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.errorMsg}>{errors.email.message}</Text>
              )}
            </View>

            <View
              style={{
                marginBottom: isShowKeyboard ? 32 : 43
              }}
            >
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.inputCommon,
                      isPasswordFocused && styles.focusedInput
                    ]}
                    placeholder="Пароль"
                    placeholderTextColor={COLORS.placeholderColor}
                    name="password"
                    textContentType="password"
                    secureTextEntry={isPasswordShown}
                    onFocus={() => {
                      setIsPasswordFocused(true), setIsShowKeyboard(true)
                    }}
                    onBlur={() => {
                      setIsPasswordFocused(false)
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              <TouchableOpacity
                style={styles.showPasswordTextWrapper}
                onPress={onPressShowPassword}
              >
                <Text style={styles.textShowPassword}>Показати</Text>
              </TouchableOpacity>
              {errors.password && (
                <Text style={styles.errorMsg}>{errors.password.message}</Text>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <View style={styles.buttonsBgDecoration}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.registerBtnText}>Зареєстуватися</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginLink}
            onPress={onPressLoginRedirect}
          >
            <Text style={styles.loginLinkText}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  formBgDecoration: {
    width: '100%',
    backgroundColor: COLORS.whiteBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16
  },

  buttonsBgDecoration: {
    width: '100%',
    backgroundColor: COLORS.whiteBg,
    paddingLeft: 16,
    paddingRight: 16
  },
  addPhotoWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -60,
    marginBottom: 32
  },
  addPhotoIcon: {
    width: 132,
    height: 120,
    backgroundColor: COLORS.uploadAvatar,
    borderRadius: 16
  },
  addPhotoBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: COLORS.addAvatarBtn,
    borderRadius: '50%',
    position: 'absolute',
    top: 76,
    right: -13
  },
  title: {
    color: COLORS.regularText,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 33
  },
  inputCommon: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    padding: 16,
    color: COLORS.regularText,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  inputSpace: {
    marginBottom: 16
  },
  focusedInput: {
    borderColor: COLORS.inputBorderFocused
  },
  showPasswordTextWrapper: {
    position: 'absolute',
    top: 16,
    right: 16
  },
  textShowPassword: {
    color: COLORS.link,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  errorMsg: {
    position: 'absolute',
    top: -8,
    left: 16,
    color: COLORS.errorColor,
    fontSize: 16,
    backgroundColor: COLORS.errorBg
  },
  registerBtn: {
    width: '100%',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: COLORS.primaryBtnActive,
    marginBottom: 16
  },
  registerBtnText: {
    color: COLORS.whiteBtnText,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  },
  loginLink: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 66
  },
  loginLinkText: {
    color: COLORS.link,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  }
})
