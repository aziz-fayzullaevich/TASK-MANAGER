import { Controller, useForm } from "react-hook-form";
import { useUpdateTask } from "../queries/tasks-queries";
import type { Tasks } from "../types/tasks-types";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { CustomForm } from "../../../shared/ui/custom-form";

export const UpdateTask = ({ task }: { task: Tasks }) => {
    const { t } = useTranslation();

    const { mutate: updateTask, isPending } = useUpdateTask();

    const form = useForm<Partial<Tasks>>({
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
        },
    });

    const onSubmit = (values: Partial<Tasks>) => {
        updateTask({ id: +task.id, body: values });
    };

    return (
        <CustomForm methods={form} onSubmit={(onSubmit)}>
            <Stack gap="md">
                <TextInput
                    label={t('table.title')}
                    {...form.register("title", { required: t('form.required-filed') })}
                    error={form.formState.errors.title?.message}
                />

                <TextInput
                    label={t('table.desc')}
                    {...form.register("description", { required: t('form.required-filed') })}
                    error={form.formState.errors.description?.message}
                />

                <Controller
                    name="status"
                    control={form.control}
                    rules={{ required: t('form.required-filed') }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={t('table.status')}
                            data={[
                                { value: "new", label: `${t('statuses.new')}` },
                                { value: "in_progress", label: `${t('statuses.in-progress')}` },
                                { value: "done", label: `${t('statuses.done')}` },
                            ]}
                            error={form.formState.errors.status?.message}
                        />
                    )}
                />

                <Controller
                    name="priority"
                    control={form.control}
                    rules={{ required: t('form.required-filed') }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={t('table.priority')}
                            data={[
                                { value: "low", label: `${t('priorities.low')}` },
                                { value: "medium", label: `${t('priorities.medium')}` },
                                { value: "high", label: `${t('priorities.high')}` },
                            ]}
                            error={form.formState.errors.priority?.message}
                        />
                    )}
                />

                <TextInput
                    label={t('table.deadline')}
                    type="date"
                    {...form.register("deadline", { required: t('form.required-filed') })}
                    error={form.formState.errors.deadline?.message}
                />

                <Button
                    type="submit"
                    loading={isPending}
                    fullWidth
                    mt="md"
                >
                    {t('form.update')}
                </Button>
            </Stack>
        </CustomForm>
    )
}