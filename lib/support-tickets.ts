import { getEnv } from "@/lib/cf-context";
export const TICKET_CATEGORIES = ["billing","technical","course","account","general"] as const;
export const TICKET_STATUSES = ["open","answered","resolved","closed"] as const;
export const TICKET_PRIORITIES = ["low","normal","high"] as const;
export function ticketDb() { const env=getEnv(); const db=env.COURSE_DB || env.DB; if(!db) throw new Error("D1 binding unavailable"); return db; }
export function validMessage(value:unknown,min=10,max=5000) { return typeof value==="string" && value.trim().length>=min && value.trim().length<=max; }
export function adminAuthorized(request:Request) { const env=getEnv(); const key=request.headers.get("x-admin-key"); return Boolean(key && env.SUPPORT_ADMIN_KEY && key===env.SUPPORT_ADMIN_KEY); }
