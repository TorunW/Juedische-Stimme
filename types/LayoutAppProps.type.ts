import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';

export type LayoutAppProps<P = any> = AppProps & {
    Component: NextComponentType<NextPageContext, any, P> & { layout: string}
}