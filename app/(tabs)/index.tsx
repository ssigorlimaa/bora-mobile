import React from "react";
import { ScrollView, Text, View, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../../constants/theme";
import { Bottom, Avatar } from "../../components/BoraUI";

const runs=[
  {title:"Treino na Via Costeira",time:"Hoje · 19:00",distance:"5 km",pace:"5:30–6:00/km",place:"Via Costeira",match:"92%",people:"8/15",image:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=90"},
  {title:"Sunset Run Ponta Negra",time:"Hoje · 17:30",distance:"7 km",pace:"5:00–5:40/km",place:"Ponta Negra",match:"85%",people:"12/20",image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=90"},
  {title:"Longão de Sábado",time:"Sáb · 06:00",distance:"15 km",pace:"5:20–5:50/km",place:"Parque das Dunas",match:"76%",people:"18/25",image:"https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=90"}
];

const quick=[
  {label:"BORA PERTO",sub:"Agora",icon:"navigate-outline",color:C.cyan,path:"/(tabs)/explore"},
  {label:"CRIAR",sub:"Nova corrida",icon:"add",color:C.blue,path:"/(tabs)/run"},
  {label:"DESAFIOS",sub:"Sua evolução",icon:"trophy-outline",color:C.gold,path:"/(tabs)/challenges"}
];

export default function Home(){
 return <View style={s.root}>
  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.wrap}>
   <View style={s.top}>
    <View style={s.identity}><Avatar size={48} imageIndex={0}/><View><Text style={s.hello}>Fala, <Text style={s.gold}>Igor.</Text></Text><View style={s.location}><Ionicons name="location-outline" size={11} color={C.muted}/><Text style={s.locationText}>Natal, RN</Text></View></View></View>
    <Pressable style={s.bell}><Ionicons name="notifications-outline" size={21} color={C.text}/><View style={s.dot}/></Pressable>
   </View>

   <View style={s.titleRow}><View><Text style={s.kicker}>SEU PRÓXIMO PASSO</Text><Text style={s.title}>Bora correr.</Text></View><Pressable onPress={()=>router.push("/(tabs)/explore")}><Text style={s.seeAll}>Explorar <Ionicons name="arrow-forward" size={12} color={C.gold}/></Text></Pressable></View>

   <Pressable style={s.hero} onPress={()=>router.push("/(tabs)/explore")}>
    <Image source={{uri:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90"}} style={StyleSheet.absoluteFillObject}/>
    <View style={s.heroTint}/><View style={s.heroTop}><View style={s.live}><View style={s.liveDot}/><Text style={s.liveText}>BORA AGORA</Text></View><View style={s.distanceBadge}><Text style={s.distanceNum}>5</Text><Text style={s.distanceKm}>KM</Text></View></View>
    <View style={s.heroBottom}><Text style={s.heroTitle}>Encontre sua corrida.</Text><Text style={s.heroCopy}>Gente no seu ritmo, perto de você.</Text><View style={s.heroCta}><Text style={s.heroCtaText}>ENCONTRAR CORRIDA</Text><Ionicons name="arrow-forward" size={16} color="#071018"/></View></View>
   </Pressable>

   <View style={s.quickHeader}><Text style={s.sectionTitle}>Acesso rápido</Text><Text style={s.sectionHint}>BORA do seu jeito</Text></View>
   <View style={s.quickRow}>{quick.map(q=><Pressable key={q.label} style={s.quick} onPress={()=>router.push(q.path as any)}><View style={[s.quickIcon,{backgroundColor:q.color+"18",borderColor:q.color+"45"}]}><Ionicons name={q.icon as any} size={20} color={q.color}/></View><Text style={s.quickLabel}>{q.label}</Text><Text style={s.quickSub}>{q.sub}</Text></Pressable>)}</View>

   <View style={s.section}><View><Text style={s.sectionTitle}>Corridas para você</Text><Text style={s.sectionHint}>Baseadas no seu ritmo</Text></View><Pressable onPress={()=>router.push("/(tabs)/explore")}><Text style={s.seeAll}>Ver todas</Text></Pressable></View>

   {runs.map((r,i)=><Pressable key={r.title} style={s.runCard} onPress={()=>router.push("/run/1")}>
    <Image source={{uri:r.image}} style={s.runImage}/><View style={s.runShade}/>
    <View style={s.runTop}><View style={s.match}><Text style={s.matchText}>{r.match} MATCH</Text></View><View style={s.avatarStack}><Avatar size={25} imageIndex={i+1}/><Avatar size={25} imageIndex={i+2}/><Text style={s.people}>{r.people}</Text></View></View>
    <View style={s.runBottom}><Text style={s.runTitle}>{r.title}</Text><View style={s.runMeta}><Ionicons name="time-outline" size={13} color="#D9E1E6"/><Text>{r.time}</Text><Text style={s.sep}>•</Text><Text>{r.distance}</Text><Text style={s.sep}>•</Text><Text>{r.pace}</Text></View><View style={s.runFooter}><Text style={s.place}><Ionicons name="location-outline" size={12} color={C.gold}/> {r.place}</Text><View style={s.join}><Text>PARTICIPAR</Text><Ionicons name="arrow-forward" size={13} color="#071018"/></View></View></View>
   </Pressable>)}
  </ScrollView>
  <Bottom active="home"/>
 </View>
}

const s=StyleSheet.create({
 root:{flex:1,backgroundColor:C.bg},wrap:{paddingHorizontal:18,paddingTop:18,paddingBottom:116},
 top:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},identity:{flexDirection:"row",alignItems:"center",gap:11},hello:{color:C.text,fontSize:20,fontWeight:"900",letterSpacing:-.5},gold:{color:C.gold},location:{flexDirection:"row",alignItems:"center",gap:3,marginTop:3},locationText:{color:C.muted,fontSize:9,fontWeight:"600"},bell:{width:43,height:43,borderRadius:15,borderWidth:1,borderColor:"#1D3442",backgroundColor:"#071119",alignItems:"center",justifyContent:"center"},dot:{position:"absolute",width:7,height:7,borderRadius:4,backgroundColor:C.gold,right:9,top:8,borderWidth:2,borderColor:"#071119"},
 titleRow:{marginTop:27,marginBottom:12,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between"},kicker:{color:C.gold,fontSize:8,fontWeight:"900",letterSpacing:1.2,marginBottom:4},title:{color:C.text,fontSize:29,fontWeight:"900",letterSpacing:-1},seeAll:{color:C.gold,fontSize:10,fontWeight:"900",marginBottom:3},
 hero:{height:300,borderRadius:27,overflow:"hidden",position:"relative",borderWidth:1,borderColor:"#30424C",justifyContent:"space-between"},heroTint:{...StyleSheet.absoluteFillObject,backgroundColor:"#07101866"},heroTop:{flexDirection:"row",justifyContent:"space-between",padding:15},live:{height:28,paddingHorizontal:11,borderRadius:15,backgroundColor:"#071018B8",borderWidth:1,borderColor:"#FFFFFF28",flexDirection:"row",alignItems:"center",gap:6},liveDot:{width:6,height:6,borderRadius:3,backgroundColor:C.gold},liveText:{color:C.white,fontSize:8,fontWeight:"900",letterSpacing:.7},distanceBadge:{width:52,height:52,borderRadius:18,backgroundColor:"#071018CC",borderWidth:1,borderColor:"#FFFFFF28",alignItems:"center",justifyContent:"center"},distanceNum:{color:C.gold,fontSize:20,fontWeight:"900",lineHeight:20},distanceKm:{color:C.white,fontSize:7,fontWeight:"900",letterSpacing:1},heroBottom:{padding:18,paddingTop:80},heroTitle:{color:C.white,fontSize:27,fontWeight:"900",letterSpacing:-.7},heroCopy:{color:"#E1E7EB",fontSize:11,marginTop:3},heroCta:{marginTop:13,height:39,paddingHorizontal:14,borderRadius:12,backgroundColor:C.gold,alignSelf:"flex-start",flexDirection:"row",alignItems:"center",gap:9},heroCtaText:{color:"#071018",fontSize:8,fontWeight:"900",letterSpacing:.3},
 quickHeader:{marginTop:24,marginBottom:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},sectionTitle:{color:C.text,fontSize:15,fontWeight:"900",letterSpacing:-.2},sectionHint:{color:C.muted,fontSize:8.5,marginTop:3},quickRow:{flexDirection:"row",gap:9},quick:{flex:1,minHeight:91,borderRadius:18,backgroundColor:"#071119",borderWidth:1,borderColor:"#172B38",padding:11},quickIcon:{width:35,height:35,borderRadius:11,borderWidth:1,alignItems:"center",justifyContent:"center"},quickLabel:{color:C.text,fontSize:8.5,fontWeight:"900",marginTop:9,letterSpacing:.2},quickSub:{color:C.muted,fontSize:7.5,marginTop:3},
 section:{marginTop:25,marginBottom:11,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between"},
 runCard:{height:204,borderRadius:22,overflow:"hidden",marginBottom:11,position:"relative",backgroundColor:"#071119",borderWidth:1,borderColor:"#1C3340"},runImage:{...StyleSheet.absoluteFillObject},runShade:{...StyleSheet.absoluteFillObject,backgroundColor:"#00000070"},runTop:{position:"absolute",left:12,right:12,top:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},match:{backgroundColor:"#19C77AE8",paddingHorizontal:8,paddingVertical:5,borderRadius:8},matchText:{color:"#041B12",fontSize:7,fontWeight:"900",letterSpacing:.3},avatarStack:{flexDirection:"row",alignItems:"center"},people:{color:C.white,fontSize:8,fontWeight:"800",marginLeft:4},runBottom:{position:"absolute",left:14,right:14,bottom:13},runTitle:{color:C.white,fontSize:16,fontWeight:"900",letterSpacing:-.3},runMeta:{flexDirection:"row",alignItems:"center",gap:5,marginTop:6},runMetaText:{color:"#D9E1E6",fontSize:8},runMeta:{flexDirection:"row",alignItems:"center",gap:5,marginTop:6},sep:{color:"#8A9AA4",fontSize:9},runFooter:{marginTop:11,paddingTop:9,borderTopWidth:1,borderTopColor:"#FFFFFF24",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},place:{color:"#D9E1E6",fontSize:8,fontWeight:"700"},join:{height:31,paddingHorizontal:11,borderRadius:10,backgroundColor:C.gold,flexDirection:"row",alignItems:"center",gap:7},joinText:{color:"#071018",fontSize:7,fontWeight:"900"}
});