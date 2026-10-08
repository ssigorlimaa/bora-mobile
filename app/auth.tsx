import {useState} from "react";
import {View,Text,TextInput,Pressable,StyleSheet,Alert} from "react-native";
import {router} from "expo-router";
import {C} from "../constants/theme";
import {supabase} from "../lib/supabase";
export default function Auth(){
 const[email,setEmail]=useState(""); const[password,setPassword]=useState(""); const[name,setName]=useState(""); const[signup,setSignup]=useState(false); const[busy,setBusy]=useState(false);
 async function submit(){
  if(!supabase)return Alert.alert("Configuração","Supabase não configurado.");
  if(!email||password.length<6||(signup&&!name.trim()))return Alert.alert("Confira","Preencha os campos. A senha precisa ter pelo menos 6 caracteres.");
  setBusy(true);
  if(signup){
   const {data,error}=await supabase.auth.signUp({email:email.trim(),password,options:{data:{display_name:name.trim()}}});
   if(error){setBusy(false);return Alert.alert("Não foi possível criar",""+error.message);}
   if(data.session) router.replace("/");
   else Alert.alert("Conta criada","Verifique seu e-mail para confirmar a conta e depois entre.");
  }else{
   const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
   if(error){setBusy(false);return Alert.alert("Não foi possível entrar",error.message);}
   router.replace("/");
  }
  setBusy(false);
 }
 return <View style={s.wrap}><Text style={s.logo}>BORA</Text><Text style={s.tag}>Você não precisa correr sozinho.</Text>
 {signup&&<TextInput style={s.input} placeholder="Seu nome" placeholderTextColor={C.muted} value={name} onChangeText={setName}/>}
 <TextInput style={s.input} placeholder="E-mail" placeholderTextColor={C.muted} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"/>
 <TextInput style={s.input} placeholder="Senha" placeholderTextColor={C.muted} value={password} onChangeText={setPassword} secureTextEntry/>
 <Pressable style={s.cta} disabled={busy} onPress={submit}><Text style={s.ctaText}>{busy?"AGUARDE...":signup?"CRIAR CONTA":"ENTRAR"}</Text></Pressable>
 <Pressable onPress={()=>setSignup(!signup)}><Text style={s.switch}>{signup?"Já tenho uma conta":"Ainda não tenho conta"}</Text></Pressable>
 </View>
}
const s=StyleSheet.create({wrap:{flex:1,backgroundColor:C.bg,padding:22,justifyContent:"center"},logo:{color:C.gold,fontSize:48,fontWeight:"900",fontStyle:"italic"},tag:{color:C.text,fontSize:20,fontWeight:"900",marginVertical:22},input:{backgroundColor:C.card,borderColor:C.line,borderWidth:1,borderRadius:12,padding:13,color:C.text,marginBottom:9},cta:{backgroundColor:C.gold,padding:15,borderRadius:13,alignItems:"center",marginTop:6},ctaText:{color:"#071018",fontWeight:"900"},switch:{color:C.gold,textAlign:"center",marginTop:18,fontWeight:"800"}});