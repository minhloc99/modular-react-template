import { Center, ProgressCircle, Show } from "@chakra-ui/react";

function Loading({ visible }: { visible: boolean }) {
  return <Show when={visible}>
    <Center
      zIndex="toast"
      bg="primary.50"
      pos="fixed"
      opacity={0.7}
      top="0"
      left="0"
      right="0"
      bottom="0">
      <ProgressCircle.Root value={null} size="xl">
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Center>
  </Show>
}

export default Loading;