import styled from "styled-components"
import { useData } from "../context/DataContext"
import Loader from "./Loaders"

export default function Content() {

    const { content, loading, process } = useData()

    console.log(loading)

    return (
        <Wrapper>

            {loading ? 
                <AnalyzeBlock> 
                    <Loader />
                    <AnalyzeText>Analyzing ...</AnalyzeText>
                </AnalyzeBlock>
            : !loading && process.id ?
                <>
                    <Title>Analyze results:</Title>
                    {content.map((element, index) => {
                        return (
                            <AnalyzeText key={index}>{element.word} <b>{element.ratio}%</b></AnalyzeText>
                        )
                    })}
                </>
            : <></>}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 20px;
`

const Title = styled.h2`
    font-size: 22px;
`

const AnalyzeBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`

const AnalyzeText = styled.p`
    font-size: 16px;
    display: block;
`