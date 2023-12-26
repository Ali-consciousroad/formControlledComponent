import './App.css'; 
import { useState } from "react"; 
import { validateEmail } from "../src/utils"; 

// Define a component for displaying a password error message
const PasswordErrorMessage = () => { 
 return ( 
   <p className="FieldError">Password should have at least 8 characters</p> 
 ); 
}; 

const FirstNameRequiredError = () => {
  return (
    <p className="FieldError">Your first name is required</p>
  );
};

function App() { 
 // Define state variables for form fields and validation
 const [firstName, setFirstName] = useState({
    value: "", 
    isTouched: false,  
 }); 
 const [lastName, setLastName] = useState(""); 
 const [email, setEmail] = useState(""); 
 const [password, setPassword] = useState({ 
   value: "", 
   isTouched: false, 
 }); 
 const [role, setRole] = useState("role"); 

 // Define a function to check if the form is valid
 const getIsFormValid = () => { 
   return ( 
     firstName && // Check if firstName is not empty
     validateEmail(email) && // Validate the email using a custom function if the first name exists
     password.value.length >= 8 && // Check if password has at least 8 characters
     role !== "role" // Check if a role other than the default "role" is selected
   ); 
 }; 

 // Define a function to clear form fields when the form is submitted
 const clearForm = () => { 
   setFirstName({
      value: "", 
      isTouched: false, 
   }); 
   setLastName(""); 
   setEmail(""); 
   setPassword({ 
     value: "", 
     isTouched: false, 
   }); 
   setRole("role"); 
 }; 

 // Define a function to handle form submission
 const handleSubmit = (e) => { 
   e.preventDefault(); // Prevent the default form submit behavior to avoid page reload when submitting the form
   alert("Account created!"); 
   clearForm(); 
 }; 

 return ( 
   <div className="App"> 
     <form onSubmit={handleSubmit}> 
       <fieldset> 
         <h2>Sign Up</h2> 
         <div className="Field"> 
           <label> 
             First name <sup>*</sup> 
           </label> 
           <input 
             value={firstName.value} 
             type="text"
             onChange={(e) => { 
               setFirstName({ ...firstName, value: e.target.value }); 
             }} 
             // Set isTouched to true when the input field is blurred
              onBlur={() => { 
                setFirstName({ ...firstName, isTouched: true }); 
              }}
             placeholder="First name" 
           /> 
           {firstName.isTouched && firstName.value.length < 1 ? (
            <FirstNameRequiredError />
           ) : null}
         </div> 
         <div className="Field"> 
           <label>Last name</label> 
           <input 
             value={lastName} 
             onChange={(e) => { 
               setLastName(e.target.value); 
             }} 
             placeholder="Last name" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Email address <sup>*</sup> 
           </label> 
           <input 
             value={email} 
             onChange={(e) => { 
               setEmail(e.target.value); 
             }} 
             placeholder="Email address" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
           <input 
             value={password.value} 
             type="password" 
             onChange={(e) => { 
               setPassword({ ...password, value: e.target.value }); 
             }} 
             // Set isTouched to true when the input field is blurred
             onBlur={() => { 
               setPassword({ ...password, isTouched: true }); 
             }} 
             placeholder="Password" 
           /> 
           {password.isTouched && password.value.length < 8 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
         </div> 
         <div className="Field"> 
           <label> 
             Role <sup>*</sup> 
           </label> 
           <select value={role} onChange={(e) => setRole(e.target.value)}> 
             <option value="role">Role</option> 
             <option value="individual">Individual</option> 
             <option value="business">Business</option> 
           </select> 
         </div> 
         <button type="submit" disabled={!getIsFormValid()}> 
           Create account 
         </button> 
       </fieldset> 
     </form> 
   </div> 
 ); 
} 

export default App;
