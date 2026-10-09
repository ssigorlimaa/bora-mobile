import React from "react";
import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const avatarTones=["#14364B","#20372F","#352A50","#3A3022"];
export const Btn=({children,onPress,outline=false}:{children:any;onPress?:()=>void;outline?:boolean})=><Pressable onPress={onPress} style={[u.btn,outline&&u.outline]}><Text style={[u.btnText,outline&&{color:C.text}]}>{children}</Text></Pressable>;
export const Chip=({children,active=false}:{children:any;active?:boolean})=><View style={[u.chip,active&&u.chipOn]}><Text style={[u.chipText,active&&{color:"#071018"}]}>{children}</Text></View>;
export const Header=({title,back=true}:{title:string;back?:boolean})=><View style={u.header}>{back?<Pressable onPress={()=>router.back()} hitSlop={8}><Ionicons name="chevron-back" size={25} color={C.gold}/></Pressable>:<View style={{width:25}}/>}<Text style={u.headerTitle}>{title}</Text><View style={{width:25}}/></View>;
export const RunImage=({uri="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",style}:any)=><Image source={{uri}} style={[u.runImg,style]}/>;

export const Bottom=({active="home"}:{active?:string})=>{
 const insets=useSafeAreaInsets();
 const items=[["home","Início","home"],["explore","Explorar","search"],["create","Criar","add"],["challenge","Desafios","trophy"],["profile","Perfil","person"]];
 return <View style={[u.bottomSafe,{paddingBottom:Math.max(insets.bottom,8)}]}><View style={u.bottom}>{items.map(x=>x[0]==="create"
 ? <Pressable key={x[0]} style={u.createNav} onPress={()=>router.push("/(tabs)/run")}><View style={u.createCircle}><Ionicons name="add" size={29} color="#071018"/></View><Text style={u.navText}>Criar</Text></Pressable>
 : <Pressable key={x[0]} style={u.nav} onPress={()=>router.replace((x[0]==="home"?"/":x[0]==="explore"?"/(tabs)/explore":x[0]==="challenge"?"/(tabs)/challenges":"/(tabs)/profile") as any)}><Ionicons name={x[2] as any} size={21} color={active===x[0]?C.gold:"#9BA8B1"}/><Text style={[u.navText,active===x[0]&&{color:C.gold}]}>{x[1]}</Text></Pressable>)}</View></View>;
};

export const Avatar=({size=34,imageIndex=0,imageUri}:{size?:number;imageIndex?:number;imageUri?:string|null})=>imageUri?<Image source={{uri:imageUri}} style={[u.avatar,{width:size,height:size,borderRadius:size/2}]}/>:<View style={[u.avatarFallback,{width:size,height:size,borderRadius:size/2,backgroundColor:avatarTones[Math.abs(imageIndex)%avatarTones.length]}]}><Ionicons name="person" size={size*0.52} color="#DCE7ED"/></View>;

const u=StyleSheet.create({
 header:{height:50,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},headerTitle:{color:C.text,fontSize:16,fontWeight:"900"},
 btn:{height:50,borderRadius:15,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},outline:{backgroundColor:"transparent",borderWidth:1,borderColor:C.text},btnText:{color:"#071018",fontSize:11,fontWeight:"900"},
 chip:{paddingHorizontal:14,paddingVertical:8,borderRadius:15,borderWidth:1,borderColor:C.line,backgroundColor:C.card,marginRight:6},chipOn:{backgroundColor:C.gold,borderColor:C.gold},chipText:{color:C.text,fontSize:9,fontWeight:"800"},runImg:{width:74,height:74,borderRadius:12},
 bottomSafe:{paddingHorizontal:15,paddingTop:8,backgroundColor:"transparent"},bottom:{height:72,borderRadius:25,borderWidth:1,borderColor:"#3A5262",backgroundColor:"#030A10",flexDirection:"row",alignItems:"center",justifyContent:"space-around",paddingHorizontal:3,shadowColor:"#000",shadowOpacity:.35,shadowRadius:12,elevation:10},
 nav:{width:59,height:58,alignItems:"center",justifyContent:"center"},navText:{color:"#96A3AC",fontSize:8,fontWeight:"800",marginTop:4},
 createNav:{width:64,height:70,alignItems:"center",justifyContent:"flex-start"},createCircle:{width:56,height:56,borderRadius:28,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",marginTop:-24,borderWidth:3,borderColor:"#071018",shadowColor:C.gold,shadowOpacity:.45,shadowRadius:15,elevation:12},
 avatar:{backgroundColor:C.card,borderWidth:2,borderColor:C.gold},avatarFallback:{alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#314552"}
});
