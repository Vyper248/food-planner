import styled from 'styled-components';
import StyledTable from "./StyledTable";

const StyledMealTable = styled(StyledTable)`
    margin-top: 20px;
    border-bottom: 1px solid #CCC;

    & tr > td:not(:first-of-type) {
        padding: 0px;
        width: 200px;
    }

    tbody > tr > td:first-of-type {
        background-color: #DDD;
        border-bottom: 1px solid #CCC;
        border-left: 1px solid #CCC;
        font-weight: bold;
    }

    thead > tr > th:first-child {
        background-color: transparent;
        border-bottom: 1px solid #CCC;
        border-right: none;
    }

    thead > tr > th:nth-child(2) {
        border-top-left-radius: 5px;
        border-left: none;
    }
`

export default StyledMealTable;