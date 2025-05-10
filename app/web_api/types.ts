// import type { T } from "node_modules/react-router/dist/development/route-data-C12CLHiN.mjs";

import type { LatLngTuple } from "leaflet";

export type ApiResponse<T> = {
    statucCode: number;
    message: string
    data: T;
    error: string
}

export type Placemark = {
    _id: string;
    name: string;
    address: string;
    title: string;
    poiType: any; // fix later
    categories: string[]; //  fix later
    description: string;
    location: {
        type: string;
        coordinates: LatLngTuple;
    }
    images: string[];
}