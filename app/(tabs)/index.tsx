import React from "react";
import { ScrollView, Text, View, Pressable, StyleSheet, Image, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../../constants/theme";
import { Bottom, Avatar } from "../../components/BoraUI";

const runs=[
 {title:"Treino na Via Costeira",time:"Hoje · 19:00",distance:"5 km",pace:"5:30–6:00/km",place:"Via Costeira, Natal",match:"92%",people:"8/15",image:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=700&q=90"},
 {title:"Sunset Run Ponta Negra",time:"Hoje · 17:30",distance:"7 km",pace:"5:00–5:40/km",place:"Ponta Negra, Natal",match:"85%",people:"12/20",image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=90"},
 {title:"Longão de Sábado",time:"Sáb · 06:00",distance:"15 km",pace:"5:20–5:50/km",place:"Parque das Dunas",match:"76%",people:"18/25",image:"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=90"}
];

export default function Home(){
 const {width}=useWindowDimensions();
 const compact=width<390;
 return <View style={s.root}>
  <ScrollView style={s.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={[s.wrap,compact&&s.wrapCompact]}>
   <View style={s.header}>
    <View style={s.identity}><Avatar size={compact?45:48} imageIndex={0}/><View style={{marginLeft:10}}><Text style={s.hello}>Fala, <Text style={s.gold}>Igor!</Text> <Text style={s.wave}>👋</Text></Text><Text style={s.sub}>Bora correr hoje?</Text></View></View>
    <View style={s.headerActions}><Pressable style={s.iconBtn}><Ionicons name="notifications-outline" size={20} color={C.text}/><View style={s.dot}/></Pressable><Pressable style={s.iconBtn}><Ionicons name="person-add-outline" size={18} color={C.text}/></Pressable></View>
   </View>

   <Pressable style={s.search} onPress={()=>router.push("/(tabs)/explore")}>
    <Ionicons name="search-outline" size={17} color="#92A1AB"/><Text style={s.searchText}>Buscar corridas, lugares ou pessoas...</Text><Ionicons name="options-outline" size={20} color={C.gold}/>
   </Pressable>

   <Pressable style={[s.hero,compact&&s.heroCompact]} onPress={()=>router.push("/(tabs)/explore")}>
    <Image source={{uri:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90"}} style={StyleSheet.absoluteFillObject}/>
    <View style={s.heroShade}/>
    <View style={s.heroContent}><Text style={s.heroEyebrow}>CORRIDAS PRÓXIMAS DE VOCÊ</Text><Text style={s.heroTitle}>BORA <Text style={s.gold}>AGORA</Text></Text><Text style={s.heroText}>Encontre gente com o mesmo ritmo e corra junto.</Text></View>
    <View style={s.heroGo}><Ionicons name="arrow-forward" size={26} color="#071018"/></View>
   </Pressable>

   <View style={s.quickGrid}>
    <Pressable style={[s.quick,s.quickCyan]} onPress={()=>router.push("/(tabs)/explore")}><View style={s.quickTop}><View style={[s.quickIcon,{backgroundColor:C.cyan}]}><Ionicons name="location" size={17} color="#06201F"/></View><Ionicons name="chevron-forward" size={22} color={C.white}/></View><Text style={s.quickTitle}>BORA PERTO</Text><Text style={s.quickSub}>Corridas na sua região</Text></Pressable>
    <Pressable style={[s.quick,s.quickBlue]} onPress={()=>router.push("/(tabs)/run")}><View style={s.quickTop}><View style={[s.quickIcon,{backgroundColor:C.blue}]}><Ionicons name="add" size={22} color={C.white}/></View><Ionicons name="chevron-forward" size={22} color={C.white}/></View><Text style={s.quickTitle}>CRIAR CORRIDA</Text><Text style={s.quickSub}>Reúna a galera</Text></Pressable>
    <Pressable style={[s.quick,s.quickDark]} onPress={()=>router.push("/runners" as any)}><View style={s.quickTop}><View style={[s.quickIcon,{backgroundColor:"#10202C"}]}><Ionicons name="people-outline" size={19} color="#E8EEF2"/></View><Ionicons name="chevron-forward" size={22} color={C.white}/></View><Text style={s.quickTitle}>CORREDORES</Text><Text style={s.quickSub}>Conheça pessoas</Text></Pressable>
    <Pressable style={[s.quick,s.quickGold]} onPress={()=>router.push("/(tabs)/challenges")}><View style={s.quickTop}><View style={[s.quickIcon,{backgroundColor:C.gold}]}><Ionicons name="trophy" size={17} color="#2B2200"/></View><Ionicons name="chevron-forward" size={22} color={C.white}/></View><Text style={s.quickTitle}>DESAFIOS</Text><Text style={s.quickSub}>Supere seus limites</Text></Pressable>
   </View>

   <View style={s.section}><Text style={s.sectionTitle}>Corridas sugeridas pra você</Text><Pressable onPress={()=>router.push("/(tabs)/explore")}><Text style={s.see}>Ver todas <Ionicons name="chevron-forward" size={11} color={C.gold}/></Text></Pressable></View>

   {runs.map((r,i)=><Pressable key={r.title} style={s.run} onPress={()=>router.push("/run/1")}>
    <Image source={{uri:r.image}} style={s.runImage}/>
    <View style={s.runBody}>
      <View style={s.runMain}><Text style={s.runTitle} numberOfLines={1}>{r.title}</Text><Text style={s.meta}><Ionicons name="calendar-outline" size={12} color={C.gold}/> {r.time}</Text><Text style={s.meta}><Ionicons name="speedometer-outline" size={12} color={C.gold}/> {r.distance} · {r.pace}</Text><Text style={s.meta}><Ionicons name="location-outline" size={12} color={C.gold}/> {r.place}</Text></View>
      <View style={s.runRight}><Text style={s.match}>{r.match} match</Text><View style={s.people}><Avatar size={22} imageIndex={i+1}/><Avatar size={22} imageIndex={i+2}/><Text style={s.peopleText}>{r.people}</Text></View><View style={s.join}><Text style={s.joinText}>PARTICIPAR</Text></View></View>
    </View>
   </Pressable>)}
  </ScrollView>
  <Bottom active="home"/>
 </View>
}

const s=StyleSheet.create({
 root:{flex:1,backgroundColor:C.bg},scroll:{flex:1},wrap:{paddingHorizontal:15,paddingTop:14,paddingBottom:16},wrapCompact:{paddingHorizontal:14},
 header:{height:53,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},identity:{flexDirection:"row",alignItems:"center"},hello:{color:C.text,fontSize:20,fontWeight:"900",letterSpacing:-.5},gold:{color:C.gold},wave:{fontSize:18},sub:{color:C.muted,fontSize:10,marginTop:2,fontWeight:"500"},headerActions:{flexDirection:"row",gap:8},iconBtn:{width:41,height:41,borderRadius:13,borderWidth:1,borderColor:"#1C3443",backgroundColor:"#07131C",alignItems:"center",justifyContent:"center",position:"relative"},dot:{position:"absolute",right:7,top:6,width:6,height:6,borderRadius:3,backgroundColor:C.gold},
 search:{height:50,borderRadius:25,borderWidth:1,borderColor:"#294150",backgroundColor:"#07131C",marginTop:10,marginBottom:13,paddingHorizontal:15,flexDirection:"row",alignItems:"center",gap:10},searchText:{flex:1,color:"#99A7B1",fontSize:10,fontWeight:"600"},
 hero:{height:220,borderRadius:24,overflow:"hidden",position:"relative",justifyContent:"flex-end",borderWidth:1,borderColor:"#33434C"},heroCompact:{height:205},heroShade:{...StyleSheet.absoluteFillObject,backgroundColor:"#00000066"},heroContent:{padding:15,paddingBottom:18},heroEyebrow:{color:C.white,fontSize:8,fontWeight:"900",letterSpacing:.7,marginBottom:4},heroTitle:{color:C.white,fontSize:31,fontStyle:"italic",fontWeight:"900",letterSpacing:-1.2},heroText:{color:C.white,fontSize:10.5,lineHeight:15,width:"72%",marginTop:2},heroGo:{position:"absolute",right:14,bottom:14,width:47,height:47,borderRadius:24,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},
 quickGrid:{flexDirection:"row",flexWrap:"wrap",gap:9,marginTop:10},quick:{width:"48.5%",height:82,borderRadius:18,borderWidth:1,padding:11},quickCyan:{backgroundColor:"#042A2A",borderColor:"#0B9E9D"},quickBlue:{backgroundColor:"#071B37",borderColor:"#245FC2"},quickDark:{backgroundColor:"#071119",borderColor:"#162A37"},quickGold:{backgroundColor:"#241F09",borderColor:"#947100"},quickTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},quickIcon:{width:32,height:32,borderRadius:16,alignItems:"center",justifyContent:"center"},quickTitle:{color:C.text,fontSize:10,fontWeight:"900",marginTop:7,letterSpacing:.1},quickSub:{color:"#AAB6BE",fontSize:8,marginTop:2},
 section:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:18,marginBottom:9},sectionTitle:{color:C.text,fontSize:15,fontWeight:"900",letterSpacing:-.25},see:{color:C.gold,fontSize:9,fontWeight:"900"},
 run:{height:111,borderRadius:16,borderWidth:1,borderColor:"#1D3543",backgroundColor:"#07131C",padding:7,marginBottom:8,flexDirection:"row"},runImage:{width:88,height:95,borderRadius:11},runBody:{flex:1,flexDirection:"row",paddingLeft:9},runMain:{flex:1,minWidth:0},runTitle:{color:C.text,fontSize:10.5,fontWeight:"900",marginTop:1,marginBottom:4},meta:{color:"#AAB7BF",fontSize:7.5,lineHeight:15},runRight:{width:72,alignItems:"flex-end"},match:{color:"#052218",backgroundColor:C.green,borderRadius:8,paddingHorizontal:5,paddingVertical:4,fontSize:6.8,fontWeight:"900"},people:{flexDirection:"row",alignItems:"center",marginTop:7},peopleText:{color:C.text,fontSize:7,marginLeft:3},join:{backgroundColor:C.gold,borderRadius:8,paddingHorizontal:6,paddingVertical:6,marginTop:7},joinText:{color:"#071018",fontSize:6.5,fontWeight:"900"}
});