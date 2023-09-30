import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import { COLORS } from '../libs/colors'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const DATA = [
  {
    id: '1',
    image: require('../images/bg-login.jpg'),
    name: 'Forest',
    comments: 0,
    locationName: 'Ivano-Frankivsk Region, Ukraine'
  },
  {
    id: '2',
    image: require('../images/bg-login.jpg'),
    name: 'Forest',
    comments: 0,
    locationName: 'Ivano-Frankivsk Region, Ukraine'
  },
  {
    id: '3',
    image: require('../images/bg-login.jpg'),
    name: 'Forest',
    comments: 0,
    locationName: 'Ivano-Frankivsk Region, Ukraine'
  },
  {
    id: '4',
    image: require('../images/bg-login.jpg'),
    name: 'Forest',
    comments: 0,
    locationName: 'Ivano-Frankivsk Region, Ukraine'
  }
]

const Item = (props) => {
  const navigation = useNavigation()

  const mapsRedirect = () => {
    navigation.navigate('Maps')
  }
  const commentsRedirect = () => {
    navigation.navigate('Comments')
  }

  const { image, name, comments, locationName } = props
  return (
    <View style={styles.postContainer}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.infoWrapper}>
        <TouchableOpacity
          style={styles.commentsWrapper}
          onPress={commentsRedirect}
        >
          <Feather
            name="message-circle"
            size={24}
            color="black"
            style={styles.commentsIcon}
          />
          <Text style={styles.comments}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.locationNameWrapper}
          onPress={mapsRedirect}
        >
          <Feather
            name="map-pin"
            size={24}
            color="black"
            style={styles.locationNameIcon}
          />
          <Text style={styles.locationName}>{locationName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const PostsScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <Item
        image={item.image}
        name={item.name}
        comments={item.comments}
        locationName={item.locationName}
      />
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileInfoWrapper}>
        <TouchableOpacity style={styles.profileInfo}>
          <View style={styles.photoContainer}></View>
          <View style={styles.loginInfoContainer}>
            <Text style={styles.loginName}>Natali Romanova</Text>
            <Text style={styles.loginEmail}>email@example.com</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  },
  profileInfoWrapper: {
    marginTop: 32
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: COLORS.uploadAvatar
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  loginInfoContainer: {
    marginLeft: 8
  },
  loginName: {
    color: COLORS.regularText,
    fontSize: 13,
    fontFamily: 'Roboto-Bold'
  },
  loginEmail: {
    color: COLORS.profileEmail,
    fontSize: 11,
    fontFamily: 'Roboto-Regular'
  },
  list: { marginTop: 32 },
  postContainer: {
    width: '100%',
    marginBottom: 32
  },
  image: {
    width: '100%',
    objectFit: 'cover'
  },
  imageWrapper: {
    width: '100%',
    height: 240,
    overflow: 'hidden',
    borderRadius: 8
  },
  name: {
    marginVertical: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: COLORS.regularText
  },
  commentsWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  comments: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: COLORS.grayText
  },
  commentsIcon: {
    marginRight: 6,
    color: COLORS.grayIcon
  },
  locationNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationName: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: COLORS.regularText,
    textDecorationLine: 'underline'
  },
  locationNameIcon: {
    marginRight: 6,
    color: COLORS.grayIcon
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
