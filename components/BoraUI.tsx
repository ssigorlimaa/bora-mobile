import React from "react";
import { Text, View, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { C } from "../constants/theme";

export const Btn=({children,onPress,outline=false}:{children:any;onPress?:()=>void;outline?:boolean})=>
  <Pressable onPress={onPress} style={[u.btn,outline&&u.outline]}><Text style={[u.btnText,outline&&{color:C.text}]}>{children}</Text></Pressable>;

export const Chip=({children,active=false}:{children:any;active?:boolean})=>
  <View style={[u.chip,active&&u.chipOn]}><Text style={[u.chipText,active&&{color:"#071018"}]}>{children}</Text></View>;

export const Header=({title,back=true}:{title:string;back?:boolean})=>
  <View style={u.header}>{back?<Pressable onPress={()=>router.back()} hitSlop={8}><Text style={u.back}>‹</Text></Pressable>:<View style={{width:25}}/>}<Text style={u.headerTitle}>{title}</Text><View style={u.headerAction}/></View>;

export const RunImage=({uri="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=85",style}:any)=>
  <Image source={{uri}} style={[u.runImg,style]}/>;

export const Bottom=({active="home"}:{active?:string})=>
  <View style={u.bottom}>
    {[["⌂","Início","home","/"],["⌕","Explorar","explore","/(tabs)/explore"],["＋","Criar","create","/(tabs)/run"],["♜","Desafios","challenge","/(tabs)/challenges"],["◉","Perfil","profile","/(tabs)/profile"]].map(x=>
      x[2]==="create"
      ? <Pressable key={x[2]} style={u.createNav} onPress={()=>router.push(x[3] as any)}><View style={u.createCircle}><Text style={u.plus}>＋</Text></View><Text style={u.navText}>{x[1]}</Text></Pressable>
      : <Pressable key={x[2]} style={u.nav} onPress={()=>router.push(x[3] as any)}><Text style={[u.navIcon,x[2]===active&&{color:C.gold}]}>{x[0]}</Text><Text style={[u.navText,x[2]===active&&{color:C.gold}]}>{x[1]}</Text></Pressable>
    )}
  </View>;

export const Avatar=({i=0,size=34}:any)=>
  <View style={[u.avatar,{width:size,height:size,borderRadius:size/2}]}><Text style={{fontSize:size*.52}}>{["🏃","🧔🏻","👩🏻","🧑🏽","👨🏾"][i%5]}</Text></View>;

const u=StyleSheet.create({
  header:{height:50,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  back:{color:C.gold,fontSize:32,fontWeight:"300",lineHeight:32},
  headerTitle:{color:C.text,fontSize:16,fontWeight:"900"},
  headerAction:{width:28},
  btn:{height:50,borderRadius:15,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},
  outline:{backgroundColor:"transparent",borderWidth:1,borderColor:C.text},
  btnText:{color:"#071018",fontSize:11,fontWeight:"900"},
  chip:{paddingHorizontal:14,paddingVertical:8,borderRadius:15,borderWidth:1,borderColor:C.line,backgroundColor:C.card,marginRight:6},
  chipOn:{backgroundColor:C.gold,borderColor:C.gold},
  chipText:{color:C.text,fontSize:9,fontWeight:"800"},
  runImg:{width:74,height:74,borderRadius:12},
  bottom:{position:"absolute",left:9,right:9,bottom:8,height:70,borderRadius:24,borderWidth:1,borderColor:"#3A4650",backgroundColor:"#04090EEB",flexDirection:"row",alignItems:"center",justifyContent:"space-around",paddingHorizontal:4},
  nav:{width:57,height:55,alignItems:"center",justifyContent:"center"},
  navIcon:{color:"#E7EDF2",fontSize:21,lineHeight:22},
  navText:{color:C.muted,fontSize:8,marginTop:4,fontWeight:"700"},
  createNav:{width:62,height:70,alignItems:"center",justifyContent:"flex-start"},
  createCircle:{width:48,height:48,borderRadius:24,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",marginTop:-17,borderWidth:3,borderColor:"#10171D",shadowColor:C.gold,shadowOpacity:.35,shadowRadius:10,elevation:8},
  plus:{color:"#071018",fontSize:28,lineHeight:29,fontWeight:"400"},
  avatar:{borderWidth:1.5,borderColor:C.gold,backgroundColor:C.card,alignItems:"center",justifyContent:"center"},
});