import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction(transaction: TransactionInput): void
}

const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children } : { children: ReactNode }) {

  const [transactions, setTransactions] = useState<Transaction[]>([])
 
  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction)
  }

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  },[])

  return (
    <TransactionsContext.Provider value={{ 
      transactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}