import styled from 'styled-components';
import StyledTable from "./StyledTable";

const StyledMealTable = styled(StyledTable)`
    margin-top: 20px;
    border-collapse: separate;
    border-spacing: 0;

    & tr > td:not(:first-child) {
        padding: 0px;
        width: 200px;
    }

    thead > tr > th:first-child {
        background-color: transparent;
        border: 1px solid transparent;

        & > div {
            height: 30px;
        }
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

    tbody > tr > td:first-child {
        background-color: #DDD;
        border-bottom: 1px solid #CCC;
        border-left: 1px solid #CCC;
        font-weight: bold;
    }

    tbody > tr:nth-last-child(2) > td:first-child {
        border-bottom: none;
    }

    tbody > tr:first-child > td:first-child {
        border-top-left-radius: 5px;
        border-top: 1px solid #CCC;
    }

    tbody > tr.hidden > td {
        background-color: transparent;
        border: none;
        border-top: 1px solid #CCC;
        
        & > div {
            height: 30px;
        }
    }
`

export default StyledMealTable;