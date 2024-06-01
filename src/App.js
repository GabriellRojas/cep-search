import { useState } from 'react';
import { api } from './services/api'

import './global.css'
import { IoIosSearch } from "react-icons/io";

export function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {

    if(input === '') {
      alert('Preencha algum CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')
    }catch {
      alert('Digite um CEP válido!')
      setInput('')
    }
    
  }

  return (
      <div className='container'>
        <h1 className='title'>Buscador de CEP</h1>

        <div className='container_input'>
          <input
            type='text'
            placeholder='Digite o cep...'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <button className='button_search' onClick={handleSearch}>
            <IoIosSearch />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}     
      </div>
  )
}
