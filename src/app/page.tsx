import { ethToUsd } from "@/utils/conversion";
import { getTransferCost } from "@/utils/transfer";

export default async function Home() {
  const gasUsedInTransfer = await getTransferCost();
  const gasUsedInTransferInUsd = await ethToUsd(+await getTransferCost());

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl">Fuel Ignition Fees Live</h1>

        <h3>Cost for a transfer: ${gasUsedInTransferInUsd} ({gasUsedInTransfer.toString()} ETH)</h3>
      </main>
    </div>
  );
}
