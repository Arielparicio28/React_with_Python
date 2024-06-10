import { Cliente } from "../interfaces/cliente";


interface ClienteTableProps {
  clientes: Cliente[];
  handleEdit: (cliente: Cliente) => void;
  handleDelete: (id: number | null) => void;
}

const ClienteTable: React.FC<ClienteTableProps> = ({ clientes, handleEdit, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Dirección</th>
          <th>Código Postal</th>
          <th>Provincia</th>
          <th>Municipio</th>
          <th>Empresa-ID</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map(cliente => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellidos}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.codigo_postal}</td>
            <td>{cliente.provincia}</td>
            <td>{cliente.municipio}</td>
            <td>{cliente.empresa_id}</td>
            <td>
              <button className="editar" onClick={() => handleEdit(cliente)}>Editar</button>
              <button className="eliminar" onClick={() => handleDelete(cliente.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClienteTable;
