export type heroImagesType = {
    hero_image: string;
};

export type MenuCategoriesType = {
    category_name: string;
    priority: boolean;
    image?: string;
};

export type RestaurantEat = {
    id: string;
    restaurant_name: string;
    full_address: string;
    category: string;
    open_time: string;
    close_time: string;
    restaurant_card_image: string;
    view_count: number;
    status: string;
    lat: string;
    long: string;
    distance: number;
};

export type order = {
    order_number: string;
    customer_id: string;
    payment_method: string;
    cartItems: {
        menu_id: number;
        menu_name: string;
        price: number;
        count: number;
    }[];
    delivery_address: string;
    restaurantID: string;
    restaurantName: string;
    deliver_fee: number;
    driver_tip: number;
    total_items: number;
    sub_total: number;
    sub_total_eth: number;
    destination_lat: number;
    destination_long: number;
};

export type NearByDriver = {
    socket_cookie: string;
    lat: number;
    long: number;
    distance: number;
    status: string;
};
