import { Dispatch, FC, SetStateAction } from "react";
import { Credentials, User } from "../interfaces/user.interface";
import * as yup from 'yup'
import { useFormik } from "formik"
import { userService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginProps {
    setLoggedInUser: Dispatch<SetStateAction<User | undefined>>
}

export const Login: FC<LoginProps> = ({ setLoggedInUser }) => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        } as Credentials,
        validationSchema: yup.object({
            username: yup.string()
                .min(3, "Username must be at least 3 characters. Please try again")
                .max(15, "Must be 15 characters or less. Please try again.")
                .required("Username is required"),
            password: yup.string()
                .required('Password is required')
                .min(5, 'Your password must be at least 5 characters long. Please try again.')
                .matches(/[a-zA-Z 0-9]/, 'Password can only contain Latin letters or numbers.')
        }),
        onSubmit: (values: Credentials) => {
            (async () => {
                try {
                    const user = await userService.login(values)
                    setLoggedInUser(user)
                    if (user) navigate('/lobby')
                } catch (err) {
                    console.log('Cannot login')
                    toast.error('Invalid credentials. Please try again', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
            })()
        }
    })
    return (
        <section className="login">
            <h2 className="title">Welcome to CodeCoach</h2>
            <form onSubmit={formik.handleSubmit} className="login-form">
                <label htmlFor="username">Username</label>
                {/* <div><FaRegUser className="user-icon"/></div> */}
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="Enter username"

                />
                {formik.touched.username && formik.errors.username ? (
                    <span className="error">{formik.errors.username}</span>
                ) : <span>&nbsp;</span>}
                <label htmlFor="password">Password</label>
                {/* <div><BiLock className="lock-icon"/></div> */}
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="Enter password "
                />
                {formik.touched.password && formik.errors.password ? (
                    <span className="error">{formik.errors.password}</span>
                ) : <span>&nbsp;</span>}
                <button className="btn btn-login" type="submit">Sign in</button>
            </form>
        </section>
    )
}


