import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react' 
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import styles from "../Main/styles.module.css";

const CustomerDetails = () => {
  const [key, setKey] = useState('home');
  const {id} = useParams();
  const [customerDetail, setCustomerDetail] = useState({});
  const [product, setProduct] = useState([]);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


  useEffect(() => {
    if (id) 
    axios.get(`http://localhost:3000/api/customers/${id}`)
    .then(res => {
    setCustomerDetail(res.data)
    }).catch(error => {
      console.log(error)
    }); 
  }, [id])


  useEffect(() => {
    if (id) 
    axios.get("http://localhost:3000/api/products")
    .then(res => {
    setProduct(res.data)
    }).catch(error => {
      console.log(error)
    }); 
  }, [id])

   console.log(product);

  const [data, setData] = useState({
	name: "",
	price: ""
});

const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const navigate = useNavigate();


const handleChange = ({ currentTarget: input }) => {
	setData({ ...data, [input.name]: input.value });
	
};


const handleSubmit = async (e) => {
	e.preventDefault();
	
	try {
		const url = "http://localhost:3000/api/products"; 
		const { data: res } = await axios.post(url, {
			userId: id,
			name: data.name,
			price: data.price
		});
		navigate(`/customers/${id}`);
		console.log("Product created successfully");
		setSuccess(res.message);
		setData({name: "", price: ""});
	} catch (error) {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		) {
			setError(error.response.data.message);
		}
	}
};
console.log(product);
console.log(product.filter((userProduct) => userProduct.userId === id))

  return (
  <div>
<nav className={styles.navbar}>
				<h1>Muhasebe</h1>
				<Link to="/customers">
				<button className={styles.white_btn}>
					Müşteriler
				</button>
				</Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Çıkış Yap
				</button>
			</nav>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {
        <Tab  eventKey="home" title="Müşteri Portföy">
           
            <p>İsim Soyisim: {customerDetail.firstName} {customerDetail.lastName} </p>
            <p>Aldığı Ürünler  </p>
			<div>
				 {
				 product.filter((userProduct) => userProduct.userId === id)
				 .map((productData, index) => {
						return <div key={index}>
						<h4> {productData.name} </h4>
						<h4> {productData.price} </h4>
					</div>
						
					})
				} 

			</div>
            <p>Borcu</p>
       
        </Tab>
     }
      <Tab eventKey="profile" title="Muhasebe Ekle">
        <div>
		<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Muhasebe Ekle</h1>
						<input
							type="text"
							placeholder="Ürün İsmi"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							className={styles.input}
						/>
						<input
							type="number"
							placeholder="Ürün Fiyatı"
							name="price"
							onChange={handleChange}
							value={data.price}
							required
							className={styles.input}
						/>
						{success && <div className={styles.success_msg}>{success}</div>}
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Kaydet
						</button>
					</form>
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tel:
      </Tab>
    </Tabs>
    </div>
  )
}

export default CustomerDetails;
