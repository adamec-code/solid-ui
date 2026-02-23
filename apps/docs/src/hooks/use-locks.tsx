import { createContext, createMemo, createSignal, type ParentProps, useContext } from "solid-js"

export type LockableParam = "style" | "iconLibrary"

type LocksContextValue = {
  locks: () => Set<LockableParam>
  isLocked: (param: LockableParam) => boolean
  toggleLock: (param: LockableParam) => void
}

const LocksContext = createContext<LocksContextValue>()

export function LocksProvider(props: ParentProps) {
  const [locks, setLocks] = createSignal<Set<LockableParam>>(new Set())

  const isLocked = (param: LockableParam) => locks().has(param)

  const toggleLock = (param: LockableParam) => {
    setLocks((prev) => {
      const next = new Set(prev)

      if (next.has(param)) {
        next.delete(param)
      } else {
        next.add(param)
      }

      return next
    })
  }

  const value = createMemo<LocksContextValue>(() => ({
    locks,
    isLocked,
    toggleLock
  }))

  return <LocksContext.Provider value={value()}>{props.children}</LocksContext.Provider>
}

export function useLocks() {
  const context = useContext(LocksContext)

  if (context === undefined) {
    throw new Error("[SolidUI]: `useLocks` must be used within a `LocksProvider`")
  }

  return context
}
