import React from "react";
import Layout from "@/components/Layout";
import prisma from "@/db";
import CategoryListItem from "@/components/SettingListItem";
import { revalidatePath } from "next/cache";

const saveShopName = async (formData: FormData) => {
  "use server";
  const name = formData.get("name")?.valueOf();

  if (typeof name !== "string" || name.length === 0) {
    throw new Error();
  }
  const res = await prisma.shop.create({
    data: {
      shopName: name,
    },
  });
  revalidatePath("/setting/shop-name");
};
const onDelete = async (id: string) => {
  "use server";
  await prisma.shop.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  revalidatePath("/setting/shop-name");
};
const onEdit = async (id: string, name: string) => {
  "use server";
  await prisma.shop.update({
    where: {
      id: id,
    },
    data: {
      shopName: name,
    },
  });
  revalidatePath("/setting/shop-name");
};

const page = async () => {
  let shops: any[] = [];
  try {
    shops = await prisma.shop.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    console.log("errr", error);
  }

  return (
    <Layout pageTitle="Setting Category">
      <div className="">
        <form action={saveShopName} className="">
          <label htmlFor="name">Shop Name</label>
          <input type="text" name="name" required />
          <button type="submit" className="">
            Save
          </button>
        </form>
        <div>
          {shops.map((shop, key) => (
            <CategoryListItem
              key={key}
              id={shop.id}
              itemName={shop.shopName}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default page;
