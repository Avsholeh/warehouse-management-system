import type { InventoryItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InventoryStore {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  setItems: (items: InventoryItem[]) => void;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      setItems: (items) => set({ items }),
    }),
    {
      name: "wms-inventory-storage",
    }
  )
);
