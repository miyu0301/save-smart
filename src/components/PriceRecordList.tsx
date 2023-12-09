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
  // let categoryNames: {} = {};
  // type categoryTable = {
  //   id: string;
  //   categoryName: string;
  // };
  // const categories: any[] = await prisma.category.findMany({
  //   where: { deletedAt: null },
  // });
  // categoryNames = categories.reduce(function (
  //   acc: { [key: string]: string },
  //   cur: categoryTable
  // ) {
  //   acc[cur.id] = cur.categoryName;
  //   return acc;
  // },
  // {});

  // let shopNames: {} = {};
  // type shopTable = {
  //   id: string;
  //   shopName: string;
  // };
  // const shops: any[] = await prisma.shop.findMany({
  //   where: { deletedAt: null },
  // });
  // shopNames = shops.reduce(function (
  //   acc: { [key: string]: string },
  //   cur: shopTable
  // ) {
  //   acc[cur.id] = cur.shopName;
  //   return acc;
  // },
  // {});

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
