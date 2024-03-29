import {writable} from "svelte/store";
import type {Writable} from "svelte/store";
import Session from "./session";
import SupabaseService from "./api/supabase-service.ts";
import type {Gym} from "./types/Gym.ts";

export const isLoggedIn: Writable<boolean> = writable(false);
Session.isLoggedIn().then((value) => {
    isLoggedIn.set(value);
});

export const currentGymId: Writable<Promise<any>> = writable(fetchUsersCurrentGym());
export const currentGym: Writable<Gym> = writable<Gym>();
export const gyms: Writable<Gym[] | undefined> = writable<Gym[]>();
fetchGyms().then((value) => {
    gyms.set(value);
});

/**
 * sum up all points of current user
 * show in profile page
 * @returns
 */
export async function getSummedPoints(): Promise<number> {
    let summedPoints: number = 0;
    const pointsArray = (await SupabaseService.getCurrentPoints())?.points?.points;
    if (pointsArray !== null && pointsArray !== undefined) {
        pointsArray.map((item: any) => {
            summedPoints += item.value;
        });
    } else {
        summedPoints = 0;
    }
    return summedPoints;
}

/**
 * fetch gym for current user
 * @returns
 */
export async function fetchUsersCurrentGym(): Promise<any> {
    try {
        return (await SupabaseService.getCurrentGym()).gym?.gym;
    } catch (err: any) {
        console.log(err);
    }
}

/**
 * fetch all gyms
 * @returns
 */
async function fetchGyms(): Promise<Gym[] | undefined> {
    try {
        let result = (await SupabaseService.getGyms()).gym;
        return result?.map((item: { [x: string]: any }) => {
            const {id, name, grades} = item;
            return {id, name, grades} as Gym;
        });
    } catch (err: any) {
        console.log(err);
    }
}