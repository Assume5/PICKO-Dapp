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
