import styled from 'styled-components';

const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 0;
    width: auto;
    margin: auto;
    border: 1px solid var(--menu-border-color);
    border-radius: 5px 5px 0px 0px;

    ${props => props.noBorder === true ? 'border: none;' : ''}

    th, td {
        padding: 7px 10px;
        ${props => props.size === 'small' ? 'padding: 4px 7px;' : ''};
        ${props => props.size === 'large' ? 'padding: 10px 15px;' : ''};
        border-right: 1px solid var(--menu-border-color);
        height: 1px;
    }

    td.input {
        padding: 0px;
    }

    thead {
        th:first-child {
            border-top-left-radius: 4px;
        }
    
        th:last-child {
            border-top-right-radius: 4px;
        }
    
        th {
            border-bottom: 1px solid var(--menu-border-color);
            background-color: var(--table-header-color);
            min-width: 100px;
        }
    
        th:last-child,
        td:last-child {
            border-right: none;
        }
    }

    tr > td:last-child {
        border-right: none;
    }

    tr:last-child {
        border-bottom: none;
    }

    tr:nth-child(2n) td {
        background-color: var(--table-row-color);
    }
`;

export default StyledTable;