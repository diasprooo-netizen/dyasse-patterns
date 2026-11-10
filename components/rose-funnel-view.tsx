'use client'

import { useEffect, useRef } from 'react'

/** A first-party, aggregate page-load count. No cookies, IPs or visitor IDs are stored. */
export function RoseFunnelView({ source }: { source: string }) {
  const logged = useRef(false)
  useEffect(() => {
    if (logged.current || !/^(www\.)?dyasse\.com$/i.test(window.location.hostname)) return
    logged.current = true
    void fetch('/api/funnel/view', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
      keepalive: true,
    }).catch(() => {})
  }, [source])
  return null
}
