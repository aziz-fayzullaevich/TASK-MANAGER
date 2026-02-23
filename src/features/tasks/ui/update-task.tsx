import { Controller, useForm } from "react-hook-form";
import { useUpdateTask } from "../queries/tasks-queries";
import type { Tasks } from "../types/tasks-types";
import { Button, Select, Stack, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const UpdateTask = ({ task }: { task: Tasks }) => {
    const { t } = useTranslation();

    const { mutate: updateTask, isPending } = useUpdateTask();

    const { register, handleSubmit, control, formState: { errors } } = useForm<Partial<Tasks>>({
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
                <TextInput
                    label={t('table.title')}
                    error={errors.title?.message}
                    {...register("title", { required: "Title is required" })}
                />

                <TextInput
                    label={t('table.desc')}
                    error={errors.description?.message}
                    {...register("description")}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={t('table.status')}
                            data={[
                                { value: "new", label: `${t('statuses.new')}` },
                                { value: "in_progress", label: `${t('statuses.in-progress')}` },
                                { value: "done", label: `${t('statuses.done')}` },
                            ]}
                        />
                    )}
                />

                <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={t('table.priority')}
                            data={[
                                { value: "low", label: `${t('priorities.low')}` },
                                { value: "medium", label: `${t('priorities.medium')}` },
                                { value: "high", label: `${t('priorities.high')}` },
                            ]}
                        />
                    )}
                />

                <TextInput
                    label={t('table.deadline')}
                    type="date"
                    error={errors.deadline?.message}
                    {...register("deadline")}
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
        </form>
    )
}