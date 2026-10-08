import {Stack,useRouter,useSegments} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect,useState} from "react";
import {View,ActivityIndicator} from "react-native";
import {supabase} from "../lib/supabase";
import {C} from "../constants/theme";

const publicRoutes=new Set(["auth","reset-password","invite"]);

export default function RootLayout(){
 const router=useRouter(),segments=useSegments(),[ready,setReady]=useState(false),[session,setSession]=useState<any>(null);
 useEffect(()=>{let mounted=true;(async()=>{if(!supabase){setReady(true);return}const {data}=await supabase.auth.getSession();if(mounted){setSession(data.session);setReady(true)}})();if(!supabase)return;const {data}=supabase.auth.onAuthStateChange((_e,s)=>{setSession(s);setReady(true)});return()=>{mounted=false;data.subscription.unsubscribe()}},[]);
 useEffect(()=>{if(!ready)return;const root=String(segments[0]||"");const isPublic=publicRoutes.has(root);if(!session&&!isPublic)router.replace("/auth");else if(session&&root==="auth")router.replace("/")},[ready,session,segments]);
 if(!ready)return <View style={{flex:1,backgroundColor:C.bg,alignItems:"center",justifyContent:"center"}}><ActivityIndicator color={C.gold}/></View>;
 return <><StatusBar style="light"/><Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:C.bg}}}/></>;
}