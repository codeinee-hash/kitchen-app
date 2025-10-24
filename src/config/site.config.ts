const APP_ROUTES = {
    main: "/",
    about: "/about",
    ingredients: "/ingredients",
} as const;

export const siteConfig = {
    title: "Кыргызская кухня",
    description: "Рецепты кыргызской кухни",
    navItems: [
        { label: "Рецепты", href: APP_ROUTES.main },
        { label: "Ингредиенты", href: APP_ROUTES.ingredients },
        { label: "О нас", href: APP_ROUTES.about },
    ],
    pagesContent: {
        [APP_ROUTES.main]: {
            content: `
                <p>Рецепты - Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Повстречался не, свое использовало города моей по всей даже продолжил реторический!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, molestias?</p>
            `
        },
        [APP_ROUTES.ingredients]: {
            content: "Ингредиенты - Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Повстречался не, свое использовало города моей по всей даже продолжил реторический!"
        },
        [APP_ROUTES.about]: {
            content: "О нас - Далеко-далеко за словесными горами в стране гласных и согласных, живут рыбные тексты. Повстречался не, свое использовало города моей по всей даже продолжил реторический!"
        },
    }
}