import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Register = ({onRouteChange, loadUser}) => {

    const [signinName, setSigninName] = useState('');
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setsigninPassword] = useState('');
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    
    const onNameChange = (event) =>{
        setSigninName(event.target.value)
    }
    
    const onEmailChange = (event) =>{
        setSigninEmail(event.target.value)
    }

    const onPasswordChange = (event) =>{
        setsigninPassword(event.target.value)
    }

    const validate = (email) => {
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    const onSubmitRegister = (e) =>{
        e.preventDefault();
        if (validate(signinEmail)){
            fetch('/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: signinName,
                    email: signinEmail,
                    password: signinPassword
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    loadUser(user);
                    onRouteChange('signin');
                }
                })
        } else if (signinName=== "" || signinEmail=== "" || signinPassword=== "") {
            setEmpty(true)
            setError(false)
        }
        else {
            setEmpty(false)
            setError(true)
        }
    }

    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                        {error && (
                            <p className="w-90 ba br2 pa3 ma2 red bg-washed-red" role="alert">
                            <strong>ERROR:</strong> Enter a valid e-mail address</p>
                            )}
                        {empty && (
                            <p className="w-90 ba br2 pa3 ma2 red bg-washed-red" role="alert">
                            <strong>ERROR:</strong> field can't be empty.</p>
                            )}
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name"  id="name" placeholder="Enter name"
                                onChange={onNameChange}
                                />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  id="email" placeholder="name@example.com"
                                onChange={onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  id="password" placeholder="password"
                                onChange={onPasswordChange}
                                />
                        </div>
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                </form>
            </main>
        </article>

    )
}

export default Register;