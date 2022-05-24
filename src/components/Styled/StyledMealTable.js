import styled from 'styled-components';
import StyledTable from "./StyledTable";

const StyledMealTable = styled(StyledTable)`
    border: 1px solid #CCC;

    & tr > td:not(:first-of-type) {
        padding: 0px;
        width: 200px;
    }
`

export default StyledMealTable;