import {
  ethToUsd,
  howMuchCheaperComparedToTopEVMRollups,
} from "@/utils/conversion";
import { getTransferCost } from "@/utils/transfer";
import Image from "next/image";

export default async function Home() {
  const gasUsedInTransfer = await getTransferCost();
  const gasUsedInTransferInUsd = await ethToUsd(+(await getTransferCost()));

  return (
    <main className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
      <a href="https://fuel.network/" target="_blank" rel="noreferrer">
        <Image src="/fuel_logo.svg" alt="fuel logo" width={100} height={100} />
      </a>
      {/* <h1 className="text-4xl mt-2">Fuel Ignition Fees Live</h1> */}
      <span className="mt-12">
        Current avg. cost for one transfer on Fuel Ignition
      </span>{" "}
      {/* <span className="text-red-500">🔴 Live</span>  */}
      <h3 className="text-3xl md:text-5xl font-bold mt-2 text-center">
        ${gasUsedInTransferInUsd}
      </h3>
      <span className="mt-2">{gasUsedInTransfer.toString()} ETH</span>
      <a
        href="https://www.growthepie.xyz/fundamentals/transaction-costs"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4 text-slate-400 decoration-slate-500 decoration-1 hover:decoration-white hover:text-white transition-all"
      >
        <p className="mt-4">
          <b>
            {howMuchCheaperComparedToTopEVMRollups(gasUsedInTransferInUsd)}{" "}
            times
          </b>{" "}
          cheaper on avg. compared to top EVM rollups
        </p>
      </a>
      <a href="https://fuel.network/" target="_blank" rel="noreferrer">
        <button className="bg-[#00F58C] text-black py-2 px-4 rounded-md hover:bg-[#00F58C]/80 transition-all mt-12 text-xl">
          Explore Fuel
        </button>
      </a>
    </main>
  );
}
