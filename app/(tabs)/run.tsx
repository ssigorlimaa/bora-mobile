import React,{useState}from"react";
import{ScrollView,Text,View,Pressable,TextInput,StyleSheet,Alert}from"react-native";
import{router}from"expo-router";import*as Location from"expo-location";
import{C}from"../../constants/theme";import{Bottom,Chip}from"../../components/BoraUI";import{getUser,randomToken}from"../../lib/bora";import{supabase}from"../../lib/supabase";import RunMap from"../../components/RunMap";
function roundApprox(value:number){return Math.round(value*1000)/1000}
export default function Run(){
 const[title,setTitle]=useState("");const[coords,setCoords]=useState<{lat:number;lng:number}|null>(null);const[description,setDescription]=useState("");const[dist,setDist]=useState("5");const[pace,setPace]=useState("5:30-6:00");const[when,setWhen]=useState("tomorrow");const[meeting,setMeeting]=useState("");const[limit,setLimit]=useState("20");const[busy,setBusy]=useState(false);
 async function locate(){try{const p=await Location.requestForegroundPermissionsAsync();if(p.status!=="granted")return Alert.alert("Localização","Permissão não concedida. Você ainda pode criar a corrida sem coordenadas.");const pos=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Balanced});setCoords({lat:roundApprox(pos.coords.latitude),lng:roundApprox(pos.coords.longitude)});Alert.alert("Localização","Ponto de encontro aproximado capturado.");}catch{Alert.alert("Localização","Não foi possível obter sua localização agora.")}}
 async function create(){
  if(busy)return;
  const user=await getUser();if(!user||!supabase)return Alert.alert("Sessão","Entre novamente para criar.");
  if(!title.trim())return Alert.alert("Título","Dê um nome para a corrida.");
  const now=new Date();const start=new Date(now);
  if(when==="now"){start.setTime(now.getTime()+60*60*1000);}
  else if(when==="today"){start.setHours(now.getHours()+2,0,0,0);if(start.toDateString()!==now.toDateString())return Alert.alert("Horário indisponível","Hoje já não há um horário futuro disponível. Escolha 'Daqui a 1h' ou 'Amanhã'.");}
  else{start.setDate(start.getDate()+1);start.setMinutes(0,0,0);}
  const [a,b]=pace.split("-").map(x=>{const [m,s]=x.split(":").map(Number);return m*60+s});
  setBusy(true);
  try{
    const {data:run,error}=await supabase.rpc("create_run",{p_title:title.trim(),p_description:description.trim()||null,p_starts_at:start.toISOString(),p_distance_km:Number(dist),p_pace_min_sec:a,p_pace_max_sec:b,p_meeting_lat:coords?.lat??null,p_meeting_lng:coords?.lng??null,p_meeting_label:meeting.trim()||null,p_max_participants:Number(limit)||20,p_share_token:randomToken()});
    if(error||!run){Alert.alert("Não foi possível criar",error?.message||"Erro inesperado.");return;}
    router.replace("/run/"+run.id);
  }catch{
    Alert.alert("Falha de conexão","Não foi possível criar a corrida. Confira sua internet e tente novamente.");
  }finally{setBusy(false);}
}
 return <View style={s.root}><ScrollView style={s.bg} contentContainerStyle={s.wrap} keyboardShouldPersistTaps="handled">
 <Text style={s.title}>‹  Criar corrida</Text><Text style={s.section}>Informações básicas</Text>
 <Text style={s.label}>Título da corrida</Text><TextInput value={title} onChangeText={setTitle} placeholder="Ex: Treino leve na orla" placeholderTextColor={C.muted} style={s.input}/>
 <Text style={s.label}>Descrição</Text><TextInput value={description} onChangeText={setDescription} placeholder="Fala um pouco sobre o treino..." placeholderTextColor={C.muted} style={[s.input,{height:72,textAlignVertical:"top"}]} multiline/>
 <Text style={s.section}>Quando?</Text><View style={s.row}>{[["now","Daqui a 1h"],["today","Hoje"],["tomorrow","Amanhã"]].map(x=><Pressable key={x[0]} onPress={()=>setWhen(x[0])}><Chip active={when===x[0]}>{x[1]}</Chip></Pressable>)}</View>
 <Text style={s.section}>Onde?</Text><Pressable style={s.locationBtn} onPress={locate}><Text style={s.locationText}>{coords?"✓ Localização aproximada capturada":"⌖ Usar minha localização atual"}</Text></Pressable><TextInput value={meeting} onChangeText={setMeeting} placeholder="Ex: Via Costeira, Natal" placeholderTextColor={C.muted} style={s.input}/><Text style={s.privacy}>Seu ponto é armazenado e exibido apenas de forma aproximada.</Text>{coords&&<RunMap lat={coords.lat} lng={coords.lng} label={meeting||"Ponto de encontro"}/>}
 <Text style={s.section}>Distância</Text><View style={s.row}>{["3","5","10","21"].map(x=><Pressable key={x} onPress={()=>setDist(x)}><Chip active={dist===x}>{x} km</Chip></Pressable>)}</View>
 <Text style={s.section}>Ritmo</Text><View style={s.row}>{["5:00-5:30","5:30-6:00","6:00-6:30","6:30-7:00"].map(x=><Pressable key={x} onPress={()=>setPace(x)}><Chip active={pace===x}>{x}/km</Chip></Pressable>)}</View>
 <Text style={s.section}>Limite de participantes</Text><View style={s.row}>{["10","20","30","50"].map(x=><Pressable key={x} onPress={()=>setLimit(x)}><Chip active={limit===x}>{x}</Chip></Pressable>)}</View>
 <Pressable style={[s.cta,busy&&{opacity:.65}]} disabled={busy} onPress={create}><Text style={s.ctaText}>{busy?"CRIANDO...":"CRIAR CORRIDA"}</Text></Pressable>
 </ScrollView><Bottom active="create"/></View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:C.bg},bg:{flex:1},wrap:{padding:15,paddingBottom:190},title:{color:C.text,fontSize:17,fontWeight:"900",marginBottom:12},section:{color:C.text,fontSize:13,fontWeight:"900",marginTop:14,marginBottom:9},label:{color:C.text,fontSize:9,fontWeight:"800",marginTop:6,marginBottom:5},locationBtn:{height:42,borderRadius:11,borderWidth:1,borderColor:C.gold,alignItems:"center",justifyContent:"center",marginBottom:7},locationText:{color:C.gold,fontSize:9,fontWeight:"900"},privacy:{color:C.muted,fontSize:7,lineHeight:12,marginTop:5},input:{borderWidth:1,borderColor:C.line,backgroundColor:C.card,borderRadius:11,padding:12,color:C.text,fontSize:11},row:{flexDirection:"row",gap:6,flexWrap:"wrap"},cta:{height:50,borderRadius:15,backgroundColor:C.gold,alignItems:"center",justifyContent:"center",marginTop:22},ctaText:{color:"#071018",fontWeight:"900",fontSize:11}});
