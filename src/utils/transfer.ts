import { formatUnits, Provider, ReceiptScriptResult, Wallet } from "fuels";

export const getTransferCost = async () => {
  const privateKey = process.env.WALLET_PVT_KEY as string;

  const provider = await Provider.create(
    "https://mainnet.fuel.network/v1/graphql"
  );

  const sendingWallet = Wallet.fromPrivateKey(privateKey, provider);

  const receivingWallet = Wallet.generate({
    provider,
  });

  const transferTx = await sendingWallet.createTransfer(
    receivingWallet.address,
    100
  );

  const { receipts } = await sendingWallet.simulateTransaction(transferTx);

  const { gasUsed } = receipts.find((r) => r.type === 9) as ReceiptScriptResult;

  const gasUsedInNum = formatUnits(gasUsed);

  return gasUsedInNum;
};
