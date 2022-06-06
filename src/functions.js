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