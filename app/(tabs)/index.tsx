import { Image, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Title = () => {
  return(
    <View style = {styles.titleContainer}>
    <Text 
    style = {styles.title}
    >
      Shopping
    </Text>
    </View>
  )
}


export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View style = {styles.container}>
      <Title/>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    height: hp('100%'),

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',

  },
  title: {
    gap: 8,
    marginBottom: 8,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'black',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
