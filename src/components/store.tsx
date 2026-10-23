'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Workout } from '@/lib/types';
type Store = { plan: Workout[]; saved: Workout[]; done: string[]; addPlan:(w:Workout)=>void; addSaved:(w:Workout)=>void; removePlan:(id:string)=>void; removeSaved:(id:string)=>void; toggleDone:(id:string)=>void; toast:(message:string)=>void; notice:string };
const Ctx=createContext<Store|null>(null);
export function AppStore({children}:{children:ReactNode}) {
 const [plan,setPlan]=useState<Workout[]>([]),[saved,setSaved]=useState<Workout[]>([]),[done,setDone]=useState<string[]>([]),[notice,setNotice]=useState('');
 useEffect(()=>{try{setPlan(JSON.parse(localStorage.getItem('fitlog-plan')||'[]'));setSaved(JSON.parse(localStorage.getItem('fitlog-saved')||'[]'));setDone(JSON.parse(localStorage.getItem('fitlog-done')||'[]'));}catch{ /* ignore invalid local cache */}},[]);
 useEffect(()=>{localStorage.setItem('fitlog-plan',JSON.stringify(plan));},[plan]);useEffect(()=>{localStorage.setItem('fitlog-saved',JSON.stringify(saved));},[saved]);useEffect(()=>{localStorage.setItem('fitlog-done',JSON.stringify(done));},[done]);
 const toast=useCallback((message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(''),2600)},[]);
 const addPlan=useCallback((w:Workout)=>{setPlan(old=>{if(old.some(x=>x.id===w.id)){toast('Already in today’s plan');return old}if(old.length>=5){toast('Your plan is full (5 workouts max)');return old}toast('Added to today’s plan');return [...old,w]})},[toast]);
 const addSaved=useCallback((w:Workout)=>{setSaved(old=>{if(old.some(x=>x.id===w.id)){toast('Already saved');return old}toast('Saved for later');return [...old,w]})},[toast]);
 const removePlan=useCallback((id:string)=>{setPlan(old=>old.filter(x=>x.id!==id));toast('Removed from today’s plan')},[toast]);const removeSaved=useCallback((id:string)=>{setSaved(old=>old.filter(x=>x.id!==id));toast('Removed from saved')},[toast]);const toggleDone=useCallback((id:string)=>{setDone(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];toast(next.includes(id)?'Workout marked as done':'Workout marked as not done');return next})},[toast]);
 const value=useMemo(()=>({plan,saved,done,addPlan,addSaved,removePlan,removeSaved,toggleDone,toast,notice}),[plan,saved,done,addPlan,addSaved,removePlan,removeSaved,toggleDone,toast,notice]);
 return <Ctx.Provider value={value}>{children}{notice&&<div role="status" className="toast"><span className="toast-dot"/>{notice}</div>}</Ctx.Provider>
}
export function useFitLog(){const value=useContext(Ctx);if(!value)throw new Error('useFitLog must be used inside AppStore');return value}
