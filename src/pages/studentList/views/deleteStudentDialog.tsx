"use client"

import { Button, Dialog, Portal } from "@chakra-ui/react"
import { useAtomValue } from "jotai"
import { deleteStudentDialogPropsAtom, studentListPageStoreManager } from "../sharedStates";

export default function DeleteStudentDialog() {
  const props = useAtomValue(deleteStudentDialogPropsAtom);

  return (
    <Dialog.Root
      lazyMount
      open={props.isOpen}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete student</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure you want to delete this student?
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                onClick={() => studentListPageStoreManager.set(deleteStudentDialogPropsAtom, {
                  isOpen: false
                })}
                variant="outline"
              >Cancel</Button>
              <Button
                onClick={() => props.onConfirm && props.onConfirm()}
              >Confirm</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
