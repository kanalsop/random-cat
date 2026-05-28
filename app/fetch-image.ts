"use server";

import { CAT_API_KEY } from "./env";

const CAT_API_ENDPOINT = "https://api.thecatapi.com/v1/images/search"

// image type definition
type Image = {
    url: string;
};

// get images from CatAPI
export async function fetchImage(): Promise<Image> {
    const res = await fetch(CAT_API_ENDPOINT, {
        headers: { "x-api-key": CAT_API_KEY },
    });
    const images: unknown = await res.json()
    console.log("fetchImage: 画像情報を取得しました", images);
    if (!isImageArray(images)) {
        throw new Error("fetch incorrect data")
    }
    if (!images[0]) {
        throw new Error("data is empty")
    }
    return images[0];
}

// check if input is an array of Image
function isImageArray(value: unknown): value is Image[] {
    if (!Array.isArray(value)) {
        return false;
    }

    if (!value.every(isImage)) {
        return false;
    }
    return true;
}

// check is input is Image
function isImage(value: unknown): value is Image {
    if (typeof value !== "object" || value == null) {
        return false;
    }

    if (!("url" in value)) {
        return false;
    }

    if (typeof (value as Image).url !== "string") {
        return false;
    }
    return true;
}