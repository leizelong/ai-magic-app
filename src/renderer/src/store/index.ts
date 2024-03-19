import { createContext } from 'react'
import clientStore from './clientStore'
import liveRoomStore from './liveRoomStore'
import storageStore from './storageStore'

export const store = { clientStore, liveRoomStore, storageStore }

export const StoreContext = createContext(store)
