import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { C } from "../constants/theme";

export default function RunMap({ lat, lng, label }: { lat?: number | null; lng?: number | null; label?: string | null }) {
  const open=()=>{ if(typeof lat==="number"&&typeof lng==="number") Linking.openURL("https://www.google.com/maps/search/?api=1&query="+lat+","+lng); };
  return <Pressable onPress={open} style={s.map}>
    <View style={s.grid}/><Text style={s.pin}>⌖</Text><Text style={s.title}>{label || "Ponto de encontro"}</Text>
    <Text style={s.sub}>{typeof lat==="number"&&typeof lng==="number" ? "Abrir no Google Maps" : "Localização ainda não definida"}</Text>
  </Pressable>;
}
const s=StyleSheet.create({
 map:{height:150,borderRadius:18,backgroundColor:"#0A1822",borderWidth:1,borderColor:C.line,alignItems:"center",justifyContent:"center",marginTop:8,overflow:"hidden"},
 grid:{...StyleSheet.absoluteFillObject,opacity:.12,borderWidth:1,borderColor:"#6D7D88"},pin:{fontSize:28,color:C.gold,marginBottom:3},
 title:{color:C.text,fontSize:11,fontWeight:"900"},sub:{color:C.gold,fontSize:8,fontWeight:"800",marginTop:4}
});
