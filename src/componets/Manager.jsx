
import { useRef, useState, useEffect } from 'react'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getpasswords()

    }, [])

    const copyText = (text) => {
        toast('Copyied to clipbord🦄', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text);
    }




    const showPassword = () => {
        const isPasswordVisible = passwordRef.current.type === "text";
        passwordRef.current.type = isPasswordVisible ? "password" : "text";
        ref.current.src = isPasswordVisible ? "icons/eye-close-up.png" : "icons/eye.png";
    };
    
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            let res = await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-type": "application/json" },                
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password Save sucessfully📑', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast('Error : ⚠️Password is not save !🚨', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }

    }

    const deletePassword = async (id) => {

        let c = confirm("Do you really want to delete this?")
        console.log("deleteone ", id)
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http:localhost:3000/", {
                method: "DELETE", headers: { "Content-type": "applicatione/json" },
                body: JSON.stringify({ id })
            })
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=> item.id!==id)))
            toast('Password Delete!☠️', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        }
    }
    const editPassword = (id) => {
        console.log("deleteong ", id)
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const HandleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });


    }

    return (<>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

        <div className=" p-3 md:mycontainer min-h-[88.2vh]">
            <h1 className='text-4xl font-bold text-center'>
                <span className='text-[#698fe9]'>&lt;</span>

                <span>Pass</span>
                <span className='text-[#698fe9] font-extraboldd'>OP+&gt;</span>
            </h1>
            <p className='text-[#295acd] text-lg text-center'>Your Own Password Manerger</p>

            <div className=' flex flex-col p-4 text-black gap-8 items-center'>
                <input value={form.site} onChange={HandleChange} placeholder='Enter URL' className='rounded-full border border-[#246b53] w-full  py-1 p-4' type="text" name='site' id='site' />
                <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                    <input value={form.username} onChange={HandleChange} placeholder='Enter Username' className='rounded-full border border-[#246b53] w-full  py-1 p-4' type="text" name='username' id='username' />
                    <div className="relative">

                        <input ref={passwordRef} value={form.password} onChange={HandleChange} placeholder='Enter password' className='rounded-full border border-[#246b53] w-full  py-1 p-4' type="password" name='password' id='password' />
                        <span className='absolute right-[2px] top-[3px] cursor-pointer' onClick={showPassword}>
                            <img ref={ref} className='p-1' width={30} src="icons/eye-close-up.png" alt="eye" /></span>
                    </div>
                </div>
                <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-[#2d8b6f] hover:bg-[#49c39e] rounded-full px-8 py-2 w-fit text-white border border-[#0f2e25]'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    Save</button>

            </div>
            <div className="passwords">
                <h2 className='font-bold text-2xl py-2'>You'r Passwords</h2>
                {passwordArray.length === 0 && <div>No PassWord to show</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-10 ">
                    <thead className='bg-[#003952] text-white'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-[#C3EDFF]'>
                        {passwordArray.map((item, index) => {
                            return <tr key={item.id}>

                                <td className='py-2 border border-[#ebf9ff] text-center '>

                                    <div className='flex justify-center items-center'>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className=' py-2 border border-[#ebf9ff] text-center'>

                                    <div className='flex justify-center items-center'>
                                        <span>{item.username}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className=' py-2 border border-[#ebf9ff] text-center '>

                                    <div className='flex justify-center items-center'>
                                    <span>{"*".repeat(item.password ? item.password.length : 0)}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/depeqmsz.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className=' justify-center items-center py-2 border border-[#ebf9ff] text-center '>
                                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/zfzufhzk.json"
                                            trigger="hover"
                                            state="hover-line"
                                            colors="primary:#66d7ee,secondary:#242424,tertiary:#242424,quaternary:#e83a30,quinary:#911051"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                    </span>
                                    <span className='cursor-pointer mx-1 ' onClick={() => { deletePassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="morph"
                                            state="morph-trash-full"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                    </span>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>}
            </div>
        </div>

    </>
    )
}

export default Manager
