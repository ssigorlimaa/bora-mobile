import {useEffect,useState} from "react";
import {View,Text,TextInput,Pressable,StyleSheet,Alert,KeyboardAvoidingView,Platform,ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router,useLocalSearchParams} from "expo-router";
import {C} from "../constants/theme";
import {supabase} from "../lib/supabase";

const INVITE_KEY="bora.pending_invite";

function messageFor(error:any){const m=String(error?.message||"");if(/invalid login credentials/i.test(m))return "E-mail ou senha incorretos.";if(/email not confirmed/i.test(m))return "Confirme seu e-mail antes de entrar.";if(/user already registered/i.test(m))return "Esse e-mail já está cadastrado.";if(/password/i.test(m)&&/(weak|short|at least|characters)/i.test(m))return "Use uma senha de pelo menos 8 caracteres e siga os requisitos de segurança.";
 if(/password/i.test(m))return "A senha não atende aos requisitos de segurança configurados." ;return m||"Não foi possível concluir agora."}

export default function Auth(){
 const params=useLocalSearchParams<{invite?:string}>();
 const[email,setEmail]=useState(""); const[password,setPassword]=useState(""); const[name,setName]=useState(""); const[signup,setSignup]=useState(false); const[busy,setBusy]=useState(false); const[inviteToken,setInviteToken]=useState<string|null>(null);

 useEffect(()=>{(async()=>{const fromParams=typeof params.invite==="string"&&params.invite?params.invite:null;if(fromParams){await AsyncStorage.setItem(INVITE_KEY,fromParams);setInviteToken(fromParams)}else setInviteToken(await AsyncStorage.getItem(INVITE_KEY))})()},[params.invite]);

 async function resetPassword(){
  if(!supabase)return Alert.alert("Configuração","O BORA não conseguiu conectar ao servidor.");
  if(!email.trim())return Alert.alert("E-mail","Digite seu e-mail para receber o link.");
  setBusy(true);const {error}=await supabase.auth.resetPasswordForEmail(email.trim(),{redirectTo:"bora://reset-password"});setBusy(false);
  if(error)return Alert.alert("Recuperação",messageFor(error));Alert.alert("E-mail enviado","Confira sua caixa de entrada para redefinir a senha.");
 }
 async function finishInvite(userId:string,token:string|null){if(!supabase||!token||!userId)return null;const{data}=await supabase.from("runs").select("id").eq("share_token",token).maybeSingle();if(data?.id)await AsyncStorage.removeItem(INVITE_KEY);return data?.id||null}
 async function submit(){
  if(!supabase)return Alert.alert("Configuração","O BORA não conseguiu conectar ao servidor.");
  if(!email.trim()||password.length<8||(signup&&!name.trim()))return Alert.alert("Confira","Preencha os campos. A senha precisa ter pelo menos 8 caracteres.");
  setBusy(true);
  if(signup){
   const {data,error}=await supabase.auth.signUp({email:email.trim(),password,options:{data:{display_name:name.trim()}}});
   if(error){setBusy(false);return Alert.alert("Não foi possível criar",messageFor(error));}
   if(data.session){const inviteRun=await finishInvite(data.session.user.id,inviteToken);router.replace(inviteRun?("/run/"+inviteRun) as any:"/")}else Alert.alert("Conta criada","Confira seu e-mail para confirmar a conta e depois entre. O convite da corrida foi preservado.");
  }else{
   const {data,error}=await supabase.auth.signInWithPassword({email:email.trim(),password});
   if(error){setBusy(false);return Alert.alert("Não foi possível entrar",messageFor(error));}
   const inviteRun=await finishInvite(data.user?.id||"",inviteToken);router.replace(inviteRun?("/run/"+inviteRun) as any:"/");
  }
  setBusy(false);
 }
 return <KeyboardAvoidingView style={s.root} behavior={Platform.OS==="ios"?"padding":undefined}><ScrollView contentContainerStyle={s.wrap} keyboardShouldPersistTaps="handled"><Text style={s.logo}>BORA</Text><Text style={s.tag}>Você não precisa correr sozinho.</Text><Text style={s.helper}>{signup?"Crie seu perfil e encontre sua próxima corrida.":"Entre para correr com gente que combina com você."}</Text>
 {inviteToken&&<View style={s.invite}><Text style={s.inviteText}>CONVITE DE CORRIDA RECEBIDO</Text><Text style={s.inviteSub}>Após entrar, você será levado direto para a corrida.</Text></View>}
 {signup&&<TextInput style={s.input} placeholder="Seu nome" placeholderTextColor={C.muted} value={name} onChangeText={setName} autoCapitalize="words" returnKeyType="next"/>}
 <TextInput style={s.input} placeholder="E-mail" placeholderTextColor={C.muted} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress"/>
 <TextInput style={s.input} placeholder="Senha" placeholderTextColor={C.muted} value={password} onChangeText={setPassword} secureTextEntry textContentType="password"/>
 <Pressable style={[s.cta,busy&&{opacity:.65}]} disabled={busy} onPress={submit}><Text style={s.ctaText}>{busy?"AGUARDE...":signup?"CRIAR CONTA":"ENTRAR"}</Text></Pressable>
 {!signup&&<Pressable onPress={resetPassword} disabled={busy}><Text style={s.forgot}>Esqueci minha senha</Text></Pressable>}
 <Pressable onPress={()=>setSignup(!signup)}><Text style={s.switch}>{signup?"Já tenho uma conta":"Ainda não tenho conta"}</Text></Pressable>
 </ScrollView></KeyboardAvoidingView>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:C.bg},wrap:{flexGrow:1,padding:22,paddingTop:70,paddingBottom:50,justifyContent:"center"},logo:{color:C.gold,fontSize:48,fontWeight:"900",fontStyle:"italic"},tag:{color:C.text,fontSize:20,fontWeight:"900",marginTop:22},helper:{color:C.muted,fontSize:11,lineHeight:17,marginTop:8,marginBottom:22,maxWidth:320},invite:{padding:12,borderRadius:13,borderWidth:1,borderColor:C.gold,backgroundColor:"#241F09",marginBottom:12},inviteText:{color:C.gold,fontSize:8,fontWeight:"900"},inviteSub:{color:C.muted,fontSize:8,marginTop:4,lineHeight:13},input:{backgroundColor:C.card,borderColor:C.line,borderWidth:1,borderRadius:14,padding:15,color:C.text,marginBottom:10,fontSize:14},cta:{backgroundColor:C.gold,padding:16,borderRadius:14,alignItems:"center",marginTop:6},ctaText:{color:"#071018",fontWeight:"900"},switch:{color:C.gold,textAlign:"center",marginTop:18,fontWeight:"800"},forgot:{color:C.muted,textAlign:"center",marginTop:14,fontSize:11,fontWeight:"700"}});
