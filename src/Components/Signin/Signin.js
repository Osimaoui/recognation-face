import React, {useState} from 'react';

const Signin = ({onRouteChange, loadUser}) => {

    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setsigninPassword] = useState('');
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);

    const onEmailChange = (event) =>{
        setSigninEmail(event.target.value)
    }

    const onPasswordChange = (event) =>{
        setsigninPassword(event.target.value)
    }

    const onSubmitSignIn = (e) =>{
        e.preventDefault();
        fetch('/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signinEmail,
                password: signinPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
                loadUser(user);
                onRouteChange('home');
            } else if (signinEmail=== "" || signinPassword=== "") {
                setEmpty(true)
                setError(false)
            }
            else {
                setError(true)
                setEmpty(false)
            }
        })
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        {error && (
                            <p className="w-100 ba br2 pa3 ma2 red bg-washed-red" role="alert">
                            <strong>ERROR:</strong> Invalid credentials</p>
                            )}
                        {empty && (
                            <p className="w-100 ba br2 pa3 ma2 red bg-washed-red" role="alert">
                            <strong>ERROR:</strong> field can't be empty.</p>
                            )}
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  id="email-address" placeholder="Enter email"
                                onChange={onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  id="password" placeholder="Password"
                                onChange={onPasswordChange}
                                />
                        </div>
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={()=>{onRouteChange('register')}} className="f6 link dim black db pointer">Register</p>
                    </div>
                </form>
            </main>
        </article>

    )
}

export default Signin;