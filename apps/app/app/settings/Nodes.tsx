import React, { useContext, useState } from 'react'
import {
  H2,
  ListItem,
  Paragraph,
  RadioGroup,
  XStack,
  YGroup,
  YStack,
} from 'tamagui'
import * as QRCodeGenerator from 'qrcode'

import { AddNodeDialog } from '../../dialogs/AddNodeDialog'
import { SettingsContext } from '../../contexts/settings'
import { ConfirmNodeDeleteAlertDialog } from '../../dialogs/ConfirmNodeDeleteAlertDialog'
import { QRCode } from '../../components/QRCode'

export const Nodes = () => {
  const settingsContext = useContext(SettingsContext)
  const { settings, updateSettings } = settingsContext
  const [qrCodeXML, setQrCodeXML] = useState(null)

  const nodes = settings.nodes || []

  const handleDeleteNode = async (id: string) => {
    updateSettings({
      ...settings,
      selectedNodeId:
        settings.selectedNodeId === id ? null : settings.selectedNodeId,
      nodes: nodes.filter((n) => n.id !== id),
    })
  }

  const updateSelectedNodeId = (id: string) => {
    updateSettings({ ...settings, selectedNodeId: id })
  }

  QRCodeGenerator.toString('test', { type: 'svg' }).then(setQrCodeXML)

  return (
    <YStack space ai="flex-start">
      <H2>Nodes</H2>
      <Paragraph>Add a node, and select the node to connect to</Paragraph>
      <QRCode xml={qrCodeXML} />
      <XStack space w="100%">
        <YGroup alignSelf="center" bordered size="$4">
          {nodes.map((node) => (
            <YGroup.Item key={node.id}>
              <ListItem
                gap="$4"
                iconAfter={
                  <ConfirmNodeDeleteAlertDialog
                    onConfirm={() => {
                      handleDeleteNode(node.id)
                    }}
                  />
                }
              >
                <RadioGroup
                  value={settings.selectedNodeId}
                  onValueChange={updateSelectedNodeId}
                >
                  <RadioGroup.Item id={node.id} value={node.id}>
                    <RadioGroup.Indicator />
                  </RadioGroup.Item>
                </RadioGroup>
                {node.name}
              </ListItem>
            </YGroup.Item>
          ))}
        </YGroup>
      </XStack>
      <AddNodeDialog settingsContext={settingsContext} />
    </YStack>
  )
}
