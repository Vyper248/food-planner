import Card from '../components/Card';
import TableBasic from '../components/TableBasic';
import ConfirmButtonPopup from '../components/ConfirmButtonPopup';
import BasicButton from '../components/BasicButton';

const MealCard = ({meal, getCalories, openEditModal, onDeleteItem}) => {
    return (
        <Card key={meal.id}>
            <header>{meal.name}</header>
            <section>
                <TableBasic data={[['Type', meal.type], ['Calories', getCalories(meal)]]}/>
            </section>
            <footer>
                <BasicButton label="Edit" onClick={openEditModal(meal)} width='80px' color='var(--button-color-normal)'/>
                <ConfirmButtonPopup label="Delete" width='80px' color='var(--button-color-caution)' onClick={onDeleteItem(meal)}/>
            </footer>
        </Card>
    );
}

export default MealCard;