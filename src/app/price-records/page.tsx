// "use client";
import React, { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import prisma from "@/db";
import PriceRecordList from "@/components/PriceRecordList";

const page = async () => {
  // const [displayPriceRecords, setDisplayPriceRecords] = useState<any[]>([]);
  let priceRecords: any[] = [];
  priceRecords = await prisma.priceRecord.findMany();
  console.log(priceRecords);

  let categoryNames: {} = {};
  type categoryTable = {
    id: string;
    categoryName: string;
  };
  const categories: any[] = await prisma.category.findMany({
    where: { deletedAt: null },
  });
  categoryNames = categories.reduce(function (
    acc: { [key: string]: string },
    cur: categoryTable
  ) {
    acc[cur.id] = cur.categoryName;
    return acc;
  },
  {});

  let shopNames: {} = {};
  type shopTable = {
    id: string;
    shopName: string;
  };
  const shops: any[] = await prisma.shop.findMany({
    where: { deletedAt: null },
  });
  shopNames = shops.reduce(function (
    acc: { [key: string]: string },
    cur: shopTable
  ) {
    acc[cur.id] = cur.shopName;
    return acc;
  },
  {});

  return (
    <Layout pageTitle="Price Records">
      {/* <form action={applyCondition} className=""> */}
      <form className="">
        <select name="category" id="category" className="">
          {categories.map((category, key) => (
            <option key={key} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <label htmlFor="shop-name">shop name</label>
        <select name="shop-name" id="shop-name" className="">
          {shops.map((shop, key) => (
            <option key={key} value={shop.id}>
              {shop.shopName}
            </option>
          ))}
        </select>
        <select name="price-order" id="price-order" className="">
          <option value="0">asc</option>
          <option value="1">desc</option>
        </select>
        <button type="submit" className="">
          Apply
        </button>
      </form>

      <div className="">
        tracker page
        <Link href="/price-records/add">Add</Link>
      </div>
      <PriceRecordList
        priceRecords={priceRecords}
        categoryNames={categoryNames}
        shopNames={shopNames}
      />
    </Layout>
  );
};

export default page;
