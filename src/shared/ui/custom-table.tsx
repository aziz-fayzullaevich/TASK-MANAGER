import { Center, ScrollArea, Table, Text } from "@mantine/core";
import type { Column } from "../types/custom-table-types";
import type { ReactNode } from "react";
import { CustomLoader } from "./custom-loader";
import { useTranslation } from "react-i18next";

type CustomTableProps<T> = {
    data: T[] | null | undefined;
    columns: Column<T>[];
    loading?: boolean;
}

export function CustomTable<T>({ data, columns, loading }: CustomTableProps<T>) {
    const { t } = useTranslation();
    if (loading) return <CustomLoader />

    if (!data || data.length === 0) return (
        <Center>
            <Text>{t('main.empty')}</Text>
        </Center>
    )

    return (
        <ScrollArea>
            <Table striped highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        {columns.map((col, index) => (
                            <Table.Th key={index}>{col.header}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((item, rowIndex) => (
                        <Table.Tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <Table.Td key={colIndex}>
                                    {typeof col.accessor === 'function'
                                        ? col.accessor(item)
                                        : (item[col.accessor] as ReactNode)}
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </ScrollArea>)
};