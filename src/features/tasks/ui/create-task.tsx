import { Button, Select, Stack, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { CustomForm } from "../../../shared/ui/custom-form";
import { useCreateTask } from "../queries/tasks-queries";
import type { Tasks } from "../types/tasks-types";
import { useTranslation } from "react-i18next";
import { modals } from "@mantine/modals";

type CreateTaskForm = Omit<Tasks, "id">;

export const CreateTask = () => {
  const form = useForm<CreateTaskForm>({
    defaultValues: {
      title: "",
      description: "",
      status: "new",
      priority: "low",
      deadline: "",
    },
  });

  const { mutate, isPending } = useCreateTask();
  const { t } = useTranslation();

  const onSubmit = (data: CreateTaskForm) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        modals.closeAll();
      }
    });
  };

  return (
    <CustomForm methods={form} onSubmit={onSubmit}>
      <Stack>
        <TextInput
          label={t('table.title')}
          {...form.register("title", { required: true })}
        />

        <TextInput
          label={t('table.desc')}
          {...form.register("description")}
        />

        <Controller
          name='status'
          control={form.control}
          render={({ field }) => (
            <Select
              label={t('table.status')}
              data={[
                { value: "new", label: `${t('statuses.new')}` },
                { value: "in_progress", label: `${t('statuses.in-progress')}` },
                { value: "done", label: `${t('statuses.done')}` },
              ]}
              {...field}
              error={form.formState.errors.status?.message}
            />
          )}
        >
        </Controller>

        <Controller
          name='priority'
          control={form.control}
          render={({ field }) => (
            <Select
              label={t('table.priority')}
              data={[
                { value: "low", label: `${t('priorities.low')}` },
                { value: "medium", label: `${t('priorities.medium')}` },
                { value: "high", label: `${t('priorities.high')}` },
              ]}
              {...field}
              error={form.formState.errors.status?.message}
            />
          )}
        >
        </Controller>

        <TextInput
          label={t('table.deadline')}
          type="date"
          {...form.register("deadline")}
        />

        <Button type="submit" loading={isPending} variant="filled">
          {t('form.create')}
        </Button>
      </Stack>
    </CustomForm>
  );
};