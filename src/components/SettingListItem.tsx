"use client";
import Link from "next/link";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { useState } from "react";

type CategoryItemProps = {
  key: number;
  id: string;
  itemName: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
};

const SettingListItem = ({
  key,
  id,
  itemName,
  onDelete,
  onEdit,
}: CategoryItemProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const updateSettingName = async (formData: FormData) => {
    const name = formData.get("name")?.valueOf();
    if (typeof name !== "string" || name.length === 0) {
      throw new Error();
    }
    onEdit(id, name);
    setIsEditable(false);
  };

  return (
    <div key={key}>
      <form action={updateSettingName}>
        {isEditable ? (
          <input className="" name="name" defaultValue={itemName} />
        ) : (
          <p className="">{itemName}</p>
        )}
        <div className="">
          {isEditable ? (
            <div>
              <button
                type="button"
                onClick={() => setIsEditable(false)}
                className=""
              >
                Cancel
              </button>
              <button type="submit" className="">
                Save
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={() => setIsEditable(true)}
                className=""
              >
                Edit
              </button>
              <button type="button" onClick={() => onDelete(id)} className="">
                Delete
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SettingListItem;
