import React from 'react'
import { Container, Row } from 'react-bootstrap'
import LoginForm from '../../Components/Login/LoginForm'
import RightImg from '../../Components/Login/RightImg'

const Login = () => {
  return (
    <>
      <Container>
        <Row>
          <LoginForm/>
          <RightImg/>
        </Row>
      </Container>
    </>
  )
}

export default Login