export const sortArray = (sort, array) => {
    let sortedItems = [...array].sort((a,b) => {
        if (sort === 'Name') return a.name < b.name ? -1 : 1;
        if (sort === 'Size') return a.size - b.size;
        if (sort === 'Calories') return a.calories - b.calories;
        if (sort === 'Portions') return a.portions - b.portions;
        return 0;
    });
    return sortedItems;
}

export const organiseMeals = (meals) => {
    let obj = {
        breakfast: [],
        lunch: [],
        dinner: []
    }

    meals.forEach(meal => {
        if (meal.type === 'Breakfast') obj.breakfast.push(meal);
        if (meal.type === 'Lunch') obj.lunch.push(meal);
        if (meal.type === 'Dinner') obj.dinner.push(meal);
    });

    return obj;
}

export const setColorScheme = (scheme) => {
    let root = document.documentElement;

    if (scheme === 'blue') {
        root.style.setProperty('--button-color-normal', '#a3d5f7');
        root.style.setProperty('--button-color-caution', '#ff6161');
        root.style.setProperty('--button-color-success', 'lightgreen');
        root.style.setProperty('--menu-background-color', '#a3d5f7');
        root.style.setProperty('--menu-border-color', '#67bbf5');
        root.style.setProperty('--menu-selected-color', '#67bbf5');
        root.style.setProperty('--background-color', 'white');   
    }

    if (scheme === 'gray') {
        root.style.setProperty('--button-color-normal', '#a3d5f7');
        root.style.setProperty('--button-color-caution', '#ff6161');
        root.style.setProperty('--button-color-success', 'lightgreen');
        root.style.setProperty('--menu-background-color', '#EEE');
        root.style.setProperty('--menu-border-color', 'gray');
        root.style.setProperty('--menu-selected-color', '#BBB');
        root.style.setProperty('--background-color', 'white');
    }
}