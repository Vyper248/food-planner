import styled from 'styled-components';

const StyledTable = styled.table`
    border-collapse: collapse;
    width: auto;
    margin: auto;

    th, td {
        padding: 7px 10px;
        ${props => props.size === 'small' ? 'padding: 4px 7px;' : ''};
        ${props => props.size === 'large' ? 'padding: 10px 15px;' : ''};
        border-right: 1px solid #CCC;
        height: 1px;
    }

    thead {
        th:first-child {
            border-top-left-radius: 5px;
        }
    
        th:last-child {
            border-top-right-radius: 5px;
        }
    
        th {
            border-bottom: 1px solid black;
            background-color: #DDD;
            min-width: 100px;
        }
    
        th:last-child,
        td:last-child {
            border-right: none;
        }
    }

    tr:last-child {
        border-bottom: none;
    }

    tr:nth-child(2n) td {
        background-color: #EEE;
    }
`;

export default StyledTable;