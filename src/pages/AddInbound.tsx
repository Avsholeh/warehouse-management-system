import AddInboundForm from "@/components/AddInboundForm";
import { Box, Heading } from "@chakra-ui/react";

export default function AddInbound() {
  return (
    <>
      <title>Add Inbound - Warehouse Management System</title>
      <Box p={6} minH="100vh" maxWidth="6xl" mx="auto">
        <Heading mb={8}>Add Inbound</Heading>
        <AddInboundForm />
      </Box>
    </>
  );
}
