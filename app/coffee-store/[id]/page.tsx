import React from "react";
import Link from "next/link";
import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores";
import Image from "next/image";
import type { CoffeeStoreType, ServerParamsType } from "@/types";
import { createCoffeeStore } from "@/lib/airtable";
import Upvote from "@/components/upvote.client";
import { getDomain } from "@/utils";
import { Metadata } from "next";

async function getData(id: string, longLat: string, limit: number) {
  const coffeeStoreFromMapbox = await fetchCoffeeStore(id, longLat, limit);
  if (!coffeeStoreFromMapbox) return null;
  const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromMapbox, id);
  const voting = _createCoffeeStore ? _createCoffeeStore[0].voting : 0;
  return {
    ...coffeeStoreFromMapbox,
    voting,
  };
}

export async function generateStaticParams() {
  const TORONTO_LONG_LAT = "-79.3832%2C43.6532";
  const coffeeStores = await fetchCoffeeStores(TORONTO_LONG_LAT, 6);

  return coffeeStores.map((coffeeStore: CoffeeStoreType) => ({
    id: coffeeStore.mapbox_id,
  }));
}

async function getStoreParams({ params, searchParams }: ServerParamsType) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const longLat = sp.longLat || "-79.3832%2C43.6532";
  const limit = parseInt(sp.limit || "6");
  return {
    id,
    longLat,
    limit,
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: ServerParamsType) {
  const { id, longLat, limit } = await getStoreParams({ params, searchParams });
  const coffeeStoreFromMapbox = await fetchCoffeeStore(id, longLat, limit);
  const { name = "Coffee Store" } = coffeeStoreFromMapbox || {};

  return {
    title: name,
    description: `${name} - Coffee Store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${id}`,
    },
  };
}

export default async function Page({ params, searchParams }: ServerParamsType) {
  const { id, longLat, limit } = await getStoreParams({ params, searchParams });
  const coffeeStore = await getData(id, longLat, limit);

  if (!coffeeStore) {
    return (
      <div className="text-white text-center py-20">
        <h1 className="text-3xl font-bold">Store not found</h1>
        <p className="mt-4">Could not find a coffee store with that ID.</p>
        <Link href="/" className="text-blue-400 underline mt-6 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const { name = "", address = "", imgUrl = "", voting } = coffeeStore;

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h2 className="text-4xl font-bold text-white">{name}</h2>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <p className="pl-2">{address}</p>
            </div>
          )}
          <Upvote voting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
