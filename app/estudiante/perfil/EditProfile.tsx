'use client'

import { useState, FormEvent } from 'react'

interface EditProfileProps {
  student: {
    nombre_completo: string
    email: string
    telefono?: string
    ciudad?: string
    pais?: string
    direccion?: string
  }
}

export default function EditProfile({ student }: EditProfileProps) {
  const [name, setName] = useState(student.nombre_completo || '')
  const [email, setEmail] = useState(student.email || '')
  const [phone, setPhone] = useState(student.telefono || '')
  const [city, setCity] = useState(student.ciudad || '')
  const [country, setCountry] = useState(student.pais || '')
  const [address, setAddress] = useState(student.direccion || '')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Updated Data:', { name, email, phone, city, country, address })
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Editar Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">País</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}
