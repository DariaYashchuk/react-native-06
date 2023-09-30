// import { useRoute } from '@react-navigation/native'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PostsScreen } from './PostsScreen'
import { CreatePostsScreen } from './CreatePostsScreen'
import { ProfileScreen } from './ProfileScreen'
import { Ionicons, Feather } from '@expo/vector-icons'
import { COLORS } from '../libs/colors'
import { CommonActions } from '@react-navigation/native'

const Tabs = createBottomTabNavigator()

export const HomeScreen = ({ navigation }) => {
  // const { params } = useRoute()

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingLeft: 80,
          paddingRight: 80
        },
        tabBarItemStyle: {
          borderRadius: '50%'
        }
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: 'Публікації',
          headerRight: () => (
            <TouchableOpacity style={styles.logOutBtn}>
              <Feather name="log-out" size={24} color={COLORS.grayIcon} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? COLORS.navTabActiveBtn
                  : COLORS.navTabInactiveBtn,
                ...styles.navTab
              }}
            >
              <Ionicons
                name="grid-outline"
                size={24}
                color={
                  focused ? COLORS.navTabActiveIcon : COLORS.navTabInactiveIcon
                }
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerTitle: 'Створити публікацію',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? COLORS.navTabActiveBtn
                  : COLORS.navTabInactiveBtn,
                ...styles.navTab
              }}
            >
              <Ionicons
                name="add"
                size={24}
                color={
                  focused ? COLORS.navTabActiveIcon : COLORS.navTabInactiveIcon
                }
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.goBackBtn}
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Feather name="arrow-left" size={24} color={COLORS.grayIcon} />
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? COLORS.navTabActiveBtn
                  : COLORS.navTabInactiveBtn,
                ...styles.navTab
              }}
            >
              <Feather
                name="user"
                size={24}
                color={
                  focused ? COLORS.navTabActiveIcon : COLORS.navTabInactiveIcon
                }
              />
            </View>
          )
        }}
      />
    </Tabs.Navigator>
  )
}

const styles = StyleSheet.create({
  navTab: {
    height: 40,
    width: 70,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logOutBtn: {
    marginRight: 16
  },
  goBackBtn: {
    marginLeft: 16
  }
})
