import { type Component, type ComponentProps, createResource, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"

import type { IconLibraryName } from "~/registry/icon-libraries"

type IconComponent = Component<ComponentProps<"svg">>
type IconLibraryModule = Record<string, IconComponent>

const iconPromiseCaches = new Map<IconLibraryName, Promise<IconLibraryModule>>()

function loadIconLibrary(libraryName: IconLibraryName) {
  if (!iconPromiseCaches.has(libraryName)) {
    const promise =
      libraryName === "lucide"
        ? import("~/registry/icons/__lucide__")
        : import("~/registry/icons/__tabler__")

    iconPromiseCaches.set(libraryName, promise as Promise<IconLibraryModule>)
  }

  return iconPromiseCaches.get(libraryName)!
}

export function createIconLoader(libraryName: IconLibraryName) {
  return function IconLoader(props: { name: string } & ComponentProps<"svg">) {
    const [local, svgProps] = splitProps(props, ["name"])
    const [icons] = createResource(() => loadIconLibrary(libraryName))

    return (
      <Show when={icons()?.[local.name] as IconComponent | undefined}>
        {(IconComponent) => <Dynamic component={IconComponent()} {...svgProps} />}
      </Show>
    )
  }
}
