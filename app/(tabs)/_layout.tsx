import {Tabs} from "expo-router";
export default function TabsLayout(){
  return <Tabs screenOptions={{headerShown:false,tabBarStyle:{display:"none"}}}>
    <Tabs.Screen name="index"/><Tabs.Screen name="explore"/><Tabs.Screen name="run"/><Tabs.Screen name="challenges"/><Tabs.Screen name="profile"/>
  </Tabs>
}