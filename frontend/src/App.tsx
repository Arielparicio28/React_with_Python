import { useEffect } from 'react';
import './App.css';
import ClienteForm from './components/ClienteForms';
import ClienteTable from './components/ClienteTable';
import { useClienteController } from './controllers/clienteControllers';

function App() {
  const { clientes, empresas, fetchClientes, handleAddOrUpdateCliente, handleEditCliente, handleDeleteCliente, form, handleChange } = useClienteController();

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return (
    <div className="App">
      <h1>Clientes</h1>
      <ClienteForm form={form} handleChange={handleChange} handleSubmit={handleAddOrUpdateCliente} empresas={empresas} />
      <ClienteTable clientes={clientes} handleEdit={handleEditCliente} handleDelete={handleDeleteCliente} />
    </div>
  );
}

export default App;
