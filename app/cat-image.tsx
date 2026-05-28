"use client";

import { useState } from "react";
import { fetchImage } from "./fetch-image";
import styles from "./page.module.css";

// parameter definition
type CatImageProps = {
    url: string;
};

// display image
export function CatImage({ url }: CatImageProps) {
    const [imageUrl, setImageUrl] = useState(url);

    // define function to get image
    const refreshImage = async () => {
        setImageUrl("");  // Init
        const image = await fetchImage();
        setImageUrl(image.url);
    };

    return (
        <div className={styles.page}>
            {/* display button */}
            <button onClick={refreshImage} className={styles.button}>
                他のにゃんこも見る
            </button>
            <div className={styles.frame}>
                {/* display image */}
                {imageUrl && <img src={imageUrl} />}
            </div>
        </div>
    )
}