import React, { useContext } from 'react'
import { Button, H2, ListItem, XStack, YGroup, YStack } from 'tamagui'

import { Delete } from '@tamagui/lucide-icons'
import { AddNodeDialog } from '../../dialogs/AddNodeDialog'
import { SettingsContext } from '../../contexts/settings'

export const Nodes = () => {
  const { settings, updateSettings } = useContext(SettingsContext)

  console.log('settings', settings)

  const nodes = settings.nodes || []

  const handleDeleteNode = async (id: string) => {
    updateSettings({
      ...settings,
      nodes: nodes.filter((n) => n.id !== id),
    })
  }

  console.log('nodes', nodes)

  return (
    <YStack height="100%" space ai="flex-start">
      <H2>Nodes</H2>
      <XStack space w="100%">
        <YGroup alignSelf="center" bordered size="$4">
          {nodes.map((node) => (
            <YGroup.Item key={node.id}>
              <ListItem
                hoverTheme
                title={node.id}
                iconAfter={
                  <Button
                    icon={Delete}
                    theme="red"
                    size="$2"
                    onClick={() => handleDeleteNode(node.id)}
                  />
                }
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </XStack>
      <AddNodeDialog />
    </YStack>
  )
}