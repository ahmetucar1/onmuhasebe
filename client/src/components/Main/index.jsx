import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    const [data, setData] = useState({
		firstName: "",
		lastName: ""
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
			const url = "http://localhost:3000/api/customers" || "https://muhasebee.netlify.app/api/customers"; 
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log("Customer created successfully");
			setSuccess(res.message);
			setData({firstName: "", lastName: ""});
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
	

	return (
		<div className={styles.main_container}>
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
			<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Müşteri Kaydet</h1>
						<input
							type="text"
							placeholder="Muşteri İsmi"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Soyisimi"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
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
			</div>
		</div>
		</div>
	);
};

export default Main;