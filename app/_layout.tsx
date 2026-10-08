import {Stack,useRouter,useSegments} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect,useState} from "react";
import {View,ActivityIndicator} from "react-native";
import {supabase} from "../lib/supabase";
import {C} from "../constants/theme";
export default function RootLayout(){
 const router=useRouter(),segments=useSegments(),[ready,setReady]=useState(false),[session,setSession]=useState<any>(null);
 useEffect(()=>{let mounted=true;(async()=>{if(!supabase){setReady(true);return}const {data}=await supabase.auth.getSession();if(mounted){setSession(data.session);setReady(true)}})();if(!supabase)return;const {data}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setReady(true)});return()=>{mounted=false;data.subscription.unsubscribe()}},[]);
 useEffect(()=>{if(!ready)return;const inAuth=segments[0]==="auth";if(!session&&!inAuth)router.replace("/auth");else if(session&&inAuth)router.replace("/")},[ready,session,segments]);
 if(!ready)return <View style={{flex:1,backgroundColor:C.bg,alignItems:"center",justifyContent:"center"}}><ActivityIndicator color={C.gold}/></View>;
 return <><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:C.bg}}}/></>;
}