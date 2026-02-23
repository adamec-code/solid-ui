import { createSignal } from "solid-js"

import { useDesignSystem } from "~/components/design-system-provider"
import { IconLibraryPicker } from "~/components/icon-library-picker"
import { StyleSelect } from "~/components/style-select"
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
      <SheetTrigger as={Button<"button">} variant="ghost">
        Styling
      </SheetTrigger>
      <SheetContent class="w-full gap-0 p-0 sm:max-w-md" side="right">
        <div class="flex h-full flex-col">
          <SheetHeader class="border-b pr-12">
            <SheetTitle>Styling</SheetTitle>
            <SheetDescription>Choose a style and icon library.</SheetDescription>
          </SheetHeader>

          <div class="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <StyleSelect />
            <IconLibraryPicker />
          </div>

          <div class="mt-auto border-t p-4">
            <div class="grid grid-cols-2 gap-2">
              <Button onClick={handleShuffle} variant="outline">
                Shuffle
              </Button>
              <Button onClick={handleReset} variant="secondary">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
