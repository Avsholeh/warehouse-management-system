import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router";
import ToggleDarkMode from "./ToggleDarkMode";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box bg={useColorModeValue("blue.700", "blue.900")} color="white" px={6} py={3} mb={6} shadow="sm">
      <Flex maxW="6xl" mx="auto" gap={4} flexWrap="wrap" justifyContent="space-between">
        <Flex gap={3}>
          <Button
            as={(props) => <Link {...props} to="/" />}
            colorPalette="blue"
            variant={isActive("/") ? "solid" : "subtle"}
            size="sm"
            rounded="0"
          >
            Dashboard
          </Button>
          <Button
            as={(props) => <Link {...props} to="/inventory" />}
            colorPalette="blue"
            variant={isActive("/inventory") ? "solid" : "subtle"}
            size="sm"
            rounded="0"
          >
            Inventory List
          </Button>
          <Button
            as={(props) => <Link {...props} to="/add" />}
            colorPalette="blue"
            variant={isActive("/add") ? "solid" : "subtle"}
            size="sm"
            rounded="0"
          >
            Add Inbound
          </Button>
        </Flex>
        <Flex>
          <ToggleDarkMode />
        </Flex>
      </Flex>
    </Box>
  );
}
