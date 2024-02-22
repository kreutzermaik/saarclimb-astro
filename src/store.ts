import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import Session from "./session";


export const isLoggedIn: Writable<boolean> = writable(false);
Session.isLoggedIn().then((value) => {
    isLoggedIn.set(value);
});