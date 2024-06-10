import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Cliente } from '../interfaces/cliente';
import { Empresa } from '../interfaces/empresa';
import { axiosPrivate } from '../services/axios_conection';

export const useClienteController = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [form, setForm] = useState<Cliente>({
    id: null,
    nombre: '',
    apellidos: '',
    direccion: '',
    codigo_postal: '',
    provincia: '',
    municipio: '',
    empresa_id: null,
  });

  useEffect(() => {
    fetchClientes();
    fetchEmpresas();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axiosPrivate.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axiosPrivate.get('/empresa');
      setEmpresas(response.data);
      console.log('Empresas:', response.data);  // Verificar los datos en la consola
    } catch (error) {
      console.error('Error fetching empresas:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrUpdateCliente = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (form.id === null) {
        await axiosPrivate.post('/cliente', form);
      } else {
        await axiosPrivate.put(`/cliente/${form.id}`, form);
      }
      fetchClientes();
      setForm({
        id: null,
        nombre: '',
        apellidos: '',
        direccion: '',
        codigo_postal: '',
        provincia: '',
        municipio: '',
        empresa_id: null,
      });
    } catch (error) {
      console.error('Error saving cliente:', error);
    }
  };

  const handleEditCliente = (cliente: Cliente) => {
    setForm(cliente);
  };

  const handleDeleteCliente = async (id: number | null) => {
    if (id === null) return;
    try {
      await axiosPrivate.delete(`/cliente/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  };

  return {
    clientes,
    empresas,
    fetchClientes,
    handleAddOrUpdateCliente,
    handleEditCliente,
    handleDeleteCliente,
    form,
    handleChange
  };
};
