import { supabase } from "./supabase";
import * as Crypto from "expo-crypto";
export async function getUser(){ if(!supabase) return null; const {data}=await supabase.auth.getUser(); return data.user??null; }
export async function ensureProfile(){
 const user=await getUser(); if(!user||!supabase) return null;
 const {data}=await supabase.from("profiles").select("*").eq("id",user.id).maybeSingle();
 if(data) return data;
 const display=String(user.user_metadata?.display_name||user.email?.split("@")[0]||"Corredor");
 const {data:created}=await supabase.from("profiles").insert({id:user.id,display_name:display,username:null}).select().single();
 return created;
}
export function fmtPace(sec?:number|null){ if(!sec) return "--"; const m=Math.floor(sec/60),s=Math.round(sec%60); return `${m}:${String(s).padStart(2,"0")}/km`; }
export function randomToken(){ return Crypto.randomUUID().replace(/-/g, ""); }
