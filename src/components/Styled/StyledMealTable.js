import styled from 'styled-components';
import StyledTable from "./StyledTable";

const StyledMealTable = styled(StyledTable)`
    margin-top: 20px;
    border-bottom: 1px solid #CCC;
    border-collapse: separate;
    border-spacing: 0;

    & tr > td:not(:first-child) {
        padding: 0px;
        width: 200px;
    }

    tbody > tr > td:first-child {
        background-color: #DDD;
        border-bottom: 1px solid #CCC;
        border-left: 1px solid #CCC;
        font-weight: bold;
    }

    tbody > tr:last-child > td:first-child {
        border-bottom: none;
    }

    tbody > tr:first-child > td:first-child {
        border-top-left-radius: 5px;
        border-top: 1px solid #CCC;
    }

    thead > tr > th:first-child {
        background-color: transparent;
        border: 1px solid transparent;
    }

    thead > tr > th:nth-child(2) {
        border-top-left-radius: 5px;
        border-left: 1px solid #CCC;
    }

    thead > tr > th:last-child {
        border-right: 1px solid #CCC;
    }

    thead > tr > th {
        border-top: 1px solid #CCC;
        border-right: 1px solid #CCC;
    }
`

export default StyledMealTable;