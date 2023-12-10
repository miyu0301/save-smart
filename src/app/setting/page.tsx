import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const page = () => {
  return (
    <Layout pageTitle="Setting">
      <div className="">
        setting page
        <Link href="/setting/category" className="">
          Category
        </Link>
        <Link href="/setting/shop-name" className="">
          Shop Name
        </Link>
      </div>
    </Layout>
  );
};

export default page;
