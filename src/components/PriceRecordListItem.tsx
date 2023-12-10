"use client";
import Link from "next/link";
// import { deletePriceRecord } from "./deletePriceRecord";

type PriceRecordItemProps = {
  itemKey: number;
  id: string;
  image: string;
  itemName: string;
  price: number;
  unit: string;
  memo: string;
  categoryId: string;
  shopId: string;
  categoryNames: { [key: string]: string };
  shopNames: { [key: string]: string };
  deletePriceRecord: (id: string) => Promise<void>;
};

const PriceRecordListItem = ({
  itemKey,
  id,
  image,
  itemName,
  price,
  unit,
  memo,
  categoryId,
  shopId,
  categoryNames,
  shopNames,
  deletePriceRecord,
}: PriceRecordItemProps) => {
  return (
    <div key={itemKey} className="">
      <img src={image} />
      <p className="">{itemName}</p>
      <p className="">{price}</p>
      <p className="">{unit}</p>
      <p className="">{memo}</p>
      <p className="">{categoryId ? categoryNames[categoryId] : ""}</p>
      <p className="">{shopId ? shopNames[shopId] : ""}</p>
      <Link href={`/price-records/edit/${id}`}>Edit</Link>
      <button type="button" onClick={() => deletePriceRecord(id)} className="">
        Delete
      </button>
    </div>
  );
};

export default PriceRecordListItem;
