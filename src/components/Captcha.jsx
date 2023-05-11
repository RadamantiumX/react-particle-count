import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Captcha() {
    const handleCaptchaChange = (value) => {
        console.log("Captcha value:", value);
      };
    return(
        <>
        <div>
         
       <ReCAPTCHA
        sitekey="6LcFlfwlAAAAAEqPVjNiuf2yJf5tY6_J_TZbGGYg"
        onChange={handleCaptchaChange}
        />
       </div>
        </>
    )
}