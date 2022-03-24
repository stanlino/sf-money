import Logo from '../../assets/logo.svg'

import { Container, Content } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="sf money" />
        <button type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  )
}