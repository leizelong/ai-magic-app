import { ElectronAPI } from '@electron-toolkit/preload'
import child_process, { ChildProcess, exec, execSync, spawn, spawnSync } from 'child_process'
import path from 'path'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      child_process: typeof child_process
      path: typeof path
    }
  }
}
