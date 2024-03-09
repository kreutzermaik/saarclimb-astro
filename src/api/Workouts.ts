import type {WorkoutSelect} from "../types/WorkoutSelect.ts";

export enum Workouts {
    BOULDERN = "Bouldern",
    KLETTERN = "Klettern",
    FREELETICS = "Freeletics",
    CALISTHENICS = "Calisthenics",
    STRETCHING = "Stretching",
    MOBILITY = "Mobility",
    KRAFT = "Kraft",
    LAUFEN = "Laufen",
    RADFAHREN = "Radfahren",
    HIIT = "HIIT",
    OBERKOERPER = "Oberkörper",
    UNTERKOERPER = "Unterkörper",
    GANZKOERPER = "Ganzkörper",
    CORE = "Core",
    BEINE = "Beine"
}

export function getWorkoutList(): WorkoutSelect[] {
    let workouts = Object.values(Workouts).sort();
    let workoutList: WorkoutSelect[] = [];
    workouts.map((workout) => {
        workoutList.push({name: workout, value: workout});
    });
    return workoutList;
}
