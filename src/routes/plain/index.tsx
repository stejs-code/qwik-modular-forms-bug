import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";
import {Form, routeAction$} from "@builder.io/qwik-city";
import * as fs from "fs";

export default component$(() => {
    const action = useAction()

    return (
        <Form action={action}>
            <input name={"name"} value={"a"} type="text"/>
            <button type="submit">Login</button>
        </Form>
    );
});

export const useAction = routeAction$((values) => {
    // Runs on server
    console.log(values)

    console.log(fs.read.name) // Works fine
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
