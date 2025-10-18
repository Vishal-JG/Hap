
import {useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Events from '../screens/Events';
import MapScreen from '../screens/MapScreen';
import AIPlanner from '../screens/AIPlanner';
import Community from '../screens/Community';
import Mytrips from '../screens/Mytrips';

const Tab = createBottomTabNavigator();

const MyTabs =()=>{
  return (
    <Tab.Navigator>
      <Tab.Screen name="Events" component = {Events} />
      <Tab.Screen name="Maps" component = {MapScreen} />
      <Tab.Screen name="AIPlanner" component = {AIPlanner} />
      <Tab.Screen name="Community" component = {Community} />
      <Tab.Screen name="Mytrips" component = {Mytrips} />
    </Tab.Navigator>
  );
}

export default MyTabs
