import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { tasksApi } from "../api/tasks-api"
import type { Tasks } from "../types/tasks-types";
import { notifications } from "@mantine/notifications";
import i18n from "../../../shared/config/i18n";
import { modals } from "@mantine/modals";

export const useFetchTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: tasksApi.getAll,
        staleTime: 60_000,
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
                message: i18n.t("main.success-create"),
                color: "green",
            });
            modals.closeAll();
        },

        onError: (error: any) => {
            notifications.show({
                title: i18n.t("main.error"),
                message: error?.message || i18n.t("main.error-create"),
                color: "red",
            });
        },
    });
};


export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => tasksApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });

            notifications.show({
                title: i18n.t("main.success"),
                message: i18n.t("main.success-delete"),
                color: "green",
            });
        },

        onError: (error: any) => {
            notifications.show({
                title: i18n.t("main.error"),
                message: error?.message || i18n.t("main.error-delete"),
                color: "red",
            });
        },
    })
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: number, body: Partial<Tasks> }) => tasksApi.update(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });

            notifications.show({
                title: i18n.t("main.success"),
                message: i18n.t("main.success-update"),
                color: "green",
            });
            modals.closeAll();
        },

        onError: (error: any) => {
            notifications.show({
                title: i18n.t("main.error"),
                message: error?.message || i18n.t("main.error-update"),
                color: "red",
            });
        },
    })
}