import { supabase } from "../../../shared/api/supabase-client";
import type { TaskParams, Tasks } from "../types/tasks-types";

export const tasksApi = {
    // getAll: async (params: TaskParams) => {
    //     let query = supabase.from("tasks").select("*", { count: "exact" });

    //     if (params.q) {
    //         query = query.ilike("title", `%${params.q}%`);
    //     }

    //     if (params.status) {
    //         query = query.eq("status", params.status);
    //     }

    //     if (params.priority) {
    //         query = query.eq("priority", params.priority);
    //     }

    //     if (params._sort) {
    //         query = query.order(params._sort, {
    //             ascending: params._order !== "desc",
    //         });
    //     }

    //     if (params._page && params._limit) {
    //         const from = (params._page - 1) * params._limit;
    //         const to = from + params._limit - 1;
    //         query = query.range(from, to);
    //     }

    //     const { data, error } = await query;

    //     if (error) throw error;

    //     return data as Tasks[];
    // },

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

    update: async (id: string, updates: Partial<Tasks>) => {
        const { data, error } = await supabase
            .from("tasks")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return data as Tasks;
    },

    delete: async (id: string) => {
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return true;
    },
};