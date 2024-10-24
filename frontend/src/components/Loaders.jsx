import styled from 'styled-components'

export default function Loader() {
    return (
        <LoaderComponent></LoaderComponent>
    )
}

const LoaderComponent = styled.span`
    width: 20px;
    height: 20px;
    border: 3px solid #56c1ff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`