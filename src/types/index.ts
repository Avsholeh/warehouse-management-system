export interface Room {
  room_id: string;
  temperature: number;
}

export interface RoomStatus {
  label: string;
  color: string;
}

export interface InventoryItem {
  sku: string;
  name: string;
  batch: string;
  expiry: string;
  qty: number;
  location: string;
}

export interface Location {
  id: string;
  label: string;
}