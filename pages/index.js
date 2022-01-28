import Head from 'next/head'
import {useState} from "react";
import {leminCroppedCaptcha, LeminCroppedCaptchaContainer} from "@leminnow/react-lemin-cropped-captcha";
import axios from 'axios';

export default function Home() {
    //https://help.leminnow.com/knowledge/how-to-display-lemin-captcha
    const captchaId = "YOUR_CAPTCHA_ID";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = () => {
      const captchaValue = leminCroppedCaptcha.getCaptcha(captchaId).getCaptchaValue();
      if (captchaValue.answer && captchaValue.challenge_id && username && password) {
          const request = {
              username,
              password,
              answer: captchaValue.answer,
              challenge_id: captchaValue.challenge_id
          }
          axios.post('/api/validate', request).then(res => {
              if (res.data.success) {
                  window.location.href = 'success'
              } else {
                  alert(res.data.message)
              }
          })
      }
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous"/>
            </Head>

            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <LeminCroppedCaptchaContainer
                        containerId={"lemin-cropped-captcha"}
                        captchaId={captchaId}/>
                    <button className="w-100 btn btn-lg btn-primary" type={"button"} onClick={handleSignin}>Sign in</button>
                </form>
            </main>

        </>
    )
}