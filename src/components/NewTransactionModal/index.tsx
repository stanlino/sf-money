import { FormEvent, useRef, useState } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/Transactions'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose(): void
}

export function NewTransactionModal({ isOpen, onRequestClose } : NewTransactionModalProps){

  const { createTransaction } = useTransactions()

  const [type, setType] = useState('deposit')
  const title = useRef<HTMLInputElement>({} as HTMLInputElement)
  const amount = useRef<HTMLInputElement>({} as HTMLInputElement)
  const category = useRef<HTMLInputElement>({} as HTMLInputElement)

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title: title.current?.value,
      type,
      amount: Number(amount.current?.value),
      category: category.current?.value
    })

    title.current.value = ''
    amount.current.value = ''
    category.current.value = ''

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    > 

      <button type='button' onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          ref={title}
          placeholder='Título'
        />

        <input
          ref={amount}
          type='number'
          placeholder='Valor'
        />

        <TransactionTypeContainer>

          <RadioBox 
            type='button' 
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type='button' 
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>

        </TransactionTypeContainer>
        
        <input
          ref={category}
          placeholder='Categoria'
        /> 

        <button type="submit">Cadastrar</button> 
      </Container>
    </Modal>
  )
}