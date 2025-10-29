import { fetchInventory } from "@/services/api";
import { useInventoryStore } from "@/store/inventoryStore";
import { Box, Flex, Heading, Input, Table } from "@chakra-ui/react";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";

export default function InventoryList() {
  const { items, setItems } = useInventoryStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInventory().then(setItems);
  }, [setItems]);

  const filtered = useMemo(() => {
    return items.filter(
      (item) =>
        item.sku.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const isNearExpiry = (expiry: string) => {
    const days = differenceInDays(parseISO(expiry), new Date());
    return days <= 30 && days >= 0;
  };

  return (
    <>
      <title>Inventory List - Warehouse Management System</title>
      <Box p={6} minH="100vh" maxWidth="6xl" mx="auto">
        <Flex justifyContent="space-between">
          <Heading mb={8}>Inventory List</Heading>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search SKU or Name..."
            maxWidth="xs"
            size="sm"
          />
        </Flex>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>SKU</Table.ColumnHeader>
              <Table.ColumnHeader>Nama Barang</Table.ColumnHeader>
              <Table.ColumnHeader>Batch</Table.ColumnHeader>
              <Table.ColumnHeader>Expiry</Table.ColumnHeader>
              <Table.ColumnHeader>Qty</Table.ColumnHeader>
              <Table.ColumnHeader>Location</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.map((item) => {
              const _isNearExpiry = isNearExpiry(item.expiry);
              return (
                <Table.Row key={item.sku} bg={_isNearExpiry ? "red.600" : ""} color={_isNearExpiry ? "white" : ""}>
                  <Table.Cell>{item.sku}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.batch}</Table.Cell>
                  <Table.Cell>{item.expiry}</Table.Cell>
                  <Table.Cell>{item.qty}</Table.Cell>
                  <Table.Cell>{item.location}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  );
}
