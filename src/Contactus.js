import React from 'react';
import "./Contactus.css";
import emailjs from "emailjs-com"

function Contactus() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm("service_vhu6kxf",
        "template_48n98j4",
        e.target,
        "user_woAkJuiVc2znHLKbrOt1b"
        ).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));
        e.target.reset()

    }

    return (
        <div className="contactus app" onSubmit={sendEmail}>
            <form action="" className="contactus-form">
            <h1>Contact form 📞</h1>

            <label >Name</label>
            <input type="text" name="name" />

            <label >Email</label>
            <input type="email" name="user_email" />

            <label >Message</label>
            <textarea name="message" rows="4"></textarea>

            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Contactus
