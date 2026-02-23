import { createSignal } from "solid-js"

import { useDesignSystem } from "~/components/design-system-provider"
import { IconLibraryPicker } from "~/components/icon-library-picker"
import { StylePicker } from "~/components/style-picker"
import { iconLibraries } from "~/registry/icon-libraries"
import { STYLES } from "~/registry/styles"
import { Button } from "~/registry/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "~/registry/ui/sheet"

function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)]!
}

export function CustomizerSheet() {
  const [open, setOpen] = createSignal(false)
  const { setStyle, setIconLibrary } = useDesignSystem()

  const handleShuffle = () => {
    const randomStyle = randomItem(STYLES)
    const randomIconLibrary = randomItem(Object.values(iconLibraries))

    setStyle(randomStyle)
    setIconLibrary(randomIconLibrary.name)
  }

  const handleReset = () => {
    setStyle(STYLES[0])
    setIconLibrary("lucide")
  }

  return (
    <Sheet onOpenChange={setOpen} open={open()}>
      <SheetTrigger as={Button<"button">}>Customize</SheetTrigger>
      <SheetContent class="w-full gap-0 p-0 sm:max-w-md" side="right">
        <div class="flex h-full flex-col">
          <SheetHeader class="border-b pr-12">
            <SheetTitle>Customize</SheetTitle>
            <SheetDescription>Choose your own style!</SheetDescription>
          </SheetHeader>

          <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <StylePicker />
            <IconLibraryPicker />
            <div class="grid grid-cols-2 gap-2 pt-1">
              <Button
                class="h-[calc(--spacing(13.5))] w-full touch-manipulation select-none justify-between rounded-xl border border-foreground/10 bg-muted/50 px-2 text-left hover:bg-muted md:rounded-lg md:border-transparent md:bg-transparent"
                onClick={handleShuffle}
                variant="ghost"
              >
                <span class="flex min-w-0 flex-col">
                  <span class="text-muted-foreground text-xs">Random</span>
                  <span class="truncate font-medium">Try Random</span>
                </span>
              </Button>
              <Button
                class="h-[calc(--spacing(13.5))] w-full touch-manipulation select-none justify-between rounded-xl border border-foreground/10 bg-muted/50 px-2 text-left hover:bg-muted md:rounded-lg md:border-transparent md:bg-transparent"
                onClick={handleReset}
                variant="ghost"
              >
                <span class="flex min-w-0 flex-col">
                  <span class="text-muted-foreground text-xs">Reset</span>
                  <span class="truncate font-medium">Start Over</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
