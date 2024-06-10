import { ChangeEvent, FormEvent } from 'react';
import { Cliente } from '../interfaces/cliente';
import { Empresa } from '../interfaces/empresa';

interface ClienteFormProps {
  form: Cliente;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  empresas: Empresa[];
}

const ClienteForm: React.FC<ClienteFormProps> = ({ form, handleChange, handleSubmit, empresas }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input type="text" name="apellidos" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required />
      <input type="text" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
      <input type="text" name="codigo_postal" placeholder="Código Postal" value={form.codigo_postal} onChange={handleChange} required />
      <input type="text" name="provincia" placeholder="Provincia" value={form.provincia} onChange={handleChange} required />
      <input type="text" name="municipio" placeholder="Municipio" value={form.municipio} onChange={handleChange} required />
      <select name="empresa_id" value={form.empresa_id ?? ''} onChange={handleChange}>
        <option value="">Seleccione una Empresa</option>
        {empresas.map((empresa) => (
          <option key={empresa.id} value={empresa.id}>{empresa.empresa}</option>
        
        ))}
      </select>
      <button type="submit">{form.id === null ? 'Agregar Cliente' : 'Actualizar Cliente'}</button>
    </form>
  );
};

export default ClienteForm;
