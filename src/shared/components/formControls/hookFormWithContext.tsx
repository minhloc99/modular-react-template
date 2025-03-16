import { useId } from "react";
import { FormProvider } from "react-hook-form";

export function HookFormProviderWithContext({ methods, onSave, formId, children }
  : {
    methods: any,
    onSave?: any,
    formId?: string,
    children: any
  }) {
  const id = useId();

  return <FormProvider {...methods}>
    <form
      id={formId || id}
      onSubmit={(e: any) => onSave && methods.handleSubmit(onSave)(e)}    >
      {children}
    </form>
  </FormProvider>
}