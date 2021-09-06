import React from 'react';
import { useTransactionState } from '@context/TransactionContext';
import Icon from '@ant-design/icons';
// @ts-ignore
import TracerLoading from 'public/img/logos/tracer/tracer_loading.svg';

import { useState, useEffect } from 'react';
import { usePools } from '@context/PoolContext';
import { toApproxCurrency } from '@libs/utils';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';

// This is to dispaly the quoteToken balance in the top right of the screen
// It is expected that not every pool will have the same quoteToken so this
// 	feature will likely be removed or updated in the future
const useBalance = () => {
    const { pools } = usePools();
    const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));

    useEffect(() => {
        if (pools && Object.keys(pools).length) {
            // it doesnt matter which pool we use
            // since they should all have the same quote token
            setBalance(Object.values(pools)[0].quoteToken.balance);
        }
    }, [pools]);
    return balance;
};

export default styled(({ className }) => {
    const { pendingCount = 0 } = useTransactionState();
    const balance = useBalance();
    return (
        <div className={className}>
            {pendingCount > 0 ? (
                <span>
                    <StyledIcon component={TracerLoading} />
                    {`${pendingCount} Pending`}
                </span>
            ) : (
                `${toApproxCurrency(balance)} USDC`
            )}
        </div>
    );
})`
    margin-left: auto 0 auto 0.5rem;
`;

const StyledIcon = styled(Icon)`
    color: #fff;
    svg {
        width: 28px;
    }
    vertical-align: 0;
    margin-right: 0.3rem;
`;
