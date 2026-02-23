import { useTranslation } from "react-i18next";
import { useFetchTasks } from "../queries/tasks-queries";
import type { Column } from "../../../shared/types/custom-table-types";
import type { Tasks } from "../types/tasks-types";
import { ActionIcon, Badge, Button, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from 'dayjs';
import { CustomTable } from "../../../shared/ui/custom-table";
import { modals } from '@mantine/modals';
import { CreateTask } from "./create-task";
import { HiArchiveBoxXMark, HiMiniPencilSquare, HiMiniPlus } from "react-icons/hi2";

export const TasksList = () => {

    const { data, isLoading } = useFetchTasks();
    const { t } = useTranslation();

    const columns: Column<Tasks>[] = [
        {
            header: '№ ID',
            accessor: 'id'
        },
        {
            header: t('table.title'),
            accessor: 'title'
        },
        {
            header: t('table.desc'),
            accessor: 'description'
        },

        {
            header: t('table.status'),
            accessor: (item) => (
                <Badge color={item.status === 'done' ? 'green' : 'blue'}>
                    {item.status === 'done' && t(`statuses.done`)}
                    {item.status === 'in_progress' && t(`statuses.in-progress`)}
                    {item.status === 'new' && t(`statuses.new`)}
                </Badge>
            )
        },
        {
            header: t('table.priority'),
            accessor: (item) => (
                <Text size="sm">{t(`priorities.${item.priority}`)}</Text>
            )
        },
        {
            header: t('table.deadline'),
            accessor: (item) => dayjs(item.deadline).format('DD.MM.YYYY')
        },
        {
            header: '',
            accessor: () => (
                <Group>
                    <ActionIcon variant="outline">
                        <HiMiniPencilSquare />
                    </ActionIcon>
                    <ActionIcon variant="outline" bg={'red'} color="#fff">
                        <HiArchiveBoxXMark />
                    </ActionIcon>
                </Group>
            )
        }
    ]

    return (
        <div className="container">
            <Stack gap="md">
                <Group justify="space-between">
                    <Title order={2}>{t('main.tasks')}</Title>
                    <Button onClick={() => {
                        modals.open({
                            title: `${t('form.create')}`,
                            children: <CreateTask />
                        })
                    }}
                        variant="outline"
                        leftSection={<HiMiniPlus />}
                    >{t('form.create')}</Button>
                </Group>

                <CustomTable
                    data={data}
                    columns={columns}
                    loading={isLoading}
                />
            </Stack>
        </div>
    )
};