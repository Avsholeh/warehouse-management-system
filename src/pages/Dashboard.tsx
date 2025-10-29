import RoomCard from "@/components/RoomCard";
import { usePolling } from "@/hooks/usePolling";
import { fetchTemperatures } from "@/services/api";
import type { Room, RoomStatus } from "@/types";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

export default function Dashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);

  usePolling({
    fetchFunc: fetchTemperatures,
    interval: 10_000, // 10 detik
    onSuccess: (data) => setRooms(data),
    onError: (err) => console.error("Polling error:", err),
    enabled: true,
  });

  const getStatus = (temp: number): RoomStatus => {
    const isNormal = temp >= -20 && temp <= -16;
    return {
      label: isNormal ? "Normal" : "Abnormal",
      color: isNormal ? "green" : "red",
    };
  };

  return (
    <>
      <title>Dashboard - Warehouse Management System</title>
      <Box p={6} minH="100vh" maxWidth="6xl" mx="auto">
        <Heading mb={8}>Dashboard</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} columnGap="2">
          {rooms.map((room) => (
            <RoomCard room={room} status={getStatus(room.temperature)} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
