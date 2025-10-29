import { toaster } from "@/components/ui/toaster";
import { fetchLocations } from "@/services/api";
import { useInventoryStore } from "@/store/inventoryStore";
import type { Location as LocationType } from "@/types";
import { Button, Field, Input, NativeSelect, Stack } from "@chakra-ui/react";
import { format, isAfter, parseISO, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AddInboundForm() {
  const navigate = useNavigate();
  const { addItem } = useInventoryStore();
  const [locations, setLocations] = useState<LocationType[]>([]);

  const [form, setForm] = useState({
    sku: "",
    name: "",
    batch: "",
    expiry: "",
    qty: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.sku) errs.sku = "SKU wajib diisi";
    if (!form.name) errs.name = "Nama wajib diisi";
    if (!form.batch) errs.batch = "Batch wajib diisi";
    if (!form.expiry) errs.expiry = "Expiry wajib diisi";
    else if (isAfter(startOfDay(new Date()), parseISO(form.expiry))) errs.expiry = "Expiry harus ≥ hari ini";
    if (!form.qty || +form.qty <= 0) errs.qty = "Quantity harus > 0";
    if (!form.location) errs.location = "Location wajib dipilih";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addItem({
      sku: form.sku,
      name: form.name,
      batch: form.batch,
      expiry: form.expiry,
      qty: +form.qty,
      location: form.location,
    });

    toaster.create({
      description: "Inbound data berhasil ditambahkan",
      type: "success",
      closable: true,
    });

    navigate("/inventory");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Stack gap="8" css={{ "--field-label-width": "128px" }}>
        <Field.Root invalid={!!errors.sku} mb={3} orientation="horizontal">
          <Field.Label>SKU</Field.Label>
          <Input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          {errors.sku && <Field.ErrorText>{errors.sku}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.name} mb={3} orientation="horizontal">
          <Field.Label>Nama Barang</Field.Label>
          <Input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.batch} mb={3} orientation="horizontal">
          <Field.Label>Batch Number</Field.Label>
          <Input type="text" value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} />
          {errors.batch && <Field.ErrorText>{errors.batch}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.expiry} mb={3} orientation="horizontal">
          <Field.Label>Expiry Date</Field.Label>
          <Input
            type="date"
            min={format(new Date(), "yyyy-MM-dd")}
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
          />
          {errors.expiry && <Field.ErrorText>{errors.expiry}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.qty} mb={3} orientation="horizontal">
          <Field.Label>Quantity</Field.Label>
          <Input type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
          {errors.qty && <Field.ErrorText>{errors.qty}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.location} mb={3} orientation="horizontal">
          <Field.Label>Location</Field.Label>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              placeholder="Pilih Lokasi"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {errors.location && <Field.ErrorText>{errors.location}</Field.ErrorText>}
        </Field.Root>
      </Stack>

      <Button type="submit" variant="solid" mt={8}>
        Submit
      </Button>
    </form>
  );
}
