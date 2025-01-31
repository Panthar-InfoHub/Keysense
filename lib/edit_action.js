"use server"

import { cookies } from "next/headers";
import { parseServerResponse } from "./utils";
import axios from "axios";

export const editPlace = async (placeId, formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        // ✅ API Endpoint to update the place
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/places/${placeId}`;

        // 🔹 Extract form values
        const title = formData.name;
        const address = formData.address;
        const distance = formData.distance;
        const location_url = formData.location;

        // ✅ Payload for Updating Place
        const payload = {
            title,
            acf: {
                hotel_id: hotelId,  // ✅ Ensure the place remains linked to the hotel
                name: title,
                address,
                distance,
                location_url,
                place_img: formData.image
            },
        };

        console.log("🚀 Updating Place Payload:", payload);

        const response = await axios.put(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return parseServerResponse({ status: "SUCCESS", data: response.data });

    } catch (error) {
        console.error("❌ Error Updating Place:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};
export const editMenu = async (menuId, formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotelMenus/${menuId}`;

        const payload = {
            title: formData.name,
            acf: {
                hotel_id: hotelId,
                name: formData.name,
                price: formData.price,
                duration: formData.duration,
                description: formData.description,
                image: formData.image,  // Updated image URL if changed
            },
        };

        const response = await axios.put(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return parseServerResponse({ status: "SUCCESS", data: response.data });

    } catch (error) {
        console.error("❌ Error Updating Menu:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};

export const editBanner = async (bannerId, formData) => {
    console.log("FORMDATA :", formData)
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/banners/${bannerId}`;

        const payload = {
            title: formData.title,
            acf: {
                hotel_id: hotelId,
                title: formData.title,

                position: Array.isArray(formData.position) ? formData.position.join(",") : formData.position, // Array of placements
                status: formData.status,
                image: formData.image,  // Updated image URL if changed
            },
        };

        const response = await axios.put(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return parseServerResponse({ status: "SUCCESS", data: response.data });

    } catch (error) {
        console.error("❌ Error Updating Banner:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};

export const unpublishReview = async (reviewId, status) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reviews/${reviewId}`;

        const payload = {
            acf: {
                status: status === "publish" ? "unpublished" : "publish", // ✅ Toggle ACF status
            },
        };

        const response = await axios.put(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return parseServerResponse({ status: "SUCCESS" });

    } catch (error) {
        console.error("❌ Error Unpublishing Review:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};

