'use client'

import { useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { Eye, EyeOff, Upload, User, Mail, Phone, MapPin, Lock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    nombre_completo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    pais: 'Colombia',
    foto_perfil_url: '',
    password: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const uploadFile = async (file: File) => {
    const formDataUpload = new FormData()
    formDataUpload.append('photo', file)
    const response = await fetch('http://localhost:3001/auth/upload', {
      method: 'POST',
      body: formDataUpload,
    })
    const data = await response.json()
    if (response.ok) {
      return data.url
    } else {
      throw new Error(data.error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setErrors([])

    try {
      let finalFormData = { ...formData }

      if (selectedFile) {
        const url = await uploadFile(selectedFile)
        finalFormData.foto_perfil_url = url
      }

      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      })

      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso! 🎉',
          text: `Bienvenido ${data.nombre_completo}. Rol asignado: ${data.rol}`,
          confirmButtonText: 'Continuar',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#8b5cf6'
        }).then(() => {
          window.location.href = '/login'
        })
      } else if (response.status === 400) {
        setErrors(data.errors || [])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: data.error || 'Ha ocurrido un error inesperado',
          confirmButtonText: 'Intentar nuevamente',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#ef4444'
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        confirmButtonText: 'Aceptar',
        background: '#1f2937',
        color: '#ffffff',
        confirmButtonColor: '#ef4444'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const inputFields = [
    {
      name: 'email',
      label: 'Correo electrónico',
      type: 'email',
      icon: Mail,
      placeholder: 'tu@email.com',
      required: true
    },
    {
      name: 'nombre_completo',
      label: 'Nombre completo',
      type: 'text',
      icon: User,
      placeholder: 'Juan Pérez García',
      required: true
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'tel',
      icon: Phone,
      placeholder: '+57 300 123 4567',
      required: false
    },
    {
      name: 'direccion',
      label: 'Dirección',
      type: 'text',
      icon: MapPin,
      placeholder: 'Calle 123 #45-67',
      required: false
    },
    {
      name: 'ciudad',
      label: 'Ciudad',
      type: 'text',
      icon: MapPin,
      placeholder: 'Bogotá',
      required: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-10 right-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 left-20 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">Volver al Inicio</span>
              </Link>
            </div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Formación 360
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              ¡Únete a nosotros!
            </h2>
            <p className="text-gray-300 text-lg">
              Crea tu cuenta y comienza tu viaje de aprendizaje
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Two-column grid for larger screens */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputFields.map((field) => {
                  const Icon = field.icon
                  return (
                    <div key={field.name} className="relative">
                      <label
                        htmlFor={field.name}
                        className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                          focusedField === field.name || formData[field.name as keyof typeof formData]
                            ? 'top-2 text-xs text-purple-300'
                            : 'top-4 text-gray-400'
                        }`}
                      >
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          className="w-full pt-6 pb-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.name)}
                          onBlur={() => setFocusedField('')}
                        />
                        <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  )
                })}

                {/* Country Select */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    País
                  </label>
                  <select
                    name="pais"
                    className="w-full py-3 px-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    value={formData.pais}
                    onChange={handleChange}
                  >
                    <option value="Colombia" className="bg-gray-800">🇨🇴 Colombia</option>
                    <option value="Otro" className="bg-gray-800">🌍 Otro</option>
                  </select>
                </div>

                {/* Password Field */}
                <div className="relative md:col-span-2">
                  <label
                    htmlFor="password"
                    className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                      focusedField === 'password' || formData.password
                        ? 'top-2 text-xs text-purple-300'
                        : 'top-4 text-gray-400'
                    }`}
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full pt-6 pb-3 px-4 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <Lock className="absolute right-12 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto de perfil (opcional)
                </label>
                <div className="relative">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="flex items-center justify-center w-full py-4 px-6 bg-white/5 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300">
                        {selectedFile ? selectedFile.name : 'Haz clic para subir una foto'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG hasta 5MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-red-400" />
                    <h3 className="text-red-300 font-medium">Errores en el formulario:</h3>
                  </div>
                  <ul className="space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-red-200 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                        {error.msg}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <span>Crear cuenta</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-gray-300">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    href="/login"
                    className="text-purple-300 hover:text-white font-semibold transition-colors duration-300 hover:underline"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Al registrarte, aceptas nuestros{' '}
              <Link href="#" className="text-purple-300 hover:text-white transition-colors duration-300">
                términos y condiciones
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
