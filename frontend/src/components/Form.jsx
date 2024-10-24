import styled from "styled-components"
import { useData } from "../context/DataContext"

export default function Form() {

    const { file, submitHandler, error } = useData()

    return (
        <form onSubmit={submitHandler}>
            <input ref={file} type='file' required='true' name='file' />

            <Button>Upload file</Button>
            <Error>{error}</Error>
        </form>
    )
}

const Button = styled.button`
    outline: none;
    cursor: pointer;

    border-width: 0;
    border: 1px solid silver;
    font-size: 14px;

    font-weight: 400;
    border-radius: 5px;
    padding: 7px 10px;
`

const Error = styled.p`
    font-size: 14px;
    color: #ff6a6a;
`