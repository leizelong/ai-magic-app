import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import child_process from 'child_process'
import path from 'path'
import fs from 'fs'

// Custom APIs for renderer
export const api = { child_process, path, fs }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
