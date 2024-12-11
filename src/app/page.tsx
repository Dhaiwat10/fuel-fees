import { ethToUsd } from "@/utils/conversion";
import { getTransferCost } from "@/utils/transfer";
import Image from "next/image";

export default async function Home() {
  const gasUsedInTransfer = await getTransferCost();
  const gasUsedInTransferInUsd = await ethToUsd(+(await getTransferCost()));

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <Image src="/fuel_logo.svg" alt="fuel logo" width={100} height={100} />

        <h1 className="text-4xl mt-2">Fuel Ignition Fees Live</h1>

        <span className="mt-8">
          Cost for a transfer
        </span>

        <h3 className="text-5xl font-bold mt-1">${gasUsedInTransferInUsd}</h3>

        <span>{gasUsedInTransfer.toString()} ETH</span>
      </main>
    </div>
  );
}
