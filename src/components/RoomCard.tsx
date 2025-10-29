import type { Room, RoomStatus } from "@/types";
import { Badge, Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function RoomCard({ room, status }: { room: Room; status: RoomStatus }) {
  return (
    <Box key={room.room_id} p={6} rounded="xl" borderWidth={1} borderColor="gray.500">
      <VStack align="start">
        <Heading size="md">
          {room.room_id}
        </Heading>
        <Text fontSize="3xl" fontWeight="bold" fontFamily="mono" color={status.color}>
          {room.temperature}&deg;C
        </Text>
        <Badge colorPalette={status.color} fontSize="sm" px={3} py={1} rounded="full">
          {status.label === "Normal" ? "Normal" : "Abnormal"}
        </Badge>
      </VStack>
    </Box>
  );
}
