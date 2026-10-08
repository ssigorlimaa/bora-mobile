import React from "react";
import { ScrollView, Text, View, Pressable, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { C } from "../../constants/theme";
import { Bottom, Avatar } from "../../components/BoraUI";

const runs = [
  ["Treino na Via Costeira","Hoje · 19:00","5 km · 5:30–6:00/km","Via Costeira, Natal","92%","8/15","https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=700&q=90"],
  ["Sunset Run Ponta Negra","Hoje · 17:30","7 km · 5:00–5:40/km","Ponta Negra, Natal","85%","12/20","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=90"],
  ["Longão de Sábado","Sáb · 06:00","15 km · 5:20–5:50/km","Parque das Dunas","76%","18/25","https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=90"],
];

const actions = [
  ["●","BORA PERTO","Corridas na sua região","/(tabs)/explore",C.cyan],
  ["＋","CRIAR CORRIDA","Reúna a galera","/(tabs)/run",C.blue],
  ["♙","CORREDORES","Conheça pessoas","/runners","#4B6475"],
  ["♜","DESAFIOS","Supere seus limites","/(tabs)/challenges",C.gold],
];

export default function Home() {
  return (
    <View style={s.root}>
      <ScrollView style={s.bg} showsVerticalScrollIndicator={false} contentContainerStyle={s.wrap}>
        <View style={s.head}>
          <Avatar size={44}/>
          <View style={s.headCopy}>
            <Text style={s.hello}>Fala, <Text style={s.gold}>Igor!</Text> 👋</Text>
            <Text style={s.sub}>Bora correr hoje?</Text>
          </View>
          <Pressable style={s.headBtn}><Text style={s.headIcon}>♧</Text><View style={s.dot}/></Pressable>
          <Pressable style={s.headBtn}><Text style={s.headIcon}>♙</Text></Pressable>
        </View>

        <Pressable style={s.search} onPress={() => router.push("/(tabs)/explore")}>
          <Text style={s.searchText}>⌕  Buscar corridas, lugares ou pessoas...</Text>
          <Text style={s.filter}>☷</Text>
        </Pressable>

        <Pressable style={s.hero} onPress={() => router.push("/(tabs)/explore")}>
          <Image source={{uri:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90"}} style={StyleSheet.absoluteFillObject}/>
          <View style={s.heroShade}/>
          <View style={s.heroCopy}>
            <Text style={s.eyebrow}>CORRIDAS PRÓXIMAS DE VOCÊ</Text>
            <Text style={s.heroTitle}>BORA <Text style={s.gold}>AGORA</Text></Text>
            <Text style={s.heroText}>Encontre gente com o mesmo ritmo e corra junto.</Text>
          </View>
          <View style={s.go}><Text style={s.goText}>→</Text></View>
        </Pressable>

        <View style={s.grid}>
          {actions.map((x) => (
            <Pressable key={x[1]} style={[s.action,{backgroundColor:x[4]+"18",borderColor:x[4]+"72"}]} onPress={() => router.push(x[3] as any)}>
              <Text style={[s.actionIcon,{color:x[4]}]}>{x[0]}</Text>
              <Text style={s.actionTitle}>{x[1]}</Text>
              <Text style={s.actionSub}>{x[2]}</Text>
              <Text style={s.chev}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Corridas sugeridas pra você</Text>
          <Pressable onPress={() => router.push("/(tabs)/explore")}><Text style={s.see}>Ver todas ›</Text></Pressable>
        </View>

        {runs.map((r,i) => (
          <Pressable key={r[0]} style={s.run} onPress={() => router.push("/run/1")}>
            <Image source={{uri:r[6]}} style={s.thumb}/>
            <View style={s.runMiddle}>
              <Text style={s.runTitle} numberOfLines={1}>{r[0]}</Text>
              <Text style={s.meta}>▣  {r[1]}</Text>
              <Text style={s.meta}>⌖  {r[2]}</Text>
              <Text style={s.meta}>⌖  {r[3]}</Text>
            </View>
            <View style={s.right}>
              <Text style={s.match}>{r[4]} match</Text>
              <View style={s.people}><Avatar i={i+1} size={21}/><Avatar i={i+2} size={21}/><Text style={s.count}>{r[5]}</Text></View>
              <Text style={s.part}>PARTICIPAR</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Bottom active="home"/>
    </View>
  );
}

const s = StyleSheet.create({
  root:{flex:1,backgroundColor:C.bg},
  bg:{flex:1},
  wrap:{paddingHorizontal:15,paddingTop:15,paddingBottom:112},
  head:{flexDirection:"row",alignItems:"center"},
  headCopy:{flex:1,marginLeft:9},
  hello:{color:C.text,fontSize:18,fontWeight:"900",letterSpacing:-.25},
  gold:{color:C.gold},
  sub:{color:C.muted,fontSize:10,marginTop:2,fontWeight:"600"},
  headBtn:{width:40,height:40,borderRadius:12,borderWidth:1,borderColor:"#203442",alignItems:"center",justifyContent:"center",backgroundColor:"#08131C",marginLeft:7,position:"relative"},
  headIcon:{color:C.text,fontSize:18},
  dot:{position:"absolute",width:6,height:6,borderRadius:3,backgroundColor:C.gold,right:6,top:6},
  search:{height:46,borderRadius:23,borderWidth:1,borderColor:"#394A55",backgroundColor:"#09151E",marginTop:13,marginBottom:12,paddingHorizontal:14,flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
  searchText:{color:"#A9B6C0",fontSize:9.5,fontWeight:"600"},
  filter:{color:C.gold,fontSize:20},
  hero:{height:220,borderRadius:20,overflow:"hidden",justifyContent:"flex-end",padding:17,position:"relative",borderWidth:1,borderColor:"#263A47"},
  heroShade:{...StyleSheet.absoluteFillObject,backgroundColor:"#00000078"},
  heroCopy:{zIndex:2},
  eyebrow:{color:"#F8FAFC",fontSize:8,fontWeight:"900",letterSpacing:.55,marginBottom:3},
  heroTitle:{color:C.white,fontSize:34,fontStyle:"italic",fontWeight:"900",letterSpacing:-1.4},
  heroText:{color:"#F2F5F7",fontSize:10.5,width:"73%",lineHeight:15,marginTop:1,fontWeight:"500"},
  go:{position:"absolute",right:15,bottom:15,width:47,height:47,borderRadius:24,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",zIndex:3},
  goText:{color:"#071018",fontSize:28,lineHeight:30,fontWeight:"500"},
  grid:{flexDirection:"row",flexWrap:"wrap",gap:8,marginTop:10},
  action:{width:"48%",height:89,borderRadius:16,borderWidth:1,padding:11,position:"relative"},
  actionIcon:{fontSize:21,fontWeight:"900"},
  actionTitle:{color:C.text,fontSize:10.5,fontWeight:"900",marginTop:7,letterSpacing:.15},
  actionSub:{color:"#B7C3CB",fontSize:8.2,marginTop:3},
  chev:{position:"absolute",right:12,bottom:10,color:"#D8E0E5",fontSize:22},
  section:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:18,marginBottom:10},
  sectionTitle:{color:C.text,fontSize:14,fontWeight:"900",letterSpacing:-.2},
  see:{color:C.gold,fontSize:9.5,fontWeight:"900"},
  run:{minHeight:105,borderRadius:16,borderWidth:1,borderColor:"#1D3442",backgroundColor:"#09151E",padding:8,flexDirection:"row",gap:9,marginBottom:8},
  thumb:{width:73,height:89,borderRadius:11},
  runMiddle:{flex:1,minWidth:0,paddingTop:1},
  runTitle:{color:C.text,fontSize:10.2,fontWeight:"900",marginBottom:5},
  meta:{color:C.muted,fontSize:7.9,lineHeight:14},
  right:{width:76,alignItems:"flex-end"},
  match:{color:"#042217",backgroundColor:C.green,borderRadius:8,paddingHorizontal:6,paddingVertical:4,fontSize:7,fontWeight:"900"},
  people:{flexDirection:"row",alignItems:"center",marginTop:9,height:22},
  count:{color:C.text,fontSize:7,marginLeft:3},
  part:{backgroundColor:C.gold,color:"#071018",paddingHorizontal:7,paddingVertical:7,borderRadius:8,fontSize:7,fontWeight:"900",marginTop:7},
});