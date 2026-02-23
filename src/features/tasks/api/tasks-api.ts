import { supabase } from "../../../shared/api/supabase-client";
import type { Tasks } from "../types/tasks-types";

export const tasksApi = {
    getAll: async () => {
        const { data, error } = await supabase.from("tasks").select("*");
        if (error) throw error;
        return data;
    },

    getOne: async (id: string) => {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .single();

        if (error) throw error;

        return data as Tasks;
    },

    create: async (task: Omit<Tasks, "id">) => {
        const { data, error } = await supabase
            .from("tasks")
            .insert([task])
            .select()
            .single();

        if (error) throw error;

        return data as Tasks;
    },

    update: async (id: number, body: Partial<Tasks>) => {
        const { data, error } = await supabase
            .from("tasks")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data as Tasks;
    },

    delete: async (id: number) => {
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    },
};