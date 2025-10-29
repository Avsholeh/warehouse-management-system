import type { InventoryItem, Location as LocationType, Room } from "@/types";

const API_BASE = "http://localhost:8001";

export const fetchTemperatures = async (): Promise<Room[]> => {
  const res = await fetch(`${API_BASE}/temperatures`);
  return res.json();
};

export const fetchInventory = async (): Promise<InventoryItem[]> => {
  const res = await fetch(`${API_BASE}/inventory`);
  return res.json();
};

export const fetchLocations = async (): Promise<LocationType[]> => {
  const res = await fetch(`${API_BASE}/locations`);
  return res.json();
};
