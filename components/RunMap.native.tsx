import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { C } from "../constants/theme";

export default function RunMap({ lat, lng, label }: { lat?: number | null; lng?: number | null; label?: string | null }) {
  const hasCoords=typeof lat==="number"&&typeof lng==="number";
  const openMaps=()=>{if(hasCoords)Linking.openURL("https://www.google.com/maps/search/?api=1&query="+lat+","+lng);};
  if (!hasCoords) {
    return <View style={s.empty}><Text style={s.pin}>⌖</Text><Text style={s.title}>{label || "Ponto de encontro"}</Text><Text style={s.sub}>Localização ainda não definida</Text></View>;
  }
  return <View style={s.wrap}>
    <MapView
      style={StyleSheet.absoluteFillObject}
      provider={PROVIDER_GOOGLE}
      initialRegion={{ latitude: lat as number, longitude: lng as number, latitudeDelta: 0.012, longitudeDelta: 0.012 }}
      showsUserLocation={false}
      showsCompass
      showsScale
      toolbarEnabled={false}
      loadingEnabled
      moveOnMarkerPress={false}
    >
      <Marker coordinate={{ latitude: lat as number, longitude: lng as number }} title={label || "BORA"} description="Ponto de encontro" />
    </MapView>
    <View style={s.badge}><View style={s.dot}/><Text style={s.badgeText}>PONTO DE ENCONTRO</Text></View>
    <Pressable onPress={openMaps} style={s.open}><Text style={s.openText}>ABRIR NO MAPA</Text><Text style={s.arrow}>↗</Text></Pressable>
  </View>;
}
const s=StyleSheet.create({
 wrap:{height:210,borderRadius:20,overflow:"hidden",marginTop:8,borderWidth:1,borderColor:C.line,backgroundColor:"#0A1822"},
 empty:{height:150,borderRadius:18,backgroundColor:"#0A1822",borderWidth:1,borderColor:C.line,alignItems:"center",justifyContent:"center",marginTop:8},
 pin:{fontSize:28,color:C.gold,marginBottom:3},title:{color:C.text,fontSize:11,fontWeight:"900"},sub:{color:C.muted,fontSize:8,marginTop:3},
 badge:{position:"absolute",left:10,top:10,flexDirection:"row",alignItems:"center",gap:6,backgroundColor:"#071018E8",paddingHorizontal:10,paddingVertical:7,borderRadius:10,borderWidth:1,borderColor:"#FFFFFF25"},
 dot:{width:6,height:6,borderRadius:3,backgroundColor:C.gold},badgeText:{color:C.gold,fontSize:7,fontWeight:"900",letterSpacing:.7},
 open:{position:"absolute",right:10,bottom:10,height:34,borderRadius:17,backgroundColor:C.gold,paddingHorizontal:12,flexDirection:"row",alignItems:"center",gap:5},
 openText:{color:"#071018",fontSize:7,fontWeight:"900"},arrow:{color:"#071018",fontSize:14,fontWeight:"900"}
});
