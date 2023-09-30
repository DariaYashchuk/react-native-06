import { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { COLORS } from '../libs/colors'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(true)

  const navigation = useNavigation()

  const emailRules = /\S+@\S+\.\S+/
  // example: email@domain.com
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

  const schema = yup.object({
    email: yup
      .string()
      .matches(emailRules, { message: 'The valid email is required' })
      .required('Email is a required field'),
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
      screen: 'Posts',
      params: {
        email: data.email
      }
    })

    reset()
  }

  const onPressShowPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  const onPressRegisterRedirect = () => {
    navigation.navigate('Registration')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/bg-login.jpg')}
        style={styles.bgImage}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.formBgDecoration}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Text style={styles.title}>Увійти</Text>

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
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
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

            <View style={styles.inputPasswordWrapper}>
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
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text style={styles.errorMsg}>{errors.password.message}</Text>
              )}

              <TouchableOpacity
                style={styles.showPasswordTextWrapper}
                onPress={onPressShowPassword}
              >
                <Text style={styles.textShowPassword}>Показати</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <View style={styles.buttonsBgDecoration}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.registerBtnText}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginLink}
            onPress={onPressRegisterRedirect}
          >
            <Text style={styles.loginLinkText}>
              Немає акаунту? Зареєструватися
            </Text>
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
    paddingRight: 16,
    paddingTop: 32
  },
  buttonsBgDecoration: {
    width: '100%',
    backgroundColor: COLORS.whiteBg,
    paddingLeft: 16,
    paddingRight: 16
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
  errorMsg: {
    position: 'absolute',
    top: -8,
    left: 16,
    color: COLORS.errorColor,
    fontSize: 16,
    backgroundColor: COLORS.errorBg
  },
  inputPasswordWrapper: {
    marginBottom: 43
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
    marginBottom: 132
  },
  loginLinkText: {
    color: COLORS.link,
    fontFamily: 'Roboto-Regular',
    fontSize: 16
  }
})
