"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateCharge } from "./actions";

type EditChargeFormProps = {
  id: string;
  concept: string;
  amount: number;
  paid: boolean;
  dueDate: string;
};

export default function EditChargeForm({
  id,
  concept,
  amount,
  paid,
  dueDate,
}: EditChargeFormProps) {
  const router = useRouter();
const [isPaid, setIsPaid] = useState(paid);
const [isSaving, setIsSaving] = useState(false);
const [hasChanges, setHasChanges] = useState(false);
  async function handleSubmit(formData: FormData) {
  const concept = formData.get("concept");
  const amount = formData.get("amount");

  if (!concept || !amount) {
    alert("Completa descripción y monto");
    return;
  }

  setIsSaving(true);

  await updateCharge(id, formData);

setHasChanges(false);
router.push("/charges");
router.refresh();
}
  

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="concept">Descripción</label>
       <input
  id="concept"
  name="concept"
  type="text"
  defaultValue={concept}
  onChange={() => setHasChanges(true)}
  style={{ width: "300px", padding: "6px" }}
/>
      </div>

      <div>
        <label htmlFor="amount">Monto</label>
        <input
  id="amount"
  name="amount"
  type="number"
  defaultValue={amount}
  onChange={() => setHasChanges(true)}
  style={{ width: "150px", padding: "6px" }}
/>
      </div>
<label
  htmlFor="paid"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  }}
>
  <span style={{ fontSize: "14px" }}>Pagado</span>

  <div
    style={{
      position: "relative",
      width: "42px",
      height: "22px",
    }}
  >
    <input
      id="paid"
      name="paid"
      type="checkbox"
      checked={isPaid}
      onChange={() => {
  setIsPaid(!isPaid);
  setHasChanges(true);
}}
      style={{
        opacity: 0,
        width: 0,
        height: 0,
        position: "absolute",
      }}
    />

    <span
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isPaid ? "#22c55e" : "#d1d5db",
        borderRadius: "999px",
        transition: "all 0.25s ease",
        boxShadow: isPaid
          ? "0 0 6px rgba(34,197,94,0.6)"
          : "inset 0 0 4px rgba(0,0,0,0.2)",
      }}
    ></span>

    <span
      style={{
        position: "absolute",
        height: "18px",
        width: "18px",
        left: isPaid ? "21px" : "2px",
        bottom: "2px",
        backgroundColor: "white",
        borderRadius: "50%",
        transition: "all 0.25s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    ></span>
  </div>
</label>
<div>
  <label htmlFor="dueDate">Vencimiento</label>
  <input
    id="dueDate"
    name="dueDate"
    type="date"
    defaultValue={dueDate}
  />
</div>
      <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
  <button type="submit" disabled={isSaving}>
    {isSaving ? "Guardando..." : "Guardar cambios"}
  </button>

  <button
    type="button"
    onClick={() => {
  if (hasChanges && !confirm("Tienes cambios sin guardar. ¿Salir igual?")) {
    return;
  }
  router.push("/charges");
}}
  >
    Cancelar
  </button>
</div>
    </form>
  );
}