import { useState } from "react"
import Button from "../components/FormFields/ButtonComp"
import Layout from "../components/Layout/Layout"
const Resources=()=>{
    const [isOpen,setOpen]=useState(false)
    const openModal=()=>{
        setOpen(true)
    }
    const closeModal=()=>{
        setOpen(false)
    }
    return(
       <Layout pageTitle="Manage Resources">
      <Button variant="success" >Add Resources</Button>
       </Layout>
    )
}
export default Resources