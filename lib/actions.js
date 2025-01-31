"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { parseServerResponse } from "./utils";

export const loginUser = async (formData) => {
    try {
        const username = formData.get('username')
        const password = formData.get('password')
        const loginResponse = await axios.post(
            'https://floralwhite-shrew-198037.hostingersite.com/wp-json/jwt-auth/v1/token',
            { username, password, },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const cookieStore = await cookies();
        const { token, user_id, hotel_id } = loginResponse.data;
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'Strict',
            maxAge: 172800, // 2 days
        });
        cookieStore.set("hotel_id", hotel_id, {
            httpOnly: true,
            path: "/",
            sameSite: "Strict",
            maxAge: 172800, // 2 days
        });

        const hotelName = await getHotelName(hotel_id, token)
        return parseServerResponse({ status: 'SUCCESS', data: { user_id, hotel_id, hotelName } })
    } catch (error) {
        console.log("Login Error : ", error)
        return parseServerResponse({ status: 'FAIl', error })
    }
}

export const checkCookie = async () => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    if (authToken) {
        const hotel_id = cookieStore.get('hotel_id')?.value;
        const hotelName = await getHotelName(hotel_id, authToken)
        return parseServerResponse({ status: 'SUCCESS', hotelName })
    }
}

export const getName = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;
        const name = await getHotelName(hotelId, token);
        return parseServerResponse({ status: 'SUCCESS', name })
    } catch (error) {

    }
}

const getHotelName = async (hotelId, token) => {
    try {
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const filteredHotel = response.data.find(hotel => hotel.acf?.id === hotelId);
        if (!filteredHotel) {
            console.log("No hotel found with this ID.");
            return null;
        }

        const hotelName = filteredHotel.title.rendered.replace(/\s+/g, "");

        return hotelName
    } catch (error) {
        console.error("Error Fetching Hotel:", error);
    }
};

export const getHotelReservation = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("No auth token found in cookies");
            return parseServerResponse({ status: 'Fail', error })
        }
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reservations";

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // ✅ Filter reservations by hotel ID
        const filteredReservations = response.data.filter(reservation =>
            reservation.acf?.hotel_id === hotelId
        );
        return parseServerResponse({ status: 'SUCCESS', data: filteredReservations.slice(0, 5) })

    } catch (error) {

    }
}
export const getFullHotelReservation = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("No auth token found in cookies");
            return parseServerResponse({ status: 'Fail', error })
        }
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reservations";

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // ✅ Filter reservations by hotel ID
        const filteredReservations = response.data.filter(reservation =>
            reservation.acf?.hotel_id === hotelId
        );
        return parseServerResponse({ status: 'SUCCESS', data: filteredReservations })

    } catch (error) {

    }
}
export const getHotelBanner = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("No auth token found in cookies");
            return parseServerResponse({ status: 'Fail', error })
        }
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/banners";

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // ✅ Filter reservations by hotel ID
        const filteredReservations = response.data.filter(reservation =>
            reservation.acf?.hotel_id === hotelId
        );
        return parseServerResponse({ status: 'SUCCESS', data: filteredReservations })

    } catch (error) {

    }
}
export const getHotelPlaces = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("No auth token found in cookies");
            return parseServerResponse({ status: 'Fail', error })
        }
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/places";

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        // ✅ Filter reservations by hotel ID
        const filteredReservations = response.data.filter(reservation =>
            reservation.acf?.hotel_id === hotelId
        );
        return parseServerResponse({ status: 'SUCCESS', data: filteredReservations })

    } catch (error) {

    }
}

export const fetchHotelByACF = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;
        if (!token) {
            console.error("No auth token found in cookies");
            return parseServerResponse({ status: 'Fail', error })
        }
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        // ✅ Filter by ACF hotel ID
        const filteredHotel = response.data.find(hotel => hotel.acf?.id === hotelId);

        if (!filteredHotel) {
            console.log("No hotel found with this ID.");
            return parseServerResponse({ status: 'Fail', message: "No hotel found" })
        }

        return parseServerResponse({ status: 'SUCCESS', data: filteredHotel?.acf })
    } catch (error) {
        console.error("Error Fetching Hotel:", error);
    }
};

export const getHotelMenu = async ({ page = 1, per_page = 20 }) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        // ✅ Using the correct endpoint
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotelMenus?page=${page}&per_page=${per_page}`;

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.data || response.data.length === 0) {
            console.warn("⚠️ No menu items found in API response.");
            return parseServerResponse({ status: "SUCCESS", data: [] });
        }

        // ✅ Filter by hotel ID
        const filteredMenus = response.data.filter(menu => menu.acf?.hotel_id === hotelId);
        return parseServerResponse({ status: "SUCCESS", data: filteredMenus });

    } catch (error) {
        console.error("❌ Error Fetching Hotel Menu:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};
export const getHotelReview = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        // ✅ Using the correct endpoint
        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reviews`;

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        // ✅ Filter by hotel ID
        return parseServerResponse({ status: "SUCCESS", data: response?.data });

    } catch (error) {
        console.error("❌ Error Fetching Hotel Menu:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};