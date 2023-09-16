import { Observable, Subject } from 'rxjs'
import './index.scss'
import { useEffect, useState } from 'react'

export const LogViewSubject = new Subject()

export interface LogViewProps {
  id?: string
  $log?: Observable<any>
}

export function LogView(props: LogViewProps) {
  const { id, $log } = props

  const [logStr, setLogStr] = useState<string>('')

  useEffect(() => {
    if (!$log) return
    setLogStr('')
    const subscribe = $log.subscribe((data) => {
      const dataStr = data.toString()
      console.log('dataStr :>> ', dataStr)
      setLogStr((preLogStr) => preLogStr + dataStr)
    })

    return () => {
      subscribe.unsubscribe()
    }
  }, [$log])

  if (!logStr) return null

  return <div className="log-view">{logStr}</div>
}
