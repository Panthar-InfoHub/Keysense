"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { parseServerResponse } from "./utils";

export const loginUser = async (formData) => {
    console.log("TEST LOG")
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
        const hotelName = await getHotelName(hotel_id, token)
        return parseServerResponse({ status: 'SUCCESS', data: { user_id, hotel_id, hotelName } })
    } catch (error) {
        console.log("Login Error : ", error)
        return parseServerResponse({ status: 'FAIl', error })
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
        console.log("Filtered Hotel:", hotelName);

        return hotelName
    } catch (error) {
        console.error("Error Fetching Hotel:", error);
    }
};
