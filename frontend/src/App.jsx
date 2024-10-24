import styled from "styled-components"
import Form from "./components/Form"
import Content from "./components/Content"
import { DataProvider } from "./context/DataContext"

export default function App() {

  return (
    <DataProvider>
      <Wrapper>
        <Title>Upload files for analyzing content</Title>

        <Form />

        <Content />
      </Wrapper>
    </DataProvider>
  )
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 36px;
`
