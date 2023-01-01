import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const navigate = useNavigate()
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:3000/api/auth";
			const { data: res } = await axios.post(url, data);
		    localStorage.setItem("token", JSON.stringify(res.data))
			navigate("/")
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
		<div className={styles.login_container}>
			<div className={styles.title}><h1>Muhasebe</h1></div>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Giriş Yap</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Şifre"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Giriş Yap
						</button>
						<div className={styles.mobile_signup}>
							<p>Hesabın Yok mu?</p>
							<Link to="/signup">
						<button type="button" className={styles.green_btn}>
							Üye Ol
						</button>
					</Link>
						</div>
					</form>
				</div>
				<div className={styles.right}>
					<h1>Hesabın Yok mu?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Üye Ol
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;