import { KnownNetwork } from '@tracer-protocol/pools-js';
import { CollateralFilterEnum, LeverageFilterEnum, MarketFilterEnum } from '~/types/filters';
import { DropdownProps } from '../General';

export type CollateralFilterProps = {
    collateralFilter: CollateralFilterEnum;
    onSelect: (val: string) => void;
    network: KnownNetwork | undefined;
};

export type LeverageFilterProps = {
    leverageFilter: LeverageFilterEnum;
    onSelect: (val: string) => void;
    network: KnownNetwork | undefined;
};

export type MarketFilterProps = {
    marketFilter: MarketFilterEnum;
    onMarketSelect: (val: string) => void;
    network: KnownNetwork | undefined;
    size?: DropdownProps['size'];
    className?: string;
};
