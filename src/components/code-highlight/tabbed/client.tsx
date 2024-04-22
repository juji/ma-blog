"use client"

import * as Tabs from "@radix-ui/react-tabs"
import React, { PropsWithChildren } from "react"

export function TabsRoot({ children, defaultValue }: PropsWithChildren<{defaultValue: string | undefined}>) {
  return (
    <Tabs.Root defaultValue={defaultValue}>
      {children}
    </Tabs.Root>
  )
}

export function TabsList({ titles, children }: PropsWithChildren<{titles: (string | undefined)[]}>) {
  const tabs = React.Children.toArray(children)
  return (
    <Tabs.List style={{ display: "flex" }}>
      {titles.map((title, i) => (
        <Tabs.Trigger asChild key={title} value={title||''}>
          {tabs[i]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  )
}

export function TabsContent(props:any) {
  return <Tabs.Content {...props} />
}