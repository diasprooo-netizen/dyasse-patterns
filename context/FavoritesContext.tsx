'use client'
import React,{createContext,useContext,useEffect,useState} from 'react'
type Context={ ids:string[];toggle:(id:string)=>Promise<void>;contains:(id:string)=>boolean;busy:string|null }
const FavoritesContext=createContext<Context|undefined>(undefined)
const KEY='dyasse-favorites-v1'
const clean=(ids:unknown)=>Array.isArray(ids)?Array.from(new Set(ids.filter((v):v is string=>typeof v==='string'&&/^[0-9a-f-]{36}$/i.test(v)))).slice(0,200):[]
export function FavoritesProvider({children}:{children:React.ReactNode}){
 const [ids,setIds]=useState<string[]>([])
 const [busy,setBusy]=useState<string|null>(null)
 const [loaded,setLoaded]=useState(false)
 const [server,setServer]=useState(false)
 useEffect(()=>{
  let valid=true
  const saved=(()=>{try{return clean(JSON.parse(localStorage.getItem(KEY)||'[]'))}catch{return []}})()
  setIds(saved)
  const load=async()=>{
   try{
    const response=await fetch('/api/favorites',{credentials:'same-origin',cache:'no-store'})
    if(!valid)return
    if(response.ok){
      const result=await response.json() as {ids?:string[];authenticated?:boolean}
      if(result.authenticated){
       setServer(true)
       const merged=clean([...(result.ids||[]),...saved])
       setIds(merged)
       for(const id of saved.filter(x=>!(result.ids||[]).includes(x))){
         void fetch('/api/favorites',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId:id})})
       }
      }
    }
   }catch{}finally{if(valid)setLoaded(true)}
  }
  void load()
  return()=>{valid=false}
 },[])
 useEffect(()=>{if(loaded)try{localStorage.setItem(KEY,JSON.stringify(ids))}catch{}},[ids,loaded])
 async function toggle(id:string){
  if(busy)return
  const already=ids.includes(id)
  setIds(prev=>already?prev.filter(x=>x!==id):clean([...prev,id]))
  if(!server)return
  setBusy(id)
  try{
   const result=await fetch('/api/favorites',{method:already?'DELETE':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productId:id})})
   if(!result.ok)throw Error('Could not save')
  }catch{setIds(prev=>already?clean([...prev,id]):prev.filter(x=>x!==id))}
  finally{setBusy(null)}
 }
 return <FavoritesContext.Provider value={{ids,contains:(id)=>ids.includes(id),toggle,busy}}>{children}</FavoritesContext.Provider>
}
export function useFavorites(){const ctx=useContext(FavoritesContext);if(!ctx)throw Error('FavoritesProvider missing');return ctx}
