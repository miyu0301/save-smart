import Link from "next/link";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import PriceRecordListItem from "@/components/PriceRecordListItem";

const onDelete = async (id: string) => {
  "use server";
  await prisma.priceRecord.delete({ where: { id } });
  revalidatePath("/price-records");
};

type PriceRecordListProps = {
  priceRecords: any[];
  categoryNames: { [key: string]: string };
  shopNames: { [key: string]: string };
};

const PriceRecordList = ({
  priceRecords,
  categoryNames,
  shopNames,
}: PriceRecordListProps) => {
  return (
    <div>
      {priceRecords.map((priceRecord, key) => (
        <PriceRecordListItem
          itemKey={key}
          {...priceRecord}
          categoryNames={categoryNames}
          shopNames={shopNames}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PriceRecordList;
