import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "https://food-del-backend-2l3u.onrender.com/";

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // ✅ Add to Cart with Safety Check
    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...(prev || {}) };
            if (!updatedCart[itemId]) {
                updatedCart[itemId] = 1;
            } else {
                updatedCart[itemId] += 1;
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (err) {
                console.log("Add to cart failed:", err);
            }
        }
    };

    // ✅ Remove from Cart with Safety Check
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...(prev || {}) };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (err) {
                console.log("Remove from cart failed:", err);
            }
        }
    };

    // ✅ Calculate total cart amount safely
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // ✅ Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (err) {
            console.log("Failed to fetch food list:", err);
        }
    };

    // ✅ Load cart data
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData || {}); // Fallback to empty object
        } catch (err) {
            console.log("Failed to load cart data:", err);
            setCartItems({});
        }
    };

    // ✅ On mount, fetch food list and cart if token exists
    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
