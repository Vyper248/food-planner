import { memo } from 'react';
import styled from 'styled-components';

import StyledTable from './Styled/StyledTable';

const StyledContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 5px;

    & > h4 {
        align-self: center;
        margin: 5px;
    }
`;

const TableBasic = ({tableHeading='', header=[], data=[], size='medium', ...rest}) => {
    return (
        <StyledContainer>
            { tableHeading.length > 0 ? <h4>{tableHeading}</h4> : null }
            <StyledTable size={size} {...rest}>
                <thead>
                    <tr>
                        { header.map((a,i) => <th key={`thead-${i}-${a}`}>{a}</th>) }
                    </tr>
                </thead>
                <tbody>
                    { data.map((r,i) => <tr key={`tbody-${i}`}>{ r.map((d,i2) => <td key={`tdata-${i2}-${d}`}>{d}</td>) }</tr>) }
                </tbody>
            </StyledTable>
        </StyledContainer>
    );
}

const compareProps = (prev, next) => {
    if (prev.tableHeading !== next.tableHeading) return false;
    if (prev.size !== next.size) return false;
    if (prev.header && prev.header.toString() !== next.header.toString()) return false;
    if (prev.data && prev.data.toString() !== next.data.toString()) return false;
    return true;
}

export default memo(TableBasic, compareProps);