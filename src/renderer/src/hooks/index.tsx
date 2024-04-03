import { useState } from 'react'

export function autoUpdateId() {
  const [updateId, setUpdateId] = useState(0)
  function forceUpdate() {
    setUpdateId((preId) => preId + 1)
  }
  return forceUpdate
}
