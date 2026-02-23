import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { tasksApi } from "../api/tasks-api"
import type { Tasks } from "../types/tasks-types";
import { notifications } from "@mantine/notifications";
import i18n from "../../../shared/config/i18n";

export const useFetchTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: tasksApi.getAll,
        placeholderData: keepPreviousData
    })
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Tasks, "id">) =>
            tasksApi.create(data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });

            notifications.show({
                title: i18n.t("main.success"),
                message: i18n.t("main.success-update"),
                color: "green",
            });
        },

        onError: (error: any) => {
            notifications.show({
                title: i18n.t("main.error"),
                message: error?.message || i18n.t("main.error-update"),
                color: "red",
            });
        },
    });
};