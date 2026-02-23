import { Skeleton } from "@mantine/core";

type CustomSceletonProps = {
    type: 'table' | 'form' | 'card';
};

export const CustomSceleton = ({ type }: CustomSceletonProps) => {
    if (type === 'table') {
        return (
            <>
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} h={40} mb="sm" radius="md" animate color="gray" />
                ))}
            </>
        )
    }
    return <Skeleton h={300} radius="xl" animate color="gray"/>;
};