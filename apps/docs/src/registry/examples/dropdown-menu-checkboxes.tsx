import { createSignal } from "solid-js"

import { Activity, LayoutPanelLeft } from "lucide-solid"

import { Button } from "~/registry/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuTrigger
} from "~/registry/ui/dropdown-menu"

export default function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = createSignal(true)
  const [showActivityBar, setShowActivityBar] = createSignal(false)
  const [showPanel, setShowPanel] = createSignal(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} class="w-fit" variant="outline">
        Checkboxes
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>Appearance</DropdownMenuGroupLabel>
          <DropdownMenuCheckboxItem checked={showStatusBar()} onChange={setShowStatusBar}>
            <LayoutPanelLeft />
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar()}
            disabled
            onChange={setShowActivityBar}
          >
            <Activity />
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel()} onChange={setShowPanel}>
            <LayoutPanelLeft />
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
