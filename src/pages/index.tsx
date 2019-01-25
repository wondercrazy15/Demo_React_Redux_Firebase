import * as React from 'react'
import Page from '../components/layout/Page'
import Container from '../components/layout/Container'
import styled from '../utils/styled'

export default () => (
  <Page>
    <Container>
      <PageContent>
        <h1>Welcome To React Redux Firebase App!</h1>
       
        <h3>
          Project structure
        </h3>       
        <img src="https://github.com/wondercrazy15/Demo_React_Redux_Firebase/blob/master/Image/Project_Stracture.png" />
         <h3>
          Functionality
        </h3>  
        <h5> Sorting </h5>
        <img src="https://github.com/wondercrazy15/Demo_React_Redux_Firebase/blob/master/Image/Sorting.png"/>
        <h5>Filter Example </h5>
        <img src="https://github.com/wondercrazy15/Demo_React_Redux_Firebase/blob/master/Image/City_Filter.png"/>
        <h5>Advance Filter Result</h5>
        <img src="https://github.com/wondercrazy15/Demo_React_Redux_Firebase/blob/master/Image/Button_Click_Filter.png"/>
        <h5> Date Filter</h5>
        <img src="https://github.com/wondercrazy15/Demo_React_Redux_Firebase/blob/master/Image/Between_Date.png" />
        <h3>
            Require global package
        </h3>                   
        <p>
            npm install -g parcel-bundler
        </p>
        <h3>
           Installation 
        </h3>                   
        <p>
            $ npm install
        </p>
        <h3>
               Running
        </h3>                    
        <p>
             $ npm start
        </p>  
      </PageContent>
    </Container>
  </Page>
)

const PageContent = styled('article')`
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  line-height: 1.6;

  a {
    color: ${props => props.theme.colors.brand};
  }

  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 0.5rem;
    font-family: ${props => props.theme.fonts.headings};
    line-height: 1.25;
  }
`
