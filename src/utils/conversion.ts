export const getEthUsdPrice = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", { 
        next: {
            revalidate: 86400
        }
    });
    const data = await response.json();
    return data.ethereum.usd as number;
}

export const ethToUsd = async (ethValue: number) => {
    const ethUsdPrice = await getEthUsdPrice();
    return ethValue * ethUsdPrice;
}

export const howMuchCheaperComparedToTopEVMRollups = (fuelFee: number) => {
    const topRollupsAvgFee = 0.005; // USD
    // Calculate how much cheaper Fuel is:
    // ( (topRollupsAvgFee - fuelFee) / topRollupsAvgFee ) * 100%
    
    const cheaperPercentage = ((topRollupsAvgFee - fuelFee) / topRollupsAvgFee) * 100;
    return cheaperPercentage.toFixed(0); // e.g., "90"
  };
  