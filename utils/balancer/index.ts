import BigNumber from 'bignumber.js';
import { calcBptTokenSpotPrice } from '@tracer-protocol/pools-js';
import { Network } from '@context/Web3Context/Web3Context.Config';

export const getBalancerPrices: (balancerInfo?: Network['balancerInfo']) => Promise<Record<string, BigNumber>> = async (
    balancerInfo,
) => {
    if (!balancerInfo) {
        return {};
    }

    const data = {
        query: `{
                leveragedPools: pools(where: {
                    address_in: ${JSON.stringify(balancerInfo.leveragedPools)}
                }) {
                    id
                    address
                    swapFee
                    tokens {
                        address
                        balance
                        decimals
                        weight
                        symbol
                    }
                },
                nonLeveragedPools: pools(where: {
                    address_in: ${JSON.stringify(balancerInfo.pools)}
                }) {
                    id
                    address
                    swapFee
                    tokens {
                        address
                        balance
                        decimals
                        weight
                        symbol
                    }
                },
                wPool: pools(where: {
                    address: "${balancerInfo.wPool}"
                }) {
                    id
                    address
                    swapFee
                    tokens {
                        address
                        balance
                        decimals
                        weight
                        symbol
                    }
                }

            }`,
    };

    const res = await fetch(balancerInfo.graphUri, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => {
            console.error('Failed to fetch tokens from balancer graph', err);
            return {};
        });
    const tokenPrices: Record<string, BigNumber> = {};
    const getTokenPrices: (
        pools: {
            id: string;
            address: string;
            swapFee: string;
            tokens: {
                address: string;
                balance: string;
                decimals: string;
                weight: string; // decimal
                symbol: string;
            }[];
        }[],
        baseAssets: ('USDC' | 'WETH' | 'WBTC')[],
    ) => void = (pools, baseAssets) => {
        for (const pool of pools) {
            const baseAsset = pool.tokens.filter((token: any) => baseAssets.includes(token.symbol))[0];
            const poolTokens = pool.tokens.filter((token: any) => !baseAssets.includes(token.symbol));
            let baseBalance = new BigNumber(baseAsset.balance);
            if (baseAsset.symbol !== 'USDC') {
                baseBalance = baseBalance.times(tokenPrices[baseAsset.symbol]);
            }
            for (const token of poolTokens) {
                tokenPrices[token.symbol] = calcBptTokenSpotPrice(
                    {
                        balance: baseBalance,
                        weight: new BigNumber(baseAsset.weight),
                    },
                    {
                        balance: new BigNumber(token.balance),
                        weight: new BigNumber(token.weight),
                    },
                    new BigNumber(pool.swapFee),
                );
            }
        }
    };
    getTokenPrices(res.data.wPool, ['USDC']);
    getTokenPrices(res.data.nonLeveragedPools, ['USDC']);
    getTokenPrices(res.data.leveragedPools, ['WETH', 'WBTC']);
    return tokenPrices;
};