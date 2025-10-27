import React from 'react'
import { X, User, Mail, Lock, Shield, Activity } from 'lucide-react'

export interface UserFormData {
  nombre_completo: string
  email: string
  telefono?: string
  direccion?: string
  ciudad?: string
  pais?: string
  password?: string
  rol: 'estudiante' | 'administrador'
  estado: 'activo' | 'inactivo' | 'suspendido'
}

interface UserFormModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: UserFormData
  onClose: () => void
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  isEditing,
  formData,
  onClose,
  onFormChange,
  onSubmit,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl transform transition-all animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Información Básica */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
                    Información Básica
                  </h4>

                  {/* Nombre Completo */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <User className="w-4 h-4 text-blue-600" />
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="nombre_completo"
                      value={formData.nombre_completo}
                      onChange={onFormChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onFormChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  {/* Contraseña (solo al crear) */}
                  {!isEditing && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Lock className="w-4 h-4 text-blue-600" />
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password || ''}
                        onChange={onFormChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Mínimo 8 caracteres"
                      />
                    </div>
                  )}
                </div>

                {/* Configuración del Sistema */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
                    Configuración del Sistema
                  </h4>

                  {/* Grid para Rol y Estado */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Rol */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Shield className="w-4 h-4 text-blue-600" />
                        Rol
                      </label>
                      <select
                        name="rol"
                        value={formData.rol}
                        onChange={onFormChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 cursor-pointer"
                      >
                        <option value="estudiante">Estudiante</option>
                        <option value="administrador">Administrador</option>
                      </select>
                    </div>

                    {/* Estado */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Activity className="w-4 h-4 text-blue-600" />
                        Estado
                      </label>
                      <select
                        name="estado"
                        value={formData.estado}
                        onChange={onFormChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 cursor-pointer"
                      >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="suspendido">Suspendido</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Información de Contacto */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 pb-2">
                    Información de Contacto
                  </h4>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={onFormChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Ej: +57 300 123 4567"
                    />
                  </div>

                  {/* Dirección */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={onFormChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Ej: Calle 123 #45-67"
                    />
                  </div>

                  {/* Ciudad y País */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-blue-600" />
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={onFormChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Ej: Bogotá"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-blue-600" />
                        País
                      </label>
                      <input
                        type="text"
                        name="pais"
                        value={formData.pais}
                        onChange={onFormChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        placeholder="Ej: Colombia"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                onClick={onSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFormModal