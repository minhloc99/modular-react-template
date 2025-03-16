import { Provider, useAtomValue } from "jotai";
import { deleteStudentDialogPropsAtom, studentListAtom, studentListPageStoreManager } from "../sharedStates";
import { Box, Button, For, HStack, List, Text } from "@chakra-ui/react";
import useAppNavigation from "@/shared/hooks/useAppNavigation";
import StudentModel from "@/shared/models/studentModel";
import { useStudentListLogic } from "../hooks/useStudentListLogic";
import DeleteStudentDialog from "./deleteStudentDialog";
import { formatTime } from "@/shared/services/time.service";

function StudentListPageContent() {
  const studentList = useAtomValue(studentListAtom);
  const navigator = useAppNavigation();
  const { onDeleteStudent } = useStudentListLogic();

  return <>
    <DeleteStudentDialog />
    <HStack
      h="20"
      bg="orange.100"
      px="10"
      justifyContent="space-between"
    >
      <Box />
      <Button
        size="lg"
        colorPalette="green"
        onClick={() => navigator.navigateToStudentDetailPage()}
      >Add new student</Button>
    </HStack>
    <List.Root
      p="4"
    >
      <For
        each={studentList}
        fallback={<List.Item>No student found</List.Item>}
      >
        {
          (item: StudentModel) => <List.Item
            key={item.id}
            m="1"
            p="2"
            bg="gray.100"
          >
            <HStack
              justifyContent="space-between"
            >
              <Box>
                Name:<Text color="orange.500">{item.name}</Text>
                Email: <Text color="blue.600">{item.email}</Text>
                Updated at: <Text color="green.600">{formatTime(item.updatedAt as string).fullDateTime}</Text></Box>
              <HStack>
                <Button
                  size="sm"
                  colorPalette="blue"
                  onClick={() => navigator.navigateToStudentDetailPage(item.id)}
                >Edit</Button>
                <Button
                  size="sm"
                  colorPalette="red"
                  onClick={() => studentListPageStoreManager.set(deleteStudentDialogPropsAtom, {
                    isOpen: true,
                    data: item,
                    onConfirm: () => onDeleteStudent(item.id)
                  })}
                >Delete</Button>
              </HStack>
            </HStack>
          </List.Item>
        }
      </For>
    </List.Root>
  </>
}

export default function StudentListPage() {
  return <Provider
    store={studentListPageStoreManager}
  >
    <StudentListPageContent />
  </Provider>
}