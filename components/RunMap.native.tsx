import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { C } from "../constants/theme";

export default function RunMap({ lat, lng, label }: { lat?: number | null; lng?: number | null; label?: string | null }) {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return <View style={s.empty}><Text style={s.pin}>⌖</Text><Text style={s.title}>{label || "Ponto de encontro"}</Text><Text style={s.sub}>Localização ainda não definida</Text></View>;
  }
  return <View style={s.wrap}>
    <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude: lat, longitude: lng, latitudeDelta: 0.012, longitudeDelta: 0.012 }} showsUserLocation={false} showsCompass={false}>
      <Marker coordinate={{ latitude: lat, longitude: lng }} title={label || "BORA"} description="Ponto de encontro" />
    </MapView>
    <View style={s.badge}><Text style={s.badgeText}>PONTO DE ENCONTRO</Text></View>
  </View>;
}
const s=StyleSheet.create({
 wrap:{height:180,borderRadius:18,overflow:"hidden",marginTop:8,borderWidth:1,borderColor:C.line},
 empty:{height:150,borderRadius:18,backgroundColor:"#0A1822",borderWidth:1,borderColor:C.line,alignItems:"center",justifyContent:"center",marginTop:8},
 pin:{fontSize:28,color:C.gold,marginBottom:3},title:{color:C.text,fontSize:11,fontWeight:"900"},sub:{color:C.muted,fontSize:8,marginTop:3},
 badge:{position:"absolute",left:10,top:10,backgroundColor:"#071018DD",paddingHorizontal:10,paddingVertical:7,borderRadius:10,borderWidth:1,borderColor:C.gold},
 badgeText:{color:C.gold,fontSize:7,fontWeight:"900",letterSpacing:.7}
});
