import styled from 'styled-components';
import StyledTable from "./StyledTable";

const StyledMealTable = styled(StyledTable)`
    margin-top: 20px;
    border-collapse: separate;
    border-spacing: 0;
    border: none;

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
        border-left: 1px solid var(--menu-border-color);
    }

    thead > tr > th:last-child {
        border-right: 1px solid var(--menu-border-color);
    }

    thead > tr > th {
        border-top: 1px solid var(--menu-border-color);
        border-right: 1px solid var(--menu-border-color);
    }

    tbody > tr > td:first-child {
        background-color: var(--table-header-color);
        border-bottom: 1px solid var(--menu-border-color);
        border-left: 1px solid var(--menu-border-color);
        font-weight: bold;
    }

    tbody > tr:nth-last-child(2) > td:first-child {
        border-bottom: none;
    }

    tbody > tr:first-child > td:first-child {
        border-top-left-radius: 5px;
        border-top: 1px solid var(--menu-border-color);
    }

    tbody > tr.hidden > td {
        background-color: transparent;
        border: none;
        border-top: 1px solid var(--menu-border-color);
        
        & > div {
            height: 30px;
        }
    }

    tr > td:last-child {
        border-right: 1px solid var(--menu-border-color);
    }
`

export default StyledMealTable;