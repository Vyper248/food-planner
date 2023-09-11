import Card from '../components/Card';
import TableBasic from '../components/TableBasic';
import ConfirmButtonPopup from '../components/ConfirmButtonPopup';
import BasicButton from '../components/BasicButton';

import { parseCurrency } from '../functions';

const MealCard = ({meal, getValue, openEditModal, onDeleteItem}) => {
    const tableData = [
        ['Type', meal.type], 
        ['Calories', getValue(meal, 'calories', true).totalValue]
    ];

    let totalData = getValue(meal, 'price');
    if (totalData.totalValue > 0) {
        let priceString = parseCurrency(totalData.totalValue);
        if (totalData.missingVal) priceString += ' !';
        tableData.push(['Price', priceString]);
    }

    return (
        <Card key={meal.id} width='200px'>
            <header>{meal.name}</header>
            <section>
                <TableBasic noBorder={true} data={tableData}/>
            </section>
            <footer>
                <BasicButton label="Edit" onClick={openEditModal(meal)} width='80px' color='var(--button-color-normal)'/>
                <ConfirmButtonPopup label="Delete" width='80px' color='var(--button-color-caution)' onClick={onDeleteItem(meal)}/>
            </footer>
        </Card>
    );
}

export default MealCard;