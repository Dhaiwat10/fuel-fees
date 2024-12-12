import { formatUnits, Provider, Wallet } from "fuels";

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


  const { maxFee } = await sendingWallet.getTransactionCost(transferTx);

  const gasUsedInNum = formatUnits(maxFee);

  return gasUsedInNum;
};
