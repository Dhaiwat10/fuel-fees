import { formatUnits, Provider, Wallet } from "fuels";
import { MiraAmm } from "mira-dex-ts";

export const getSwapCost = async () => {
  const privateKey = process.env.WALLET_PVT_KEY as string;

  const provider = await Provider.create(
    "https://mainnet.fuel.network/v1/graphql"
  );

  const sendingWallet = Wallet.fromPrivateKey(privateKey, provider);

  const miraAmm = new MiraAmm(sendingWallet);

  const swapTx = await miraAmm.swapExactInput(
    1000,
    {
      bits: provider.getBaseAssetId(),
    },
    0,
    [
      [
        {
          bits: provider.getBaseAssetId(),
        },
        {
          bits: "0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b",
        },
        false,
      ],
    ],
    // 7 days from now in milliseconds
    Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  );

  const { maxFee } = await sendingWallet.getTransactionCost(swapTx);

  const gasUsedInNum = formatUnits(maxFee);

  return gasUsedInNum;
};
