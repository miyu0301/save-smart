'use server';
import prisma from "@/db";
import { revalidatePath } from "next/cache";

export const deletePriceRecord = async (id: string) => {
  await prisma.priceRecord.delete({ where: { id } });
  // revalidatePath("/price-records");
};
