"use server"
import axios from "axios";
import { parseServerResponse } from "./utils";
import { cookies } from "next/headers";

export const removePlace = async (postId) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/places/${postId}`;

        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return parseServerResponse({ status: "SUCCESS", message: "Deleted success" });

    } catch (error) {
        console.error("❌ Error Removing Post:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error: "Delete Place error" });
    }
};

export const removeHotelMenu = async (menuId) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotelMenus/${menuId}`;

        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return parseServerResponse({ status: "SUCCESS", message: "Moved to Trash successfully" });

    } catch (error) {
        console.error("❌ Error Moving Hotel Menu to Trash:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error: "Move to Trash error" });
    }
};

export const removeReview = async (reviewId) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        // ✅ Correct API endpoint for deleting reviews
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reviews/${reviewId}`;

        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("✅ Review Deleted:", response.data);
        return parseServerResponse({ status: "SUCCESS", message: "Review deleted successfully" });

    } catch (error) {
        console.error("❌ Error Removing Review:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error: "Delete Review error" });
    }
};
