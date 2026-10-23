'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getCurrentAdminState } from '@/lib/admin-products'
export async function approveTestedPattern(form:FormData){
 const state=await getCurrentAdminState()
 if(!state.isAdmin)return {ok:false,message:'Unauthorized'}
 const id=String(form.get('productId')||'')
 const evidence=String(form.get('evidence')||'').trim()
 const attested=form.get('attested')==='yes'
 if(!/^[0-9a-f-]{36}$/i.test(id)||!attested) return {ok:false,message:'Confirmation required.'}
 let u:URL
 try{u=new URL(evidence)}catch{return {ok:false,message:'Provide a valid test evidence URL.'}}
 if(u.protocol!=='https:' || evidence.length>1500)return {ok:false,message:'Evidence must be a secure URL.'}
 const db=await createClient()
 const {data:{user}}=await db.auth.getUser()
 if(!user)return {ok:false,message:'Sign in again.'}
 const audit=await db.from('qa_audits').insert({product_id:id,reviewed_by:user.id,evidence_url:evidence})
 if(audit.error)return {ok:false,message:audit.error.message}
 const result=await db.from('products').update({qa_verified:true,test_evidence_url:evidence,updated_at:new Date().toISOString()}).eq('id',id)
 if(result.error)return {ok:false,message:result.error.message}
 revalidatePath('/admin');revalidatePath('/admin/qa')
 return {ok:true,message:'QA evidence recorded. Product remains a draft until you publish it.'}
}
