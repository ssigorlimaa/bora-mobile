import React from "react";
import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/theme";

const avatars=[
 "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
 "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
 "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
 "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
 "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80"
];

export const Btn=({children,onPress,outline=false}:{children:any;onPress?:()=>void;outline?:boolean})=><Pressable onPress={onPress} style={[u.btn,outline&&u.outline]}><Text style={[u.btnText,outline&&{color:C.text}]}>{children}</Text></Pressable>;
export const Chip=({children,active=false}:{children:any;active?:boolean})=><View style={[u.chip,active&&u.chipOn]}><Text style={[u.chipText,active&&{color:"#071018"}]}>{children}</Text></View>;
export const Header=({title,back=true}:{title:string;back?:boolean})=><View style={u.header}>{back?<Pressable onPress={()=>router.back()} hitSlop={8}><Ionicons name="chevron-back" size={25} color={C.gold}/></Pressable>:<View style={{width:25}}/>}<Text style={u.headerTitle}>{title}</Text><View style={{width:25}}/></View>;
export const RunImage=({uri="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",style}:any)=><Image source={{uri}} style={[u.runImg,style]}/>;

export const Bottom=({active="home"}:{active?:string})=>{
 const items=[["home","Início","home"],["explore","Explorar","search"],["create","Criar","add"],["challenge","Desafios","trophy"],["profile","Perfil","person"]];
 return <View style={u.bottom}>{items.map(x=>x[0]==="create"
 ? <Pressable key={x[0]} style={u.createNav} onPress={()=>router.push("/(tabs)/run")}><View style={u.createCircle}><Ionicons name="add" size={29} color="#071018"/></View><Text style={u.navText}>Criar</Text></Pressable>
 : <Pressable key={x[0]} style={u.nav} onPress={()=>router.push((x[0]==="home"?"/":x[0]==="explore"?"/(tabs)/explore":x[0]==="challenge"?"/(tabs)/challenges":"/(tabs)/profile") as any)}><Ionicons name={x[2] as any} size={21} color={active===x[0]?C.gold:"#9BA8B1"}/><Text style={[u.navText,active===x[0]&&{color:C.gold}]}>{x[1]}</Text></Pressable>)}</View>;
};

export const Avatar=({size=34,imageIndex=0}:{size?:number;imageIndex?:number})=><Image source={{uri:avatars[imageIndex%avatars.length]}} style={[u.avatar,{width:size,height:size,borderRadius:size/2}]}/>;

const u=StyleSheet.create({
 header:{height:50,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},headerTitle:{color:C.text,fontSize:16,fontWeight:"900"},
 btn:{height:50,borderRadius:15,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},outline:{backgroundColor:"transparent",borderWidth:1,borderColor:C.text},btnText:{color:"#071018",fontSize:11,fontWeight:"900"},
 chip:{paddingHorizontal:14,paddingVertical:8,borderRadius:15,borderWidth:1,borderColor:C.line,backgroundColor:C.card,marginRight:6},chipOn:{backgroundColor:C.gold,borderColor:C.gold},chipText:{color:C.text,fontSize:9,fontWeight:"800"},runImg:{width:74,height:74,borderRadius:12},
 bottom:{height:78,marginHorizontal:15,marginBottom:8,borderRadius:24,borderWidth:1,borderColor:"#344955",backgroundColor:"#040B11F5",flexDirection:"row",alignItems:"center",justifyContent:"space-around",paddingHorizontal:3,shadowColor:"#000",shadowOpacity:.45,shadowRadius:15,elevation:14},
 nav:{width:59,height:56,alignItems:"center",justifyContent:"center"},navText:{color:"#96A3AC",fontSize:8,fontWeight:"800",marginTop:4},
 createNav:{width:62,height:68,alignItems:"center",justifyContent:"flex-start"},createCircle:{width:50,height:50,borderRadius:25,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",marginTop:-17,borderWidth:3,borderColor:"#061018",shadowColor:C.gold,shadowOpacity:.35,shadowRadius:12,elevation:10},
 avatar:{backgroundColor:C.card,borderWidth:2,borderColor:C.gold}
});