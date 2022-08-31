import "./App.css";
import React, { useEffect, useState } from "react";
import { Container, Stack, Form, Button, Table } from "react-bootstrap";
import getAllUsers from "./Funciones/getAllUsers";
import addUser from "./Funciones/addUsers";
import filter from "./Funciones/filter";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Pagination from "./Components/Pagination/Pagination";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nombre, setNombre] = useState("")
  const [razon, setRazon] = useState("")
  const [nit, setNit] = useState("")
  const [telefono, setTelefono] = useState("")
  const [codigo, setCodigo] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(20)

  useEffect(() => {
    actualizarUsuarios();
  }, []);

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex= lastUserIndex - usersPerPage;
  const currentUsers= usuarios.slice(firstUserIndex, lastUserIndex)
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNombre = (e)=> setNombre(e.target.value)
  const handleRazon = (e)=> setRazon(e.target.value)
  const handleNit = (e)=> setNit(e.target.value)
  const handleTelefono = (e)=> setTelefono(e.target.value)
  const handleCodigo = (e)=> setCodigo(e.target.value)

  const actualizarUsuarios = () => {
    getAllUsers().then((usuarios) => {
      setUsuarios(usuarios);
    });
  };
  const addUserModal=()=>{
    const infoUser = {nombre,razon,nit,telefono,codigo}
    addUser(infoUser);
    actualizarUsuarios();
    setOpen(false);
  }
  const busquedaFormHandler=async(e)=>{
    e.preventDefault(); 
    const busqueda = e.target.busqueda.value;
    const infoFiltrada = await filter(busqueda);
    setUsuarios(infoFiltrada)
  }

  const paginate=(pageNumber)=> setCurrentPage(pageNumber)


  return (
    <>
    <Container fluid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form>
            <Stack>
              <Form.Control value={nombre} onChange={handleNombre} placeholder="Titulo" type="text" className="mb-2"/>
              <Form.Control value={razon} onChange={handleRazon} placeholder="Razón Social" type="text" className="mb-2"/>
              <Form.Control value={nit} onChange={handleNit} placeholder="Identificacion Tributaria" type="text" className="mb-2"/>
              <Form.Control value={telefono} onChange={handleTelefono} placeholder="Telefono" type="text" className="mb-2"/>
              <Form.Control value={codigo} onChange={handleCodigo} placeholder="Código" type="text" className="mb-4"/>
            </Stack>
          </Form>
              <Button variant="primary"  onClick={addUserModal}>Añadir</Button>
              <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        </Box>
      </Modal>
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Base de datos</h1>
      </Stack>
      <hr />
      <Form onSubmit={busquedaFormHandler}>
        <Stack direction="horizontal">
          <Button onClick={handleOpen}>Añadir Usuario</Button>
          <Form.Group controlId="busqueda" className="w-75 m-3">
            <Form.Control type="text" placeholder="Buscar" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Buscar
          </Button>
          <Button variant="light" onClick={()=>{
            actualizarUsuarios();
          }}>Resetear</Button>
        </Stack>
      </Form>
      <hr />
      <Table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Razón Social</th>
            <th>Identificación Tributaria</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers &&
            currentUsers.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.nombre}</td>
                <td>{usuario.razon}</td>
                <td>{usuario.nit}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.codigo}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination usersPerPage={usersPerPage} totalUsers={usuarios.length} paginate={paginate}/>
    </Container>
      </>
  );
}

export default App;
