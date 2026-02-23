import { type ReactNode } from 'react';
import { type UseFormReturn, type FieldValues, FormProvider } from 'react-hook-form';

type CustomFormProps<T extends FieldValues> = {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    children: ReactNode;
}

export function CustomForm<T extends FieldValues>({ methods, onSubmit, children }: CustomFormProps<T>) {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
};