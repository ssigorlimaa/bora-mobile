import React,{useEffect,useState} from "react";
import { ScrollView, Text, View, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../../constants/theme";
import { Bottom } from "../../components/BoraUI";
import { supabase } from "../../lib/supabase";

export default function Home(){
  const [runs,setRuns]=useState<any[]>([]);
  useEffect(()=>{(async()=>{if(!supabase)return;const {data}=await supabase.from("runs").select("*").eq("visibility","public").eq("status","scheduled").gte("starts_at",new Date().toISOString()).order("starts_at",{ascending:true}).limit(3);setRuns(data||[])})()},[]);
  return <View style={s.root}>
    <ScrollView style={s.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={s.content}>
      <View style={s.header}>
        <View style={s.identity}>
          <View style={s.avatar}><Ionicons name="person" size={23} color={C.muted}/></View>
          <View><Text style={s.hello}>Fala, <Text style={s.gold}>Igor!</Text> 👋</Text><Text style={s.sub}>Bora correr hoje?</Text></View>
        </View>
        <View style={s.actions}>
          <Pressable style={s.iconBtn}><Ionicons name="notifications-outline" size={21} color={C.text}/><View style={s.dot}/></Pressable>
          <Pressable style={s.iconBtn}><Ionicons name="settings-outline" size={20} color={C.text}/></Pressable>
        </View>
      </View>
      <Pressable style={s.search} onPress={()=>router.push("/(tabs)/explore")}>
        <Ionicons name="search-outline" size={21} color={C.text}/><Text style={s.searchText}>Buscar corridas, lugares ou pessoas...</Text><Ionicons name="options-outline" size={21} color={C.text}/>
      </Pressable>
      <Pressable style={s.hero} onPress={()=>router.push("/(tabs)/explore")}>
        <Image source={{uri:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90"}} style={StyleSheet.absoluteFillObject}/>
        <View style={s.heroShade}/>
        <View style={s.heroCopy}><Text style={s.eyebrow}>CORRIDAS PRÓXIMAS DE VOCÊ</Text><Text style={s.heroTitle}>BORA <Text style={s.gold}>AGORA</Text></Text><Text style={s.heroText}>Encontre gente com o mesmo ritmo e corra junto.</Text></View>
        <View style={s.heroArrow}><Ionicons name="arrow-forward" size={25} color="#071018"/></View>
      </Pressable>
      <View style={s.quickGrid}>
        <Quick icon="location" title="BORA PERTO" sub="Corridas na sua região" tone="cyan" onPress={()=>router.push("/(tabs)/explore")}/>
        <Quick icon="add" title="CRIAR CORRIDA" sub="Reúna a galera" tone="blue" onPress={()=>router.push("/(tabs)/run")}/>
        <Quick icon="people-outline" title="CORREDORES" sub="Conheça pessoas" tone="dark" onPress={()=>router.push("/runners" as any)}/>
        <Quick icon="trophy-outline" title="DESAFIOS" sub="Supere seus limites" tone="gold" onPress={()=>router.push("/(tabs)/challenges")}/>
      </View>
      <View style={s.sectionHead}>
        <View><Text style={s.sectionTitle}>Corridas para você</Text><Text style={s.sectionSub}>Baseadas no seu ritmo</Text></View>
        <Pressable onPress={()=>router.push("/(tabs)/explore")}><Text style={s.see}>Ver todas <Ionicons name="chevron-forward" size={11} color={C.gold}/></Text></Pressable>
      </View>
      {runs.length>0?<View style={s.runList}>{runs.map(r=><Pressable key={r.id} style={s.runCard} onPress={()=>router.push(("/run/"+r.id) as any)}><View style={{flex:1}}><Text style={s.runTitle}>{r.title}</Text><Text style={s.runMeta}>{Number(r.distance_km)} km · {new Date(r.starts_at).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})}</Text><Text style={s.runMeta}>⌖ {r.meeting_label||"Local a definir"}</Text></View><Text style={s.runCta}>VER</Text></Pressable>)}</View>:<View style={s.empty}>
        <View style={s.emptyIcon}><Ionicons name="walk-outline" size={35} color={C.muted}/></View>
        <Text style={s.emptyTitle}>Nenhuma corrida encontrada</Text>
        <Text style={s.emptyText}>Que tal criar sua primeira corrida{"\n"}ou explorar a região?</Text>
        <Pressable style={s.emptyCta} onPress={()=>router.push("/(tabs)/explore")}><Text style={s.emptyCtaText}>Explorar agora</Text><Ionicons name="arrow-forward" size={17} color={C.gold}/></Pressable>
      </View>}
    </ScrollView>
    <Bottom active="home"/>
  </View>
}
function Quick({icon,title,sub,tone,onPress}:{icon:any;title:string;sub:string;tone:"cyan"|"blue"|"dark"|"gold";onPress:()=>void}){
  const colors={cyan:{bg:"#042A2A",line:"#0B9E9D",icon:C.cyan},blue:{bg:"#071B37",line:"#245FC2",icon:C.blue},dark:{bg:"#071119",line:"#243B49",icon:C.text},gold:{bg:"#241F09",line:"#947100",icon:C.gold}};
  const x=colors[tone];
  return <Pressable onPress={onPress} style={[s.quick,{backgroundColor:x.bg,borderColor:x.line}]}>
    <View style={s.quickTop}><View style={[s.quickIcon,{backgroundColor:x.icon}]}><Ionicons name={icon} size={19} color={tone==="dark"?"#071018":tone==="blue"?C.white:"#071018"}/></View><Ionicons name="chevron-forward" size={19} color={C.text}/></View>
    <Text style={s.quickTitle}>{title}</Text><Text style={s.quickSub}>{sub}</Text>
  </Pressable>
}
const s=StyleSheet.create({
 root:{flex:1,backgroundColor:C.bg},scroll:{flex:1},content:{paddingHorizontal:15,paddingTop:18,paddingBottom:150},
 header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:16},identity:{flexDirection:"row",alignItems:"center"},avatar:{width:54,height:54,borderRadius:27,borderWidth:2,borderColor:C.gold,backgroundColor:C.card,alignItems:"center",justifyContent:"center",marginRight:11},hello:{color:C.text,fontSize:20,fontWeight:"900",letterSpacing:-.5},gold:{color:C.gold},sub:{color:C.muted,fontSize:10,marginTop:2},actions:{flexDirection:"row",gap:8},iconBtn:{width:43,height:43,borderRadius:14,borderWidth:1,borderColor:"#284254",backgroundColor:C.surface,alignItems:"center",justifyContent:"center"},dot:{position:"absolute",right:8,top:7,width:7,height:7,borderRadius:4,backgroundColor:C.gold},
 search:{height:54,borderRadius:27,borderWidth:1,borderColor:"#29485D",backgroundColor:C.surface,paddingHorizontal:16,flexDirection:"row",alignItems:"center",gap:11,marginBottom:16},searchText:{flex:1,color:"#AAB7C1",fontSize:11,fontWeight:"600"},
 hero:{height:225,borderRadius:25,overflow:"hidden",borderWidth:1,borderColor:"#29495C",position:"relative",justifyContent:"flex-end"},heroShade:{...StyleSheet.absoluteFillObject,backgroundColor:"#00000066"},heroCopy:{padding:18,paddingBottom:20},eyebrow:{color:C.white,fontSize:10,fontWeight:"800",letterSpacing:.7},heroTitle:{color:C.white,fontSize:36,fontStyle:"italic",fontWeight:"900",letterSpacing:-1.4,marginTop:3},heroText:{color:C.white,fontSize:11,lineHeight:16,width:"72%",marginTop:2},heroArrow:{position:"absolute",right:17,bottom:19,width:51,height:51,borderRadius:26,backgroundColor:C.gold,alignItems:"center",justifyContent:"center"},
 quickGrid:{flexDirection:"row",flexWrap:"wrap",gap:9,marginTop:12},quick:{width:"48.5%",height:112,borderRadius:19,borderWidth:1,padding:12},quickTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},quickIcon:{width:35,height:35,borderRadius:18,alignItems:"center",justifyContent:"center"},quickTitle:{color:C.text,fontSize:10,fontWeight:"900",marginTop:12},quickSub:{color:"#AAB7C1",fontSize:8.5,marginTop:4,lineHeight:12},
 sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:23,marginBottom:10},sectionTitle:{color:C.text,fontSize:19,fontWeight:"900",letterSpacing:-.5},sectionSub:{color:C.muted,fontSize:10,marginTop:2},see:{color:C.gold,fontSize:10,fontWeight:"900"},
 empty:{height:300,borderRadius:22,borderWidth:1,borderColor:"#17394D",backgroundColor:"#06111A",alignItems:"center",justifyContent:"center",paddingHorizontal:25,marginBottom:10},emptyIcon:{width:72,height:72,borderRadius:36,borderWidth:1,borderColor:"#28475A",alignItems:"center",justifyContent:"center",marginBottom:14},emptyTitle:{color:C.text,fontSize:16,fontWeight:"900"},emptyText:{color:C.muted,fontSize:11,lineHeight:18,textAlign:"center",marginTop:7},emptyCta:{marginTop:17,height:43,paddingHorizontal:22,borderRadius:22,borderWidth:1.5,borderColor:C.gold,flexDirection:"row",alignItems:"center",gap:12},emptyCtaText:{color:C.gold,fontSize:11,fontWeight:"900"},runList:{gap:8},runCard:{minHeight:78,borderRadius:15,borderWidth:1,borderColor:"#17394D",backgroundColor:"#06111A",padding:12,flexDirection:"row",alignItems:"center"},runTitle:{color:C.text,fontSize:11,fontWeight:"900"},runMeta:{color:C.muted,fontSize:8,lineHeight:14},runCta:{color:"#071018",backgroundColor:C.gold,paddingHorizontal:9,paddingVertical:7,borderRadius:8,fontSize:8,fontWeight:"900"}
});