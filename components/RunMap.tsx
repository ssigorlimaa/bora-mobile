import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { C } from "../constants/theme";

export default function RunMapFallback({ label }: { lat?: number | null; lng?: number | null; label?: string | null }) {
  return <View style={s.map}><Text style={s.pin}>⌖</Text><Text style={s.title}>{label || "Ponto de encontro"}</Text><Text style={s.sub}>Mapa interativo disponível no aplicativo</Text></View>;
}
const s=StyleSheet.create({
 map:{height:150,borderRadius:18,backgroundColor:"#0A1822",borderWidth:1,borderColor:C.line,alignItems:"center",justifyContent:"center",marginTop:8,overflow:"hidden"},
 pin:{fontSize:28,color:C.gold,marginBottom:3},
 title:{color:C.text,fontSize:11,fontWeight:"900"},
 sub:{color:C.muted,fontSize:8,marginTop:3}
});
