"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { parseServerResponse } from "./utils";
import { format, parseISO } from "date-fns";
import { getHotelName } from "./actions";

// ✅ Upload Image to WordPress Media Library
export const uploadMedia = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/media";

        const response = await axios.post(url, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        return response.data; // Contains URL & other metadata
    } catch (error) {
        console.error("❌ Error Uploading Image:", error.response?.data || error);
        throw error;
    }
};

// ✅ Create a New Place Post
export const createPlace = async (formData, image) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/places";
        const { name, address, distance, location } = Object.fromEntries(formData.entries());
        const payload = {
            title: name,
            status: "publish",
            acf: {
                name: name,
                address: address,
                distance: distance,
                location_url: location,
                hotel_id: hotelId,
                place_img: image,
            }
        };

        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        console.log("RESponse add place : ", response)

        return parseServerResponse({ status: 'SUCCESS', data: response.data })
    } catch (error) {
        console.error("❌ Error Creating Place:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error })
    }
};
export const createHotelMenu = async (formData, image) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token) {
            console.error("❌ No auth token found in cookies");
            return parseServerResponse({ status: "FAIL", error: "Authentication error" });
        }

        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotelMenus";

        // Extract Form Data
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description") || "";
        const duration = formData.get("duration") || "";

        const payload = {
            title: name,
            acf: {
                image,
                hotel_id: hotelId, // ✅ Link menu to the correct hotel
                price,
                description,
                duration,
                name
            },
            status: "publish"
        };
        // API Request to create a new menu
        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return parseServerResponse({ status: "SUCCESS", data: response.data });

    } catch (error) {
        console.error("❌ Error Creating Hotel Menu:", error.response?.data || error);
        return parseServerResponse({ status: "FAIL", error });
    }
};

export const createBanner = async (formData, image) => {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/banners";
        const title = formData.get("title");
        let position = formData.get("position"); // Single value (Dropdown)
        position = Array.isArray(position) ? position.join(",") : position
        const status = formData.get("status") || "draft";

        const payload = {
            title,
            acf: {
                title,
                position: position,
                status,
                image: image,
                hotel_id: hotelId,
            },
        };

        const response = await axios.post(url, payload,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return parseServerResponse({ status: 'SUCCESS', data: response.data })
    } catch (error) {
        console.error("❌ Error Creating Place:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error })
    }
};
export const createReview = async (formData, rating) => {

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reviews";

        const guestName = formData.get("guest_name") || "Anonymous";
        const guestNumber = formData.get("guest_no") || "";
        const final_rating = parseInt(rating, 10);
        const content = formData.get("content");
        let status = formData.get("status") || 'publish'

        // Ensure status matches WordPress allowed values
        if (!["publish", "unpublished"].includes(status)) {
            status = "publish";
        }

        const payload = {
            title: guestName,
            status,
            acf: {
                hotel_id: hotelId,
                guest_name: guestName,
                guest_number: guestNumber,
                stars: final_rating.toString(), // Ensure it's stored as a string
                content,
                status,
            },
        };

        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        return parseServerResponse({ status: 'SUCCESS', data: response.data })
    } catch (error) {
        console.error("❌ Error Creating Place:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error })
    }
};

export const addWifiToHotel = async (formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            console.error("Missing authentication token or hotel ID");
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        // ✅ Fetch the latest hotel data before modifying WiFi
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const hotel = response.data.find(h => h.acf?.id === hotelId);

        if (!hotel) {
            return parseServerResponse({ status: 'FAIL', message: "Hotel not found" });
        }

        // ✅ Extract existing WiFi data and add new entry
        const existingWifis = hotel.acf?.info?.wifi || [];
        const newWifi = {
            name: formData.get("name"),
            password: formData.get("password")
        };

        // ✅ Overwrite WiFi list (remove duplicates or old ones)
        const updatedWifis = [...existingWifis, newWifi];

        // ✅ Send updated data back to WordPress
        const updatePayload = {
            acf: {
                ...hotel.acf,  // Preserve other hotel data
                info: {
                    ...hotel.acf.info,
                    wifi: updatedWifis
                }
            }
        };

        await axios.post(url + `/${hotel.id}`, updatePayload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        return parseServerResponse({ status: 'SUCCESS' });
    } catch (error) {
        console.error("❌ Error Adding WiFi:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error });
    }
};

export const deleteWifiFromHotel = async (wifiName) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        // ✅ Fetch current hotel data
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const hotel = response.data.find(h => h.acf?.id === hotelId);

        if (!hotel) {
            return parseServerResponse({ status: 'FAIL', message: "Hotel not found" });
        }

        // ✅ Filter out the deleted WiFi entry
        const updatedWifis = hotel.acf.info.wifi.filter(wifi => wifi.name !== wifiName);

        // ✅ Update WordPress with new list
        const updatePayload = {
            acf: {
                ...hotel.acf,
                info: {
                    ...hotel.acf.info,
                    wifi: updatedWifis
                }
            }
        };

        await axios.post(url + `/${hotel.id}`, updatePayload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        return parseServerResponse({ status: 'SUCCESS', data: updatedWifis });
    } catch (error) {
        console.error("❌ Error Deleting WiFi:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error });
    }
};

export const updateHotelPitch = async (pitch) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        // ✅ Fetch the latest hotel data
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const hotel = response.data.find((h) => h.acf?.id === hotelId);
        if (!hotel) {
            return parseServerResponse({ status: 'FAIL', message: "Hotel not found" });
        }

        // ✅ Update only the pitch (About section)
        const updatePayload = {
            acf: {
                ...hotel.acf,
                info: {
                    ...hotel.acf.info,
                    about: pitch, // Update the pitch content
                },
            },
        };

        // ✅ Send updated pitch to WordPress
        await axios.post(url + `/${hotel.id}`, updatePayload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return parseServerResponse({ status: 'SUCCESS' });
    } catch (error) {
        console.error("❌ Error Updating Pitch:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', error });
    }
};

export const updateHotelDetails = async (formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        // ✅ Fetch the latest hotel data
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const hotel = response.data.find((h) => h.acf?.id === hotelId);
        if (!hotel) {
            return parseServerResponse({ status: 'FAIL', message: "No hotel" });
        }

        // ✅ Extract form data
        const name = formData.get("name");
        const email = formData.get("email");
        const supportNumber = formData.get("supportnumber");
        const city = formData.get("city");
        const location = formData.get("location");
        const locationUrl = formData.get("locationurl");
        const placeId = formData.get("place_id");

        // ✅ Update only hotel details
        const updatePayload = {
            acf: {
                ...hotel.acf,
                name,
                email,
                supportnumber: supportNumber,
                city,
                location,
                locationurl: locationUrl,
                place_id: placeId,
            },
        };

        // ✅ Send updated details to WordPress
        await axios.post(url + `/${hotel.id}`, updatePayload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return parseServerResponse({ status: 'SUCCESS', message: "Authentication error" });
    } catch (error) {
        console.error("❌ Error Updating Hotel Details:", error.response?.data || error);
        return parseServerResponse({ status: 'FAIL', message: " error" });
    }
};

export const updateHotelPassword = async (formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }

        const url = `https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/hotels`;

        // ✅ Fetch the latest hotel data
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const hotel = response.data.find((h) => h.acf?.id === hotelId);
        if (!hotel) {
            return parseServerResponse({ status: 'FAIL', message: "No hotel" });
        }

        // ✅ Extract form data
        const newPassword = formData.get("new");
        const confirmPassword = formData.get("confirm");

        // ✅ Ensure passwords match
        if (newPassword !== confirmPassword) {
            return parseServerResponse({ status: 'FAIL', message: "Password don't match" });
        }

        // ✅ Update only password
        const updatePayload = {
            acf: {
                ...hotel.acf,
                password: newPassword, // ✅ Store the new password
            },
        };

        // ✅ Send updated details to WordPress
        await axios.post(url + `/${hotel.id}`, updatePayload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return parseServerResponse({ status: 'SUCCESS', message: "Authentication error" });
    } catch (error) {
        console.error("❌ Error Updating Password:", error.response?.data || error);
        return { status: "FAIL", error };
    }
};

const generateGuestID = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `RSV${randomNum}`;
};


export const createReservation = async (formData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;
        const hotelId = cookieStore.get("hotel_id")?.value;

        if (!token || !hotelId) {
            return parseServerResponse({ status: 'FAIL', message: "Authentication error" });
        }
        const hotelName = await getHotelName(hotelId, token)
        const url = "https://floralwhite-shrew-198037.hostingersite.com/wp-json/wp/v2/reservations";
        const guest_id = generateGuestID();
        const payload = {
            title: formData.get("guest_name"),
            status: "publish",
            acf: {
                guest_name: formData.get("guest_name"),
                guest_id,
                guest_number: formData.get("guest_no"),
                check_in: formData.get("check_in"),
                chech_out: formData.get("check_out"),
                hotel_id: hotelId,
                rooms: formData.get("rooms"),
                status: "approved", // "approved", "pending", etc.
                number_Of_People: `${formData.get("adults")} adults, ${formData.get("kids")} kids`,
                welcome: true,
            },
        };

        const response = await axios.post(url, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const whatsappResponse = await sendWhatsAppMessage(hotelName, guest_id, formData.get("guest_no"), formData.get("guest_name"), formData.get("check_in"), formData.get("check_in"));

        return parseServerResponse({ status: "SUCCESS", data: response.data, hotelName, reservationId: guest_id });

    } catch (error) {
        console.error("❌ Error Creating Reservation:", error.response?.data || error);
        return parseServerResponse({ status: 'SUCCESS', message: "Reservation Error" });
    }
}

const sendWhatsAppMessage = async (hotelName, reservationId, phoneNumber, guestName, checkIn, checkOut) => {
    try {
        const sensyApiUrl = "https://backend.aisensy.com/campaign/t1/api/v2";
        const sensyApiKey = process.env.AI_SENSY_API_KEY;

        if (!sensyApiKey) {
            console.error("❌ AI Sensy API Key is missing! Check environment variables.");
            return false;
        }

        console.log("🔑 AI Sensy API Key Loaded:", sensyApiKey);
        console.log("Hotel name ===> ", hotelName)
        // Format Check-In and Check-Out Dates
        const formattedCheckIn = format(parseISO(checkIn), "yyyy-MM-dd");
        const formattedCheckOut = format(parseISO(checkOut), "yyyy-MM-dd");

        // AiSensy Template Requires 8 Parameters
        const whatsappPayload = {
            apiKey: sensyApiKey,
            campaignName: "confirm_reservation",  // ✅ Correct campaign name
            destination: `+91${phoneNumber}`,
            userName: guestName,
            templateParams: [
                guestName,                 // {{1}} - Hello Name
                reservationId,             // {{2}} - Reservation ID
                guestName,                 // {{3}} - Name
                phoneNumber,               // {{4}} - Phone Number
                formattedCheckIn,          // {{5}} - Check-In Date
                formattedCheckOut,         // {{6}} - Check-Out Date
                hotelName,                 // {{7}} - Dashboard URL Part 1 (Dynamic Path)
                reservationId              // {{8}} - Dashboard URL Part 2 (Dynamic Path)
            ],
        };

        console.log("📤 Sending WhatsApp Payload:", JSON.stringify(whatsappPayload, null, 2));

        const response = await axios.post(sensyApiUrl, whatsappPayload, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ WhatsApp Message Sent Successfully:", response.data);
        return true;
    } catch (error) {
        console.error("❌ Error Sending WhatsApp Message:", {
            message: error.message,
            response: error.response?.data,
            headers: error.response?.headers,
            status: error.response?.status
        });

        if (error.response?.data?.message === "Template params does not match the campaign") {
            console.error("🚨 The number of templateParams in AiSensy does not match what you're sending. Check your AiSensy template.");
        }
    }
};