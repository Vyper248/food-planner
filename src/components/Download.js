import styled from 'styled-components';
import { format } from 'date-fns';

const StyledComp = styled.button`
    background-color: var(--button-color-normal);
    color: black;
    width: 150px;
    height: 28px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    margin: 5px;
    display: inline-block;
    font-size: 1em;
    vertical-align: bottom;

    &:hover {
        cursor: pointer;
        filter: brightness(75%);
    }
`;

const Download = ({data, filename=`Food Planner Backup - ${format(new Date(),'yyyy-MM-dd')}.json`}) => {
    const downloadJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));

        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", filename);
        link.click();
    }

    return (
        <StyledComp onClick={downloadJson}>Download</StyledComp>
    );
}

export default Download;