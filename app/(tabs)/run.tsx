import React,{useState}from"react";
import{ScrollView,Text,View,Pressable,TextInput,StyleSheet,Alert}from"react-native";
import{router}from"expo-router";
import{C}from"../../constants/theme";import{Bottom,Chip}from"../../components/BoraUI";import{getUser,randomToken}from"../../lib/bora";import{supabase}from"../../lib/supabase";
export default function Run(){
 const[title,setTitle]=useState("");const[description,setDescription]=useState("");const[dist,setDist]=useState("5");const[pace,setPace]=useState("5:30-6:00");const[when,setWhen]=useState("tomorrow");const[meeting,setMeeting]=useState("A definir");const[limit,setLimit]=useState("20");const[busy,setBusy]=useState(false);
 async function create(){
  const user=await getUser();if(!user||!supabase)return Alert.alert("Sessão","Entre novamente para criar.");
  if(!title.trim())return Alert.alert("Título","Dê um nome para a corrida.");
  const start=new Date();start.setHours(start.getHours()+(when==="now"?1:when==="today"?4:24));start.setMinutes(0,0,0);
  const [a,b]=pace.split("-").map(x=>{const [m,s]=x.split(":").map(Number);return m*60+s});
  setBusy(true);
  const {data:run,error}=await supabase.from("runs").insert({creator_id:user.id,title:title.trim(),description:description.trim()||null,starts_at:start.toISOString(),distance_km:Number(dist),pace_min_sec:a,pace_max_sec:b,meeting_label:meeting.trim()||null,max_participants:Number(limit)||20,visibility:"public",status:"scheduled",share_token:randomToken()}).select().single();
  if(error){setBusy(false);return Alert.alert("Não foi possível criar",error.message);}
  const {error:pe}=await supabase.from("run_participants").insert({run_id:run.id,user_id:user.id,status:"joined"});
  setBusy(false);if(pe)return Alert.alert("Corrida criada","Mas não foi possível registrar sua participação: "+pe.message);
  router.replace("/run/"+run.id);
 }
 return <View style={s.root}><ScrollView style={s.bg} contentContainerStyle={s.wrap}>
 <Text style={s.title}>‹  Criar corrida</Text><Text style={s.section}>Informações básicas</Text>
 <Text style={s.label}>Título da corrida</Text><TextInput value={title} onChangeText={setTitle} placeholder="Ex: Treino leve na orla" placeholderTextColor={C.muted} style={s.input}/>
 <Text style={s.label}>Descrição</Text><TextInput value={description} onChangeText={setDescription} placeholder="Fala um pouco sobre o treino..." placeholderTextColor={C.muted} style={[s.input,{height:72,textAlignVertical:"top"}]} multiline/>
 <Text style={s.section}>Quando?</Text><View style={s.row}>{[["now","Daqui a 1h"],["today","Hoje"],["tomorrow","Amanhã"]].map(x=><Pressable key={x[0]} onPress={()=>setWhen(x[0])}><Chip active={when===x[0]}>{x[1]}</Chip></Pressable>)}</View>
 <Text style={s.section}>Onde?</Text><TextInput value={meeting} onChangeText={setMeeting} placeholder="Ex: Via Costeira, Natal" placeholderTextColor={C.muted} style={s.input}/>
 <Text style={s.section}>Distância</Text><View style={s.row}>{["3","5","10","21"].map(x=><Pressable key={x} onPress={()=>setDist(x)}><Chip active={dist===x}>{x} km</Chip></Pressable>)}</View>
 <Text style={s.section}>Ritmo</Text><View style={s.row}>{["5:00-5:30","5:30-6:00","6:00-6:30","6:30-7:00"].map(x=><Pressable key={x} onPress={()=>setPace(x)}><Chip active={pace===x}>{x}/km</Chip></Pressable>)}</View>
 <Text style={s.section}>Limite de participantes</Text><View style={s.row}>{["10","20","30","50"].map(x=><Pressable key={x} onPress={()=>setLimit(x)}><Chip active={limit===x}>{x}</Chip></Pressable>)}</View>
 <Pressable style={s.cta} disabled={busy} onPress={create}><Text style={s.ctaText}>{busy?"CRIANDO...":"CRIAR CORRIDA"}</Text></Pressable>
 </ScrollView><Bottom active="create"/></View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:C.bg},bg:{flex:1},wrap:{padding:15,paddingBottom:150},title:{color:C.text,fontSize:17,fontWeight:"900",marginBottom:12},section:{color:C.text,fontSize:13,fontWeight:"900",marginTop:14,marginBottom:9},label:{color:C.text,fontSize:9,fontWeight:"800",marginTop:6,marginBottom:5},input:{borderWidth:1,borderColor:C.line,backgroundColor:C.card,borderRadius:11,padding:12,color:C.text,fontSize:11},row:{flexDirection:"row",gap:6,flexWrap:"wrap"},cta:{height:50,borderRadius:15,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",marginTop:22},ctaText:{color:"#071018",fontWeight:"900",fontSize:11}});
