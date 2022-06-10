import { user,useState } from "react";
import { Data } from "./Data";
import { auth, provider } from "./firebase";
import Header  from "./Header";
import { Sidebar } from "./Sidebar";
function App() {
  const[user,setUser]=useState(null)

  const signIn=()=>{
    auth.signInWithPopup(provider).then(({user})=>{
      setUser(user)
    }).catch(error=>{
      alert(error.message);
    })
  }
  return (
    <>
    {
      user? (
        <>
  <Header photoURl={user.photoURl}/>
    <div className="App">
    <Sidebar/>
    <Data/>
    </div>
      </>
      ):(
        <div className="loginWrap">
          <img src="data:image/png;base64,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"/>
          <button onClick={signIn}>Login to Vishal Google Drive Clone</button>
        </div>
      )
    }
  
    </>
  );
}

export default App;
