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

    if (scheme === 'Blue') {
        root.style.setProperty('--button-color-normal', '#a3d5f7');
        root.style.setProperty('--button-color-caution', '#FF6B6B');
        root.style.setProperty('--button-color-success', 'lightgreen');
        root.style.setProperty('--menu-background-color', '#a3d5f7');
        root.style.setProperty('--menu-border-color', '#67bbf5');
        root.style.setProperty('--menu-selected-color', '#67bbf5');
        root.style.setProperty('--table-header-color', '#a3d5f7');
        root.style.setProperty('--table-row-color', '#e3f6fc'); 
        root.style.setProperty('--table-dim-color', '#DDD'); 
        root.style.setProperty('--background-color', 'white');  
        root.style.setProperty('--text-color', 'black');  
    }

    if (scheme === 'Green') {
        root.style.setProperty('--button-color-normal', '#adffbe');
        root.style.setProperty('--button-color-caution', '#FF6B6B');
        root.style.setProperty('--button-color-success', '#adffbe');
        root.style.setProperty('--menu-background-color', '#adffbe');
        root.style.setProperty('--menu-border-color', '#4ad466');
        root.style.setProperty('--menu-selected-color', '#4ad466');
        root.style.setProperty('--table-header-color', '#adffbe');
        root.style.setProperty('--table-row-color', '#dcfae2'); 
        root.style.setProperty('--table-dim-color', '#DDD'); 
        root.style.setProperty('--background-color', 'white');  
        root.style.setProperty('--text-color', 'black');  
    }

    if (scheme === 'Grey') {
        root.style.setProperty('--button-color-normal', '#BBB');
        root.style.setProperty('--button-color-caution', '#FF6B6B');
        root.style.setProperty('--button-color-success', 'lightgreen');
        root.style.setProperty('--menu-background-color', '#EEE');
        root.style.setProperty('--menu-border-color', 'gray');
        root.style.setProperty('--menu-selected-color', '#BBB');
        root.style.setProperty('--table-header-color', '#CCC');
        root.style.setProperty('--table-row-color', '#EEE');
        root.style.setProperty('--table-dim-color', '#DDD'); 
        root.style.setProperty('--background-color', 'white');
        root.style.setProperty('--text-color', 'black');  
    }

    if (scheme === 'Black') {
        root.style.setProperty('--button-color-normal', '#a3d5f7');
        root.style.setProperty('--button-color-caution', '#ff6161');
        root.style.setProperty('--button-color-success', 'lightgreen');
        root.style.setProperty('--menu-background-color', '#333');
        root.style.setProperty('--menu-border-color', 'gray');
        root.style.setProperty('--menu-selected-color', '#555');
        root.style.setProperty('--table-header-color', '#333');
        root.style.setProperty('--table-row-color', '#222');
        root.style.setProperty('--table-dim-color', '#222'); 
        root.style.setProperty('--background-color', 'black');
        root.style.setProperty('--text-color', 'white');  
    }

    if (scheme === 'Red') {
        root.style.setProperty('--button-color-normal', '#a3d5f7');
        root.style.setProperty('--button-color-caution', '#FF6B6B');
        root.style.setProperty('--button-color-success', '#8ee38d');
        root.style.setProperty('--menu-background-color', '#b30202');
        root.style.setProperty('--menu-border-color', '#800000');
        root.style.setProperty('--menu-selected-color', '#800000');
        root.style.setProperty('--table-header-color', '#b30202');
        root.style.setProperty('--table-row-color', '#260000'); 
        root.style.setProperty('--table-dim-color', '#222'); 
        root.style.setProperty('--background-color', 'black');  
        root.style.setProperty('--text-color', 'white');  
    }
}