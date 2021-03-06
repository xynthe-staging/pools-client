import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { Pool } from '@tracer-protocol/pools-js';

export default ((pool) => {
    const valueTransfer = useMemo(() => pool.getNextValueTransfer(), [pool]);
    return useMemo(
        () => ({
            nextLongBalance: pool.longBalance.plus(valueTransfer.longValueTransfer),
            nextShortBalance: pool.shortBalance.plus(valueTransfer.shortValueTransfer),
        }),
        [pool.longBalance, valueTransfer.longValueTransfer, pool.shortBalance, valueTransfer.shortValueTransfer],
    );
}) as (pool: Pool) => {
    nextLongBalance: BigNumber;
    nextShortBalance: BigNumber;
};
