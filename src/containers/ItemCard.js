import { useContext } from 'react';

import context from '../state/context';

import Card from "../components/Card";
import TableBasic from "../components/TableBasic";
import BasicButton from "../components/BasicButton";
import ConfirmButtonPopup from "../components/ConfirmButtonPopup";

const ItemCard = ({item, openEditModal, onDeleteItem}) => {
    const { meals } = useContext(context);

    const checkIfCanDelete = (item) => {
        let canDelete = true;

        for (let i = 0; i < meals.length; i++) {
            const meal = meals[i];
            const itemList = meal.itemList;

            if (itemList.find(itemObj => itemObj.id === item.id) !== undefined) {
                canDelete = false;
                break;
            }
        }

        return canDelete;
    }

    return (
        <Card width='180px'>
            <header>{item.name}</header>
            <section>
                <TableBasic noBorder={true} data={[['Size', item.size+item.measurement], ['Calories', item.calories]]}/>
            </section>
            <footer>
                <BasicButton label="Edit" onClick={openEditModal(item)} width='80px' color='var(--button-color-normal)'/>
                {
                    checkIfCanDelete(item) ? <ConfirmButtonPopup label="Delete" width='80px' color='var(--button-color-caution)' onClick={onDeleteItem(item)}/>
                                        : null
                }
            </footer>
        </Card>
    );
}

export default ItemCard;