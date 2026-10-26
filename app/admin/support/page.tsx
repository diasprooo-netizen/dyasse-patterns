import { SupportChat } from '@/components/support-chat'
export const dynamic='force-dynamic'
export default function AdminSupport(){return <div className="space-y-4"><p className="text-sm text-[#607489]">Real customer messages, order references and replies. Keep this page open to chat; messages refresh automatically.</p><SupportChat staff/></div>}