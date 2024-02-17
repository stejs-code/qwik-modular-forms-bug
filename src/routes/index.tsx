import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import type {Input} from "valibot";
import {object, string} from "valibot";
import type {InitialValues} from "@modular-forms/qwik";
import {formAction$, useForm, valiForm$} from "@modular-forms/qwik";
import * as fs from "fs";

export default component$(() => {
    const [, {Form, Field}] = useForm<LoginForm>({
        loader: useFormLoader(),
        action: useFormAction(),
    });

    return (
        <Form>
            <Field name="email" type={"string"}>
                {(field, props) => <input {...props} value={field.value} type="text"/>}
            </Field>
            <Field name="password" type={"string"}>
                {(field, props) => <input {...props} value={field.value} type="password"/>}
            </Field>
            <button type="submit">Login</button>
        </Form>
    );
});

const LoginSchema = object({
    email: string(),
    password: string(),
});


type LoginForm = Input<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
    return {
        email: 'a',
        password: 'b',
    };
});

export const useFormAction = formAction$<LoginForm>((values) => {
    // Runs on server
    console.log(values)

    // If it runs on server then why is Vite trying to externalize fs?

    // [plugin:vite:resolve] Module "fs" has been externalized for browser compatibility,
    // imported by "~/qwik-modular-forms-bug/src/routes/index.tsx".
    // See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.

    console.log(fs.read.name) // If you delete this line, the build will work as expected
}, valiForm$(LoginSchema));

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
