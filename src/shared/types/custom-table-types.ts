import type { ReactNode } from "react";

export type Column<T> = {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode)
};