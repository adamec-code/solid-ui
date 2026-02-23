import { IconLock, IconLockOpen } from "@tabler/icons-solidjs"

import { type LockableParam, useLocks } from "~/hooks/use-locks"
import { cn } from "~/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/registry/ui/tooltip"

type LockButtonProps = {
  param: LockableParam
  class?: string
}

export function LockButton(props: LockButtonProps) {
  const { isLocked, toggleLock } = useLocks()

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={isLocked(props.param) ? "Unlock" : "Lock"}
        class={cn(
          "flex pointer-coarse:hidden size-4 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity focus:opacity-100 group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 data-[locked=true]:opacity-100",
          props.class
        )}
        data-locked={isLocked(props.param)}
        onClick={() => toggleLock(props.param)}
        type="button"
      >
        {isLocked(props.param) ? <IconLock class="size-4" /> : <IconLockOpen class="size-4" />}
      </TooltipTrigger>
      <TooltipContent>{isLocked(props.param) ? "Unlock" : "Lock"}</TooltipContent>
    </Tooltip>
  )
}
