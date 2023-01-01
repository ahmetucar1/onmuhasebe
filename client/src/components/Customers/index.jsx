import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import styles from "../Main/styles.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom"; 

function Customers() {

  const [data, setData] = useState([]) 
   

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  useEffect(() => {
   const getCustomers = async () => {
      await axios.get('http://localhost:3000/api/customers')
      .then(res => {
      setData(res.data)
     }).catch (error => {
      console.log(error);
     }) 
   } 
   getCustomers()
  }, [])

  let navigate = useNavigate(); 
 
 
  return (
    <div>
        <nav className={styles.navbar}>
				<h1>Muhasebe</h1>
				<Link to="/">
				<button className={styles.white_btn}>
					Anasayfa
				</button>
				</Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Çıkış Yap
				</button>
			</nav>
    
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Müşteri İsmi</th>
          <th>Soyisim</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map((customers,index) => (
            <tr onClick={() => navigate(`/customers/${customers._id}`)} key={index}>
            <td> {index + 1 } </td>
            <td> {customers.firstName} </td>
            <td> {customers.lastName} </td>
          </tr>
          ))
        }
      </tbody>
    </Table>
    </div>
  );
}


export default Customers;