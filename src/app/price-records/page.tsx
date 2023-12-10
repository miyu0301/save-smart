"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import prisma from "@/db";
import PriceRecordList from "@/components/PriceRecordList";

const page = () => {
  const [categoryNames, setCategories] = useState<{ [key: number]: string }>(
    {}
  );
  const [shopNames, setShops] = useState<{ [key: number]: string }>({});
  const [allPriceRecords, setAllPriceRecords] = useState<any[]>([]);
  const [displayPriceRecords, setDisplayPriceRecords] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("0");
  const [selectedShopId, setSelectedShopId] = useState("0");
  const [selectedOrder, setSelectedOrder] = useState("0");

  useEffect(() => {
    const fetchDisplayDatas = async () => {
      const fetchCategoriesResponse = await fetch("/api/data?type=categories");
      const categories = await fetchCategoriesResponse.json();
      setCategories(categories);

      const fetchShopsResponse = await fetch("/api/data?type=shops");
      const shops = await fetchShopsResponse.json();
      setShops(shops);

      const fetchRecordResponse = await fetch("/api/data?type=priceRecords");
      const priceRecords = await fetchRecordResponse.json();
      setAllPriceRecords(priceRecords);
      setDisplayPriceRecords(priceRecords);
    };
    fetchDisplayDatas();
  }, []);

  const applyFilter = () => {
    const isFilteringCategory = selectedCategoryId !== "0";
    const isFilteringShop = selectedShopId !== "0";

    const filteredRecords = allPriceRecords.filter((record) => {
      const filterByCategory = isFilteringCategory
        ? record.categoryId === selectedCategoryId
        : true;
      const filterByShop = isFilteringShop
        ? record.shopId === selectedShopId
        : true;
      return filterByCategory && filterByShop;
    });

    if (selectedOrder === "1") {
      filteredRecords.sort((a, b) => a.price - b.price);
    } else if (selectedOrder === "2") {
      filteredRecords.sort((a, b) => b.price - a.price);
    } else if (selectedOrder === "3") {
      filteredRecords.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else if (selectedOrder === "4") {
      filteredRecords.sort((a, b) => b.itemName.localeCompare(a.itemName));
    }
    setDisplayPriceRecords(filteredRecords);
  };

  return (
    <Layout pageTitle="Price Records">
      <form action={applyFilter} className="">
        <label htmlFor="category">category</label>
        <select
          name="category"
          id="category"
          className=""
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="0">All</option>
          {Object.entries(categoryNames).map(([id, category]) => (
            <option key={id} value={id}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="shop-name">shop name</label>
        <select
          name="shop-name"
          id="shop-name"
          className=""
          value={selectedShopId}
          onChange={(e) => setSelectedShopId(e.target.value)}
        >
          <option value="0">All</option>
          {Object.entries(shopNames).map(([id, shopName]) => (
            <option key={id} value={id}>
              {shopName}
            </option>
          ))}
        </select>
        <label htmlFor="order">order</label>
        <select
          name="order"
          id="order"
          className=""
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          <option value="0"></option>
          <option value="1">PRICE ASC</option>
          <option value="2">PRICE DESC</option>
          <option value="3">ITEM NAME ASC</option>
          <option value="4">ITEM NAME DESC</option>
        </select>
        <button type="submit" className="">
          Apply
        </button>
      </form>

      <div className="">
        <Link href="/price-records/add">Add</Link>
      </div>
      <PriceRecordList
        priceRecords={displayPriceRecords}
        categoryNames={categoryNames}
        shopNames={shopNames}
      />
    </Layout>
  );
};

export default page;
