import styled from 'styled-components';
import { Theme } from '~/store/ThemeSlice/themes';

export const GuideCard = styled.div<{ roundedTop?: boolean }>`
    padding: 1.5rem 1rem;
    border-top-left-radius: ${({ roundedTop }) => (roundedTop ? 0.75 : 0)}rem;
    border-top-right-radius: ${({ roundedTop }) => (roundedTop ? 0.75 : 0)}rem;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    background-color: ${({ theme }) => {
        switch (theme.theme) {
            case Theme.Light:
                return '#f0f0ff';
            default:
                return '#111928';
        }
    }};
`;

export const GuideCardTitle = styled.div`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
`;

export const Badge = styled.div`
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
    margin-bottom: 0.75rem;
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: min-content;
    border-radius: 0.25rem;
    background-color: #00007a;
`;

export const Link = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer',
})`
    text-decoration: underline;
    color: #3da8f5;
    margin-top: 0.75rem;
    display: block;
`;
