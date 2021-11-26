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